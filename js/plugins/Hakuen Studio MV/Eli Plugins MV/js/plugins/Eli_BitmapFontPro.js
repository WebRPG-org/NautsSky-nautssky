//==========================================================================
// Eli_BitmapFontPro.js
//==========================================================================

/*:
@plugindesc ♦1.0.0♦ Use bitmap font instead of default fonts!
@author Hakuen Studio

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
Patreon      → https://www.patreon.com/hakuenstudio
Rate Plugin  → https://hakuenstudio.itch.io/eli-bitmap-font-for-rpg-maker/rate?source=game
Terms of Use → https://www.hakuenstudio.com/terms-of-use-5-0-0
Instagram    → https://www.instagram.com/hakuenstudio
Twitter      → https://twitter.com/hakuen_studio
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
============================================================================
Plugin Requirements
============================================================================

Need Eli Book.

Order After Eli Book.
Order After Eli Message Actions

============================================================================
Features
============================================================================

● Add bitmap font to your game.
● Choose the size of the space between characters.
● Choose the size of the space bar.
● Choose the characters(letters) your bitmap will use.
● Choose if you want to smooth or not the font.
● Can add as many fonts as you want. (PRO)
● Can add an outline to the font. (PRO)
● Set specific fonts for scenes or windows. (PRO)
● Change text/outline color. (PRO)
● Increase/decrease the font size (\{ \}) (PRO)
● Use Underline and Strike-through with Eli Message Actions. (PRO)

============================================================================
Google Docs Help File
============================================================================

https://docs.google.com/document/d/1_oBWAIgPLPW_Y7HRFuQSYh8OSCwOF1uf6iQduyNHfuA/edit?usp=sharing

============================================================================
Plugin Commands (MV)
============================================================================

The main format of the plugin command is this:

● BitmapFont [action] [type] [FontIndex] [container] [container]

● Action → Replace with Assign, Reset, or ResetAll.
• Assing → Will assign a new font to the container
• Reset → Will reset the font of the container to its default.
• ResetAll → Will reset all container fonts to their default ones.
● Type → Replace with “Window” or “Scene”. This will tell the plugin if 
the container name you use, will reference a Scene or a Window.
● Font Index → The bitmap font index or the bitmap font face.
● Container → The name of the Window or scene you want to perform the 
operation. It is case sensitive.

============================================================================

@param buildJSON
@text Build Bitmap File
@type boolean
@desc Set this to true for the plugin build the JSON data for the bitmaps fonts.
@default true

@param fonts
@text Fonts
@type struct<fontList>[]
@desc Setup here all your fonts.
@default

@param spaceBitmap
@text Add space as a bitmap
@type boolean
@desc If true, the "space" will be rendered as an empty bitmap.
@default true

@param underlineHeight
@text Underline height
@type text
@desc the height of the line that will be used as underline.
@default 1

@param strikeThroughHeight
@text Strike Through height
@type text
@desc The height of the line that will be used to strike through the text.
@default 1

*/

