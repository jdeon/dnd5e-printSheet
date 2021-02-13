export default class PrintSheetCsv {

	static get defaultOptions() {
	  return {separatorChar: ';',
      returnLineChar: '\r\n',
        };
    }
    
    static convertdataToCsvText(dataExport) {
        let outText = 'Nom : ' + this.defaultOptions.separatorChar + dataExport.pcName + this.defaultOptions.returnLineChar ;
        
        for(var i = 0; i < dataExport.classes.length; i ++){
            let classe = dataExport.classes[i];
            outText += classe.name + ' (' + classe.level + ') - ' +  classe.subclass + '    ';
        }
        outText +=  this.defaultOptions.returnLineChar;
        
        outText+= 'Alignement : ' + this.defaultOptions.separatorChar + dataExport.alignment + this.defaultOptions.separatorChar;
        outText+= 'Race : ' + this.defaultOptions.separatorChar + dataExport.race + this.defaultOptions.separatorChar;
        outText+= 'Historique : ' + this.defaultOptions.separatorChar + dataExport.background + this.defaultOptions.separatorChar;
        outText+= 'Xp : ' + this.defaultOptions.separatorChar + dataExport.xp.value + '/' + dataExport.xp.nextLvl + this.defaultOptions.returnLineChar;
        
        outText += 'PV : ' + this.defaultOptions.separatorChar + dataExport.hp.actual + '/' + dataExport.hp.max + this.defaultOptions.separatorChar;
        outText += 'CA : ' + this.defaultOptions.separatorChar + dataExport.ac + this.defaultOptions.separatorChar;
        
        outText += 'Mouvement : ' + this.defaultOptions.separatorChar;
        for (var i = 0 ; i < dataExport.speeds.length ; i++){
            let speed = dataExport.speeds[i];
            outText += speed.name + ':' + speed.value + speed.units ;
        }
        outText += this.defaultOptions.returnLineChar;
        
        outText += this.defaultOptions.returnLineChar;
        
        outText += 'Caracteristique - ' + this.defaultOptions.separatorChar;
        for (var i = 0 ; i < dataExport.abilities.length ; i++){
            let abilitie = dataExport.abilities [i];
            outText += abilitie.name + this.defaultOptions.separatorChar;
        }
        outText +=  this.defaultOptions.returnLineChar;
        outText += 'Valeur - ' + this.defaultOptions.separatorChar;
        for (var i = 0 ; i < dataExport.abilities.length ; i++){
            let abilitie = dataExport.abilities [i];
            outText += abilitie.value + ' (' + abilitie.mod + ')' + this.defaultOptions.separatorChar;
        }
        outText +=  this.defaultOptions.returnLineChar;
        outText += 'JdS - ' + this.defaultOptions.separatorChar;
        for (var i = 0 ; i < dataExport.abilities.length ; i++){
            let abilitie = dataExport.abilities [i];
            outText += abilitie.save + this.defaultOptions.separatorChar;
        }
        outText += this.defaultOptions.returnLineChar;
        outText += this.defaultOptions.returnLineChar;
        
        outText += 'Vision : ' + this.defaultOptions.separatorChar;
        for (var i = 0 ; i < dataExport.senses.length ; i++){
            let sense = dataExport.senses[i];
            outText += sense.name + ':' + sense.value + sense.units ;
        }
        outText += this.defaultOptions.returnLineChar;       
        
        outText += 'Biographie : ' + this.defaultOptions.returnLineChar;
        outText += 'Histoire : ' + this.defaultOptions.separatorChar + this.deleteSpecialChar(dataExport.biography) + this.defaultOptions.returnLineChar;
        outText += 'Apparence : ' + this.defaultOptions.separatorChar + this.deleteSpecialChar(dataExport.appearance) + this.defaultOptions.returnLineChar;
        outText += 'Trait : ' + this.defaultOptions.separatorChar + dataExport.trait + this.defaultOptions.returnLineChar;
        outText += 'Idéal : ' + this.defaultOptions.separatorChar + dataExport.ideal + this.defaultOptions.returnLineChar;
        outText += 'Lien : ' + this.defaultOptions.separatorChar + dataExport.bond + this.defaultOptions.returnLineChar;
        outText += 'Défaut : ' + this.defaultOptions.separatorChar + dataExport.flaw + this.defaultOptions.returnLineChar;
        outText += this.defaultOptions.returnLineChar;
           
        outText += 'Capacité : ' + this.defaultOptions.returnLineChar;
        for(var i = 0; i < dataExport.feats.length; i ++){
            let feat = dataExport.feats[i];
            outText += feat.name + this.defaultOptions.separatorChar + this.deleteSpecialChar(feat.description) + ' '+ this.defaultOptions.returnLineChar;
        }
        outText += ' ' + this.defaultOptions.returnLineChar;
        
        outText += 'Sorts : ' + this.defaultOptions.returnLineChar;   
        for(var i = 0; i < dataExport.spells.length; i ++){
            let spell = dataExport.spells[i];
            outText += spell.name + ' (Niv' + spell.level + ')' + this.defaultOptions.separatorChar;
            outText += spell.activation.cost + ' ' + spell.activation.type + this.defaultOptions.separatorChar;
            outText += spell.components + this.defaultOptions.separatorChar;
            outText += this.deleteSpecialChar(spell.description) + ' ' + this.defaultOptions.returnLineChar;
        }
        outText += ' ' + this.defaultOptions.returnLineChar;
        
        outText += 'Iventaire : ' + this.defaultOptions.returnLineChar;
        outText += 'pp' + this.defaultOptions.separatorChar + dataExport.money.pp + this.defaultOptions.separatorChar;
        outText += 'po' + this.defaultOptions.separatorChar + dataExport.money.gp + this.defaultOptions.separatorChar;
        outText += 'pe' + this.defaultOptions.separatorChar + dataExport.money.ep + this.defaultOptions.separatorChar;
        outText += 'pa' + this.defaultOptions.separatorChar + dataExport.money.sp + this.defaultOptions.separatorChar;
        outText += 'pc' + this.defaultOptions.separatorChar + dataExport.money.cp + this.defaultOptions.returnLineChar;
        
        for(var i = 0; i < dataExport.objects.length; i ++){
            let object = dataExport.objects[i];
            outText += object.name +  '(' + object.quantity + ')' + this.defaultOptions.separatorChar;
            outText += this.deleteSpecialChar(object.description) + ' ' + this.defaultOptions.returnLineChar;
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