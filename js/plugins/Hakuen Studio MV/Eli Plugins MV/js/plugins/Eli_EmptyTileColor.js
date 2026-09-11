//==========================================================================
// Eli_EmptyTileColor.js
//==========================================================================

/*:

@plugindesc ♦1.0.0♦ Change the empty tile color.
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

• Change the blank/empty tile color.

============================================================================
How to use
============================================================================

Just put the plugin and set up the plugin parameter.

You can change the colors on game with script calls:

const args = {color: "ANY COLOR HERE"}
Eli.EmptyTileColor.changeColor(args)

• Example using RGB:

const args = {color: "150, 140, 20"}
Eli.EmptyTileColor.changeColor(args)

• Example using name colors:

const args = {color: "red"}
Eli.EmptyTileColor.changeColor(args)

• Example using hex:

const args = {color: "#ffffff"}
Eli.EmptyTileColor.changeColor(args)

NOTE: I didn't test it on mobile, don't know if it will change the black 
border color too. Or if, pherhaps, I have to change the background color 
of the index.html.

============================================================================
Update Log
============================================================================

https://tinyurl.com/emptyTileColor

============================================================================

@param color
@text Color
@type text
@desc Set here the color for the blank sprites. You can use rgb, html and hex.
@default 0, 0, 255

@command changeColor
@text Color
@desc Set here the color for the blank sprites. 
You can use rgb, html and hex.

    @arg color
    @text Color
    @type text
    @desc If using rgb, separate each color with a comma. 
    Ex: 150, 140, 20
    @default 0, 0, 0

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_EmptyTileColor = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */

{

Eli.EmptyTileColor = {

    version: 5.00,
    url: "https://hakuenstudio.itch.io/eli-empty-tile-colors-for-rpg-maker-mz",
    parameters: {color: "0, 0, 255"},
    alias: {},

    initialize(){
        this.initParameters()
        this.initPluginCommands()
    },

    initParameters(){
        this.parameters = Eli.PluginManager.createParameters()
    },

    initPluginCommands(){},

    param(){
        return this.parameters
    },

    changeColor(args){
        const blackScreen = SceneManager._scene._spriteset._blackScreen
        const color = Eli.ColorManager.getRgb(args.color)
        this.parameters.color = args.color
        blackScreen.setColor(...color)
    },

}

const Plugin = Eli.EmptyTileColor
const Alias = Eli.EmptyTileColor.alias

Plugin.initialize()

/* ----------------------------- SPRITESET BASE ----------------------------- */
{

Alias.Spriteset_Base_createBaseSprite = Spriteset_Base.prototype.createBaseSprite
Spriteset_Base.prototype.createBaseSprite = function() {
    Alias.Spriteset_Base_createBaseSprite.call(this)
    const color = Eli.ColorManager.getRgb(Plugin.param().color)
    this._blackScreen.setColor(...color)
}

}

}