/* -------------------------------- FONT LIST ------------------------------- */
{
/*~struct~fontList:

@param file
@text Main Font File
@type file
@dir img/system
@desc The main bitmap font to use.
@default 

@param textColor
@text Text Color
@type combo
@option disable
@desc Choose a color for the text. Supports HTML/HEX/RGB/RGBA.
@default disable
@parent file

@param fileOutline
@text Outline Font File
@type file
@dir img/system
@desc Optionally use another bitmap file for the font outline.
@default 

@param outlineColor
@text Outline Color
@type combo
@option disable
@desc Choose a color for the text outline. Supports HTML/HEX/RGB/RGBA.
@default disable
@parent fileOutline

@param face
@text Font Face
@type text
@desc The name of this font to be referenced in plugin commands or escape codes.
@default 

@param characters
@text All Characters
@type struct<charactersSt>
@desc A list of all the characters your font bitmap file have.
@default 

@param spaceBetweenCharacters
@text Space between characters
@type number
@desc The size in pixels of space between each character.
@default 2

@param blankSpace
@text Blank space size
@type number
@desc The size in pixels that the space will have.
@default 6

@param smooth
@text Smooth
@type boolean
@desc Choose if you want to apply smooth when drawing the font.
@default false

@param sceneList
@text Scene List
@type combo[]
@option Scene_Battle @option Scene_Debug @option Scene_Equip @option Scene_GameEnd @option Scene_Gameover @option Scene_Item @option Scene_Load @option Scene_Map @option Scene_MapSelect @option Scene_Menu @option Scene_MenuInfo @option Scene_Name @option Scene_Option @option Scene_Save @option Scene_Shop @option Scene_Skill @option Scene_Status @option Scene_Title 
@desc A list of all scenes that will use this font.
It is case sensitive.
@default []

@param windowList
@text Window List
@type combo[]
@option Window_ActorCommand @option Window_BattleActor @option Window_BattleEnemy @option Window_BattleItem @option Window_BattleLog @option Window_BattleSkill @option Window_BattleStatus @option Window_ChoiceList @option Window_CommandInfo @option Window_DebugEdit @option Window_DebugRange @option Window_DescriptionInfo @option Window_EquipCommand @option Window_EquipItem @option Window_EquipSlot @option Window_EquipStatus @option Window_EventItem @option Window_GameEnd @option Window_Gold @option Window_Help @option Window_ItemCategory @option Window_ItemList @option Window_MapName @option Window_MapSelectCommand @option Window_MenuActor @option Window_MenuCommand @option Window_MenuStatus @option Window_Message @option Window_NameBox @option Window_NameEdit @option Window_NameInput @option Window_NumberInput @option Window_Options @option Window_PartyCommand @option Window_SavefileList @option Window_ScrollText @option Window_ShopBuy @option Window_ShopCommand @option Window_ShopNumber @option Window_ShopSell @option Window_ShopStatus @option Window_SkillList @option Window_SkillStatus @option Window_SkillType @option Window_Status @option Window_StatusEquip @option Window_StatusParam @option Window_TitleCommand @option Window_TitleInfo @option Window_ToastInfo
@desc A list of all windows that will use this font.
It is case sensitive.
@default []

@param isForDamageSprite
@text Use on Damage Pop up
@type boolean
@desc If true, this font will be used to draw the damage values in battle.
@default false

@param isForGameTimer
@text Use on Game Timer
@type boolean
@desc If true, this font will be used on the game timer.
@default false

@param isForGameTitle
@text Use on Game Title
@type boolean
@desc If true, this font will be used to draw the game title on title screen.
@default false

*/
}

/* --------------------------- CHARACTER SETTINGS --------------------------- */
{
/*~struct~charactersSt:

@param upper
@text Upper Case
@type text
@desc A list of all the characters your font bitmap file have.
@default ABCDEFGHIJKLMNOPQRSTUVWXYZ

@param lower
@text Lower Case
@type text
@desc A list of all the characters your font bitmap file have.
@default abcdefghijklmnopqrstuvwxyz

@param numbers
@text Numbers
@type text
@desc A list of all the characters your font bitmap file have.
@default 0123456789

@param signs
@text Signs
@type text
@desc A list of all the characters your font bitmap file have.
@default !?.'"|#$%¨&*()-_=+§¢¬ºª´`~^,<>:;/\@

*/
}

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_BitmapFont = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

const FOLDER_NAME = "data/BitmapFonts"

