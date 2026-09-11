//============================================================================
// Eli_ClassPromotion.js
//============================================================================

/*:
@plugindesc ♦1.0.0♦ Promote actors to different class and apply bonus!
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
Plugin Requirements
==============================================================================

Need Eli_ClassCurves
Order After Eli_CapParameterControl

==============================================================================
Features
==============================================================================

• Apply stats bonus to actors when they change class for the first time.

==============================================================================
How to use
==============================================================================

It's almost plug and play.
You just have to config the bonus parameter on the Eli Class Curves plugin 
parameters.

Currently, it was made to when a battler change class, it will return to 
level 1 having the same stats from the previous class, but with a stats, 
bonus applied for each parameter. 

Actors can keep changing classes whatever they want, but the bonus will 
be only applied once.

If you want enemies to have this feature, you have to put a note tag on 
the enemy note field(Must use Eli Enemy Class):
<CanPromote>

Script Call

You can use this to check if an actor can promote to a class:

$gameActors.actor(ID).canPromoteClass(classId)

It will return true if the actor can promote to this class, which means, 
he was never promoted to it before.

Can use the same for the enemy.

• $gameActors.actor(ID).curveBonus(paramId, isCustom, classId) - 
Returns the bonus value for the parameter and class informed.

============================================================================
Update Log
============================================================================

https://tinyurl.com/classPromotion

============================================================================

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_ClassPromotion = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

Eli.ClassPromotion = {

    version: 5.02,
    url: "https://hakuenstudio.itch.io/eli-class-promotion",
    parameters: {},
    alias: {},

    initialize(){
        this.initParameters()
        this.initPluginCommands()
    },

    initParameters(){},

    initPluginCommands(){},

    param(){
        return this.parameters
    },

}

const Plugin = Eli.ClassPromotion
const Alias = Eli.ClassPromotion.alias

Plugin.initialize()

/* ------------------------------ CLASS CURVES ------------------------------ */
{

Alias.Eli_ClassCurves_makeNewClassHistory = Eli.ClassCurves.makeNewClassHistory
Eli.ClassCurves.makeNewClassHistory = function(){
    const history = Alias.Eli_ClassCurves_makeNewClassHistory.call(this)
    history.isPromoted = false
    return history
}

}

