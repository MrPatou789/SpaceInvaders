class UFO {
    constructor(x, y) {
        this._x = x
        this._y = y
    }

    get x() {
        return this._x
    }
    get y() {
        return this._y
    }

    set x(x) {
        return this._x = x
    }
    set y(y) {
        return this._y = y
    }
}

class Alien extends UFO {
    constructor(x, y) {
        super(x, y)
    }
}

class MotherShip extends Alien {
    constructor(x, y){
        super(x, y)
    }
}

class Fighter extends UFO {
    constructor(x, y) {
        super(x, y)
    }
}

class Missile extends UFO {
    constructor(x, y) {
        super(x, y)
    }
}

var M = {
    fighter: null,
    aliens: [],
    missiles: [],
}

var V = {
    fighter: new Image(),
    alien: new Image(),
    missile: new Image(),
    mothership : new Image(),

    click : true,

    defineKeyUpEventListener: function () {
        document.addEventListener('keydown', e => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                C.setFighter(e.key)
            }

            if (e.key === 'ArrowUp') {
                if (V.click) {
                    C.addMissile()
                    V.click = false;
                    setTimeout(function () {
                        V.click = true
                    }, 600)
                }
            }
        })
    },

    step: function () {
        requestAnimationFrame(function () {
            const ctx = document.getElementById('game').getContext('2d');
            const aliens = C.getAliens()
            const fighter = C.getFighter()
            const misiles = C.getMissiles()

            ctx.globalCompositeOperation = 'destination-over';
            ctx.canvas.width = 1024;
            ctx.canvas.height = 780;
            ctx.clearRect(0, 0, ctx.witdh, ctx.height);

            aliens.forEach(alien => {
                if (alien instanceof MotherShip) {
                    ctx.drawImage(V.mothership, alien.x, alien.y, 70, 70);
                }else{
                    ctx.drawImage(V.alien, alien.x, alien.y, 35, 35);
                }
            });

            ctx.drawImage(V.fighter, fighter.x, fighter.y, 30, 30)

            misiles.forEach(missile => {
                ctx.drawImage(V.missile, missile.x, missile.y, 20, 30)
            })

            C.setAliens()
            C.setMisiles()

            if (!C.cancelAnimationFrame()) {
                V.step()
            }
        })
    },

    displayEndGame(message){
        document.getElementById('game_end').innerHTML = message
    }

}

var C = {
    direction: 'right',
    cancelAnimationFrameBoolean: false,

    init: function () {
        V.alien.src = `${location.pathname}/../assets/images/alien.svg`
        V.fighter.src = `${location.pathname}/../assets/images/fighter.svg`
        V.missile.src = `${location.pathname}/../assets/images/missile.png`
        V.mothership.src = `${location.pathname}/../assets/images/mothership.png`
        V.defineKeyUpEventListener()

        M.fighter = new Fighter(512, 780 - 40)
        M.aliens.push(new MotherShip(512, 0 - 15))

        let x = 260
        let y = 100

        for (let i = 0; i < 33; i++) {
            M.aliens.push(new Alien(x, y))

            if ((x += 50) >= 764) {
                x = 260
                y += 40
            }
        }
        C.setAliens()
        V.step()
    },

    cancelAnimationFrame: function () {
        return C.cancelAnimationFrameBoolean
    },

    getAliens: function () {
        return [...M.aliens]
    },

    setAliens: function () {
        let down = false
        let x = 0

        if (M.aliens.length !== 0) {
            for (let i = 0; i < M.aliens.length; i++) {
                if (M.aliens[i].x + x >= 1024 - 35 || M.aliens[i].x + x <= 0) {
                    C.direction === 'left' ? C.direction = 'right' : C.direction = 'left'
                    down = true
                    break
                }

                if (M.aliens[i].y >= M.fighter.y) {
                    //Defeat
                    C.cancelAnimationFrameBoolean = true
                    V.displayEndGame('you lose')
                }
            }

            C.direction === 'left' ? x = -1 : x = 1
            M.aliens.forEach(alien => {
                if(down && !(alien instanceof MotherShip)){
                    alien.y += 40
                }
                alien.x += x
            })
        }else{
            ///Victory
            C.cancelAnimationFrameBoolean = true
            V.displayEndGame('you win')
        }


    },

    getFighter: function () {
        return {
            x: M.fighter.x,
            y: M.fighter.y
        }
    },

    setFighter: function (key) {
        const fighter = M.fighter
        if (key === 'ArrowRight') {
            if (fighter.x + 15 < 1024 - 30) {
                fighter.x += 15
            }
        } else {
            if (fighter.x - 15 > 0) {
                fighter.x -= 15
            }
        }
    },

    addMissile: function () {
        const fighter = M.fighter
        M.missiles.push(new Missile(fighter.x + 5, fighter.y - 30))
    },

    getMissiles: function () {
        return [...M.missiles]
    },

    setMisiles: function () {
        M.missiles.forEach(missile => {
            missile.y -= 5
        })
        M.missiles = M.missiles.filter(missile => {
            let saveMissile = true
            missile.y <= 0 ? saveMissile = false : null

            M.aliens = M.aliens.filter(alien => {
                let saveAlien = true
                if (missile.y >= alien.y && missile.y <= alien.y + 30 && missile.x >= alien.x && missile.x <= alien.x + 30) {
                    saveMissile = false
                    saveAlien = false
                }
                return saveAlien
            })
            return saveMissile
        })
    },
}

C.init()