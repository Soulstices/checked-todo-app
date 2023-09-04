const { app, BrowserWindow } = require('electron')

const createWindow = () => {
	const window = new BrowserWindow({
		width: 500,
		height: 900,
		minWidth: 320,
		minHeight: 450,
	})
	window.setMenuBarVisibility(false)
	window.loadFile('./dist/index.html')
}

app.whenReady().then(() => {
	createWindow()
})

app.disableHardwareAcceleration()
