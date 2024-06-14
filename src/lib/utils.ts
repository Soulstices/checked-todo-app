import type { Task } from './types'
import { compressToUTF16 } from 'lz-string'

export function generateUID(): string {
	return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

export function autoScrollToBottom() {
	setTimeout(() => {
		window.scrollTo({
			top: document.body.scrollHeight,
			behavior: 'smooth',
		})
	}, 100)
}

export function saveInStorage(task: Task): void {
	localStorage.setItem(task.id, compressToUTF16(JSON.stringify(task)))
}

export function deleteFromStorage(taskId: string): void {
	localStorage.removeItem(taskId)
}

export function scrollToTop(): void {
	window.scroll(0, 0)
}

export function scrollToBottom(): void {
	window.scroll(0, document.body.scrollHeight)
}
