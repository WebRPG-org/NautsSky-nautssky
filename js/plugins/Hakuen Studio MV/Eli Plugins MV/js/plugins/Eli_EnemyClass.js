//============================================================================
// Eli_EnemyClass.js
//============================================================================

/*:
@plugindesc ♦1.0.0♦ Add class, equips, level and exp to Enemies!
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
Plugin Requirements
============================================================================

Order Before Eli_ClassCurves
Order Before Yep_ElementCore

============================================================================
Features
============================================================================

● Enemies can have classes!
● Enemies have levels!
● Enemies have Exp!
● Enemies can equip weapons/armors!

============================================================================
How to use
============================================================================

♦ NOTE TAGS ♦

To assign a class to an enemy you have to use a note tag:

• <ClassId: ID> - Replace ID with the class id you want.

Optionally, you can set the initial level and max level of the enemy:

• <InitialLevel: 1> - If you don't use it, it will be 1 by default.
• <MaxLevel: 99> - if you don't use it, it will be 99 by default.

You can also, optionally, set the initial equipment for the enemy:

• <Equips: Slot:EquipId, Slot:EquipId>

<Equips: 1:13, 3:4> - Slot 1 will be equipped with a weapon/armor of id 13.
- Slot 3 will be equipped with a weapon/armor of id 4.

You just need to separate slot and id with ":" and each of them with ",", 
in case you want to set more than one piece of equipment to the enemy.

*** Just remember that on note tags, the first slot id is equal to 1.
But on script calls, the first slot id is equal to 0.

         ***ATTENTION! All notes are case sensitive!***

♦ SCRIPT CALLS ♦

You can manage the enemy equipment, level, and Exp just like actors. 
I mean, using the same script calls.

To equip a actor with a weapon:

$gameActors.actor(id).changeEquip(slotId, weapon/armor)

$gameActors.actor(1).changeEquip(0, $dataWeapons[13])
OR
$gameParty.members()[0].changeEquip(0, $dataWeapons[13])

So, for the enemies, you can either equip them by default with the note 
tags, or use the script call to equip them with other pieces of equipment 
when the battle starts:

$gameTroop.members()[memberIndex].changeEquip(slotId, weapon/armor)
$gameTroop.members()[memberIndex].levelUp()
$gameTroop.members()[memberIndex].levelDown()
$gameTroop.members()[memberIndex].changeLevel(level)
$gameTroop.members()[memberIndex].changeClass(classId)

etc...

==============================================================================
Update Log
==============================================================================

https://tinyurl.com/enemyClass

==============================================================================

@param equipRules
@text Equip Rules
@type boolean
@desc Choose if you want enemies to follow equip rules.
If not, they will be able to equip everything.
@default false

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_EnemyClass = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

Eli.EnemyClass = {

    version: 5.00,
    url: "https://hakuenstudio.itch.io/eli-enemy-class-for-rpg-maker",
    parameters: {equipRules: false},
    alias: {},

    initialize(){
        this.initParameters()
        this.initPluginCommands()
        this.addLevelPropertyToEnemy()
    },

    initParameters(){
        this.parameters = Eli.PluginManager.createParameters()
    },

    initPluginCommands(){},

    addLevelPropertyToEnemy(){
        Object.defineProperty(Game_Enemy.prototype, 'level', {
            get: function() {
                return this._level
            },
            configurable: true
        })
    },

    param(){
        return this.parameters
    },

    processLevelChange(operation, member, level){
        switch(operation){
            case 'up':
                member.changeLevel(member._level + level)
                break
            case 'down':
                member.changeLevel(member._level - level)
                break
            case 'set':
                member.changeLevel(level)
                break
        }
    },

    createIndexList(indexString){
        if(indexString.includes('-1')){
            return Array.from({length: $gameTroop.members().length}, (_, i) => i)
        }else{
            return indexString.split(',').map(item => Number(item))
        }
    },

    cmd_changeLevelByIndex(args){
        const level = Math.abs(Number(args.level))
        const indexList = this.createIndexList(args.index)

        for(const index of indexList){
            const member = $gameTroop.members()[index]

            if(member && member.isAlive()){
                this.processLevelChange(args.operation, member, level)
            }
        }
    },

    cmd_changeLevelById(args){
        const level = Math.abs(Number(args.level))
        const targetId = Number(args.enemyId)
        const isForAll = args.isForAll === 'true'
        
        const enemyTroop = $gameTroop.members()
        const getEnemy = member => member.enemyId() === targetId
        const targetEnemies = isForAll ? enemyTroop : [enemyTroop.find(getEnemy)]

        for(const enemy of targetEnemies){
            if(enemy.isAlive()){
                this.processLevelChange(args.operation, enemy, level)
            }
        }
    },

    cmd_changeEquipByIndex(args){
        const indexList = this.createIndexList(args.index)
        const slotId = Number(args.slotId)
        const isEquipping = args.isEquipping === 'true'

        const weapon = $dataWeapons[Number(args.weaponId)]
        const armor = $dataArmors[Number(args.armorId)]
        const item = isEquipping ? weapon || armor : null

        for(const index of indexList){
            const member = $gameTroop.members()[index]
            member.forceChangeEquip(slotId, item)
        }

    },

    cmd_changeEquipById(args){
        const targetId = Number(args.enemyId)
        const slotId = Number(args.slotId)

        const isForAll = args.isForAll === 'true'
        const isEquipping = args.isEquipping === 'true'

        const weapon = $dataWeapons[Number(args.weaponId)]
        const armor = $dataArmors[Number(args.armorId)]
        const item = isEquipping ? weapon || armor : null

        const enemyTroop = $gameTroop.members()
        const getEnemy = member => member.enemyId() === targetId
        const targetEnemies = isForAll ? enemyTroop : [enemyTroop.find(getEnemy)]

        for(const enemy of targetEnemies){
            if(enemy.isAlive()){
                enemy.forceChangeEquip(slotId, item)
            }
        }

    },

    cmd_changeClassByIndex(args){
        const indexList = this.createIndexList(args.index)
        const classId = Number(args.classId)

        for(const index of indexList){
            const enemy = $gameTroop.members()[index]
            enemy.changeClass(classId, false)
        }
    },

    cmd_changeClassById(args){
        const targetId = Number(args.enemyId)
        const classId = Number(args.classId)
        const isForAll = args.isForAll === 'true'

        const enemyTroop = $gameTroop.members()
        const getEnemy = member => member.enemyId() === targetId
        const targetEnemies = isForAll ? enemyTroop : [enemyTroop.find(getEnemy)]

        for(const enemy of targetEnemies){
            if(enemy.isAlive()){
                enemy.changeClass(classId, false)
            }
        }
    },

    executePluginCommandMV(){

    }

}

const Plugin = Eli.EnemyClass
const Alias = Eli.EnemyClass.alias

Plugin.initialize()

/* ------------------------------- GAME ENEMY ------------------------------- */
{

Alias.Game_Enemy_initMembers = Game_Enemy.prototype.initMembers
Game_Enemy.prototype.initMembers = function() {
    Alias.Game_Enemy_initMembers.call(this)
    this.initClassMembers()
}

Alias.Game_Enemy_setup = Game_Enemy.prototype.setup
Game_Enemy.prototype.setup = function(enemyId, x, y) {
    Alias.Game_Enemy_setup.call(this, enemyId, x, y)
    this.setupClass()
}

Alias.Game_Enemy_traitObjects = Game_Enemy.prototype.traitObjects
Game_Enemy.prototype.traitObjects = function() {
    const alias = Alias.Game_Enemy_traitObjects.call(this)

    if(this._classId > 0){
        let objects = Game_Battler.prototype.traitObjects.call(this)
        objects = objects.concat([this.enemy(), this.currentClass()])
        const equips = this.equips()

        for (let i = 0, l = equips.length; i < l; i++) {
            const item = equips[i]

            if (item) {
                objects.push(item)
            }
        }

        return objects
    }else{
        return alias
    }

}

Alias.Game_Enemy_paramBase = Game_Enemy.prototype.paramBase
Game_Enemy.prototype.paramBase = function(paramId) {
    if(this._classId > 0){
        return this.getParamBaseFromClass(paramId)
    }else{
        return Alias.Game_Enemy_paramBase.call(this, paramId)
    }
}

Alias.Game_Enemy_paramPlus = Game_Enemy.prototype.paramPlus
Game_Enemy.prototype.paramPlus = function(paramId) {
    let value = Alias.Game_Enemy_paramPlus.call(this, paramId)

    if(this._classId > 0){
        value += this.getParamPlusFromEquip(paramId)
    }

    return value
}

Game_Enemy.prototype.initClassMembers = function() {
    this._level = 0
    this._initialLevel = 0
    this._classId = 0
    this._exp = {}
    this._equips = []
}

Game_Enemy.prototype.setupClass = function() {
    const meta = this.enemy().meta
    this._initialLevel = Number(meta.InitialLevel) || 1
    this._maxLevel = Number(meta.MaxLevel) || 99
    this._level = 1
    this._classId = Number(meta.ClassId) || 0
    
    if(this._classId > 0){
        this.initExp()
    }
    // Compatibility with Class Curves
    if(!Imported.Eli_ClassCurves){
        if(this._initialLevel > 1){
            this.changeLevel(this._initialLevel)
        }
        this.recoverAll()
    }

    this.initEquips() 
}

Game_Enemy.prototype.expForLevel = function(level) {
    const [basis, extra, acc_a, acc_b] = this.currentClass().expParams

    return Math.round(basis*(Math.pow(level-1, 0.9+acc_a/250))*level*
            (level+1)/(6+Math.pow(level,2)/50/acc_b)+(level-1)*extra)
}

Game_Enemy.prototype.initExp = function() {
    this._exp[this._classId] = this.currentLevelExp()
}

Game_Enemy.prototype.currentExp = function() {
    return this._exp[this._classId]
}

Game_Enemy.prototype.currentLevelExp = function() {
    return this.expForLevel(this._level)
}

Game_Enemy.prototype.nextLevelExp = function() {
    return this.expForLevel(this._level + 1)
}

Game_Enemy.prototype.nextRequiredExp = function() {
    return this.nextLevelExp() - this.currentExp()
}

Game_Enemy.prototype.maxLevel = function() {
    return this._maxLevel
}

Game_Enemy.prototype.isMaxLevel = function() {
    return this._level >= this.maxLevel()
};

Game_Enemy.prototype.initEquips = function() {
    const slots = this.equipSlots()
    const maxSlots = slots.length
    const equips = this.getInitialEquipsFromMeta()
    this._equips = []

    for (let i = 0; i < maxSlots; i++) {
        this._equips[i] = new Game_Item()
    }

    for (let i = 0, l = equips.length; i < l; i++) {
        if (i < maxSlots) {
            this._equips[i].setEquip(slots[i] === 1, equips[i])
        }
    }

    this.releaseUnequippableItems(true)
    this.recoverAll()
    this.refresh()
}

Game_Enemy.prototype.getInitialEquipsFromMeta = function(){
    const meta = this.enemy().meta
    const maxSlots = this.equipSlots().length
    const equipSlots = new Array(maxSlots).fill(0)

    const setInitialEquips = (equipSettings) => {
        const [slotId, equipId] = equipSettings.split(":").map(item => Number(item))
        equipSlots[slotId - 1] = equipId
    }

    if(meta.Equips){
        const initialEquips = meta.Equips.split(",")
        // for(const equip of initialEquips){
        //     const [slotId, equipId] = equipId.split(":").map(item => Number(item))
        //     equipSlots[slotId - 1] = equipId
        // }
        initialEquips.forEach(setInitialEquips)
    }

    return equipSlots
}

Game_Enemy.prototype.equipSlots = function() {
    const slots = []

    for (let i = 1, l = $dataSystem.equipTypes.length; i < l; i++) {
        slots.push(i)
    }

    if (slots.length >= 2 && this.isDualWield()) {
        slots[1] = 1
    }

    return slots
}

Game_Enemy.prototype.equips = function() {
    return this._equips.map(item => {
        return item.object()
    })
}

Game_Enemy.prototype.weapons = function() {
    return this.equips().filter(item =>  {
        return item && DataManager.isWeapon(item)
    })
}

Game_Enemy.prototype.armors = function() {
    return this.equips().filter(item =>  {
        return item && DataManager.isArmor(item)
    })
}

Game_Enemy.prototype.hasWeapon = function(weapon) {
    return this.weapons().contains(weapon)
}

Game_Enemy.prototype.hasArmor = function(armor) {
    return this.armors().contains(armor)
}

Game_Enemy.prototype.isEquipChangeOk = function(slotId) {
    if(Plugin.param().equipRules){
        return (!this.isEquipTypeLocked(this.equipSlots()[slotId]) &&
                !this.isEquipTypeSealed(this.equipSlots()[slotId]))
    }else{
        return true
    }
}

Game_Enemy.prototype.changeEquip = function(slotId, item) {
    if (!item || this.equipSlots()[slotId] === item.etypeId) {
        this._equips[slotId].setObject(item)
        this.refresh()
    }
}

Game_Enemy.prototype.forceChangeEquip = function(slotId, item) {
    this._equips[slotId].setObject(item)
    this.releaseUnequippableItems(true)
    this.refresh()
}

Game_Enemy.prototype.changeEquipById = function(etypeId, itemId) {
    const slotId = etypeId - 1
    if (this.equipSlots()[slotId] === 1) {
        this.changeEquip(slotId, $dataWeapons[itemId])
    } else {
        this.changeEquip(slotId, $dataArmors[itemId])
    }
}

Game_Enemy.prototype.isEquipped = function(item) {
    return this.equips().contains(item)
}

Game_Enemy.prototype.discardEquip = function(item) {
    const slotId = this.equips().indexOf(item)
    if (slotId >= 0) {
        this._equips[slotId].setObject(null)
    }
}

Game_Enemy.prototype.releaseUnequippableItems = function(forcing) {
    if(Plugin.param().equipRules){
        for (;;) {
            const slots = this.equipSlots()
            const equips = this.equips()
            let changed = false
            for (let i = 0; i < equips.length; i++) {
                const item = equips[i];
                if (item && (!this.canEquip(item) || item.etypeId !== slots[i])) {
                    // if (!forcing) {
                    //     this.tradeItemWithParty(null, item);
                    // }
                    this._equips[i].setObject(null)
                    changed = true
                }
            }
            if (!changed) {
                break
            }
        }
    }
}

Game_Enemy.prototype.clearEquipments = function() {
    const maxSlots = this.equipSlots().length

    for (let i = 0; i < maxSlots; i++) {
        if (this.isEquipChangeOk(i)) {
            this.changeEquip(i, null)
        }
    }
}

Game_Enemy.prototype.isSkillWtypeOk = function(skill) {
    const wtypeId1 = skill.requiredWtypeId1
    const wtypeId2 = skill.requiredWtypeId2
    if (
        (wtypeId1 === 0 && wtypeId2 === 0) ||
        (wtypeId1 > 0 && this.isWtypeEquipped(wtypeId1)) ||
        (wtypeId2 > 0 && this.isWtypeEquipped(wtypeId2))
    ) {
        return true
    } else {
        return false
    }
}

Game_Enemy.prototype.isWtypeEquipped = function(wtypeId) {
    return this.weapons().some(weapon => {
        return weapon.wtypeId === wtypeId
    })
}

Game_Enemy.prototype.refresh = function() {
    this.releaseUnequippableItems(false)
    Game_Battler.prototype.refresh.call(this)
}

Game_Enemy.prototype.currentClass = function() {
    return $dataClasses[this._classId]
}

Game_Enemy.prototype.isClass = function(gameClass) {
    return gameClass && this._classId === gameClass.id
}

Game_Enemy.prototype.attackElements = function() {
    const set = Game_Battler.prototype.attackElements.call(this)
    if (this.hasNoWeapons() && !set.contains(this.bareHandsElementId())) {
        set.push(this.bareHandsElementId())
    }
    return set
}

Game_Enemy.prototype.hasNoWeapons = function() {
    return this.weapons().length === 0
}

Game_Enemy.prototype.bareHandsElementId = function() {
    return 1
}

Game_Enemy.prototype.getParamBaseFromClass = function(paramId) {
    return this.currentClass().params[paramId][this._level]
}

Game_Enemy.prototype.getParamPlusFromEquip = function(paramId){
    let value = 0

    for(const equip of this.equips()){
        if(equip){
            value += equip.params[paramId]
        }
    }

    return value
}

Game_Enemy.prototype.attackAnimationId1 = function() {
    if (this.hasNoWeapons()) {
        return this.bareHandsAnimationId()
    } else {
        const weapons = this.weapons()
        return weapons[0] ? weapons[0].animationId : 0
    }
}

Game_Enemy.prototype.attackAnimationId2 = function() {
    const weapons = this.weapons()
    return weapons[1] ? weapons[1].animationId : 0
}

Game_Enemy.prototype.bareHandsAnimationId = function() {
    return 1
}

Game_Enemy.prototype.changeExp = function(exp, show) {
    this._exp[this._classId] = Math.max(exp, 0)

    while (!this.isMaxLevel() && this.currentExp() >= this.nextLevelExp()) {
        this.levelUp()
    }
    while (this.currentExp() < this.currentLevelExp()) {
        this.levelDown()
    }
    this.refresh()
}

Game_Enemy.prototype.levelUp = function() {
    this._level++
    // this.currentClass().learnings.forEach(function(learning) {
    //     if (learning.level === this._level) {
    //         this.learnSkill(learning.skillId);
    //     }
    // }, this);
}

Game_Enemy.prototype.levelDown = function() {
    this._level--
}

Game_Enemy.prototype.displayLevelUp = function() {
    const text = TextManager.levelUp.format(this._name, TextManager.level, this._level)
    $gameMessage.newPage()
    $gameMessage.add(text)
}

Game_Enemy.prototype.gainExp = function(exp) {
    const newExp = this.currentExp() + Math.round(exp * this.finalExpRate())
    this.changeExp(newExp, this.shouldDisplayLevelUp())
}

Game_Enemy.prototype.finalExpRate = function() {
    return this.exr * 1
}

Game_Enemy.prototype.shouldDisplayLevelUp = function() {
    return true
}

Game_Enemy.prototype.changeLevel = function(level, show) {
    level = level.clamp(1, this.maxLevel())
    this.changeExp(this.expForLevel(level), show)
}

Game_Enemy.prototype.changeClass = function(classId, keepExp) {
    if (keepExp) {
        this._exp[classId] = this.currentExp()
    }
    this._classId = classId
    this.changeExp(this._exp[this._classId] || 0, false)
    this.refresh()
}

Game_Enemy.prototype.performAttack = function() {
    const weapons = this.weapons()
    const wtypeId = weapons[0] ? weapons[0].wtypeId : 0
    const attackMotion = $dataSystem.attackMotions[wtypeId]

    if (attackMotion) {

        if (attackMotion.type === 0) {
            this.requestMotion('thrust')
        } else if (attackMotion.type === 1) {
            this.requestMotion('swing')
        } else if (attackMotion.type === 2) {
            this.requestMotion('missile')
        }
        
        this.startWeaponAnimation(attackMotion.weaponImageId)
    }
}

}

/* ---------------------------- WINDOW BATTLE LOG --------------------------- */
{

Window_BattleLog.prototype.showEnemyAttackAnimation = function(subject, targets) {
    this.showActorAttackAnimation(subject, targets)
}

}

}