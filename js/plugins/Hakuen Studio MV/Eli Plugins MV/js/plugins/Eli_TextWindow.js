//==========================================================================
// Eli_TextWindow.js
//==========================================================================

/*:

@plugindesc ♦1.0.0♦ - Dynamically adds text windows into the screen! 
@author Hakuen Studio

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
Patreon      → https://www.patreon.com/hakuenstudio
Rate Plugin  → https://hakuenstudio.itch.io/hakuen-studio-text-window-for-rpg-maker-mv-mz/rate?source=game
Terms of Use → https://www.hakuenstudio.com/terms-of-use-5-0-0
Facebook     → https://www.facebook.com/hakuenstudio
Instagram    → https://www.instagram.com/hakuenstudio
Twitter      → https://twitter.com/hakuen_studio
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
============================================================================
Plugin Requirements
============================================================================
Eli Book is mandatory.

Order After Eli_Book
Order After Eli_AnimatedFaces

============================================================================
Features
============================================================================

● Adds multiple text windows on the screen.
● Text windows can be moved, opened, and closed with easing animations!
● Write the text instantly, or character by character, like the default 
message window!
● Play a sound to open/close the window!
● Use faces or character sprite images to be the face of the message!
● Create template settings for quick use inside the game!

============================================================================
How to use
============================================================================

https://docs.google.com/document/d/1SM7UsQ-Wcnny1Akw5znBfwZXylL2Wp2kxhj-YopqrfA/edit?usp=sharing

============================================================================
Plugin Commands
============================================================================

MV does not have the complex plugin command structure that MZ has. 
So, to show and set up a Text Window, we will use a mix of plugin commands 
and event commands.

• TextWindow Setup [ID] → Replace ID with a Template Id. 

This one will tell the engine that the next show text commands will be 
used to set up the messages of the Text Window.
So both text and face images of the message will be applied to the Text 
Window, instead of showing a default message. Although the face will only 
be applied if the Template Settings has their Image Type set as “Face”
You can put as many messages as you want. Each Show Message command will 
be a message for the Text Window.

• TextWindow Set Char [ID] [FILE] [INDEX] → Replace ID with the character 
ID. Replace FILE and INDEX with a character file and index. Of course, 
this will only work if the Template Settings has their Image Type set as 
“Character”. You can omit the FILE and INDEX arguments if you do not
want to change them.
It must be used before the Show Text Command.

• TextWindow Show [ID] → Replace ID with a Template Id.
You need to call this one to end the process of setup the Text Window 
Messages and show the window. After that, the Show Text commands will 
return to their normal behavior.

============================================================================
Update Log
============================================================================

https://tinyurl.com/textWindow

============================================================================

@param templates
@text Window Templates
@type struct<templateSt>[]
@desc A list of templates settings to quickly show a text window in-game.
@default 

*/

/* -------------------------------- TEMPLATES ------------------------------- */
{

/*~struct~templateSt:

@param id
@text Template ID
@type text
@desc The template id. It is not case sensitive.
@default MyTemplate

@param contents
@text Contents
@type struct<contentsSt>
@desc The settings for the text and face images of this window content.
@default

@param win
@text Window
@type struct<winSt>
@desc Settings for the text window.
@default 

@param isStatic
@text Static Window
@type boolean
@desc If true, the window will remain on screen, not playing the hide animation.
@default false

@param updateInterval
@text Update Interval
@type text
@desc Only works for static windows. Sets the time in frames, where the window will update the text.
@default 60
@parent isStatic

*/

}

/* --------------------------------- CONTENT -------------------------------- */
{

/*~struct~contentsSt:

@param textOffsetX
@text Text OffsetX
@type text
@desc An extra indentation for the start position X of the text in the window.
@default 0

@param writeType
@text Write Type
@type combo
@option Message
@option Instantly
@desc "Message" will write the text like the message window.
@default Instantly

@param imageType
@text Image Type
@type combo
@option Face
@option Character
@desc The type of image that will be used as the face of the message.
@default Face

@param imageAlignY
@text Image Alignment Y
@type combo
@option top
@option center
@option bottom
@desc How the image will be positioned on the window.
@default center
@parent imageType

@param imageLayer
@text Image Layer
@type combo
@option outside
@option inside
@desc If the image will be inside the message window or outside of it, above the frame.
@default inside
@parent imageType

*/
}

/* ----------------------------- WINDOW SETTINGS ---------------------------- */
{

/*~struct~winSt:

@param skin
@text Skin File
@type file
@dir img/system
@desc The window skin that this message will use. Leave empty for default.
@default

@param backgroundType
@text Background Type
@type combo
@option Window
@option Dim
@option Transparent
@option Strong
@option Light Gradient Vertical
@option Faded Horizontal
@desc The background type.
@default Window

@param tone
@text Tone
@type text
@desc The window tone in RGB format. Separate each one with a comma. 
-255 to 255.
@default 0, 0, 0

@param layer
@text Layer
@type combo
@option Below Pictures
@option Above Pictures and below Windows
@option Above Windows
@desc The layer position of the window.
@default Above Windows

@param width
@text Width
@type text
@desc The window width. Leave 0 for automatic.
@default 0

@param height
@text Height
@type text
@desc The window height. Leave 0 for automatic.
@default 0

@param position
@text Position
@type struct<positionSt>
@desc The initial and target/final position of the window.
@default

@param openness
@text Open/Close Behavior
@type struct<opennessSt>
@desc The open/close behavior of the window.
@default 

@param sound
@text Open/Close Sound
@type struct<soundSt>
@desc The SE sound to play when closing and opening the window.
@default 

@param opacity
@text Opacity
@type text
@desc The opacity values for the different moments of the window: Initial, Show, Hide.
@default 0, 255, 255

*/

}

/* -------------------------------- POSITION -------------------------------- */
{
/*~struct~positionSt:

@param duration
@text Move Duration
@type text
@desc The duration for the window to move from Initial to Target Position.
@default 1

@param easing
@text Easing
@type combo
@option linear @option --- In --- @option easeInQuad @option easeInCubic @option easeInQuart @option easeInQuint @option easeInSine @option easeInExpo @option easeInCirc @option easeInBack @option easeInBounce @option --- Out --- @option easeOutQuad @option easeOutCubic @option easeOutQuart @option easeOutQuint @option easeOutSine @option easeOutExpo @option easeOutCirc @option easeOutBack @option easeOutBounce @option --- In / Out --- @option easeInOutQuad @option easeInOutCubic @option easeInOutQuart @option easeInOutQuint @option easeInOutSine @option easeInOutExpo @option easeInOutCirc @option easeInOutBack @option easeInOutBounce @option --- Out / In --- @option easeOutInQuad @option easeOutInCubic @option easeOutInQuart @option easeOutInQuint @option easeOutInSine @option easeOutInCirc @option easeOutInExpo @option easeOutInBack @option easeOutInBounce
@desc Choose the easing type. Can use \v[id].
@default linear

@param delay
@text Stay Duration
@type text
@desc How much time, in frames, the window will be visible on screen after move to the target position.
@default 120

@param initialAlignX
@text Initial Align X
@type select
@option left
@option center
@option right
@option left_offScreen
@option right_offScreen
@desc Select none to only use offset value.
@default left

@param initialOffsetX
@text Initial Offset X
@type text
@desc The Offset X position.
@default 0
@parent initialAlignX

@param initialAlignY
@text Initial Align Y
@type select
@option top
@option center
@option bottom
@option top_offScreen
@option bottom_offScreen
@desc Select none to only use offset value.
@default top

@param initialOffsetY
@text Initial Offset Y
@type text
@desc The offset Y position.
@default 0
@parent initialAlignY

@param targetAlignX
@text Target Align X
@type select
@option left
@option center
@option right
@desc Select none to only use offset value.
@default left

@param targetOffsetX
@text Target Offset X
@type text
@desc The Offset X position.
@default 0
@parent targetAlignX

@param targetAlignY
@text Target Align Y
@type select
@option top
@option center
@option bottom
@desc Select none to only use offset value.
@default top

@param targetOffsetY
@text Target Offset Y
@type text
@desc The offset Y position.
@default 0
@parent targetAlignY

*/
}