/* ------------------------------ GAME BATTLER ------------------------------ */
{
    
Alias.Game_Battler_initParamHistory = Game_Battler.prototype.initParamHistory 
Game_Battler.prototype.initParamHistory = function(classId = this._classId){
    Alias.Game_Battler_initParamHistory.call(this, classId)
    this._classHistory[classId].isPromoted = false
}

Alias.Game_Battler_buildNewClassHistory = Game_Battler.prototype.buildNewClassHistory
Game_Battler.prototype.buildNewClassHistory = function(classId, targetLevel){
    if(Imported.YEP_ClassChangeCore && SceneManager._scene instanceof Scene_Class){
        this.buildNewClassHistoryInSceneClass(classId, targetLevel)
        
    }else{
        Alias.Game_Battler_buildNewClassHistory.call(this, classId, targetLevel)
        this._classHistory[classId].isPromoted = true 
    }
}

Alias.Game_Battler_setupMainClass = Game_Battler.prototype.setupMainClass
Game_Battler.prototype.setupMainClass = function(actorId){
    Alias.Game_Battler_setupMainClass.call(this, actorId)
    this._classHistory[this._classId].isPromoted = true
}

Alias.Game_Battler_fillFirstLevelHistory = Game_Battler.prototype.fillFirstLevelHistory
Game_Battler.prototype.fillFirstLevelHistory = function(isCustom, classId){
    if(this.canPromoteClass(classId)){
        this.fillFirstLevelHistoryPromotion(isCustom, classId)
        
    }else{
        Alias.Game_Battler_fillFirstLevelHistory.call(this, isCustom, classId)
    }
}

Game_Battler.prototype.curveBonus = function(id, isCustom, classId = this._classId){
    const curve = Eli.ClassCurves.getClassCurve(classId, isCustom);
    const param = curve[id]['bonus']

    return this.evaluateParameter(param)
}

Game_Battler.prototype.isMainClass = function(classId = this._classId){
    if(this.isActor()){
        return classId === $dataActors[this._actorId].classId

    }else if(this._classId > 0){
        return classId == +this.enemy().meta.ClassId
    }
}

Game_Battler.prototype.canPromoteClass = function(classId = this._classId){
    if(this.isActor()){
        return !this._classHistory[classId].isPromoted
    }else{
        return !this._classHistory[classId].isPromoted && this.enemy().meta.hasOwnProperty("CanPromote")
    }
    
}

Game_Battler.prototype.buildNewClassHistoryInSceneClass = function(classId, targetLevel){
    if(this.canInitNewClassHistory(classId)){
        this.initParamHistory(classId)
    }

    if(this.canPromoteClass(classId)){
        this.fillFirstLevelHistory(false, classId)
        
        if(Imported.Eli_CustomParameter){
            this.fillFirstLevelHistory(true, classId)
        }
    }

    for(let i = 2; i <= targetLevel; i++){
        this.levelUpHistory(classId, i)
    }
    
    if(Imported.Eli_CustomParameter){

        for(let i = 2; i <= targetLevel; i++){
            this.levelUpHistory(classId, i)
        }
    }
}

Game_Battler.prototype.fillFirstLevelHistoryPromotion = function(isCustom, classId){
    const history = this.getHistoryByType(isCustom, classId)

    for(let i = 0; i < history.length; i++){
        const id = i;
        const currentParam = isCustom ? this.cparamBase(i) : this.paramBase(i)
        const bonus = this.curveBonus(id, isCustom, classId)
        const initialParam = currentParam + bonus
        const level = 1
        history[id][level] = initialParam
    }

    this._classHistory[classId].level = 1
}

}

/* ---------------------------- CLASS CHANGE CORE --------------------------- */
if(Imported.YEP_ClassChangeCore){

/* ------------------------------- SCENE CLASS ------------------------------ */
{

Alias.Scene_Class_refreshActor = Scene_Class.prototype.refreshActor
Scene_Class.prototype.refreshActor = function() {
    var actor = this.actor()
    if(actor){
       const unlockedClasses = actor.unlockedClasses()
       for(let i = 0; i < unlockedClasses.length; i++){
           const classId = unlockedClasses[i]
           actor.prepareClass(classId, Yanfly.Param.CCCMaintainLv)
       }
    }
    Alias.Scene_Class_refreshActor.call(this)
}

Scene_Class.prototype.onItemOk = function() {
    SoundManager.playEquip()
    const classId = this._itemWindow.item()
    const hpRate = Number(((this.actor().hp * 100) / this.actor().mhp).toFixed(2))  
    const mpRate = Number(((this.actor().mp * 100) / this.actor().mmp).toFixed(2))    

    this.actor().changeClass(classId, Yanfly.Param.CCCMaintainLv)

    // Inserted this line below
    this.actor()._classHistory[classId].isPromoted = true
 
    const hpAmount = Number(((this.actor().mhp * hpRate) / 100).toFixed(0))
    const mpAmount = Number(((this.actor().mmp * mpRate) / 100).toFixed(0))

    this.actor().setHp(hpAmount)
    this.actor().setMp(mpAmount)
    this._itemWindow.activate()
    this.refreshWindows()
}

}

/* --------------------------- WINDOW SKILL STATUS -------------------------- */
{
// The copied actor will also follow the MaintanLv parameter rule
Window_ClassList.prototype.updateCompare = function() {
    if (this._actor && this.item() && this._statusWindow) {
        var actor = JsonEx.makeDeepCopy(this._actor);
        if (this.isEnabled(this.item())) {
            Yanfly.CCC.PreventReleaseItem = true;
            actor.changeClass(this.item(), Yanfly.Param.CCCMaintainLv);
            Yanfly.CCC.PreventReleaseItem = undefined;
        }
        this._statusWindow.setTempActor(actor);
    }
}

}

}

}