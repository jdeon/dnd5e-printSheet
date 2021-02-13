import { DND5E } from "../../systems/dnd5e/module/config.js";
import DataMapper from "./script/mapToDataExport.js"
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
    
    if(true){//TODO remplacer par type export désirer
        textExport = await PrintSheetHtml.convertdataToHtmlText(dataToExport);
        exportTyp = 'html';
    } else {
        textExport = PrintSheetCsv.convertdataToCsvText(dataToExport);
        exportTyp = 'csv';
    }
    
    // Trigger file save procedure
    debugger;
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
    console.log('print-sheet | Initializing print-sheet');
    // Assign custom classes and constants here
    // Register custom module settings
    //registerSettings();
    
    return loadTemplates(['modules/dnd5e-printSheet/template/htmlExportTemplate.html']);
    
});

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