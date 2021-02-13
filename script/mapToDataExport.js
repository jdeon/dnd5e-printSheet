import { DND5E } from "../../../systems/dnd5e/module/config.js";

export default class DataMapper { 
    
    static mapDndDataToDataExport(dataDnd = {}){
        let dataExport = {};
        
        
        let dataItem = DataMapper.sortItemByType(dataDnd.items);
        
        dataExport.pcName = dataDnd.name;
        dataExport.alignment =  dataDnd.data.details.alignment;
        dataExport.race =  dataDnd.data.details.race;
        dataExport.background = dataDnd.data.details.background;
        dataExport.xp = {value : dataDnd.data.details.xp.value, lvl : dataDnd.data.details.level ,nextLvl : dataDnd.data.details.xp.max};
        dataExport.classes = dataItem.classes;
        
        dataExport.ac = dataDnd.data.attributes.ac.value;
        dataExport.hp = {actual : dataDnd.data.attributes.hp.value, max : dataDnd.data.attributes.hp.max};
        dataExport.speeds = DataMapper.mapDndSpeedDataToDataExport(dataDnd.data.attributes.movement);
        dataExport.senses = DataMapper.mapDndSensesDataToDataExport(dataDnd.data.attributes.senses);
        
        dataExport.abilities = DataMapper.mapDndAbilitiesDataToDataExport(dataDnd.data.abilities);
        dataExport.skills = DataMapper.mapDndSkillsDataToDataExport(dataDnd.data.skills);
        dataExport.feats = dataItem.feats;
        dataExport.spells = dataItem.spells;
        
        dataExport.biography = dataDnd.data.details.biography.value;
        dataExport.appearance = dataDnd.data.details.appearance; //localize "DND5E.Appearance" 
        
        dataExport.personality = [];
        dataExport.personality.push({name : game.i18n.localize("DND5E.PersonalityTraits"), description : dataDnd.data.details.trait});
        dataExport.personality.push({name : game.i18n.localize("DND5E.Ideals"), description : dataDnd.data.details.ideal});
        dataExport.personality.push({name : game.i18n.localize("DND5E.Bonds"), description : dataDnd.data.details.bond});
        dataExport.personality.push({name : game.i18n.localize("DND5E.Flaws"), description : dataDnd.data.details.flaw});
        
        //TODO ajoutez titre de dnd;
        dataExport.money = {
            pp : dataDnd.data.currency.pp,
            gp : dataDnd.data.currency.gp,
            ep : dataDnd.data.currency.ep,
            sp : dataDnd.data.currency.sp,
            cp : dataDnd.data.currency.cp
        }
        dataExport.objects = dataItem.objects;
        
        return dataExport;
    }
    
    static mapDndAbilitiesDataToDataExport(dataDndAbilities = {}){
        let dataAbilitiesExport = [];
        
        for (const [key, abilitie] of Object.entries(dataDndAbilities)){
            let dataAbilitieExport = {};
            
            dataAbilitieExport.name = DND5E.abilities[key];
            dataAbilitieExport.value = abilitie.value;
            dataAbilitieExport.mod = abilitie.mod;
            dataAbilitieExport.save = abilitie.save;
            
            /*
            proficient: 0
            prof: 0
            saveBonus: 0
            checkBonus: 0
            dc: 11
            */
            
            dataAbilitiesExport.push(dataAbilitieExport);
        } 
        
        return dataAbilitiesExport;
    }
    
    static mapDndSkillsDataToDataExport(dataDndSkills = {}){
        let dataSkillsExport = [];
        
        for (const [key, skill] of Object.entries(dataDndSkills)){
            let dataSkillExport = {};
            dataSkillExport.name = DND5E.skills[key];
            dataSkillExport.value = skill.value;
            dataSkillExport.mod = skill.total;
            dataSkillExport.passive = skill.passive;
            
            /*
            ability: "dex"
            bonus: 0
            mod: 4
            prof: 6
            */
            
            dataSkillsExport.push(dataSkillExport);
        } 
        
        return dataSkillsExport;
    }
    