Eli.BitmapFont = {

    version: 5.21,
    url: "https://hakuenstudio.itch.io/eli-bitmap-font-for-rpg-maker",
    parameters: {
        buildJSON: true,
        fonts: [{
            file: '',
            fileOutline: '',
            face: '',
            characters: {upper: '', lower: '', number: 0, signs: ''},
            spaceBetweenCharacters: 0,
            blankSpace: 0, 
            smooth: false,
            textColor: '',
            sceneList: [''],
            windowList: [''],
            Sprite_Timer: false,
            Sprite_GameTitle: false,
            Sprite_Damage: false,
            drawMethod: '',
        }],
        spaceBitmap: false, 
        underlineHeight: 0, 
        strikeThroughHeight: 0,
    },
    alias: {},
    pro: true,
    index: 0,
    sourceData: {},

    initialize(){
        this.initParameters()

        if(this.parameters.buildJSON && Utils.isOptionValid("test")){
            this.createBitmapFontDataFolder()
            this.startBuildingJson()
        }else{
            this.loadAllSourceData()
        }
    },

    initParameters(){
        const parameters = PluginManager.parameters("Eli_BitmapFontPro")
        const rawFonts = JSON.parse(parameters.fonts)

        this.parameters.buildJSON = parameters.buildJSON === "true"
        this.parameters.spaceBitmap = parameters.spaceBitmap === "true"
        this.parameters.strikeThroughHeight = Number(parameters.strikeThroughHeight)
        this.parameters.underlineHeight = Number(parameters.underlineHeight)

        for(let i = 0; i < rawFonts.length; i++){
            const font = JSON.parse(rawFonts[i])
            font.characters = JSON.parse(font.characters)
            font.sceneList = JSON.parse(font.sceneList)
            font.windowList = JSON.parse(font.windowList)
            font.blankSpace = Number(font.blankSpace)
            font.spaceBetweenCharacters = Number(font.spaceBetweenCharacters)
            font.Sprite_Damage = font.isForDamageSprite === "true"
            font.Sprite_Timer = font.isForGameTimer === "true"
            font.Sprite_GameTitle = font.isForGameTitle === "true"
            font.smooth = font.smooth === "true"

            font.textColor = Eli.ColorManager.getHexOrName(font.textColor) || "white"
            font.outlineColor = Eli.ColorManager.getHexOrName(font.outlineColor) || "black"
            
            if(font.fileOutline){
                font.drawMethod = "drawBitmapCharacterWithOutline"
            }else{
                font.drawMethod = "drawBitmapCharacter"
            }

            this.parameters.fonts[i] = font
        }
    },

    createBitmapFontDataFolder(){
        const fs = require("fs")
        
        if(!fs.existsSync(FOLDER_NAME)){
            fs.mkdirSync(FOLDER_NAME)
        }
    },

    startBuildingJson(){
        for(const fontData of this.parameters.fonts){
            const fontBitmap = this.loadBitmapFont(fontData.file)
            
            fontBitmap.addLoadListener(() => {
                const sourceData = this.createSourceData(fontData, fontBitmap)
                this.writeFontJsonData(sourceData, fontData)
            })
        }
    },

    loadBitmapFont(file){
        const fontBitmap = ImageManager.loadSystem(file)

        return fontBitmap
    },

    createSourceData(fontData, fontBitmap){
        const characters = this.getAllCharacters(fontData.characters)
        const height = fontBitmap.height
        const width = fontBitmap.width / characters.length
        const sourceData = {}

        for(let i = 0; i < characters.length; i++){
            const char = characters[i]
            const sourceSettings = this.createCharacterSourceSettings(i, width, height, fontBitmap)
            sourceData[char] = sourceSettings
        }

        return sourceData
    },

    getAllCharacters(fontCharacters){
        const {upper, lower, numbers, signs} = fontCharacters
        return upper + lower + numbers + signs
    },

    createCharacterSourceSettings(index, standardWidth, standardHeight, fontBitmap){
        const bounds = this.createCharacterBounds(index, standardWidth, fontBitmap)
        const width = this.createCharacterWidth(bounds)
        const sourceSettings = {
            sx: bounds[0],
            sy: 0,
            sw: width,
            sh: standardHeight
        }

        return sourceSettings
    },

    createCharacterBounds(index, standardWidth, fontBitmap){
        const minX = index * standardWidth
        const maxX = minX + standardWidth
        const bounds = fontBitmap.searchBounds(minX, maxX)

        return bounds
    },

    createCharacterWidth(bounds){
        return (bounds[1] + 1) - bounds[0]
    },

    writeFontJsonData(rawData, font){
        const fs = require('fs')
        const data = JSON.stringify(rawData)
        const filename = `data/BitmapFonts/${font.face}.json`

        fs.writeFile(filename, data, "utf8", (err) => {
            if(err){
                console.log("An error occured while writing JSON Object to File.")
                return console.log(err)
            }else{
                this.loadSourceData(font)
            }
        })
        
    },

    loadAllSourceData(){
        for(const font of this.parameters.fonts){
            this.loadSourceData(font)
        }
    },

    loadSourceData(font){
        const xhr = new XMLHttpRequest()
        const filename = font.face
        const url = `${FOLDER_NAME}/${filename}.json`

        xhr.open("GET", url)
        xhr.overrideMimeType("application/json");
        xhr.onload = () => {
            if(xhr.status < 400){
                this.sourceData[filename] = JSON.parse(xhr.responseText) 
                this.setupFont(font)
            }else{
                console.log("error")
            }
        }
        xhr.onerror = () => {
            console.log("RESET THE GAME")
        }
        xhr.send()
    },

    setupFont(fontData){
        const mainBitmap = this.loadBitmapFont(fontData.file)
        fontData.textColor = Eli.ColorManager.getHexOrName(fontData.textColor) || "white"
        fontData.bitmaps = {}
        fontData.outlineBitmaps = {}
        fontData.height = 0
        fontData.size = 1

        mainBitmap.addLoadListener(() => {
            if(fontData.fileOutline){
                const outlineBitmap = this.loadBitmapFont(fontData.fileOutline)
                
                outlineBitmap.addLoadListener(() => {
                    this.setupCharacters(fontData, mainBitmap, outlineBitmap)
                })

            }else{
                this.setupCharacters(fontData, mainBitmap)
            }
            
        })
    },

    setupCharacters(font, mainBitmap, outlineBitmap){
        const height = mainBitmap.height
        const sourceData = this.sourceData[font.face]
        const createBitmapMethod = outlineBitmap ? "createBitmapCharactersWithOutline" : "createBitmapCharacters"
        font.height = height

        for(const char in sourceData){
            const sourceSettings = sourceData[char]
            
            this[createBitmapMethod](font, char, sourceSettings, mainBitmap, outlineBitmap)
        }

        if(this.param().spaceBitmap){
            font.bitmaps[" "] = new Bitmap(font.blankSpace, height)

            if(outlineBitmap){
                font.outlineBitmaps[" "] = new Bitmap(font.blankSpace, height)
            }
        }
    },

    createBitmapCharacters(font, char, sourceSettings, mainBitmap){
        this.createMainCharacterBitmap(font, char, sourceSettings, mainBitmap)
    },

    createBitmapCharactersWithOutline(font, char, sourceSettings, mainBitmap, outlineBitmap){
        this.createMainCharacterBitmap(font, char, sourceSettings, mainBitmap)
        this.createOutlineCharacterBitmap(font, char, sourceSettings, outlineBitmap)
    },

    createMainCharacterBitmap(font, char, sourceSettings, fontBitmap){
        font.bitmaps[char] = new Bitmap(sourceSettings.sw + font.spaceBetweenCharacters, sourceSettings.sh)
        font.bitmaps[char].addLoadListener(() => {
            this.drawCharacter(sourceSettings, font.bitmaps[char], fontBitmap)
        })
    },

    createOutlineCharacterBitmap(font, char, sourceSettings, outlineBitmap){
        font.outlineBitmaps[char] = new Bitmap(sourceSettings.sw + font.spaceBetweenCharacters, sourceSettings.sh)
        font.outlineBitmaps[char].addLoadListener(() => {
            this.drawCharacter(sourceSettings, font.outlineBitmaps[char], outlineBitmap)
        })
    },

    drawCharacter(sourceSettings, charBitmap, fontBitmap){
        const {sx, sy, sw, sh} = sourceSettings
        charBitmap.blt(fontBitmap, sx, sy, sw, sh, 0, 0)
    },

    param(){
        return this.parameters
    },

    findParameterFontIndex(bitmapFont){
        if(isNaN(bitmapFont)){
            bitmapFont = this.param().fonts.findIndex(font => {
                const itemFace = Eli.String.removeSpaces(font.face).toLowerCase()
                const targetFace = Eli.String.removeSpaces(bitmapFont).toLowerCase()

                return itemFace === targetFace
            })
        }
        
        return Math.max(0, Number(bitmapFont))
    },

    findSavedFontIndex(containerName){
        const savedFontIndex = this.savedFonts()[containerName]
        return isNaN(savedFontIndex) ? - 1 : savedFontIndex
    },

    savedFonts(){
        return $eliData.contents.BitmapFontPro
    },

    changeContainerFont(containerName, font){
        const fontIndex = this.findParameterFontIndex(font)
        this.savedFonts()[containerName] = fontIndex
    },

    removeSavedFont(containerName){
        delete this.savedFonts()[containerName]
    },

    cmd_changeFont(args){
        args = Eli.PluginManager.convertParameters(args)

        for(const winName of args.winList || []){
            this.changeContainerFont(winName, args.index)
        }

        for(const sceneName of args.sceneList || []){
            this.changeContainerFont(sceneName, args.index)
        }

    },

    cmd_resetFont(args){
        args = Eli.PluginManager.convertParameters(args)

        for(const winName of args.winList || []){
            this.removeSavedFont(winName)
        }

        for(const sceneName of args.sceneList || []){
            this.removeSavedFont(sceneName)
        }

    },

    cmd_resetAllFont(args){
        $eliData.contents.BitmapFontPro = {}
    },
    

    executePluginCommandMV(args){
        /*
            BitmapFont [action] [type] [FontIndex] [container] [container]...

        */
        const action = args[0].toLowerCase()
        const type = (args[1] || "").toLowerCase()
        const list = args.slice(action === "assign" ? 3 : 2)
        const cmdArgs = {winList: [], sceneList: [], index: args[2]}

        if(type === "window"){
            cmdArgs.winList = list
        }else{
            cmdArgs.sceneList = list
        }

        const cmdList = {
            assign: "cmd_changeFont",
            reset: "cmd_resetFont",
            resetall: "cmd_resetAllFont"
        }
        const cmd = cmdList[action]
        if(this[cmd]){
            this[cmd](cmdArgs)
        }

    },
    
}

