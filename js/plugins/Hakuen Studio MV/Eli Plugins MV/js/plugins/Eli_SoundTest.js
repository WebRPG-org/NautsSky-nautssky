//============================================================================
// Eli_SoundTest.js
//============================================================================

/*:
@plugindesc ♦1.0.0♦ Adds a Sound Test menu to your game!
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
Features
==============================================================================

● Add a Sound Test Scene to the game.
● Call the Sound Test through the plugin command, menu or title screen!
● Plugin commands to unlock audios.
● Audios divided by Category (BGM | BGS | ME | SE) and subcategories!
● Unlock all audios with one single command and restore them too!
● Automatically unlock audios when the player hears them in game.
● Data is saved across save files!

==============================================================================
How to use
==============================================================================

♦ Plugin Parameters ♦

The Sound Test scene has 4 main categories which are BGM | BGS | ME | SE.
You must create a sub-category for each of these main categories.
In those subcategories, you can add as many audio files as you want.
All default system sounds, like a cursor, cancel, etc are disabled on this 
scene.

The game, by default, will automatically unlock audio when the player hears 
them.

♦ Debug Mode ♦

Since you can call the sound test from the title screen, the data is 
saved globally, which means, regardless of the saved file.
Your main concern will be that you need to add in the plugin parameters 
all your audio files before deploying your game. 

Because since the data is saved globally, you cannot add new data into the 
plugin parameter or change the existing ones, because it will mess with 
the global saved data.

Unless you go into the save folder and delete the file "config.rpgsave".
Because of that, the plugin has a debug parameter that when ON, will only 
simulate that it is saving the data. But every time you start a game, it 
will reset this data.

The Debug parameter also only works for playtesting.

♦ Plugin Commands ♦

SoundTest Open → Will open the Sound Test Scene

• SoundTest Unlock All [TYPE] → This will unlock all sounds of the 
inserted type.
Replace TYPE with one of the following: Bgm, Bgs, Me, Se, Sound.
(Sound will unlock all types)

• SoundTest Restore [TYPE] → Same as above, but it will restore the sounds
(that was not previously unlocked by the player when he hears them).

• SoundTest Unlock [TYPE] [FILENAME] [FILENAME]... → This one will unlock 
specific sound files.
Replace TYPE with one of the following: Bgm, Bgs, Me, Se.
Replace FILENAME with one the filename of the sound you want to unlock.

============================================================================
Update Log
============================================================================

https://tinyurl.com/soundTestLog

============================================================================

@param titleScreen
@text Title Command
@type struct<titleScreenSt>
@desc Settings for the sound test on the title screen.
@default {"enable":"true","text":"Sound Test","position":"-1"}

@param menuCommand
@text Menu Command
@type struct<menuCommandSt>
@desc Settings for the sound test on the menu scene.
@default {"enable":"true","text":"Sound Test","position":"-1"}

@param separator1
@text -- Sound Test Scene --

@param backgroundImage
@text Background Image
@type file
@dir img
@desc A image to be set as background for the scene.
@default

@param titleWindow
@text Title Window
@type struct<titleWindowSt>
@desc Settings for the title window(the one at the top of the scene).
@default {"text":"Sound Test","icon":"80","backType":"Window","winSkin":""}

@param mainCategoryWindow
@text Main Category Window
@type struct<mainCategoryWindowSt>
@desc Settings for the Main Category window(Below the Title Window).
@default {"backType":"Window","winSkin":"","textAlignment":"center"}

@param subCategoryWindow
@text Sub Category Window
@type struct<subCategoryWindowSt>
@desc Settings for the Sub Category window(Below the Main Category Window, left side of the screen).
@default {"lines":"7","columns":"1","width":"Graphics.width/3","backType":"Window","sortAlphabetically":"true","textAlignment":"center","winSkin":""}

@param soundListWindow
@text Sound List Window
@type struct<soundListWindowSt>
@desc Settings for the Sound List window(Below the Main Category Window, right side of the screen).
@default {"lines":"7","columns":"2","backType":"Window","sortAlphabetically":"true","textAlignment":"center","hiddenText":"? ? ? ?","hiddenDescription":"\"This audio hasn't been unlocked yet.\"","winSkin":""}

@param helpWindow
@text Help Window
@type struct<helpWindowSt>
@desc Settings for the Help window(Below the Sub Category and Sound List Window).
@default {"backType":"Window","lines":"7","winSkin":""}

@param playWindow
@text Play Window
@type struct<playWindowSt>
@desc Settings for the "now playing" window(the one at the bottom of the scene).
@default {"text":"Now Playing: ","icon":"80","backType":"Window","winSkin":""}

@param separator2
@text -- Sound Settings --

@param debug
@text Debug Mode
@type boolean
@desc See help file for details.
@default true

@param unlock
@text Unlock Settings
@type struct<unlockSt>
@desc Settings for unlock audios by default.
@default {"all":"false","bgm":"false","bgs":"false","me":"false","se":"false"}

@param bgm
@text BGM
@type struct<mainCategorySt>
@desc The BGM settings for the sound test scene.
@default {"enable":"true","name":"Bgm","description":"\"The Background Music of this game.\"","subCategory":"[\"{\\\"name\\\":\\\"Dummy\\\",\\\"description\\\":\\\"\\\\\\\"Example Description\\\\\\\"\\\",\\\"sounds\\\":\\\"[\\\\\\\"{\\\\\\\\\\\\\\\"filename\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"bgm\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"volume\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"pitch\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"pan\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"name\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"Any Audio\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"description\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Any Description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"}\\\\\\\"]\\\"}\"]"}

@param bgs
@text BGS
@type struct<mainCategorySt>
@desc The BGS settings for the sound test scene.
@default {"enable":"true","name":"Bgs","description":"\"The Background sounds of this game.\"","subCategory":"[\"{\\\"name\\\":\\\"Dummy\\\",\\\"description\\\":\\\"\\\\\\\"Example description\\\\\\\"\\\",\\\"sounds\\\":\\\"[\\\\\\\"{\\\\\\\\\\\\\\\"filename\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"bgs\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"volume\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"pitch\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"pan\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"name\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"Any Audio\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"description\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Any Description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"}\\\\\\\"]\\\"}\"]"}

@param me
@text ME
@type struct<mainCategorySt>
@desc The ME settings for the sound test scene.
@default {"enable":"true","name":"ME","description":"\"The Music Effects of this game.\"","subCategory":"[\"{\\\"name\\\":\\\"Dummy\\\",\\\"description\\\":\\\"\\\\\\\"Example Description\\\\\\\"\\\",\\\"sounds\\\":\\\"[\\\\\\\"{\\\\\\\\\\\\\\\"filename\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"me\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"volume\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"pitch\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"pan\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"name\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"Any Audio\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"description\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Any Description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"}\\\\\\\"]\\\"}\"]"}

@param se
@text SE
@type struct<mainCategorySt>
@desc The SE settings for the sound test scene.
@default {"enable":"true","name":"SE","description":"\"The Sound Effects of this game.\"","subCategory":"[\"{\\\"name\\\":\\\"Dummy\\\",\\\"description\\\":\\\"\\\\\\\"Example Description\\\\\\\"\\\",\\\"sounds\\\":\\\"[\\\\\\\"{\\\\\\\\\\\\\\\"filename\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"se\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"volume\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"pitch\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"pan\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"name\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"Any Audio\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"description\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Any Description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"}\\\\\\\"]\\\"}\"]"}

@param fadeOut
@text Fade Out Duration
@type text
@desc The fade out duration(seconds) of the BGM/BGS when enter the Sound Test menu.
@default 1

@param fadeIn
@text Fade In Duration
@type text
@desc The fade in duration(seconds) of the BGM/BGS when leaving the Sound Test menu.
@default 2

/* ------------------------------ TITLE SCREEN ------------------------------ */
{

/*~struct~titleScreenSt:

@param enable
@text Enable Command
@type boolean
@desc If true, the plugin will add the Sound Test command into the title screen.
@default true

@param text
@text Command Name
@type text
@desc The command name on the title screen
@default Sound Test

@param position
@text Command Position
@type text
@desc The position of this command on the title command window. Set -1 to default.
@default 3

*/

}

