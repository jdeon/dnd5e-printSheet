import DataMapper from "./script/mapToDataExport.js"
import PrintSheetCsv from "./script/printCsv.js";
import PrintSheetHtml from "./script/printHtml.js";

class PrintActorSheetModule {

    static onRenderActorSheet(obj, html, data) {
        if (data.isCharacter) {
            let element = $(html).find(".window-header .fa-ellipsis-vertical")
            PrintActorSheetModule.addButton(element, data);
        }
    }

    static addButton(element, dataObj) {
        // Can't find it?
        if (element.length != 1) {
            return;
        }
        let button = $(`<button class="header-control icon fa-solid fa-file-export print-sheet" data-tooltip="${game.i18n.localize("DND5E-PRINT-SHEET.PrintSheet")}" aria-label="${game.i18n.localize("DND5E-PRINT-SHEET.PrintSheet")}"/>`);

        button.on('click', () => PrintActorSheetModule.onButtonClick(dataObj));
        element.after(button);
    }

    static onButtonClick(dataSheet){
        let typeExport = game.settings.get("dnd5e-print-sheet", "typeExport");

        if(typeExport){
            printActorSheet(dataSheet, typeExport) 
        } else {
            new Dialog({
                title: `Type of the export`,
                content: `
                  <form>
                    <div class="form-group">
                      <label>Type of the export</label>
                      <select name="typeExport" id="typeExport">
                        <option value="1">Plain Html</option>
                        <option value="2">CSV</option>
                        <option value="3">Accordion Html (Mobile friendly)</option>
                      </select>
                    </div>
                  </form>
                  `,
                buttons: {
                    export: {
                        icon: "<i class='fas fa-check'></i>",
                        label: `Export`,
                        callback: (html) => printActorSheet(dataSheet, Number(html.find('#typeExport')[0].value))
                    },
                    cancel: {
                        icon: "<i class='fas fa-times'></i>",
                        label: `Cancel Changes`
                    },
                },
                default: "yes",
              }).render(true);
        }
    }
}

async function printActorSheet(dataSheet, typExport) {
    // Prepare export data
    //const dataDndSheet = dataSheet.clone();
    const dataToExport = DataMapper.mapDndDataToDataExport(dataSheet);

    let textExport;
    let exportTyp;
    let filename;
    
    
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
            0 : game.i18n.localize("DND5E-PRINT-SHEET.Settings.ExportType.AskEachTime"),
            1 : "Plain Html",
            2 : "CSV",
            3 : "Accordion Html (Mobile friendly)",
        },
        default: 0
	});
});


Hooks.on('renderCharacterActorSheet', PrintActorSheetModule.onRenderActorSheet);