const Plugin = Eli.BitmapFont
const Alias = Eli.BitmapFont.alias

Plugin.initialize()

/* ------------------------------- SAVED DATA ------------------------------- */
Alias.Eli_SavedContents_initialize = Eli_SavedContents.prototype.initialize
Eli_SavedContents.prototype.initialize = function(){
    Alias.Eli_SavedContents_initialize.call(this)
    this.initBitmapFontData()
}

Eli_SavedContents.prototype.initBitmapFontData = function(){
    this.contents.BitmapFontPro = {}
}

/* --------------------------------- BITMAP --------------------------------- */
Alias.Bitmap_initialize = Bitmap.prototype.initialize
Bitmap.prototype.initialize = function(width, height) {
    this.bitmapFontIndex = 0
    this.bitmapFontSize = 1
    Alias.Bitmap_initialize.call(this, width, height)
}

// Overwrite
Bitmap.prototype.measureTextWidth = function(text) {
    let width = 0

    for(const char of String(text)){
        const bitmap = this.fontBitmap().bitmaps[char]
        const blankSpace = this.fontBitmap().blankSpace

        if(bitmap && char !== " "){
            width += bitmap.width * this.bitmapFontSize
        }else{
            width += blankSpace * this.bitmapFontSize
        } 
    }

    return width
}

