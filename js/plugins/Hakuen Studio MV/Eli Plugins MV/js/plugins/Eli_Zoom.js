//==========================================================================
// Eli_Zoom.js
//==========================================================================

/*:
@plugindesc ♦1.0.0♦ Add the default zoom feature to plugin command.
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

● Zoom in events, players, or followers.
● Zoom in a screen position(pixel).
● Zoom in a map position(tiles).

============================================================================
How to use
============================================================================

Just use the plugin commands:

ZoomChar CharacterId Scale Duration
ZoomScreen Px Py Scale Duration
ZoomTile x y Scale Duration
ZoomClear

ZoomScreen will zoom on pixel coordinates.
ZoomTile will zoom on tile coordinates.

On ZoomChar, replace character id with the following:
-2 = First Follower
-3 = Second Follower, etc...
-1 = Player
0 = This event
1 and higher = Event Id

============================================================================
Update Log
============================================================================

https://tinyurl.com/zoomPluginLog

============================================================================

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_Zoom = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

Eli.Zoom = {

    version: 5.00,
    url: "https://hakuenstudio.itch.io/eli-zoom-for-rpg-maker-mz",
    parameters: {},
    alias: {},

    initialize(){
        this.initParameters()
        this.initPluginCommands()
    },

    initParameters(){
        const parameters = Eli.PluginManager.createParameters()
        this.parameters = parameters
    },

    initPluginCommands(){},

    getCharacterById(id){
        if(id >= 0){
            return $gameMap.event(id)

        } else if(id == -1){
            return $gamePlayer

        }else if(id < -1){
            return $gamePlayer.followers()._data[Math.abs(id + 2)]

        }else{
            return $gameMap.vehicles().find(item => item._type === id.toLowerCase())
        }
    },

    zoomChar(args){
        const objArgs = {
            character: args[0],
            scale: args[1],
            duration: args[2],
            offset: `${args[3] || 0}, ${args[4] || 0}`
        }
        const {scale, duration} = objArgs
        const id = Eli.Utils.convertEscapeVariablesOnly(objArgs.character)
        const character = this.getCharacterById(id)
        const [offsetX, offsetY] = objArgs.offset.split(",").map(item => Number(item))
        const x = character.screenX() + offsetX
        const y = character.screenY() + offsetY
        
        $gameScreen.startZoom(x, y, Number(scale), Number(duration))
    },

    zoomScreen(args){
        const objArgs = {
            x: args[0],
            y: args[1],
            scale: args[2],
            duration: args[3]
        }
        const {scale, duration} = objArgs
        const x = Number(Eli.Utils.processEscapeVarOrFormula(objArgs.x))
        const y = Number(Eli.Utils.processEscapeVarOrFormula(objArgs.y))
        
        $gameScreen.startZoom(x, y, Number(scale), Number(duration) )
    },

    zoomCoordinates(args){
        const objArgs = {
            x: args[0],
            y: args[1],
            scale: args[2],
            duration: args[3]
        }
        const {scale, duration} = objArgs
        const x = Number(Eli.Utils.processEscapeVarOrFormula(objArgs.x)) * $gameMap.tileWidth()
        const y = Number(Eli.Utils.processEscapeVarOrFormula(objArgs.y)) * $gameMap.tileHeight()
        
        $gameScreen.startZoom(x, y, Number(scale), Number(duration) )
    },

    clearZoom(){
        $gameScreen.clearZoom()
    },

    executeCommandMV(command, args){
        const cmdList = {
            ZOOMCHAR: "zoomChar",
            ZOOMSCREEN: "zoomScreen",
            ZOOMTILE: "zoomCoordinates",
            ZOOMCLEAR: "clearZoom"
        }
        const cmd = cmdList[command.toUpperCase()]

        if(this[cmd]){
            this[cmd](args)
        }
    },
    
}

const Plugin = Eli.Zoom
const Alias = Eli.Zoom.alias

Plugin.initialize()

/* ---------------------------- GAME INTERPRETER ---------------------------- */
{

Alias.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function (command, args) {
Alias.Game_Interpreter_pluginCommand.call(this, command, args)
    Plugin.executeCommandMV(command, args)
}

}

}