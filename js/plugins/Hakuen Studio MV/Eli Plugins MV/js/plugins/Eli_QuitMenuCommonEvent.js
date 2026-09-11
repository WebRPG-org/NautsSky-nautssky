//============================================================================
// Eli_QuitMenuCommonEvent.js
//============================================================================

/*:
@plugindesc ♦1.0.0♦ Play a common event when the menu is closed.
@author Hakuen Studio

@help 
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
Patreon      → https://www.patreon.com/hakuenstudio
Rate Plugin  → https://hakuenstudio.itch.io/eli-quitmenucommonevent-rpg-maker-mv/rate?source=game
Terms of Use → https://www.hakuenstudio.com/terms-of-use-5-0-0
Facebook     → https://www.facebook.com/hakuenstudio
Instagram    → https://www.instagram.com/hakuenstudio
Twitter      → https://twitter.com/hakuen_studio
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
==============================================================================
Features
==============================================================================

Play a common event on the map scene every time the player closes/exits 
the menu.

==============================================================================
How to use
==============================================================================

https://docs.google.com/document/d/1M1JTulBhpddr0U8CS9AfSDxQ2mNchLqtsxkxdLqV-T0/edit?usp=sharing

============================================================================

@param commonEventId
@text Common Event Id
@type common_event
@desc Select here the common event to play when leaves the menu.
@default 0

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_QuitMenuCommonEvent = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

Eli.QuitMenuCommonEvent = {

    version: 5.02,
    url: "https://hakuenstudio.itch.io/eli-quitmenucommonevent-rpg-maker-mv",
    parameters: {commonEventId: 0},
    alias: {},

    initialize(){
        this.initParameters()
        this.initPluginCommands()
    },

    initParameters(){
        const parameters = PluginManager.parameters("Eli_QuitMenuCommonEvent")
        this.parameters.commonEventId = Number(parameters.commonEventId)
    },

    initPluginCommands(){},

    param(){
        return this.parameters
    },

}

const Plugin = Eli.QuitMenuCommonEvent
const Alias = Eli.QuitMenuCommonEvent.alias

Plugin.initialize()

/* ------------------------------ SCENE MANAGER ----------------------------- */

Alias.SceneManager_goto = SceneManager.goto
SceneManager.goto = function(sceneClass) {
    Alias.SceneManager_goto.call(this, sceneClass)
    this.reserveQuitMenuCommonEvent(sceneClass)
}

SceneManager.reserveQuitMenuCommonEvent = function(sceneClass){
    const isOnSceneMap = this._scene && this._scene.constructor.name === "Scene_Map"
    const isGoingToSceneMenu = sceneClass && sceneClass === Scene_Menu
    if(isOnSceneMap && isGoingToSceneMenu){
        const id = Plugin.param().commonEventId
        $gameTemp.reserveCommonEvent(id)
    }
}

Alias.Scene_ItemBase_checkCommonEvent = Scene_ItemBase.prototype.checkCommonEvent
Scene_ItemBase.prototype.checkCommonEvent = function() {
    if($gameTemp._commonEventId !== Plugin.param().commonEventId){
        Alias.Scene_ItemBase_checkCommonEvent.call(this)
    }
}

}