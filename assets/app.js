class UFO {
    constructor(){
        this._x = null,
        this._y = null,
        this._height = null,
        this._width = null,
        this._status = true
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
    constructor(){
        super()
    }
}

class Fighter extends UFO {
    constructor(){
        super()
    }
}

class Missile extends UFO {
    constructor(){
        super()
    }
}


var M = {
    fighter = null,
    alliens = [],
    missiles  = []
}

var V = {
    init : function (){
    }
}

var C = {
    init : function (){
        V.init()
    }
}

C.init()