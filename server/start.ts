function onOpen(e: any) {
  SpreadsheetApp.getUi().createAddonMenu()
    .addItem('Open Sidebar', 'openSidebar')
    .addToUi();
}

function onInstall(e: any) {
  onOpen(e);
}

// see actions