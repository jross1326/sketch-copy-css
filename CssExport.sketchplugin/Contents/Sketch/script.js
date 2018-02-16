var onRun = function (context) {
	var layer = context.selection[0];
	var css = layer.CSSAttributes();
	obj = {};

	var docData = context.document.documentData();
	var command = context.command;
	var baseFontSite = command.valueForKey_onLayer_forPluginIdentifier('base-font-size', docData, 'css-export');
	var forceOverrides = command.valueForKey_onLayer_forPluginIdentifier('force-overrides', docData, 'css-export');

	if(!baseFontSite || baseFontSite == 0) {
		var baseFontSite = context.document.askForUserInput_initialValue("Base Font Size?", 20);
		command.setValue_forKey_onLayer_forPluginIdentifier(baseFontSite, 'base-font-size', docData, 'css-export');
	}
	
	for(var j = 1 ; j < css.length ; ++j){
		newString = css[j].split(": ");
		var key = newString[0].replace(':', '');
		var value = newString[1].replace(';', '');
		obj[key] = value;
	}
	if(obj['line-height'] && baseFontSite) {
		num = obj['line-height'].replace("px", "") / baseFontSite;
		num = parseFloat(num.toFixed(6));
		obj['line-height'] = num + 'rem; //'+obj['line-height'];
	}

	if(obj['font-size'] && baseFontSite) {
		num = obj['font-size'].replace("px", "") / baseFontSite;
		num = parseFloat(num.toFixed(6));
		obj['font-size'] =  num + 'rem; //'+obj['font-size'];
	}

	if(obj['letter-spacing'] && baseFontSite) {
		num = obj['letter-spacing'].replace("px", "") / baseFontSite;
		num = parseFloat(num.toFixed(6));
		obj['letter-spacing'] =  num + 'rem; //'+obj['letter-spacing'];
	}

	fontWeight = false;
	fontFamilyScss = false;
	if(obj['font-family']) {
		var fontWeight = command.valueForKey_onLayer_forPluginIdentifier(obj['font-family']+'-weight', docData, 'css-export');
		if(!fontWeight || forceOverrides == true) {
			var fontWeight = context.document.askForUserInput_initialValue("What is the font weight for "+obj['font-family'], 500);
			command.setValue_forKey_onLayer_forPluginIdentifier(fontWeight, obj['font-family']+'-weight', docData, 'css-export');
		}

		var fontFamilyScss = command.valueForKey_onLayer_forPluginIdentifier(obj['font-family']+'-family', docData, 'css-export');
		if(!fontFamilyScss || forceOverrides == true) {
			famDefault = '$'+ obj['font-family'].replace('-', '');
			var fontFamilyScss = context.document.askForUserInput_initialValue("Sass variable for font family "+obj['font-family'], famDefault);
			command.setValue_forKey_onLayer_forPluginIdentifier(fontFamilyScss, obj['font-family']+'-family', docData, 'css-export');
		}
	}

	string = '';
	for (var key in obj){
		if(key == "font-family" && fontFamilyScss && fontFamilyScss != 0  && fontFamilyScss != 'false') {
			value = fontFamilyScss;
		}else{
			value = obj[key];
		}

		var found = value.match(/(#([0-9a-f]{3}){1,2}|(rgba|hsla)\(\d{1,3}%?(,\s?\d{1,3}%?){2},\s?(1|0|0?\.\d+)\)|(rgb|hsl)\(\d{1,3}%?(,\s?\d{1,3}%?){2}\))/i);
		
		if(found) {
			found = found[0];
			var color = command.valueForKey_onLayer_forPluginIdentifier(encodeURIComponent(found)+'-color', docData, 'css-export');
			if(!color || forceOverrides == true) {
				var color = context.document.askForUserInput_initialValue("Sass variable for "+found, found);
				command.setValue_forKey_onLayer_forPluginIdentifier(color, encodeURIComponent(found)+'-color', docData, 'css-export');
			}
			value = value.replace(found, color) + '; //' + found;
		}

		string += key+':'+value+";\n";
		if(key == "font-family" && fontWeight && fontWeight != 0  && fontWeight != 'false') {
			string += 'font-weight:'+fontWeight+";\n";
		}
	}
	log(string);
	this.pasteBoard = NSPasteboard.generalPasteboard();
	this.pasteBoard.declareTypes_owner( [ NSPasteboardTypeString ], null );
	this.pasteBoard.setString_forType( string, NSPasteboardTypeString );
}