/* -------------------------------- OPENNESS -------------------------------- */
{

/*~struct~opennessSt:

@param open
@text Open Behaviour
@type struct<openCloseSt>
@desc The open/close behavior of the window.
@default 

@param close
@text Close Behaviour
@type struct<openCloseSt>
@desc The open/close behavior of the window.
@default 

@param easing
@text Easing
@type combo
@option inherit @option linear @option --- In --- @option easeInQuad @option easeInCubic @option easeInQuart @option easeInQuint @option easeInSine @option easeInExpo @option easeInCirc @option easeInBack @option easeInBounce @option --- Out --- @option easeOutQuad @option easeOutCubic @option easeOutQuart @option easeOutQuint @option easeOutSine @option easeOutExpo @option easeOutCirc @option easeOutBack @option easeOutBounce @option --- In / Out --- @option easeInOutQuad @option easeInOutCubic @option easeInOutQuart @option easeInOutQuint @option easeInOutSine @option easeInOutExpo @option easeInOutCirc @option easeInOutBack @option easeInOutBounce @option --- Out / In --- @option easeOutInQuad @option easeOutInCubic @option easeOutInQuart @option easeOutInQuint @option easeOutInSine @option easeOutInCirc @option easeOutInExpo @option easeOutInBack @option easeOutInBounce
@desc Choose the easing type. Can use \v[id]. "inherit" will get the same easing that was set on the position settings.
@default inherit

@param duration
@text Duration
@type text
@desc How fast the window will open/close. In frames.
@default 10

*/

}

/* --------------------------- OPEN CLOSE BEHAVIOR -------------------------- */
{

/*~struct~openCloseSt:

@param widthAlign
@text Width Direction
@type select
@option None
@option Left to Right
@option Centered
@option Right to Left
@desc The direction that the window will open/close, regardless the width.
@default None

@param heightAlign
@text Height Direction
@type select
@option None
@option Top to Bottom
@option Centered
@option Bottom to Top
@desc The direction that the window will open/close, regardless the height.
@default Centered

*/

}

/* ---------------------------- OPEN CLOSE SOUND ---------------------------- */
{

/*~struct~soundSt:

@param open
@text Open Sound (SE)
@type struct<soundObjSt>
@desc The SE to play when opening/showing the window.
@default {"name":"","volume":"75","pitch":"0","pan":"0"}

@param close
@text Close Sound (SE)
@type struct<soundObjSt>
@desc The SE to play when closing/hiding the window.
@default {"name":"","volume":"75","pitch":"0","pan":"0"}

*/

}

/* ----------------------------- SOUND SETTINGS ----------------------------- */
{
/*~struct~soundObjSt:

@param name
@text Filename
@type file
@dir audio/se
@desc The filename of the Se.
@default 

@param volume
@text Volume
@type number
@desc Volume. From 0 to 100.
@min 0
@max 100
@default 75

@param pitch
@text Pitch
@type number
@desc From -50 to 150.
@min -50
@max 150
@default 0

@param pan
@text Volume
@type number
@desc rom -100 to 100.
@min -100
@max 100
@default 0

*/
}

/* --------------------------------- MESSAGE -------------------------------- */
{
/*~struct~messageSt:

@param text
@text Text
@type multiline_string
@desc The text to show.
@default

@param separator1
@text Face Settings

@param faceName
@text File
@type file
@dir img/faces
@desc The face file to use.
@default ""
@parent separator1

@param faceIndex
@text Index
@type text
@desc The face index of the face file.
@default 0
@parent separator1

@param separator2
@text Character Settings

@param spriteId
@text Id
@type text
@desc The character id to be used on the window. See help file.
@default 0
@parent separator2

@param charName
@text File
@type file
@dir img/characters
@desc The character file to be used on the window's character.
@default
@parent separator2

@param charIndex
@text Index
@type text
@desc The character index of the window's character. Leave -1 to not change.
@default -1
@parent separator2

*/
}

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_TextWindow = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

const RTL_REG = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/

class Container_TextWindow extends PIXI.Container{

    constructor(){
        super()
        this.width = Graphics.width
        this.height = Graphics.height
    }

    update(){
        for(const child of this.children){

            if(child.update){
                child.update()
            }
        }
    }

}

class Sprite_TextWindowFace extends Sprite {

    initialize(parameters, messageWindow){
        super.initialize()
        this.initializePlus(parameters, messageWindow)
        this.setFrame(0, 0, Eli.Utils.getFaceSize().width, Eli.Utils.getFaceSize().height)
        if(this.canUseMask()){
            this.createMask()
        }
        this.adjustPosition()
    }

    initializePlus(parameters, messageWindow){
        this.messageWindow = messageWindow
        this.parameters = parameters
        this.faceName = ""
        this.faceIndex = 0
    }

    canUseMask(){
        return this.messageWindow.imageLayerIsInside()
    }

    createMask(){
        this.mask = new PIXI.Graphics().beginFill()
        this.mask.drawRect(0, 0, 144, 144)
        this.addChild(this.mask)
    }

    adjustPosition(){
        const {x, y} = this.calculatePositionWithAlignment()
        this.move(x, y)
    }

    calculatePositionWithAlignment(){
        const {alignY, layer} = this.parameters.contents.image
        const msgWin = this.messageWindow
        const backSpr = msgWin._windowBackSprite
        const contSpr = msgWin._windowContentsSprite
        const dif = backSpr.y - contSpr.y
        const margin = msgWin.padding

        const heightByLayer = {
            outside: msgWin.height,
            inside: backSpr.height - margin*2,
        }[layer]

        const xByLayer = {
            outside: margin,
            inside: 0,
        }[layer]

        const yByLayer = {
            outside: dif,
            inside: dif + margin,
        }[layer]

        const y = {
            top: yByLayer,
            center: heightByLayer/2 - Eli.Utils.getFaceSize().height/2 + dif,
            bottom: heightByLayer - Eli.Utils.getFaceSize().height + yByLayer,
        }[alignY]

        return {x: xByLayer, y: y}
    }

    refreshFaceBitmap(name, index){
        this.faceName = name
        this.faceIndex = index
        this.bitmap = ImageManager.loadFace(name)
        this.bitmap.addLoadListener(() => {
            this.refreshFaceFrame(index)
        })
    }