/* ------------------------------ MENU COMMAND ------------------------------ */
{

/*~struct~menuCommandSt:

@param enable
@text Enable Command
@type boolean
@desc If true, the plugin will add the Sound Test command into the menu scene.
@default true

@param text
@text Command Name
@type text
@desc The command name on the menu scene
@default Sound Test

@param position
@text Command Position
@type text
@desc The position of this command on the menu command window. Set -1 to default.
@default -1

*/

}

/* ------------------------------ TITLE WINDOW ------------------------------ */
{

/*~struct~titleWindowSt:

@param text
@text Text
@type text
@desc The text displayed on the window.
@default Sound Test

@param icon
@text Icon
@type text
@desc The icon index to draw before the text
@default 80

@param backType
@text Background Type
@type select
@option Window
@option Transparent
@option Dim
@desc The icon index to draw before the text
@default Window

@param winSkin
@text Window Skin
@type file
@dir img/system
@desc The window skin file.
@default

*/

}

/* -------------------------- MAIN CATEGORY WINDOW -------------------------- */
{

/*~struct~mainCategoryWindowSt:

@param backType
@text Background Type
@type select
@option Window
@option Transparent
@option Dim
@option Strong Dim
@option Light Gradient Vertical
@option Light Gradient Horizontal
@desc The icon index to draw before the text
@default Window

@param winSkin
@text Window Skin
@type file
@dir img/system
@desc The window skin file.
@default

@param textAlignment
@text Text Alignment
@type select
@option left
@option center
@option right
@desc The text alignment of the commands.
@default center

*/

}

/* --------------------------- SUB CATEGORY WINDOW -------------------------- */
{

/*~struct~subCategoryWindowSt:

@param lines
@text Max Visible Lines
@type text
@desc The maximum amount of lines the window will show. Defines the height of the window too.
@default 7

@param columns
@text Columns
@type text
@desc The amount of columns the window will have
@default 1

@param width
@text Width
@type text
@desc The width of the window.
@default Graphics.boxWidth/3

@param backType
@text Background Type
@type select
@option Window
@option Transparent
@option Dim
@option Strong Dim
@option Light Gradient Vertical
@option Light Gradient Horizontal
@desc The icon index to draw before the text
@default Window

@param sortAlphabetically
@text Sort Alphabetically
@type boolean
@desc If true, the plugin will sort the subcategories and audio list alphabetically.
@default true

@param textAlignment
@text Text Alignment
@type select
@option left
@option center
@option right
@desc The text alignment of the commands.
@default center

@param winSkin
@text Window Skin
@type file
@dir img/system
@desc The window skin file.
@default

*/

}

/* ---------------------------- SOUND LIST WINDOW --------------------------- */
{

/*~struct~soundListWindowSt:

@param lines
@text Max Visible Lines
@type text
@desc The maximum amount of lines the window will show. Defines the height of the window too.
@default 7

@param columns
@text Columns
@type text
@desc The amount of columns the window will have
@default 1

@param backType
@text Background Type
@type select
@option Window
@option Transparent
@option Dim
@option Strong Dim
@option Light Gradient Vertical
@option Light Gradient Horizontal
@desc The icon index to draw before the text
@default Window

@param sortAlphabetically
@text Sort Alphabetically
@type boolean
@desc If true, the plugin will sort the subcategories and audio list alphabetically.
@default true

@param textAlignment
@text Text Alignment
@type select
@option left
@option center
@option right
@desc The text alignment of the commands.
@default center

@param hiddenText
@text Hidden Text
@type text
@desc Text to show when audio is locked.
@default ? ? ? ?

@param hiddenDescription
@text Hidden Description
@type note
@desc The description to show when audio is locked.
@default This audio hasn't been unlocked yet.

@param winSkin
@text Window Skin
@type file
@dir img/system
@desc The window skin file.
@default

*/

}

/* ------------------------------- HELP WINDOW ------------------------------ */
{

/*~struct~helpWindowSt:

@param backType
@text Background Type
@type select
@option Window
@option Transparent
@option Dim
@desc The icon index to draw before the text
@default Window

@param lines
@text Max Visible Lines
@type text
@desc The maximum amount of lines the window will show. Defines the height of the window too.
@default 2

@param winSkin
@text Window Skin
@type file
@dir img/system
@desc The window skin file.
@default

*/

}

/* ----------------------------- PLAYING WINDOW ----------------------------- */
{

/*~struct~playWindowSt:

@param text
@text Text
@type text
@desc The text displayed before the name of the audio.
@default Now Playing: 

@param icon
@text Icon
@type text
@desc The icon index to draw before the text
@default 80

@param backType
@text Background Type
@type select
@option Window
@option Transparent
@option Dim
@desc The icon index to draw before the text
@default Window

@param winSkin
@text Window Skin
@type file
@dir img/system
@desc The window skin file.
@default

*/

}

