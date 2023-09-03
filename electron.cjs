const { app, BrowserWindow } = require('electron')

const createWindow = () => {
	const win = new BrowserWindow({
		width: 600,
		height: 900,
	})
	win.setMenuBarVisibility(false)
	win.loadFile('./dist/index.html')
}

app.whenReady().then(() => {
	createWindow()
})

app.disableHardwareAcceleration(true)