    refreshFaceFrame(index){
        const faceWidth = Eli.Utils.getFaceSize().width
        const faceHeight = Eli.Utils.getFaceSize().height
        const rows = this.bitmap.height / faceWidth
        const cols = this.bitmap.width / faceHeight
        const x = index % cols * faceWidth
        const y = (Math.floor(index / cols) % rows) * faceHeight
    
        this.setFrame(x, y, faceWidth, faceHeight)
    }

    update(){
        super.update()
        this.visible = this.isVisible()
    }

    isVisible(){
        return this.messageWindow.imageTypeIsFace() && !!this.faceName
    }

    updateAnimation(){}

    refreshMask(){
        if(this.canUseMask()){
            this.mask.clear()
            const margin = this.messageWindow.padding
            let dimmerSpriteDif = 0

            if(this.parameters.win.backgroundType > 2){
                dimmerSpriteDif = margin
            }

            const backHeight = this.messageWindow._windowBackSprite.height - margin - dimmerSpriteDif/2
            const align = this.parameters.contents.image.alignY
            
            const height = {
                top: Math.min(backHeight, 144),
                center: backHeight,
                bottom: Math.min(backHeight, 144),
            }[align]
            
            const y = {
                top: 0,
                center: ((this._frame.height - height) / 2) + margin,
                bottom: (this._frame.height - height)
            }[align]

            this.mask.drawRect(0, Math.floor(y), 144, Math.floor(height))
        }
    }
}

// Need Eli Animated Faces
class Sprite_TextWindowAnimatedFace extends Sprite{

    initialize(parameters, messageWindow){
        super.initialize()
        this.initializePlus(parameters, messageWindow)
        this.setFrame(0, 0, Eli.Utils.getFaceSize().width, Eli.Utils.getFaceSize().height)
        if(this.canUseMask()){
            this.createMask()
        }
        
        this.adjustPosition()
    }

    initializePlus(parameters, messageWindow){
        this.messageWindow = messageWindow
        this.parameters = parameters
        this.faceName = this.messageWindow.getCurrentMessage().faceName
        this.faceIndex = this.messageWindow.getCurrentMessage().faceIndex
        this.settings = Eli.AnimatedFaces.createEmptyFaceSetting()
        this.frameCount = 0
    }

    canUseMask(){
        return this.messageWindow.imageLayerIsInside()
    }

    createMask(){
        this.mask = new PIXI.Graphics().beginFill()
        this.mask.drawRect(0, 0, 144, 144)
        this.addChild(this.mask)
    }

    adjustPosition(){
        const {x, y} = this.calculatePositionWithAlignment()
        this.move(x, y)
    }

    calculatePositionWithAlignment(){
        const {alignY, layer} = this.parameters.contents.image
        const msgWin = this.messageWindow
        const backSpr = msgWin._windowBackSprite
        const contSpr = msgWin._windowContentsSprite
        const dif = backSpr.y - contSpr.y
        const margin = msgWin.padding

        const heightByLayer = {
            outside: msgWin.height,
            inside: backSpr.height - margin*2,
        }[layer]

        const xByLayer = {
            outside: margin,
            inside: 0,
        }[layer]

        const yByLayer = {
            outside: dif,
            inside: dif + margin,
        }[layer]

        const y = {
            top: yByLayer,
            center: heightByLayer/2 - Eli.Utils.getFaceSize().height/2 + dif,
            bottom: heightByLayer - Eli.Utils.getFaceSize().height + yByLayer,
        }[alignY]

        return {x: xByLayer, y: y}
    }

    refreshFaceBitmap(name, index){
        this.faceName = name
        this.faceIndex = index
        this.frameCount = 0
        this.bitmap = ImageManager.loadFace(this.faceName)
        this.bitmap.addLoadListener(() => {
            this.refreshFaceFrame()
        })
        this.settings = this.setFaceAnimatedSettings(this.faceName, this.faceIndex)
    }

    refreshFaceFrame(){
        const faceWidth = Eli.Utils.getFaceSize().width
        const faceHeight = Eli.Utils.getFaceSize().height
        const rows = this.bitmap.height / faceWidth
        const cols = this.bitmap.width / faceHeight
        const index = this.faceIndex
        const x = index % cols * faceWidth
        const y = (Math.floor(index / cols) % rows) * faceHeight
    
        this.setFrame(x, y, faceWidth, faceHeight)
    }

    setFaceAnimatedSettings(faceName, faceIndex){
        const getSettings = item => item.image === faceName && item.startIndex === faceIndex
        return  Eli.AnimatedFaces.param().faceSettings.find(getSettings) || 
                Eli.AnimatedFaces.createEmptyFaceSetting(faceName, faceIndex)
    }

    updateAnimation(maxIndex){
        if(this.canUpdateAnimation()){
            this.frameCount++
            
            if(this.canChangeFaceIndex()){
                
                this.changeFaceIndex(maxIndex)
                this.refreshFaceFrame()
                this.frameCount = 0
            }
        }
    }

    canUpdateAnimation(){
        return this.messageWindow.getCurrentMessage().faceName
    }

    canChangeFaceIndex(){
        return this.frameCount >= this.settings.frameSpeed && this.bitmap
    }

    changeFaceIndex(limitIndex){
        if(this.faceIndex >= limitIndex){
            this.faceIndex = this.settings.startIndex
        }else{
            this.faceIndex += 1
        }
    }

    update(){
        super.update()
        this.visible = this.isVisible()
    }

    isVisible(){
        return this.messageWindow.imageTypeIsFace() && !!this.faceName
    }

    refreshMask(){
        if(this.canUseMask()){
            this.mask.clear()
            const margin = this.messageWindow.padding
            let dimmerSpriteDif = 0

            if(this.parameters.win.backgroundType > 2){
                dimmerSpriteDif = margin
            }

            const backHeight = this.messageWindow._windowBackSprite.height - margin - dimmerSpriteDif/2
            const align = this.parameters.contents.image.alignY
            const height = {
                top: Math.min(backHeight, 144),
                center: backHeight,
                bottom: Math.min(backHeight, 144),
            }[align]
            
            const y = {
                top: 0,
                center: ((this._frame.height - height) / 2) + margin,
                bottom: (this._frame.height - height)
            }[align]

            this.mask.drawRect(0, Math.floor(y), 144, Math.floor(height))
        }
    }
}

class Sprite_TextWindowCharacter extends Sprite_Character{

    initialize(character, parameters, messageWindow){
        this.initializePlus(parameters, messageWindow)
        super.initialize(character)
        if(this.canUseMask()){
            this.createMask()
        }
    }

    initializePlus(parameters, messageWindow){
        this.parameters = parameters
        this.messageWindow = messageWindow
    }

    canUseMask(){
        return this.messageWindow.imageLayerIsInside()
    }

    createMask(){
        this.mask = new PIXI.Graphics().beginFill()
        this.mask.drawRect(0, 0, 48, 48)
        this.addChild(this.mask)
    }

    initMembers(){
        super.initMembers()
        this.initMembersPlus()
    }

    initMembersPlus(){
        this.anchor.x = 0
        this.anchor.y = 0
    }

    update(){
        Sprite.prototype.update.call(this)

        if(this.canUpdate()){
            this.updateBitmap()
            this.updateFrame()
            this.updatePosition()
            this.updateOther()
        }
        this.updateVisibility()
    }

