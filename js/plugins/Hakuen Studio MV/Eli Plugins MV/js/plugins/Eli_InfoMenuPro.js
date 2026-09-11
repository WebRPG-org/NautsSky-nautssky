//==========================================================================
// Eli_InfoMenu.js
//==========================================================================

/*:
@plugindesc ♦1.0.0♦ A new Scene that show any kind of information with text and images.
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
Features
============================================================================

● A new scene that can show any kind of information with text and images.
● Unlock new information as the game goes!
● Show a toast window when new information is unlocked!
● Call the scene through the keyboard, gamepad, or screen button.
● Commands can have categories to better separate different information!
● Can add a menu command to call the Info Scene from the Scene Menu!

============================================================================
How to use
============================================================================

The new scene can be called by the player using a keyboard key, gamepad, or 
clicking on a screen button. Optionally you can set a background image for 
it. If you don’t set it, it will have the background like the default 
Menu Scene.

♦ Scene Info ♦

• Title Window → That only serves as a title to the scene. It is always on 
the top of the screen.

• Command Window → This window has a list of commands and each one contains 
some information attached to it by the user. These commands are all built 
in the plugin parameters and can be unlocked by default or through script 
calls. Here is also where you will set the information and toast window 
settings, regarding its content(See below)

• Information Window → Here is where the information is shown to the player. 
It can be plain text, only images, or both. The window can read escape 
codes normally and insert images you have to use a special escape code 
defined on the plugin parameters.
Besides that, it works like a static Scroll Text window. But the scroll is 
made manually by the player(Up and down, when it does have content).

♦ Scene Map ♦

• Screen Button → You can set a screen button that the player can click 
and open the menu. If you do not want to use it, leave the image field on 
the plugin parameters empty.

• Toast Window → This one works like a pop-up that is shown when the 
player unlocks new info. The plugin only handles one at a time(But they 
can be stacked). You can handle the position of the window, using the 
following script calls:

♦ Debug Parameter ♦

When this parameter is set to true, the toast window will always 
show, even if the command is already unlocked. So set this off when 
deploying your game.

♦ Script call: Unlock Information ♦

Because MV doesn't have the complex plugin command structure of MZ, 
we need to use a script call for that.
The script call is big, but not that complicated. I will explain 
every item of it, and also let you know a way to automatize it 
with a common event.

Eli.InfoMenu.cmd_unlockInfo({
        index: 0, 
        index2: 3, 
        enableToast: "true", 
        toastPosition: {
            frames:   15,
            easing:   "linear",
            outsideX: "left",
            outsideY: "none",
            alignX:   "left",
            alignY:   "top",
            offsetY:  4,
            offsetX:  4, 
        }
})

NOTE¹: What is not a number, must be inside quotes "".

Unlock Command

• Index → The index of the main command to unlock.
• Index2 → the index of the sub command to unlock. 
If you don't want to unlock a sub command, only a main command, leave 
the Index2 as empty, like this ""

Window Movement

• Enable Toast → Put "true" or "false".
• Easing → You need to put here one of the following:
https://animejs.com/documentation/#pennerFunctions
or "linear".
• Move Duration → How long it takes for the window to show
(Initial to Target) and hide (Target to Initial).

Initial Position

• OutsideX → Can be “left”, “right”, or “none”.
• OutsideY → Can be “top”, “bottom”, or “none”. 
This will decide from what direction the window will come from. The plugin 
automatically calculates the size of the window and puts it outside of the 
screen. If you set to none, the position will be the same as the target.

Target Position

• AlignX → Can be “left”, “right”, “center”, or “none”.
• AlignY → Can be “top”, “bottom”, “center”, or “none”.
Additionally, you can also set offsetX and offsetY. They work as a plus 
value from what the plugin already calculated based on the alignment 
settings.
If perhaps you set the align settings to “none”, The plugin will take only 
the Offsets value.

Now that every item is explained and the script call is kinda big, is best
if you use a common event every time you want to unlock a command.

A good way of doing that, is to fill every field of this script call 
with variables:

$gameVariables.value(ID)

Put the script call in a common event, and every time you want to unlock a 
new command, you change only the variable value you want and call the 
common event.
For your lucky, I already did an example on the sample project, so you can 
take a look.

============================================================================
Update Log
============================================================================

https://tinyurl.com/infoMenuProLog

============================================================================

@param scene
@text Scene
@type struct<sceneSt>
@desc Settings for the Scene Info Menu
@default {"backgroundImage":"","keyboardKey":"i","gamepadKey":"select","overwrite":"true","switch":"0"}

@param titleWindow
@text Title Window
@type struct<titleWindowSt>
@desc Settings for the title window of Scene Info Menu
@default {"skin":"Window","opacity":"255","lines":"2","text":"\"Scene Info\\n    Information about your World\""}

@param commandWindow
@text Command Window
@type struct<commandWindowSt>
@desc Settings for the command window of Scene Info Menu
@default {"skin":"Window","opacity":"255","width":"0","alignX":"left","list":"[]","useCategory":"true"}

@param infoWindow
@text Info Window
@type struct<infoWindowSt>
@desc Settings for the Info window of Scene Info Menu
@default {"skin":"Window","opacity":"255","scrollSpeed":"2","mouseScrollPower":"2"}

@param toastWindow
@text Toast Window
@type struct<toastWindowSt>
@desc Settings for the toast/pop up window when a new info is unlocked.
@default {"skin":"Window","delay":"120"}

@param screenButton
@text Screen Button
@type struct<screenButtonSt>
@desc The on screen button that will call the Info Menu when clicked.
@default {"enable":"true","image":"infoButton","position":"","alignX":"right","offsetX":"-276","alignY":"top","offsetY":"6"}

@param addOnMenu
@text Add Command to Menu
@type boolean
@desc If true, a command will be added into the menu command to call the info scene.
@default true

@param menuCommandName
@text Command Name
@type text
@desc The name of the command inside the Scene Menu
@default Information
@parent addOnMenu

*/

