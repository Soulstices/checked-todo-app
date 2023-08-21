import { writable } from 'svelte/store'

export const tasks = writable([])
export const encodedData = writable('')
export const isModalOpen = writable(false)
