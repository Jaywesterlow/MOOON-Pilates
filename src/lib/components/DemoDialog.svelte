<script lang="ts">
	import type { UI } from '$lib/data/studio';
	import { portfolio } from '$lib/data/studio';
	import { demo } from '$lib/state/demo.svelte';
	import Button from './Button.svelte';
	import Roll from './Roll.svelte';

	/**
	 * Every booking button and every link that leaves the page opens this, at once: the demo takes
	 * no real bookings and links nowhere by accident. A cream bar along the bottom of the screen, on
	 * the page's own margin, with one line and two actions; the first action is the link itself.
	 */
	type Props = { text: UI['demo'] };
	let { text }: Props = $props();
</script>

<dialog
	class="dialog"
	aria-labelledby="book-dialog-title"
	{@attach demo.dialog}
	onclose={demo.closed}
	onclick={demo.backdrop}
>
	<div class="bar light">
		<div class="words">
			<h2 id="book-dialog-title">{text.title}</h2>
			<p class="small">
				{#if portfolio}
					{demo.kind === 'book' ? text.portfolioBook : text.portfolioLink}
				{:else}
					{demo.kind === 'book' ? text.book : text.link}
				{/if}
			</p>
		</div>
		<div class="actions">
			{#if demo.href}
				<Button href={demo.href} external variant="night">
					{demo.kind === 'book' ? text.toForm : text.follow}
				</Button>
			{/if}
			<button type="button" class="close link label tap" onclick={demo.close}>
				<Roll>{text.close}</Roll>
			</button>
		</div>
	</div>
</dialog>

<style>
	.dialog {
		position: fixed;
		inset: auto 0 0 0;
		width: 100%;
		max-width: none;
		max-height: none;
		margin: 0;
		padding: 0;
		border: 0;
		background: transparent;
	}
	/* the backdrop is the whole screen; a click on it closes */
	.dialog::backdrop {
		background: rgb(66 61 49 / 0.6);
	}
	/* no scrolling behind the dialog, also when Lenis is off (reduced motion) */
	:global(html:has(dialog[open])) {
		overflow: hidden;
	}
	/* opacity only, nothing that moves; none at all under reduced motion */
	@media (prefers-reduced-motion: no-preference) {
		.dialog[open],
		.dialog[open]::backdrop {
			animation: appear 0.2s ease-out;
		}
	}
	@keyframes appear {
		from {
			opacity: 0;
		}
	}
	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: var(--space-4) var(--space-6);
		padding: var(--space-5) var(--margin) calc(var(--space-5) + env(safe-area-inset-bottom, 0px));
	}
	.words {
		display: grid;
		gap: var(--space-1);
		max-width: 36em;
	}
	h2 {
		font-family: var(--font-display);
		font-weight: 400;
		font-size: var(--text-lede);
		line-height: 1.2;
		color: var(--night);
	}
	.actions {
		display: flex;
		align-items: center;
		gap: var(--space-5);
	}
	.close {
		border: 0;
		background: none;
		padding: 0;
		cursor: pointer;
	}
</style>
