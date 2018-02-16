var onRun = function (context) {
	var docData = context.document.documentData();
	var command = context.command;
	var forceOverrides = command.valueForKey_onLayer_forPluginIdentifier('force-overrides', docData, 'css-export');
	if(forceOverrides == false) {
		forceOverrides = true;
	}else{
		forceOverrides = false;
	}
	command.setValue_forKey_onLayer_forPluginIdentifier(forceOverrides, 'force-overrides', docData, 'css-export');
	log(forceOverrides);
	context.document.showMessage("Variable overrides set to "+forceOverrides);
}