    updateVisibility(){
        //Sprite.prototype.updateVisibility.call(this)
        this.visible = this.isVisible()
    }

    isVisible(){
        return this.messageWindow.imageTypeIsCharacter() && this._character && this._character.characterName()
    }

    canUpdate(){
        return this._character && this.getMapSprite().bitmap && this.getMapSprite().bitmap.isReady()
    }

    updateBitmap(){
        this.bitmap = this.getMapSprite().bitmap
        this._isBigCharacter = this.getMapSprite()._isBigCharacter
    }

    updateFrame(){
        const frame = this.getMapSprite()._frame
        this.setFrame(frame.x, frame.y, frame.width, frame.height)
    }

    updatePosition(){
        this.adjustPosition()
    }

    adjustPosition(){
        const {x, y} = this.calculatePositionWithAlignment()
        this.move(x, y)
        this.refreshMask()
    }

    calculatePositionWithAlignment(){
        const {alignY, layer} = this.parameters.contents.image
        const frame = this._frame
        const msgWin = this.messageWindow
        const backSpr = msgWin._windowBackSprite
        const contSpr = msgWin._windowContentsSprite
        const dif = backSpr.y - contSpr.y
        const margin = msgWin._margin

        const heightByLayer = {
            outside: msgWin.height,
            inside: backSpr.height - margin*2,
        }[layer]

        const xByLayer = {
            outside: margin,
            inside: 0,
        }[layer]

        const yByLayer = {
            outside: dif,
            inside: dif + margin,
        }[layer]

        const y = {
            top: yByLayer,
            center: heightByLayer/2 - frame.height/2 + dif,
            bottom: heightByLayer - frame.height + yByLayer,
        }[alignY]

        const jumpheight = this._character.jumpHeight()

        return {x: xByLayer, y: y - jumpheight}
    }

    getMapSprite(){
        return this._character.getMapSprite()
    }

    setMapSprite(character){}

    refreshMask(){
        if(this.canUseMask()){
            this.mask.clear()
            const margin = this.messageWindow._margin
            const backHeight = this.messageWindow._windowBackSprite.height - margin*2
            const align = this.parameters.contents.image.alignY
            const frame = this._frame
            
            const height = {
                top: Math.min(backHeight, frame.height),
                center: backHeight,
                bottom: Math.min(backHeight, frame.height),
            }[align]

            const y = {
                top: 0,
                center: ((frame.height - height) / 2) + margin,
                bottom: frame.height - height
            }[align]

            this.mask.drawRect(0, y, frame.width, height)
        }
    }

}

class Window_TextWindow extends Window_Message {

    initialize(rect, parameters){
        this.customWidth = rect.width
        this.customHeight = rect.height
        this.rtlReg = RTL_REG
        this.initParameters(parameters)
        super.initialize()
        this.move(rect.x, rect.y, rect.width, rect.height)
        this.initializePlus()
        this.createFaceSpriteForTextWindow()
        this.createCharSprite()
    }

    initParameters(parameters){
        this.parameters = parameters
        this.messages = this.parameters.messages.map(item => item)
        this.parameters.messages = []
    }

    initializePlus(){
        this.initMembersPlus()
        this.hide()
        this.setBackgroundType(this.parameters.win.backgroundType)
        this.advanceMessageIndex()
    }

    initMembersPlus(){
        this._isWindow = false
        this.alpha = this.parameters.win.opacity[0].clamp(0, 255) / 255
        this.animation = new anime({autoplay: false})
        this.character_textWindow = null
        this.cursorVisible = false
        this.isStaticReady = false
        this.isReadyToUpdate = false
        this.messageIndex = -1
        this.openness = 255
    }

    advanceMessageIndex(){
        const max = this.messages.length - 1
        this.messageIndex = Math.min(this.messageIndex + 1, max)
    }

    createFaceSpriteForTextWindow(){
        this.faceSprite_textWindow = this.findFaceSpriteClass()
        this.addImageSprite(this.faceSprite_textWindow)
    }

    findFaceSpriteClass(){
        if(Imported.Eli_AnimatedFaces){
            return new Sprite_TextWindowAnimatedFace(this.parameters, this)
        }else{
            return new Sprite_TextWindowFace(this.parameters, this)
        }
    }

    addImageSprite(imageSprite){
        if(this.imageLayerIsOutside()){
            this.addChild(imageSprite)
        }else{
            this.addInnerChild(imageSprite)
        }
    }

    imageLayerIsOutside(){
        return this.parameters.contents.image.layer === "outside"
    }

    imageLayerIsInside(){
        return !this.imageLayerIsOutside()
    }

    createCharSprite(){
        this.character_textWindow = this.findMapCharacterBySpriteId()
        this.charSprite_textWindow = new Sprite_TextWindowCharacter(this.character_textWindow, this.parameters, this)
        this.addImageSprite(this.charSprite_textWindow)
    }

    findMapCharacterBySpriteId(){
        const spriteId = this.parsedCharacterId(this.getCurrentMessage().spriteId)
        return Eli.Utils.getMapCharacter(spriteId)
    }

    parsedCharacterId(id){
        return Eli.Utils.convertEscapeVariablesOnly(String(id))
    }

    getCurrentMessage(){
        return this.messages[this.messageIndex]
    }

    loadWindowskin(){
        const filename = this.parameters.win.skin

        if(filename){
            this.windowskin = ImageManager.loadSystem(filename)
        }else{
            super.loadWindowskin()
        }
    }

/* --------------------------------- UPDATE --------------------------------- */

    update(){
        Window_Base.prototype.update.call(this)
        this.updateWrittingMessage()
    }

    updateTone(){
        const tone = this.parameters.win.tone
        this.setTone(tone[0], tone[1], tone[2])
    }

    updateWrittingMessage(){
        while(this.canUpdateMessage()){

            if (this.updateWait()) {
                return;
            }

            if(this.updateMessage()){
                return;
            }
        }

        if(!this.canUpdateMessage()){

            if(this.canUpdateIdleTalkAnimation()){
                this.faceSprite_textWindow.updateAnimation(this.faceSprite_textWindow.settings.middleIndex)
            }

            if(this.canUpdateStatic()){

                if(this.updateWait()){

                }else{
                    this.contents.clear()
                    this.drawMessageInstantly(this.getCurrentMessage().text)
                    this.startWait(this.getTextUpdateInterval())
                }
            }
        }
    }

    canUpdateMessage(){
        return this._textState && this.isReadyToUpdate
    }

    canUpdateIdleTalkAnimation(){
        return Imported.Eli_AnimatedFaces && this.imageTypeIsFace()
    }

    canUpdateStatic(){
        return this.isStaticWindow() && this.isStaticReady
    }

    isStaticWindow(){
        return this.parameters.isStatic
    }

    getTextUpdateInterval(){
        return Math.max(1, this.parameters.updateInterval)
    }

/* ------------------------------- END UPDATE ------------------------------- */

    startWindowActivity(){
        if(this.imageTypeIsCharacter()){
            this.refreshCharacter()
        }

        this.resizeWindowForText()
        this.refreshSideFacePosition()
        this.showAnimation()
    }

