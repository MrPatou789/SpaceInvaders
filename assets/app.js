class UFO {
    constructor(x, y) {
        this._x = x
        this._y = y
        this._status = true
    }

    get x() {
        return this._x
    }
    get y() {
        return this._y
    }
    get status() {
        return this._status
    }


    set x(x) {
        return this._x = x
    }
    set y(y) {
        return this._y = y
    }
    set status(status) {
        return this._status = status
    }
}

class Alien extends UFO {
    constructor(x, y) {
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

    defineKeyUpEventListener: function () {
        document.addEventListener('keyup', e => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                C.setFighter(e.key)
            }
        })
    },

    step: function () {
        requestAnimationFrame(function () {
            const ctx = document.getElementById('game').getContext('2d');
            const aliens = C.getAliens()
            const fighter = C.getFighter()

            ctx.globalCompositeOperation = 'destination-over';
            ctx.canvas.width = 1024;
            ctx.canvas.height = 780;
            ctx.clearRect(0, 0, ctx.witdh, ctx.height);

            aliens.forEach(alien => {
                ctx.drawImage(V.alien, alien.x, alien.y, 35, 35);
            });

            ctx.drawImage(V.fighter, fighter.x, fighter.y, 30, 30)

            C.setAliens()
            V.step()
        })
    }

}

var C = {
    direction: 'right',

    init: function () {
        V.alien.src = `${location.pathname}/../assets/images/alien.svg`
        V.fighter.src = `${location.pathname}/../assets/images/fighter.svg`
        V.defineKeyUpEventListener()

        M.fighter = new Fighter(512, 780 - 40)

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

    getAliens: function () {
        return [...M.aliens]
    },

    setAliens: function () {
        let down = false
        let x = 0
        C.direction === 'left' ? x = -1 : x = 1

        M.aliens.forEach(alien => {
            if (alien.x + x >= 1024 - 35 || alien.x + x <= 0) {
                C.direction === 'left' ? C.direction = 'right' : C.direction = 'left'
                down = true
            }
        });

        M.aliens.forEach(alien => {
            down ? alien.y += 40 : null
            alien.x += x
        })
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
    }
}

C.init()

