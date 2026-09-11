//==========================================================================
// EliMVZ_Pictures.js
//==========================================================================

/*:
@target MZ

@plugindesc ♦1.0.0♦ Enhance the picture feature with plugin commands!
@author Hakuen Studio
@url https://hakuenstudio.itch.io/eli-enhanced-pictures

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
Patreon      → https://www.patreon.com/hakuenstudio
Terms of Use → https://www.hakuenstudio.com/terms-of-use-5-0-0
Facebook     → https://www.facebook.com/hakuenstudio
Instagram    → https://www.instagram.com/hakuenstudio
Twitter      → https://twitter.com/hakuen_studio
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
============================================================================
Requirements
============================================================================

Need Eli Book.
Order After Eli Book

============================================================================
Features
============================================================================

● New command for show and move pictures, letting you use formulas and 
variables for positions, scale, and opacity.
● Fade picture command.
● Erase more than one picture at once using \v[id] or formulas.
● More origin points, besides the default Upper Left and Center: 
Upper Right, Upper Center, Center Left, Center Right, Low Left, 
Low Center, Low Right.

============================================================================
How to use MZ
============================================================================

♦ Plugin Command: Show Picture ♦

You can open the text field of the "name" argument, and use variables 
there.
You can use \V[ID] and \SV[ID] if using Eli self variable, on the 
Name, X, Y, Opacity, Duration, ScaleX, ScaleY properties.

♦ Plugin Command: Move Picture ♦

If you don't want to change a property, just leave it empty and it will 
stay the same.
You can use \V[ID] and \SV[ID] if using Eli self variable, on the X, Y, 
Opacity, Duration, ScaleX, ScaleY properties.

♦ Plugin Command: Erase Picture ♦

Erase one or more pictures at once.

============================================================================
How to use MV
============================================================================

◆ Plugin Command: MovePic ◆ Allow multiple entries

To make this command work, the picture must be already created with 
the show picture command.
After that, you will choose the picture id you want to move and its 
properties:

MovePic Id Prop:Value Prop:Value Prop:Value ...etc

You can move multiple pictures with the same command.
Just separate each ID with an underline "_".

You can use the following properties:
X, Y, ScaleX, ScaleY, Opacity, Blend, Origin, Duration, Wait.

The blended value must be replaced with one of the following:
• Normal
• Additive
• Screen
• Multiply

The origin value must be replace with one of the following, without spaces:
• UpperLeft
• UpperCenter
• UpperRight
• CenterLeft
• Center
• CenterRight
• LowLeft
• LowCenter
• LowRight

The Wait value must be replaced with true or false.

Examples:

Moving only Picture X position:
◆Plugin Command：MovePic 1 X:600 Duration:30 Wait:true

Moving more than one Picture X position:
◆Plugin Command：MovePic 1,3,7 X:600 Duration:30 Wait:true

Changing Origin:
◆Plugin Command：MovePic 1 Origin:CenterLeft

Moving All properties:
◆Plugin Command：MovePic 1 X:0 Y:0 ScaleX:50 ScaleY:50 Opacity:150 Origin:UpperLeft Blend:Normal Duration:15 Wait:true

You can use \V[ID] and \SV[ID] if using Eli self variable, on the X, Y, Opacity, Duration, ScaleX, ScaleY properties.

◆ Plugin Command: ErasePic ◆ Allow multiple entries.

You can erase more than one picture at once:

◆Plugin Command：ErasePic 1,2,3
Will erase picture id 1, 2, 3.

NOTE: It cannot have spaces between the ids.

◆ Plugin Command: FadeInPic & FadeOutPic ◆ Allow multiple entries.

◆Plugin Command：FadeInPic Id Duration
◆Plugin Command：FadeOutPic Id Duration

============================================================================
Multiple Operators (MV and MZ)
============================================================================

You can set the values using either, \v[id], \SV[ID] if using 
Eli self variable, or numbers.
You can also set multiple entries separating them by comma(,) or double 
trace(--) when you want to get a range of numbers.

Exemple: Selecting multiple ids:

1, 2, \v[3], 4--8, 9

The command will be applied for pictures with ID 1, 2, the value 
of the variable 3, 4, 5, 6, 7, 8, 9.

As you can see the "--" is like a range operator. It will get all numbers 
between(and including) the 4 and 8.

============================================================================
Update Log
============================================================================

https://tinyurl.com/enhancedPictures

============================================================================

@command cmd_show
@text Show Picture
@desc The default show picture command. But you can use formulas and \v[id].

    @arg name
    @text Picture name
    @type file
    @dir img/pictures
    @desc The picture file. Can use \v[id] or formulas in the text field.
    @default ""

    @arg id
    @text Picture Id
    @type text
    @desc The picture id. Can use \v[id] or numbers. Allow Multiple entries.
    @default 1

    @arg origin
    @text Origin
    @type select
    @option UpperLeft
    @option UpperCenter
    @option UpperRight
    @option CenterLeft
    @option Center
    @option CenterRight
    @option LowLeft
    @option LowCenter
    @option LowRight
    @desc Choose the origin of the picture.
    @default UpperLeft

    @arg x
    @text Position X
    @type text
    @desc The X position on the screen.
    @default 0

    @arg y
    @text Position Y
    @type text
    @desc The Y position on the screen.
    @default 0

    @arg scaleX
    @text Scale Width
    @type text
    @desc The scale width
    @default 100

    @arg scaleY
    @text Scale Height
    @type text
    @desc The scale height
    @default 100

    @arg opacity
    @text Opacity
    @type text
    @desc 0 to 255.
    @default 255

    @arg blendMode
    @text Blend mode
    @type select
    @desc Choose blend Type
    @option Normal @option Additive @option Multiply @option Screen
    @default Normal

@command cmd_move
@text Move Picture
@desc The default move picture, but with more easing options and capable of formulas and \v[id]. Leave an option in blank to not change it.

    @arg id
    @text Picture Id
    @type text
    @desc The picture id. Can use \v[id] or numbers. Allow Multiple entries.
    @default

    @arg origin
    @text Origin
    @type select
    @option UpperLeft
    @option UpperCenter
    @option UpperRight
    @option CenterLeft
    @option Center
    @option CenterRight
    @option LowLeft
    @option LowCenter
    @option LowRight
    @desc Choose the origin of the picture.
    @default

    @arg x
    @text Position X
    @type text
    @desc The X position on the screen.
    @default

    @arg y
    @text Position Y
    @type text
    @desc The Y position on the screen.
    @default

    @arg scaleX
    @text Scale Width
    @type text
    @desc Must return a number of 0 to 100.
    @default

    @arg scaleY
    @text Scale Height
    @type text
    @desc Must return a number of 0 to 100.
    @default

    @arg opacity
    @text Opacity
    @type text
    @desc 0 to 255
    @default

    @arg blendMode
    @text Blend mode
    @type select
    @desc Choose blend Type
    @option Normal @option Additive @option Multiply @option Screen
    @default

    @arg easingType
    @text Easing
    @type select
    @option linear @option slowStart @option slowEnd @option slowStartEnd @option --- IN --- @option quadIn @option cubicIn @option quartIn @option quintIn @option sineIn @option expoIn @option circIn @option elasticIn @option backIn @option bounceIn @option --- OUT --- @option quadOut @option cubicOut @option quartOut @option quintOut @option sineOut @option expoOut @option circOut @option elasticOut @option backOut @option bounceOut @option --- IN OUT --- @option quadInOut @option cubicInOut @option quartInOut @option quintInOut @option sineInOut @option expoInOut @option circInOut @option elasticInOut @option backInOut @option bounceInOut
    @desc Select the easy type.
    @default

    @arg duration
    @text Duration
    @type text
    @desc The number of frames that the picture will take to finish the movement.
    @default 0

    @arg wait
    @text Wait
    @type boolean
    @desc If the current event will wait the picture finish his movement.
    @default false

@command cmd_fadeIn
@text Fade In Picture
@desc Fade in a picture.

    @arg id
    @text Id
    @type text
    @desc The picture id. Can use \v[id] or numbers. Allow Multiple entries.
    @default

    @arg duration
    @text Duration
    @type number
    @desc the time in frames.
    @default 60

    @arg wait
    @text Wait
    @type boolean
    @desc If the current event will wait the picture finish his movement.
    @default false

@command cmd_fadeOut
@text Fade Out Picture
@desc Fade out a picture.

    @arg id
    @text Id
    @type text
    @desc The picture id. Can use \v[id] or numbers. Allow Multiple entries.
    @default

    @arg duration
    @text Duration
    @type number
    @desc the time in frames.
    @default 60

    @arg wait
    @text Wait
    @type boolean
    @desc If the current event will wait the picture finish his movement.
    @default false

@command cmd_erase
@text Erase Picture
@desc Separate each one with a comma. Can use \v[id] or formula.

    @arg id
    @text Id
    @type text
    @desc The picture id. Can use \v[id] or numbers. Allow Multiple entries.
    @default

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_Pictures = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

Eli.Pictures = {

    version: 5.03,
    url: "https://hakuenstudio.itch.io/eli-enhanced-pictures",
    alias: {},
    parameters: {},
    
    initialize(){
        this.initParameters()
        this.initPluginCommands()
    },

    initParameters(){},

    initPluginCommands(){
        const commands = ["cmd_show", "cmd_move", "cmd_fadeIn", "cmd_fadeOut", "cmd_erase"]
        Eli.PluginManager.registerCommands(this, commands)
    },

    processPictureProp(prop = ""){
        if(prop === ""){
            return undefined

        }else{
            const value = Eli.Utils.processEscapeVarOrFormula(prop)
            return isNaN(value) ? undefined : Number(value)
        }
    },

    processPictureOrigin(prop = ""){
        if(prop === ""){
            return undefined

        }else{
            const origin = Eli.Utils.convertEscapeVariablesOnly(prop)
            const anchors = {
                
                UpperLeft: 0, // Default
                UpperCenter: 4,
                UpperRight: 2,
    
                CenterLeft: 3,
                Center: 1, // Default
                CenterRight: 5,
                
                LowLeft: 6,
                LowCenter: 7,
                LowRight: 8,
            }
    
            return anchors[origin] || 0
        }
    },

    processPictureBlendMode(prop = ""){
        if(prop === ""){
            return undefined

        }else{
            const blend = Eli.Utils.convertEscapeVariablesOnly(prop)
            const result  = {
                undefined: undefined,
                Normal: 0,
                Additive: 1,
                Multiply: 2,
                Screen: 3,
            }
            return result[blend] || 0
        }
    },

    processPictureTint(prop = ""){
        if(prop === ""){
            return undefined
        }else{
            return Eli.ColorManager.getRgbForTone(prop)
        }
    },

    processPictureEasing(prop = ""){
        const easing = {linear: 0, slowStart: 1, slowEnd: 2, slowStartEnd: 3}
        return easing[prop] === undefined ? prop : easing[prop]
    },

    cmd_show(args){
        const name = Eli.Utils.processEscapeVarOrFormula(args.name)
        const ids = Eli.PluginManager.createRangeOfNumbers(args.id)
        const tempProps = {
            x: this.processPictureProp(args.x),
            y: this.processPictureProp(args.y),
            scaleX: this.processPictureProp(args.scaleX),
            scaleY: this.processPictureProp(args.scaleY),
            opacity: this.processPictureProp(args.opacity),
            blendMode: this.processPictureBlendMode(args.blendMode) || 0,
            origin: this.processPictureOrigin(args.origin) || 0,
        }

        tempProps.x = tempProps.x               === undefined ? 0   : tempProps.x
        tempProps.y = tempProps.y               === undefined ? 0   : tempProps.y
        tempProps.scaleX = tempProps.scaleX     === undefined ? 100 : tempProps.scaleX
        tempProps.scaleY = tempProps.scaleY     === undefined ? 100 : tempProps.scaleY
        tempProps.opacity = tempProps.opacity   === undefined ? 255 : tempProps.opacity

        const {origin, x, y, scaleX, scaleY, opacity, blendMode} = tempProps

        for(const id of ids){
            $gameScreen.showPicture(id, name, origin, x, y, scaleX, scaleY, opacity, blendMode)
        }

    },

    cmd_move(args){
        const ids = Eli.PluginManager.createRangeOfNumbers(args.id)

        const tempProps = {
            x: this.processPictureProp(args.x),
            y: this.processPictureProp(args.y),
            scaleX: this.processPictureProp(args.scaleX),
            scaleY: this.processPictureProp(args.scaleY),
            blendMode: this.processPictureBlendMode(args.blendMode),
            origin: this.processPictureOrigin(args.origin),
            opacity: this.processPictureProp(args.opacity),
            duration: this.processPictureProp(args.duration),
            easing: this.processPictureEasing(args.easing),
        }

        for(const id of ids){
            const picture = $gameScreen.picture(id)

            if(picture){
                tempProps.x = tempProps.x                   === undefined ? picture.x()         : tempProps.x
                tempProps.y = tempProps.y                   === undefined ? picture.y()         : tempProps.y
                tempProps.scaleX = tempProps.scaleX         === undefined ? picture.scaleX()    : tempProps.scaleX
                tempProps.scaleY = tempProps.scaleY         === undefined ? picture.scaleY()    : tempProps.scaleY
                tempProps.blendMode = tempProps.blendMode   === undefined ? picture.blendMode() : tempProps.blendMode
                tempProps.origin = tempProps.origin         === undefined ? picture.origin()    : tempProps.origin
                tempProps.opacity = tempProps.opacity       === undefined ? picture.opacity()   : tempProps.opacity
                tempProps.duration = tempProps.duration     === undefined ? 1                   : tempProps.duration
                tempProps.easing = tempProps.easing         === undefined ? picture._easingType : 0
    
                const {origin, x, y, scaleX, scaleY, opacity, blendMode, duration, easing} = tempProps

                $gameScreen.movePicture(id, origin, x, y, scaleX, scaleY, opacity, blendMode, duration, easing)
            }
        }
    },

    cmd_fadeIn(args){
        const ids = Eli.PluginManager.createRangeOfNumbers(args.id)
        const duration = Number(args.duration)

        for(const id of ids){
            const picture = $gameScreen.picture(id)

            if(picture){
                this.movePicToFade(picture, duration, 0) 
            }
        }

        if(args.wait === "true"){
            Eli.PluginManager.currentInterpreter.wait(duration)
        }
    },

    cmd_fadeOut(args){
        const ids = Eli.PluginManager.createRangeOfNumbers(args.id)
        const duration = Number(args.duration)

        for(const id of ids){
            const picture = $gameScreen.picture(id)

            if(picture){
                this.movePicToFade(picture, duration, 255) 
            }
        }

        if(args.wait === "true"){
            Eli.PluginManager.currentInterpreter.wait(duration)
        }
    },

    cmd_erase(args){
        const ids = Eli.PluginManager.createRangeOfNumbers(args.id)

        for(const id of ids){
            $gameScreen.erasePicture(id)
        }
    },

    movePicToFade(picture, duration, opacity){
        picture.move(
            picture.origin,
            picture.x(),
            picture.y(),
            picture.scaleX(),
            picture.scaleY(),
            opacity,
            picture.blendMode(),
            duration,
            picture._easingType,
        )
    },

    cmdMV_show(args = []){
        const settings = {
            x: undefined,
            y: undefined,
            scalex: undefined,
            scaley: undefined,
            blend: undefined,
            origin: undefined,
            wait: "false",
            duration: undefined,
            opacity: undefined,
            id: args[0],
            name: undefined,
        }

        for(let i = 1; i < args.length; i++){
            const [prop, value] = args[i].split(":")
            settings[prop.toLowerCase()] = value
        }

        settings.scaleX = settings.scalex
        settings.scaleY = settings.scaley
        settings.blendMode = settings.blend

        this.cmd_show(settings)
    },

    cmdMV_move(args = []){
        const settings = {
            x: undefined,
            y: undefined,
            scalex: undefined,
            scaley: undefined,
            blend: undefined,
            origin: undefined,
            wait: "false",
            duration: undefined,
            opacity: undefined,
            id: args[0],
        }

        for(let i = 1; i < args.length; i++){
            const [prop, value] = args[i].split(":")
            settings[prop.toLowerCase()] = value
        }

        settings.scaleX = settings.scalex
        settings.scaleY = settings.scaley
        settings.blendMode = settings.blend

        this.cmd_move(settings)
    },

    cmdMV_fadeIn(args){
        const mzArgs = {
            id: args[0],
            duration: args[1],
            wait: args[2]
        }
        this.cmd_fadeIn(mzArgs)
    },

    cmdMV_fadeOut(args){
        const mzArgs = {
            id: args[0],
            duration: args[1],
            wait: args[2]
        }
        this.cmd_fadeOut(mzArgs)
    },

    cmdMV_erase(args = []){
        const mzArgs = {
            id: args.join(",")
        }
        this.cmd_erase(mzArgs)
    },

    executePluginCommandMV(command = "", mvArgs = []){
        const cmdList = {
            MOVEPIC: "cmdMV_move",
            ERASEPIC: "cmdMV_erase",
            FADEINPIC: "cmdMV_fadeIn",
            FADEOUTPIC: "cmdMV_fadeOut",
        }
        const cmd = cmdList[command.toUpperCase()]
        if(this[cmd]){
            this[cmd](mvArgs)
        }
    },

}

const Plugin = Eli.Pictures
const Alias = Eli.Pictures.alias

Plugin.initialize()

if(Utils.RPGMAKER_VERSION === "MV"){
/* ------------------------------ GAME PICTURE ------------------------------ */