// Overwrite
Bitmap.prototype.drawText = function(text, x, y, maxWidth, lineHeight, align) {
    if(this.hasInlineImage){
        this.drawTextWithInlineImage(text, x, y, maxWidth, lineHeight, align, this.drawTextWithBitmapFont)
    }else{
        this.drawTextWithBitmapFont(text, x, y, maxWidth, lineHeight, align)
    }
}

Bitmap.prototype.drawTextWithBitmapFont = function(text, x, y, maxWidth, lineHeight, align){
    text = String(text)
    const size = this.bitmapFontSize
    let tx = this.getTextX(text, x, maxWidth, align)

    for(let i = 0; i < text.length; i++){
        const char = text[i]
        const bitmap = this.fontBitmap().bitmaps[char]
        const outBitmap = this.fontBitmap().outlineBitmaps[char]
        const charWidth = this.measureTextWidth(char)

        if(bitmap){
            this.drawBitmapFontCharacter(bitmap, outBitmap, size, tx, y, lineHeight)
        }

        tx += charWidth //* size
    }
}

Bitmap.prototype.getTextX = function(text, x, maxWidth, align){
    const textWidth = this.measureTextWidth(text)
    const options = {
        left:   x,
        center: x + (maxWidth / 2) - (textWidth / 2),
        right:  x + maxWidth - textWidth,
    }
    return options[align] || x
}

Bitmap.prototype.drawBitmapFontCharacter = function(bitmap, outBitmap, size, tx, y, lineHeight){
    const {sx, sy, sw, sh, dw, dh, ty} = this.getSourceAndDestinationSettings(bitmap, size, y, lineHeight)

    const oldSmooth = this._smooth
    const oldContextSmooth = this.context.imageSmoothingEnabled
    const drawMethod = this.fontBitmap().drawMethod

    this._smooth = this.fontBitmap().smooth
    this.context.imageSmoothingEnabled = this.fontBitmap().smooth

    //Imported Message Actions
    this.drawPreviousActions(sx, sy, sw, sh, tx, ty, dw, dh)
    
    this[drawMethod](sx, sy, sw, sh, dw, dh, ty, tx, bitmap, outBitmap)

    //Imported Message Actions
    this.drawNextActions(sx, sy, sw, sh, tx, ty, dw, dh)
    
    this._smooth = oldSmooth
    this.context.imageSmoothingEnabled = oldContextSmooth
}

Bitmap.prototype.drawBitmapCharacter = function(sx, sy, sw, sh, dw, dh, ty, tx, bitmap){
    const charImage = bitmap._canvas || bitmap._image

    if(this.fontBitmap().textColor !== "disable"){
        this.setBitmapTextColor(bitmap, this.textColor)
    }
    
    this.context.globalCompositeOperation = "source-over"
    this.context.drawImage(charImage, sx, sy, sw, sh, tx, ty, dw, dh)
    this._baseTexture.update()
}