    static mapDndSpeedDataToDataExport(dataDndSpeeds = {}){
        let dataSpeedsExport = [];
        
        for (const [key, value] of Object.entries(dataDndSpeeds)){
            if(value > 0){
                let dataSpeedExport = {};
                dataSpeedExport.name = DND5E.movementTypes[key];
                dataSpeedExport.value = value;
                dataSpeedExport.units = dataDndSpeeds.units;
                dataSpeedsExport.push(dataSpeedExport);
            }
        } 
        
        return dataSpeedsExport;
    }
    
    static mapDndSensesDataToDataExport(dataDndSenses = {}){
        let dataSensesExport = [];
        
        for (const [key, value] of Object.entries(dataDndSenses)){
            if(value > 0){
                let dataSenseExport = {};
                dataSenseExport.name = DND5E.senses[key];
                dataSenseExport.value = value;
                dataSenseExport.units = dataDndSenses.units;
                dataSensesExport.push(dataSenseExport);
            }
        } 
        
        return dataSensesExport;
    }
    
    static sortItemByType(items){
        let classes = [];
        let objects = []
        let feats = [];
        let spells = [];
        
        for (var i = 0 ; i < items.length; i++){
            switch (items[i].type) {
            case 'class':
                classes.push(DataMapper.mapClassesDndDataToExport(items[i]));
                break;
            case 'feat':
                feats.push(DataMapper.mapFeatsDndDataToExport(items[i]));
                break;
            case 'spell':
                spells.push(DataMapper.mapSpellsDndDataToExport(items[i]));
                break;
            default:
                objects.push(DataMapper.mapOjbectDndDataToExport(items[i]));
                break;
            }
        }
        
        spells.sort(function (a, b) {
            if(a.level === b.level){
                return a.name.localeCompare(b.name);
            } else {
                return a.level - b.level;
            }
        });
        
        return {classes: classes,
                objects: objects,
                feats : feats,
                spells : spells};
    }
    
    static mapClassesDndDataToExport(dndClassData = {}){
        let exportClassData = {};
        
        exportClassData.name = dndClassData.name;
        exportClassData.level = dndClassData.data.levels;
        exportClassData.subclass = dndClassData.data.subclass;
        
        return exportClassData;
    }
    
    static mapOjbectDndDataToExport(dndObjectData = {}){
        let exportObjectData = {};
        
        exportObjectData.name = dndObjectData.name;
        exportObjectData.quantity = dndObjectData.data.quantity;
        exportObjectData.description = dndObjectData.data.description.value;
        
        return exportObjectData;
    }
    
    static mapFeatsDndDataToExport(dndFeatData = {}){
        let exportFeatData = {};
        
        exportFeatData.name = dndFeatData.name;
        exportFeatData.description = dndFeatData.data.description.value;
        
        return exportFeatData;
    }
    
    static mapSpellsDndDataToExport(dndSpellData = {}){
        let exportSpellData = {};
        
        exportSpellData.name = dndSpellData.name;
        exportSpellData.description = dndSpellData.data.description.value;
        exportSpellData.level = dndSpellData.data.level;
        exportSpellData.activation = {cost : dndSpellData.data.activation.cost, type : dndSpellData.data.activation.type};
        exportSpellData.components = (dndSpellData.data.components.vocal ? 'V,' : '') 
            + (dndSpellData.data.components.somatic ? 'S,' : '') 
            + (dndSpellData.data.components.material ? 'M (' + dndSpellData.data.materials.value + '),' : '') 
            + (dndSpellData.data.components.ritual ? 'R,' : '') 
            + (dndSpellData.data.components.concentration ? 'C,' : '')
        
        return exportSpellData;
    }
    
}


