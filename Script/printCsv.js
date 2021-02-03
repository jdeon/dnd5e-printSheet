export default class PrintSheetCsv {

	static get defaultOptions() {
	  return {separatorChar: ';',
      returnLineChar: '\r\n',
        };
    }
    
    static convertdataToCsvText(data, itemByType) {
        let outText = 'Nom : ' + this.defaultOptions.separatorChar + data.name + this.defaultOptions.returnLineChar ;
        
        for(var i = 0; i < itemByType.classes.length; i ++){
            let classe = itemByType.classes[i];
            outText += classe.name + ' (' + classe.data.levels + ') - ' +  classe.data.subclass + '    ';
        }
        outText +=  this.defaultOptions.returnLineChar;
        
        outText+= 'Alignement : ' + this.defaultOptions.separatorChar + data.data.details.alignment + this.defaultOptions.separatorChar;
        outText+= 'Race : ' + this.defaultOptions.separatorChar + data.data.details.race + this.defaultOptions.separatorChar;
        outText+= 'Historique : ' + this.defaultOptions.separatorChar + data.data.details.background + this.defaultOptions.separatorChar;
        outText+= 'Xp : ' + this.defaultOptions.separatorChar + data.data.details.xp.value + this.defaultOptions.returnLineChar;
        
        outText += 'PV : ' + this.defaultOptions.separatorChar + data.data.attributes.hp.value + '/' + data.data.attributes.hp.max + this.defaultOptions.separatorChar;
        outText += 'CA : ' + this.defaultOptions.separatorChar + data.data.attributes.ac.value + this.defaultOptions.separatorChar;
        outText += 'Mouvement : ' + this.defaultOptions.separatorChar + data.data.attributes.movement.walk + 'm' + this.defaultOptions.returnLineChar;

        outText += 'Caracteristique - ' + this.defaultOptions.separatorChar;
        outText += 'Force : ' + this.defaultOptions.separatorChar + data.data.abilities.str.value + this.defaultOptions.separatorChar;
        outText += 'Dexterite : ' + this.defaultOptions.separatorChar + data.data.abilities.dex.value + this.defaultOptions.separatorChar;
        outText += 'Constitution : ' + this.defaultOptions.separatorChar + data.data.abilities.con.value + this.defaultOptions.separatorChar;
        outText += 'Inteligence : ' + this.defaultOptions.separatorChar + data.data.abilities.int.value + this.defaultOptions.separatorChar;
        outText += 'Sagesse : ' + this.defaultOptions.separatorChar + data.data.abilities.wis.value + this.defaultOptions.separatorChar;
        outText += 'Charisme : ' + this.defaultOptions.separatorChar + data.data.abilities.cha.value + this.defaultOptions.returnLineChar;

        outText += 'JdS Maitrisé - ';
        let arrayAbilities = Object.values(data.data.abilities);
        for(var i = 0; i < arrayAbilities.length; i++){
            outText += this.defaultOptions.separatorChar;
            if(arrayAbilities[i].proficient === 1){
                 outText += 'X'
            } else {
                outText += '-'
            }
            outText += this.defaultOptions.separatorChar;
        }
        outText += this.defaultOptions.returnLineChar;
        
        outText += 'Vision : ' + this.defaultOptions.separatorChar + data.data.traits.senses + this.defaultOptions.returnLineChar;
        
        outText += this.defaultOptions.returnLineChar;
        
        
        outText += 'Biographie : ' + this.defaultOptions.returnLineChar;
        
        outText += 'Histoire : ' + this.defaultOptions.separatorChar + this.deleteSpecialChar(data.data.details.biography.value) + this.defaultOptions.returnLineChar;
        
        outText += 'Apparence : ' + this.defaultOptions.separatorChar + this.deleteSpecialChar(data.data.details.appearance) + this.defaultOptions.returnLineChar;
        
        outText += 'Trait : ' + this.defaultOptions.separatorChar + data.data.details.trait + this.defaultOptions.returnLineChar;
        
        outText += 'Idéal : ' + this.defaultOptions.separatorChar + data.data.details.ideal + this.defaultOptions.returnLineChar;
        
        outText += 'Lien : ' + this.defaultOptions.separatorChar + data.data.details.bond + this.defaultOptions.returnLineChar;
        
        outText += 'Défaut : ' + this.defaultOptions.separatorChar + data.data.details.flaw + this.defaultOptions.returnLineChar;
        
        outText += this.defaultOptions.returnLineChar;
        
        
        outText += 'Capacité : ' + this.defaultOptions.returnLineChar;
        
        for(var i = 0; i < itemByType.capacites.length; i ++){
            let capacite = itemByType.capacites[i];
            outText += capacite.name + this.defaultOptions.separatorChar + this.deleteSpecialChar(capacite.data.description.value) + ' '+ this.defaultOptions.returnLineChar;
        }
        outText += ' ' + this.defaultOptions.returnLineChar;
        
        
        outText += 'Sorts : ' + this.defaultOptions.returnLineChar;
        
        for(var i = 0; i < itemByType.sorts.length; i ++){
            let sort = itemByType.sorts[i];
            outText += sort.name + ' (Niv' + sort.data.level + ')' + this.defaultOptions.separatorChar;
            outText += sort.data.activation.cost + ' ' + sort.data.activation.type + this.defaultOptions.separatorChar;
            outText += (sort.data.components.vocal ? 'V,' : '') + (sort.data.components.somatic ? 'S,' : '') + (sort.data.components.material ? 'M (' + sort.data.materials.value + '),' : '') + (sort.data.components.ritual ? 'R,' : '') + (sort.data.components.concentration ? 'C,' : '') + this.defaultOptions.separatorChar;
            outText += this.deleteSpecialChar(sort.data.description.value) + ' ' + this.defaultOptions.returnLineChar;
        }
        outText += ' ' + this.defaultOptions.returnLineChar;
      /*"data": {
        "school": "evo",
        "preparation": {
          "mode": "always",
          "prepared": false
        }
    */
        
        
        outText += 'Iventaire : ' + this.defaultOptions.returnLineChar;
        
        outText += 'pp' + this.defaultOptions.separatorChar + data.data.currency.pp + this.defaultOptions.separatorChar;
        outText += 'po' + this.defaultOptions.separatorChar + data.data.currency.gp + this.defaultOptions.separatorChar;
        outText += 'pe' + this.defaultOptions.separatorChar + data.data.currency.ep + this.defaultOptions.separatorChar;
        outText += 'pa' + this.defaultOptions.separatorChar + data.data.currency.sp + this.defaultOptions.separatorChar;
        outText += 'pc' + this.defaultOptions.separatorChar + data.data.currency.cp + this.defaultOptions.returnLineChar;
        
        for(var i = 0; i < itemByType.objets.length; i ++){
            let objet = itemByType.objets[i];
            outText += objet.name +  '(' + objet.data.quantity + ')' + this.defaultOptions.separatorChar;
            outText += this.deleteSpecialChar(objet.data.description.value) + ' ' + this.defaultOptions.returnLineChar;
        }
        outText += ' ' + this.defaultOptions.returnLineChar;
        
        return outText;
    }
    
    static deleteSpecialChar(description){
        let result;
        if(null != description){
           result =  description.replace(/(\r\n|\n|\r|;)/gm, " ")
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
}