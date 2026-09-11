//==============================================================================
// Eli_CustomNewGame.js
//==============================================================================

/*:
@plugindesc ♦1.0.0♦ Adds transfer to a new map in new game command.
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

• Make the new game command on the title screen transfer the player to 
another map set on the plugin parameters.
• Skip the title screen when the game boots.

==============================================================================
How to use
==============================================================================

First, set up the plugin parameters.

♦ Plugin Command: Start On Custom Map ♦

• If you are using custom maps before the title screen, but you are 
EVENTING your title screen, you have to use the script call:

• Eli.CustomNewGame.cmd_setup()

Otherwise, whenever you go to the title screen, the new game will transfer 
the player to the custom map.

============================================================================
Update Log
============================================================================

https://tinyurl.com/customNewGame

============================================================================

@param skipTitle
@text Skip Title
@type boolean
@desc Set this to true if you want to skip the title screen by default.
@default true

@param mapId
@text Map Id
@type text
@desc The map id which the player will be transfered. Set 0 to not use.
@default 1

@param x
@text Coordinate X
@type text
@desc A valid X position on the map.
@default 1

@param y
@text Coordinate Y
@type text
@desc A valid Y position on the map.
@default 1

@param direction
@text Direction
@type select
@option 2-Down
@value 2
@option 4-Left
@value 4
@option 6-Right
@value 6
@option 8-Up
@value 8
@desc Choose the initial direction that the player will be facing after the transfer.
@default 2

@param fadeType
@text Fade Type
@type select
@option 0-Black
@value 0
@option 1-White
@value 1
@option 2-None
@value 2
@desc Choose the fade type that will be used for the transfer.
@default 0

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_CustomNewGame = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

Eli.CustomNewGame = {

    version: 5.01,
    url: "https://hakuenstudio.itch.io/eli-customnewgame-rpg-maker-mv",
    parameters: {skipTitle: false, mapId: 0, x: 0, y: 0, direction: 0, fadeType: 0},
    alias: {},
    customMapTransfer: false,

    initialize(){
        this.initParameters()
        this.initPluginCommands()
    },

    initParameters(){
        const parameters = Eli.PluginManager.createParameters()
        this.parameters = parameters
    },

    initPluginCommands(){},

    setSkipTitle(value){
        this.parameters.skipTitle = value
    },

    canSkipTitle(sceneClass){
        return this.parameters.skipTitle && sceneClass === Scene_Title
    },

    setCustomMapTransfer(value){
        this.customMapTransfer = value
    },

    canTransferToCustomMap(){
        return this.customMapTransfer && this.parameters.mapId > 0
    },

    param(){
        return this.parameters
    },

    cmd_setup(){
        this.setCustomMapTransfer(true)
        DataManager.setupNewGame()
    },

}

const Plugin = Eli.CustomNewGame
const Alias = Eli.CustomNewGame.alias

Plugin.initialize()

/* ------------------------------ SCENE MANAGER ----------------------------- */
{

Alias.SceneManager_goto = SceneManager.goto
SceneManager.goto = function(sceneClass) {
    if(Plugin.canSkipTitle(sceneClass)){
        Plugin.setSkipTitle(false)
        sceneClass = Scene_Map
    } 
    Alias.SceneManager_goto.call(this, sceneClass)
}

}

/* ------------------------------- GAME PLAYER ------------------------------ */
{

Alias.Game_Player_reserveTransfer = Game_Player.prototype.reserveTransfer
Game_Player.prototype.reserveTransfer = function(mapId, x, y, d, fadeType) {
    if(Plugin.canTransferToCustomMap()){
        this.reserveTransferToCustomNewGame()
    }else{
        Alias.Game_Player_reserveTransfer.call(this, mapId, x, y, d, fadeType)
    }
}

Game_Player.prototype.reserveTransferToCustomNewGame = function(){
    const {mapId, x, y, direction, fadeType} = Plugin.param()
    this._transferring = true
    this._newMapId = mapId
    this._newX = x
    this._newY = y
    this._newDirection = direction
    this._fadeType = fadeType
    Plugin.setCustomMapTransfer(false)
}

}

/* ------------------------------- SCENE TITLE ------------------------------ */
{

Alias.Scene_Title_commandNewGame = Scene_Title.prototype.commandNewGame
Scene_Title.prototype.commandNewGame = function() {
    Plugin.setCustomMapTransfer(true)
    Alias.Scene_Title_commandNewGame.call(this)
}

}

}