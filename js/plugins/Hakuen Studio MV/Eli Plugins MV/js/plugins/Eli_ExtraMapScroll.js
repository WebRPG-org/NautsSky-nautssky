//==========================================================================
// Eli_ExtraMapScroll.js
//==========================================================================

/*:
@plugindesc ♦1.0.0♦ Can add extra distance/space to the map scroll.
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

● Adds extra tile space for the map to scroll.

==============================================================================
How to use
==============================================================================

Put a note tag on your map notes:
<ExtraScroll: x, y>

Replace X and Y with the extra scroll value.

You can also set only <ExtraScroll> - Then it will take the plugin 
parameter value.

If you put, for example, 3 at the "x", even 
if your map has a width of 15, it will scroll like it has 18 of width.

============================================================================
Update Log
============================================================================

https://tinyurl.com/extraMapScroll

============================================================================

@param distanceX
@text The X distance off screen
@type number
@desc Choose the default extra X scroll distance.
@default 2

@param distanceY
@text The Y distance off screen
@type number
@desc Choose the default extra Y scroll distance.
@default 6

@param alwaysActive
@text Always Active
@type boolean
@desc If true, the plugin will always be enabled, without the need of setting note tags.
@default true

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_ExtraMapScroll = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

Eli.ExtraMapScroll = {

    version: 5.00,
    url: "https://hakuenstudio.itch.io/extra-map-scroll-for-rpg-maker-mz",
    parameters: {distanceX: 0, distanceY: 0, alwaysActive: false},
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

    calculateExtraScroll(){
        let extraScroll = $dataMap.meta.ExtraScroll

        if(typeof extraScroll === "string"){
            extraScroll = extraScroll.split(',').map(coord => Number(coord))
            
        }else{
            const {distanceX, distanceY} = this.param()
            extraScroll = [distanceX, distanceY]
        }

        return {x: extraScroll[0], y: extraScroll[1]}
    }

}

const Alias = Eli.ExtraMapScroll.alias
const Plugin = Eli.ExtraMapScroll

Plugin.initialize()

/* -------------------------------- GAME MAP -------------------------------- */
{

Alias.Game_Map_initialize = Game_Map.prototype.initialize
Game_Map.prototype.initialize = function(){
    this.extraScroll = {x: 0, y: 0}
    Alias.Game_Map_initialize.call(this)
}

Alias.Game_Map_setup = Game_Map.prototype.setup
Game_Map.prototype.setup = function(mapId){
    Alias.Game_Map_setup.call(this, mapId)
    if(this.canExtraScroll()){
        this.setupExtraScroll()
    }
}

Alias.Game_Map_scrollDown = Game_Map.prototype.scrollDown
Game_Map.prototype.scrollDown = function(distance){
    if(this.canUpDownScroll()){
        this.adjustExtraScrollDown(distance)
    }else{
        Alias.Game_Map_scrollDown.call(this, distance)
    }
}

Alias.Game_Map_scrollLeft = Game_Map.prototype.scrollLeft
Game_Map.prototype.scrollLeft = function(distance){
    if(this.canSideScroll()){
        this.adjustExtraScrollLeft(distance)
    }else{
        Alias.Game_Map_scrollLeft.call(this, distance)
    }
}

Alias.Game_Map_scrollRight = Game_Map.prototype.scrollRight
Game_Map.prototype.scrollRight = function(distance){
    if(this.canSideScroll()){
        this.adjustExtraScrollRight(distance)
    }else{
        Alias.Game_Map_scrollRight.call(this, distance)
    }
}

Alias.Game_Map_scrollUp = Game_Map.prototype.scrollUp
Game_Map.prototype.scrollUp = function(distance){
    if(this.canUpDownScroll()){
        this.adjustExtraScrollUp(distance)
    }else{
        Alias.Game_Map_scrollUp.call(this, distance)
    }
}

Game_Map.prototype.calculateScreenTileX = function(){
    return Math.round((Graphics.width / this.tileWidth()) * 16) / 16
}

Game_Map.prototype.calculateScreenTileY = function(){
    return Math.round((Graphics.height / this.tileHeight()) * 16) / 16
}

Game_Map.prototype.setupExtraScroll = function(){
    this._screenTileX = this.calculateScreenTileX()
    this._screenTileY = this.calculateScreenTileY()
    this.extraScroll = Plugin.calculateExtraScroll()
}

Game_Map.prototype.adjustExtraScrollDown = function(distance){
    const [displayY, parallaxY] = this.calculateExtraDisplayYDown(distance)

    this._displayY = displayY
    this._parallaxY += parallaxY
}

Game_Map.prototype.adjustExtraScrollLeft = function(distance){
    const [displayX, parallaxX] = this.calculateExtraDisplayXLeft(distance)

    this._displayX = displayX
    this._parallaxX += parallaxX
}

Game_Map.prototype.adjustExtraScrollRight = function(distance){
    const [displayX, parallaxX] = this.calculateExtraDisplayXRight(distance)

    this._displayX = displayX
    this._parallaxX += parallaxX
}

Game_Map.prototype.adjustExtraScrollUp = function(distance){
    const [displayY, parallaxY] = this.calculateExtraDisplayYUp(distance)

    this._displayY = displayY
    this._parallaxY += parallaxY
}

Game_Map.prototype.calculateExtraDisplayYDown = function(distance){
    const lastDisplayY = this._displayY
    const distanceY = this.height() - this._screenTileY + this.getExtraScrollY()
    const displayY = Math.min(this._displayY + distance, distanceY)
    const parallaxY = this._displayY - lastDisplayY

    return [displayY, parallaxY]
}

Game_Map.prototype.calculateExtraDisplayXLeft = function(distance){
    const lastDisplayX = this._displayX
    const displayX = Math.max(this._displayX - distance, - this.getExtraScrollX())
    const parallaxX = this._displayX - lastDisplayX

    return [displayX, parallaxX]
}

Game_Map.prototype.calculateExtraDisplayXRight = function(distance){
    const lastDisplayX = this._displayX
    const distanceX = this.width() - this._screenTileX + this.getExtraScrollX()
    const displayX = Math.min(this._displayX + distance, distanceX)
    const parallaxX = this._displayX - lastDisplayX

    return [displayX, parallaxX]
}

Game_Map.prototype.calculateExtraDisplayYUp = function(distance){
    const lastDisplayY = this._displayY
    const displayY = Math.max(this._displayY - distance, - this.getExtraScrollY())
    const parallaxY = this._displayY - lastDisplayY

    return [displayY, parallaxY]
}

Game_Map.prototype.getExtraScrollX = function(){
    return this.extraScroll.x
}

Game_Map.prototype.getExtraScrollY = function(){
    return this.extraScroll.y
}

Game_Map.prototype.canExtraScroll = function(){
    return $dataMap.meta.hasOwnProperty('ExtraScroll') || Plugin.param().alwaysActive
}

Game_Map.prototype.canSideScroll = function(){
    return !this.isLoopHorizontal() && this.width() >= this.screenTileX() && 
            this.canExtraScroll()
}

Game_Map.prototype.canUpDownScroll = function(){
    return !this.isLoopVertical() && this.height() >= this.screenTileY() && 
            this.canExtraScroll()
}

}

}