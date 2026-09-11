//============================================================================
// Eli_PressStart.js
//============================================================================

/*:
@plugindesc ♦1.0.0♦ Adds a press start sprite on title screen or scene map.
@author Hakuen Studio

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
Plugin requirements
============================================================================

Need Eli Book.

Order after Eli Book.

============================================================================
Features
============================================================================

• Choose an image to use for the press start feature.
• Choose predefined positions or custom ones.
• Choose how quickly the opacity will change.
• Choose what button you will press on the press start feature(or just 
press any button).
• Choose an MV/MZ animation to play when you press the button.
• Optionally choose a delay for the 'Press Start' to be gone after you 
press the button.
• Can use it not only in the title screen but also on the scene map for 
event title screens.

============================================================================
How to use
============================================================================

The plugin parameters are self-explanatory.
You can use it on the title screen(by default) or if you want to use it 
in Scene Map, you have to use the plugin command or script call.

Script call:
Eli.PressStart.createMapSprite()

Plugin Command:
PressStart

Put an image of your preference in the img/system.

Here is a list of the default keys of RPG Maker(Keyboard/Gamepad):

"tab",      ■ Keyboard: tab
"ok",       ■ Keyboard: enter, space, Z ■ Gamepad: A
"shift",    ■ Keyboard: shift ■ Gamepad: X
"control",  ■ Keyboard: control, alt
"escape",   ■ Keyboard: escape, numpad0, insert, x
"pageup",   ■ Keyboard: Q, pageup ■ Gamepad: LB
"pagedown", ■ Keyboard: W, pagedown ■ Gamepad: RB
"left",     ■ Keyboard: left arrow, numpad4 ■ Gamepad: D-pad left
"up",       ■ Keyboard: up arrow, numpad8 ■ Gamepad: D-pad up
"right",    ■ Keyboard: right arrow, numpad6 ■ Gamepad: D-pad right
"down",     ■ Keyboard: down arrow, numpad2 ■ Gamepad: D-pad down
"debug"     ■ Keyboard: F9
"cancel"    ■ Gamepad: B
"menu"      ■ Gamepad: Y

============================================================================
Update Log
============================================================================

https://tinyurl.com/pressStartLog

============================================================================

@param image
@text Press Start Image
@type file
@dir img/system
@desc Choose an image from the system folder to appear on the title screen or scene map.
@default
@require 1

@param anyButton
@text Any Button Will work
@type boolean
@desc If set to true, any button pressed will work remove the Press Start image.
@default true

@param keyboardButton
@text Keyboard Button
@type select
@option none @option a @option b @option c @option d @option e @option f @option g @option h @option i @option j @option k @option l @option m @option n @option o @option p @option q @option r @option s @option t @option u @option v @option w @option x @option y @option z @option 0 @option 1 @option 2 @option 3 @option 4 @option 5 @option 6 @option 7 @option 8 @option 9 @option backspace @option tab @option enter @option shift @option ctrl @option alt @option pausebreak @option capslock @option esc @option space @option pageup @option pagedown @option end @option home @option leftarrow @option uparrow @option rightarrow @option downarrow @option insert @option delete @option leftwindowkey @option rightwindowkey @option selectkey @option numpad0 @option numpad1 @option numpad2 @option numpad3 @option numpad4 @option numpad5 @option numpad6 @option numpad7 @option numpad8 @option numpad9 @option multiply @option add @option subtract @option decimalpoint @option divide @option f1 @option f2 @option f3 @option f4 @option f5 @option f6 @option f7 @option f8 @option f9 @option f10 @option f11 @option f12 @option numlock @option scrolllock @option semicolon @option equalsign @option comma @option dash @option period @option forwardslash @option graveaccent @option openbracket @option backslash @option closebracket @option singlequote
@desc Choose the keyboard button. Default is Enter.
@default enter
@parent anyButton

@param gamepadButton
@text Game pad button
@type select
@option none @option a @option b @option x @option y @option lb @option rb @option lt @option rt @option select @option start @option l3 @option r3 @option up @option down @option left @option right 
@desc Choose the gamepad button. Put none to not use.
Default is none.
@default none
@parent anyButton

@param overwrite
@text Overwrite keys
@type boolean
@desc Set to true if you want to overwrite the default keys.
@default true

@param animation
@text Animation Id
@type animation
@desc Select an animation to play when the button is pressed.
@default 0

@param minOpacity
@text Min Opacity
@type number
@min 1
@max 255
@desc Choose the minimum value for the opacity when fading the sprite.
@default 80

@param fadeSpeed
@text Fade Speed
@type number
@min 1
@max 255
@desc Select how many opacity will increase per frame.
@default 4

@param delay
@text Delay
@type number
@desc Choose a delay(in frames) for the Sprite to be gone after you press a button.
@default 60

@param position
@text Position
@type struct<positionSt>
@desc The position of the press start.
@default {"alignX":"center","offsetX":"0","alignY":"center","offsetY":"0"}

*/