    refreshCharacter(){
        const {charName, charIndex} = this.getCurrentMessage()
        const character = this.findMapCharacterBySpriteId()

        if(this.character_textWindow !== character){
            this.character_textWindow = character
        }

        const name = Eli.Utils.convertEscapeVariablesOnly(charName) || this.character_textWindow.characterName()
        let index = Number( Eli.Utils.convertEscapeVariablesOnly( String(charIndex) ) )
        index = index > -1 ? index : this.character_textWindow.characterIndex()

        this.character_textWindow.setImage(name, index)
        this.charSprite_textWindow.setCharacter(this.character_textWindow)
    }

    resizeWindowForText(){
        const rect = this.createWindowRect(this.parameters)

        this.move(rect.x, rect.y, rect.width, rect.height)
        this.customWidth = rect.width
        this.customHeight = rect.height
        this.setBackgroundType(this.parameters.win.backgroundType)
        this.createContents()
        this.cursorVisible = false
    }

    createWindowRect(parameters){
        const {width, height} = this.createWindowSize(parameters)
        const rect = new Rectangle(0, 0, Math.ceil(width), Math.ceil(height))

        return rect
    }

    createWindowSize(parameters){
        const msg = this.getCurrentMessage()
        const textSettings = this.getTextSize(msg.text, true)

        if(this.imageTypeIsFace()){
            var imageWidth = msg.faceName ? Eli.Utils.getFaceSize().width + 20 : 0
        }else{ 
            var imageWidth = this.character_textWindow ? this.character_textWindow.getMapSprite()._frame.width + 10 : 0
        }

        if(parameters.win.width){
            var width = parameters.win.width
        }else{
            var width = textSettings.width + this.padding * 2 + this.getItemPadding() + imageWidth
        }

        if(parameters.win.height){
            var height = parameters.win.height
        }else{
            var height = textSettings.height + this.padding * 2 + this.getItemPadding()
        }

        return {width, height}
    }

    refreshSideFacePosition(){
        this.faceSprite_textWindow.adjustPosition()
        this.faceSprite_textWindow.refreshMask()
    }

    showAnimation(){
        const opacity = this.parameters.win.opacity[1]
        const {widthAlign, heightAlign} = this.parameters.win.openness.open
        const {duration, easing, delay, initial, target} = this.parameters.win.position
        const parsedEasing = Eli.Utils.convertEscapeVariablesOnly(easing)
        const {targetWidth, targetHeight, maxWidth, maxHeight} = this.createTargetSize(widthAlign, heightAlign)
        const {x: initX, y: initY} = this.createDestinationPosition(initial)
        const {x: targetX, y: targetY} = this.createDestinationPosition(target)
        const {faceName, faceIndex, text} = this.getCurrentMessage()
        const durationOp = this.parameters.win.openness.duration
        const easingOp = Eli.Utils.convertEscapeVariablesOnly(this.parameters.win.openness.easing)
        const se = this.parameters.win.sound.open

        this.prepareToStart(faceName, faceIndex)

        if(!this.isMessageType()){
            this.drawMessageInstantly(text)
        }

        this.frameVisible = false

        this.animation = new anime({
            targets: this,
            x: [initX, targetX],
            y: [initY, targetY],
            alpha: opacity/255,
            openness: {
                value: 255,
                duration: 1,
            },
            width: {
                value: [targetWidth, maxWidth],
                easing: easingOp,
                duration: durationOp,
            },
            height: {
                value: [targetHeight, maxHeight],
                easing: easingOp,
                duration: durationOp,
            },
            easing: parsedEasing,
            duration: duration,
            autoplay: true,
            begin: (anime) => {
                this.refreshCoordinates(maxWidth, maxHeight, widthAlign, heightAlign)
                this.refreshSize(targetWidth, targetHeight)
                this.show()

                if(se.name){
                    AudioManager.playSe(se)
                }
            },
            update: (anime) => {
                this.refreshCoordinates(maxWidth, maxHeight, widthAlign, heightAlign)
                this.faceSprite_textWindow.alpha = this.alpha

                if(this.imageLayerIsOutside()){
                    this.refreshFaceSpriteScale(maxHeight, maxWidth)
                }

                if(this.width >= 15 && this.height >= 15){
                    this.frameVisible = true
                }
            },
            complete: (anime) =>{
                if(this.isMessageType()){
                    this.startMessage(text)
                }

                this.isReadyToUpdate = true
            }
        })
    }

    createTargetSize(widthType, heightType){
        const maxWidth = this.width
        const maxHeight = this.height
        const targetWidth = widthType === "none" ? this.width : 0
        const targetHeight = heightType === "none" ? this.height : 0

        return {targetWidth, targetHeight, maxWidth, maxHeight}
    }

    createDestinationPosition({ alignX, alignY, offsetX, offsetY }){
        offsetX = Number(Eli.Utils.convertEscapeVariablesOnly(offsetX))
        offsetY = Number(Eli.Utils.convertEscapeVariablesOnly(offsetY))
        const x = {
            left: offsetX,
            center: (Graphics.width/2 - this.width/2) + offsetX,
            right: (Graphics.width - this.width),
            left_offScreen: -this.width,
            right_offScreen: Graphics.width + this.width,
        }[alignX]

        const y = {
            top: offsetY,
            center: (Graphics.height/2 - this.height/2) + offsetY,
            bottom: (Graphics.height - this.height) + offsetY,
            top_offScreen: -this.height,
            bottom_offScreen: Graphics.height + this.height,
        }[alignY]
        
        return { x: Math.round(x), y: Math.round(y) }
    }

    prepareToStart(name, index){
        this.faceSprite_textWindow.refreshFaceBitmap(name, index)
        this.faceSprite_textWindow.alpha = this.alpha
    }

    isMessageType(){
        return this.parameters.contents.writeType === "Message"
    }

    drawMessageInstantly(text){
        this.startMessage(text)
        this.drawTextEx(this._textState.text, this._textState.x, this._textState.y)
        this._textState.index = this._textState.text.length-1
        this._textState.x = 3000
        this._textState.y = 3000
        this._showFast = true
    }

/* ------------------------------ TEXT SECTION ------------------------------ */

    startMessage(text){
        this._textState = this.createTextState(text, 0, 0, 0)
        this.newPage(this._textState)
    }

    createTextState(text, x, y, width){
        const textState = {}
        textState.index = 0
        textState.text = this.convertEscapeCharacters(text)

        return textState
    }

    newLineX(){
        let margin = 0
        if(this.hasFaceImage()){
            margin = this.newLineXForFace()

        }else if(this.hasCharImage()){
            margin = this.newLineXForChar()
        }
        const x = this.isRTL() ? this.innerWidth - margin : margin

        return x + this.parameters.contents.textOffsetX

    }

    isRTL(){
        return this.containsArabic(this._textState.text)
    }

    containsArabic(str) {
        const regExp = this.rtlReg
        return regExp.test(str)
    }

    hasFaceImage(){
        return this.imageTypeIsFace() && this.faceSprite_textWindow.faceName !== ""
    }

    imageTypeIsFace(){
        return this.parameters.contents.image.type === "Face"
    }

    newLineXForFace(){
        const width = Eli.Utils.getFaceSize().width
        const spacing = 20

        return width + spacing
    }

