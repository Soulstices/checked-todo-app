import { writable } from 'svelte/store'

import type { Writable } from 'svelte/store'
import type { Task } from './types'

export const tasks: Writable<Task[]> = writable([])
export const encodedData: Writable<string> = writable('')
export const isModalOpen: Writable<boolean> = writable(false)

// Settings
export const settings: Writable<{}> = writable({})
export const theme: Writable<string> = writable('dark')
