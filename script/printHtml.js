export default class PrintSheetHtml extends FormApplication {
//utiliser this._renderInner(data, options) pour généré la liste
    constructor(object = {}, options = {}) {
        super(object, options);
        this._data = object;
    }
        
    get title() {
        return "PrintSheet";
    }
    
    static get defaultOptions() {
        const options = super.defaultOptions;
        options.resizable = true;
        options.title = "Export";
        return options;
    }

    
    static async convertdataToHtmlText(dataExport, template) {
        let defaultOptions = {...this.defaultOptions, template}
        let exportFrom = new PrintSheetHtml(dataExport, defaultOptions);
        let htmlForm = await exportFrom._renderInner(dataExport, defaultOptions);
        let result = PrintSheetHtml.generationPrefixSourceHtml();
        
        for(var i = 0 ; i < htmlForm.length ; i++){
            result += htmlForm[i].outerHTML;
        }
        
        result += '</body>';
        result += '</html>';
        return result;
    }
    
    static generationPrefixSourceHtml(){
        let  outText = '<!DOCTYPE html>'
        outText += '<html lang="fr">';
        outText += '<head>';
    
        outText += '</head>';
        outText += '<body>';
        
        return outText;
    }
}

/**
<div class="sheet-page sheet-options">    <div class="sheet-header">
        <div class="sheet-name-container">
            <img src="https://app.roll20.net/images/dndstyling/srd5_360.png" style="padding-bottom: 5px" alt="SRD5e by Roll20">
            <input type="text" name="attr_character_name" style="width: 100%">
            <span class="sheet-label" data-i18n="char-name-u">NOM DU PERSONNAGE</span>
        </div>
        <input class="sheet-options-flag" type="checkbox" name="attr_options-class-selection" checked="checked"><span>y</span>
        <div class="sheet-header-info sheet-options">
            <div class="sheet-row" style="border-top: 2px dashed gold">
                <span data-i18n="class:-u">CLASSE:</span>
                <input type="hidden" name="attr_custom_class" class="sheet-flag">
                <select class="sheet-hiding sheet-class" name="attr_class">
                    <option value="" data-i18n="choose">Choisir</option>
                    <option value="Artificer" data-i18n="artificer">Artificier</option>
                    <option value="Barbarian" data-i18n="barbarian">Barbare</option>
                    <option value="Bard" data-i18n="bard">Barde</option>
                    <option value="Cleric" data-i18n="cleric">Clerc</option>
                    <option value="Druid" data-i18n="druid">Druide</option>
                    <option value="Fighter" data-i18n="fighter">Guerrier</option>
                    <option value="Monk" data-i18n="monk">Moine</option>
                    <option value="Paladin" data-i18n="paladin">Paladin</option>
                    <option value="Ranger" data-i18n="ranger">Rôdeur</option>
                    <option value="Rogue" data-i18n="rogue">Roublard</option>
                    <option value="Sorcerer" data-i18n="sorcerer">Ensorceleur</option>
                    <option value="Warlock" data-i18n="warlock">Sorcier</option>
                    <option value="Wizard" data-i18n="wizard">Magicien</option>
                </select>
                <input type="text" class="sheet-showing" name="attr_cust_classname" style="width: 90px">
                <span data-i18n="subclass:-u">SOUS-CLASSE:</span>
                <input type="text" name="attr_subclass">
                <span data-i18n="lvl:-u">NIVEAU&nbsp;:</span>
                <input type="number" class="sheet-class-level" style="width: 40px" name="attr_base_level" value="1">
            </div>
            <div class="sheet-row">
                <span data-i18n="race:-u">RACE:</span>
                <input type="text" name="attr_race">
                <span data-i18n="subrace:-u">SOUS-RACE:</span>
                <input type="text" name="attr_subrace">
            </div>
        </div>
        <div class="sheet-header-info sheet-display">
            <div class="sheet-top">
                <div class="sheet-hlabel-container">
                    <input type="text" name="attr_class_display" class="sheet-class-display sheet-no_events">
                    <span class="sheet-label" data-i18n="class-level-u">CLASSE &amp; NIV</span>
                </div>
                <div class="sheet-hlabel-container">
                    <input type="text" name="attr_background" style="width: 182px">
                    <span class="sheet-label" data-i18n="background-u">HISTORIQUE</span>
                </div>
            </div>
            <div class="sheet-bottom">
                <div class="sheet-hlabel-container">
                    <input type="text" name="attr_race_display" class="sheet-no_events">
                    <span class="sheet-label" data-i18n="race-u">RACE</span>
                </div>
                <div class="sheet-hlabel-container">
                    <input type="text" name="attr_alignment">
                    <span class="sheet-label" data-i18n="alignment-u">ALIGNEMENT</span>
                </div>
                <div class="sheet-hlabel-container" style="position: relative">
                    <input type="hidden" name="attr_invalidXP" value="0">
                    <input type="text" name="attr_experience">
                    <span class="sheet-label" data-i18n="exp-pts-u">PX</span>
                    <input class="sheet-showleveler" type="hidden" name="attr_showleveler" value="0">
                    <button class="sheet-levelerbutton" type="action" name="act_launch_lvl+mancer" style="padding: 0px ; position: absolute ; top: -10px ; right: 0px" title="Charactermancer Level Up"><img src="https://s3.amazonaws.com/files.d20.io/images/175804938/qmVmtNHONHhHcd9cxCxm7w/med.png?1604618286" style="height: 18px ; width: 18px ; max-width: inherit" alt="Wand &amp; Hammer logo of Charactermancer"></button>
                    <div class="sheet-invalidXP"><span class="sheet-icon">!</span><span class="sheet-message" data-i18n="invalidxp">Entrer un nombre pour le rappel de Montée de Niveau</span></div>
                </div>
            </div>
        </div>
    </div>
    <div class="sheet-body">
        <div class="sheet-col sheet-col1">
            <div class="sheet-class_options">
                <div class="sheet-row">
                    <span data-i18n="hit-die:-u">DÉ DE VIE&nbsp;:</span>
                    <select name="attr_hitdietype">
                        <option value="4">D4</option>
                        <option value="6">D6</option>
                        <option value="8">D8</option>
                        <option value="10">D10</option>
                        <option value="12">D12</option>
                    </select>
                </div>
                <div class="sheet-row">
                    <span data-i18n="carrying-capacity-mod:-u">MODIFICATEUR DE CAPACITÉ DE CHARGE&nbsp;:</span>
                    <input type="text" class="sheet-num" name="attr_carrying_capacity_mod" placeholder="*2">
                </div>
                <div class="sheet-row">
                    <span data-i18n="glob-atk-mod:-u">MODIF. GLOBAL AUX ATT. MAGIQUES&nbsp;:</span>
                    <input type="text" class="sheet-num" name="attr_globalmagicmod" placeholder="0" value="0">
                </div>
                <div class="sheet-row">
                    <span data-i18n="magic-caster-lvl:-u">NIV. DE LANCEUR DE SORTS&nbsp;:</span>
                    <input type="text" class="sheet-num" name="attr_caster_level">
                </div>
                <div class="sheet-row">
                    <span data-i18n="spell_dc_mod:-u">MOD. DE DD DE SVG DU SORT&nbsp;:</span>
                    <input type="text" class="sheet-num" name="attr_spell_dc_mod" placeholder="0" value="0">
                </div>
                <div class="sheet-row">
                    <span data-i18n="spell-icons:-u">ICÔNES DE SORT&nbsp;:</span>
                    <select name="attr_spellicon_flag">
                        <option value="all" data-i18n="show_all">Tout afficher</option>
                        <option value="cp" data-i18n="cr_only">Seulement C &amp; R</option>
                        <option value="none" data-i18n="none">Aucun(e)</option>
                    </select>
                </div>
                <div class="sheet-row">
                    <input type="checkbox" name="attr_powerful_build" value="1">
                    <span data-i18n="powerful_build-u">CARRURE PUISSANTE</span>
                </div>
                <div class="sheet-row">
                    <input type="checkbox" name="attr_halflingluck_flag" value="1">
                    <span data-i18n="halfling-luck-u">Chance du halfelin</span>
                </div>
                <div class="sheet-row">
                    <input type="checkbox" name="attr_arcane_fighter" value="1">
                    <span data-i18n="arcane-fighter-u">Guerrier lanceur de sorts</span>
                </div>
                <div class="sheet-row">
                    <input type="checkbox" name="attr_arcane_rogue" value="1">
                    <span data-i18n="arcane-rogue-u">Roublard lanceur de sorts</span>
                </div>
                <div class="sheet-row sheet-title">
                    <span data-i18n="class-options-u">OPTIONS DE CLASSE (<input type="text" name="attr_class_label" value="@{class}" disabled="true" data-formula="@{class}">)</span>
                </div>
            </div>
            <div class="sheet-class_options">
                <div class="sheet-row">
                    <input type="checkbox" name="attr_multiclass1_flag" value="1">
                    <span data-i18n="2nd-class:-u">2e CLASSE&nbsp;:</span>
                    <select name="attr_multiclass1" style="width: 64px">
                        <option value="Artificer" data-i18n="artificer">Artificier</option>
                        <option value="Barbarian" data-i18n="barbarian">Barbare</option>
                        <option value="Bard" data-i18n="bard">Barde</option>
                        <option value="Cleric" data-i18n="cleric">Clerc</option>
                        <option value="Druid" data-i18n="druid">Druide</option>
                        <option value="Fighter" data-i18n="fighter">Guerrier</option>
                        <option value="Monk" data-i18n="monk">Moine</option>
                        <option value="Paladin" data-i18n="paladin">Paladin</option>
                        <option value="Ranger" data-i18n="ranger">Rôdeur</option>
                        <option value="Rogue" data-i18n="rogue">Roublard</option>
                        <option value="Sorcerer" data-i18n="sorcerer">Ensorceleur</option>
                        <option value="Warlock" data-i18n="warlock">Sorcier</option>
                        <option value="Wizard" data-i18n="wizard">Magicien</option>
                    </select>
                    <span data-i18n="lvl:-u">NIVEAU&nbsp;:</span>
                    <input type="text" name="attr_multiclass1_lvl" value="1" style="width: 28px ; text-align: center">
                    <span data-i18n="subclass:-u" class="sheet-subclass">SOUS-CLASSE:</span>
                    <input type="text" name="attr_multiclass1_subclass">
                </div>
                <div class="sheet-row">
                    <input type="checkbox" name="attr_multiclass2_flag" value="1">
                    <span data-i18n="3rd-class:-u">3e CLASSE&nbsp;:</span>
                    <select name="attr_multiclass2" style="width: 64px">
                        <option value="Artificer" data-i18n="artificer">Artificier</option>
                        <option value="Barbarian" data-i18n="barbarian">Barbare</option>
                        <option value="Bard" data-i18n="bard">Barde</option>
                        <option value="Cleric" data-i18n="cleric">Clerc</option>
                        <option value="Druid" data-i18n="druid">Druide</option>
                        <option value="Fighter" data-i18n="fighter">Guerrier</option>
                        <option value="Monk" data-i18n="monk">Moine</option>
                        <option value="Paladin" data-i18n="paladin">Paladin</option>
                        <option value="Ranger" data-i18n="ranger">Rôdeur</option>
                        <option value="Rogue" data-i18n="rogue">Roublard</option>
                        <option value="Sorcerer" data-i18n="sorcerer">Ensorceleur</option>
                        <option value="Warlock" data-i18n="warlock">Sorcier</option>
                        <option value="Wizard" data-i18n="wizard">Magicien</option>
                    </select>
                    <span data-i18n="lvl:-u">NIVEAU&nbsp;:</span>
                    <input type="text" name="attr_multiclass2_lvl" value="1" style="width: 28px ; text-align: center">
                    <span data-i18n="subclass:-u" class="sheet-subclass">SOUS-CLASSE:</span>
                    <input type="text" name="attr_multiclass2_subclass">
                </div>
                <div class="sheet-row">
                    <input type="checkbox" name="attr_multiclass3_flag" value="1">
                    <span data-i18n="4th-class:-u">4e CLASSE&nbsp;:</span>
                    <select name="attr_multiclass3" style="width: 64px">
                        <option value="Artificer" data-i18n="artificer">Artificier</option>
                        <option value="Barbarian" data-i18n="barbarian">Barbare</option>
                        <option value="Bard" data-i18n="bard">Barde</option>
                        <option value="Cleric" data-i18n="cleric">Clerc</option>
                        <option value="Druid" data-i18n="druid">Druide</option>
                        <option value="Fighter" data-i18n="fighter">Guerrier</option>
                        <option value="Monk" data-i18n="monk">Moine</option>
                        <option value="Paladin" data-i18n="paladin">Paladin</option>
                        <option value="Ranger" data-i18n="ranger">Rôdeur</option>
                        <option value="Rogue" data-i18n="rogue">Roublard</option>
                        <option value="Sorcerer" data-i18n="sorcerer">Ensorceleur</option>
                        <option value="Warlock" data-i18n="warlock">Sorcier</option>
                        <option value="Wizard" data-i18n="wizard">Magicien</option>
                    </select>
                    <span data-i18n="lvl:-u">NIVEAU&nbsp;:</span>
                    <input type="text" name="attr_multiclass3_lvl" value="1" style="width: 28px ; text-align: center">
                    <span data-i18n="subclass:-u" class="sheet-subclass">SOUS-CLASSE:</span>
                    <input type="text" name="attr_multiclass3_subclass">
                </div>
                <div class="sheet-row sheet-title">
                    <span data-i18n="mutliclass-opts-u">OPTIONS DE MULTICLASSAGE</span>
                </div>
            </div>
            <div class="sheet-class_options">
                <div class="sheet-row">
                    <input type="checkbox" name="attr_custom_class" value="1">
                    <span data-i18n="use-cust-class-u">UTILISER UNE CLASSE PERSONNALISÉE</span>
                </div>
                <div class="sheet-row">
                    <span data-i18n="class-name:-u">NOM DE LA CLASSE&nbsp;:</span>
                    <input type="text" name="attr_cust_classname">
                </div>
                <div class="sheet-row">
                    <span data-i18n="hit-die:-u">DÉ DE VIE&nbsp;:</span>
                    <select name="attr_cust_hitdietype">
                        <option value="4">D4</option>
                        <option value="6">D6</option>
                        <option value="8">D8</option>
                        <option value="10">D10</option>
                        <option value="12">D12</option>
                    </select>
                </div>
                <div class="sheet-row">
                    <span data-i18n="spellcasting-ability:-u">CARACT. DE LANCEUR DE SORTS&nbsp;:</span>
                    <select name="attr_cust_spellcasting_ability">
                        <option value="0*" data-i18n="none-u">AUCUN(E)</option>
                        <option value="@{strength_mod}+" data-i18n="strength-u">FORCE</option>
                        <option value="@{dexterity_mod}+" data-i18n="dexterity-u">DEXTÉRITÉ</option>
                        <option value="@{constitution_mod}+" data-i18n="constitution-u">CONSTITUTION</option>
                        <option value="@{intelligence_mod}+" data-i18n="intelligence-u">INTELLIGENCE</option>
                        <option value="@{wisdom_mod}+" data-i18n="wisdom-u">SAGESSE</option>
                        <option value="@{charisma_mod}+" data-i18n="charisma-u">CHARISME</option>
                    </select>
                </div>
                <div class="sheet-row">
                    <span data-i18n="spell-slots:-u">EMPLACEMENTS DE SORTS&nbsp;:</span>
                    <select name="attr_cust_spellslots">
                        <option value="none" data-i18n="none-u">AUCUN(E)</option>
                        <option value="full" data-i18n="spell-full-u">COMPLET (clerc, druid, magicien)</option>
                        <option value="half" data-i18n="spell-half-u">LA MOITIÉ (artificier, paladin, rôdeur)</option>
                        <option value="third" data-i18n="spell-third-u">UN TIERS (guerrier ou roublard)</option>
                    </select>
                </div>
                <div class="sheet-row">
                    <span data-i18n="saves-u">SAUVEGARDES</span>
                </div>
                <div class="sheet-row">
                    <input type="checkbox" name="attr_cust_strength_save_prof" value="(@{pb})">
                    <span data-i18n="strength">Force</span>
                </div>
                <div class="sheet-row">
                    <input type="checkbox" name="attr_cust_dexterity_save_prof" value="(@{pb})">
                    <span data-i18n="dexterity">Dextérité</span>
                </div>
                <div class="sheet-row">
                    <input type="checkbox" name="attr_cust_constitution_save_prof" value="(@{pb})">
                    <span data-i18n="constitution">Constitution</span>
                </div>
                <div class="sheet-row">
                    <input type="checkbox" name="attr_cust_intelligence_save_prof" value="(@{pb})">
                    <span data-i18n="intelligence">Intelligence</span>
                </div>
                <div class="sheet-row">
                    <input type="checkbox" name="attr_cust_wisdom_save_prof" value="(@{pb})">
                    <span data-i18n="wisdom">Sagesse</span>
                </div>
                <div class="sheet-row">
                    <input type="checkbox" name="attr_cust_charisma_save_prof" value="(@{pb})">
                    <span data-i18n="charisma">Charisme</span>
                </div>
                <input type="hidden" name="attr_honor_toggle" class="sheet-toggleVisibility">
                <div class="sheet-row sheet-toggleVisibilityBy-honor">
                    <input type="checkbox" name="attr_cust_honor_save_prof" value="(@{pb})">
                    <span data-i18n="honor">Honneur</span>
                </div>
                <input type="hidden" name="attr_sanity_toggle" class="sheet-toggleVisibility">
                <div class="sheet-row sheet-toggleVisibilityBy-sanity">
                    <input type="checkbox" name="attr_cust_sanity_save_prof" value="(@{pb})">
                    <span data-i18n="sanity">Santé mentale</span>
                </div>
                <div class="sheet-row sheet-title">
                    <span data-i18n="cust-class-opts">OPTIONS DE CLASSE PERSONNALISÉE</span>
                </div>
            </div>
            <div class="sheet-class_options sheet-spell_slot_mods">
                <div class="sheet-column">
                    <div class="sheet-row">
                        <span data-i18n="lvl-u">NIVEAU</span><span class="sheet-num_plus">1 +</span>
                        <input type="text" class="sheet-num" name="attr_lvl1_slots_mod" value="0" placeholder="0" title="@{lvl1_slots_mod}">
                    </div>
                    <div class="sheet-row">
                        <span data-i18n="lvl-u">NIVEAU</span><span class="sheet-num_plus">2 +</span>
                        <input type="text" class="sheet-num" name="attr_lvl2_slots_mod" value="0" placeholder="0" title="@{lvl2_slots_mod}">
                    </div>
                    <div class="sheet-row">
                        <span data-i18n="lvl-u">NIVEAU</span><span class="sheet-num_plus">3 +</span>
                        <input type="text" class="sheet-num" name="attr_lvl3_slots_mod" value="0" placeholder="0" title="@{lvl3_slots_mod}">
                    </div>
                </div>
                <div class="sheet-column">
                    <div class="sheet-row">
                        <span data-i18n="lvl-u">NIVEAU</span><span class="sheet-num_plus">4 +</span>
                        <input type="text" class="sheet-num" name="attr_lvl4_slots_mod" value="0" placeholder="0" title="@{lvl4_slots_mod}">
                    </div>
                    <div class="sheet-row">
                        <span data-i18n="lvl-u">NIVEAU</span><span class="sheet-num_plus">5 +</span>
                        <input type="text" class="sheet-num" name="attr_lvl5_slots_mod" value="0" placeholder="0" title="@{lvl5_slots_mod}">
                    </div>
                    <div class="sheet-row">
                        <span data-i18n="lvl-u">NIVEAU</span><span class="sheet-num_plus">6 +</span>
                        <input type="text" class="sheet-num" name="attr_lvl6_slots_mod" value="0" placeholder="0" title="@{lvl6_slots_mod}">
                    </div>
                </div>
                <div class="sheet-column">
                    <div class="sheet-row">
                        <span data-i18n="lvl-u">NIVEAU</span><span class="sheet-num_plus">7 +</span>
                        <input type="text" class="sheet-num" name="attr_lvl7_slots_mod" value="0" placeholder="0" title="@{lvl7_slots_mod}">
                    </div>
                    <div class="sheet-row">
                        <span data-i18n="lvl-u">NIVEAU</span><span class="sheet-num_plus">8 +</span>
                        <input type="text" class="sheet-num" name="attr_lvl8_slots_mod" value="0" placeholder="0" title="@{lvl8_slots_mod}">
                    </div>
                    <div class="sheet-row">
                        <span data-i18n="lvl-u">NIVEAU</span><span class="sheet-num_plus">9 +</span>
                        <input type="text" class="sheet-num" name="attr_lvl9_slots_mod" value="0" placeholder="0" title="@{lvl9_slots_mod}">
                    </div>
                </div>
                <div class="sheet-row sheet-title">
                    <span data-i18n="spell_slot_modifiers-u">MODIFICATEUR DES EMPLACEMENTS DE SORTS</span>
                </div>
            </div>
        </div>
        <div class="sheet-col sheet-col2">
            <div class="sheet-attribute_options" style="width: 234px">
                <div class="sheet-row sheet-skill">
                    <span data-i18n="strength-u">FORCE</span>
                    <span>+</span><input type="text" class="sheet-num" name="attr_strength_bonus" value="0" placeholder="0" title="@{strength_bonus}">
                </div>
                <div class="sheet-row sheet-skill">
                    <span data-i18n="dexterity-u">DEXTÉRITÉ</span>
                    <span>+</span><input type="text" class="sheet-num" name="attr_dexterity_bonus" value="0" placeholder="0" title="@{dexterity_bonus}">
                </div>
                <div class="sheet-row sheet-skill">
                    <span data-i18n="constitution-u">CONSTITUTION</span>
                    <span>+</span><input type="text" class="sheet-num" name="attr_constitution_bonus" value="0" placeholder="0" title="@{constitution_bonus}">
                </div>
                <div class="sheet-row sheet-skill">
                    <span data-i18n="intelligence-u">INTELLIGENCE</span>
                    <span>+</span><input type="text" class="sheet-num" name="attr_intelligence_bonus" value="0" placeholder="0" title="@{intelligence_bonus}">
                </div>
                <div class="sheet-row sheet-skill">
                    <span data-i18n="wisdom-u">SAGESSE</span>
                    <span>+</span><input type="text" class="sheet-num" name="attr_wisdom_bonus" value="0" placeholder="0" title="@{wisdom_bonus}">
                </div>
                <div class="sheet-row sheet-skill">
                    <span data-i18n="charisma-u">CHARISME</span>
                    <span>+</span><input type="text" class="sheet-num" name="attr_charisma_bonus" value="0" placeholder="0" title="@{charisma_bonus}">
                </div>
                <input type="hidden" name="attr_honor_toggle" class="sheet-toggleVisibility">
                <div class="sheet-row sheet-skill sheet-toggleVisibilityBy-honor">
                    <span data-i18n="honor-u">HONNEUR</span>
                    <span>+</span><input type="text" class="sheet-num" name="attr_honor_bonus" value="0" placeholder="0" title="@{honor_bonus}">
                </div>
                <input type="hidden" name="attr_sanity_toggle" class="sheet-toggleVisibility">
                <div class="sheet-row sheet-skill sheet-toggleVisibilityBy-sanity">
                    <span data-i18n="sanity-u">SANTE MENTALE</span>
                    <span>+</span><input type="text" class="sheet-num" name="attr_sanity_bonus" value="0" placeholder="0" title="@{sanity_bonus}">
                </div>
                <div class="sheet-row">
                    <span data-i18n="initiative-mod:-u">MODIF. D'INITIATIVE&nbsp;:</span>
                    <input type="text" class="sheet-num" name="attr_initmod" placeholder="0" value="0">
                </div>
                <div class="sheet-row">
                    <span data-i18n="initiative-style:-u">TYPE D’INITIATIVE&nbsp;:</span>
                    <select name="attr_initiative_style">
                        <option value="@{d20}" selected="selected" data-i18n="norm">Normal</option>
                        <option value="{@{d20},@{d20}}kh1" data-i18n="adv">Avantage</option>
                        <option value="{@{d20},@{d20}}kl1" data-i18n="disadv">Désavantage</option>
                    </select>
                </div>
                <div class="sheet-row">
                    <input type="checkbox" name="attr_init_tiebreaker" value="@{dexterity}/100">
                    <span data-i18n="add-dex-tiebreaker-u">AFFICHER LA DEX POUR DÉPARTAGER L'INITIATIVE</span>
                </div>
                <div class="sheet-row">
                    <span data-i18n="armor-class-tracking:-u">CALCUL DE LA CLASSE D'ARMURE&nbsp;:</span>
                    <select name="attr_custom_ac_flag">
                        <option value="0" selected="selected" data-i18n="automatic">Automatique</option>
                        <option value="1" data-i18n="custom">Personnalisé</option>
                        <option value="2" data-i18n="off">Inactif</option>
                    </select>
                </div>
                <input class="sheet-toggleflag" type="hidden" name="attr_custom_ac_flag" value="1">
                <div class="sheet-row sheet-hidden">
                    <span data-i18n="custom_ac:-u">CA PERSO.&nbsp;:</span>
                    <input type="text" class="sheet-num" name="attr_custom_ac_base" placeholder="10" value="10">
                    <span>+</span>
                    <select name="attr_custom_ac_part1">
                        <option value="none" selected="selected" data-i18n="none-u">AUCUN(E)</option>
                        <option value="Strength" data-i18n="str-u">FOR</option>
                        <option value="Dexterity" data-i18n="dex-u">DEX</option>
                        <option value="Constitution" data-i18n="con-u">CON</option>
                        <option value="Intelligence" data-i18n="int-u">INT</option>
                        <option value="Wisdom" data-i18n="wis-u">SAG</option>
                        <option value="Charisma" data-i18n="cha-u">CHA</option>
                    </select>
                    <span>+</span>
                    <select name="attr_custom_ac_part2">
                        <option value="none" selected="selected" data-i18n="none-u">AUCUN(E)</option>
                        <option value="Strength" data-i18n="str-u">FOR</option>
                        <option value="Dexterity" data-i18n="dex-u">DEX</option>
                        <option value="Constitution" data-i18n="con-u">CON</option>
                        <option value="Intelligence" data-i18n="int-u">INT</option>
                        <option value="Wisdom" data-i18n="wis-u">SAG</option>
                        <option value="Charisma" data-i18n="cha-u">CHA</option>
                    </select><br>
                    <input type="checkbox" name="attr_custom_ac_shield" value="yes" checked="">
                    <span data-i18n="allow-shields-u">AUTORISER LES BOUCLIERS?</span>
                    <hr style="margin: 2px">
                </div>
                <div class="sheet-row">
                    <span data-i18n="hpmods:-u">MODIFICATEURS DE PV :</span>
                </div>
                <fieldset class="repeating_hpmod" style="display: none;">
                    <div style="padding-left: 15px ; padding-bottom: 10px">
                        <span data-i18n="levels:-u">NIVEAUX:</span>
                        <select name="attr_levels">
                            <option value="total" selected="selected" data-i18n="total-level-u">NIVEAU TOTAL</option>
                            <option value="base" data-i18n="main-class-level-u">NIVEAU DE LA CLASSE PRINCIPALE</option>
                            <option value="multiclass1" data-i18n="class-2-level-u">NIVEAU DE CLASSE 2</option>
                            <option value="multiclass2" data-i18n="class-3-level-u">NIVEAU DE CLASSE 3</option>
                            <option value="multiclass3" data-i18n="class-4-level-u">NIVEAU DE CLASSE 4</option>
                        </select><br>
                        <span data-i18n="source:-u">SOURCE&nbsp;:</span>
                        <input type="text" name="attr_source">
                        <span data-i18n="mod:-u">MOD :</span>
                        <input type="text" name="attr_mod" class="sheet-num">
                    </div>
                </fieldset><div class="repcontainer" data-groupname="repeating_hpmod"></div><div class="repcontrol" data-groupname="repeating_hpmod"><button class="btn repcontrol_edit">Modify</button><button class="btn repcontrol_add">+Add</button></div>
                <div class="sheet-row sheet-title">
                    <span data-i18n="attribute-opts-u">OPTIONS DES CARACTÉRISTIQUES</span>
                </div>
            </div>
            
            <div class="sheet-save_options" style="width: 234px">
                <div class="sheet-row sheet-skill">
                    <span data-i18n="strength-save-u">SAUVEGARDE DE FORCE</span>
                    <span>+</span><input type="text" class="sheet-num" name="attr_strength_save_mod" value="0" placeholder="0" title="@{strength_save_mod}">
                </div>
                <div class="sheet-row sheet-skill">
                    <span data-i18n="dexterity-save-u">SAUVEGARDE DE DEXTÉRITÉ</span>
                    <span>+</span><input type="text" class="sheet-num" name="attr_dexterity_save_mod" value="0" placeholder="0" title="@{dexterity_save_mod}">
                </div>
                <div class="sheet-row sheet-skill">
                    <span data-i18n="constitution-save-u">SAUVEGARDE DE CONSTITUTION</span>
                    <span>+</span><input type="text" class="sheet-num" name="attr_constitution_save_mod" value="0" placeholder="0" title="@{constitution_save_mod}">
                </div>
                <div class="sheet-row sheet-skill">
                    <span data-i18n="intelligence-save-u">SAUVEGARDE D'INTELLIGENCE</span>
                    <span>+</span><input type="text" class="sheet-num" name="attr_intelligence_save_mod" value="0" placeholder="0" title="@{intelligence_save_mod}">
                </div>
                <div class="sheet-row sheet-skill">
                    <span data-i18n="wisdom-save-u">SAUVEGARDE DE SAGESSE</span>
                    <span>+</span><input type="text" class="sheet-num" name="attr_wisdom_save_mod" value="0" placeholder="0" title="@{wisdom_save_mod}">
                </div>
                <div class="sheet-row sheet-skill">
                    <span data-i18n="charisma-save-u">SAUVEGARDE DE CHARISME</span>
                    <span>+</span><input type="text" class="sheet-num" name="attr_charisma_save_mod" value="0" placeholder="0" title="@{charisma_save_mod}">
                </div>
                <input type="hidden" name="attr_honor_toggle" class="sheet-toggleVisibility">
                <div class="sheet-row sheet-skill sheet-toggleVisibilityBy-honor">
                    <span data-i18n="honor-save-u">JET DE SAUVEGARDE D'HONNEUR</span>
                    <span>+</span><input type="text" class="sheet-num" name="attr_honor_save_mod" value="0" placeholder="0" title="@{honor_save_mod}">
                </div>
                <input type="hidden" name="attr_sanity_toggle" class="sheet-toggleVisibility">
                <div class="sheet-row sheet-skill sheet-toggleVisibilityBy-sanity">
                    <span data-i18n="sanity-save-u">JET DE SAUVEGARDE DE SANTE MENTALE</span>
                    <span>+</span><input type="text" class="sheet-num" name="attr_sanity_save_mod" value="0" placeholder="0" title="@{sanity_save_mod}">
                </div>
                <div class="sheet-row">
                    <span data-i18n="death-save-mod:-u">MODIF. SAUVEGARDE CONTRE LA MORT&nbsp;:</span>
                    <input type="text" class="sheet-num" name="attr_death_save_mod" placeholder="0" value="0">
                </div>
                <div class="sheet-row">
                    <span data-i18n="glob-saving-mod:-u">MODIF. GLOBAL DES JETS DE SAUVEGARDE&nbsp;:</span>
                    <input type="text" class="sheet-num" name="attr_globalsavemod" placeholder="0" value="0">
                </div>
                <div class="sheet-row sheet-title">
                    <span data-i18n="save-opts-u">OPTIONS DES SAUVEGARDES</span>
                </div>
            </div>
            <div class="sheet-skill_options" style="width: 234px">
                <div data-i18n-list="skills-list">
                    <div class="sheet-row sheet-skill">
                        <select name="attr_acrobatics_type"><option value="1" selected="selected" data-i18n="normal">Normal</option><option value="2" data-i18n="expirtise">Expertise</option></select>
                        <span data-i18n="acrobatics-core">Acrobaties <span>(Dex)</span></span>
                        <span>+</span><input type="text" class="sheet-num" name="attr_acrobatics_flat" value="0" placeholder="0" title="@{acrobatics_flat}">
                    </div>
                    <div class="sheet-row sheet-skill">
                        <select name="attr_arcana_type"><option value="1" selected="selected" data-i18n="normal">Normal</option><option value="2" data-i18n="expirtise">Expertise</option></select>
                        <span data-i18n="arcana-core">Arcanes <span>(Int)</span></span>
                        <span>+</span><input type="text" class="sheet-num" name="attr_arcana_flat" value="0" placeholder="0" title="@{arcana_flat}">
                    </div>
                    <div class="sheet-row sheet-skill">
                        <select name="attr_athletics_type"><option value="1" selected="selected" data-i18n="normal">Normal</option><option value="2" data-i18n="expirtise">Expertise</option></select>
                        <span data-i18n="athletics-core">Athlétisme <span>(For)</span></span>
                        <span>+</span><input type="text" class="sheet-num" name="attr_athletics_flat" value="0" placeholder="0" title="@{athletics_flat}">
                    </div>
                    <div class="sheet-row sheet-skill">
                        <select name="attr_stealth_type"><option value="1" selected="selected" data-i18n="normal">Normal</option><option value="2" data-i18n="expirtise">Expertise</option></select>
                        <span data-i18n="stealth-core">Discrétion <span>(Dex)</span></span>
                        <span>+</span><input type="text" class="sheet-num" name="attr_stealth_flat" value="0" placeholder="0" title="@{stealth_flat}">
                    </div>
                    <div class="sheet-row sheet-skill">
                        <select name="attr_animal_handling_type"><option value="1" selected="selected" data-i18n="normal">Normal</option><option value="2" data-i18n="expirtise">Expertise</option></select>
                        <span data-i18n="animal_handling-core">Dressage <span>(Sag)</span></span>
                        <span>+</span><input type="text" class="sheet-num" name="attr_animal_handling_flat" value="0" placeholder="0" title="@{animal_handling_flat}">
                    </div>
                    <div class="sheet-row sheet-skill">
                        <select name="attr_sleight_of_hand_type"><option value="1" selected="selected" data-i18n="normal">Normal</option><option value="2" data-i18n="expirtise">Expertise</option></select>
                        <span data-i18n="sleight_of_hand-core">Escamotage <span>(Dex)</span></span>
                        <span>+</span><input type="text" class="sheet-num" name="attr_sleight_of_hand_flat" value="0" placeholder="0" title="@{sleight_of_hand_flat}">
                    </div>
                    <div class="sheet-row sheet-skill">
                        <select name="attr_history_type"><option value="1" selected="selected" data-i18n="normal">Normal</option><option value="2" data-i18n="expirtise">Expertise</option></select>
                        <span data-i18n="history-core">Histoire <span>(Int)</span></span>
                        <span>+</span><input type="text" class="sheet-num" name="attr_history_flat" value="0" placeholder="0" title="@{history_flat}">
                    </div>
                    <div class="sheet-row sheet-skill">
                        <select name="attr_intimidation_type"><option value="1" selected="selected" data-i18n="normal">Normal</option><option value="2" data-i18n="expirtise">Expertise</option></select>
                        <span data-i18n="intimidation-core">Intimidation <span>(Cha)</span></span>
                        <span>+</span><input type="text" class="sheet-num" name="attr_intimidation_flat" value="0" placeholder="0" title="@{intimidation_flat}">
                    </div>
                    <div class="sheet-row sheet-skill">
                        <select name="attr_investigation_type"><option value="1" selected="selected" data-i18n="normal">Normal</option><option value="2" data-i18n="expirtise">Expertise</option></select>
                        <span data-i18n="investigation-core">Investigation <span>(Int)</span></span>
                        <span>+</span><input type="text" class="sheet-num" name="attr_investigation_flat" value="0" placeholder="0" title="@{investigation_flat}">
                    </div>
                    <div class="sheet-row sheet-skill">
                        <select name="attr_medicine_type"><option value="1" selected="selected" data-i18n="normal">Normal</option><option value="2" data-i18n="expirtise">Expertise</option></select>
                        <span data-i18n="medicine-core">Médecine <span>(Sag)</span></span>
                        <span>+</span><input type="text" class="sheet-num" name="attr_medicine_flat" value="0" placeholder="0" title="@{medicine_flat}">
                    </div>
                    <div class="sheet-row sheet-skill">
                        <select name="attr_nature_type"><option value="1" selected="selected" data-i18n="normal">Normal</option><option value="2" data-i18n="expirtise">Expertise</option></select>
                        <span data-i18n="nature-core">Nature <span>(Int)</span></span>
                        <span>+</span><input type="text" class="sheet-num" name="attr_nature_flat" value="0" placeholder="0" title="@{nature_flat}">
                    </div>
                    <div class="sheet-row sheet-skill">
                        <select name="attr_perception_type"><option value="1" selected="selected" data-i18n="normal">Normal</option><option value="2" data-i18n="expirtise">Expertise</option></select>
                        <span data-i18n="perception-core">Perception <span>(Sag)</span></span>
                        <span>+</span><input type="text" class="sheet-num" name="attr_perception_flat" value="0" placeholder="0" title="@{perception_flat}">
                    </div>
                    <div class="sheet-row sheet-skill">
                        <select name="attr_insight_type"><option value="1" selected="selected" data-i18n="normal">Normal</option><option value="2" data-i18n="expirtise">Expertise</option></select>
                        <span data-i18n="insight-core">Perspicacité <span>(Sag)</span></span>
                        <span>+</span><input type="text" class="sheet-num" name="attr_insight_flat" value="0" placeholder="0" title="@{insight_flat}">
                    </div>
                    <div class="sheet-row sheet-skill">
                        <select name="attr_persuasion_type"><option value="1" selected="selected" data-i18n="normal">Normal</option><option value="2" data-i18n="expirtise">Expertise</option></select>
                        <span data-i18n="persuasion-core">Persuasion <span>(Cha)</span></span>
                        <span>+</span><input type="text" class="sheet-num" name="attr_persuasion_flat" value="0" placeholder="0" title="@{persuasion_flat}">
                    </div>
                    <div class="sheet-row sheet-skill">
                        <select name="attr_religion_type"><option value="1" selected="selected" data-i18n="normal">Normal</option><option value="2" data-i18n="expirtise">Expertise</option></select>
                        <span data-i18n="religion-core">Religion <span>(Int)</span></span>
                        <span>+</span><input type="text" class="sheet-num" name="attr_religion_flat" value="0" placeholder="0" title="@{religion_flat}">
                    </div>
                    <div class="sheet-row sheet-skill">
                        <select name="attr_performance_type"><option value="1" selected="selected" data-i18n="normal">Normal</option><option value="2" data-i18n="expirtise">Expertise</option></select>
                        <span data-i18n="performance-core">Représentation <span>(Cha)</span></span>
                        <span>+</span><input type="text" class="sheet-num" name="attr_performance_flat" value="0" placeholder="0" title="@{performance_flat}">
                    </div>
                    <div class="sheet-row sheet-skill">
                        <select name="attr_survival_type"><option value="1" selected="selected" data-i18n="normal">Normal</option><option value="2" data-i18n="expirtise">Expertise</option></select>
                        <span data-i18n="survival-core">Survie <span>(Sag)</span></span>
                        <span>+</span><input type="text" class="sheet-num" name="attr_survival_flat" value="0" placeholder="0" title="@{survival_flat}">
                    </div>
                    <div class="sheet-row sheet-skill">
                        <select name="attr_deception_type"><option value="1" selected="selected" data-i18n="normal">Normal</option><option value="2" data-i18n="expirtise">Expertise</option></select>
                        <span data-i18n="deception-core">Tromperie<span>(Cha)</span></span>
                        <span>+</span><input type="text" class="sheet-num" name="attr_deception_flat" value="0" placeholder="0" title="@{deception_flat}">
                    </div>
                </div>
                <div class="sheet-row" style="margin-top: 10px">
                    <input type="checkbox" name="attr_jack_of_all_trades" value="@{jack}">
                    <span data-i18n="jack-of-all-u">TOUCHE-À-TOUT</span>
                </div>
                <div class="sheet-row">
                    <span data-i18n="reliable-talent-u">TALENT FIABLE :</span>
                    <select class="sheet-dtype" name="attr_reliable_talent">
                        <option value="10" data-i18n="on">Actif</option>
                        <option value="0" selected="selected" data-i18n="off">Inactif</option>
                    </select>
                </div>
                <div class="sheet-row">
                    <span data-i18n="pass-perc-mod:-u">MODIF. PERCEPTION PASSIVE&nbsp;:</span>
                    <input type="text" class="sheet-num" name="attr_passiveperceptionmod" placeholder="0" value="0">
                </div>
                <div class="sheet-row sheet-title">
                    <span data-i18n="skill-opts-u">OPTIONS DE COMPÉTENCE</span>
                </div>
            </div>
        </div>
        <div class="sheet-col sheet-col3">
            <div class="sheet-general_options">
                <div class="sheet-version">
                    <span data-i18n="version">v</span>
                    <span name="attr_version">4.21</span>
                </div>
                <div class="sheet-row">
                    <input type="checkbox" name="attr_npc" value="1">
                    <span data-i18n="npc-u">PNJ</span>
                </div>
                <div class="sheet-row">
                    <span data-i18n="roll-queries:-u">JETER (DÉS)AVANTAGE&nbsp;:</span>
                    <select name="attr_rtype">
                        <option value="{{always=1}} {{r2=[[@{d20}" data-i18n="always-roll-adv">Toujours</option>
                        <option value="@{advantagetoggle}" data-i18n="toggle-roll-adv">Afficher un bouton</option>
                        <option value="{{query=1}} ?{Advantage?|Normal Roll,&amp;#123&amp;#123normal=1&amp;#125&amp;#125 &amp;#123&amp;#123r2=[[0d20|Advantage,&amp;#123&amp;#123advantage=1&amp;#125&amp;#125 &amp;#123&amp;#123r2=[[@{d20}|Disadvantage,&amp;#123&amp;#123disadvantage=1&amp;#125&amp;#125 &amp;#123&amp;#123r2=[[@{d20}}" data-i18n="query-roll-adv">Demander à chaque jet</option>
                        <option value="{{normal=1}} {{r2=[[0d20" data-i18n="never-roll-adv">Jamais</option>
                    </select>
                </div>
                <div class="sheet-row">
                    <span data-i18n="whisp-rolls-gm:-u">JETS PRIVÉS AU MJ&nbsp;:</span>
                    <select name="attr_wtype">
                        <option value="" data-i18n="never-whisper-roll">Jamais</option>
                        <option value="@{whispertoggle}" data-i18n="toggle-roll-whisper">Afficher un bouton</option>
                        <option value="?{Whisper?|Public Roll,|Whisper Roll,/w gm }" data-i18n="query-whisper-roll">Demander à chaque jet</option>
                        <option value="/w gm " data-i18n="always-whisper-roll">Toujours</option>
                    </select>
                </div>
                <div class="sheet-row">
                    <span data-i18n="auto-dmg-roll:-u">JETS DE DÉGÂTS AUTO&nbsp;:</span>
                    <select class="sheet-dtype" name="attr_dtype">
                        <option value="pick" data-i18n="never-roll-dmg">Jamais</option>
                        <option value="full" data-i18n="always-roll-dmg">Toujours</option>
                    </select>
                </div>
                <div class="sheet-row">
                    <span data-i18n="core-die-roll:-u">JET DE DÉ DE BASE&nbsp;:</span>
                    <input type="text" name="attr_core_die" value="1d20" placeholder="1d20" title="@{core_die}">
                </div>
                <div class="sheet-row">
                    <span data-i18n="default-critical-range:-u">CRITICAL RANGE:</span>
                    <input type="number" name="attr_default_critical_range" value="20" placeholder="20">
                </div>
                <div class="sheet-row">
                    <span data-i18n="prof-bonus:-u">BONUS DE MAÎTRISE&nbsp;:</span>
                    <select class="sheet-dtype" name="attr_pb_type">
                        <option value="level" data-i18n="by-level">Selon le niveau (par défaut)</option>
                        <option value="die" data-i18n="prof-die">Dé de maîtrise (Manuel du MJ)</option>
                        <option value="custom" data-i18n="custom">Personnalisé</option>
                    </select>
                    <input type="hidden" name="attr_pb_type">
                    <input class="sheet-pb_custom" type="text" style="float: right" name="attr_pb_custom" placeholder="2d10">
                </div>
                <div class="sheet-row">
                    <input type="checkbox" name="attr_global_save_mod_flag" value="1">
                    <span data-i18n="show-global-save-field-u">AFFICHER LE CHAMP DU MODIFICATEUR GLOBAL AUX SAUVEGARDES</span>
                </div>
                <div class="sheet-row">
                    <input type="checkbox" name="attr_global_skill_mod_flag" value="1">
                    <span data-i18n="show-global-skill-field-u">AFFICHER LE CHAMP DU MODIFICATEUR GLOBAL AUX COMPÉTENCES</span>
                </div>
                <div class="sheet-row">
                    <input type="checkbox" name="attr_global_attack_mod_flag" value="1">
                    <span data-i18n="show-global-attack-field-u">AFFICHER LE CHAMP DU MODIFICATEUR GLOBAL À L'ATTAQUE</span>
                </div>
                <div class="sheet-row">
                    <input type="checkbox" name="attr_global_damage_mod_flag" value="1">
                    <span data-i18n="show-global-damage-field-u">AFFICHER LE CHAMP DU MODIFICATEUR GLOBAL AUX DÉGÂTS</span>
                </div>
                <div class="sheet-row">
                    <input type="checkbox" name="attr_global_ac_mod_flag" value="1">
                    <span data-i18n="show-global-ac-field-u">AFFICHER LE CHAMP DU MODIFICATEUR GLOBAL A LA CA</span>
                </div>
                <div class="sheet-row">
                    <span data-i18n="add-char-to-templates:-u">AJOUTER NOM DU PERSONNAGE AUX GABARITS&nbsp;:</span>
                    <select class="sheet-dtype" name="attr_charname_output">
                        <option value="{{charname=@{character_name}}}" data-i18n="on">Actif</option>
                        <option value="charname=@{character_name}" selected="selected" data-i18n="off">Inactif</option>
                    </select>
                </div>
                <div class="sheet-row">
                    <span data-i18n="level-calculations:-u">CALCULS AUTOMATIQUES À PARTIR DU NIVEAU&nbsp;:</span>
                    <select class="sheet-dtype" name="attr_level_calculations">
                        <option value="on" selected="selected" data-i18n="on">Actif</option>
                        <option value="off" data-i18n="off">Inactif</option>
                    </select>
                </div>
                <div class="sheet-row">
                    <span data-i18n="encumbrance:-u">ENCOMBREMENT&nbsp;:</span>
                    <select name="attr_encumberance_setting">
                        <option value="off" data-i18n="simple">Simple</option>
                        <option value="on" data-i18n="variant-phb">Variante (cf manuel du joueur)</option>
                        <option value="disabled" data-i18n="off">Inactif</option>
                    </select>
                </div>
                <div class="sheet-row">
                    <input type="checkbox" name="attr_ingore_non_equipped_weight" value="1">
                    <span data-i18n="ingore-non-equipped-weight">IGNORE NON-EQUIPPED ITEMS WEIGHT</span>
                </div>
                <div class="sheet-row">
                    <span data-i18n="inventory:-u">INVENTAIRE&nbsp;:</span>
                    <select name="attr_simpleinventory">
                        <option value="complex" data-i18n="compendium-compatible">Compatible Compendium</option>
                        <option value="simple" data-i18n="simple">Simple</option>
                    </select>
                </div>
                <div class="sheet-row">
                    <span data-i18n="feats-traits-u">CAPACITÉS &amp; TRAITS</span><span>:</span>
                    <select name="attr_simpletraits">
                        <option value="complex" data-i18n="compendium-compatible">Compatible Compendium</option>
                        <option value="simple" data-i18n="simple">Simple</option>
                    </select>
                </div>
                <div class="sheet-row">
                    <span data-i18n="prof-langs-u">AUTRES MAÎTRISES &amp; LANGUES</span><span>:</span>
                    <select name="attr_simpleproficencies">
                        <option value="complex" data-i18n="compendium-compatible">Compatible Compendium</option>
                        <option value="simple" data-i18n="simple">Simple</option>
                    </select>
                </div>
                <div class="sheet-row">
                    <span data-i18n="ammo-tracking:-u">SUIVI DES MUNITIONS&nbsp;:</span>
                    <select name="attr_ammotracking">
                        <option value="on" data-i18n="on">Actif</option>
                        <option value="off" selected="selected" data-i18n="off">Inactif</option>
                    </select>
                    <span data-i18n-title="api-required-title" data-i18n="api-required-u" title="Essayez maintenant avec l'installation d'API en un clic disponible avec votre abonnement Pro." style="color: #666 ; cursor: help">(API nécessaire)</span>
                </div>
                <div class="sheet-row">
                    <span data-i18n="exhaustion-setting-u">Voir niveaux d'épuisement:</span>
                    <select name="attr_exhaustion_toggle">
                        <option value="1" data-i18n="on">Actif</option>
                        <option value="0" data-i18n="off" selected="selected">Inactif</option>
                    </select>
                </div>
                <div class="sheet-row">
                    <span data-i18n="hit-dice-setting-u">TRACK HIT DICE PER CLASS</span>
                    <select name="attr_use_per_class_hit_dice">
                        <option value="1" data-i18n="on">Actif</option>
                        <option value="0" data-i18n="off" selected="selected">Inactif</option>
                    </select>
                </div>
                <div class="sheet-row sheet-title">
                    <span data-i18n="general-opts-u">OPTIONS GÉNÉRALES</span>
                </div>
            </div>
            <div class="sheet-general_options sheet-charactermancer_options">
                <input type="hidden" class="sheet-warningflag" name="attr_leveler_warningflag">
                <div class="sheet-warning">
                    <span>
                        <label><input type="checkbox" name="attr_leveler_warningflag" value="hide">*</label>
                        <span data-i18n="warning-leveler_start-u">ATTENTION - VOUS NE POUVEZ PAS LANCER LE CHARACTERMANCER LEVEL UP JUSQU'À CE QUE VOUS AYEZ UNE CLASSE, UN NIVEAU ET DES PV POUR LE NIVEAU UN. LANCEZ LE CHARACTERMANCER CREATOR EN PREMIER. L'OUTIL DE LEVEL UP NE FONCTIONNE PAS AVEC DES CLASSES PERSONNALISÉES OU SI LES OPTIONS DE MULTICLASSAGE SONT DÉFINIES INCORRECTEMENT.</span>
                    </span>
                </div>
                <div class="sheet-row">
                    <button type="action" name="act_relaunch_lvl1mancer" style="padding: 0px"><img src="https://s3.amazonaws.com/files.d20.io/images/175804938/qmVmtNHONHhHcd9cxCxm7w/med.png?1604618286" style="height: 32px ; width: 32px" alt="Wand &amp; Hammer of Charactermancer"></button><span style="width: 180px ; margin-left: 10px ; display: inline-block" data-i18n="relaunch-lvl1mancer-u">DÉMARRER LE CHARACTERMANCER NIVEAU 1 (NE PEUT ÊTRE ANNULÉ)</span>
                </div>
                <div class="sheet-row">
                    <button type="action" name="act_launch_lvl+mancer" style="padding: 0px"><img src="https://s3.amazonaws.com/files.d20.io/images/175804938/qmVmtNHONHhHcd9cxCxm7w/med.png?1604618286" style="height: 32px ; width: 32px" alt="Wand &amp; Hammer of Charactermancer"></button><span style="width: 180px ; margin-left: 10px ; display: inline-block">LAUNCH LEVEL+ CHARACTERMANCER</span>
                </div>
                <div class="sheet-row sheet-title">
                    <span data-i18n="mancer-opts-u">OPTIONS DU CHARACTERMANCER</span>
                </div>
            </div>
        </div>
    </div>
    </div>
    */

