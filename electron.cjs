const { app, BrowserWindow } = require('electron')

const createWindow = () => {
	const window = new BrowserWindow({
		width: 500,
		height: 900,
	})
	window.setMenuBarVisibility(false)
	window.loadFile('./dist/index.html')
}

app.whenReady().then(() => {
	createWindow()
})

app.disableHardwareAcceleration()