/**

type: "character"
data:
    attributes:
        spellcasting: "cha"
        encumbrance: {value: 43.9, max: 75, pct: 58.53333333333333, encumbered: true}
        exhaustion: 0
        inspiration: false
        hd: 7
        prof: 3
        spelldc: 15

    traits:
        size: "med"
        di: {value: Array(0), custom: ""}
        dr: {value: Array(0), custom: ""}
        dv: {value: Array(0), custom: ""}
        ci: {value: Array(0), custom: ""}
        languages: {value: Array(4), custom: ""}
        weaponProf: {value: Array(1), custom: "Arbalète de poing; Epée courte; Epée longue; Rapière"}
        armorProf: {value: Array(1), custom: ""}
        toolProf:
            value: (3) ["disg", "pois", "thief"]
            custom: "Outils de joalerie"

    spells:
        spell1: {value: 0, override: null, max: 0}
        spell2: {value: NaN, override: null, max: 0}
        spell3: {value: NaN, override: null, max: 0}
        spell4: {value: NaN, override: null, max: 0}
        spell5: {value: NaN, override: null, max: 0}
        spell6: {value: NaN, override: null, max: 0}
        spell7: {value: NaN, override: null, max: 0}
        spell8: {value: NaN, override: null, max: 0}
        spell9: {value: NaN, override: null, max: 0}
        pact: {value: 2, override: 2, max: 2, level: 2}

    bonuses: {mwak: {…}, rwak: {…}, msak: {…}, rsak: {…}, abilities: {…}, …}
    resources: {primary: {…}, secondary: {…}, tertiary: {…}}

    img: "Token/Aventurier/Neren.Avatar.png"
*/