/**
    <div class="sheet-body">
        <div class="sheet-col sheet-col1">
            <div class="sheet-class_options">
                <div class="sheet-row">
                    <span data-i18n="hit-die:-u">DÉ DE VIE&nbsp;:</span>
                    <select name="attr_hitdietype">
                        <option value="4">D4</option>
                        <option value="6">D6</option>
                        <option value="8">D8</option>
                        <option value="10">D10</option>
                        <option value="12">D12</option>
                    </select>
                </div>
                <div class="sheet-row">
                    <span data-i18n="carrying-capacity-mod:-u">MODIFICATEUR DE CAPACITÉ DE CHARGE&nbsp;:</span>
                    <input type="text" class="sheet-num" name="attr_carrying_capacity_mod" placeholder="*2">
                </div>
                <div class="sheet-row">
                    <span data-i18n="glob-atk-mod:-u">MODIF. GLOBAL AUX ATT. MAGIQUES&nbsp;:</span>
                    <input type="text" class="sheet-num" name="attr_globalmagicmod" placeholder="0" value="0">
                </div>
                <div class="sheet-row">
                    <span data-i18n="magic-caster-lvl:-u">NIV. DE LANCEUR DE SORTS&nbsp;:</span>
                    <input type="text" class="sheet-num" name="attr_caster_level">
                </div>
                <div class="sheet-row">
                    <span data-i18n="spell_dc_mod:-u">MOD. DE DD DE SVG DU SORT&nbsp;:</span>
                    <input type="text" class="sheet-num" name="attr_spell_dc_mod" placeholder="0" value="0">
                </div>
                <div class="sheet-row">
                    <span data-i18n="spell-icons:-u">ICÔNES DE SORT&nbsp;:</span>
                    <select name="attr_spellicon_flag">
                        <option value="all" data-i18n="show_all">Tout afficher</option>
                        <option value="cp" data-i18n="cr_only">Seulement C &amp; R</option>
                        <option value="none" data-i18n="none">Aucun(e)</option>
                    </select>
                </div>
                <div class="sheet-row">
                    <input type="checkbox" name="attr_powerful_build" value="1">
                    <span data-i18n="powerful_build-u">CARRURE PUISSANTE</span>
                </div>
                <div class="sheet-row">
                    <input type="checkbox" name="attr_halflingluck_flag" value="1">
                    <span data-i18n="halfling-luck-u">Chance du halfelin</span>
                </div>
                <div class="sheet-row">
                    <input type="checkbox" name="attr_arcane_fighter" value="1">
                    <span data-i18n="arcane-fighter-u">Guerrier lanceur de sorts</span>
                </div>
                <div class="sheet-row">
                    <input type="checkbox" name="attr_arcane_rogue" value="1">
                    <span data-i18n="arcane-rogue-u">Roublard lanceur de sorts</span>
                </div>
                <div class="sheet-row sheet-title">
                    <span data-i18n="class-options-u">OPTIONS DE CLASSE (<input type="text" name="attr_class_label" value="@{class}" disabled="true" data-formula="@{class}">)</span>
                </div>
            </div>
            <div class="sheet-class_options">
                <div class="sheet-row">
                    <input type="checkbox" name="attr_multiclass1_flag" value="1">
                    <span data-i18n="2nd-class:-u">2e CLASSE&nbsp;:</span>
                    <select name="attr_multiclass1" style="width: 64px">
                        <option value="Artificer" data-i18n="artificer">Artificier</option>
                        <option value="Barbarian" data-i18n="barbarian">Barbare</option>
                        <option value="Bard" data-i18n="bard">Barde</option>
                        <option value="Cleric" data-i18n="cleric">Clerc</option>
                        <option value="Druid" data-i18n="druid">Druide</option>
                        <option value="Fighter" data-i18n="fighter">Guerrier</option>
                        <option value="Monk" data-i18n="monk">Moine</option>
                        <option value="Paladin" data-i18n="paladin">Paladin</option>
                        <option value="Ranger" data-i18n="ranger">Rôdeur</option>
                        <option value="Rogue" data-i18n="rogue">Roublard</option>
                        <option value="Sorcerer" data-i18n="sorcerer">Ensorceleur</option>
                        <option value="Warlock" data-i18n="warlock">Sorcier</option>
                        <option value="Wizard" data-i18n="wizard">Magicien</option>
                    </select>
                    <span data-i18n="lvl:-u">NIVEAU&nbsp;:</span>
                    <input type="text" name="attr_multiclass1_lvl" value="1" style="width: 28px ; text-align: center">
                    <span data-i18n="subclass:-u" class="sheet-subclass">SOUS-CLASSE:</span>
                    <input type="text" name="attr_multiclass1_subclass">
                </div>
                <div class="sheet-row">
                    <input type="checkbox" name="attr_multiclass2_flag" value="1">
                    <span data-i18n="3rd-class:-u">3e CLASSE&nbsp;:</span>
                    <select name="attr_multiclass2" style="width: 64px">
                        <option value="Artificer" data-i18n="artificer">Artificier</option>
                        <option value="Barbarian" data-i18n="barbarian">Barbare</option>
                        <option value="Bard" data-i18n="bard">Barde</option>
                        <option value="Cleric" data-i18n="cleric">Clerc</option>
                        <option value="Druid" data-i18n="druid">Druide</option>
                        <option value="Fighter" data-i18n="fighter">Guerrier</option>
                        <option value="Monk" data-i18n="monk">Moine</option>
                        <option value="Paladin" data-i18n="paladin">Paladin</option>
                        <option value="Ranger" data-i18n="ranger">Rôdeur</option>
                        <option value="Rogue" data-i18n="rogue">Roublard</option>
                        <option value="Sorcerer" data-i18n="sorcerer">Ensorceleur</option>
                        <option value="Warlock" data-i18n="warlock">Sorcier</option>
                        <option value="Wizard" data-i18n="wizard">Magicien</option>
                    </select>
                    <span data-i18n="lvl:-u">NIVEAU&nbsp;:</span>
                    <input type="text" name="attr_multiclass2_lvl" value="1" style="width: 28px ; text-align: center">
                    <span data-i18n="subclass:-u" class="sheet-subclass">SOUS-CLASSE:</span>
                    <input type="text" name="attr_multiclass2_subclass">
                </div>
                <div class="sheet-row">
                    <input type="checkbox" name="attr_multiclass3_flag" value="1">
                    <span data-i18n="4th-class:-u">4e CLASSE&nbsp;:</span>
                    <select name="attr_multiclass3" style="width: 64px">
                        <option value="Artificer" data-i18n="artificer">Artificier</option>
                        <option value="Barbarian" data-i18n="barbarian">Barbare</option>
                        <option value="Bard" data-i18n="bard">Barde</option>
                        <option value="Cleric" data-i18n="cleric">Clerc</option>
                        <option value="Druid" data-i18n="druid">Druide</option>
                        <option value="Fighter" data-i18n="fighter">Guerrier</option>
                        <option value="Monk" data-i18n="monk">Moine</option>
                        <option value="Paladin" data-i18n="paladin">Paladin</option>
                        <option value="Ranger" data-i18n="ranger">Rôdeur</option>
                        <option value="Rogue" data-i18n="rogue">Roublard</option>
                        <option value="Sorcerer" data-i18n="sorcerer">Ensorceleur</option>
                        <option value="Warlock" data-i18n="warlock">Sorcier</option>
                        <option value="Wizard" data-i18n="wizard">Magicien</option>
                    </select>
                    <span data-i18n="lvl:-u">NIVEAU&nbsp;:</span>
                    <input type="text" name="attr_multiclass3_lvl" value="1" style="width: 28px ; text-align: center">
                    <span data-i18n="subclass:-u" class="sheet-subclass">SOUS-CLASSE:</span>
                    <input type="text" name="attr_multiclass3_subclass">
                </div>
                <div class="sheet-row sheet-title">
                    <span data-i18n="mutliclass-opts-u">OPTIONS DE MULTICLASSAGE</span>
                </div>
            </div>
            <div class="sheet-class_options">
                <div class="sheet-row">
                    <input type="checkbox" name="attr_custom_class" value="1">
                    <span data-i18n="use-cust-class-u">UTILISER UNE CLASSE PERSONNALISÉE</span>
                </div>
                <div class="sheet-row">
                    <span data-i18n="class-name:-u">NOM DE LA CLASSE&nbsp;:</span>
                    <input type="text" name="attr_cust_classname">
                </div>
                <div class="sheet-row">
                    <span data-i18n="hit-die:-u">DÉ DE VIE&nbsp;:</span>
                    <select name="attr_cust_hitdietype">
                        <option value="4">D4</option>
                        <option value="6">D6</option>
                        <option value="8">D8</option>
                        <option value="10">D10</option>
                        <option value="12">D12</option>
                    </select>
                </div>
                <div class="sheet-row">
                    <span data-i18n="spellcasting-ability:-u">CARACT. DE LANCEUR DE SORTS&nbsp;:</span>
                    <select name="attr_cust_spellcasting_ability">
                        <option value="0*" data-i18n="none-u">AUCUN(E)</option>
                        <option value="@{strength_mod}+" data-i18n="strength-u">FORCE</option>
                        <option value="@{dexterity_mod}+" data-i18n="dexterity-u">DEXTÉRITÉ</option>
                        <option value="@{constitution_mod}+" data-i18n="constitution-u">CONSTITUTION</option>
                        <option value="@{intelligence_mod}+" data-i18n="intelligence-u">INTELLIGENCE</option>
                        <option value="@{wisdom_mod}+" data-i18n="wisdom-u">SAGESSE</option>
                        <option value="@{charisma_mod}+" data-i18n="charisma-u">CHARISME</option>
                    </select>
                </div>
                <div class="sheet-row">
                    <span data-i18n="spell-slots:-u">EMPLACEMENTS DE SORTS&nbsp;:</span>
                    <select name="attr_cust_spellslots">
                        <option value="none" data-i18n="none-u">AUCUN(E)</option>
                        <option value="full" data-i18n="spell-full-u">COMPLET (clerc, druid, magicien)</option>
                        <option value="half" data-i18n="spell-half-u">LA MOITIÉ (artificier, paladin, rôdeur)</option>
                        <option value="third" data-i18n="spell-third-u">UN TIERS (guerrier ou roublard)</option>
                    </select>
                </div>
                <div class="sheet-row">
                    <span data-i18n="saves-u">SAUVEGARDES</span>
                </div>
                <div class="sheet-row">
                    <input type="checkbox" name="attr_cust_strength_save_prof" value="(@{pb})">
                    <span data-i18n="strength">Force</span>
                </div>
                <div class="sheet-row">
                    <input type="checkbox" name="attr_cust_dexterity_save_prof" value="(@{pb})">
                    <span data-i18n="dexterity">Dextérité</span>
                </div>
                <div class="sheet-row">
                    <input type="checkbox" name="attr_cust_constitution_save_prof" value="(@{pb})">
                    <span data-i18n="constitution">Constitution</span>
                </div>
                <div class="sheet-row">
                    <input type="checkbox" name="attr_cust_intelligence_save_prof" value="(@{pb})">
                    <span data-i18n="intelligence">Intelligence</span>
                </div>
                <div class="sheet-row">
                    <input type="checkbox" name="attr_cust_wisdom_save_prof" value="(@{pb})">
                    <span data-i18n="wisdom">Sagesse</span>
                </div>
                <div class="sheet-row">
                    <input type="checkbox" name="attr_cust_charisma_save_prof" value="(@{pb})">
                    <span data-i18n="charisma">Charisme</span>
                </div>
                <input type="hidden" name="attr_honor_toggle" class="sheet-toggleVisibility">
                <div class="sheet-row sheet-toggleVisibilityBy-honor">
                    <input type="checkbox" name="attr_cust_honor_save_prof" value="(@{pb})">
                    <span data-i18n="honor">Honneur</span>
                </div>
                <input type="hidden" name="attr_sanity_toggle" class="sheet-toggleVisibility">
                <div class="sheet-row sheet-toggleVisibilityBy-sanity">
                    <input type="checkbox" name="attr_cust_sanity_save_prof" value="(@{pb})">
                    <span data-i18n="sanity">Santé mentale</span>
                </div>
                <div class="sheet-row sheet-title">
                    <span data-i18n="cust-class-opts">OPTIONS DE CLASSE PERSONNALISÉE</span>
                </div>
            </div>
            <div class="sheet-class_options sheet-spell_slot_mods">
                <div class="sheet-column">
                    <div class="sheet-row">
                        <span data-i18n="lvl-u">NIVEAU</span><span class="sheet-num_plus">1 +</span>
                        <input type="text" class="sheet-num" name="attr_lvl1_slots_mod" value="0" placeholder="0" title="@{lvl1_slots_mod}">
                    </div>
                    <div class="sheet-row">
                        <span data-i18n="lvl-u">NIVEAU</span><span class="sheet-num_plus">2 +</span>
                        <input type="text" class="sheet-num" name="attr_lvl2_slots_mod" value="0" placeholder="0" title="@{lvl2_slots_mod}">
                    </div>
                    <div class="sheet-row">
                        <span data-i18n="lvl-u">NIVEAU</span><span class="sheet-num_plus">3 +</span>
                        <input type="text" class="sheet-num" name="attr_lvl3_slots_mod" value="0" placeholder="0" title="@{lvl3_slots_mod}">
                    </div>
                </div>
                <div class="sheet-column">
                    <div class="sheet-row">
                        <span data-i18n="lvl-u">NIVEAU</span><span class="sheet-num_plus">4 +</span>
                        <input type="text" class="sheet-num" name="attr_lvl4_slots_mod" value="0" placeholder="0" title="@{lvl4_slots_mod}">
                    </div>
                    <div class="sheet-row">
                        <span data-i18n="lvl-u">NIVEAU</span><span class="sheet-num_plus">5 +</span>
                        <input type="text" class="sheet-num" name="attr_lvl5_slots_mod" value="0" placeholder="0" title="@{lvl5_slots_mod}">
                    </div>
                    <div class="sheet-row">
                        <span data-i18n="lvl-u">NIVEAU</span><span class="sheet-num_plus">6 +</span>
                        <input type="text" class="sheet-num" name="attr_lvl6_slots_mod" value="0" placeholder="0" title="@{lvl6_slots_mod}">
                    </div>
                </div>
                <div class="sheet-column">
                    <div class="sheet-row">
                        <span data-i18n="lvl-u">NIVEAU</span><span class="sheet-num_plus">7 +</span>
                        <input type="text" class="sheet-num" name="attr_lvl7_slots_mod" value="0" placeholder="0" title="@{lvl7_slots_mod}">
                    </div>
                    <div class="sheet-row">
                        <span data-i18n="lvl-u">NIVEAU</span><span class="sheet-num_plus">8 +</span>
                        <input type="text" class="sheet-num" name="attr_lvl8_slots_mod" value="0" placeholder="0" title="@{lvl8_slots_mod}">
                    </div>
                    <div class="sheet-row">
                        <span data-i18n="lvl-u">NIVEAU</span><span class="sheet-num_plus">9 +</span>
                        <input type="text" class="sheet-num" name="attr_lvl9_slots_mod" value="0" placeholder="0" title="@{lvl9_slots_mod}">
                    </div>
                </div>
                <div class="sheet-row sheet-title">
                    <span data-i18n="spell_slot_modifiers-u">MODIFICATEUR DES EMPLACEMENTS DE SORTS</span>
                </div>
            </div>
        </div>
        <div class="sheet-col sheet-col2">
            <div class="sheet-attribute_options" style="width: 234px">
                <div class="sheet-row sheet-skill">
                    <span data-i18n="strength-u">FORCE</span>
                    <span>+</span><input type="text" class="sheet-num" name="attr_strength_bonus" value="0" placeholder="0" title="@{strength_bonus}">
                </div>
                <div class="sheet-row sheet-skill">
                    <span data-i18n="dexterity-u">DEXTÉRITÉ</span>
                    <span>+</span><input type="text" class="sheet-num" name="attr_dexterity_bonus" value="0" placeholder="0" title="@{dexterity_bonus}">
                </div>
                <div class="sheet-row sheet-skill">
                    <span data-i18n="constitution-u">CONSTITUTION</span>
                    <span>+</span><input type="text" class="sheet-num" name="attr_constitution_bonus" value="0" placeholder="0" title="@{constitution_bonus}">
                </div>
                <div class="sheet-row sheet-skill">
                    <span data-i18n="intelligence-u">INTELLIGENCE</span>
                    <span>+</span><input type="text" class="sheet-num" name="attr_intelligence_bonus" value="0" placeholder="0" title="@{intelligence_bonus}">
                </div>
                <div class="sheet-row sheet-skill">
                    <span data-i18n="wisdom-u">SAGESSE</span>
                    <span>+</span><input type="text" class="sheet-num" name="attr_wisdom_bonus" value="0" placeholder="0" title="@{wisdom_bonus}">
                </div>
                <div class="sheet-row sheet-skill">
                    <span data-i18n="charisma-u">CHARISME</span>
                    <span>+</span><input type="text" class="sheet-num" name="attr_charisma_bonus" value="0" placeholder="0" title="@{charisma_bonus}">
                </div>
                <input type="hidden" name="attr_honor_toggle" class="sheet-toggleVisibility">
                <div class="sheet-row sheet-skill sheet-toggleVisibilityBy-honor">
                    <span data-i18n="honor-u">HONNEUR</span>
                    <span>+</span><input type="text" class="sheet-num" name="attr_honor_bonus" value="0" placeholder="0" title="@{honor_bonus}">
                </div>
                <input type="hidden" name="attr_sanity_toggle" class="sheet-toggleVisibility">
                <div class="sheet-row sheet-skill sheet-toggleVisibilityBy-sanity">
                    <span data-i18n="sanity-u">SANTE MENTALE</span>
                    <span>+</span><input type="text" class="sheet-num" name="attr_sanity_bonus" value="0" placeholder="0" title="@{sanity_bonus}">
                </div>
                <div class="sheet-row">
                    <span data-i18n="initiative-mod:-u">MODIF. D'INITIATIVE&nbsp;:</span>
                    <input type="text" class="sheet-num" name="attr_initmod" placeholder="0" value="0">
                </div>
                <div class="sheet-row">
                    <span data-i18n="initiative-style:-u">TYPE D’INITIATIVE&nbsp;:</span>
                    <select name="attr_initiative_style">
                        <option value="@{d20}" selected="selected" data-i18n="norm">Normal</option>
                        <option value="{@{d20},@{d20}}kh1" data-i18n="adv">Avantage</option>
                        <option value="{@{d20},@{d20}}kl1" data-i18n="disadv">Désavantage</option>
                    </select>
                </div>
                <div class="sheet-row">
                    <input type="checkbox" name="attr_init_tiebreaker" value="@{dexterity}/100">
                    <span data-i18n="add-dex-tiebreaker-u">AFFICHER LA DEX POUR DÉPARTAGER L'INITIATIVE</span>
                </div>
                <div class="sheet-row">
                    <span data-i18n="armor-class-tracking:-u">CALCUL DE LA CLASSE D'ARMURE&nbsp;:</span>
                    <select name="attr_custom_ac_flag">
                        <option value="0" selected="selected" data-i18n="automatic">Automatique</option>
                        <option value="1" data-i18n="custom">Personnalisé</option>
                        <option value="2" data-i18n="off">Inactif</option>
                    </select>
                </div>
                <input class="sheet-toggleflag" type="hidden" name="attr_custom_ac_flag" value="1">
                <div class="sheet-row sheet-hidden">
                    <span data-i18n="custom_ac:-u">CA PERSO.&nbsp;:</span>
                    <input type="text" class="sheet-num" name="attr_custom_ac_base" placeholder="10" value="10">
                    <span>+</span>
                    <select name="attr_custom_ac_part1">
                        <option value="none" selected="selected" data-i18n="none-u">AUCUN(E)</option>
                        <option value="Strength" data-i18n="str-u">FOR</option>
                        <option value="Dexterity" data-i18n="dex-u">DEX</option>
                        <option value="Constitution" data-i18n="con-u">CON</option>
                        <option value="Intelligence" data-i18n="int-u">INT</option>
                        <option value="Wisdom" data-i18n="wis-u">SAG</option>
                        <option value="Charisma" data-i18n="cha-u">CHA</option>
                    </select>
                    <span>+</span>
                    <select name="attr_custom_ac_part2">
                        <option value="none" selected="selected" data-i18n="none-u">AUCUN(E)</option>
                        <option value="Strength" data-i18n="str-u">FOR</option>
                        <option value="Dexterity" data-i18n="dex-u">DEX</option>
                        <option value="Constitution" data-i18n="con-u">CON</option>
                        <option value="Intelligence" data-i18n="int-u">INT</option>
                        <option value="Wisdom" data-i18n="wis-u">SAG</option>
                        <option value="Charisma" data-i18n="cha-u">CHA</option>
                    </select><br>
                    <input type="checkbox" name="attr_custom_ac_shield" value="yes" checked="">
                    <span data-i18n="allow-shields-u">AUTORISER LES BOUCLIERS?</span>
                    <hr style="margin: 2px">
                </div>
                <div class="sheet-row">
                    <span data-i18n="hpmods:-u">MODIFICATEURS DE PV :</span>
                </div>
                <fieldset class="repeating_hpmod" style="display: none;">
                    <div style="padding-left: 15px ; padding-bottom: 10px">
                        <span data-i18n="levels:-u">NIVEAUX:</span>
                        <select name="attr_levels">
                            <option value="total" selected="selected" data-i18n="total-level-u">NIVEAU TOTAL</option>
                            <option value="base" data-i18n="main-class-level-u">NIVEAU DE LA CLASSE PRINCIPALE</option>
                            <option value="multiclass1" data-i18n="class-2-level-u">NIVEAU DE CLASSE 2</option>
                            <option value="multiclass2" data-i18n="class-3-level-u">NIVEAU DE CLASSE 3</option>
                            <option value="multiclass3" data-i18n="class-4-level-u">NIVEAU DE CLASSE 4</option>
                        </select><br>
                        <span data-i18n="source:-u">SOURCE&nbsp;:</span>
                        <input type="text" name="attr_source">
                        <span data-i18n="mod:-u">MOD :</span>
                        <input type="text" name="attr_mod" class="sheet-num">
                    </div>
                </fieldset><div class="repcontainer" data-groupname="repeating_hpmod"></div><div class="repcontrol" data-groupname="repeating_hpmod"><button class="btn repcontrol_edit">Modify</button><button class="btn repcontrol_add">+Add</button></div>
                <div class="sheet-row sheet-title">
                    <span data-i18n="attribute-opts-u">OPTIONS DES CARACTÉRISTIQUES</span>
                </div>
            </div>
            
            <div class="sheet-save_options" style="width: 234px">
                <div class="sheet-row sheet-skill">
                    <span data-i18n="strength-save-u">SAUVEGARDE DE FORCE</span>
                    <span>+</span><input type="text" class="sheet-num" name="attr_strength_save_mod" value="0" placeholder="0" title="@{strength_save_mod}">
                </div>
                <div class="sheet-row sheet-skill">
                    <span data-i18n="dexterity-save-u">SAUVEGARDE DE DEXTÉRITÉ</span>
                    <span>+</span><input type="text" class="sheet-num" name="attr_dexterity_save_mod" value="0" placeholder="0" title="@{dexterity_save_mod}">
                </div>
                <div class="sheet-row sheet-skill">
                    <span data-i18n="constitution-save-u">SAUVEGARDE DE CONSTITUTION</span>
                    <span>+</span><input type="text" class="sheet-num" name="attr_constitution_save_mod" value="0" placeholder="0" title="@{constitution_save_mod}">
                </div>
                <div class="sheet-row sheet-skill">
                    <span data-i18n="intelligence-save-u">SAUVEGARDE D'INTELLIGENCE</span>
                    <span>+</span><input type="text" class="sheet-num" name="attr_intelligence_save_mod" value="0" placeholder="0" title="@{intelligence_save_mod}">
                </div>
                <div class="sheet-row sheet-skill">
                    <span data-i18n="wisdom-save-u">SAUVEGARDE DE SAGESSE</span>
                    <span>+</span><input type="text" class="sheet-num" name="attr_wisdom_save_mod" value="0" placeholder="0" title="@{wisdom_save_mod}">
                </div>
                <div class="sheet-row sheet-skill">
                    <span data-i18n="charisma-save-u">SAUVEGARDE DE CHARISME</span>
                    <span>+</span><input type="text" class="sheet-num" name="attr_charisma_save_mod" value="0" placeholder="0" title="@{charisma_save_mod}">
                </div>
                <input type="hidden" name="attr_honor_toggle" class="sheet-toggleVisibility">
                <div class="sheet-row sheet-skill sheet-toggleVisibilityBy-honor">
                    <span data-i18n="honor-save-u">JET DE SAUVEGARDE D'HONNEUR</span>
                    <span>+</span><input type="text" class="sheet-num" name="attr_honor_save_mod" value="0" placeholder="0" title="@{honor_save_mod}">
                </div>
                <input type="hidden" name="attr_sanity_toggle" class="sheet-toggleVisibility">
                <div class="sheet-row sheet-skill sheet-toggleVisibilityBy-sanity">
                    <span data-i18n="sanity-save-u">JET DE SAUVEGARDE DE SANTE MENTALE</span>
                    <span>+</span><input type="text" class="sheet-num" name="attr_sanity_save_mod" value="0" placeholder="0" title="@{sanity_save_mod}">
                </div>
                <div class="sheet-row">
                    <span data-i18n="death-save-mod:-u">MODIF. SAUVEGARDE CONTRE LA MORT&nbsp;:</span>
                    <input type="text" class="sheet-num" name="attr_death_save_mod" placeholder="0" value="0">
                </div>
                <div class="sheet-row">
                    <span data-i18n="glob-saving-mod:-u">MODIF. GLOBAL DES JETS DE SAUVEGARDE&nbsp;:</span>
                    <input type="text" class="sheet-num" name="attr_globalsavemod" placeholder="0" value="0">
                </div>
                <div class="sheet-row sheet-title">
                    <span data-i18n="save-opts-u">OPTIONS DES SAUVEGARDES</span>
                </div>
            </div>
            <div class="sheet-skill_options" style="width: 234px">
                <div data-i18n-list="skills-list">
                    <div class="sheet-row sheet-skill">
                        <select name="attr_acrobatics_type"><option value="1" selected="selected" data-i18n="normal">Normal</option><option value="2" data-i18n="expirtise">Expertise</option></select>
                        <span data-i18n="acrobatics-core">Acrobaties <span>(Dex)</span></span>
                        <span>+</span><input type="text" class="sheet-num" name="attr_acrobatics_flat" value="0" placeholder="0" title="@{acrobatics_flat}">
                    </div>
                    <div class="sheet-row sheet-skill">
                        <select name="attr_arcana_type"><option value="1" selected="selected" data-i18n="normal">Normal</option><option value="2" data-i18n="expirtise">Expertise</option></select>
                        <span data-i18n="arcana-core">Arcanes <span>(Int)</span></span>
                        <span>+</span><input type="text" class="sheet-num" name="attr_arcana_flat" value="0" placeholder="0" title="@{arcana_flat}">
                    </div>
                    <div class="sheet-row sheet-skill">
                        <select name="attr_athletics_type"><option value="1" selected="selected" data-i18n="normal">Normal</option><option value="2" data-i18n="expirtise">Expertise</option></select>
                        <span data-i18n="athletics-core">Athlétisme <span>(For)</span></span>
                        <span>+</span><input type="text" class="sheet-num" name="attr_athletics_flat" value="0" placeholder="0" title="@{athletics_flat}">
                    </div>
                    <div class="sheet-row sheet-skill">
                        <select name="attr_stealth_type"><option value="1" selected="selected" data-i18n="normal">Normal</option><option value="2" data-i18n="expirtise">Expertise</option></select>
                        <span data-i18n="stealth-core">Discrétion <span>(Dex)</span></span>
                        <span>+</span><input type="text" class="sheet-num" name="attr_stealth_flat" value="0" placeholder="0" title="@{stealth_flat}">
                    </div>
                    <div class="sheet-row sheet-skill">
                        <select name="attr_animal_handling_type"><option value="1" selected="selected" data-i18n="normal">Normal</option><option value="2" data-i18n="expirtise">Expertise</option></select>
                        <span data-i18n="animal_handling-core">Dressage <span>(Sag)</span></span>
                        <span>+</span><input type="text" class="sheet-num" name="attr_animal_handling_flat" value="0" placeholder="0" title="@{animal_handling_flat}">
                    </div>
                    <div class="sheet-row sheet-skill">
                        <select name="attr_sleight_of_hand_type"><option value="1" selected="selected" data-i18n="normal">Normal</option><option value="2" data-i18n="expirtise">Expertise</option></select>
                        <span data-i18n="sleight_of_hand-core">Escamotage <span>(Dex)</span></span>
                        <span>+</span><input type="text" class="sheet-num" name="attr_sleight_of_hand_flat" value="0" placeholder="0" title="@{sleight_of_hand_flat}">
                    </div>
                    <div class="sheet-row sheet-skill">
                        <select name="attr_history_type"><option value="1" selected="selected" data-i18n="normal">Normal</option><option value="2" data-i18n="expirtise">Expertise</option></select>
                        <span data-i18n="history-core">Histoire <span>(Int)</span></span>
                        <span>+</span><input type="text" class="sheet-num" name="attr_history_flat" value="0" placeholder="0" title="@{history_flat}">
                    </div>
                    <div class="sheet-row sheet-skill">
                        <select name="attr_intimidation_type"><option value="1" selected="selected" data-i18n="normal">Normal</option><option value="2" data-i18n="expirtise">Expertise</option></select>
                        <span data-i18n="intimidation-core">Intimidation <span>(Cha)</span></span>
                        <span>+</span><input type="text" class="sheet-num" name="attr_intimidation_flat" value="0" placeholder="0" title="@{intimidation_flat}">
                    </div>
                    <div class="sheet-row sheet-skill">
                        <select name="attr_investigation_type"><option value="1" selected="selected" data-i18n="normal">Normal</option><option value="2" data-i18n="expirtise">Expertise</option></select>
                        <span data-i18n="investigation-core">Investigation <span>(Int)</span></span>
                        <span>+</span><input type="text" class="sheet-num" name="attr_investigation_flat" value="0" placeholder="0" title="@{investigation_flat}">
                    </div>
                    <div class="sheet-row sheet-skill">
                        <select name="attr_medicine_type"><option value="1" selected="selected" data-i18n="normal">Normal</option><option value="2" data-i18n="expirtise">Expertise</option></select>
                        <span data-i18n="medicine-core">Médecine <span>(Sag)</span></span>
                        <span>+</span><input type="text" class="sheet-num" name="attr_medicine_flat" value="0" placeholder="0" title="@{medicine_flat}">
                    </div>
                    <div class="sheet-row sheet-skill">
                        <select name="attr_nature_type"><option value="1" selected="selected" data-i18n="normal">Normal</option><option value="2" data-i18n="expirtise">Expertise</option></select>
                        <span data-i18n="nature-core">Nature <span>(Int)</span></span>
                        <span>+</span><input type="text" class="sheet-num" name="attr_nature_flat" value="0" placeholder="0" title="@{nature_flat}">
                    </div>
                    <div class="sheet-row sheet-skill">
                        <select name="attr_perception_type"><option value="1" selected="selected" data-i18n="normal">Normal</option><option value="2" data-i18n="expirtise">Expertise</option></select>
                        <span data-i18n="perception-core">Perception <span>(Sag)</span></span>
                        <span>+</span><input type="text" class="sheet-num" name="attr_perception_flat" value="0" placeholder="0" title="@{perception_flat}">
                    </div>
                    <div class="sheet-row sheet-skill">
                        <select name="attr_insight_type"><option value="1" selected="selected" data-i18n="normal">Normal</option><option value="2" data-i18n="expirtise">Expertise</option></select>
                        <span data-i18n="insight-core">Perspicacité <span>(Sag)</span></span>
                        <span>+</span><input type="text" class="sheet-num" name="attr_insight_flat" value="0" placeholder="0" title="@{insight_flat}">
                    </div>
                    <div class="sheet-row sheet-skill">
                        <select name="attr_persuasion_type"><option value="1" selected="selected" data-i18n="normal">Normal</option><option value="2" data-i18n="expirtise">Expertise</option></select>
                        <span data-i18n="persuasion-core">Persuasion <span>(Cha)</span></span>
                        <span>+</span><input type="text" class="sheet-num" name="attr_persuasion_flat" value="0" placeholder="0" title="@{persuasion_flat}">
                    </div>
                    <div class="sheet-row sheet-skill">
                        <select name="attr_religion_type"><option value="1" selected="selected" data-i18n="normal">Normal</option><option value="2" data-i18n="expirtise">Expertise</option></select>
                        <span data-i18n="religion-core">Religion <span>(Int)</span></span>
                        <span>+</span><input type="text" class="sheet-num" name="attr_religion_flat" value="0" placeholder="0" title="@{religion_flat}">
                    </div>
                    <div class="sheet-row sheet-skill">
                        <select name="attr_performance_type"><option value="1" selected="selected" data-i18n="normal">Normal</option><option value="2" data-i18n="expirtise">Expertise</option></select>
                        <span data-i18n="performance-core">Représentation <span>(Cha)</span></span>
                        <span>+</span><input type="text" class="sheet-num" name="attr_performance_flat" value="0" placeholder="0" title="@{performance_flat}">
                    </div>
                    <div class="sheet-row sheet-skill">
                        <select name="attr_survival_type"><option value="1" selected="selected" data-i18n="normal">Normal</option><option value="2" data-i18n="expirtise">Expertise</option></select>
                        <span data-i18n="survival-core">Survie <span>(Sag)</span></span>
                        <span>+</span><input type="text" class="sheet-num" name="attr_survival_flat" value="0" placeholder="0" title="@{survival_flat}">
                    </div>
                    <div class="sheet-row sheet-skill">
                        <select name="attr_deception_type"><option value="1" selected="selected" data-i18n="normal">Normal</option><option value="2" data-i18n="expirtise">Expertise</option></select>
                        <span data-i18n="deception-core">Tromperie<span>(Cha)</span></span>
                        <span>+</span><input type="text" class="sheet-num" name="attr_deception_flat" value="0" placeholder="0" title="@{deception_flat}">
                    </div>
                </div>
                <div class="sheet-row" style="margin-top: 10px">
                    <input type="checkbox" name="attr_jack_of_all_trades" value="@{jack}">
                    <span data-i18n="jack-of-all-u">TOUCHE-À-TOUT</span>
                </div>
                <div class="sheet-row">
                    <span data-i18n="reliable-talent-u">TALENT FIABLE :</span>
                    <select class="sheet-dtype" name="attr_reliable_talent">
                        <option value="10" data-i18n="on">Actif</option>
                        <option value="0" selected="selected" data-i18n="off">Inactif</option>
                    </select>
                </div>
                <div class="sheet-row">
                    <span data-i18n="pass-perc-mod:-u">MODIF. PERCEPTION PASSIVE&nbsp;:</span>
                    <input type="text" class="sheet-num" name="attr_passiveperceptionmod" placeholder="0" value="0">
                </div>
                <div class="sheet-row sheet-title">
                    <span data-i18n="skill-opts-u">OPTIONS DE COMPÉTENCE</span>
                </div>
            </div>
        </div>
        <div class="sheet-col sheet-col3">
            <div class="sheet-general_options">
                <div class="sheet-version">
                    <span data-i18n="version">v</span>
                    <span name="attr_version">4.21</span>
                </div>
                <div class="sheet-row">
                    <input type="checkbox" name="attr_npc" value="1">
                    <span data-i18n="npc-u">PNJ</span>
                </div>
                <div class="sheet-row">
                    <span data-i18n="roll-queries:-u">JETER (DÉS)AVANTAGE&nbsp;:</span>
                    <select name="attr_rtype">
                        <option value="{{always=1}} {{r2=[[@{d20}" data-i18n="always-roll-adv">Toujours</option>
                        <option value="@{advantagetoggle}" data-i18n="toggle-roll-adv">Afficher un bouton</option>
                        <option value="{{query=1}} ?{Advantage?|Normal Roll,&amp;#123&amp;#123normal=1&amp;#125&amp;#125 &amp;#123&amp;#123r2=[[0d20|Advantage,&amp;#123&amp;#123advantage=1&amp;#125&amp;#125 &amp;#123&amp;#123r2=[[@{d20}|Disadvantage,&amp;#123&amp;#123disadvantage=1&amp;#125&amp;#125 &amp;#123&amp;#123r2=[[@{d20}}" data-i18n="query-roll-adv">Demander à chaque jet</option>
                        <option value="{{normal=1}} {{r2=[[0d20" data-i18n="never-roll-adv">Jamais</option>
                    </select>
                </div>
                <div class="sheet-row">
                    <span data-i18n="whisp-rolls-gm:-u">JETS PRIVÉS AU MJ&nbsp;:</span>
                    <select name="attr_wtype">
                        <option value="" data-i18n="never-whisper-roll">Jamais</option>
                        <option value="@{whispertoggle}" data-i18n="toggle-roll-whisper">Afficher un bouton</option>
                        <option value="?{Whisper?|Public Roll,|Whisper Roll,/w gm }" data-i18n="query-whisper-roll">Demander à chaque jet</option>
                        <option value="/w gm " data-i18n="always-whisper-roll">Toujours</option>
                    </select>
                </div>
                <div class="sheet-row">
                    <span data-i18n="auto-dmg-roll:-u">JETS DE DÉGÂTS AUTO&nbsp;:</span>
                    <select class="sheet-dtype" name="attr_dtype">
                        <option value="pick" data-i18n="never-roll-dmg">Jamais</option>
                        <option value="full" data-i18n="always-roll-dmg">Toujours</option>
                    </select>
                </div>
                <div class="sheet-row">
                    <span data-i18n="core-die-roll:-u">JET DE DÉ DE BASE&nbsp;:</span>
                    <input type="text" name="attr_core_die" value="1d20" placeholder="1d20" title="@{core_die}">
                </div>
                <div class="sheet-row">
                    <span data-i18n="default-critical-range:-u">CRITICAL RANGE:</span>
                    <input type="number" name="attr_default_critical_range" value="20" placeholder="20">
                </div>
                <div class="sheet-row">
                    <span data-i18n="prof-bonus:-u">BONUS DE MAÎTRISE&nbsp;:</span>
                    <select class="sheet-dtype" name="attr_pb_type">
                        <option value="level" data-i18n="by-level">Selon le niveau (par défaut)</option>
                        <option value="die" data-i18n="prof-die">Dé de maîtrise (Manuel du MJ)</option>
                        <option value="custom" data-i18n="custom">Personnalisé</option>
                    </select>
                    <input type="hidden" name="attr_pb_type">
                    <input class="sheet-pb_custom" type="text" style="float: right" name="attr_pb_custom" placeholder="2d10">
                </div>
                <div class="sheet-row">
                    <input type="checkbox" name="attr_global_save_mod_flag" value="1">
                    <span data-i18n="show-global-save-field-u">AFFICHER LE CHAMP DU MODIFICATEUR GLOBAL AUX SAUVEGARDES</span>
                </div>
                <div class="sheet-row">
                    <input type="checkbox" name="attr_global_skill_mod_flag" value="1">
                    <span data-i18n="show-global-skill-field-u">AFFICHER LE CHAMP DU MODIFICATEUR GLOBAL AUX COMPÉTENCES</span>
                </div>
                <div class="sheet-row">
                    <input type="checkbox" name="attr_global_attack_mod_flag" value="1">
                    <span data-i18n="show-global-attack-field-u">AFFICHER LE CHAMP DU MODIFICATEUR GLOBAL À L'ATTAQUE</span>
                </div>
                <div class="sheet-row">
                    <input type="checkbox" name="attr_global_damage_mod_flag" value="1">
                    <span data-i18n="show-global-damage-field-u">AFFICHER LE CHAMP DU MODIFICATEUR GLOBAL AUX DÉGÂTS</span>
                </div>
                <div class="sheet-row">
                    <input type="checkbox" name="attr_global_ac_mod_flag" value="1">
                    <span data-i18n="show-global-ac-field-u">AFFICHER LE CHAMP DU MODIFICATEUR GLOBAL A LA CA</span>
                </div>
                <div class="sheet-row">
                    <span data-i18n="add-char-to-templates:-u">AJOUTER NOM DU PERSONNAGE AUX GABARITS&nbsp;:</span>
                    <select class="sheet-dtype" name="attr_charname_output">
                        <option value="{{charname=@{character_name}}}" data-i18n="on">Actif</option>
                        <option value="charname=@{character_name}" selected="selected" data-i18n="off">Inactif</option>
                    </select>
                </div>
                <div class="sheet-row">
                    <span data-i18n="level-calculations:-u">CALCULS AUTOMATIQUES À PARTIR DU NIVEAU&nbsp;:</span>
                    <select class="sheet-dtype" name="attr_level_calculations">
                        <option value="on" selected="selected" data-i18n="on">Actif</option>
                        <option value="off" data-i18n="off">Inactif</option>
                    </select>
                </div>
                <div class="sheet-row">
                    <span data-i18n="encumbrance:-u">ENCOMBREMENT&nbsp;:</span>
                    <select name="attr_encumberance_setting">
                        <option value="off" data-i18n="simple">Simple</option>
                        <option value="on" data-i18n="variant-phb">Variante (cf manuel du joueur)</option>
                        <option value="disabled" data-i18n="off">Inactif</option>
                    </select>
                </div>
                <div class="sheet-row">
                    <input type="checkbox" name="attr_ingore_non_equipped_weight" value="1">
                    <span data-i18n="ingore-non-equipped-weight">IGNORE NON-EQUIPPED ITEMS WEIGHT</span>
                </div>
                <div class="sheet-row">
                    <span data-i18n="inventory:-u">INVENTAIRE&nbsp;:</span>
                    <select name="attr_simpleinventory">
                        <option value="complex" data-i18n="compendium-compatible">Compatible Compendium</option>
                        <option value="simple" data-i18n="simple">Simple</option>
                    </select>
                </div>
                <div class="sheet-row">
                    <span data-i18n="feats-traits-u">CAPACITÉS &amp; TRAITS</span><span>:</span>
                    <select name="attr_simpletraits">
                        <option value="complex" data-i18n="compendium-compatible">Compatible Compendium</option>
                        <option value="simple" data-i18n="simple">Simple</option>
                    </select>
                </div>
                <div class="sheet-row">
                    <span data-i18n="prof-langs-u">AUTRES MAÎTRISES &amp; LANGUES</span><span>:</span>
                    <select name="attr_simpleproficencies">
                        <option value="complex" data-i18n="compendium-compatible">Compatible Compendium</option>
                        <option value="simple" data-i18n="simple">Simple</option>
                    </select>
                </div>
                <div class="sheet-row">
                    <span data-i18n="ammo-tracking:-u">SUIVI DES MUNITIONS&nbsp;:</span>
                    <select name="attr_ammotracking">
                        <option value="on" data-i18n="on">Actif</option>
                        <option value="off" selected="selected" data-i18n="off">Inactif</option>
                    </select>
                    <span data-i18n-title="api-required-title" data-i18n="api-required-u" title="Essayez maintenant avec l'installation d'API en un clic disponible avec votre abonnement Pro." style="color: #666 ; cursor: help">(API nécessaire)</span>
                </div>
                <div class="sheet-row">
                    <span data-i18n="exhaustion-setting-u">Voir niveaux d'épuisement:</span>
                    <select name="attr_exhaustion_toggle">
                        <option value="1" data-i18n="on">Actif</option>
                        <option value="0" data-i18n="off" selected="selected">Inactif</option>
                    </select>
                </div>
                <div class="sheet-row">
                    <span data-i18n="hit-dice-setting-u">TRACK HIT DICE PER CLASS</span>
                    <select name="attr_use_per_class_hit_dice">
                        <option value="1" data-i18n="on">Actif</option>
                        <option value="0" data-i18n="off" selected="selected">Inactif</option>
                    </select>
                </div>
                <div class="sheet-row sheet-title">
                    <span data-i18n="general-opts-u">OPTIONS GÉNÉRALES</span>
                </div>
            </div>
            <div class="sheet-general_options sheet-charactermancer_options">
                <input type="hidden" class="sheet-warningflag" name="attr_leveler_warningflag">
                <div class="sheet-warning">
                    <span>
                        <label><input type="checkbox" name="attr_leveler_warningflag" value="hide">*</label>
                        <span data-i18n="warning-leveler_start-u">ATTENTION - VOUS NE POUVEZ PAS LANCER LE CHARACTERMANCER LEVEL UP JUSQU'À CE QUE VOUS AYEZ UNE CLASSE, UN NIVEAU ET DES PV POUR LE NIVEAU UN. LANCEZ LE CHARACTERMANCER CREATOR EN PREMIER. L'OUTIL DE LEVEL UP NE FONCTIONNE PAS AVEC DES CLASSES PERSONNALISÉES OU SI LES OPTIONS DE MULTICLASSAGE SONT DÉFINIES INCORRECTEMENT.</span>
                    </span>
                </div>
                <div class="sheet-row">
                    <button type="action" name="act_relaunch_lvl1mancer" style="padding: 0px"><img src="https://s3.amazonaws.com/files.d20.io/images/175804938/qmVmtNHONHhHcd9cxCxm7w/med.png?1604618286" style="height: 32px ; width: 32px" alt="Wand &amp; Hammer of Charactermancer"></button><span style="width: 180px ; margin-left: 10px ; display: inline-block" data-i18n="relaunch-lvl1mancer-u">DÉMARRER LE CHARACTERMANCER NIVEAU 1 (NE PEUT ÊTRE ANNULÉ)</span>
                </div>
                <div class="sheet-row">
                    <button type="action" name="act_launch_lvl+mancer" style="padding: 0px"><img src="https://s3.amazonaws.com/files.d20.io/images/175804938/qmVmtNHONHhHcd9cxCxm7w/med.png?1604618286" style="height: 32px ; width: 32px" alt="Wand &amp; Hammer of Charactermancer"></button><span style="width: 180px ; margin-left: 10px ; display: inline-block">LAUNCH LEVEL+ CHARACTERMANCER</span>
                </div>
                <div class="sheet-row sheet-title">
                    <span data-i18n="mancer-opts-u">OPTIONS DU CHARACTERMANCER</span>
                </div>
            </div>
        </div>
    </div>
    </div>
    */