/* ----------------------------- UNLOCK SETTINGS ---------------------------- */
{

/*~struct~unlockSt:

@param all
@text All
@type boolean
@desc If true, the plugin will unlock all audio file types.
@default false

@param bgm
@text BGM
@type boolean
@desc If true, the plugin will unlock bgm audio file types.
@default false

@param bgs
@text BGS
@type boolean
@desc If true, the plugin will unlock bgs audio file types.
@default false

@param me
@text ME
@type boolean
@desc If true, the plugin will unlock me audio file types.
@default false

@param se
@text SE
@type boolean
@desc If true, the plugin will unlock se audio file types.
@default false

*/

}

/* ------------------------------ MAIN CATEGORY ----------------------------- */
{

/*~struct~mainCategorySt:

@param enable
@text Enable
@type boolean
@desc Set to true if you want to show this category.
@default true

@param name
@text Display Name
@type text
@desc The name displayed in the menu for this category.
@default BGM

@param description
@text Description
@type note
@desc The description on the help window for this category.
@default

@param subCategory
@text SubCategory
@type struct<subCategorySt>[]
@desc The subcategories of this main category.
@default []

*/

}

/* ------------------------------ SUB CATEGORY ------------------------------ */
{

/*~struct~subCategorySt:

@param name
@text Display Name
@type text
@desc The display name of this subcategory.
@default ""

@param description
@text Description
@type note
@desc The description of this subcategory.
@default

@param sounds
@text Sounds
@type struct<soundsSt>[]
@desc The audio files that belong to this subcategory.
@default []

*/

}

/* ------------------------------- AUDIO FILES ------------------------------ */
{

/*~struct~soundsSt:

@param filename
@text Filename
@type file
@dir audio
@desc The audio file.
@default ""

@param volume
@text Volume
@type number
@min 0
@max 100
@desc The default volume for this audio file.
@default 100

@param pitch
@text Pitch
@type number
@min 50
@max 150
@desc The default pitch for this audio file.
@default 100

@param pan
@text Pan
@type number
@min -100
@max 100
@desc The default pan for this audio file.
@default 0

@param name
@text Display Name
@type text
@desc The display name of this audio file.
@default ""

@param description
@text Description
@type note
@desc The description of this audio file.
@default

*/

}