Bitmap.prototype.drawBitmapCharacterWithOutline = function(sx, sy, sw, sh, dw, dh, ty, tx, bitmap, outBitmap){
    const charImage = bitmap._canvas || bitmap._image
    const outImage = outBitmap._canvas || outBitmap._image

    if(this.fontBitmap().textColor !== "disable"){
        this.setBitmapTextColor(bitmap, this.textColor)
    }

    if(this.fontBitmap().outlineColor !== "disable"){
        this.setBitmapTextColor(outBitmap, this.outlineColor)
    }

    this.context.globalCompositeOperation = "source-over"
    this.context.drawImage(charImage, sx, sy, sw, sh, tx, ty, dw, dh)
    this.context.drawImage(outImage, sx, sy, sw, sh, tx, ty, dw, dh)
    this._baseTexture.update()
}

Bitmap.prototype.getSourceAndDestinationSettings = function(bitmap, size, y, lineHeight){
    const width = bitmap.width
    const height = bitmap.height
    const realHeight = height * this.bitmapFontSize

    return {
        sx: 0,
        sy: 0,
        sw: width,
        sh: height,
        dw: Math.floor(width * size),
        dh: Math.floor(height * size),
        ty: (y + (lineHeight/2) - (realHeight/2)) + 2,
    }
}

if(Imported.Eli_MessageActions){

    Bitmap.prototype.drawPreviousActions = function(sx, sy, sw, sh, tx, ty, dw, dh){
        if(this.background.canDraw){
            this.drawBitmapTextBackgroundColor(sx, sy, sw, sh, tx, ty, dw, dh)  
        }
    }

    Bitmap.prototype.drawNextActions = function(sx, sy, sw, sh, tx, ty, dw, dh){
        if(this.underline){
            this.drawBitmapTextUnderline(sw, tx, ty, dh)
        }
    
        if(this.strikeThrough){
            this.drawBitmapTextStrikeThrough(sw, tx, ty, dh)
        }
    }

}else{

    Bitmap.prototype.drawPreviousActions = function(sx, sy, sw, sh, tx, ty, dw, dh){}
    Bitmap.prototype.drawNextActions = function(sx, sy, sw, sh, tx, ty, dw, dh){}

}

Bitmap.prototype.drawBitmapTextBackgroundColor = function(sx, sy, sw, sh, tx, ty, dw, dh){
    const color = this.background.color
    const bitmap = new Bitmap(sw, sh)

    bitmap.fillAll(color)
    this.blt(bitmap, sx, sy, sw, sh, tx, ty-1, dw, dh) // - 1 para tentar centralizar melhor
}

Bitmap.prototype.drawBitmapTextUnderline = function(sw, tx, ty, dh){
    const underlineHeight = Plugin.param().underlineHeight
    const bitmap = new Bitmap(sw, underlineHeight)

    bitmap.fillAll(this.textColor)
    this.blt(bitmap, 0, 0, sw, underlineHeight, tx, ty+dh)
}

Bitmap.prototype.drawBitmapTextStrikeThrough = function(sw, tx, ty, dh){
    const strikeHeight = Plugin.param().strikeThroughHeight
    const bitmap = new Bitmap(sw, strikeHeight)

    bitmap.fillAll(this.textColor)
    this.blt(bitmap, 0, 0, sw, strikeHeight, tx, ty+dh/2)
}

Bitmap.prototype.setBitmapTextColor = function(bitmap, color){
    const source = bitmap._canvas || bitmap._image
    const ctx = source.getContext("2d")
    const oldSmooth = bitmap._smooth
    const oldContextSmooth = ctx.imageSmoothingEnabled

    bitmap._smooth = Plugin.parameters.smooth
    ctx.imageSmoothingEnabled = Plugin.parameters.smooth

    ctx.fillStyle = color
    ctx.globalCompositeOperation = "source-atop"
    ctx.fillRect(0, 0, source.width, source.height)

    bitmap._smooth = oldSmooth
    ctx.imageSmoothingEnabled = oldContextSmooth
}

Bitmap.prototype.searchBounds = function(minX, maxX){
    const coords = [
        this.getFirstLeftPixel(minX, maxX), 
        this.getLastRightPixel(maxX, minX)
    ]

    return coords
}