/* ----------------------------- SCENE INFO MENU ---------------------------- */
{
/*~struct~sceneSt:

@param backgroundImage
@text Background Image
@type file
@dir img/system
@desc 
@default

@param keyboardKey
@text Keyboard key
@type select
@option none @option a @option b @option c @option d @option e @option f @option g @option h @option i @option j @option k @option l @option m @option n @option o @option p @option q @option r @option s @option t @option u @option v @option w @option x @option y @option z @option 0 @option 1 @option 2 @option 3 @option 4 @option 5 @option 6 @option 7 @option 8 @option 9 @option backspace @option tab @option enter @option shift @option ctrl @option alt @option pausebreak @option capslock @option esc @option space @option pageup @option pagedown @option end @option home @option leftarrow @option uparrow @option rightarrow @option downarrow @option insert @option delete @option leftwindowkey @option rightwindowkey @option selectkey @option numpad0 @option numpad1 @option numpad2 @option numpad3 @option numpad4 @option numpad5 @option numpad6 @option numpad7 @option numpad8 @option numpad9 @option multiply @option add @option subtract @option decimalpoint @option divide @option f1 @option f2 @option f3 @option f4 @option f5 @option f6 @option f7 @option f8 @option f9 @option f10 @option f11 @option f12 @option numlock @option scrolllock @option semicolon @option equalsign @option comma @option dash @option period @option forwardslash @option graveaccent @option openbracket @option backslash @option closebracket @option singlequote
@desc 
@default i

@param gamepadKey
@text Gamepad Key
@type select
@option none @option a @option b @option x @option y @option lb @option rb @option lt @option rt @option select @option start @option l3 @option r3 @option up @option down @option left @option right 
@desc Choose the gamepad button. Put none to not use.
Default is none.
@default select

@param overwrite
@text Overwrite keys
@type boolean
@desc Set to true if you want to overwrite the default keys.
@default true

@param switch
@text Disable Switch
@type switch
@desc If this switch is on, the info menu will be disabled. Also hides the screen button.
@default 0

*/
}

/* ------------------------------ TITLE WINDOW ------------------------------ */
{
/*~struct~titleWindowSt:

@param skin
@text Window Skin
@type file
@dir img/system
@desc The window skin file that this window will use.
@default

@param opacity
@text Skin Opacity
@type number
@desc The window skin opacity
@default 255

@param lines
@text Lines
@type number
@desc This will decide the amount of lines and the height of the window.
@default 2

@param text
@text Text
@type note
@desc The text on the title window. Can use escape codes.
@default

*/
}

/* ----------------------------- COMMAND WINDOW ----------------------------- */
{
/*~struct~commandWindowSt:

@param skin
@text Window Skin
@type file
@dir img/system
@desc The window skin file that this window will use.
@default

@param opacity
@text Skin Opacity
@type number
@desc The window skin opacity
@default 255

@param width
@text Custom Width
@type number
@desc A custom window width. Leave 0 for auto.
@default 200

@param alignX
@text Align X
@type select
@option left
@option right
@desc What side the command window will be on the screen.
@default left

@param list
@text Command list
@type struct<commandListST>[]
@desc Put here all your info commands.
@default []

@param useCategory
@text Enable Categories
@type boolean
@desc If true, you will be able to use category commands that hold different info commands.
@default false

*/
}
    
/* ------------------------------- INFO WINDOW ------------------------------ */
{
/*~struct~infoWindowSt:

@param skin
@text Window Skin
@type file
@dir img/system
@desc The window skin file that this window will use.
@default

@param opacity
@text Skin Opacity
@type number
@desc The window skin opacity
@default 255

@param scrollSpeed
@text Input Scroll Speed
@type number
@desc Higher the number, higher the scrolling speed of the page.
Works for keyboard/gamepad input.
@default 2

@param mouseScrollPower
@text Mouse Scroll Power
@type number
@desc Higher the number, higher the scrolling speed of the page.
Works for mouse/touch screen input
@default 2

*/
}

/* ------------------------------ TOAST WINDOW ------------------------------ */
{
/*~struct~toastWindowSt:

@param skin
@text Window Skin
@type file
@dir img/system
@desc The window skin file that this window will use.
@default

@param delay
@text Time on Screen
@type text
@desc How much time, in frames, the window will stay on the screen after it pop up.
@default 120

@param debug
@text Debug mode
@type boolean
@desc Set this to true to always show the toast window when unlocking a command.
@default true

*/
}

/* ------------------------------ SCREEN BUTTON ----------------------------- */
{
/*~struct~screenButtonSt:

@param enable
@text Enable
@type boolean
@desc If true, a button will be displayed on scene map.
@default true

@param image
@text Image
@type file
@dir img/system
@desc The image used to represent the button on screen.
@default

@param position
@text Position

@param alignX
@text Align X
@type select
@option none
@option left
@option center
@option right
@desc Select none to only use offset value.
@default right
@parent position
    
@param offsetX
@text Offset X
@type text
@desc The Offset X position.
@default -12
@parent position

@param alignY
@text Align Y
@type select
@option none
@option top
@option center
@option bottom
@desc Select none to only use offset value.
@default top
@parent position

@param offsetY
@text Offset Y
@type text
@desc The offset Y position.
@default 12
@parent position

*/
}

/* ------------------------------ COMMAND LIST ------------------------------ */
{
/*~struct~commandListST:

@param name
@text Name
@type text
@desc This is the name that will appear on the command.
@default

@param info
@text Info Text
@type note
@desc This is the text that will appear on the info window when this command is selected.
@default

@param enabled
@text Enabled
@type boolean
@desc If true, it will be already avaliable as the game starts.
@default false

@param toast
@text Toast Text
@type note
@desc This is the text that will appear on the toast window when this info is unlocked.
@default 

@param subList
@text Sub Command list
@type struct<subCommandListST>[]
@desc If Categories is enabled, then you can build the sub info commands here.
@default []

*/
}

/* ---------------------------- SUB COMMAND LIST ---------------------------- */
{
/*~struct~subCommandListST:

@param name
@text Name
@type text
@desc This is the name that will appear on this sub command.
@default

@param info
@text Info Text
@type note
@desc This is the text that will appear on the info window when this sub command is selected.
@default

@param enabled
@text Enabled
@type boolean
@desc If true, it will be already avaliable as the game starts.
@default false

@param toast
@text Toast Text
@type note
@desc This is the text that will appear on the toast window when this info is unlocked.
@default 

*/
}