/* TO DO

    PLUGIN PARAMETER TO REMOVE SUB CATEGORY(OPTIONALLY)
    COUNT THE AUDIO TIME GOING ON

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_SoundTest = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

const BACK_TYPE = {
    "Window": 0,
    "Transparent": 1,
    "Dim": 2,
    "Strong Dim": 3,
    "Light Gradient Vertical": 4,
    "Light Gradient Horizontal": 5,
}

class Window_SoundSceneTitle extends Window_Base{

    initialize(x, y, width, height){
        super.initialize(x, y, width, height)
        this.setBackgroundType(BACK_TYPE[Plugin.param().titleWindow.backType])
        this.drawTitle()
    }

    drawTitle(){
        const icon = `\x1bi[${Plugin.param().titleWindow.icon}]`
        const text = `${icon}${Plugin.param().titleWindow.text}`
        const maxWidth = this.contentsWidth()
        const textWidth = this.textWidth(text) + 32
        const x = (maxWidth/2) - (textWidth/2)

        this.drawTextEx(text, x, 0)
    }

    loadWindowskin(){
        const customSkin = Plugin.param().titleWindow.winSkin
        if(customSkin){
            this.windowskin = ImageManager.loadSystem(customSkin)
        }else{
            super.loadWindowskin()
        }
    }

}

class Window_SoundMainCategory extends Window_HorzCommand{

    initialize(x, y){
        this.setMaxCategories()
        super.initialize(x, y)
        this.setBackgroundType(BACK_TYPE[Plugin.param().mainCategoryWindow.backType])
        this.currentAlign = "center"
    }

    setDefaultTextAlignment(){
        this.currentAlign = Plugin.param().mainCategoryWindow.textAlignment
    }

    itemTextAlign(){
        if(Imported.Eli_MessageActions){
            return this.currentAlign
        }else{
            return Plugin.param().mainCategoryWindow.textAlignment
        }
    }

    setMaxCategories(){
        const {bgm, bgs, me, se} = Plugin.param()
        this.maxCategories = [bgm.enable, bgs.enable, me.enable, se.enable].filter(item => item).length
    }

    maxCols(){
        return this.maxCategories
    }

    loadWindowskin(){
        const customSkin = Plugin.param().mainCategoryWindow.winSkin
        if(customSkin){
            this.windowskin = ImageManager.loadSystem(customSkin)
        }else{
            super.loadWindowskin()
        }
    }

    makeCommandList() {
        if(Plugin.param().bgm.enable){
            this.addCommand(Plugin.param().bgm.name, 'bgm')
        }
        if(Plugin.param().bgs.enable){
            this.addCommand(Plugin.param().bgs.name, 'bgs')
        }
        if(Plugin.param().me.enable){
            this.addCommand(Plugin.param().me.name, 'me')
        }
        if(Plugin.param().se.enable){
            this.addCommand(Plugin.param().se.name, 'se')
        }
    }

    windowWidth(){
        return Graphics.boxWidth
    }

    windowHeight(){
        return this.fittingHeight(1)
    }

    select(index){
        super.select(index)
        if(this.index() > -1 && Plugin.getSubCategoryWindow()){
            Plugin.mainCategory = this.currentSymbol() || Plugin.mainCategory
            Plugin.getSubCategoryWindow().refresh()
        }
    }

    updateHelp() {
        super.updateHelp()
        Plugin.mainCategory = this.currentSymbol() || Plugin.mainCategory
        const text = Plugin.param()[Plugin.mainCategory].description
        this._helpWindow.setText(text)  
    }
}

class Window_SoundSubCategory extends Window_Command {

    initialize(x, y){
        this.winWidth = this.windowWidth()
        super.initialize(x, y)
        this.setBackgroundType(BACK_TYPE[Plugin.param().subCategoryWindow.backType])
        this.deactivate()
    }

    setDefaultTextAlignment(){
        this.currentAlign = Plugin.param().subCategoryWindow.textAlignment
    }

    itemTextAlign(){
        if(Imported.Eli_MessageActions){
            return this.currentAlign
        }else{
            return Plugin.param().subCategoryWindow.textAlignment
        }
    }

    loadWindowskin(){
        const customSkin = Plugin.param().subCategoryWindow.winSkin
        if(customSkin){
            this.windowskin = ImageManager.loadSystem(customSkin)
        }else{
            super.loadWindowskin()
        }
    }

    makeCommandList() {
        const subList = Plugin.getSubCategoryList()

        for(let i = 0; i < subList.length; i++){
            const subCategory = subList[i]
            this.addCommand(subCategory.name, i)
        }

        this.sortList()
    }

    isOkEnabled(){
        return Plugin.getSubCategoryList()[Plugin.subCategory].sounds.length > 0
    }

    sortList(){
        if(Plugin.param().subCategoryWindow.sortAlphabetically){
            this._list.sort((a, b) => a.name.localeCompare(b.name))
        }
    }

    select(index){
        super.select(index)
        if(this.index() > -1 && Plugin.getSoundListWindow()){
            Plugin.subCategory = isNaN(this.currentSymbol()) ?  Plugin.subCategory : this.currentSymbol()
            Plugin.getSoundListWindow().refresh()
        }
    }

    updateHelp() {
        super.updateHelp()
        Plugin.subCategory = isNaN(this.currentSymbol()) ?  Plugin.subCategory : this.currentSymbol()
        const text = Plugin.getCurrentSubCategory().description
        this._helpWindow.setText(text)  
    }

    windowWidth(){
        const calcWidth = new Function(`return ${Plugin.param().subCategoryWindow.width}`).bind(SceneManager._scene)
        const width = calcWidth()
        return this.winWidth || width
    }

    windowHeight(){
        return this.fittingHeight(Plugin.param().subCategoryWindow.lines)
    }

    maxCols(){
        return Plugin.param().subCategoryWindow.columns
    }

    _updateCursor() {
        super._updateCursor()
        const isSoundWinActive = Plugin.getSoundListWindow() && Plugin.getSoundListWindow().active
        this._windowCursorSprite.visible = this.isOpenAndActive() || isSoundWinActive
    }

}

class Window_SoundList extends Window_Command {

    initialize(x, y){
        super.initialize(x, y)
        this.setBackgroundType(BACK_TYPE[Plugin.param().soundListWindow.backType])
        this.deactivate()
    }

    setDefaultTextAlignment(){
        this.currentAlign = Plugin.param().soundListWindow.textAlignment
    }

    itemTextAlign(){
        if(Imported.Eli_MessageActions){
            return this.currentAlign
        }else{
            return Plugin.param().soundListWindow.textAlignment
        }
    }

    loadWindowskin(){
        const customSkin = Plugin.param().soundListWindow.winSkin
        if(customSkin){
            this.windowskin = ImageManager.loadSystem(customSkin)
        }else{
            super.loadWindowskin()
        }
    }

    makeCommandList(){
        if(Plugin.getMainCategoryWindow().active) return
        const soundList = Plugin.getSoundList()

        for(let i = 0; i < soundList.length; i++){
            const sound = soundList[i]
            this.addCommand(sound.name, i)
        }

        this.sortList()
    }

    sortList(){
        if(Plugin.param().soundListWindow.sortAlphabetically){
            this._list.sort((a, b) => a.name.localeCompare(b.name))
        }
    }

    windowWidth(){
        return Graphics.boxWidth - Plugin.getSubCategoryWindow().width
    }

    windowHeight(){
        return this.fittingHeight(Plugin.param().soundListWindow.lines)
    }

    isCursorVisible() {
        return super.isCursorVisible() && this.active
    }

    maxCols(){
        return Plugin.param().soundListWindow.columns
    }

    processCancel() {
        if(Plugin.isAudioPlaying()) {
            this.updateInputData()
            this.callCancelHandler()
        }else{
            super.processCancel()
        }
    }

    isCommandEnabled(index) {
        const category = ConfigManager.soundTest[Plugin.mainCategory]
        const savedData = category ? category[Plugin.subCategory] : ConfigManager.soundTest["bgm"][Plugin.subCategory]
        const realIndex = this._list[index].symbol

        return  (Plugin.unlockModes[Plugin.mainCategory] || 
                Plugin.param().unlock[Plugin.mainCategory]) || 
                (super.isCommandEnabled(index) && savedData[realIndex])
    }

    commandName(index) {
        if(this.isCommandEnabled(index)){
            return super.commandName(index)
        }else{
            return Plugin.param().soundListWindow.hiddenText
        }
    }

    updateHelp() {
        super.updateHelp()
        
        if(this.isCommandEnabled(this.index())){
            const soundIndex = Math.max(0, this.currentSymbol())
            var text = Plugin.getSoundList()[soundIndex].description
        }else{
            var text = Plugin.param().soundListWindow.hiddenDescription
        }
        
        this._helpWindow.setText(text)  
    }

    _updateCursor() {
        super._updateCursor()
        this._windowCursorSprite.visible = this.isOpenAndActive()
    }

}

class Window_SoundPlaying extends Window_Help {

    initialize(numLines) {
        const width = Graphics.boxWidth
        const height = this.windowHeight()
        Window_Base.prototype.initialize.call(this, 0, 0, width, height)
        this.setBackgroundType(BACK_TYPE[Plugin.param().playWindow.backType])
        this._text = ''
    }

    refresh() {
        this.contents.clear()
        const text = this._text
        const maxWidth = this.contentsWidth()
        const textWidth = this.textWidth(text)
        const x = (maxWidth/2) - (textWidth/2)
        const y = this.calculateTextY(text)

        this.drawTextEx(text, x, y)
    }

    calculateTextY(text){
        const textState = { text: Eli.Utils.convertEscapeCharacters(text.substring(0)), index: 0}
        const height = this.calcTextHeight(textState)
        const y = this.contentsHeight()/2 - height/2

        return y
    }

    windowHeight(){
        const helpWindow = SceneManager._scene.helpWindow

        return Graphics.boxHeight - (helpWindow.y + helpWindow.height)
    }

}

class Window_SoundHelp extends Window_Help {

    initialize(numLines){
        super.initialize(numLines)
        this.setBackgroundType(BACK_TYPE[Plugin.param().helpWindow.backType])
    }

}

class Scene_SoundTest extends Scene_MenuBase {

    create(){
        super.create()
        this.createTitleWindow()
        this.createMainCategoryWindow()
        this.createSubCategoryWindow()
        this.createSoundListWindow()
        this.createHelpWindow()
        this.createPlayWindow()
        this.associateWindows()
        this.setHandlers()
    }

    start(){
        super.start()
        this.mainCategoryWindow.refresh()
        this.subCategoryWindow.refresh()
        this.soundListWindow.refresh()
    }

    createBackground(){
        super.createBackground()
        this.createBackgroundImage()
    }

    createBackgroundImage(){
        const [folder, file] = Plugin.param().backgroundImage

        if(file){
            this.backgroundImage = new Sprite()
            this.backgroundImage.bitmap = ImageManager.loadBitmap(folder, file)
            this.addChild(this.backgroundImage)
        }
    }

    createTitleWindow(){
        const {x, y, width, height} = this.titleWindowRect()
        this.titleWindow = new Window_SoundSceneTitle(x, y, width, height)
        this.addWindow(this.titleWindow)
    }

    titleWindowRect(){
        const x = 0
        const y = 0
        const width = Graphics.boxWidth
        const dummyWindow = new Window_Base(200, 200, 200, 200)
        const height = dummyWindow.fittingHeight(1)

        return new Rectangle(x, y, width, height)
    }

    createMainCategoryWindow(){
        const {x, y, width, height} = this.mainCategoryWindowRect()
        this.mainCategoryWindow = new Window_SoundMainCategory(x, y, width, height)
        this.addWindow(this.mainCategoryWindow)
    }

    mainCategoryWindowRect(){
        const x = 0
        const y = this.titleWindowRect().bottom
        const width = Graphics.boxWidth
        const dummyWindow = new Window_Base(200, 200, 200, 200)
        const height = dummyWindow.fittingHeight(1)

        return new Rectangle(x, y, width, height)
    }

    createSubCategoryWindow(){
        const {x, y, width, height} = this.subCategoryWindowRect()
        this.subCategoryWindow = new Window_SoundSubCategory(x, y, width, height)
        this.addWindow(this.subCategoryWindow)
    }

    subCategoryWindowRect(){
        const x = 0
        const y = this.mainCategoryWindowRect().bottom
        const calcWidth = new Function(`return ${Plugin.param().subCategoryWindow.width}`).bind(this)
        const width = calcWidth()
        const dummyWindow = new Window_Base(200, 200, 200, 200)
        const height = dummyWindow.fittingHeight(Plugin.param().subCategoryWindow.lines)

        return new Rectangle(x, y, width, height)
    }

    createSoundListWindow(){
        const {x, y, width, height} = this.soundListWindowRect()
        this.soundListWindow = new Window_SoundList(x, y, width, height)
        this.addWindow(this.soundListWindow)
    }

    soundListWindowRect(){
        const x = this.subCategoryWindow.x + this.subCategoryWindow.width
        const y = this.mainCategoryWindow.y + this.mainCategoryWindow.height
        const width = Graphics.boxWidth - this.subCategoryWindow.width
        const height = this.subCategoryWindow.height

        return new Rectangle(x, y, width, height)
    }

    createHelpWindow() {
        const {x, y, width, height} = this.helpWindowRect()
        this.helpWindow = new Window_SoundHelp(2)
        this.helpWindow.y = y
        this.addWindow(this.helpWindow)
    }

    helpWindowRect(){
        const x = 0
        const y = this.subCategoryWindow.y + this.subCategoryWindow.height
        const width = Graphics.boxWidth
        const dummyWindow = new Window_Base(200, 200, 200, 200)
        const height = dummyWindow.fittingHeight(Plugin.param().helpWindow.lines)

        return new Rectangle(x, y, width, height)
    }

    createPlayWindow(){
        const {x, y, width, height} = this.playWindowRect()
        this.playWindow = new Window_SoundPlaying(1)
        this.playWindow.y = y
        this.addWindow(this.playWindow)
    }

    playWindowRect(){
        const helpWindow = this.helpWindow
        const x = 0
        const y = helpWindow.y + helpWindow.height
        const width = Graphics.boxWidth
        const height = Graphics.boxHeight - (helpWindow.y + helpWindow.height)

        return new Rectangle(x, y, width, height)
    }

    associateWindows(){
        this.soundListWindow.setHelpWindow(this.helpWindow)
        this.subCategoryWindow.setHelpWindow(this.helpWindow)
        this.mainCategoryWindow.setHelpWindow(this.helpWindow)
    }

    setHandlers(){
        this.mainCategoryWindow.setHandler("ok", this.onMainCategoryOk.bind(this))
        this.mainCategoryWindow.setHandler("cancel", this.onMainCategoryCancel.bind(this))
        this.subCategoryWindow.setHandler("ok", this.onSubCategoryOk.bind(this))
        this.subCategoryWindow.setHandler("cancel", this.onSubCategoryCancel.bind(this))
        this.soundListWindow.setHandler("ok", this.onSoundListOk.bind(this))
        this.soundListWindow.setHandler("cancel", this.onSoundListCancel.bind(this))
    }

    onMainCategoryOk(){
        this.subCategoryWindow.activate()
    }

    onMainCategoryCancel(){
        Plugin.quitSoundTest()
    }

    onSubCategoryOk(){
        this.soundListWindow.activate()
    }

    onSubCategoryCancel(){
        this.mainCategoryWindow.activate()
        this.subCategoryWindow.select(0)
        this.soundListWindow.select(0)
        this.soundListWindow.refresh()
        Plugin.subCategory = 0
    }

    onSoundListOk(){
        if(this.canPlayAudio()){
            this.playAudio()
        }
        this.soundListWindow.activate()
    }

    canPlayAudio(){
        const index = this.soundListWindow.index()
        return this.soundListWindow.isCommandEnabled(index)
    }

    playAudio(){
        const audioData = Plugin.getSoundList()[this.soundListWindow.currentSymbol()]
        const audioObject = {name: audioData.filename, volume: audioData.volume, pitch: audioData.pitch, pan: audioData.pan}
        const icon = `\x1bi[${Plugin.param().playWindow.icon}]`
        const mainText = Plugin.param().playWindow.text

        switch(Plugin.getCurrentMainCategoryName()){
            case 'bgm':
                AudioManager.playBgm(audioObject)
            break
            case 'bgs':
                AudioManager.playBgs(audioObject)
            break
            case 'me':
                AudioManager.playMe(audioObject)
            break
            case 'se':
                AudioManager.stopSe()
                AudioManager.playSe(audioObject)
            break
        }

        const text = `${icon}${mainText}${audioData.name}`
        this.playWindow.setText(text)
    }

    onSoundListCancel(){
        if(Plugin.isAudioPlaying()){
            AudioManager.stopAll()
        }else{
            this.subCategoryWindow.activate()
            this.soundListWindow.select(0)
        }  
        this.playWindow.setText("")
    }

    updateActor(){}
    nextActor() {}
    previousActor() {}
}

Eli.SoundTest = {

    version: 5.10,
    url: "https://hakuenstudio.itch.io/eli-sound-test-for-rpg-maker",
    parameters: {
        hidden: {
            text: '',
            description: '',
        },
        titleScreen: {
            enable: true,
            text: '',
            position: 0,
        },
        menuCommand: {
            enable: true,
            text: '',
            position: 0,
        },
        titleWindow: {
            backType: 0,
            icon: 0,
            text: '',
            winSkin: '',
        },
        mainCategoryWindow: {
            backType: 0,
            winSkin: '',
            textAlignment: 'center',
        },
        subCategoryWindow: {
            backType: 0,
            columns: 1,
            lines: 7,
            sortAlphabetically: true,
            textAlignment: 'center',
            width: 0,
            winSkin: '',
        },
        soundListWindow: {
            backType: 0,
            columns: 1,
            hiddenText: '',
            hiddenDescription: ',',
            lines: 7,
            sortAlphabetically: true,
            textAlignment: 'center',
            winSkin: '',
        },
        helpWindow: {
            backType: 0,
            lines: 2,
            winSkin: '',
        },
        playWindow: {
            backType: 0,
            icon: 0,
            text: '',
            winSkin: '',
        },
        unlock: {
            all: false,
            bgm: false,
            bgs: false,
            me: false,
            se: false,
        },
        bgm: {
            enable: true,
            name: '', 
            description: '', 
            subCategory: [{
                name:'', 
                description: '', 
                sounds:[{
                    filename: '', 
                    volume: 100, 
                    pitch: 100, 
                    pan: 0, 
                    name: '', 
                    description: ''
                }]
            }]
        },
        bgs: {
            enable: true,
            name: '', 
            description: '', 
            subCategory: [{
                name:'', 
                description: '', 
                sounds:[{
                    filename: '', 
                    volume: 100, 
                    pitch: 100, 
                    pan: 0, 
                    name: '', 
                    description: ''
                }]
            }]
        },
        me: {
            enable: true,
            name: '', 
            description: '', 
            subCategory: [{
                name:'', 
                description: '', 
                sounds:[{
                    filename: '', 
                    volume: 100, 
                    pitch: 100, 
                    pan: 0, 
                    name: '', 
                    description: ''
                }]
            }]
        },
        se: {
            enable: true,
            name: '', 
            description: '', 
            subCategory: [{
                name:'', 
                description: '', 
                sounds:[{
                    filename: '', 
                    volume: 100, 
                    pitch: 100, 
                    pan: 0, 
                    name: '', 
                    description: ''
                }]
            }]
        },
        backgroundImage: [],
        debug: true,
        fadeIn: 0,
        fadeOut: 0,
    },
    alias: {},
    Window_SoundSceneTitle: Window_SoundSceneTitle,
    Window_SoundMainCategory: Window_SoundMainCategory,
    Window_SoundSubCategory: Window_SoundSubCategory,
    Window_SoundList: Window_SoundList,
    Window_SoundPlaying: Window_SoundPlaying,
    Scene_SoundTest: Scene_SoundTest,
    mainCategory: 'bgm',
    subCategory: 0,
    savedBgm: {},
    savedBgs: {},
    unlockModes: {
        bgm: false,
        bgs: false,
        me: false,
        se: false,
    },

    initialize(){
        this.initParameters()
        this.initPluginCommands()
    },

    initParameters(){
        const parameters = PluginManager.parameters("Eli_SoundTest")
        this.parameters.debug = parameters.debug === "true"
        this.parameters.fadeIn = Number(parameters.fadeIn)
        this.parameters.fadeOut = Number(parameters.fadeOut)

        this.parameters.titleScreen = this.parseTitleScreenParameters(parameters)
        this.parameters.menuCommand = this.parseMenuCommandParameters(parameters)
        this.parameters.backgroundImage = this.parseBackgroundImageParameters(parameters)
        this.parameters.titleWindow = this.parseTitleWindowParameters(parameters)
        this.parameters.mainCategoryWindow = JSON.parse(parameters.mainCategoryWindow)
        this.parameters.subCategoryWindow = this.parseSubCategoryWindowParameters(parameters)
        this.parameters.soundListWindow = this.parseSoundListWindowParameters(parameters)
        this.parameters.helpWindow = this.parseHelpWindowParameters(parameters)
        this.parameters.playWindow = this.parsePlayWindowParameters(parameters)
        this.parameters.unlock = this.parseUnlockParameters(parameters)
        this.parameters.bgm = this.parseAudioTypeParameter(parameters, "bgm")
        this.parameters.bgs = this.parseAudioTypeParameter(parameters, "bgs")
        this.parameters.me = this.parseAudioTypeParameter(parameters, "me")
        this.parameters.se = this.parseAudioTypeParameter(parameters, "se")
    },

    parseTitleScreenParameters(parameters){
        const param = JSON.parse(parameters.titleScreen)
        param.enable = param.enable === "true"
        param.position = Number(param.position)

        return param
    },

    parseMenuCommandParameters(parameters){
        const param = JSON.parse(parameters.menuCommand)
        param.enable = param.enable === "true"
        param.position = Number(param.position)

        return param
    },

    parseBackgroundImageParameters(parameters){
        const param = parameters.backgroundImage
        const end = param.lastIndexOf("/")
        const folder = `img/${param.substring(0, end+1)}`
        const file = param.substring(end+1)

        return [folder, file]
    },

    parseTitleWindowParameters(parameters){
        const param = JSON.parse(parameters.titleWindow)
        param.icon = Number(param.icon)

        return param
    },

    parseSubCategoryWindowParameters(parameters){
        const param = JSON.parse(parameters.subCategoryWindow)
        param.lines = Number(param.lines)
        param.columns = Number(param.columns)
        param.sortAlphabetically = param.sortAlphabetically === "true"

        return param
    },

    parseSoundListWindowParameters(parameters){
        const param = JSON.parse(parameters.soundListWindow)
        param.lines = Number(param.lines)
        param.columns = Number(param.columns)
        param.sortAlphabetically = param.sortAlphabetically === "true"
        param.hiddenDescription = JSON.parse(param.hiddenDescription)

        return param
    },

    parseHelpWindowParameters(parameters){
        const param = JSON.parse(parameters.helpWindow)
        param.lines = Number(param.lines)

        return param
    },

    parsePlayWindowParameters(parameters){
        const param = JSON.parse(parameters.playWindow)
        param.icon = Number(param.icon)

        return param
    },

    parseUnlockParameters(parameters){
        const param = JSON.parse(parameters.unlock)
        param.all = param.all === "true"
        param.bgm = param.bgm === "true"
        param.bgs = param.bgs === "true"
        param.me = param.me === "true"
        param.se = param.se === "true"

        return param
    },

    parseAudioTypeParameter(parameters, type){
        const param = JSON.parse(parameters[type])
        param.enable = param.enable === "true"
        param.description = JSON.parse(param.description)
        param.subCategory = JSON.parse(param.subCategory)

        for(let i = 0; i < param.subCategory.length; i++){
            const subCategory = JSON.parse(param.subCategory[i])
            subCategory.sounds = JSON.parse(subCategory.sounds)
            subCategory.description = JSON.parse(subCategory.description)

            for(let j = 0; j < subCategory.sounds.length; j++){
                const sounds = JSON.parse(subCategory.sounds[j])
                const index = type.length + 1

                sounds.volume = Number(sounds.volume)
                sounds.pan = Number(sounds.pan)
                sounds.pitch = Number(sounds.pitch)
                sounds.filename = sounds.filename.substring(index)
                sounds.description = JSON.parse(sounds.description)

                subCategory.sounds[j] = sounds
            }

            param.subCategory[i] = subCategory
        }

        return param
    },

    initPluginCommands(){},

    createMainConfigData(){
        const bgm = this.createSubConfigData("bgm")
        const bgs = this.createSubConfigData("bgs")
        const me = this.createSubConfigData("me")
        const se = this.createSubConfigData("se")
        const config = {
            bgm: bgm,
            bgs: bgs,
            me: me,
            se: se,
        }

        return config
    },

    createSubConfigData(mainCategory){
        const subCategory = this.param()[mainCategory].subCategory || []
        const subConfig = []

        for(let i = 0; i < subCategory.length; i++){
            const soundList = subCategory[i].sounds || []
            subConfig[i] = []
            
            soundList.forEach(() => subConfig[i].push(false))
        }

        return subConfig
    },

    param(){
        return this.parameters
    },

    getCurrentMainCategoryName(){
        return this.mainCategory
    },

    getCurrentSubCategoryIndex(){
        return this.subCategory
    },

    getCurrentSubCategory(){
        return this.getSubCategoryList()[this.getCurrentSubCategoryIndex()]
    },

    getSubCategoryList(){
        return this.param()[this.getCurrentMainCategoryName()].subCategory
    },

    getSoundList(){
        return this.getSubCategoryList()[this.getCurrentSubCategoryIndex()].sounds
    },

    getMainCategoryWindow(){
        return SceneManager._scene.mainCategoryWindow
    },

    getSubCategoryWindow(){
        return SceneManager._scene.subCategoryWindow
    },

    getSoundListWindow(){
        return SceneManager._scene.soundListWindow
    },

    isAudioPlaying(){
        return  AudioManager._currentBgm && AudioManager._currentBgm.name || 
                AudioManager._currentBgs && AudioManager._currentBgs.name ||
                AudioManager._meBuffer ||
                AudioManager._seBuffers.length > 0
    },

    openSoundTest(){
        AudioManager.stopSe()
        AudioManager.stopMe()
        this.savedBgm = AudioManager.saveBgm()
        this.savedBgs = AudioManager.saveBgs()
        AudioManager.fadeOutBgm(this.param().fadeOut)
        AudioManager.fadeOutBgs(this.param().fadeOut)
        SceneManager.push(this.Scene_SoundTest)
        if(SceneManager._scene.constructor.name === "Scene_Map"){
            SceneManager._scene._waitCount = 2
        }
    },

    quitSoundTest(){
        AudioManager.replayBgm(this.savedBgm)
        AudioManager.replayBgs(this.savedBgs)
        AudioManager.fadeInBgm(this.param().fadeIn)
        AudioManager.fadeInBgs(this.param().fadeIn)
        SceneManager.pop()
    },

    getSavedData(mainCategoryName, subCategoryIndex){
        return ConfigManager.soundTest[mainCategoryName][subCategoryIndex]
    },

    isSoundUnlocked(mainCategoryName, subCategoryIndex, soundIndex){
        return this.getSavedData(mainCategoryName, subCategoryIndex)[soundIndex]
    },

    canUnlockAudio(audio){
        return !this.unlockModes[audio] && audio && audio.name && SceneManager._scene.constructor.name !== "Scene_SoundTest"
    },

    cmd_openSoundScene(args){
        this.openSoundTest()
    },

    cmd_fullUnlock(args){
        const status = args.unlock === "true"
        const category = args.type

        if(category === "all"){
            this.unlockModes.bgm = status
            this.unlockModes.bgs = status
            this.unlockModes.me = status
            this.unlockModes.se = status
        }else{
            this.unlockModes[category] = status
        }
    },

    cmd_unlock(args){
        const status = args.unlock === "true"
        const category = args.type
        const audioName = args.audio.includes("/") ? args.audio.substring(args.audio.lastIndexOf("/") + 1) : args.audio

        const subList = Plugin.param()[category].subCategory
        const findSoundIndex = sound => sound.filename === audioName
        const findSubIndex = subCt => subCt.sounds.some(findSoundIndex)
        const subIndex = subList.findIndex(findSubIndex)

        if(subIndex > -1){
            const savedData = this.getSavedData(category, subIndex)
            const soundIndex = subList[subIndex].sounds.findIndex(findSoundIndex)

            if(soundIndex > -1){
                savedData[soundIndex] = status
                ConfigManager.save()
            }
        }
    },

    cmd_unlockAudio(mainCategoryName, filename){
        const subList = Plugin.param()[mainCategoryName].subCategory
        const findSoundIndex = sound => sound.filename === filename
        const findSubIndex = subCt => subCt.sounds.some(findSoundIndex)
        const subIndex = subList.findIndex(findSubIndex)

        if(subIndex > -1){
            const savedData = this.getSavedData(mainCategoryName, subIndex)
            const soundIndex = subList[subIndex].sounds.findIndex(findSoundIndex)

            if(soundIndex > -1){
                savedData[soundIndex] = true
                ConfigManager.save()
            }
            
        }
    },

    cmdMV_unlock(args){
        if(args[1].toLowerCase() === "all"){
            const category = args[2].toLowerCase()
            if(category === "sound"){
                this.unlockModes.bgm = true
                this.unlockModes.bgs = true
                this.unlockModes.me = true
                this.unlockModes.se = true
            }else{
                this.unlockModes[category] = true
            }

        }else{
            const category = args[1].toLowerCase()
            const audioList = args.slice(2)

            for(const file of audioList){
                Plugin.cmd_unlockAudio(category, file)
            }
            
        }
    },

    cmdMV_restore(args){
        const category = args[1].toLowerCase()
        if(category === "sound"){
            this.unlockModes.bgm = false
            this.unlockModes.bgs = false
            this.unlockModes.me = false
            this.unlockModes.se = false
        }else{
            this.unlockModes[category] = false
        }
    },

    executePluginCommandMV(args){
        const arg0 = args[0].toUpperCase()
        const cmdList = {
            OPEN: "openSoundTest",
            UNLOCK: "cmdMV_unlock",
            RESTORE: "cmdMV_restore",
        }
        const cmd = cmdList[arg0]
        if(this[cmd]){
            this[cmd](args)
        }
    },

}

const Plugin = Eli.SoundTest
const Alias = Eli.SoundTest.alias

Plugin.initialize()

/* ----------------------------- CONFIG MANAGER ----------------------------- */
{

ConfigManager.soundTest = Plugin.createMainConfigData()

Alias.ConfigManager_makeData = ConfigManager.makeData
ConfigManager.makeData = function() {
    const config = Alias.ConfigManager_makeData.call(this)
    config.soundTest = this.soundTest

    return config
}

Alias.ConfigManager_applyData = ConfigManager.applyData
ConfigManager.applyData = function(config) {
    Alias.ConfigManager_applyData.call(this, config)
    this.soundTest = this.readSoundTest(config)
}

ConfigManager.readSoundTest = function(config) {
    const value = config.soundTest

    if((Utils.isOptionValid('test') && Plugin.param().debug) || value === undefined){
        return Plugin.createMainConfigData()
    }else{
        return Eli.PluginManager.convertParameters(config.soundTest)
    }
}

}

