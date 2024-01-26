<!--Experimental Feature-->
<!--Currently uses duplicated code and is intended to be used only for testing.-->
<script lang="ts">
	import { compressToEncodedURIComponent, compressToUTF16, decompressFromEncodedURIComponent, decompressFromUTF16 } from 'lz-string'
	import { encodedData, useReversedLayout, tasks } from '../lib/store'

	let inputBox
	let inputValue: string

	function handleClick() {
		const parts = inputValue.split('/?')
		const extractedPart = parts.length > 1 ? parts[1] : null

		if (extractedPart !== null) {
			console.log(extractedPart)
			if (inputValue.length > 0) {
				try {
					let decodedData = JSON.parse('[' + decompressFromEncodedURIComponent(extractedPart) + ']')

					for (const entry of decodedData) {
						localStorage.setItem(entry.id, compressToUTF16(JSON.stringify(entry)))
					}

					$tasks = Object.entries(localStorage)
						.filter(([key, _]) => key !== 'settings-global') // Exclude the "settings-global" entry
						.map((entry) => JSON.parse(decompressFromUTF16(entry[1])))

					const settingsGlobal = JSON.parse(String(localStorage.getItem('settings-global'))) || {}

					if (!settingsGlobal.useReversedLayout === true) {
						$useReversedLayout = true
						$tasks.sort((a, b) => a.date - b.date)
					} else {
						$useReversedLayout = false
						$tasks.sort((a, b) => b.date - a.date)
					}

					// now need to update url
					let acc = $tasks.map((task) => JSON.stringify(task))
					$encodedData = compressToEncodedURIComponent(acc.toString())

					const PAGE_URL: URL = new URL(window.location.href)
					let newURL: string = $encodedData.length > 1 ? `${PAGE_URL.origin}/?${$encodedData}` : PAGE_URL.origin
					history.pushState({}, '', newURL)
					// and save the new
				} catch (e) {
					$encodedData = ''
					return false
				}
				return true
			} else {
				return false
			}
		} else {
			console.log('No match found')
		}
	}
</script>

<input type="text" bind:this={inputBox} bind:value={inputValue} />

<button on:click={handleClick}>Import</button>
