//==========================================================================
// Eli_EasingPicture.js
//==========================================================================

/*:
@plugindesc ♦1.0.0♦ Add more easing animations to pictures!
@author Hakuen Studio

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
• Please, is very important to me that you rate this plugin ^^
https://hakuenstudio.itch.io/eli-easing-picture-for-rpg-maker-mz/rate?source=game

• Terms of Use
https://www.hakuenstudio.com/terms-of-use-5-0-0
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
============================================================================
Features
============================================================================

● New ease types to animate your pictures.

============================================================================
How to use
============================================================================

https://docs.google.com/document/d/1AgcyvAuzviTtH_bmuYvAv1F0093BQMW7HJhm75RqClw/edit?usp=sharing

You can see some examples of how it works here:
https://easings.net/

============================================================================

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_EasingPicture = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

const easingMethod = {

    linear(t){
        return t;
    },

    quadIn(t){
        return t**2;
    },

    quadOut(t){
        return t * (2 - t);
    },

    quadInOut(t){
        if((t *= 2) < 1){
            return 0.5 * t**2;
        }
        return -0.5 * (--t * (t - 2) - 1);
    },

    cubicIn(t){
        return t**3;
    },

    cubicOut(t){
        return --t * t * t + 1;
    },

    cubicInOut(t){
        if((t *= 2) < 1){
            return 0.5 * t**3;
        }
    
        return 0.5 * ((t -= 2) * t * t + 2);
    },

    quartIn(t){
        return t**4;
    },

    quartOut(t){
        return 1 - --t * t**3;
    },

    quartInOut(t){
        if((t *= 2) < 1){
            return 0.5 * t**4;
        }
    
        return -0.5 * ( (t -= 2) * t**3 - 2);
    },

    quintIn(t){
        return t**5;
    },

    quintOut(t){
        return --t * t**4 + 1;
    },

    quintInOut(t){
        if((t *= 2) < 1){
            return 0.5 * t**5;
        }
    
        return 0.5 * ( (t -= 2) * t**4 + 2);
    },

    sineIn(t){
        const pi = Math.PI;
        return Math.cos(t * pi / 2 - pi) + 1.0;
    },

    sineOut(t){
        return Math.sin((t * Math.PI) / 2);
    },

    sineInOut(t){
        return 0.5 * (1 - Math.cos(Math.PI * t));
    },

    expoIn(t){
        return t === 0 ? 0 : Math.pow(1024, t - 1);
    },

    expoOut(t){
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    },

    expoInOut(t){
        if (t === 0){
            return 0;
        }

        if (t === 1){
            return 1;
        }

        if ((t *= 2) < 1) {
            const expo = t - 1;
            return 0.5 * Math.pow(1024, t - 1);
        }

        return 0.5 * (-Math.pow(2, -10 * (t - 1)) + 2);
    },

    circIn(t){
        return 1 - Math.sqrt(1 - t * t);
    },

    circOut(t){
        return Math.sqrt(1 - --t * t);
    },

    circInOut(t){
        if ((t *= 2) < 1){
            return -0.5 * (Math.sqrt(1 - t * t) - 1);
        }

        return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
    },

    elasticIn(t){
        if (t === 0){
            return 0;
        }

        if (t === 1){
            return 1;
        }

        return -Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI);
    },

    elasticOut(t){
        if (t === 0){
            return 0;
        }

        if (t === 1){
            return 1;
        }

        return Math.pow(2, -10 * t) * Math.sin((t - 0.1) * 5 * Math.PI) + 1;
    },

    elasticInOut(t){
        if (t === 0){
            return 0;
        }

        if (t === 1){
            return 1;
        }

        t *= 2;
        if (t < 1){
            return -0.5 * Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI);
        }

        return 0.5 * Math.pow(2, -10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI) + 1;
    },

    backIn(t){
        const s = 1.70158;
        return t * t * ((s + 1) * t - s);
    },

    backOut(t){
        const s = 1.70158;
        return --t * t * ((s + 1) * t + s) + 1;
    },

    backInOut(t){
        const s = 1.70158 * 1.525;

        if((t *= 2) < 1){
            return 0.5 * (t * t * ((s + 1) * t - s));
        }

        return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2);
    },

    bounceIn(t){
        return 1 - this.bounceOut(1 - t);
    },

    bounceOut(t){
        if (t < 1 / 2.75) {
            return 7.5625 * t * t;

        } else if (t < 2 / 2.75) {
            return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;

        } else if (t < 2.5 / 2.75) {
            return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;

        } else {
            return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
        }
    },

    bounceInOut(t){
        if(t < 0.5){
            return this.bounceIn(t * 2) * 0.5;
        }

        return this.bounceOut(t * 2 - 1) * 0.5 + 0.5;
    },

    execute(type, t){
        return this[type](t)
    },
}

Eli.EasingPicture = {

    version: 5.02,
    url: "https://hakuenstudio.itch.io/eli-easing-picture-for-rpg-maker-mz",
    parameters: {},
    alias: {},
    pictureEasing: new Array(101).fill('linear'),

    initialize(){
        this.initParameters()
        this.initPluginCommands()
    },

    initParameters(){},

    initPluginCommands(){},

    resetEasing(id){
        if(Imported.Eli_ChoicePictures && $gameMessage.isChoice()){

        }else{
            this.pictureEasing[id] = 'linear'
        }
    },

    executePluginCommandMV(command, mvArgs){
        const cmdList = {
            PICTUREEASING: "cmdMV_setEasing",
        }
        const cmd = cmdList[command.toUpperCase()]
        if(this[cmd]){
            this[cmd](mvArgs)
        }
    },

    cmdMV_setEasing(mvArgs){
        mvArgs[2] = mvArgs[2] || ""
        const picId = Number(mvArgs[0])
        const name = mvArgs[1].toLowerCase()
        const type = {
            in: "In",
            out: "Out",
            inout: "InOut"

        }[mvArgs[2].toLowerCase()] || ""
        const easing = name+type

        this.pictureEasing[picId] = easing
    },

}

const Plugin = Eli.EasingPicture
const Alias = Eli.EasingPicture.alias

Plugin.initialize()

/* ------------------------------- GAME SCREEN ------------------------------ */
{

Alias.Game_Screen_showPicture = Game_Screen.prototype.showPicture
Game_Screen.prototype.showPicture = function(pictureId, name, origin, x, y, scaleX, scaleY, opacity, blendMode) {
    Alias.Game_Screen_showPicture.call(this, ...arguments)
    this.picture(pictureId).setId(pictureId)
}

Alias.Game_Screen_erasePicture = Game_Screen.prototype.erasePicture
Game_Screen.prototype.erasePicture = function(pictureId) {
    Alias.Game_Screen_erasePicture.call(this, pictureId)
    Plugin.resetEasing(this._id)
}

}

