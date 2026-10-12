<!-- text and image -->
<style>
	.case-study-media {
		display: block;
		width: 100%;
		max-width: 760px;
		height: auto;
	}

	.case-study-media-wide {
		display: block;
		width: 100%;
		max-width: 900px;
		height: auto;
	}

	.case-study-media-narrow {
		display: block;
		width: 100%;
		max-width: 626px;
		height: auto;
	}

	.case-study-figure {
		max-width: 100%;
	}

	.caption {
		display: block;
		color: #555;
		font-family: "meridian";
		font-weight: 300;
		font-size: 0.86em;
		line-height: 1.4;
		margin: 0 0 40px;
	}

	.browser-window-gif {
		display: block;
		width: 100%;
		max-width: 760px;
		height: auto;
		margin: 28px 0 44px;
		border-radius: 10px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
	}

	.popup-window-gif {
		width: min(100%, 476px);
		max-width: 476px;
		border-radius: 18px;
		box-shadow: 0 12px 36px rgba(0, 0, 0, 0.16);
	}

	.expanded .popup-window-gif {
		margin-right:20px;
		width:45%;
		display:inline-block;
	}

	/* pull captions up against the media they describe */
	.case-study-figure > :is(img, video):has(+ .caption),
	.case-study-figure:has(> .caption) > .popup-window-gif {
		margin-bottom: 18px;
	}
</style>
<div class="type_test" id="description_text">

<p>
The incumbents were familiar—Evernote pioneered the category years ago—but the approach was different. Mem would not simply be saving a bookmark or dumping raw text or HTML into a database. It needed to read the page, create a summarized note, organize it in your workspace, preserve the source, and allow users to make edits right in the browser.
</p>
<p>All in one click.</p>

<div class="case-study-figure">
	<video class="img-responsive browser-window-gif" src="mem/chrome-extension-draft/Google Chrome-big-opt.mp4" autoplay muted loop playsinline></video>
	<p class="caption">The extension, reskinned for Mem 2.0</p>
	<video class="img-responsive browser-window-gif" src="mem/chrome-extension-draft/clipped-note.mp4" autoplay muted loop playsinline></video>
	<p class="caption">The resulting note, with its source attached</p>
</div>

<h2 class="section_hed">Process</h2>
<p class="subhead">
<b>One click, and then some</b>
</p>
<p>
	My early mocks looked familiar: one-click capture, optional instructions, collection handling, and selected-text clipping. The product had to make the default path obvious—click once and move on—while making AI instructions and chat available without making them feel required.
</p>
<div class="case-study-figure">
	<img class="img-responsive case-study-media-wide" src="mem/chrome-extension-draft/chrome-popup-selection-presave-opt.webp">
	<p class="caption">Clipping a selection</p>
</div>

<p class="subhead">
<b>Goodbyes are hard</b>
</p>
<p>
	The trickiest interaction problem was the popup's self-dismissal timing, which was required for the one-click experience: too slow and the user feels pressured to do something; too fast and people felt rushed. Our compromise was a countdown bar, to indicate that Mem would carry on clipping unless you stepped in to add instructions. In our first usability test, it read as pure panic—too fast, and weirdly, like a loading bar. So we added pause-on-hover, a way to slow things down without making instructions feel required.
</p>
<div class="case-study-figure">
	<video class="img-responsive browser-window-gif" src="mem/chrome-extension-draft/linear-final-notification-ui-2025-06-30-trimmed-10s-scrollbar-opt.mp4" autoplay muted loop playsinline></video>
	<p class="caption">The countdown: Mem keeps going unless you step in</p>
</div>

<p class="subhead">
<b>Turning web-clipping into agentic sessions</b>
</p>
<p>
	By June, the extension had (d)evolved from “save this page as a note” to “start a session around this page.” Each webpage you clipped would start a persistent agentic session, so if you came back to it months later, your history was waiting for you, and follow-ups updated the existing note instead of creating a new one.
</p>
<p>
	This opened a can of worms. The founder tested an early build and argued that if the extension could create something, it also needed to be able to read, update, and delete it. That was the moment the clipper transformed into a full-blown agentic workspace, more powerful than Mem's in-app chat.
</p>

<p class="subhead">
<b>Removing the wait</b>
</p>
<p>
	A second round of user testing revealed further countdown-induced confusion: users thought Mem needed that time to finish clipping, and would wait for the popup to disappear. To make matters worse, users' cursors often happened to be where the popup was positioned, so it would never actually self-dismiss.
</p>
<p>
	To mitigate the feeling that the popup was something you had to manage, the last iteration was all about proving the handoff happened: the page preview became a sent-message-style bubble, complete with a sent status to indicate that your job was done; pause-on-hover turned into pause-on-chat-click; Mem started processing the note the moment you clicked. What shipped was a one-shot path for people who just want to save something, and a multi-turn path for people who want to keep working with it.
</p>
<div class="case-study-figure">
	<video class="img-responsive browser-window-gif" src="mem/chrome-extension-draft/linear-countdown-flicker-01-rebuilt-browser-preview-opt-composition-2x-barpatch.mp4" autoplay muted loop playsinline></video>
	<p class="caption">Shipped: Mem starts working immediately, and the popup gets out of your way</p>
	<video class="img-responsive browser-window-gif popup-window-gif" src="mem/chrome-extension-draft/one-shot-opt.mp4" autoplay muted loop playsinline></video>
	<video class="img-responsive browser-window-gif popup-window-gif" src="mem/chrome-extension-draft/multiturn-opt.mp4" autoplay muted loop playsinline></video>
	<p class="caption">One-shot and multi-turn</p>
</div>

</div>

<h2 class="section_hed">Outcome</h2>
<div class="type_test" id="description_text">
<p>
	The extension launched on the Chrome Web Store in August 2025. In its first month, 1,261 people made 7,933 web clips, and 37% of them sent at least one follow-up message.
</p>
<p>
	By July 2026, it had 10,000+ users and a 4.9 rating.
</p>
<p>
	<img class="img-responsive case-study-media" src="review1-opt.webp">
	<img class="img-responsive case-study-media" src="review2-opt.webp">
	<img class="img-responsive case-study-media" src="review3.png">
</p>
</div>

<!-- end text and image -->