/* -------------------------------- POSITION -------------------------------- */
{

/*~struct~positionSt:

@param alignX
@text Align X
@type select
@option none
@option left
@option center
@option right
@desc Select none to only use offset value.
@default left
    
@param offsetX
@text Position X
@type text
@desc The Offset X position.
@default 10
@parent alignX

@param alignY
@text Align Y
@type select
@option none
@option top
@option center
@option bottom
@desc Select none to only use offset value.
@default top

@param offsetY
@text Position Y
@type text
@desc The offset Y position.
@default 10
@parent alignY

*/

}

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_PressStart = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

class Sprite_PressStart extends Sprite_Base{

    initialize(){
        super.initialize()
        this.initExtraProperties()
        this.createBitmap()
    }

    initExtraProperties(){
        this.isEnding = false
        this.timeOutFlag = false
        this.increment = 0
        this.isPressed = false
    }

    createBitmap(){
        this.bitmap = ImageManager.loadSystem(Plugin.param().image)
        this.bitmap.addLoadListener(this.setPositions.bind(this))
    }

    setPositions(){
        const positions = Plugin.param().position
        const {alignX, offsetX, alignY, offsetY} = positions
        const x = Eli.Utils.calculateScreenPosition(alignX, offsetX, this.bitmap.width, "x")
        const y = Eli.Utils.calculateScreenPosition(alignY, offsetY, this.bitmap.height, "y")

        this.move(x, y)
    }

    updateOpacity(){
        if(!this.isEnding){
            if(this.opacity >= 255){
                this.increment = -Plugin.param().fadeSpeed
    
            } else if(this.opacity <= Plugin.param().minOpacity) {
                this.increment = Plugin.param().fadeSpeed
            }
        }

        this.opacity += this.increment
    }

    canEnd(){
        return this.isEnding && !this.isAnimationPlaying() && this.opacity >= 255
    }

    canDestroy(){
        return !this.visible
    }

    end(){
        this.timeOutFlag = true
        setTimeout(() => {
            this.hide()
        }, Eli.Date.framesToMiliSeconds(Plugin.param().delay))
    }

    updatePressStart(){
        if(Plugin.param().animation > 0){
            const animation = $dataAnimations[Plugin.param().animation]
            this.startAnimation(animation, false, 0)
        }
        this.isEnding = true
        this.increment = 255
    }

    canUpdatePressStart(){
        return (Plugin.isButtonTriggered() || TouchInput.isTriggered()) && !this.isPressed
    }

    update(){
        super.update()
        this.updateGeneral()
    }

    updateGeneral(){
        if(this.canUpdatePressStart()){
            this.isPressed = true
            this.updatePressStart()
        }
        this.updateOpacity()
        if(this.canEnd()){
            this.end()
        }

        if(this.canDestroy()) {
            this.destroy()
        }
    }
    
}

