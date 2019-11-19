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
    constructor() {
        super()
    }
}


var M = {
    fighter: null,
    aliens: [],
    missiles: []
}

var V = {
    direction : 'right',

    displayAlien: function (id) {
        const aliens = document.getElementById('aliens')
        const template = document.getElementById('alien')
        const clone = document.importNode(template.content, true);
        const div = clone.querySelector("div")
        div.setAttribute('data', id)

        aliens.appendChild(clone);
    },

    movefighter: function(key, spaceship){
            const element = document.getElementById('fighter')
            if(key === 'ArrowRight'){
                if(spaceship.x + 15 < 1024){
                    spaceship.x += 15
                }
            }else{
                if(spaceship.x - 15 > 0){
                    spaceship.x -= 15
                }
            }
            element.style.left = `${spaceship.x}px`
    },

    defineKeyUpEventListener : function(){
        document.addEventListener('keydown', e => {
            if(e.key === 'ArrowRight' || e.key === 'ArrowLeft'){
                C.movefighter(e.key)
            }
        })
    },

    step : function () {
        requestAnimationFrame(function () {
            const aliens = document.getElementById('aliens')
            if (V.direction === 'right' && parseInt(aliens.style.marginRight) > 0) {
                aliens.style.marginLeft = `${parseInt(aliens.style.marginLeft) + 1}px`
                aliens.style.marginRight = `${parseInt(aliens.style.marginRight) - 1}px`
            }else{
                if( V.direction === 'right'){
                    aliens.style.marginTop = `${parseInt(aliens.style.marginTop) + 20}px`
                }
                V.direction = 'left'
            }

            if (V.direction === 'left' && parseInt(aliens.style.marginLeft) > 0) {
                aliens.style.marginLeft = `${parseInt(aliens.style.marginLeft) - 1}px`
                aliens.style.marginRight = `${parseInt(aliens.style.marginRight) + 1}px`
            }else{
                if( V.direction === 'left'){
                    aliens.style.marginTop = `${parseInt(aliens.style.marginTop) + 20}px`
                }
                V.direction = 'right'
            }
            
            V.step()
        });
    },
}

var C = {
    init: function () {
        for (let i = 0; i < 57; i++) {
            M.aliens.push(new Alien(i))
            V.displayAlien(i)

        }

        M.fighter = new Fighter()

        V.defineKeyUpEventListener()

        requestAnimationFrame(function () {
            V.step()
        });
    },

    movefighter : function(key){
        V.movefighter(key , M.fighter)
    }
}

C.init()