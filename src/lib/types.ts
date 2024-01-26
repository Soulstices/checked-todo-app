export type Task = {
	id: string
	text: string
	isCompleted: boolean
	date: number
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