    hasCharImage(){
        return this.imageTypeIsCharacter() && this.character_textWindow && ( this.character_textWindow.characterName() || this.character_textWindow.tileId() )
    }

    imageTypeIsCharacter(){
        return this.parameters.contents.image.type === "Character"
    }

    newLineXForChar(){
        const width = this.character_textWindow.getMapSprite().patternWidth()
        const spacing = 10

        return width + spacing
    }

    onEndOfText(){
        this._textState = null
        this.isReadyToUpdate = false

        if(this.isStaticWindow()){
            this.isStaticReady = true
        }else{
            this.hideAnimation()
        }
        
    }

    needsNewPage(textState){
        /* 
            It never needs a new page. The window only have one page.
            When it writes again, it clears all content. 
        */
        return false
    }

/* ---------------------------- END TEXT SECTION ---------------------------- */

    refreshCoordinates(maxWidth, maxHeight, widthAlign, heightAlign){
        this.x = this.calculateX(maxWidth, widthAlign)
        this.y = this.calculateY(maxHeight, heightAlign)
    }

    calculateX(maxWidth, align){
        const x = this.x
        const options = {
            none: x,
            left: x,
            center: x + maxWidth/2 - this.width/2,
            right: x + (maxWidth - this.width),
        }

        return options[align]
    }

    calculateY(maxHeight, align){
        const y = this.y
        const options = {
            none: y,
            top: y,
            center: y + maxHeight/2 - this.height/2,
            bottom: y + (maxHeight - this.height),
        }

        return options[align]
    }

    refreshSize(targetWidth, targetHeight){
        this.width = targetWidth
        this.height = targetHeight
    }

    refreshFaceSpriteScale(maxHeight, maxWidth){
        this.faceSprite_textWindow.scale.y = this.height / maxHeight
        this.faceSprite_textWindow.scale.x = this.width / maxWidth
    }

    hideAnimation(){
        const opacity = this.parameters.win.opacity[2]
        const se = this.parameters.win.sound.close
        const durationOp = this.parameters.win.openness.duration
        const easingOp = Eli.Utils.convertEscapeVariablesOnly(this.parameters.win.openness.easing)
        const {widthAlign, heightAlign} = this.parameters.win.openness.close
        const {duration, easing, delay, initial, target} = this.parameters.win.position
        const parsedEasing = Eli.Utils.convertEscapeVariablesOnly(easing)
        const {targetWidth, targetHeight, maxWidth, maxHeight} = this.createTargetSize(widthAlign, heightAlign)
        const {x: initX, y: initY} = this.createDestinationPosition(initial)
        const targetOpenness = this.createTargetOpenness(heightAlign)

        let canPlaySe = false

        this.animation = new anime({
            targets: this,
            x: initX,
            y: initY,
            alpha: opacity/255,
            openness: {
                value: targetOpenness,
                easing: easingOp,
                duration: durationOp/2,
            },
            width: {
                value: [maxWidth, targetWidth],
                easing: easingOp,
                duration: durationOp,
            },
            height: {
                value: [maxHeight, targetHeight],
                easing: easingOp,
                duration: durationOp,
            },
            easing: parsedEasing,
            delay: delay,
            duration: duration,
            autoplay: true,
            begin: (anime) => {},
            update: (anime) => {
                this.refreshCoordinates(maxWidth, maxHeight, widthAlign, heightAlign)
                this.faceSprite_textWindow.alpha = this.alpha

                if(anime.progress >= 75 && !canPlaySe){

                    if(se.name){
                        AudioManager.playSe(se)
                    }
                    canPlaySe = true
                }

                if(this.imageLayerIsOutside()){
                    this.refreshFaceSpriteScale(maxHeight, maxWidth)
                }

                if(this.width <= 20 || this.height <= 20){
                    this.frameVisible = false
                }

            },
            complete: (anime) =>{
                if(this.canDestroy()){
                    this.destroy()
                }else{
                    this.contents.clear()
                    this.advanceMessageIndex()
                    this.startWindowActivity()
                    this.isStaticReady = false
                }
            }
        })
    }

    createTargetOpenness(heightAlign){
        if(this.needOpennessTarget(heightAlign)){
            return 0
        }else{
            return 255
        }
    }

    needOpennessTarget(heightAlign){
        return heightAlign !== "none"
    }

    canDestroy(){
        return this.messageIndex === (this.messages.length - 1) && !this.isStaticWindow()
    }

/* --------------------- INHERIT FROM ELI ANIMATED FACES -------------------- */

    updateIdleFaceAnimation(){
        this.faceSprite_textWindow.updateAnimation(this.faceSprite_textWindow.settings.middleIndex)
    }

    updateTalkingFaceAnimation(){
        this.faceSprite_textWindow.updateAnimation(this.faceSprite_textWindow.settings.endIndex)
    }

    createFaceSprite(){}

/* ------------------ OVERWRITE FROM DEFAULT MESSAGE WINDOW ----------------- */

    updatePlacement(){}
    createSubWindows(){}
    updateSpeakerName(){}
    loadMessageFace(){}

/* --------------------------- ELI MESSAGE ACTIONS -------------------------- */

    DRAWIMG(textState){
        const [folder, fileName] = Eli.MessageActions.obtainEscapeParam(textState).split(",")
        const bitmap = Eli.MessageActions.getBitmapFromDrawCode(folder, fileName)
        const dx = textState.x
        const dy = textState.y

        this.contents.hasInlineImage = true

        bitmap.addLoadListener(() => {
            const sw = bitmap.width
            const sh = bitmap.height
            const dw = sw
            const dh = sh
            let rect = new Rectangle(dx, dy, dw, dh)
            const mainWin = new Window_Base(rect)
            
            for(const area of this.contents.imgAreas){
                const tempWin = new Window_Base(area)
                const collision = Eli.Utils.bump.rectangleCollision(mainWin, tempWin)

                switch(collision){
                    case "top":
                        rect = new Rectangle(rect.x, area.bottom, dw, dh)
                    break
                    case "bottom":
                        rect = new Rectangle(rect.x, area.top, dw, dh)
                    break
                    case "left":
                        rect = new Rectangle(area.left, rect.y, dw, dh)
                    break
                    case "right":
                        rect = new Rectangle(area.right, rect.y, dw, dh)
                    break
                }

            }

            this.contents.imgAreas.push(rect)
            
            if(rect.bottom > this.allTextHeight){
                this.adjustMaxOriginY(rect)
            }
            
            this.contents.blt(bitmap, 0, 0, sw, sh, rect.x, rect.y, rect.width, rect.height)
        })
    }

    // MV ONLY
    windowWidth(){
        return this.customWidth
    }

    windowHeight(){
        return this.customHeight
    }

}

