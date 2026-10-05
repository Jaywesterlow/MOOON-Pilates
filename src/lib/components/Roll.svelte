<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * The words of a text link twice, in a one-line mask: on hover the second copy comes up from
	 * below while the first leaves through the top, the page's one hover direction (styles in app.css).
	 */
	let { children }: { children: Snippet } = $props();
</script>

<span class="roll"
	><span>{@render children()}</span><span aria-hidden="true">{@render children()}</span></span
>
