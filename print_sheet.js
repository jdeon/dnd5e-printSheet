import { DND5E } from "../../systems/dnd5e/module/config.js";
import PrintSheetCsv from "./script/printCsv.js";
import PrintSheetHtml from "./script/printHtml.js";

class PrintActorSheetModule {
    
    static onRenderActorSheet(obj, html, data) {
        const users = game.users.entities;
        const user = users.find(u => u.data._id === game.userId);
        if (/*user.data.role >= 2 && */!game.settings.get("print-sheet", "disableButton")) {
            let element = html.find(".window-header .window-title")
            
            PrintActorSheetModule.addButton(element, obj.object.data, game.actors.entities.find(a => a.data._id === obj.object.data._id));
        }
    }
    
    static addButton(element, dataObj, actor) {
        // Can't find it?
        if (element.length != 1) {
            return;
        }
        let button = $(`<a class="popout" style><i class="fas fa-file-export fa-fw"></i>Imprimer fiche</a>`);
        button.on('click', (event) => printActorSheet(actor, dataObj));
        element.after(button);
    }
    
    static sortItemByType(items){
        let classes = [];
        let objets = []
        let capacites = [];
        let sorts = [];
        
        for (var i = 0 ; i < items.length; i++){
            switch (items[i].type) {
            case 'class':
                classes.push(items[i]);
                break;
            case 'feat':
                capacites.push(items[i]);
                break;
            case 'spell':
                sorts.push(items[i]);
                break;
            default:
                objets.push(items[i]);
                break;
            }
        }
        
        return {classes: classes,
                objets: objets,
                capacites : capacites,
                sorts : sorts
            
        }
    }
}


async function printActorSheet(actor, dataSheet) {
    // Prepare export data
    const data = duplicate(actor._data);
    const dataSheetDupl = duplicate(dataSheet);
    delete data.folder;
    delete data.permission;

    // Flag some metadata about where the entity was exported some - in case migration is needed later
    data.flags["exportSource"] = {
      world: game.world.id,
      system: game.system.id,
      coreVersion: game.data.version,
      systemVersion: game.system.data.version
    };
    
    const itemByType = PrintActorSheetModule.sortItemByType(data.items);
    
    const textExport = PrintSheetHtml.convertdataToHtmlText(data, dataSheetDupl, itemByType);
    //const textExport = PrintSheetCsv.convertdataToCsvText(data, itemByType);
    
    
    // Trigger file save procedure
    /*
    const filename = `fvtt-${actor.name.replace(/\s/g, "_")}.csv`;
    saveDataToFile(textExport, "text/csv", filename); //; charset=UTF-8
    */
    
    const filename = `fvtt-${actor.name.replace(/\s/g, "_")}.html`;
    saveDataToFile(textExport, "text/html", filename); //; charset=UTF-8
}


function customSaveDataToFile(data, type, filename) {
  const blob = new Blob([data], {type: type});

  // Create an element to trigger the download
  let a = document.createElement('a');
  a.href = window.URL.createObjectURL(blob);
  a.download = filename;

  // Dispatch a click event to the element
  a.dispatchEvent(new MouseEvent("click", {bubbles: true, cancelable: true, view: window}));
  setTimeout(() => window.URL.revokeObjectURL(a.href), 100);
}

Hooks.once('ready', () => {
    game.settings.register("print-sheet", "disableButton", {
		name: game.i18n.localize("metricsystem.settings.disable.name"),
		hint: game.i18n.localize("metricsystem.settings.disable.hint"),
		scope: "world",
		config: true,
		default: false,
		type: Boolean
	});
});


Hooks.on('renderActorSheet', PrintActorSheetModule.onRenderActorSheet);

