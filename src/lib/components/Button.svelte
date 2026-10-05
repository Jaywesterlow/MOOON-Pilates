<script lang="ts">
	import type { Snippet } from 'svelte';
	import { expoOut } from 'svelte/easing';
	import { prefersReducedMotion, Tween } from 'svelte/motion';
	import { MediaQuery } from 'svelte/reactivity';

	/**
	 * MOOON's button: the page's one radius, the label style in small caps, no chroma. On the night
	 * ground it is filled cream, on the cream band filled night. On hover a fill comes in from the
	 * bottom and leaves through the top, carrying its own copy of the label, so the text is readable
	 * at every frame. Every button also takes 27c: it leans 30 % toward the cursor, 200 ms expo-out,
	 * and settles back when the cursor leaves.
	 */
	type Props = {
		href: string;
		/** paper: filled cream (on the night ground) · night: filled night (on the cream band) · outline: cream line */
		variant?: 'paper' | 'night' | 'outline';
		/** md: 48 px, the page's primary · sm: 36 px, the bar's copy of it, one step smaller (NB19) */
		size?: 'md' | 'sm';
		external?: boolean;
		onclick?: (event: MouseEvent & { currentTarget: EventTarget & HTMLAnchorElement }) => void;
		children: Snippet;
	};

	let {
		href,
		variant = 'paper',
		size = 'md',
		external = false,
		onclick,
		children
	}: Props = $props();

	const hasCursor = new MediaQuery('(hover: hover)');
	const pull = new Tween({ x: 0, y: 0 }, { duration: 200, easing: expoOut });

	const magnetOn = $derived(hasCursor.current && !prefersReducedMotion.current);

	function follow(event: MouseEvent & { currentTarget: HTMLAnchorElement }) {
		if (!magnetOn) return;
		const box = event.currentTarget.getBoundingClientRect();
		pull.target = {
			x: (event.clientX - (box.left + box.width / 2)) * 0.3,
			y: (event.clientY - (box.top + box.height / 2)) * 0.3
		};
	}

	function release() {
		pull.target = { x: 0, y: 0 };
	}
</script>

<a
	{href}
	class={['btn', variant, size]}
	target={external ? '_blank' : undefined}
	rel={external ? 'noopener' : undefined}
	style:transform={magnetOn ? `translate(${pull.current.x}px, ${pull.current.y}px)` : undefined}
	onmousemove={follow}
	onmouseleave={release}
	{onclick}
>
	<span class="text">{@render children()}</span>
	<span class="fill" aria-hidden="true">{@render children()}</span>
</a>

<style>
	.btn {
		position: relative;
		display: inline-grid;
		isolation: isolate;
		overflow: hidden;
		min-height: 3rem;
		border: 1px solid var(--edge);
		border-radius: var(--r);
		background: var(--ground);
		color: var(--text);
		font: var(--label-weight) var(--text-label) / 1 var(--font-body);
		letter-spacing: var(--label-tracking);
		text-transform: uppercase;
		white-space: nowrap;
		will-change: transform;
		transition: scale 0.2s ease-out;
	}
	.sm {
		min-height: 2.25rem;
	}
	/* 27c press: the `scale` property, so it stacks on the magnetic translate instead of replacing it */
	.btn:active {
		scale: 0.97;
	}
	.btn > span {
		grid-area: 1 / 1;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-3) var(--space-5);
	}
	.sm > span {
		padding: var(--space-2) var(--space-4);
	}

	/* one direction only: in from the bottom on hover, out through the top on leave */
	.fill {
		background: var(--fill);
		color: var(--fill-text);
		clip-path: inset(0 0 100% 0);
		transition: clip-path 0.38s var(--ease-rise);
	}
	.btn:hover .fill,
	.btn:focus-visible .fill {
		clip-path: inset(0 0 0 0);
		animation: fill-in 0.38s var(--ease-rise);
	}
	@keyframes fill-in {
		from {
			clip-path: inset(100% 0 0 0);
		}
		to {
			clip-path: inset(0 0 0 0);
		}
	}

	.paper {
		--ground: var(--paper);
		--edge: var(--paper);
		--text: var(--night);
		--fill: var(--olive);
		--fill-text: var(--paper);
	}
	.night {
		--ground: var(--night);
		--edge: var(--night);
		--text: var(--paper);
		--fill: var(--olive);
		--fill-text: var(--paper);
	}
	.outline {
		--ground: transparent;
		--edge: var(--paper);
		--text: var(--paper);
		--fill: var(--paper);
		--fill-text: var(--night);
	}
</style>
