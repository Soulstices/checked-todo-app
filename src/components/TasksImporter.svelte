<!--Experimental Feature-->
<!--Intended to be used only for testing.-->
<script lang="ts">
	import { getContext } from 'svelte'

	let inputBox
	let inputValue: string

	const loadTasksFromURL: (data: string) => void = getContext('loadTasksFromURL')
	const saveInURL: () => void = getContext('saveInURL')

	function handleClick() {
		const encodedData = extractDataFromInput()

		if (encodedData) {
			try {
				loadTasksFromURL(encodedData)
				saveInURL()
				return true
			} catch (e) {
				console.log('Error')
				console.error(e)
				return false
			}
		} else {
			console.log('Invalid Data')
			return false
		}
	}

	function extractDataFromInput(): string {
		const parts = inputValue.split('/?')
		return parts.length > 1 ? parts[1] : ''
	}
</script>

<input type="text" bind:this={inputBox} bind:value={inputValue} />

<button on:click={handleClick}>Import</button>
