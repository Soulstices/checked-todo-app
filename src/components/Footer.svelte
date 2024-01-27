<script lang="ts">
	import { APP_VERSION, isModalOpen } from '../lib/store'
</script>

<footer class="flex max-w-lg mx-auto text-xs pt-2 pb-20">
	<div class="flex flex-row m-auto">
		<span class="text-white/60">
			v{$APP_VERSION} |
			<a
				href="https://github.com/Soulstices/checked-todo-app"
				class="text-white underline focus:outline-2"
				target="_blank"
				tabindex={$isModalOpen ? -1 : 0}
			>
				GitHub
			</a>
		</span>
	</div>
</footer>
