//============================================================================
// Eli_CheckPointWindow.js
//============================================================================

/*:
@plugindesc ♦1.0.0♦ Add cool windows for Check point system(autosave/load).
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
==============================================================================
Plugin Requirements
==============================================================================

Need Eli Check Point

Order After Eli Check Point

==============================================================================
Features
==============================================================================

• Adds an auto save and auto load window.
• Show the window using easing animations!
• Different texts for the load an save window.

==============================================================================
How to use
==============================================================================

Just configure the plugin parameters and you are good to go.

==============================================================================
Update Log
==============================================================================

https://tinyurl.com/checkPointWindow

==============================================================================

@param saveWin
@text Save Window
@type struct<settingsSt>
@desc
@default {"text":"\"\\\\i[87]This is the auto save window!\\nHave fun!\"","width":"0","lines":"2","skin":"","background":"Window","position":"{\"initial\":\"\",\"frames\":\"30\",\"easing\":\"linear\",\"outsideX\":\"left\",\"outsideY\":\"none\",\"target\":\"\",\"alignX\":\"left\",\"offsetX\":\"0\",\"alignY\":\"center\",\"offsetY\":\"0\"}","delay":"60"}

@param loadWin
@text Load Window
@type struct<settingsSt>
@desc
@default {"text":"\"\\\\i[83]This is the auto load window!\\nGame loaded.\"","width":"0","lines":"2","skin":"","background":"Dim","position":"{\"initial\":\"\",\"frames\":\"30\",\"easing\":\"linear\",\"outsideX\":\"right\",\"outsideY\":\"none\",\"target\":\"\",\"alignX\":\"right\",\"offsetX\":\"0\",\"alignY\":\"center\",\"offsetY\":\"0\"}","delay":"60"}

*/

/* -------------------------------- SETTINGS -------------------------------- */
{
/*~struct~settingsSt:

@param text
@text Text
@type note
@desc 
@default 

@param width
@text Width
@type number
@desc 
@default 0

@param lines
@text Lines
@type number
@desc 
@default 2

@param skin
@text Window Skin
@type file
@dir img/system
@desc 
@default 

@param background
@text Background Type
@type select
@option Window
@option Dim
@option Transparent
@desc 
@default Window

@param position
@text Position
@type struct<positionSt>
@desc 
@default 

@param delay
@text Show count
@type number
@desc How much time in frames the window will be visible on screen before move out.
@default 120

*/
}

/* -------------------------------- POSITION -------------------------------- */
{
/*~struct~positionSt:

@param initial
@text Initial Positions

@param frames
@text Duration (Frames)
@type text
@desc Need to be above 0 for the easing movement to work.
@default 0
@parent initial
    
@param easing
@text Easing
@type select
@option linear @option --- In --- @option easeInQuad @option easeInCubic @option easeInQuart @option easeInQuint @option easeInSine @option easeInExpo @option easeInCirc @option easeInBack @option easeInBounce @option --- Out --- @option easeOutQuad @option easeOutCubic @option easeOutQuart @option easeOutQuint @option easeOutSine @option easeOutExpo @option easeOutCirc @option easeOutBack @option easeOutBounce @option --- In / Out --- @option easeInOutQuad @option easeInOutCubic @option easeInOutQuart @option easeInOutQuint @option easeInOutSine @option easeInOutExpo @option easeInOutCirc @option easeInOutBack @option easeInOutBounce @option --- Out / In --- @option easeOutInQuad @option easeOutInCubic @option easeOutInQuart @option easeOutInQuint @option easeOutInSine @option easeOutInCirc @option easeOutInExpo @option easeOutInBack @option easeOutInBounce
@desc Choose the easing type. The Duration need to be above 0.
@default linear
@parent initial

@param outsideX
@text Off Screen X
@type select
@option none
@option left
@option right
@desc The horizontal direction the window will come from.
@default left
@parent initial
    
@param outsideY
@text Off Screen Y
@type select
@option none
@option top
@option bottom
@desc The vertical direction the window will come from.
@default none
@parent initial

@param target
@text Target/Final Positions

@param alignX
@text Align X
@type select
@option none
@option left
@option center
@option right
@desc Select none to only use offset value.
@default right
@parent target
    
@param offsetX
@text Offset X
@type text
@desc The Offset X position.
@default 0
@parent target

@param alignY
@text Align Y
@type select
@option none
@option top
@option center
@option bottom
@desc Select none to only use offset value.
@default center
@parent target

@param offsetY
@text Offset Y
@type text
@desc The offset Y position.
@default 0
@parent target

*/
}

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_CheckPointWindow = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

class Window_CheckPoint extends Window_Help {

    initialize(param, animation) {
        this._text = ''
        this.parameters = param
        this.animation = animation
        const width = this.windowWidth()
        const height = this.fittingHeight(this.parameters.lines || 2)
        const {outsideX, outsideY} = this.parameters.position
        Window_Base.prototype.initialize.call(this, 0, 0, width, height)
        this.setInitialPositions(outsideX, outsideY)
        this.setBackgroundType(this.parameters.background)
        this.createAnimation()
    }

    windowWidth(){
        if(this.parameters.width === 0){
            const standardPadding = this.standardPadding() * 2
            const textPadding = this.textPadding() * 2
            
            const textWidth = Eli.Utils.getTextWidth(this.parameters.text, true)
    
            return standardPadding + textPadding + textWidth
        }else{
            return this.parameters.width
        }
    }

    loadWindowskin(){
        if(this.parameters.skin){
            this.windowskin = ImageManager.loadSystem(this.parameters.skin)
        }else{
            super.loadWindowskin()
        }
    }