/* ------------------------------ AUDIO MANAGER ----------------------------- */
{

Alias.AudioManager_playBgm = AudioManager.playBgm
AudioManager.playBgm = function(bgm, pos) {
    if(Plugin.canUnlockAudio(bgm)){
        const args = {type: "bgm", audio: bgm.name, unlock: "true"}
        Plugin.cmd_unlock(args)
    }
    Alias.AudioManager_playBgm.call(this, bgm, pos)
}

Alias.AudioManager_playBgs = AudioManager.playBgs
AudioManager.playBgs = function(bgs, pos) {
    if(Plugin.canUnlockAudio(bgs)){
        const args = {type: "bgs", audio: bgs.name, unlock: "true"}
        Plugin.cmd_unlock(args)
    }
    Alias.AudioManager_playBgs.call(this, bgs, pos)
}

Alias.AudioManager_playMe = AudioManager.playMe
AudioManager.playMe = function(me) {
    if(Plugin.canUnlockAudio(me)){
        const args = {type: "me", audio: me.name, unlock: "true"}
        Plugin.cmd_unlock(args)
    }
    Alias.AudioManager_playMe.call(this, me)
}

Alias.AudioManager_playSe = AudioManager.playSe
AudioManager.playSe = function(se) {
    if(Plugin.canUnlockAudio(se)){
        const args = {type: "se", audio: se.name, unlock: "true"}
        Plugin.cmd_unlock(args)
    }
    Alias.AudioManager_playSe.call(this, se)
}

}