Bitmap.prototype.getFirstLeftPixel = function(minX, maxX){
    let canBreak = false
    let firstPixel = 0
    
    for(let w = minX; w <= maxX; w++){
        
        for(let h = 0; h < this.height; h++){
            
            if(this.getAlphaPixel(w, h) > 0){
                firstPixel = w
                canBreak = true
                break
            }
        }

        if(canBreak) break
    }
    
    return firstPixel
}

Bitmap.prototype.getLastRightPixel = function(maxX, minX){
    let canBreak = false
    let lastPixel = 0
    
    for(let w = maxX-1; w >= minX; w--){
        
        for(let h = this.height; h >= 0; h--){

            if(this.getAlphaPixel(w, h) > 0){
                lastPixel = w
                canBreak = true
                break
            }
        }
        if(canBreak) break
    }

    return lastPixel
}

Bitmap.prototype.fontBitmap = function(){
    return Plugin.param().fonts[this.bitmapFontIndex]
}

// Not Used
Bitmap.prototype.measureTextWidthForEachChar = function(text){
    let width = []
    const txt = String(text)

    for(let i = 0; i < txt.length; i++ ){
        const char = txt[i]
        const bitmap = this.fontBitmap().bitmaps[char]
        const blankSpace = this.fontBitmap().blankSpace

        if(bitmap && char !== " "){
            width.push(bitmap.width * this.bitmapFontSize)
        }else{
            width.push(blankSpace)
        } 
    }

    return width
}

/* ------------------------------- SCENE TITLE ------------------------------ */
// Overwrite
Scene_Title.prototype.drawGameTitle = function() {
    const x = 20
    const y = Graphics.height / 4
    const maxWidth = Graphics.width - x * 2
    const text = $dataSystem.gameTitle
    const bitmap = this._gameTitleSprite.bitmap

    this.setBitmapFontForTitle()
    bitmap.drawText(text, x, y, maxWidth, 48, 'center')
}

Scene_Title.prototype.setBitmapFontForTitle = function() {
    const fontIndex = Plugin.param().fonts.findIndex(item => item.Sprite_GameTitle)
    const bitmap = this._gameTitleSprite.bitmap

    bitmap.bitmapFontIndex = Math.max(0, fontIndex)
    bitmap.textColor = bitmap.fontBitmap().textColor
    bitmap.outlineColor = bitmap.fontBitmap().outlineColor
}

/* --------------------------------- SPRITE --------------------------------- */
Alias.Sprite_initialize = Sprite.prototype.initialize
Sprite.prototype.initialize = function(bitmap) {
    this.initBitmapFontMembers()
    Alias.Sprite_initialize.call(this, bitmap)
}

Sprite.prototype.initBitmapFontMembers = function() {
    const fonts = Plugin.param().fonts
    const name = this.constructor.name
    const fontIndex = Math.max(0, fonts.findIndex(item => item[name]))

    this.bitmapFontIndex = fontIndex
    this.bitmapFontSize = fonts[fontIndex].height
}

Sprite.prototype.getBitmapFontSize = function() {
    return this.bitmapFontSize
}

/* ------------------------------ DAMAGE SPRITE ----------------------------- */
Alias.Sprite_Damage_fontSize = Sprite_Damage.prototype.fontSize
Sprite_Damage.prototype.fontSize = function() {
    return this.getBitmapFontSize() || Alias.Sprite_Damage_fontSize.call(this)
}

Alias.Sprite_Damage_createBitmap = Sprite_Damage.prototype.createBitmap
Sprite_Damage.prototype.createBitmap = function(width, height) {
    const bitmap = Alias.Sprite_Damage_createBitmap.call(this, width, height)
    this.setBitmapFont(bitmap)

    return bitmap
}

Sprite_Damage.prototype.setBitmapFont = function(bitmap) {
    bitmap.bitmapFontIndex =this.bitmapFontIndex
    this.adjustBitmapFontSettings(bitmap)
}

Sprite_Damage.prototype.adjustBitmapFontSettings = function(bitmap) {
    const font = bitmap.fontBitmap()
    bitmap.fontSize = bitmap.fontBitmap().height
    bitmap.textColor = font.textColor
    bitmap.outlineColor = font.outlineColor
}

/* ------------------------------ TIMER SPRITE ------------------------------ */
Alias.Sprite_Timer_createBitmap = Sprite_Timer.prototype.createBitmap
Sprite_Timer.prototype.createBitmap = function() {
    Alias.Sprite_Timer_createBitmap.call(this)
    this.setBitmapFont()
}

// MV DOES NOT HAVE THAT BY DEFAULT
Sprite_Timer.prototype.fontSize = function() {
    return this.getBitmapFontSize()
}