    setBackgroundType(type){
        const typeList = {
            Window: 0,
            Dim: 1,
            Transparent: 2,
        }
        type = typeList[type]
        super.setBackgroundType(type)
    }

    createAnimation(){
        const {alignX, alignY, offsetX, offsetY, outsideX, outsideY, easing, frames} = this.parameters.position
        const target = this.createTargetPositions(alignX, offsetX, alignY, offsetY)

        this.x = target.x
        this.y = target.y

        if(this.haveEasingAnimation(frames)){
            this.setInitialPositions(outsideX, outsideY)
        }

        this.animation = new anime({
            targets: this,
            x: target.x,
            y: target.y,
            easing: easing,
            duration: frames,
            direction: 'alternate',
            autoplay: false,
            endDelay: this.parameters.delay,
        })
    }

    showWithAnimation(){
        this._text = ""
        this.setText(this.parameters.text)
        if($eliData.contents.checkPointWindow.isLoading){
            this.setText(Plugin.param().loadWin.text)
        }else{
            this.setText(Plugin.param().saveWin.text)
        }
        
        this.animation.play()
    }

    createTargetPositions(alignX, offsetX, alignY, offsetY){
        let x = Eli.Utils.calculateScreenPosition(alignX, offsetX, this.width, "x")
        let y = Eli.Utils.calculateScreenPosition(alignY, offsetY, this.height, "y")
        x -= alignX === "right" ? this._margin : 0
        y -= alignY === "bottom" ? this._margin : 0
        
        return {x, y}
    }
    
    setInitialPositions(outsideX, outsideY){
        const [initialX, initialY] = this.findInitialCoordinates(outsideX, outsideY)
        this.x = initialX
        this.y = initialY
    } 
    
    findInitialCoordinates(outsideX, outsideY) {    
        const x = {
            left: -this.width,
            right: Graphics.width + this.width,
            none: this.x,
        }[outsideX]
        const y = {
            top: -this.height,
            bottom: Graphics.height + this.height,
            none: this.y,
        }[outsideY]

        return [x, y]
    }

    haveEasingAnimation(frames){
        return frames > 0
    }

}

class Window_SavePoint extends Window_CheckPoint {

    showWithAnimation(){
        if($eliData.contents.checkPointWindow.isLoading){
            this.hide()
        }else{
            this.show()
        }
        super.showWithAnimation()
    }

}

class Window_LoadPoint extends Window_CheckPoint {
    
    showWithAnimation(){
        if($eliData.contents.checkPointWindow.isLoading){
            this.show()
        }else{
            this.hide()
        }
        super.showWithAnimation()
    }
}

Eli.CheckPointWindow = {

    version: 5.01,
    url: "https://hakuenstudio.itch.io/eli-checkpoint-window-rpg-maker-mv",
    parameters: {
        saveWin: {
            text: "",
            lines: 2,
            width: 0,
            skin: "",
            background: "Window",
            position:{
                alignX: "right",
                alignY: "center",
                easing: "linear",
                frames: 0,
                offsetX: 0,
                offsetY: 0,
                outsideX: "none",
                outsideY: "none"
            },
            delay: 0,
        },
        loadWin: {
            text: "",
            lines: 2,
            width: 0,
            skin: "",
            background: "Window",
            position:{
                alignX: "right",
                alignY: "center",
                easing: "linear",
                frames: 0,
                offsetX: 0,
                offsetY: 0,
                outsideX: "none",
                outsideY: "none"
            },
            delay: 0,
        },
    },
    alias: {},
    saveAnimation: new anime({autoplay: false}),
    loadAnimation: new anime({autoplay: false}),
    Window_CheckPoint: Window_CheckPoint,
    Window_SavePoint: Window_SavePoint,
    Window_LoadPoint: Window_LoadPoint,

    initialize(){
        this.initParameters()
        this.initPluginCommands()
    },

    initPluginCommands(){

    },

    initParameters(){
        this.parameters = Eli.PluginManager.createParameters()

        this.parameters.saveWin.position.frames = Eli.Date.framesToMiliSeconds(this.parameters.saveWin.position.frames)
        this.parameters.saveWin.delay = Eli.Date.framesToMiliSeconds(this.parameters.saveWin.delay)

        this.parameters.loadWin.position.frames = Eli.Date.framesToMiliSeconds(this.parameters.loadWin.position.frames)
        this.parameters.loadWin.delay = Eli.Date.framesToMiliSeconds(this.parameters.loadWin.delay)
    },

    param(){
        return this.parameters
    },

}

const Plugin = Eli.CheckPointWindow
const Alias = Eli.CheckPointWindow.alias

Plugin.initialize()

/* ----------------------------- SAVED CONTENTS ----------------------------- */
{

Alias.Eli_SavedContents_initialize = Eli_SavedContents.prototype.initialize
Eli_SavedContents.prototype.initialize = function(){
	Alias.Eli_SavedContents_initialize.call(this)
	this.contents.checkPointWindow = {
        isLoading: false,
    }
}

}

/* -------------------------------- SCENE MAP ------------------------------- */
{


Alias.Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects
Scene_Map.prototype.createDisplayObjects = function() {
    Alias.Scene_Map_createDisplayObjects.call(this)
    this.createCheckPointWindows()
}

Scene_Map.prototype.createCheckPointWindows = function() {
    this.savePointWindow = new Window_SavePoint(Plugin.param().saveWin, Plugin.saveAnimation)
    this.loadPointWindow = new Window_LoadPoint(Plugin.param().loadWin, Plugin.loadAnimation)
    this.addChild(this.savePointWindow)
    this.addChild(this.loadPointWindow)
}

}

}