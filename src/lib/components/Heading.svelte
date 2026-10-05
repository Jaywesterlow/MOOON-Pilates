<script lang="ts">
	import { revealWords } from '$lib/motion/attachments';

	/**
	 * A display heading in the markup of library entry 16: every line a mask, every word in it
	 * a mask of its own, so the words can rise from under the line below.
	 */
	type Props = { lines: string[]; level?: 'h1' | 'h2'; centred?: boolean };
	let { lines, level = 'h2', centred = false }: Props = $props();
</script>

<svelte:element
	this={level}
	class={['display', { centred }]}
	data-reveal="words"
	{@attach revealWords()}
>
	{#each lines as line (line)}
		<span class="line">
			{#each line.split(' ') as word, i (i)}
				<span class="clip">{word}</span>
			{/each}
		</span>
	{/each}
</svelte:element>

<style>
	.line {
		display: flex;
		flex-wrap: wrap;
		gap: 0 0.24em;
		overflow: hidden;
		/* room under the baseline keeps descenders whole inside the mask */
		padding-bottom: 0.12em;
		margin-bottom: -0.12em;
	}
	.centred {
		text-align: center;
	}
	.centred .line {
		justify-content: center;
	}
	.clip {
		display: inline-block;
		will-change: transform;
	}
</style>
