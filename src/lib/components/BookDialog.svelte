<script lang="ts">
	import type { UI } from '$lib/data/studio';
	import { booking } from '$lib/state/booking.svelte';
	import Button from './Button.svelte';

	type Props = { text: UI['demo']; href: string };
	let { text, href }: Props = $props();
</script>

<!-- Every booking button opens this, at once: the demo takes no real bookings. -->
<dialog
	class="dialog"
	aria-labelledby="book-dialog-title"
	{@attach booking.dialog}
	onclose={booking.closed}
	onclick={booking.backdrop}
>
	<div class="panel">
		<h2 id="book-dialog-title" class="display">{text.title}</h2>
		<p>{text.line}</p>
		<div class="actions">
			<Button {href} external variant="outline" size="sm">{text.link}</Button>
			<button type="button" class="close ul" onclick={booking.close}>{text.close}</button>
		</div>
	</div>
</dialog>

<style>
	.dialog {
		width: min(30rem, calc(100% - 2 * var(--gutter)));
		max-width: none;
		padding: 0;
		border: 1px solid var(--line);
		background: var(--paper);
		color: var(--ink);
	}
	/* no scrolling behind the dialog, also when Lenis is off (reduced motion) */
	:global(html:has(dialog[open])) {
		overflow: hidden;
	}
	.dialog::backdrop {
		background: rgb(66 61 49 / 0.6);
	}
	/* opacity only, nothing that moves; none at all under reduced motion */
	@media (prefers-reduced-motion: no-preference) {
		.dialog[open],
		.dialog[open]::backdrop {
			animation: appear 0.45s var(--ease);
		}
	}
	@keyframes appear {
		from {
			opacity: 0;
		}
	}

	.panel {
		display: grid;
		gap: var(--space-4);
		padding: clamp(1.5rem, 5vw, 2.5rem);
	}
	/* .panel: outranks the global h2.display size, which is for section headings */
	.panel h2 {
		font-size: var(--text-lede);
	}
	p {
		color: var(--ink-2);
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-4) var(--space-5);
		margin-top: var(--space-2);
	}
	.close {
		min-width: var(--tap);
		min-height: var(--tap);
		padding: 0;
		border: 0;
		background: none;
		color: inherit;
		font: var(--label-weight) var(--text-label) / 1 var(--font-body);
		letter-spacing: var(--label-tracking);
		/* the underline follows the text, not the --tap high box */
		--ul-offset: calc(50% - 0.5lh - 0.15em);
		text-transform: uppercase;
		cursor: pointer;
	}
</style>
