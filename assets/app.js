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
        this._y = 28
        this._x = x
    }
}


var M = {
    fighter: null,
    aliens: [],
    missiles: [],
    indexMissiles : 0,
}

var V = {
    direction : 'right',

    displayAlien: function (id) {
        const aliens = document.getElementById('aliens')
        const template = document.getElementById('alien')
        const clone = document.importNode(template.content, true);
        const div = clone.querySelector("div")
        div.setAttribute('data-id', id)

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

    displayMissile : function(fighter, id){
        const game = document.getElementById('game')
        const img = document.createElement('img')
        img.classList.add('missile')
        img.setAttribute('data-id', id)
        img.style.left = `${fighter.x + 5}px`
        img.style.bottom = '28px'
        img.src = './assets/images/missile.png'

        game.appendChild(img)
    },

    removeMissile : function(div){
        const game = document.getElementById('game')
        game.removeChild(div)
    },

    defineKeyUpEventListener : function(){
        document.addEventListener('keyup', e => {
            if(e.key === 'ArrowRight' || e.key === 'ArrowLeft'){
                C.movefighter(e.key)
            }
            if(e.key === 'ArrowUp'){
                C.addMissile()
            }
        })
    },

    step : function (missiles) {
        requestAnimationFrame(function () {
            const aliens = document.getElementById('aliens')
            // console.log(missiles)
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
            if(missiles.length){
                missiles.forEach(element => {
                    let div = Array.from(document.querySelectorAll('.missile')).filter(missile => +missile.getAttribute('data-id') === element.id)
                    if(element.y + 5 < 780){
                        element.y = element.y + 5
                        div[0].style.bottom = `${element.y}px`
                    }else{
                        C.removeMissile(element, div[0])
                    }

                });
            }
            
            V.step(missiles)
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
            V.step(M.missiles)
        });
    },

    movefighter : function(key){
        V.movefighter(key , M.fighter)
    },

    addMissile : function (){
        const id = M.indexMissiles++
        M.missiles.push(new Missile(id, M.fighter.x + 5))
        V.displayMissile(M.fighter, id)
    },

    removeMissile : function (element, div){
        V.removeMissile(div)
        M.missiles.splice( M.missiles.indexOf(element), 1);
    }
}

C.init()