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

export enum IconType {
	Cross = 'cross',
	Check = 'check',
	Trash = 'trash',
	Settings = 'settings',
	Plus = 'plus',
	ChatBubble = 'chat-bubble',
	Share = 'share',
}
