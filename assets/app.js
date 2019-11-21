class UFO {
    constructor() {
        this._id = null,
            this._x = null,
            this._y = null,
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
    get height() {
        return this._height
    }
    get width() {
        return this._width
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
    set height(height) {
        return this._height = height
    }
    set width(width) {
        return this._width = width
    }
    set status(status) {
        return this._status = status
    }
}

class Alien extends UFO {
    constructor(id) {
        super()
        this._id = id
    }
}

class Fighter extends UFO {
    constructor() {
        super()
        this._y = 780
        this._x = 512
    }
}

class Missile extends UFO {
    constructor(id, x) {
        super()
        this._id = id
    }
}


var M = {
    fighter: null,
    aliens: [],
    missiles: [],
    indexMissiles: 0,
}

var V = {
    direction: 'right',
    click: 'true',

    displayAlien: function (id) {
        const aliens = document.getElementById('aliens')
        const template = document.getElementById('alien')
        const clone = document.importNode(template.content, true);
        const div = clone.querySelector("div")
        div.setAttribute('data-id', id)

        aliens.appendChild(clone);
    },

    movefighter: function (key, spaceship) {
        const element = document.getElementById('fighter')
        if (key === 'ArrowRight') {
            if (spaceship.x + 15 < 1024) {
                spaceship.x += 15
            }
        } else {
            if (spaceship.x - 15 > 0) {
                spaceship.x -= 15
            }
        }
        element.style.left = `${spaceship.x}px`
    },

    displayMissile: function (fighter, id) {
        const game = document.getElementById('game')
        const template = document.getElementById('missile')
        const clone = document.importNode(template.content, true);
        const div = clone.querySelector("div")

        div.setAttribute('data-id', id)
        div.style.left = `${fighter.x + 5}px`
        div.style.bottom = '28px'



        game.appendChild(clone)
    },

    removeMissile: function (div) {
        const game = document.getElementById('game')
        game.removeChild(div)
    },

    removeAlien: function (div) {
        div.classList.add('disabled')
    },

    defineKeyUpEventListener: function () {
        document.addEventListener('keyup', e => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                C.movefighter(e.key)
            }
            if (e.key === 'ArrowUp') {
                if (V.click) {
                    C.addMissile()
                    V.click = false;
                    setTimeout(function () {
                        V.click = true
                    }, 800)
                }
            }
        })
    },

    step: function () {
        requestAnimationFrame(function () {
            const aliensDiv = document.getElementById('aliens')
            if (V.direction === 'right' && parseInt(aliensDiv.style.marginRight) > 0) {
                aliensDiv.style.marginLeft = `${parseInt(aliensDiv.style.marginLeft) + 1}px`
                aliensDiv.style.marginRight = `${parseInt(aliensDiv.style.marginRight) - 1}px`
            } else {
                if (V.direction === 'right') {
                    aliensDiv.style.marginTop = `${parseInt(aliensDiv.style.marginTop) + 20}px`
                }
                V.direction = 'left'
            }

            if (V.direction === 'left' && parseInt(aliensDiv.style.marginLeft) > 0) {
                aliensDiv.style.marginLeft = `${parseInt(aliensDiv.style.marginLeft) - 1}px`
                aliensDiv.style.marginRight = `${parseInt(aliensDiv.style.marginRight) + 1}px`
            } else {
                if (V.direction === 'left') {
                    aliensDiv.style.marginTop = `${parseInt(aliensDiv.style.marginTop) + 20}px`
                }
                V.direction = 'right'
            }

            const missiles = document.querySelectorAll('.missile')
            if (missiles.length) {
                missiles.forEach(missile => {

                    let aliens = document.querySelectorAll('.alien_normal')
                    aliens = Array.from(aliens).filter(alien => !alien.classList.contains("disabled"))
                    aliens.forEach(alien => {
                            if (missile.getBoundingClientRect().top >= alien.getBoundingClientRect().top
                                && missile.getBoundingClientRect().top <= alien.getBoundingClientRect().top + 30
                                && missile.getBoundingClientRect().left >= alien.getBoundingClientRect().left - 5
                                && missile.getBoundingClientRect().left <= alien.getBoundingClientRect().left + 25) {

                                C.removeMissile(missile)
                                C.removeAlien(alien)
                                return
                            }
                    });

                    if (parseInt(missile.style.bottom) + 5 < 780) {
                        missile.style.bottom = `${parseInt(missile.style.bottom) + 5}px`
                    } else {
                        C.removeMissile(missile)
                    }
                });
            }

            V.step()
        });
    },
}

var C = {
    init: function () {
        for (let i = 0; i < 70; i++) {
            M.aliens.push(new Alien(i))
            V.displayAlien(i)
        }

        M.fighter = new Fighter()

        V.defineKeyUpEventListener()

        requestAnimationFrame(function () {
            V.step()
        });
    },

    movefighter: function (key) {
        V.movefighter(key, M.fighter)
    },

    addMissile: function () {
        const id = M.indexMissiles++
        M.missiles.push(new Missile(id, M.fighter.x + 5))
        V.displayMissile(M.fighter, id)
    },

    removeMissile: function (element) {
        V.removeMissile(element)

        M.missiles.forEach(missile => {
            if (missile.id === element.getAttribute('data-id')) {
                M.missiles.splice(M.missiles.indexOf(missile), 1);
                return
            }
        })
    },

    removeAlien: function (element) {
        V.removeAlien(element)
        M.aliens.forEach(alien => {
            if (alien.id === element.getAttribute('data-id')) {
                alien.status = false
                return
            }
        })
    }
}

C.init()