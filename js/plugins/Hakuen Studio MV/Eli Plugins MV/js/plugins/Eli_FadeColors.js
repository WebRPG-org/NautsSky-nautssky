//==========================================================================
// Eli_FadeColors.js
//==========================================================================

/*:
@plugindesc ♦1.0.0♦ Colorful fade in/out when map transfer!
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

• Change the fade-out/in colors when transfer map.
• Change the duration of the fade-out/in when transfer map.

============================================================================
How to use
============================================================================

Configure the plugin parameters to define a default color for the fade and 
duration when performing the map transfer.

● Fade for map transfer

You can define a color for the fade transfer on each map, through the note 
field.

<FadeColor: myColor> *It is case sensitive!

You can use RGB, hex, or Html colors:
<FadeColor: 0,30,85> (RGB)
<FadeColor: #ffffff> (HEX)
<FadeColor: red> (HTML)

So, if you set up a color "blue" for map 1, when you perform a transfer, 
if the next map doesn't have a note tag for the color, it will stay 
always blue (until the player goes to a map that has another fade color 
note tag).

● Fade plugin command

You can also use colorful fades in/out in the event via plugin commands.
There, you can always customize a different color and duration if you 
want.
If you leave it blank, it will take the default color and duration in 
plugin parameters. But the only reason I see for using that is if you 
want to cover pictures on the screen because the tint screen does not 
cover them.

Note: This does not work like the default fade-out/in from the event 
commands. If you change the scene while faded out, when you return back 
the fade will be gone.

============================================================================
Update Log
============================================================================

https://tinyurl.com/fadeColors

============================================================================

@param defaultColor
@text Default Color
@type text
@desc Choose the default color for the fade. You can use hex, html or rgb.
@default 0,0,0

@param duration
@text Duration
@type text
@desc Choose the default duration for the fade.
@default 24

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_FadeColors = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

Eli.FadeColors = {

    version: 5.01,
    url: "https://hakuenstudio.itch.io/eli-fade-colors-for-rpg-maker-mz",
    parameters: {defaultColor: "", duration: 0},
    alias: {},

    initialize(){
        this.initParameters()
        this.initPluginCommands()
    },

    initParameters(){
        this.parameters = Eli.PluginManager.createParameters()
        this.parameters.defaultColor = Eli.ColorManager.getRgb(this.parameters.defaultColor) || [0, 0, 0]
    },

    initPluginCommands(){},

    param(){
        return this.parameters
    },

    fadeIn(args){
        args.duration = args.duration || this.parameters.duration
        args.color = args.color || this.parameters.defaultColor

        $gameSystem.setFadeColor(args.color)
        $gameScreen.startFadeIn(Number(args.duration))
    },

    fadeOut(args){
        args.duration = args.duration || this.parameters.duration
        args.color = args.color || this.parameters.defaultColor

        $gameSystem.setFadeColor(args.color)
        $gameScreen.startFadeOut(Number(args.duration))
    },

    executePluginCommandMV(command, mvArgs){
        const cmdList = {
            FADECOLORIN: "fadeIn",
            FADECOLOROUT: "fadeOut",
        }
        const cmd = cmdList[command.toUpperCase()]
        if(this[cmd]){
            if(mvArgs[1].includes("_")){
                mvArgs[1] = Eli.String.replaceAll(mvArgs[1], "_", ",")
            }
            const mzArgs = {
                duration: mvArgs[0],
                color: mvArgs[1],
            }
            this[cmd](mzArgs)
        }
    },

}

const Plugin = Eli.FadeColors
const Alias = Eli.FadeColors.alias

Plugin.initialize()

/* ------------------------------- GAME SYSTEM ------------------------------ */
{

Alias.Game_System_initialize = Game_System.prototype.initialize
Game_System.prototype.initialize = function() {
    Alias.Game_System_initialize.call(this)
    this._fadeColor = Plugin.param().defaultColor
}

Game_System.prototype.setFadeColor = function(color){
    this._fadeColor = Eli.ColorManager.getRgb(color)
}

Game_System.prototype.fadeColor = function(){
    return this._fadeColor || Plugin.param().defaultColor
}

}

/* ---------------------------- GAME INTERPRETER ---------------------------- */
{

Alias.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args){
    Alias.Game_Interpreter_pluginCommand.call(this, command, args)
    Plugin.executePluginCommandMV(command, args)
}

}

/* ----------------------------- SPRITE SET BASE ---------------------------- */
{

Alias.Spriteset_Base_updateScreenSprites = Spriteset_Base.prototype.updateScreenSprites
Spriteset_Base.prototype.updateScreenSprites = function() {
    this._fadeSprite.setColor(...$gameSystem.fadeColor())
    Alias.Spriteset_Base_updateScreenSprites.call(this)
}

}

/* ------------------------------- SCENE BASE ------------------------------- */
{

Alias.Scene_Base_createFadeSprite = Scene_Base.prototype.createFadeSprite
Scene_Base.prototype.createFadeSprite = function(white) {
    Alias.Scene_Base_createFadeSprite.call(this, white)
    this._fadeSprite.setColor(...$gameSystem.fadeColor())
}

Scene_Base.prototype.fadeSpeed = function() {
    return Plugin.param().duration
}

}

/* -------------------------------- SCENE MAP ------------------------------- */
{

Alias.Scene_Map_beforeStartAndTransferIsOn = Scene_Map.prototype.beforeStartAndTransferIsOn
Scene_Map.prototype.beforeStartAndTransferIsOn = function(){
    Alias.Scene_Map_beforeStartAndTransferIsOn.call(this)
    this.setFadeColor()
}

Scene_Map.prototype.setFadeColor = function(){
    if(!Utils.isOptionValid('etest') && $dataMap && $dataMap.meta.FadeColor){
        $gameSystem.setFadeColor(Eli.String.removeSpaces($dataMap.meta.FadeColor))
    }
}

}

}