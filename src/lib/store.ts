import { readable, writable } from 'svelte/store'
import type { Writable, Readable } from 'svelte/store'
import { type Task, Theme } from './types'

export const APP_VERSION: Readable<string> = readable('1.0.2')
export const EXPERIMENTAL_FEATURES: Readable<boolean> = readable(false)

// App State
export const tasks: Writable<Task[]> = writable([])
export const isModalOpen: Writable<boolean> = writable(false)
export const isTaskCreatorTooltipOpen: Writable<boolean> = writable(false)
export const activeTabIndex: Writable<number> = writable(0)

// App Settings
export const theme: Writable<Theme> = writable(Theme.DarkBlue)
export const useReversedLayout: Writable<boolean> = writable(false)
export const useSmoothScroll: Writable<boolean> = writable(false)