/* ---------------------------- SHOW TOAST WINDOW --------------------------- */
{
/*~struct~toastPositionSt:

@param initial
@text Initial Positions

@param frames
@text Move Duration(Frames)
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
Imported.Eli_InfoMenu = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

let NEED_PRELOAD = true

class Window_Dummy extends Window_Base{

    textWidthEx(text) {
        return this.drawTextEx(text, 0, this.contents.height)
    }

}
    
class Window_TitleInfo extends Window_Base {

    initialize(x, y, width, height){
        super.initialize(x, y, width, height)
        this.opacity = Plugin.titleWindowParam().opacity
    }

    loadWindowskin() {
        const image = Plugin.titleWindowParam().skin
        if(image){
            this.windowskin = ImageManager.loadSystem(image)
        }else{
            super.loadWindowSkin()
        }
    }

    contentsHeight(){
        const dummyWindow = new Window_Base(0, 0, 5000, 5000)
        const textState = {text: Plugin.titleWindowParam().text, index: 0}

        return dummyWindow.calcTextHeight(textState, true)
    }

}
    
class Window_CommandInfo extends Window_Command {

    constructor(x, y, width, height){
        super(x, y, width, height)
    }

    initialize(x, y, width, height){
        this.customWidth = width
        this.customHeight = height
        this.commandType = "main"
        super.initialize(x, y)
        this.opacity = Plugin.commandWindowParam().opacity
    }

    loadWindowskin() {
        const image = Plugin.commandWindowParam().skin
        if(image){
            this.windowskin = ImageManager.loadSystem(image)
        }else{
            super.loadWindowSkin()
        }
    }

    windowWidth() {
        return this.customWidth
    }
    
    windowHeight() {
        return this.customHeight
    }

    makeCommandList() {
        if(this.commandType === "sub"){
            const index = Plugin.lastMainCommandExt
            const subCommands = Plugin.commandWindowParam().list[index].subList
            Plugin.currentCommandList = Plugin.commandWindowParam().list[index].subList

            for(let i = 0; i < subCommands.length; i++){
                const command = subCommands[i]
                const {name, icon, info, enabled} = command
                const avaliable = Plugin.isInfoMenuCommandAvaliable(index, i)
                const symbol = name.toLowerCase()
                const ext = i
                if(!avaliable) continue
                this.addCommand(name, symbol, true, ext)
            }

        }else{
            Plugin.currentCommandList = Plugin.commandWindowParam().list

            for(let i = 0; i < Plugin.commandWindowParam().list.length; i++){
                const command = Plugin.commandWindowParam().list[i]
                const {name, icon, info, enabled} = command
                const avaliable = Plugin.isInfoMenuCommandAvaliable(i)
                const symbol = name.toLowerCase()
                const ext = i
                if(!avaliable) continue
                this.addCommand(name, symbol, true, ext)
            }
        }

    }

    setHelpText(){
        if(this.currentExt() > -1){
            const cmd = Plugin.currentCommandList[this.currentExt()]
            const text = cmd ? cmd.info : ''
            this._helpWindow.setText(text)
        }else{
            this._helpWindow.setText('')
        }  
    }

    updateHelp(){
        super.updateHelp()
        this.setHelpText()
    }

    canOpenSubCommands(){
        const index = this.currentExt()
        const command = Plugin.currentCommandList[index]
        return  Plugin.commandWindowParam().useCategory && 
                this.commandType === "main" && command.hasOwnProperty("subList") && 
                command.subList.length > 0
    }

}
    
class Window_DescriptionInfo extends Window_Help {

    constructor(x, y, width, height){
        super(x, y, width, height)
    }

    initialize(x, y, width, height){
        this.maxY = 0
        this.selected = false
        this.scrollSpeed = 1
        this.mouseScrollPower = 32
        this.allTextHeight = 0
        this.startTouchY = 0
        Window_Base.prototype.initialize.call(this, x, y, width, height)
        this._text = ''
        this.opacity = Plugin.infoWindowParam().opacity
    }

    createGridSprite(){
        const dummyWindow = new Window_Base(0, 0, 5000, 5000)
        const letterWidth = Math.floor(this.textWidth(" "))
        const textHeight = dummyWindow.calcTextHeight({text: " ", index:0}, true)
        const lineHeight = textHeight

        const rect = new Rectangle(0, 0, letterWidth, lineHeight)
        const sprite = new Sprite(new Bitmap(this.contentsWidth(), this.contentsHeight()))
        const contents = sprite.bitmap
        const mainWidth = Math.floor(this.contentsWidth() / letterWidth)
        const mainHeight = Math.floor(this.height / lineHeight) - 1

        for(let i = 0; i < mainWidth; i++){

            for(let j = 0; j < mainHeight; j++){
                const x = (this.standardPadding() + this.textPadding()) + i * letterWidth
                const y = this.standardPadding() + lineHeight * j
                contents._context.strokeStyle = "red"
                contents._context.strokeRect(x, y, rect.width, rect.height)
            }
        }
        
        this.gridSprite = sprite
        this.addChild(this.gridSprite)
    }

    createGridMark(){
        const dummyWindow = new Window_Base(0, 0, 5000, 5000)
        const letterWidth = Math.floor(this.textWidth(" "))
        const textHeight = dummyWindow.calcTextHeight({text: " ", index:0}, true)
        const lineHeight = Math.max(textHeight, this.lineHeight())
        const mainWidth = Math.floor(this.contentsWidth() / letterWidth)
        const mainHeight = 50
        const contents = this.contents

        for(let i = 0; i < mainWidth; i++){

            for(let j = 0; j < mainHeight; j++){
                const x = this.textPadding() + (i * letterWidth)
                const y = lineHeight * j
                contents._context.strokeStyle = "red"
                contents._context.strokeRect(x, y, letterWidth, lineHeight)
            }
        }

    }

    loadWindowskin(){
        const image = Plugin.infoWindowParam().skin
        if(image){
            this.windowskin = ImageManager.loadSystem(image)
        }else{
            super.loadWindowSkin()
        }
    }

    DRAWIMG(textState){
        const [folder, fileName] = Eli.MessageActions.obtainEscapeParam(textState).split(",")
        const bitmap = Plugin.createBitmapFromText(folder, fileName)
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

    adjustMaxOriginY(rect){
        this.allTextHeight = rect.bottom
        this.maxY = this.allTextHeight > this.height ? this.allTextHeight + this.lineHeight() - this.height : 0
    }

    setText(text){
        if (this._text !== text) {
            this.contents.hasInlineImage = false
            this.contents.imgAreas = []
            this._text = text.replace(/\\n/g, '\n')
            this.refresh()
        }
    }

    contentsHeight(){
        return 2000
    }

    startSelection(){
        this.selected = true
    }

    commandWindow(){
        return SceneManager._scene.commandWindow
    }

    createContents(){
        super.createContents()
        if(this._text){
            this.setMaxOriginY()
        }
    }

    setMaxOriginY(){
        const textState = {text: this._text, index: 0}
        const textHeight = this.calcTextHeight(textState, true)
        const maxY = (textHeight - this.height) + this.lineHeight()

        this.maxY = Math.max(0, maxY)
    }

    updateArrows(){
        this.downArrowVisible = this.origin.y < this.maxY && this.selected
        this.upArrowVisible = this.origin.y > 0 && this.selected
    }

    update(){
        super.update()
        if(this.selected){
            this.updateScrollSpeed()
            this.updateInput()
            this.downArrowVisible = this.origin.y < this.maxY
            this.upArrowVisible = this.origin.y > 0
        }else{
            this.downArrowVisible = false
            this.upArrowVisible = false
        }
    }

    updateScrollSpeed(){
        if(Input.isPressed('ok')){
            this.scrollSpeed = Plugin.infoWindowParam().scrollSpeed + 1
        }else{
            this.scrollSpeed = Plugin.infoWindowParam().scrollSpeed
        }
    }

    updateInput(){
        if(TouchInput.isPressed() && !TouchInput.isMoved()){
            this.startTouchY = TouchInput._y
        }
        if(TouchInput.isMoved()){
            const value = this.origin.y + (TouchInput._y - this.startTouchY)
            this.origin.y = value.clamp(0, this.maxY)

        }else{

            if(Input.isTriggered("cancel") || TouchInput.isCancelled()){
                this.onCancel()
    
            }else if(Input.isPressed("down") || TouchInput._wheelY > 0){
                this.scrollDown()
    
            }else if(Input.isPressed("up") || TouchInput._wheelY < 0){
                this.scrollUp()
            }
        }
    }

    onCancel(){
        this.selected = false
        this.maxY = 0
        this.origin.y = 0
        SoundManager.playCancel()
        this.createContents()
        this.commandWindow().activate()
    }

    getScrollSpeed(){
        if(TouchInput._wheelY !== 0){
            return this.mouseScrollPower
        }else{
            return this.scrollSpeed
        }
    }

    scrollDown(){
        const speed = this.getScrollSpeed()
        this.origin.y = Math.min(this.origin.y + speed, this.maxY)
    }

    scrollUp(){
        const speed = this.getScrollSpeed()
        this.origin.y = Math.max(0, this.origin.y - speed)
    }

    setTextHeight(){
        const dummyWindow = new Window_Base(new Rectangle(0, 0, 5000, 5000))
        const textState = {text: this._text, index: 0}
        const textHeight = dummyWindow.calcTextHeight(textState, true)
        this.allTextHeight = textHeight
    }

}

class Window_DummyDescriptionInfo extends Window_DescriptionInfo {

    
    processNormalCharacter(textState){
        var c = textState.text[textState.index++];
        var w = this.textWidth(c);
        //this.contents.drawText(c, textState.x, textState.y, w * 2, textState.height);
        textState.x += w;
    }

}
    
class Scene_MenuInfo extends Scene_MenuBase {

    create(){
        super.create()
        this.createTitleWindow()
        this.createCommandWindow()
        this.createInfoWindow()
        this.assingWindows()
        if(NEED_PRELOAD){
            Plugin.registerTextImages()
            NEED_PRELOAD = false
        }
    }

    createBackground(){
        super.createBackground()
        this.createBackgroundImage()
    }

    createBackgroundImage(){
        const file = Plugin.sceneParam().backgroundImage

        if(file){
            this.backgroundImage = new Sprite()
            this.backgroundImage.bitmap = ImageManager.loadSystem(file)
            this.addChild(this.backgroundImage)
        }
    }

    createTitleWindow(){
        const {x, y, width, height} = this.createTitleRect()
        const text = Plugin.titleWindowParam().text

        this.titleWindow = new Window_TitleInfo(x, y, width, height)
        this.titleWindow.drawTextEx(text, 0, 0)
        this.addWindow(this.titleWindow)
    }

    createCommandWindow(){
        const {x, y, width, height} = this.createCommandRect()
        const commandWindow = new Window_CommandInfo(x, y, width, height)
        this.commandWindow = commandWindow

        this.refreshCommandWindowHandlers()

        commandWindow.setHandler("cancel", this.onCommandCancel.bind(this))
        
        this.addWindow(this.commandWindow)
    }

    refreshCommandWindowHandlers(){
        for(const cmd of this.commandWindow._list){
            this.commandWindow.setHandler(cmd.symbol, this.onCommandOk.bind(this))
        }
    }

    onCommandCancel(){
        if(this.commandWindow.commandType === "sub"){
            SoundManager.playCancel()
            this.commandWindow.commandType = "main"
            this.refreshCommandTypeSwap(Plugin.lastMainCommandExt)

        }else{
            this.commandWindow.deactivate()
            SoundManager.playCancel()
            SceneManager.pop()
        }
    }

    onCommandOk(){
        if(this.commandWindow.canOpenSubCommands()){
            Plugin.lastMainCommandExt = this.commandWindow.currentExt()
            this.commandWindow.commandType = "sub"
            this.refreshCommandTypeSwap(0)
            
        }else{
            this.commandWindow.deactivate()
            this.infoWindow.startSelection()
            this.infoWindow.createContents()
        }

        this.commandWindow.updateHelp() 
    }

    refreshCommandTypeSwap(index){
        this.commandWindow.refresh()
        this.commandWindow.activate()
        this.refreshCommandWindowHandlers()
        this.infoWindow.createContents()
        this.commandWindow.select(index)
    }

    createInfoWindow(){
        const {x, y, width, height} = this.createInfoWindowRect()
        this.infoWindow = new Window_DescriptionInfo(x, y, width, height)
        this.addWindow(this.infoWindow)
    }

    assingWindows(){
        this.commandWindow.setHelpWindow(this.infoWindow)
    }

    createTitleRect(){
        const x = 0
        const y = 0
        const lines = Plugin.titleWindowParam().lines
        const width = Graphics.boxWidth
        const dummyWindow = new Window_Base(200, 200, 200, 200)
        const height = dummyWindow.fittingHeight(lines)

        return new Rectangle(x, y, width, height)
    }

    createCommandRect(){
        const alignX = Plugin.commandWindowParam().alignX
        const width = Plugin.commandWindowParam().width || this.autoMainCommandWidth()
        const height = Graphics.boxHeight - this.titleArea()
        const x = Eli.Utils.calculateScreenPosition(alignX, 0, width, "x", true)
        const y = this.titleArea()

        return new Rectangle(x, y, width, height)
    }

    createInfoWindowRect(){
        const alignX = Plugin.commandWindowParam().alignX === "left" ? "right" : "left"
        const width = this.calculateInfoWindowWidth()
        const height = Graphics.boxHeight - this.titleArea()
        const x = Eli.Utils.calculateScreenPosition(alignX, 0, width, "x", true)
        const y = this.titleArea()

        return new Rectangle(x, y, width, height)
    }

    autoMainCommandWidth(){
        const dummyWindow = new Window_Command(0, 0, 200, 200)
        const allCommands = Plugin.commandWindowParam().list
        const allNamesWidth = allCommands.map(item => Eli.Utils.getTextWidth(item.name, false))
        const largestName = Math.floor(Math.max(...allNamesWidth))

        return largestName + dummyWindow.standardPadding() * 2 + dummyWindow.textPadding() + dummyWindow.spacing()
    }

    titleArea(){
        return this.titleWindow.y + this.titleWindow.height
    }

    calculateInfoWindowWidth(){
        if(Plugin.commandWindowParam().alignX === "left"){
            return Graphics.boxWidth - (this.commandWindow.x + this.commandWindow.width)
        }else{
            return Graphics.boxWidth - this.commandWindow.width
        }
    }

}
    
class Window_ToastInfo extends Window_Base {

    constructor(rect){
        super(rect)
    }

    initialize(rect){
        super.initialize(rect)
        this.allTextHeight = 1000
        this.anime = anime({autoplay: false})
    }

    loadWindowskin() {
        const image = Plugin.toastWindowParam().skin
        if(image){
            this.windowskin = ImageManager.loadSystem(image)
        }else{
            super.loadWindowSkin()
        }
    }

    contentsHeight(){
        return this.allTextHeight
    }

    showInfo(settings){
        const {toastSettings, infoCommand} = settings
        const {toast, name} = infoCommand
        const rawText = toast
        const width = this.calculateWidth(rawText)
        const formatedText = rawText.replace(`INFO_COMMAND`, `${name}`)
        const [height, textHeight] = this.calculateHeight(rawText)
        const [targetX, targetY] = this.createTargetPosition(toastSettings, width, height)

        this.allTextHeight = textHeight

        this.setTargetPositions(targetX, targetY)

        if(toastSettings.frames > 0){
            this.setInitialPositions(toastSettings, width, height)
        }

        this.move(this.x, this.y, width, height)
        this.createContents()
        this.drawTextEx(formatedText, this.textPadding(), 0)

        this.anime = anime({
            targets: this,
            x: targetX,
            y: targetY,
            round: 1,
            easing: toastSettings.easing,
            duration: Eli.Date.framesToMiliSeconds(toastSettings.frames),
            autoplay: true,
            loop: 1,
            direction: "alternate",
            endDelay: Plugin.toastWindowParam().delay,
        })

    }

    calculateWidth(rawText){
        const dummyWindow = new Window_Dummy(0, 0, 5000, 5000)
        const texts = rawText.split("\n")
        let maxWidth = 0

        for(const text of texts){
            
            const nameWidth = dummyWindow.textWidthEx(text)
            maxWidth = nameWidth > maxWidth ? nameWidth : maxWidth
        }

        maxWidth += dummyWindow.standardPadding() * 2 + dummyWindow.textPadding()

        return maxWidth
    }

    calculateHeight(toastText){
        const lines = Math.max(toastText.split("\n").length, 1)
        const dummyWindow = new Window_Base(new Rectangle(0, 0, 5000, 5000))
        const textState = {text: toastText, index: 0}
        const textHeight = dummyWindow.calcTextHeight(textState, true)
        const height = Math.max(textHeight + this.padding*2, this.fittingHeight(lines))

        return [height, textHeight]
    }

    createInitialPositions(position, width, height){
        const {outsideX, outsideY} = position
        let x = this.x
        let y = this.y

        if(outsideX === "left"){
            x = -width
        }else if(outsideX === "right"){
            x = Graphics.width + width
        }

        if(outsideY === 'top'){
            y = -height
        }else if(outsideY === 'bottom'){
            y = Graphics.height + height
        }

        return [x, y]
    }

    setInitialPositions(position, width, height){
        const [initialX, initialY] = this.createInitialPositions(position, width, height)
        this.x = initialX
        this.y = initialY
    }

    createTargetPosition(position, width, height){
        const {alignX, alignY, offsetX, offsetY} = position
        let x = Eli.Utils.calculateScreenPosition(alignX, offsetX, width, "x")
        let y = Eli.Utils.calculateScreenPosition(alignY, offsetY, height, "y")
        // x = x.clamp(Eli.Utils.windowMargin, Graphics.width-Eli.Utils.windowMargin)
        // y = y.clamp(Eli.Utils.windowMargin, Graphics.height-Eli.Utils.windowMargin)

        return [x, y]
    }

    setTargetPositions(targetX, targetY){
        this.x = targetX
        this.y = targetY
    }

    isBusy(){
        return this.anime.began && !this.anime.completed
    }

    hasInfo(){
        return Plugin.infosToShow.length > 0
    }

    update(){
        super.update()

        if(SceneManager.isSceneChanging()){
            this.anime.remove(this)

        }else if(this.hasInfo() && !this.isBusy()){
            const info = Plugin.infosToShow.shift()
            this.showInfo(info)    
        }
    }

}

class Sprite_ScreenButtonInfo extends Sprite_Base {

    initialize(){
        super.initialize()
        this.createBitmap()
        this.maxWaitCount = 15
        this.waitCount = 0
    }

    createBitmap(){
        this.bitmap = ImageManager.loadSystem(Plugin.screenButtonParam().image)
        this.bitmap.addLoadListener(this.setPosition.bind(this))
    }

    setPosition(){
        const {alignX, alignY, offsetX, offsetY} = Plugin.screenButtonParam()
        const x = Eli.Utils.calculateScreenPosition(alignX, offsetX, 0, "x")
        const y = Eli.Utils.calculateScreenPosition(alignY, offsetY, 0, "y")
        this.setFrame(0, 0, this.bitmap.width, this.bitmap.height/2)
        this.x = x
        this.y = y
        this.refreshMainRect(false)
    }

    updateFrameOnClick(){
        this.setFrame(0, this.bitmap.height/2, this.bitmap.width, this.bitmap.height/2)
    }

    updateWaitCount(){
        this.waitCount++
        if(this.waitCount >= this.maxWaitCount){
            this.waitCount = 0
            this.visible = true
        }
    }

    isVisible(){
        return !Plugin.isInfoMenuDisabled() && !$gameMessage.isBusy() && !$gameMap.isEventRunning()
    }

    update(){
        if(this.isVisible() && !this.visible){
            this.updateWaitCount()
        }else{
            this.waitCount = 0
            this.visible = this.isVisible()
        }
    }

}

/* ------------------------------ PLUGIN OBJECT ----------------------------- */

Eli.InfoMenu = {

    version: 5.03,
    url: "https://hakuenstudio.itch.io/eli-info-menu-for-rpg-maker",
    parameters: {
        scene: {
            backgroundImage: '',
            keyboardKey: '',
            gamepadKey: '',
            overwrite: false,
            switch: 0,
        },
        titleWindow: {
            skin: '',
            backgroundImage: '',
            lines: 0,
            text: '',
            opacity: 255,
        },
        commandWindow: {
            skin: '',
            backgroundImage: '',
            useCategory: false,
            list: [{
                name: '', 
                icon: 0, 
                info: '', 
                enabled: false, 
                toast: '', 
                subList: [{
                        name: '', 
                        icon: 0, 
                        info: '', 
                        enabled: false, 
                        toast: ''
                }]
            }],
            alignX: '',
            width: 0,
            opacity: 255,
        },
        infoWindow: {
            skin: '',
            backgroundImage: '',
            alignX: '',
            scrollSpeed: 0,
            mouseScrollPower: 0,
            opacity: 0,
        },
        toastWindow: {
            skin: '',
            delay: 0,
            debug: false,
        },
        screenButton: {
            enable: false,
            image: '',
            alignX: '',
            offsetX: '',
            alignY: '',
            offsetY: '',
        },
        addOnMenu: true,
        menuCommandName: '',
    },
    button: "infoScene",
    alias: {},
    bitmapCache: {},
    infosToShow: [],
    currentCommandList: [],
    lastMainCommandExt: -1,
    Sprite_ScreenButtonInfo: Sprite_ScreenButtonInfo,
    Window_ToastInfo: Window_ToastInfo,
    Scene_MenuInfo: Scene_MenuInfo,
    Window_DescriptionInfo: Window_DescriptionInfo,
    Window_CommandInfo: Window_CommandInfo,
    Window_TitleInfo: Window_TitleInfo,

    initialize(){
        this.initParameters()
        this.initPluginCommands()
        this.setKeyboardButton()
        this.setGamepadButton()
        this.preloadWindowSkins()
        this.parameters.toastWindow.delay = Eli.Date.framesToMiliSeconds(this.parameters.toastWindow.delay)
    },

    initParameters(){
        const parameters = PluginManager.parameters("Eli_InfoMenuPro")
        this.parameters.scene = this.parseSceneParameters(parameters)
        this.parameters.titleWindow = this.parseTitleParameters(parameters)
        this.parameters.commandWindow = this.parseCommandParameters(parameters)
        this.parameters.infoWindow = this.parseInfoParameters(parameters)
        this.parameters.toastWindow = this.parseToastParameters(parameters)
        this.parameters.screenButton = this.parseScreenButtonParameters(parameters)
        this.parameters.addOnMenu = parameters.addOnMenu === "true"
        this.parameters.menuCommandName = parameters.menuCommandName
    },

    parseSceneParameters(parameters){
        const scene = JSON.parse(parameters.scene)
        scene.overwrite = scene.overwrite === "true"
        scene.switch = Number(scene.switch)

        return scene
    },

    parseTitleParameters(parameters){
        const title = JSON.parse(parameters.titleWindow)
        title.lines = Number(title.lines)
        title.opacity = Number(title.opacity)
        title.text = JSON.parse(title.text)

        return title
    },

    parseCommandParameters(parameters){
        const cmdWindow = JSON.parse(parameters.commandWindow)
        cmdWindow.opacity = Number(cmdWindow.opacity)
        cmdWindow.width = Number(cmdWindow.width)
        cmdWindow.useCategory = cmdWindow.useCategory === "true"
        cmdWindow.list = JSON.parse(cmdWindow.list)

        for(let i = 0; i < cmdWindow.list.length; i++){
            cmdWindow.list[i] = JSON.parse(cmdWindow.list[i])
            cmdWindow.list[i].enabled = cmdWindow.list[i].enabled === "true"
            cmdWindow.list[i].info = JSON.parse(cmdWindow.list[i].info)
            cmdWindow.list[i].toast = JSON.parse(cmdWindow.list[i].toast)
            cmdWindow.list[i].subList = JSON.parse(cmdWindow.list[i].subList)
        
            for(let j = 0; j < cmdWindow.list[i].subList.length; j++){
                cmdWindow.list[i].subList[j] = JSON.parse(cmdWindow.list[i].subList[j])
                cmdWindow.list[i].subList[j].info = JSON.parse(cmdWindow.list[i].subList[j].info)
                cmdWindow.list[i].subList[j].toast = JSON.parse(cmdWindow.list[i].subList[j].toast)
                cmdWindow.list[i].subList[j].enabled = cmdWindow.list[i].subList[j].enabled === "true"
            }
        }

        return cmdWindow
    },

    parseInfoParameters(parameters){
        const infoWindow = JSON.parse(parameters.infoWindow)
        infoWindow.opacity = Number(infoWindow.opacity)
        infoWindow.scrollSpeed = Number(infoWindow.scrollSpeed)
        infoWindow.mouseScrollPower = Number(infoWindow.mouseScrollPower)

        return infoWindow
    },

    parseToastParameters(parameters){
        const toastWindow = JSON.parse(parameters.toastWindow)
        toastWindow.delay = Eli.Date.framesToMilliSeconds(Number(toastWindow.delay))
        toastWindow.debug = toastWindow.debug === "true"

        return toastWindow
    },

    parseScreenButtonParameters(parameters){
        const screenButton = JSON.parse(parameters.screenButton)
        screenButton.enable = screenButton.enable === "true"
        screenButton.offsetX = Number(screenButton.offsetX)
        screenButton.offsetY = Number(screenButton.offsetY)
        
        return screenButton
    },

    initPluginCommands(){},

    setKeyboardButton(){
        const keyName = this.parameters.scene.keyboardKey.toLowerCase()
        const keyCode = Eli.KeyCodes.keyboard[keyName]

        if(this.parameters.scene.overwrite){
            Input.keyMapper[keyCode] = this.button

        }else if(!Eli.KeyCodes.isDefaultKeyboard(keyCode)){
            Input.keyMapper[keyCode] = this.button

        }else{
            this.button = Input.keyMapper[keyCode]
        }
    },

    setGamepadButton(){
        const keyName = this.parameters.scene.gamepadKey.toLowerCase()
        const keyCode = Eli.KeyCodes.gamepad[keyName]

        if(this.parameters.scene.overwrite){
            Input.gamepadMapper[keyCode] = this.button

        }else if(!Eli.KeyCodes.isDefaultGamepad(keyCode)){
            Input.gamepadMapper[keyCode] = this.button

        }else{
            this.button = Input.gamepadMapper[keyCode]
        }
    },

    preloadWindowSkins(){
        const skins = [
            this.commandWindowParam().skin, this.titleWindowParam().skin, 
            this.infoWindowParam().skin, this.toastWindowParam().skin
        ]
        skins.forEach(skin => ImageManager.loadSystem(skin))
    },

    isSceneInfo(){
        return SceneManager._scene instanceof Scene_MenuInfo
    },

    createBitmapFromText(folder, fileName){
        const key = `${folder},${fileName}`

        if(Plugin.bitmapCache.hasOwnProperty(key)){
            var bitmap = Plugin.bitmapCache[key]

        }else{
            var bitmap = Plugin.getBitmapFromDrawCode(folder, fileName)
            Plugin.bitmapCache[key] = bitmap
        }

        return bitmap
    },

    getBitmapFromDrawCode(folder, filename){
        const path = `img/${folder}/`
        const bitmap = ImageManager.loadBitmap(path, filename)

        return bitmap
    },

    registerTextImages(){
        const dummyWindow = new Window_DummyDescriptionInfo(new Rectangle(0, 0, 1000, 1000))
        
        for(const command of this.commandWindowParam().list){
            const text = command.info
            dummyWindow.drawTextEx(text, 0, 0)

            const subCommands = command.subList || []
            
            for(const subCommand of subCommands){
                const subText = subCommand.info
                dummyWindow.drawTextEx(subText, 0, 0)
            }
        }
    },

    param(){
        return this.parameters
    },

    sceneParam(){
        return this.parameters.scene
    },

    titleWindowParam(){
        return this.parameters.titleWindow
    },

    commandWindowParam(){
        return this.parameters.commandWindow
    },

    infoWindowParam(){
        return this.parameters.infoWindow
    },

    toastWindowParam(){
        return this.parameters.toastWindow
    },

    screenButtonParam(){
        return this.parameters.screenButton
    },

    findInfoMenuCommandIndex(index, index2) {
        if(isNaN(index)){
            index = this.commandWindowParam().list.findIndex(item => item.name === index)
        }
    
        if(index2 !== undefined && isNaN(index2)){
            const subList = this.commandWindowParam().list[index].subList
            index2 = subList.findIndex(item => item.name === index)
        }
    
        return [index, index2]
    },

    getData(){
        return $eliData.contents.infoMenu
    },

    isInfoReserved(item){
        return this.infosToShow.includes(item)
    },
    
    unlockNewInfo(toastSettings, showToast, index1, index2) {
        const [mainIndex, subIndex] = this.findInfoMenuCommandIndex(index1, index2)
        const infoCommand = Plugin.getInfoCommand(mainIndex, subIndex)
        const item = {toastSettings, infoCommand}

        if(this.param().toastWindow.debug && showToast && !this.isInfoReserved(item)){
            this.infosToShow.push(item)
    
        }else if(showToast && !this.isInfoMenuCommandAvaliable(mainIndex, subIndex)){
            this.infosToShow.push(item)
        }

        this.changeInfoSystemStatus(mainIndex, subIndex)

    },

    changeInfoSystemStatus(index, index2){
        if(index2 !== undefined){
            this.getData()[index].subs[index2] = true
        }else{
            this.getData()[index].main = true
        } 
    },
    
    isInfoMenuCommandAvaliable(index, index2) {
        const isMainAvaliable = this.getData()[index].main

        if(index2 !== undefined){
            return isMainAvaliable && this.getData()[index].subs[index2]
    
        }else{
            return isMainAvaliable
        }
    },

    cmd_unlockInfo(args){
        args.index = String(args.index)
        args.enableToast = String(args.enableToast).toLowerCase()
        const toastSettings = Eli.PluginManager.convertParameters(args.toastPosition)
        const index1 = Number(Eli.Utils.convertEscapeVariablesOnly(args.index))
        const index2 = args.index2 ? Number(Eli.Utils.convertEscapeVariablesOnly(String(args.index2))) : undefined

        this.unlockNewInfo(toastSettings, args.enableToast === "true", index1, index2)
    },

    getInfoCommand(index, index2){
        if(index2 !== undefined){
            return this.commandWindowParam().list[index].subList[index2]
        }else{
            return this.commandWindowParam().list[index]
        }
    },

    isInfoMenuDisabled(){
        const id = this.param().scene.switch
        return $gameSwitches.value(id)
    },

}

const Plugin = Eli.InfoMenu
const Alias = Eli.InfoMenu.alias

Plugin.initialize()

/* ------------------------------- SAVED DATA ------------------------------- */
{

Alias.Eli_SavedContents_initialize = Eli_SavedContents.prototype.initialize
Eli_SavedContents.prototype.initialize = function(){
    Alias.Eli_SavedContents_initialize.call(this)
    this.initInfoMenuData()
}

Eli_SavedContents.prototype.initInfoMenuData = function(){
    const pluginName = "infoMenu"
    const infoSystem = []

    for(const command of Plugin.commandWindowParam().list){
        const obj = {main: command.enabled, subs: []}

        for(const subCommand of command.subList){
            obj.subs.push(subCommand.enabled)
        }

        infoSystem.push(obj)
    }

    this.contents[pluginName] = infoSystem
}

}

/* -------------------------------- SCENE MAP ------------------------------- */
{

Alias.Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows
Scene_Map.prototype.createAllWindows = function() {
    Alias.Scene_Map_createAllWindows.call(this)
    this.createToastInfoWindow()
}

Alias.Scene_Map_createButtons = Scene_Map.prototype.createButtons
Scene_Map.prototype.createButtons = function() {
    Alias.Scene_Map_createButtons.call(this)
    this.createInfoMenuScreenButton()
}

Alias.Scene_Map_start = Scene_Map.prototype.start
Scene_Map.prototype.start = function() {
    Alias.Scene_Map_start.call(this)
    this.infoMenuCalling = false
}

Alias.Scene_Map_isMapTouchOk = Scene_Map.prototype.isMapTouchOk;
Scene_Map.prototype.isMapTouchOk = function() {
    const alias = Alias.Scene_Map_isMapTouchOk.call(this)
    return alias && !this.isInfoButtonPressed()
}

Alias.Scene_Map_updateScene = Scene_Map.prototype.updateScene
Scene_Map.prototype.updateScene = function() {
    Alias.Scene_Map_updateScene.call(this)
    if (!SceneManager.isSceneChanging()) {
        this.updateCallInfoMenu()
        this.updateInfoScreenButton()
    }
}

Alias.Scene_Map_terminate = Scene_Map.prototype.terminate
Scene_Map.prototype.terminate = function() {
    this.hideInfoButton()
    Alias.Scene_Map_terminate.call(this)
}

Scene_Map.prototype.createInfoMenuScreenButton = function(){
    if(!Plugin.screenButtonParam().enable) return
    this.infoScreenButton = new Sprite_ScreenButtonInfo()
    this.addChild(this.infoScreenButton) 
}

Scene_Map.prototype.updateCallInfoMenu = function() {
    if (this.isInfoMenuEnabled()) {
        if (this.isInfoMenuCalled()) {
            this.infoMenuCalling = true
        }
        if (this.infoMenuCalling && !$gamePlayer.isMoving()) {
            this.callInfoMenu()
        }
    } else {
        this.infoMenuCalling = false
    }
}

Scene_Map.prototype.updateInfoScreenButton = function() {
    if(this.isInfoButtonPressed()){
        this.infoScreenButton.updateFrameOnClick()
        this.callInfoMenu()
    }
}

Scene_Map.prototype.isInfoMenuCalled = function() {
    return Input.isTriggered(Plugin.button) || this.isInfoButtonPressed()
}

Scene_Map.prototype.callInfoMenu = function() {
    SoundManager.playOk()
    SceneManager.push(Scene_MenuInfo)
    $gameTemp.clearDestination()
    this._mapNameWindow.hide()
    this._waitCount = 2
}

Scene_Map.prototype.isInfoMenuEnabled = function() {
    return !Plugin.isInfoMenuDisabled() && !$gameMap.isEventRunning()
}

Scene_Map.prototype.isInfoButtonPressed = function(){
    return  this.infoScreenButton && this.infoScreenButton.isMainRectClicked() && 
            !$gameMap.isEventRunning()
}

Scene_Map.prototype.hideInfoButton = function() {
    if (this.infoScreenButton) {
        this.infoScreenButton.hide()
    }
}

Scene_Map.prototype.createToastInfoWindow = function() {
    this.toastInfoWindow = new Window_ToastInfo(new Rectangle(-1000, -1000, 200, 2))
    this.addChild(this.toastInfoWindow)
}

}

/* ------------------------------- SCENE MENU ------------------------------- */
{

Alias.Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow
Scene_Menu.prototype.createCommandWindow = function() {
    Alias.Scene_Menu_createCommandWindow.call(this)
    this._commandWindow.setHandler('infoMenu', this.commandInfoMenu.bind(this))
}

Scene_Menu.prototype.commandInfoMenu = function() {
    SceneManager.push(Plugin.Scene_MenuInfo)
}

}

/* --------------------------- WINDOW MENU COMMAND -------------------------- */
{

Alias.Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands
Window_MenuCommand.prototype.addOriginalCommands = function() {
    Alias.Window_MenuCommand_addOriginalCommands.call(this)
    this.addInfoMenuCommand()
}

Window_MenuCommand.prototype.addInfoMenuCommand = function() {
    if(Plugin.param().addOnMenu){
        this.addCommand(Plugin.param().menuCommandName, 'infoMenu', true)
    }
}

}

}