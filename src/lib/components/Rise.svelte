<script lang="ts">
	import type { Snippet } from 'svelte';
	import { rise } from '$lib/motion/attachments';

	/** The mask for a rise: what is inside comes up from below its own line when it enters the screen. */
	type Props = { inline?: boolean; children: Snippet };
	let { inline = false, children }: Props = $props();
</script>

<span class={['mask', { inline }]}>
	<span class="inner" data-reveal="rise" {@attach rise()}>{@render children()}</span>
</span>

<style>
	.mask {
		display: block;
		overflow: hidden;
		/* room under the baseline keeps descenders whole inside the mask */
		padding-bottom: 0.15em;
		margin-bottom: -0.15em;
	}
	.inline {
		display: inline-block;
		vertical-align: top;
	}
	.inner {
		display: block;
		will-change: transform;
	}
</style>