/* ------------------------------ SOUND MANAGER ----------------------------- */
{

Alias.SoundManager_playSystemSound = SoundManager.playSystemSound
SoundManager.playSystemSound = function(n) {
    if(SceneManager._scene.constructor.name === "Scene_SoundTest") return
    Alias.SoundManager_playSystemSound.call(this, n)
}

}

/* ----------------------------- PLUGIN COMMANDS ---------------------------- */
{

Alias.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Alias.Game_Interpreter_pluginCommand.call(this, command, args)
    if(command.toUpperCase() === "SOUNDTEST"){
        Plugin.executePluginCommandMV(args)

    }
}

}

/* ------------------------------- SCENE TITLE ------------------------------ */
{

Alias.Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow
Scene_Title.prototype.createCommandWindow = function() {
    Alias.Scene_Title_createCommandWindow.call(this)
    this._commandWindow.setHandler('soundTest',  this.commandSoundTest.bind(this));
}

Scene_Title.prototype.commandSoundTest = function(){
    this._commandWindow.close();
    Plugin.openSoundTest()
}

}

/* ------------------------------- SCENE MENU ------------------------------- */
{

Alias.Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow
Scene_Menu.prototype.createCommandWindow = function() {
    Alias.Scene_Menu_createCommandWindow.call(this)
    this._commandWindow.setHandler('soundTest',   this.commandSoundTest.bind(this));
}

Scene_Menu.prototype.commandSoundTest = function() {
    Plugin.openSoundTest()
}

}