/*
"data": {
    "attributes": {   
      "spellcasting": "cha",
      "death": {
        "success": 0,
        "failure": 0
      },
      "exhaustion": 0,
      "inspiration": false
    },
    "traits": {
      "size": "med",
      "di": {
        "value": [],
        "custom": ""
      },
      "dr": {
        "value": [],
        "custom": ""
      },
      "dv": {
        "value": [],
        "custom": ""
      },
      "ci": {
        "value": [],
        "custom": ""
      },
      "languages": {
        "value": [
          "common",
          "elvish",
          "dwarvish",
          "sylvan"
        ],
        "custom": ""
      },
      "weaponProf": {
        "value": [
          "sim"
        ],
        "custom": "Arbalète de poing; Epée courte; Epée longue; Rapière"
      },
      "armorProf": {
        "value": [
          "lgt"
        ],
        "custom": ""
      },
      "toolProf": {
        "value": [
          "disg",
          "pois",
          "thief"
        ],
        "custom": "Outils de joalerie"
      }
    },
    "currency": {
      "pp": null,
      "gp": 35,
      "ep": 0,
      "sp": 9,
      "cp": 95
    },
    "skills": {
      "acr": {
        "value": 2,
        "ability": "dex"
      },
      "ani": {
        "value": 0,
        "ability": "wis"
      },
      "arc": {
        "value": 0,
        "ability": "int"
      },
      "ath": {
        "value": 0,
        "ability": "str"
      },
      "dec": {
        "value": 0,
        "ability": "cha"
      },
      "his": {
        "value": 0,
        "ability": "int"
      },
      "ins": {
        "value": 1,
        "ability": "wis"
      },
      "itm": {
        "value": 0,
        "ability": "cha"
      },
      "inv": {
        "value": 0,
        "ability": "int"
      },
      "med": {
        "value": 0,
        "ability": "wis"
      },
      "nat": {
        "value": 0,
        "ability": "int"
      },
      "prc": {
        "value": 1,
        "ability": "wis"
      },
      "prf": {
        "value": 0,
        "ability": "cha"
      },
      "per": {
        "value": 1,
        "ability": "cha"
      },
      "rel": {
        "value": 0,
        "ability": "int"
      },
      "slt": {
        "value": 1,
        "ability": "dex"
      },
      "ste": {
        "value": 2,
        "ability": "dex"
      },
      "sur": {
        "value": 0,
        "ability": "wis"
      }
    },
    "spells": {
      "spell1": {
        "value": 0,
        "override": null,
        "max": 0
      },
      "spell2": {
        "value": 0,
        "override": null,
        "max": 0
      },
      "spell3": {
        "value": 0,
        "override": null,
        "max": 0
      },
      "spell4": {
        "value": 0,
        "override": null,
        "max": 0
      },
      "spell5": {
        "value": 0,
        "override": null,
        "max": 0
      },
      "spell6": {
        "value": 0,
        "override": null,
        "max": 0
      },
      "spell7": {
        "value": 0,
        "override": null,
        "max": 0
      },
      "spell8": {
        "value": 0,
        "override": null,
        "max": 0
      },
      "spell9": {
        "value": 0,
        "override": null,
        "max": 0
      },
      "pact": {
        "value": 2,
        "override": 2,
        "max": 0
      }
    },
    "bonuses": {
      "mwak": {
        "attack": "",
        "damage": ""
      },
      "rwak": {
        "attack": "",
        "damage": ""
      },
      "msak": {
        "attack": "",
        "damage": ""
      },
      "rsak": {
        "attack": "",
        "damage": ""
      },
      "abilities": {
        "check": "",
        "save": "",
        "skill": ""
      },
      "spell": {
        "dc": ""
      }
    },
    "resources": {
      "primary": {
        "value": null,
        "max": null,
        "sr": false,
        "lr": false,
        "label": ""
      },
      "secondary": {
        "value": null,
        "max": null,
        "sr": false,
        "lr": false,
        "label": ""
      },
      "tertiary": {
        "value": null,
        "max": null,
        "sr": false,
        "lr": false,
        "label": ""
      }
    }
  },*/