Sprite_Timer.prototype.setBitmapFont = function() {
    this.bitmap.bitmapFontIndex = this.bitmapFontIndex
    this.adjustBitmapFontSettings()
}

Sprite_Timer.prototype.adjustBitmapFontSettings = function() {
    const bitmap = this.bitmap
    const font = bitmap.fontBitmap()
    
    bitmap.fontSize = font.height
    this.bitmapFontSize = font.height
    
    if(!Imported.Eli_Timer){
        bitmap.textColor = font.textColor || bitmap.textColor
        bitmap.outlineColor = font.outlineColor || bitmap.outlineColor
    }
}

/* ------------------------------- WINDOW BASE ------------------------------ */
Alias.Window_Base_resetFontSettings = Window_Base.prototype.resetFontSettings
Window_Base.prototype.resetFontSettings = function() {
    this.setBitmapFontFace()
    Alias.Window_Base_resetFontSettings.call(this)
    this.resetBitmapFontSettings()
}

Alias.Window_Base_resetTextColor = Window_Base.prototype.resetTextColor
Window_Base.prototype.resetTextColor = function() {
    Alias.Window_Base_resetTextColor.call(this)
    this.resetBitmapTextColor()
}

Alias.Window_Base_calcTextHeight = Window_Base.prototype.calcTextHeight
Window_Base.prototype.calcTextHeight = function(textState, all) {
    const textHeight = Alias.Window_Base_calcTextHeight.call(this, textState, all)
    const defaultLineSpacing = this.lineHeight() - this.standardFontSize()
    const fontBitmapLineSpacing = this.lineHeight() - this.contents.fontSize

    return textHeight + defaultLineSpacing
}

// Overwrite
Window_Base.prototype.makeFontBigger = function() {
    if(this.contents.bitmapFontSize === 0.5){
        this.contents.bitmapFontSize = 1
    }else{
        this.contents.bitmapFontSize += 1
    }

    this.contents.fontSize = this.contents.fontBitmap().height * this.contents.bitmapFontSize
}

// Overwrite
Window_Base.prototype.makeFontSmaller = function() {
    this.contents.bitmapFontSize = Math.max(0.5, this.contents.bitmapFontSize - 1)
    this.contents.fontSize = this.contents.fontBitmap().height * this.contents.bitmapFontSize
}

Window_Base.prototype.findBitmapFontIndex = function() {
    const savedFontIndex = this.findSavedBitmapFont()
    if(savedFontIndex > -1){
        return savedFontIndex
    }
    
    const sceneFontIndex = this.findSceneBitmapFontIndex()
    if(sceneFontIndex > -1){
        return sceneFontIndex
    }

    const winFontIndex = this.findWindowBitmapFontIndex()
    if(winFontIndex > -1){
        return winFontIndex
    }

    return 0
}

Window_Base.prototype.findSavedBitmapFont = function(){
    const sceneName = SceneManager._scene.constructor.name
    const winName = this.constructor.name
    const winFont = Plugin.findSavedFontIndex(winName)

    if(winFont > -1){
        return winFont
    }else{
        return Plugin.findSavedFontIndex(sceneName)
    }
}

Window_Base.prototype.findSceneBitmapFontIndex = function(){
    const sceneName = SceneManager._scene.constructor.name
    const sceneFontIndex = Plugin.param().fonts.findIndex(font => font.sceneList.includes(sceneName))

    return sceneFontIndex
}

Window_Base.prototype.findWindowBitmapFontIndex = function(){
    const winName = this.constructor.name
    const winFontIndex = Plugin.param().fonts.findIndex(font => font.windowList.includes(winName))

    return winFontIndex
}

Window_Base.prototype.setBitmapFontFace = function() {
    this.contents.bitmapFontIndex = this.findBitmapFontIndex()
}

Window_Base.prototype.resetBitmapFontSettings = function() {
    this.contents.bitmapFontSize = 1
    this.contents.fontSize = this.contents.fontBitmap().height
}

Window_Base.prototype.resetBitmapTextColor = function(){
    this.changeTextColor(this.contents.fontBitmap().textColor || this.normalColor())
    this.contents.outlineColor = this.contents.fontBitmap().outlineColor || "black"
}

/* ----------------------------- PLUGIN COMMANDS ---------------------------- */
Alias.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args){
    Alias.Game_Interpreter_pluginCommand.call(this, command, args)
    if(command.toUpperCase() === "BITMAPFONT"){
        Plugin.executePluginCommandMV(args)
    }
}

}