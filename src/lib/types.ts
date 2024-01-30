export enum Theme {
	DarkBlue = 'dark-blue',
	DarkBlack = 'dark-black',
	LightWhite = 'light-white',
	LightOrange = 'light-orange',
}

export type Task = {
	id: string
	text: string
	isCompleted: boolean
	date: number
}

export type SettingsGlobal = {
	theme: string
	useReversedLayout: boolean
	useSmoothScroll: boolean
}

export type BooleanKeys<T> = {
	[K in keyof T]: T[K] extends boolean ? K : never
}[keyof T]

export type FunctionMap = {
	[key: string]: (...args: any[]) => any
}

export enum IconType {
	Cross = 'cross',
	Check = 'check',
	Trash = 'trash',
	Settings = 'settings',
	Plus = 'plus',
	ChatBubble = 'chat-bubble',
	Share = 'share',
}