/**
dataSheet:
_id: "p2yHx92cgG9PG6ve"
name: "Neren"
permission:
default: 0
GbqHPYzg1VzJn1ff: 3
xsQzvLc010rydlxn: 3
__proto__: Object
type: "character"
data:
abilities:
str:
value: 10
proficient: 0
mod: 0
prof: 0
saveBonus: 0
checkBonus: 0
save: 0
dc: 11
__proto__: Object
dex: {value: 18, proficient: 1, mod: 4, prof: 3, saveBonus: 0, …}
con: {value: 12, proficient: 0, mod: 1, prof: 0, saveBonus: 0, …}
int: {value: 8, proficient: 1, mod: -1, prof: 3, saveBonus: 0, …}
wis: {value: 10, proficient: 0, mod: 0, prof: 0, saveBonus: 0, …}
cha: {value: 18, proficient: 0, mod: 4, prof: 0, saveBonus: 0, …}
__proto__: Object
attributes:
ac: {value: 16}
hp: {value: 41, min: 0, max: 41, temp: null, tempmax: null}
init: {value: 0, bonus: 0, mod: 4, prof: 0, total: 4}
movement:
burrow: 0
climb: 0
fly: 0
swim: 0
walk: 9
units: "m"
hover: false
__proto__: Object
senses:
darkvision: 18
blindsight: 0
tremorsense: 0
truesight: 0
units: "m"
special: ""
__proto__: Object
spellcasting: "cha"
death: {success: 1, failure: 0}
encumbrance: {value: 43.9, max: 75, pct: 58.53333333333333, encumbered: true}
exhaustion: 0
inspiration: false
hd: 7
prof: 3
spelldc: 15
__proto__: Object
details:
biography: {value: "<h1>Histoires</h1>↵<p>Abandonn&eacute;e par sa m&e…is de ses souhaits quand tu seras plus forte.</p>", public: ""}
alignment: "Neutre"
race: "Demi elfe"
background: "Artisan de guilde"
xp: {value: 29756, min: 0, max: 34000, pct: 61}
appearance: ""
trait: "Je crois que si quelque chose doit être fait, il doit l'être correctement. Je n'y peux rien, je suis un perfectionniste."
ideal: "Aspiration : Je travaille dur pour être le meilleur dans mon domaine"
bond: "Vilain petit canard : Personne ne m'accepte tel que je suis. Je veux leur prouver qu'ils ont eu tort."
flaw: "Je ferais n'importe quoi pour mettre la main sur quelque chose de rare ou d'inestimable."
level: 7
__proto__: Object
traits:
size: "med"
di: {value: Array(0), custom: ""}
dr: {value: Array(0), custom: ""}
dv: {value: Array(0), custom: ""}
ci: {value: Array(0), custom: ""}
languages: {value: Array(4), custom: ""}
weaponProf: {value: Array(1), custom: "Arbalète de poing; Epée courte; Epée longue; Rapière"}
armorProf: {value: Array(1), custom: ""}
toolProf:
value: (3) ["disg", "pois", "thief"]
custom: "Outils de joalerie"
__proto__: Object
__proto__: Object
currency:
pp: 0
gp: 25
ep: 0
sp: 5
cp: 93
__proto__: Object
skills:
acr:
value: 2
ability: "dex"
bonus: 0
mod: 4
prof: 6
total: 10
passive: 20
__proto__: Object
ani: {value: 0, ability: "wis", bonus: 0, mod: 0, prof: 0, …}
arc: {value: 0, ability: "int", bonus: 0, mod: -1, prof: 0, …}
ath: {value: 0, ability: "str", bonus: 0, mod: 0, prof: 0, …}
dec: {value: 1, ability: "cha", bonus: 0, mod: 4, prof: 3, …}
his: {value: 0, ability: "int", bonus: 0, mod: -1, prof: 0, …}
ins: {value: 1, ability: "wis", bonus: 0, mod: 0, prof: 3, …}
itm: {value: 0, ability: "cha", bonus: 0, mod: 4, prof: 0, …}
inv: {value: 0, ability: "int", bonus: 0, mod: -1, prof: 0, …}
med: {value: 0, ability: "wis", bonus: 0, mod: 0, prof: 0, …}
nat: {value: 0, ability: "int", bonus: 0, mod: -1, prof: 0, …}
prc: {value: 1, ability: "wis", bonus: 0, mod: 0, prof: 3, …}
prf: {value: 0, ability: "cha", bonus: 0, mod: 4, prof: 0, …}
per: {value: 1, ability: "cha", bonus: 0, mod: 4, prof: 3, …}
rel: {value: 0, ability: "int", bonus: 0, mod: -1, prof: 0, …}
slt: {value: 1, ability: "dex", bonus: 0, mod: 4, prof: 3, …}
ste: {value: 2, ability: "dex", bonus: 0, mod: 4, prof: 6, …}
sur: {value: 0, ability: "wis", bonus: 0, mod: 0, prof: 0, …}
__proto__: Object
spells:
spell1: {value: 0, override: null, max: 0}
spell2: {value: NaN, override: null, max: 0}
spell3: {value: NaN, override: null, max: 0}
spell4: {value: NaN, override: null, max: 0}
spell5: {value: NaN, override: null, max: 0}
spell6: {value: NaN, override: null, max: 0}
spell7: {value: NaN, override: null, max: 0}
spell8: {value: NaN, override: null, max: 0}
spell9: {value: NaN, override: null, max: 0}
pact: {value: 2, override: 2, max: 2, level: 2}
__proto__: Object
bonuses: {mwak: {…}, rwak: {…}, msak: {…}, rsak: {…}, abilities: {…}, …}
resources: {primary: {…}, secondary: {…}, tertiary: {…}}
__proto__: Object
folder: "WqM2inZvuTx7ykwd"
sort: 100000
flags: {gm-notes: {…}}
img: "Token/Aventurier/Neren.Avatar.png"
token:
flags: {}
name: "Neren"
displayName: 30
img: "Token/Aventurier/Neren.Token.png"
tint: ""
width: 1
height: 1
scale: 1
mirrorX: false
mirrorY: false
lockRotation: false
rotation: 0
vision: true
dimSight: 18
brightSight: 18
dimLight: 0
brightLight: 0
sightAngle: 360
lightAngle: 360
lightColor: ""
lightAlpha: 1
lightAnimation: {type: "", speed: 5, intensity: 5}
actorId: "p2yHx92cgG9PG6ve"
actorLink: true
disposition: 1
displayBars: 50
bar1: {attribute: "attributes.hp"}
bar2: {attribute: ""}
randomImg: false
__proto__: Object
items: Array(44)
0:
_id: "CmnTi3pq8RnpjoyG"
name: "Epée courte de verre"
type: "weapon"
data:
description: {value: "<p>Taillé dans un baton de verre remplie de magie</p>", chat: "", unidentified: ""}
source: "PHB pg. 149"
quantity: 2
weight: 1
price: 10
attunement: 0
equipped: true
rarity: "Common"
identified: true
activation: {type: "action", cost: 1, condition: ""}
duration: {value: null, units: ""}
target: {value: null, width: null, units: "", type: ""}
range: {value: 1.5, long: null, units: "ft"}
uses: {value: 0, max: 0, per: ""}
consume: {type: "", target: "", amount: null}
ability: ""
actionType: "mwak"
attackBonus: 1
chatFlavor: ""
critical: null
damage: {parts: Array(1), versatile: ""}
formula: ""
save: {ability: "", dc: null, scaling: "spell"}
armor: {value: 10}
hp: {value: 0, max: 0, dt: null, conditions: ""}
weaponType: "martialM"
properties: {fin: true, lgt: true, amm: false, hvy: false, fir: false, …}
proficient: true
attributes: {spelldc: 10}
__proto__: Object
sort: 500000
flags: {betterRolls5e: {…}, mess: {…}, dynamiceffects: {…}}
img: "systems/dnd5e/icons/items/weapons/sword-short.jpg"
effects: []
__proto__: Object
1: {_id: "quq0yrDwzIoYU7UY", name: "Dague", type: "weapon", data: {…}, sort: 400000, …}
2: {_id: "FgDC642euK57y6eU", name: "Outils de voleur", type: "tool", data: {…}, sort: 200001, …}
3: {_id: "dxuPRKWRBo4mJPsp", name: "Armure Cuir clouté", type: "equipment", data: {…}, sort: 300000, …}
4: {_id: "ayrmzr71b6XBSaHy", name: "Gourde (2l)", type: "consumable", data: {…}, sort: 1900000, …}
5: {_id: "cPgRueuDxQUzZaPs", name: "Sorcier", type: "class", data: {…}, sort: 3900000, …}
6: {_id: "DHGkHQZsD82W9TC1", name: "Roublard", type: "class", data: {…}, sort: 4000000, …}
7: {_id: "velbpDLA4yrdG0Ui", name: "Attaque sournoise", type: "feat", data: {…}, sort: 4100000, …}
8: {_id: "bKyKafN6ND9unXb8", name: "Jargon des voleurs", type: "feat", data: {…}, sort: 4200000, …}
9: {_id: "htul0p5clNmFa1Mq", name: "Invocation: Livre des secrets anciens", type: "feat", data: {…}, sort: 4300000, …}
10: {_id: "IdaROyRik563HgUh", name: "Invocation: Explosion insoutenable", type: "feat", data: {…}, sort: 4400000, …}
11: {_id: "nXYccoNebmvVPLwt", name: "Ascendance feerique", type: "feat", data: {…}, sort: 4500000, …}
12: {_id: "c6mkGpaWkKNAObyI", name: "Présence féerique", type: "feat", data: {…}, sort: 4600000, …}
13: {_id: "oO0jlXhRARRoNwkm", name: "Membre de guilde", type: "feat", data: {…}, sort: 4800000, …}
14: {_id: "bvd7UBXVvXrfznpC", name: "Decharge occulte", type: "spell", data: {…}, sort: 1, …}
15: {_id: "JjvuEzV8ZcS4oQPS", name: "Lame aux flammes vertes", type: "spell", data: {…}, sort: 5200000, …}
16: {_id: "FQbiRu21i3gJFcWG", name: "Thaumaturgie", type: "spell", data: {…}, sort: 5800000, …}
17: {_id: "xXquAneIG5UJcg3T", name: "Stabilisation", type: "spell", data: {…}, sort: 100001, …}
18: {_id: "E77vbx7cKdgjfplX", name: "Gelure", type: "spell", data: {…}, sort: 5600000, …}
19: {_id: "ScUMYCrLUwfgFswV", name: "Serviteur Invisible (Uniqument rituel)", type: "spell", data: {…}, sort: 6100000, …}
20: {_id: "uLdarkNLTftbSyV2", name: "Appel de familier (Uniqument rituel)", type: "spell", data: {…}, sort: 100001, …}
21: {_id: "kVNMrEkXLGsHHLu3", name: "Fracassement", type: "spell", data: {…}, sort: 100001, …}
22: {_id: "bZjftn4PIS0Kwknn", name: "Malefice", type: "spell", data: {…}, sort: 5900000, …}
23: {_id: "cqTpF5aRxOn5Rjdy", name: "Eclair de sorciere", type: "spell", data: {…}, sort: 5000000, …}
24: {_id: "vARwZZchZoYfwka4", name: "Armure d'agathys", type: "spell", data: {…}, sort: 5100000, …}
25: {_id: "y9KOlwpuOvFm0JMT", name: "Ruse", type: "feat", data: {…}, sort: 5200000, …}
26: {_id: "yU37AJQgUlhdefKy", name: "Torche", type: "consumable", data: {…}, sort: 4700000, …}
27: {_id: "qWorCWxtDrC4Wq3d", name: "Rations", type: "consumable", data: {…}, sort: 1800000, …}
28: {_id: "NgUZ7cEhF3xW4ZJn", name: "Corde en chanvre (15 m)", type: "consumable", data: {…}, sort: 4000000, …}
29: {_id: "Gb2FPwMiBSUp982N", name: "Herbe pour familier", type: "consumable", data: {…}, sort: 6000000, …}
30: {_id: "P3xrtHVuil8upvZG", name: "Potion de vie mineur", type: "consumable", data: {…}, sort: 6200000, …}
31: {_id: "vDCR6ghL5niowXTk", name: "Potion de vie", type: "consumable", data: {…}, sort: 6400000, …}
32: {_id: "k7gFR91wBOHuVjQQ", name: "Vêtements de voyage", type: "equipment", data: {…}, sort: 800000, …}
33: {_id: "jJ5YtkcOBpKwpsLa", name: "Identification (Uniqument rituel)", type: "spell", data: {…}, sort: 6000000, …}
34: {_id: "aRz2eTp5nxBH2x4s", name: "Pendentif aracanique", type: "equipment", data: {…}, sort: 1300000, …}
35: {_id: "Mji28aEBcy3c6v2B", name: "Amulette de cicatrisation", type: "equipment", data: {…}, sort: 1200000, …}
36: {_id: "gp2gwKzqCoKFgZES", name: "Pierre de communication a distance", type: "weapon", data: {…}, sort: 600000, …}
37: {_id: "cMdJP27FIc7jj7g7", name: "Assassinat", type: "feat", data: {…}, sort: 6800000, …}
38: {_id: "NSPKcWjRkGhvN51j", name: "Sac sans fonds", type: "backpack", data: {…}, sort: 4000000, …}
39: {_id: "FFqTkilN6GTAeUeC", name: "Carte Repos du Golem", type: "consumable", data: {…}, sort: 7000000, …}
40: {_id: "DL4pEtInRJjmgFLj", name: "Plume", type: "consumable", data: {…}, sort: 7100000, …}
41: {_id: "lIVgcthZF8a7Uocp", name: "Précision des elfes", type: "feat", data: {…}, sort: 7200000, …}
    id: "r49gyJpjBO4jxHhZ"
    name: "Represailles infernales"
    type: "spell"
    data:
    description: {value: "<p>Vous pointez votre doigt, et la cr&eacute;ature…eau d'emplacement au-del&agrave; du niveau 1.</p>", chat: "", unidentified: ""}
    source: "PHB pg. 250"
    activation: {type: "reaction", cost: 1, condition: "Avoir subi des dégâts par une créature située à 18 mètres maximum de vous et que vous pouvez voir"}
    duration: {value: null, units: "inst"}
    target: {value: 1, width: null, units: "", type: "creature"}
    range: {value: 18, long: 0, units: "ft"}
    uses: {value: 0, max: "0", per: ""}
    consume: {type: "", target: "", amount: null}
    ability: ""
    actionType: "save"
    attackBonus: 0
    chatFlavor: ""
    critical: null
    damage: {parts: Array(1), versatile: ""}
    formula: ""
    save: {ability: "dex", dc: null, scaling: "spell"}
    level: 1
    school: "evo"
    components: {value: "", vocal: true, somatic: true, material: false, ritual: false, …}
    materials: {value: "", consumed: false, cost: 0, supply: 0}
    preparation: {mode: "pact", prepared: false}
    scaling: {mode: "level", formula: "1d10"}
    attributes: {spelldc: 10}
43: {_id: "XZWX34vXPJNrxy0I", name: "Esprit désorienté", type: "spell", data: {…}, sort: 7400000, …}
length: 44
__proto__: Array(0)
effects: []
__pro
*/