Alias.Game_Picture_initialize = Game_Picture.prototype.initialize
Game_Picture.prototype.initialize = function() {
    Alias.Game_Picture_initialize.call(this)
    this._fadeInDuration = 0
    this._fadeOutDuration = 0
}

Alias.Game_Picture_update = Game_Picture.prototype.update;
Game_Picture.prototype.update = function(){
    Alias.Game_Picture_update.call(this)
    this.updateFadeOut()
    this.updateFadeIn()
}

Game_Picture.prototype.updateFadeOut = function() {
    if (this._fadeOutDuration > 0) {
        const d = this._fadeOutDuration

        this._opacity = (this._opacity * (d - 1)) / d
        this._fadeOutDuration--
    }
}

Game_Picture.prototype.updateFadeIn = function() {
    if (this._fadeInDuration > 0) {
        const d = this._fadeInDuration

        this._opacity = (this._opacity * (d - 1) + 255) / d
        this._fadeInDuration--
    }
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

/* ----------------------------- SPRITE PICTURE ----------------------------- */
{

// Overwrite origin
// Alias.Sprite_Picture_updateOrigin = Sprite_Picture.prototype.updateOrigin;
Sprite_Picture.prototype.getAnchorByOrigin = function(origin) {
    const anchors = {
        0: {x: 0,   y:0},   // Upper Left
        4: {x: 0.5, y:0},   // Upper Center
        2: {x: 1,   y:0},   // Upper Right

        3: {x: 0,   y:0.5}, // Center Left
        1: {x: 0.5, y:0.5}, // Center
        5: {x: 1,   y:0.5}, // Center Right

        6: {x: 0,   y:1},   // Low Left
        7: {x: 0.5, y:1},   // Low Center
        8: {x: 1,   y:1},   // Low Right
    }

    return anchors[origin] || {x:0, y:0}
}

Sprite_Picture.prototype.updateOrigin = function() {
    const picture = this.picture()
    const {x, y} = this.getAnchorByOrigin(picture.origin())
    this.anchor.x = x
    this.anchor.y = y
}

}

}