/* --------------------------- WINDOW MENU COMMAND -------------------------- */
{

Alias.Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands
Window_MenuCommand.prototype.addOriginalCommands = function() {
    Alias.Window_MenuCommand_addOriginalCommands.call(this)
    if(Plugin.param().menuCommand.enable){
        this.addCommand(Plugin.param().menuCommand.text, "soundTest")
    }
}

Alias.Window_MenuCommand_makeCommandList = Window_MenuCommand.prototype.makeCommandList
Window_MenuCommand.prototype.makeCommandList = function(){
    Alias.Window_MenuCommand_makeCommandList.call(this)
    this.setSoundTestCommandPosition()
}

Window_MenuCommand.prototype.setSoundTestCommandPosition = function() {
    const realIndex = Plugin.param().menuCommand.position
    if(realIndex > -1){
        const oldIndex = this._list.findIndex(item => item.symbol === "soundTest")
        const command = this._list.splice(oldIndex, 1)[0]
        const newIndex = realIndex.clamp(0, this._list.length)

        this._list.splice(newIndex, 0, command)
    }
}

}

/* -------------------------- WINDOW TITLE COMMAND -------------------------- */
{

Alias.Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList
Window_TitleCommand.prototype.makeCommandList = function() {
    Alias.Window_TitleCommand_makeCommandList.call(this)
    if(Plugin.param().titleScreen.enable){
        this.addCommand(Plugin.param().titleScreen.text, "soundTest")
        this.setSoundTestCommandPosition()
    }
}

Window_TitleCommand.prototype.setSoundTestCommandPosition = function() {
    const realIndex = Plugin.param().titleScreen.position
    if(realIndex > -1){
        const oldIndex = this._list.findIndex(item => item.symbol === "soundTest")
        const command = this._list.splice(oldIndex, 1)[0]
        const newIndex = realIndex.clamp(0, this._list.length)

        this._list.splice(newIndex, 0, command)
    }
}

}

}