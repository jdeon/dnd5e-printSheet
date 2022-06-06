import { DND5E } from "../../systems/dnd5e/module/config.js";
import DataMapper from "./script/mapToDataExport.js"
import PrintSheetCsv from "./script/printCsv.js";
import PrintSheetHtml from "./script/printHtml.js";

class PrintActorSheetModule {
    
    static onRenderActorSheet(obj, html, data) {      
        if (data.isCharacter && game.settings.get("dnd5e-printSheet", "typeExport") > 0) {
            let element = html.find(".window-header .window-title")
            PrintActorSheetModule.addButton(element, obj.object.data, game.actors.find(a => a.data._id === obj.object.data._id));
        }
    }
    
    static addButton(element, dataObj, actor) {
        // Can't find it?
        if (element.length != 1) {
            return;
        }
        let button = $(`<a class="popout" style><i class="fas fa-file-export fa-fw"></i>Imprimer fiche</a>`);
        button.on('click', (event) => printActorSheet(dataObj));
        element.after(button);
    }
}


async function printActorSheet(dataSheet) {
    // Prepare export data
    const dataDndSheet = duplicate(dataSheet);

    // Flag some metadata about where the entity was exported some - in case migration is needed later
    /*
    data.flags["exportSource"] = {
    world: game.world.id,
    system: game.system.id,
    coreVersion: game.data.version,
    systemVersion: game.system.data.version
    };
    */
    
    const dataToExport = DataMapper.mapDndDataToDataExport(dataDndSheet);
    
    let textExport;
    let exportTyp;
    let typExport = game.settings.get("dnd5e-printSheet", "typeExport");
    
    if(typExport === 1){
        textExport = await PrintSheetHtml.convertdataToHtmlText(dataToExport);
        exportTyp = 'html';
    } else if (typExport === 2){
        textExport = PrintSheetCsv.convertdataToCsvText(dataToExport);
        exportTyp = 'csv';
    }
    
    const filename = `fvtt-${dataToExport.pcName.replace(/\s/g, "_")}.` + exportTyp;
    saveDataToFile(textExport, "text/"+exportTyp, filename); //; charset=UTF-8
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

Hooks.once('init', async function () {
    console.log('dnd5e-printSheet | Initializing dnd5e-printSheet');
    // Assign custom classes and constants here
    // Register custom module settings
    //registerSettings();
    
    return loadTemplates(['modules/dnd5e-printSheet/template/htmlExportTemplate.html']);
    
});

Hooks.once('ready', () => {
    game.settings.register("dnd5e-printSheet", "typeExport", {
		name: "Type export",
		hint: "Définie les types de fichier exporté",
		scope: "world",
		scope: "client",
        config: true,
        type: Number,
        choices: {
            0 : "",
            1 : "Html",
            2 : "CSV"
        },
        default: 0
	});
});


Hooks.on('renderActorSheet', PrintActorSheetModule.onRenderActorSheet);
