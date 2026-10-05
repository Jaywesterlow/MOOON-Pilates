/**
 * What every outward link does in this demo: open a small "this is a concept demo" dialog, at
 * once, in the same frame as the click. The booking buttons say where the real site would book;
 * every other link that leaves the page (Instagram, WhatsApp, mail, the route, the offer pages,
 * the legal pages) says that the real site would go on from here. The dialog keeps the link's
 * own href as its one action, so the visitor can still follow it on purpose.
 *
 * The demo must never take a real booking at MOOON. Every link keeps its real href, for visitors
 * without JavaScript and for a new tab. Production would simply not have this dialog.
 */
export type DemoKind = 'book' | 'link';

class Demo {
	/** True while the demo dialog is open. */
	isOpen = $state(false);
	/** What was clicked: a booking button or another outward link. */
	kind = $state<DemoKind>('book');
	/** The clicked link's own href, the dialog's one action. */
	href = $state('');

	#dialog: HTMLDialogElement | null = null;
	#opener: HTMLElement | null = null;

	/** Attachment for the `<dialog>`: every link can open it from anywhere on the page. */
	dialog = (node: HTMLDialogElement) => {
		this.#dialog = node;
		return () => {
			if (this.#dialog === node) this.#dialog = null;
		};
	};

	#show(event: MouseEvent & { currentTarget: EventTarget & HTMLElement }, kind: DemoKind) {
		// a new tab or window on purpose: let the browser follow the link
		if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
			return;
		}
		if (!this.#dialog) return;
		event.preventDefault();
		this.#opener = event.currentTarget;
		this.kind = kind;
		this.href = event.currentTarget.getAttribute('href') ?? '';
		if (!this.#dialog.open) this.#dialog.showModal();
		this.isOpen = true;
	}

	/** Click handler for every booking button: shows the dialog in the same frame, no network. */
	book = (event: MouseEvent & { currentTarget: EventTarget & HTMLElement }) =>
		this.#show(event, 'book');

	/** Click handler for every other link that leaves the page. */
	open = (event: MouseEvent & { currentTarget: EventTarget & HTMLElement }) =>
		this.#show(event, 'link');

	close = () => {
		this.#dialog?.close();
	};

	/** The dialog's `close` event, whatever closed it (Esc, backdrop, button): focus goes back. */
	closed = () => {
		this.isOpen = false;
		this.#opener?.focus();
		this.#opener = null;
	};

	/** A click on the backdrop lands on the `<dialog>` itself, outside its inner panel. */
	backdrop = (event: MouseEvent & { currentTarget: EventTarget & HTMLDialogElement }) => {
		if (event.target === event.currentTarget) this.close();
	};
}

export const demo = new Demo();