Eli.TextWindow = {

    version: 5.10,
    url: "",
    parameters: {
        templates: [{
            id: "",
            isStatic: false,
            updateInterval: 0,
            messages: [{
                faceName: "",
                faceIndex: 0,
                text: "",
                spriteId: 0,
                charName: "",
                charIndex: 0,
            }],
            contents: {
                image: {
                    type: "",
                    alignY: "",
                    layer: "",
                },
                textOffsetX: 0,
                writeType: "",
            },
            win: {
                backgroundType: "",
                height: 0,
                layer: "",
                skin: "",
                tone: [0, 0, 0],
                width: 0,
                opacity: [0, 0, 0],
                position: {
                    initial: {
                        alignX: "",
                        offsetX: 0,
                        alignY: "",
                        offsetY: 0,
                    },
                    target: {
                        alignX: "",
                        offsetX: 0,
                        alignY: "",
                        offsetY: 0,
                    },
                    easing: "",
                    duration: 0,
                    delay: 0,
                },  
                openness: {
                    open: {widthAlign: "none", heightAlign: "center"},
                    close: {widthAlign: "none", heightAlign: "center"},
                    duration: 0,
                    easing: "inherit",
                },
                sound: {
                    open: {name: "", pan: 0, pitch: 0, volume: 0},
                    close: {name: "", pan: 0, pitch: 0, volume: 0},
                },
            },
        }],
    },
    alias: {},
    tempChar: {
        id: 0,
        name: "",
        index: -1,
    },
    currentTemplateId: null,
    eventIntegration: false,
    Container_TextWindow: Container_TextWindow,
    Sprite_TextWindowFace: Sprite_TextWindowFace,
    Sprite_TextWindowAnimatedFace: Sprite_TextWindowAnimatedFace,
    Sprite_TextWindowCharacter: Sprite_TextWindowCharacter,
    Window_TextWindow: Window_TextWindow,
    needPreloadImagesForText: false,

    initialize(){
        this.initParameters()
        this.initPluginCommands()
    },

    initParameters(){
        this.parameters = PluginManager.parameters("Eli_TextWindow")
        this.parameters.templates = JSON.parse(this.parameters.templates)

        for(let i = 0; i < this.parameters.templates.length; i++){
            const template = this.parseTemplateParameters(this.parameters.templates[i])

            this.parameters.templates[i] = template
        }
    },

    parseTemplateParameters(parameters){
        const template = JSON.parse(parameters)

        template.id = template.id.toLowerCase()
        template.messages = []
        template.isStatic = template.isStatic === "true"
        template.updateInterval = Number(template.updateInterval)
        template.win = this.parseWinParameters(template.win)
        template.contents = this.parseContentParameters(template.contents)

        return template
    },

    parseWinParameters(parameters){
        const win = JSON.parse(parameters)
        win.skin = win.skin
        win.backgroundType = this.findBackgroundType(win.backgroundType)
        win.tone = this.formatTone(win.tone)
        win.layer = win.layer // Can be Variable!
        win.width = Number(win.width)
        win.height = Number(win.height)
        win.position = this.parsePositionParameters(win.position)
        win.openness = this.parseOpennessParameters(win.openness, win.position.easing)
        win.sound = this.parseSoundParameters(win.sound)
        win.opacity = this.formatOpacity(win.opacity)

        return win
    },

    findBackgroundType(type){
        const options = {
            "Window":                   0,
            "Dim":                      1,
            "Transparent":              2,
            "Strong":                   3,
            "Light Gradient Vertical":  4,
            "Faded Horizontal":         5,
        }
        return options[type]
    },

    formatTone(tone){
        return tone.split(",").map(item => Number(item))
    },

    parsePositionParameters(parameters){
        const position = JSON.parse(parameters)
        position.duration = Eli.Date.framesToMilliSeconds(Number(position.duration))
        position.easing = position.easing
        position.delay = Eli.Date.framesToMilliSeconds(Number(position.delay))

        position.initial = {
            alignX: position.initialAlignX,
            offsetX: position.initialOffsetX,
            alignY: position.initialAlignY,
            offsetY: position.initialOffsetY,       
        }
        position.target = {
            alignX: position.targetAlignX,
            offsetX: position.targetOffsetX,
            alignY: position.targetAlignY,
            offsetY: position.targetOffsetY,       
        }

        delete position.initialAlignX 
        delete position.initialOffsetX
        delete position.initialAlignY
        delete position.initialOffsetY
        delete position.targetAlignX
        delete position.targetOffsetX
        delete position.targetAlignY
        delete position.targetOffsetY

        return position
    },

    parseOpennessParameters(parameters, easingPosition){
        const openness = JSON.parse(parameters)

        openness.open = JSON.parse(openness.open)
        openness.open.widthAlign = this.findOpennessDirection(openness.open.widthAlign)
        openness.open.heightAlign = this.findOpennessDirection(openness.open.heightAlign)

        openness.close = JSON.parse(openness.close)
        openness.close.widthAlign = this.findOpennessDirection(openness.close.widthAlign)
        openness.close.heightAlign = this.findOpennessDirection(openness.close.heightAlign)

        if(openness.easing === "inherit"){
            openness.easing = easingPosition
        }else{
            openness.easing = openness.easing
        }
        
        openness.duration = Eli.Date.framesToMilliSeconds(Number(openness.duration))

        return openness
    },

    findOpennessDirection(direction){
        const options = {
            "None":             "none",
            "Left to Right":    "left",
            "Centered":         "center",
            "Right to Left":    "right",
            "Top to Bottom":    "top",
            "Bottom to Top":    "bottom",
        }
        return options[direction]
    },

    parseSoundParameters(parameters){
        const sound = JSON.parse(parameters)
        sound.close = JSON.parse(sound.close)
        sound.close.name = sound.close.name
        sound.close.pan = Number(sound.close.pan)
        sound.close.volume = Number(sound.close.volume)
        sound.close.pitch = Number(sound.close.pitch)

        sound.open = JSON.parse(sound.open)
        sound.open.name = sound.open.name
        sound.open.pan = Number(sound.open.pan)
        sound.open.volume = Number(sound.open.volume)
        sound.open.pitch = Number(sound.open.pitch)

        return sound
    },

    formatOpacity(opacity){
        return opacity.split(",").map(item => Number(item))
    },

    parseContentParameters(parameters){
        const contents = JSON.parse(parameters)
        contents.textOffsetX = Number(contents.textOffsetX)
        contents.writeType = contents.writeType
        contents.image = {
            type: contents.imageType,
            alignY: contents.imageAlignY,
            layer: contents.imageLayer,
        }

        delete contents.imageType
        delete contents.imageAlignY
        delete contents.imageLayer
        
        return contents
    },

    initPluginCommands(){
        // const commands = [ "cmd_setupAndShow", "cmd_setupTemplate", "cmd_setupCharacter", "cmd_showMessage"]
        // Eli.PluginManager.registerCommands(this, commands)
    },

    cmd_setupAndShow(args){
        const templateId = Eli.Utils.convertEscapeVariablesOnly(args.id.toLowerCase())
        let template = this.parameters.templates.find(template => template.id.toLowerCase() === templateId)

        if(!template){
            template = this.parseTemplateParameters(args.template)
            this.parameters.templates.push(template)
        }
        
        if(template){

            template.messages = this.parseMessageParameters(args.messages)
            this.currentTemplateId = null
            this.eventIntegration = false

            if(template.messages.length > 0){

                if(this.needPreloadImagesForText){
                    setTimeout(() => {this.createTextWindow(template)}, 100)

                }else{
                    this.createTextWindow(template)
                }
                
            }
            this.needPreloadImagesForText = false
            
        }else{
            console.log(`Eli Text Window: Template not found`)
        }
    },

    createDummyWin(){
        if(Utils.RPGMAKER_NAME === "MV"){
            return new Window_Base(0, 0, 200, 200)
        }else{
            return new Window_Base(new Rectangle(0, 0, 200, 200))
        }
    },

    parseMessageParameters(rawMessages){
        const messages = JSON.parse(rawMessages)
        const dummyWin = this.createDummyWin()

        for(let i = 0; i < messages.length; i++){
            const msg = JSON.parse(messages[i])
            msg.charIndex = msg.charIndex
            msg.faceIndex = msg.faceIndex
            msg.spriteId = msg.spriteId == 0 ? Eli.PluginManager.currentEventId : Number(Eli.Utils.convertEscapeVariablesOnly(msg.spriteId))

            if(msg.text.toLowerCase().includes("drawimg")){
                this.needPreloadImagesForText = true
                dummyWin.drawTextEx(msg.text.substring(0)) // Preload images that has "drawimg" escape code.
            }
            
            delete msg.separator1
            delete msg.separator2
            messages[i] = msg
        }
        
        return messages
    },

    createTextWindow(template){
        const rect = new Rectangle(0, 0, 1000, 1000)
        const textWindow = new Window_TextWindow(rect, template)
        const layer = Eli.Utils.convertEscapeVariablesOnly(template.win.layer)

        this.addTextWindowByLayer(layer, textWindow)
        textWindow.startWindowActivity()  
    },

    addTextWindowByLayer(layer, win){
        const scene = SceneManager._scene
        const Container = {
            "Below Pictures": scene._spriteset.textWindowContainer_belowPictures,
            "Above Pictures and below Windows": scene._spriteset.textWindowContainer_abovePictures,
            "Above Windows": scene.textWindowContainer_aboveWindows,
        }[layer]
        Container.addChild(win)
    },

    cmdMV_setupTemplate(args){
        const mzArgs = {
            id: args[0],
        }

        const templateId = Eli.Utils.convertEscapeVariablesOnly(mzArgs.id.toLowerCase())
        let template = this.parameters.templates.find(template => template.id.toLowerCase() === templateId)
        
        if(template){
            template.messages = []
            this.currentTemplateId = templateId
            this.eventIntegration = true
            
        }else{
            console.log(`Eli Text Window: Template not found`)
        }
    },

    cmdMV_showMessage(args){
        const mzArgs = {
            id: args[0]
        }

        const templateId = Eli.Utils.convertEscapeVariablesOnly(mzArgs.id.toLowerCase())
        let template = this.parameters.templates.find(template => template.id === templateId)
        
        if(template){
           
            this.currentTemplateId = null
            this.eventIntegration = false
            this.createTextWindow(template)

        }else{
            console.log(`Eli Text Window: Template not found`)
        }
    },

    cmdMV_setTempChar(args){
        this.tempChar = {
            id: args[0],
            name: args[1] || "",
            index: args[2] || "-1",
        }
    },

    executePluginCommandMV(args){
        const subCommand = args.shift()
        const cmdList = {
            SETUP: "cmdMV_setupTemplate",
            SHOW: "cmdMV_showMessage",
            SETCHAR: "cmdMV_setTempChar",
        }
        const cmd = cmdList[subCommand.toUpperCase()]

        if(this[cmd]){
            this[cmd](args)
        }
    },

    param(){
        return this.parameters
    },

    resetTempChar(){
        this.tempChar = {
            id: 0,
            name: "",
            index: -1,
        }
    },
}

