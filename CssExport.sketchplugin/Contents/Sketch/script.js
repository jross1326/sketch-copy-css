var onRun = function (context) {
	var layer = context.selection[0];
	var css = layer.CSSAttributes();
	obj = {};
	for(var j = 1 ; j < css.length ; ++j){
		newString = css[j].split(" ");
		var key = newString[0].replace(':', '').replace('"', '');
		var value = newString[1].replace(';', '').replace('"', '');
		obj[key] = value;
	}
	if(obj['font-size'] && obj['line-height']) {
		obj['line-height'] = (parseInt(obj['line-height'], 10) / parseInt(obj['font-size'], 10)) + '; //'+obj['line-height'];
	}
	string = '';
	for (var key in obj){
		string += key+':'+obj[key]+";\n";

	}
	this.pasteBoard = NSPasteboard.generalPasteboard();
	this.pasteBoard.declareTypes_owner( [ NSPasteboardTypeString ], null );
	this.pasteBoard.setString_forType( string, NSPasteboardTypeString );
}