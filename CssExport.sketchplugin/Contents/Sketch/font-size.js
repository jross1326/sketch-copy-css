var onRun = function (context) {
	var docData = context.document.documentData();
	var command = context.command;
	var baseFontSite = command.valueForKey_onLayer_forPluginIdentifier('base-font-size', docData, 'css-export');
	
	var baseFontSite = context.document.askForUserInput_initialValue("Base Font Size?", baseFontSite);
	command.setValue_forKey_onLayer_forPluginIdentifier(baseFontSite, 'base-font-size', docData, 'css-export');
}
