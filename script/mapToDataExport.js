export default class DataMapper {

    static mapDndDataToDataExport(dataDnd = {}) {
        let dataExport = {};

        let dataItem = DataMapper.sortItemByType(dataDnd.items);

        const actorsOwner = Object.entries(dataDnd.actor.ownership).filter(([key, value]) => value === CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER).map(([key]) => key)
        dataExport.playerName = game.users.players.find(({ _id }) => actorsOwner.includes(_id))?.name;
        dataExport.pcName = dataDnd.actor.name;
        dataExport.alignment = dataDnd.system.details.alignment;
        dataExport.race = dataDnd.system.details.race;
        dataExport.background = dataDnd.system.details.background.name;
        dataExport.xp = { value: dataDnd.system.details.xp.value, lvl: dataDnd.system.details.level, nextLvl: dataDnd.system.details.xp.max };//TODO level et xp max
        dataExport.classes = dataItem.classes;

        dataExport.ac = dataDnd.system.attributes.ac.value;
        dataExport.hp = { actual: dataDnd.system.attributes.hp.value, max: dataDnd.system.attributes.hp.max };
        dataExport.speeds = DataMapper.mapDndSpeedDataToDataExport(dataDnd.system.attributes.movement);
        dataExport.senses = DataMapper.mapDndSensesDataToDataExport(dataDnd.system.attributes.senses);

        dataExport.abilities = DataMapper.mapDndAbilitiesDataToDataExport(dataDnd.system.abilities);
        dataExport.skills = DataMapper.mapDndSkillsDataToDataExport(dataDnd.system.skills);
        dataExport.feats = dataItem.feats;
        dataExport.spells = dataItem.spells;

        dataExport.biography = dataDnd.system.details.biography.value;
        dataExport.appearance = dataDnd.system.details.appearance; //localize "DND5E.Appearance" 

        dataExport.personality = [];
        dataExport.personality.push({ name: game.i18n.localize("DND5E.PersonalityTraits"), description: dataDnd.system.details.trait });
        dataExport.personality.push({ name: game.i18n.localize("DND5E.Ideals"), description: dataDnd.system.details.ideal });
        dataExport.personality.push({ name: game.i18n.localize("DND5E.Bonds"), description: dataDnd.system.details.bond });
        dataExport.personality.push({ name: game.i18n.localize("DND5E.Flaws"), description: dataDnd.system.details.flaw });

        //TODO ajoutez titre de dnd;
        dataExport.money = {
            pp: dataDnd.system.currency.pp,
            gp: dataDnd.system.currency.gp,
            ep: dataDnd.system.currency.ep,
            sp: dataDnd.system.currency.sp,
            cp: dataDnd.system.currency.cp
        }
        dataExport.objects = dataItem.objects;

        return dataExport;
    }

    static mapDndAbilitiesDataToDataExport(dataDndAbilities = {}) {
        let dataAbilitiesExport = [];

        for (const [key, abilitie] of Object.entries(dataDndAbilities)) {
            let dataAbilitieExport = {};
            dataAbilitieExport.name = game.dnd5e.config.abilities[key].label;
            dataAbilitieExport.value = abilitie.value;
            dataAbilitieExport.mod = abilitie.mod > 0 ? '+' + abilitie.mod : abilitie.mod;
            dataAbilitieExport.save = abilitie.save.value;

            dataAbilitiesExport.push(dataAbilitieExport);
        }

        return dataAbilitiesExport;
    }

    static mapDndSkillsDataToDataExport(dataDndSkills = {}) {
        let dataSkillsExport = [];

        for (const [key, skill] of Object.entries(dataDndSkills)) {
            let dataSkillExport = {};
            dataSkillExport.name = game.dnd5e.config.skills[key];
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

    static mapDndSpeedDataToDataExport(dataDndSpeeds = {}) {
        let dataSpeedsExport = [];

        for (const [key, value] of Object.entries(dataDndSpeeds)) {
            if (value > 0) {
                let dataSpeedExport = {};
                dataSpeedExport.name = game.dnd5e.config.movementTypes[key];
                dataSpeedExport.value = value;
                dataSpeedExport.units = dataDndSpeeds.units;
                dataSpeedsExport.push(dataSpeedExport);
            }
        }

        return dataSpeedsExport;
    }

    static mapDndSensesDataToDataExport(dataDndSenses = {}) {
        let dataSensesExport = [];

        for (const [key, value] of Object.entries(dataDndSenses)) {
            if (value > 0) {
                let dataSenseExport = {};
                dataSenseExport.name = game.dnd5e.config.senses[key];
                dataSenseExport.value = value;
                dataSenseExport.units = dataDndSenses.units;
                dataSensesExport.push(dataSenseExport);
            }
        }

        return dataSensesExport;
    }

    static sortItemByType(items) {
        let classes = [];
        let objects = [];
        let feats = [];
        let spells = [];

        items.forEach(item => {
            switch (item.type) {
                case 'class':
                    classes.push(DataMapper.mapClassesDndDataToExport(item));
                    break;
                case 'feat':
                    feats.push(DataMapper.mapFeatsDndDataToExport(item));
                    break;
                case 'spell':
                    spells.push(DataMapper.mapSpellsDndDataToExport(item));
                    break;
                case 'background':
                case 'subclass':
                case 'race':
                    //Do nothing;
                    break;
                default://loot, consumable, container, equipment, weapon
                    objects.push(DataMapper.mapOjbectDndDataToExport(item));
                    break;
            }
        });

        spells.sort(function (a, b) {
            if (a.level === b.level) {
                return a.name.localeCompare(b.name);
            } else {
                return a.level - b.level;
            }
        });

        return {
            classes: classes,
            objects: objects,
            feats: feats,
            spells: spells
        };
    }

    static mapClassesDndDataToExport(dndClassData = {}) {
        let exportClassData = {};

        exportClassData.name = dndClassData.name;
        exportClassData.level = dndClassData.system.levels;

        if (dndClassData._classLink && dndClassData._classLink.name) {
            exportClassData.subclass = dndClassData._classLink.name;
        }

        return exportClassData;
    }

    static mapOjbectDndDataToExport(dndObjectData = {}) {
        let exportObjectData = {};

        exportObjectData.name = dndObjectData.name;
        exportObjectData.quantity = dndObjectData.system.quantity;
        exportObjectData.description = dndObjectData.system.description.value;

        return exportObjectData;
    }

    static mapFeatsDndDataToExport(dndFeatData = {}) {
        let exportFeatData = {};

        exportFeatData.name = dndFeatData.name;
        exportFeatData.description = dndFeatData.system.description.value;

        return exportFeatData;
    }

    static mapSpellsDndDataToExport(dndSpellData = {}) {
        let exportSpellData = {};

        exportSpellData.name = dndSpellData.name;
        exportSpellData.description = dndSpellData.system.description.value;
        exportSpellData.level = dndSpellData.system.level;
        exportSpellData.activation = { cost: dndSpellData.system.activation.cost, type: dndSpellData.system.activation.type };
        exportSpellData.duration = { value: dndSpellData.system.duration.value, units: dndSpellData.system.duration.units };
        exportSpellData.range = { value: dndSpellData.system.range.value, units: dndSpellData.system.range.units };
        exportSpellData.school = dnd5e.config.spellSchools[dndSpellData.system.school]?.label;

        const spellComponents = dndSpellData.system.properties.map((property) => {
            if (!DataMapper._spellComponents.includes(property)) return undefined

            if ("material" === property) {
                return `${dnd5e.config.itemProperties.material.abbreviation} (${dndSpellData.system.materials.value})`
            } else {
                return dnd5e.config.itemProperties[property]?.abbreviation
            }
        }).filter((value) => value != undefined)


        exportSpellData.components = Array.from(spellComponents).toString()

        return exportSpellData;
    }

    static _spellComponents = ["vocal", "somatic", "material", "ritual", "concentration"]
}