/* ---------------------------- GAME INTERPRETER ---------------------------- */
{

Alias.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function (command, args) {
Alias.Game_Interpreter_pluginCommand.call(this, command, args)
    Plugin.executePluginCommandMV(command, args)
}

}

/* ------------------------------ GAME PICTURE ------------------------------ */
{

Alias.Game_Picture_initialize = Game_Picture.prototype.initialize;
Game_Picture.prototype.initialize = function() {
    Alias.Game_Picture_initialize.call(this)
    this.initEasing()
    this._id = 0
}

Alias.Game_Picture_move = Game_Picture.prototype.move
Game_Picture.prototype.move = function(origin, x, y, scaleX, scaleY, opacity, blendMode, duration) {
    this.setOriginProperties()
    Alias.Game_Picture_move.call(this, ...arguments)
}

// Overwrite
Game_Picture.prototype.updateMove = function(){
    if(this._currentDuration < this._duration){
        this._currentDuration++
        let elapsedTime = this._currentDuration / this._duration
        elapsedTime = easingMethod.execute(this.easingType(), elapsedTime)

        this._x = this.processEasingOnProperty(this._originX, elapsedTime, this._targetX)
        this._y = this.processEasingOnProperty(this._originY, elapsedTime, this._targetY)
        this._scaleX = this.processEasingOnProperty(this._originScaleX, elapsedTime, this._targetScaleX)
        this._scaleY = this.processEasingOnProperty(this._originScaleY, elapsedTime, this._targetScaleY)
        this._opacity = this.processEasingOnProperty(this._originOpacity, elapsedTime, this._targetOpacity)

    }else{
        this.stopEasing()
    }

}

Alias.Game_Picture_erase = Game_Picture.prototype.erase
Game_Picture.prototype.erase = function() {
    Plugin.resetEasing(this._id)
    Alias.Game_Picture_erase.call(this)
}

Game_Picture.prototype.setId = function(id){
    this._id = id
}

Game_Picture.prototype.initEasing = function(){
    this._currentDuration = 0
    this._originX = 0
    this._originY = 0
    this._originScaleX = 0
    this._originScaleY = 0
    this._originOpacity = 0
}

Game_Picture.prototype.setOriginProperties = function(){
    this._originX = this._x
    this._originY = this._y
    this._originScaleX = this._scaleX
    this._originScaleY = this._scaleY
    this._originOpacity = this._opacity
    this._currentDuration = 0
}

Game_Picture.prototype.easingType = function(){
    return Plugin.pictureEasing[this._id]
}

Game_Picture.prototype.processEasingOnProperty = function(origin, time, target){
    return origin + time * (target - origin)
}

Game_Picture.prototype.stopEasing = function(){
    this.initEasing()
    this._duration = 0
}

}

}