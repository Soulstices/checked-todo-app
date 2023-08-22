import { writable } from 'svelte/store'

export const tasks = writable([])
export const encodedData = writable('')
export const isModalOpen = writable(false)

// Settings
export const settings = writable({})
export const theme = writable('dark')
