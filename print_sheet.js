import DataMapper from "./script/mapToDataExport.js"
import PrintSheetCsv from "./script/printCsv.js";
import PrintSheetHtml from "./script/printHtml.js";

class PrintActorSheetModule {
    
    static onRenderActorSheet(obj, html, data) {      
        if (data.isCharacter && game.settings.get("dnd5e-print-sheet", "typeExport") > 0) {
            let element = html.find(".window-header .window-title")
            PrintActorSheetModule.addButton(element, obj.object);
        }
    }
    
    static addButton(element, dataObj) {
        // Can't find it?
        if (element.length != 1) {
            return;
        }
        let button = $(`<a class="header-button control print-sheet" data-tooltip="${game.i18n.localize("DND5E-PRINT-SHEET.PrintSheet")}" aria-label="${game.i18n.localize("DND5E-PRINT-SHEET.PrintSheet")}"><i class="fas fa-file-export fa-fw"></i></a>`);
        
        button.on('click', (event) => printActorSheet(dataObj));
        element.after(button);
    }
}


async function printActorSheet(dataSheet) {
    // Prepare export data
    const dataDndSheet = dataSheet.clone(); 
    const dataToExport = DataMapper.mapDndDataToDataExport(dataDndSheet);
    
    let textExport;
    let exportTyp;
    let filename;
    let typExport = game.settings.get("dnd5e-print-sheet", "typeExport");
    
    if(typExport === 1){
        textExport = await PrintSheetHtml.convertdataToHtmlText(dataToExport, 'modules/dnd5e-print-sheet/template/htmlPlainExportTemplate.html');
        exportTyp = 'html';
        filename = `fvtt-${dataToExport.pcName.replace(/\s/g, "_")}(plain).` + exportTyp;
    } else if (typExport === 2){
        textExport =  PrintSheetCsv.convertdataToCsvText(dataToExport);
        exportTyp = 'csv';
        filename = `fvtt-${dataToExport.pcName.replace(/\s/g, "_")}.` + exportTyp;
    } else if (typExport === 3){
        textExport =  await PrintSheetHtml.convertdataToHtmlText(dataToExport, 'modules/dnd5e-print-sheet/template/htmlAccordionExportTemplate.html');
        exportTyp = 'html';
        filename = `fvtt-${dataToExport.pcName.replace(/\s/g, "_")}(accordion).` + exportTyp;
    }
    
    if(filename){
        saveDataToFile(textExport, "text/"+exportTyp, filename); //+"; charset=UTF-8"
    }
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
    console.log('dnd5e-print-sheet | Initializing dnd5e-print-sheet');
    // Assign custom classes and constants here
    // Register custom module settings
    //registerSettings();
    
    return loadTemplates(['modules/dnd5e-print-sheet/template/htmlPlainExportTemplate.html', 'modules/dnd5e-print-sheet/template/htmlAccordionExportTemplate.html']);
    
});

Hooks.once('ready', () => {
    game.settings.register("dnd5e-print-sheet", "typeExport", {
		name: game.i18n.localize("DND5E-PRINT-SHEET.Settings.ExportType.Name"),
		hint: game.i18n.localize("DND5E-PRINT-SHEET.Settings.ExportType.Hint"),
		scope: "world",
		scope: "client",
        config: true,
        type: Number,
        choices: {
            0 : "",
            1 : "Plain Html",
            2 : "CSV",
            3 : "Accordion Html (Mobile friendly)",
        },
        default: 0
	});
});


Hooks.on('renderActorSheet', PrintActorSheetModule.onRenderActorSheet);
