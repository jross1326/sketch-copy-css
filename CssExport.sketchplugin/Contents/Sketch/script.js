function RoundCorrect(num, precision = 2) {
	// half epsilon to correct edge cases.
	var c = 0.5 * Number.EPSILON * num;
	//	var p = Math.pow(10, precision); //slow
	var p = 1; while (precision--> 0) p *= 10;
	if (num < 0)
		p *= -1;
	return Math.round((num + c) * p) / p;
}


var onRun = function (context) {
	var layer = context.selection[0];
	var css = layer.CSSAttributes();
	obj = {};

	var docData = context.document.documentData();
	var command = context.command;
	var baseFontSite = command.valueForKey_onLayer_forPluginIdentifier('base-font-size', docData, 'css-export');

	if(!baseFontSite || baseFontSite == 0) {
		var baseFontSite = context.document.askForUserInput_initialValue("Base Font Size?", 20);
		command.setValue_forKey_onLayer_forPluginIdentifier(baseFontSite, 'base-font-size', docData, 'css-export');
	}

	for(var j = 1 ; j < css.length ; ++j){
		newString = css[j].split(" ");
		var key = newString[0].replace(':', '').replace('"', '');
		var value = newString[1].replace(';', '').replace('"', '');
		obj[key] = value;
	}
	if(obj['line-height'] && baseFontSite) {
							num = obj['line-height'].replace("px", "") / baseFontSite;
		num = parseFloat(num.toFixed(4));
		obj['line-height'] = num + 'rem; //'+obj['line-height'];
	}

	if(obj['font-size'] && baseFontSite) {
		num = obj['font-size'].replace("px", "") / baseFontSite;
		num = parseFloat(num.toFixed(4));
		obj['font-size'] =  num + 'rem; //'+obj['font-size'];
	}

	if(obj['letter-spacing'] && baseFontSite) {
		num = obj['letter-spacing'].replace("px", "") / baseFontSite;
		num = parseFloat(num.toFixed(10));
		obj['letter-spacing'] =  num + 'rem; //'+obj['letter-spacing'];
	}
	string = '';
	for (var key in obj){
		string += key+':'+obj[key]+";\n";

	}
	this.pasteBoard = NSPasteboard.generalPasteboard();
	this.pasteBoard.declareTypes_owner( [ NSPasteboardTypeString ], null );
	this.pasteBoard.setString_forType( string, NSPasteboardTypeString );
}
