class UFO {
    constructor(x, y) {
        this._x = x
        this._y = y
        this._status = true
    }

    get id() {
        return this._id
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
    fighterTemplate: new Image(),
    alien: new Image(),
    missileTemplate: new Image(),

    step: function () {
        requestAnimationFrame(function () {
            const ctx = document.getElementById('game').getContext('2d');
            const aliens = C.getAliens()

            ctx.globalCompositeOperation = 'destination-over';
            ctx.canvas.width = 1024;
            ctx.canvas.height = 780;
            ctx.clearRect(0, 0, ctx.witdh, ctx.height);

            aliens.forEach(alien => {
                ctx.drawImage(V.alien, alien.x, alien.y, 35, 35);
            });

            C.setAliens()
            V.step()
        })
    }

}

var C = {
    direction: 'right',

    init: function () {
        V.alien.src = `${location.pathname}/../assets/images/alien.svg`

        M.fighter = new Fighter(512, 780)

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
            let alienX = alien.x
            if ((alienX += x) >= 1024 - 35 || (alienX += x) <= 0) {
                C.direction === 'left' ? C.direction = 'right' : C.direction = 'left'
                down = true
            }
        });

        M.aliens.forEach(alien => {
            down ? alien.y += 40 : null
            alien.x += x
        })
    },

    getAlien: function () {

    }
}

C.init()

