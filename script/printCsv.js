export default class PrintSheetCsv {

    static get defaultOptions() {
        return {
            separatorChar: ',',
            returnLineChar: '\r\n',
        };
    }

    static convertdataToCsvText(dataExport) {
        let outText = '\uFEFF' //To accept special caracter
        outText += PrintSheetCsv.createSimpleField(game.i18n.localize("DND5E-PRINT-SHEET.Name"), dataExport.pcName);
        outText += this.defaultOptions.separatorChar.repeat(8)
        outText += this.defaultOptions.returnLineChar;

        for (var i = 0; i < dataExport.classes.length; i++) {
            let classe = dataExport.classes[i];
            outText += classe.name + ' (' + classe.level + ') - ' + classe.subclass + '    ';
        }
        outText += this.defaultOptions.separatorChar.repeat(10)
        outText += this.defaultOptions.returnLineChar;

        outText += PrintSheetCsv.createSimpleField(game.i18n.localize("DND5E.Alignment"), dataExport.alignment);
        outText += PrintSheetCsv.createSimpleField(game.i18n.localize("TYPES.Item.raceLegacy"), dataExport.race);
        outText += PrintSheetCsv.createSimpleField(game.i18n.localize("DND5E.Background"), dataExport.background);
        outText += PrintSheetCsv.createSimpleField(game.i18n.localize("DND5E.ExperiencePoints.Abbreviation"), dataExport.xp.value + '/' + dataExport.xp.nextLvl);
        outText += this.defaultOptions.separatorChar.repeat(2)
        outText += this.defaultOptions.returnLineChar;

        outText += PrintSheetCsv.createSimpleField(game.i18n.localize("DND5E.HP"), dataExport.hp.actual + '/' + dataExport.hp.max); + this.defaultOptions.separatorChar;
        outText += PrintSheetCsv.createSimpleField(game.i18n.localize("DND5E.AC"), dataExport.ac);

        outText += game.i18n.localize("DND5E.Speed") + ' : ' + this.defaultOptions.separatorChar;
        for (var i = 0; i < dataExport.speeds.length; i++) {
            let speed = dataExport.speeds[i];
            outText += speed.name + ':' + speed.value + speed.units;
        }
        outText += this.defaultOptions.separatorChar.repeat(5)
        outText += this.defaultOptions.returnLineChar;

        outText += this.defaultOptions.separatorChar.repeat(10)
        outText += this.defaultOptions.returnLineChar;

        outText += game.i18n.localize("DND5E.Abilities") + ' : ' + this.defaultOptions.separatorChar;
        for (var i = 0; i < dataExport.abilities.length; i++) {
            let abilitie = dataExport.abilities[i];
            outText += abilitie.name + this.defaultOptions.separatorChar;
        }
        outText += this.defaultOptions.separatorChar.repeat(3)
        outText += this.defaultOptions.returnLineChar;
        outText += game.i18n.localize("DND5E-PRINT-SHEET.value") + ' : ' + this.defaultOptions.separatorChar;
        for (var i = 0; i < dataExport.abilities.length; i++) {
            let abilitie = dataExport.abilities[i];
            outText += abilitie.value + ' (' + abilitie.mod + ')' + this.defaultOptions.separatorChar;
        }
        outText += this.defaultOptions.separatorChar.repeat(3)
        outText += this.defaultOptions.returnLineChar;
        outText += game.i18n.localize("DND5E-PRINT-SHEET.SaveRollAbbr") + ' : ' + this.defaultOptions.separatorChar;
        for (var i = 0; i < dataExport.abilities.length; i++) {
            let abilitie = dataExport.abilities[i];
            outText += abilitie.save + this.defaultOptions.separatorChar;
        }
        outText += this.defaultOptions.separatorChar.repeat(3)
        outText += this.defaultOptions.returnLineChar;

        outText += this.defaultOptions.separatorChar.repeat(10)
        outText += this.defaultOptions.returnLineChar;

        outText += game.i18n.localize("DND5E.Senses") + ' : ' + this.defaultOptions.separatorChar;
        for (var i = 0; i < dataExport.senses.length; i++) {
            let sense = dataExport.senses[i];
            outText += sense.name + ':' + sense.value + sense.units;
        }
        outText += this.defaultOptions.separatorChar.repeat(9)
        outText += this.defaultOptions.returnLineChar;

        outText += game.i18n.localize('DND5E.Biography') + ' : ' + this.defaultOptions.separatorChar.repeat(10) + this.defaultOptions.returnLineChar;
        outText += game.i18n.localize('DND5E.Biography') + ' : ' + this.defaultOptions.separatorChar.repeat(7) + "\"" + this.deleteSpecialChar(dataExport.biography) + "\"" + this.defaultOptions.separatorChar.repeat(3) + this.defaultOptions.returnLineChar
        outText += game.i18n.localize('DND5E.Appearance') + ' : ' + this.defaultOptions.separatorChar.repeat(7) + "\"" + this.deleteSpecialChar(dataExport.appearance) + "\"" + this.defaultOptions.separatorChar.repeat(3) + this.defaultOptions.returnLineChar

        for (var i = 0; i < dataExport.personality.length; i++) {
            let personality = dataExport.personality[i];
            outText += personality.name + ' : ' + this.defaultOptions.separatorChar.repeat(7) + "\"" + personality.description + "\"" + this.defaultOptions.separatorChar.repeat(3) + this.defaultOptions.returnLineChar;
        }
        outText += this.defaultOptions.separatorChar.repeat(10) + this.defaultOptions.returnLineChar;

        outText += game.i18n.localize('DND5E.ConsumeAttribute') + ' : ' + this.defaultOptions.separatorChar.repeat(10) + this.defaultOptions.returnLineChar;
        for (var i = 0; i < dataExport.feats.length; i++) {
            let feat = dataExport.feats[i];
            outText += feat.name + this.defaultOptions.separatorChar.repeat(7) + "\"" + this.deleteSpecialChar(feat.description) + "\"" + this.defaultOptions.separatorChar.repeat(3) + this.defaultOptions.returnLineChar;
        }
        outText += this.defaultOptions.separatorChar.repeat(10) + this.defaultOptions.returnLineChar;

        outText += game.i18n.localize('TYPES.Item.spellPl') + this.defaultOptions.separatorChar + game.i18n.localize('DND5E.ItemActivation') + this.defaultOptions.separatorChar
        outText += game.i18n.localize('DND5E.SpellComponents') + this.defaultOptions.separatorChar + game.i18n.localize('DND5E.School') + this.defaultOptions.separatorChar
        outText += game.i18n.localize('DND5E.Range') + this.defaultOptions.separatorChar + game.i18n.localize('DND5E.Duration') + this.defaultOptions.separatorChar
        outText += game.i18n.localize('DND5E.Description') + this.defaultOptions.separatorChar.repeat(3) + this.defaultOptions.returnLineChar;


        for (var i = 0; i < dataExport.spells.length; i++) {
            let spell = dataExport.spells[i];
            outText += spell.name + ' (' + game.i18n.localize('DND5E.AbbreviationLevel') + spell.level + ')' + this.defaultOptions.separatorChar;
            outText += (spell.activation.cost ?? '') + ' ' + spell.activation.type + this.defaultOptions.separatorChar;
            outText += "\"" + spell.components + "\"" + this.defaultOptions.separatorChar + spell.school + this.defaultOptions.separatorChar;
            outText += (spell?.range?.value ?? '') + ' ' + (spell?.range?.units ?? '') + this.defaultOptions.separatorChar + (spell?.duration?.value ?? '') + ' ' + (spell?.duration?.units ?? '') + this.defaultOptions.separatorChar;
            outText += "\"" + this.deleteSpecialChar(spell.description) + "\"" + this.defaultOptions.separatorChar.repeat(3) + this.defaultOptions.returnLineChar;
        }
        outText += this.defaultOptions.separatorChar.repeat(10) + this.defaultOptions.returnLineChar;

        outText += game.i18n.localize('DND5E.Inventory') + ' : ' + this.defaultOptions.separatorChar.repeat(10) + this.defaultOptions.returnLineChar;
        outText += game.i18n.localize('DND5E.CurrencyAbbrPP') + this.defaultOptions.separatorChar + game.i18n.localize('DND5E.CurrencyAbbrGP') + this.defaultOptions.separatorChar;
        outText += game.i18n.localize('DND5E.CurrencyAbbrEP') + this.defaultOptions.separatorChar + game.i18n.localize('DND5E.CurrencyAbbrSP') + this.defaultOptions.separatorChar;
        outText += game.i18n.localize('DND5E.CurrencyAbbrCP') + this.defaultOptions.separatorChar.repeat(6) + this.defaultOptions.returnLineChar;

        outText += dataExport.money.pp + this.defaultOptions.separatorChar + dataExport.money.gp + this.defaultOptions.separatorChar;
        outText += dataExport.money.ep + this.defaultOptions.separatorChar + dataExport.money.sp + this.defaultOptions.separatorChar;
        outText += dataExport.money.cp + this.defaultOptions.separatorChar.repeat(6) + this.defaultOptions.returnLineChar;

        for (var i = 0; i < dataExport.objects.length; i++) {
            let object = dataExport.objects[i];
            outText += object.name + '(' + object.quantity + ')' + this.defaultOptions.separatorChar.repeat(7);
            outText += "\"" + this.deleteSpecialChar(object.description) + "\"" + this.defaultOptions.separatorChar.repeat(3) + this.defaultOptions.returnLineChar;
        }
        outText += this.defaultOptions.separatorChar.repeat(10) + this.defaultOptions.returnLineChar;

        return outText;
    }

    static deleteSpecialChar(description) {
        let result;
        if (null != description) {
            result = description.replace(/(\r\n|\n|\r|;)/gm, " ")
            //description.replace(/(\r\n|\n|\r|;|<.*>)/gm, "")
            //strInputCode.replace(/<\/?[^>]+(>|$)/g, "");

            let tmpDiv = document.createElement("DIV");
            tmpDiv.innerHTML = result;
            result = tmpDiv.textContent || tmpDiv.innerText || "";
        } else {
            result = "";
        }

        return result;
    }

    static createSimpleField(label, value) {
        return label + ' : ' + this.defaultOptions.separatorChar + value + this.defaultOptions.separatorChar
    }
}