Eli.PressStart = {

    version: 5.03,
    url: "https://hakuenstudio.itch.io/eli-press-start-for-rpg-maker-mv",
    parameters: {
        animation: 0,
        anyButton: true,
        delay: 0,
        fadeSpeed: 0,
        gamepadButton: "",
        image: "",
        keyboardButton: "",
        minOpacity: 0,
        overwrite: false,
        position: {
            alignX: "",
            alignY: "",
            offsetX: 0,
            offsetY: 0,
        }
    },
    alias: {},
    needCreation: true,
    button: '',
    anyButtonIsPressed: false,
    Sprite_PressStart: Sprite_PressStart,

    initialize(){
        this.initParameters()
        this.initPluginCommands()
        this.initButtons()
    },

    initParameters(){
        const parameters = PluginManager.parameters("Eli_PressStart")
        
        this.parameters.animation = Number(parameters.animation)
        this.parameters.delay = Number(parameters.delay)
        this.parameters.fadeSpeed = Number(parameters.fadeSpeed)
        this.parameters.minOpacity = Number(parameters.minOpacity)
        this.parameters.anyButton = parameters.anyButton === "true"
        this.parameters.overwrite = parameters.overwrite === "true"
        this.parameters.gamepadButton = parameters.gamepadButton
        this.parameters.image = parameters.image
        this.parameters.keyboardButton = parameters.keyboardButton
        
        this.parameters.position = JSON.parse(parameters.position)
        this.parameters.position.offsetX = Number(this.parameters.position.offsetX)
        this.parameters.position.offsetY = Number(this.parameters.position.offsetY)
    },

    initPluginCommands(){},

    initButtons(){
        if(this.parameters.keyboardButton !== "none"){
            this.setKeyboardButton()
        }

        if(this.parameters.gamepadButton !== "none"){
            this.setGamePadButton()
        }
    },

    setKeyboardButton(){
        const keyName = this.parameters.keyboardButton.toLowerCase()
        const keyCode = Eli.KeyCodes.keyboard[keyName]

        this.button = Input.keyMapper[keyCode]
    },

    setGamePadButton(){
        const keyName = this.parameters.gamepadButton.toLowerCase()
        const keyCode = Eli.KeyCodes.gamepad[keyName]

        this.button = Input.gamepadMapper[keyCode]
    },

    param(){
        return this.parameters
    },

    getButton(){
        return this.button
    },

    isCreationNeeded(value){
        this.needCreation = value
    },

    createMapSprite(){
        if(SceneManager._scene instanceof Scene_Map) {
            SceneManager._scene.createPressStart()
        }
    },

    isButtonTriggered(){
        if(this.parameters.anyButton){
            return Input._latestButton || TouchInput.isTriggered()
        }else{
            return Input.isTriggered(this.getButton())
        }
    },

    executePluginCommandMV(command, args){
        if(command.toUpperCase() === "PRESSSTART"){
            this.createMapSprite()
        }
    },

}

const Plugin = Eli.PressStart
const Alias = Eli.PressStart.alias

Plugin.initialize()

/* ----------------------------- PLUGIN COMMANDS ---------------------------- */
{

Alias.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args){
    Alias.Game_Interpreter_pluginCommand.call(this, command, args)
    Plugin.executePluginCommandMV(command, args)
}

}

/* ------------------------------- SCENE TITLE ------------------------------ */
{

Alias.Scene_Title_create = Scene_Title.prototype.create
Scene_Title.prototype.create = function() {
    Alias.Scene_Title_create.call(this)
    this.createStartSprite()
}

Scene_Title.prototype.createStartSprite = function(){
    if(!Plugin.needCreation) return
    this.startSprite = new Sprite_PressStart()
    this.addChild(this.startSprite)
    Plugin.isCreationNeeded(false)
}

Alias.Scene_Title_isBusy = Scene_Title.prototype.isBusy
Scene_Title.prototype.isBusy = function() {
    const alias = Alias.Scene_Title_isBusy.call(this)
    return this.hasStartSprite() || alias
}

Scene_Title.prototype.hasStartSprite = function(){
    return this.startSprite && this.startSprite.visible
}

}

/* -------------------------------- SCENE MAP ------------------------------- */
{

Alias.Scene_Map_isBusy = Scene_Map.prototype.isBusy
Scene_Map.prototype.isBusy = function() {
    const alias = Alias.Scene_Map_isBusy.call(this)
    return this.hasStartSprite() || alias
}

Alias.Scene_Map_isMenuEnabled = Scene_Map.prototype.isMenuEnabled
Scene_Map.prototype.isMenuEnabled = function() {
    const alias = Alias.Scene_Map_isMenuEnabled.call(this)
    return !this.hasStartSprite() && alias
}

Scene_Map.prototype.hasStartSprite = function(){
    return this.startSprite && this.startSprite.visible
}

Scene_Map.prototype.createPressStart = function(){
    if(this.hasStartSprite()) return
    this.startSprite = new Sprite_PressStart()
    this.addChild(this.startSprite)
}

}

/* ----------------------------- SCENE GAME END ----------------------------- */
{

Alias.Scene_GameEnd_terminate = Scene_GameEnd.prototype.terminate
Scene_GameEnd.prototype.terminate = function() {
    Alias.Scene_GameEnd_terminate.call(this)
    Plugin.isCreationNeeded(true)
}

}

/* ----------------------------- SCENE GAME OVER ---------------------------- */
{

Alias.Scene_Gameover_terminate = Scene_Gameover.prototype.terminate
Scene_Gameover.prototype.terminate = function() {
    Alias.Scene_Gameover_terminate.call(this)
    Plugin.isCreationNeeded(true)
}

}

}