const Plugin = Eli.TextWindow
const Alias = Eli.TextWindow.alias

Plugin.initialize()

/* ------------------------------- SCENE BASE ------------------------------- */
{

Alias.Scene_Base_create = Scene_Base.prototype.create
Scene_Base.prototype.create = function() {
    Alias.Scene_Base_create.call(this)
    this.createTextWindowContainer()
}

Scene_Base.prototype.createTextWindowContainer = function(){
    this.textWindowContainer_aboveWindows = new Container_TextWindow() 
    this.addChild(this.textWindowContainer_aboveWindows) 
}

Scene_Base.prototype.setTextWindowAboveWindowLayer = function(){
    this.setChildIndex(this.textWindowContainer_aboveWindows, this.children.length-1) 
}

Alias.Scene_Base_start = Scene_Base.prototype.start
Scene_Base.prototype.start = function(){
    this.setTextWindowAboveWindowLayer()
    Alias.Scene_Base_start.call(this)
}

}

/* ----------------------------- SPRITESET BASE ----------------------------- */
{

Alias.Spriteset_Base_createUpperLayer = Spriteset_Base.prototype.createUpperLayer
Spriteset_Base.prototype.createUpperLayer = function() {
    this.createTextWindowBelowPictures()
    Alias.Spriteset_Base_createUpperLayer.call(this)
    this.createTextWindowAbovePictures()
}

Spriteset_Base.prototype.createTextWindowBelowPictures = function() {
    this.textWindowContainer_belowPictures = new Container_TextWindow()
    this.addChild(this.textWindowContainer_belowPictures)
}

Spriteset_Base.prototype.createTextWindowAbovePictures = function() {
    this.textWindowContainer_abovePictures = new Container_TextWindow()
    this.addChild(this.textWindowContainer_abovePictures)
}

}

/* ---------------------------- GAME INTERPRETER ---------------------------- */
{

// Show Text
Alias.Game_Interpreter_command101 = Game_Interpreter.prototype.command101
Game_Interpreter.prototype.command101 = function(){
    if(Plugin.eventIntegration){
        const template = Plugin.parameters.templates.find(item => item.id === Plugin.currentTemplateId)

        if(template){
            this.command101_setupTextWindowMessage(this._params, template)
        }

        return true
    }else{
        return Alias.Game_Interpreter_command101.call(this)
    }
}

Alias.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function (command, args) {
Alias.Game_Interpreter_pluginCommand.call(this, command, args)
    if(command.toUpperCase() === "TEXTWINDOW"){
        Plugin.executePluginCommandMV(args)
    }
    
}

Game_Interpreter.prototype.command101_setupTextWindowMessage = function(params, template) {
    const msgIndex = template.messages.length
    const {charName, spriteId, charIndex} = this.createTextWindowCharSettings()
    template.messages.push({
        charIndex: charIndex,
        charName: charName,
        faceIndex: params[1],
        faceName: params[0],
        spriteId: spriteId,
        text: "",
    })
    Plugin.resetTempChar()

    while(this.nextEventCode() === 401){
        this._index++
        const cmdText = this.currentCommand().parameters[0]
        template.messages[msgIndex].text += template.messages[msgIndex].text ? "\n" + cmdText : cmdText
    }
}

Game_Interpreter.prototype.createTextWindowCharSettings = function() {
    let {name, id, index} = Plugin.tempChar
    name = Eli.Utils.convertEscapeVariablesOnly(name)
    id = Eli.Utils.convertEscapeVariablesOnly(String(id))
    index = Number(Eli.Utils.convertEscapeVariablesOnly(String(index)))
    
    const spriteId = Number(id) || id || this._eventId
    const sprite = Eli.Utils.getSpriteCharacter(spriteId)
    const character = sprite._character
    const charName = name || character.characterName()
    const charIndex = index > -1 ? index : character.characterIndex()

    return {spriteId, charName, charIndex}
}

}

}