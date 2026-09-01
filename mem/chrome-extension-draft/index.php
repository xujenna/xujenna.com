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
		display: block;
		max-width: 100%;
		margin: 28px 0 44px;
	}

	.caption {
		display: block;
		color: #555;
		font-size: 0.86em;
		line-height: 1.4;
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
		/* width: min(100%, 476px);
		max-width: 476px; */
		margin-right:20px;
		width:45%;
		display:inline-block;
		/* box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.19);
		max-width: 150px;
		min-width:125px; */
	}
</style>
<p>
	The incumbents were familiar—Evernote pioneered the category—but the attitude was different. Mem would not simply be saving a bookmark or dumping raw text or HTML into a database. It needed to read the page, create a summarized note, organize it in your workspace, preserve the source, <i>and</i> allow users to make edits to the new note in-browser.
</p>
<p>All in one click.</p>
<p>
<b>Goal:</b> Preserve the one-click simplicity of traditional web clippers while introducing the power of an agentic workflow.
</p>
<p>
		<span class="case-study-figure"><video class="img-responsive browser-window-gif" src="mem/chrome-extension-draft/Google Chrome-big-opt.mp4" autoplay muted loop playsinline></video></span>
	<span class="caption"><i>The current version, reskinned for the redesign. The extension had to feel like one click, while still giving users a moment to steer what Mem saved.</i></span><br>
		<span class="case-study-figure"><video class="img-responsive browser-window-gif" src="mem/chrome-extension-draft/clipped-note.mp4" autoplay muted loop playsinline></video></span>
		<span class="caption"><i>The resulting generated note with web source attached.</i></span><br>

</p>

<h2 class="section_hed">Process</h2>
<div class="type_test" id="description_text">
<p class="subhead">
<b>Starting with a different kind of clipper</b>
</p>
<p>
	The starting point was familiar: one button or shortcut, then Mem would format and organize the capture. The key design question was not whether people understood clipping. It was how much agentic capability we could add before the experience stopped feeling intuitive.
</p>
<p>
	I started with the core clipper loop: saving in progress, collection dropdowns, save confirmation, note view, and transformed note. We also explored queue states, extension icon states, and configuration because one-click saving only works if users can understand what happened after the popup closes.
</p>
<p>
	Early mocks explored one-click capture, optional instructions, collection handling, and selected-text clipping. The product had to make the default path obvious—click once and move on—while making AI instructions and chat available without making them feel required.
</p>
<p>
	<img class="img-responsive case-study-media-wide" src="mem/chrome-extension-draft/chrome-popup-selection-presave-opt.webp">
	<span class="caption"><i>Selected-text clipping needed the browser for context: the popup had to reflect what was highlighted without hiding the source.</i></span><br>
</p>

<p class="subhead">
<b>Making control optional</b>
</p>
<p>
	The hardest interaction problem was timing. If the popup waited too long, Mem felt slow. If it closed too quickly, users felt rushed. The countdown became the compromise: Mem would continue automatically unless the user chose to intervene.
</p>
<p>
	Early usability sessions showed that the timer felt too fast for new users, so we added hover-pause as an early control affordance. It let people slow the flow down without making instructions feel required.
</p>
<p>
	<span class="case-study-figure"><video class="img-responsive browser-window-gif" src="mem/chrome-extension-draft/linear-final-notification-ui-2025-06-30-trimmed-10s-scrollbar-opt.mp4" autoplay muted loop playsinline></video></span><br>
</p>
<p class="subhead">
<b>Turning clips into sessions</b>
</p>
<p>
	As the product matured, the work shifted from "save this page" to "create a session around this page." Backend and frontend decisions followed: a consistent session per webpage per user, history on return, note updates instead of duplicate notes, and a popup that could support follow-up messages after the first clip.
</p>
<p>
	That architecture changed the product model. The extension was no longer just a receipt for a saved note; it needed to preserve page context, support return states, and leave room for follow-up without making chat feel mandatory.
</p>
<p>
	It also exposed the hardest scope question of the project. Once users could follow up from the popup, they expected Mem to fix its own work: rename the wrong collection, revise a note, recover from bad organization, and preserve continuity across related clips. Kevin pushed on this after testing the June build, arguing that if the extension could create an object, the product needed the corresponding read, update, and delete tools too.
</p>
<p>
	That was the moment the clipper almost became a full agentic workspace. We treated it as a design constraint rather than a new default mode: the popup had to support powerful correction and follow-up, but the primary path still had to feel like one click and move on.
</p>
<p>
	Once the session model was real enough to test, the rough edges were obvious: the popup could create a note and preserve a running interaction, but users could still feel trapped watching the session unfold.
</p>

<p class="subhead">
<b>Testing the trust boundary</b>
</p>
<p>
	Research clarified where automation needed stronger proof. Writers, founders, consultants, attorneys, power users, and existing customers all understood clipping, but they had different trust thresholds for AI. Some wanted Mem to summarize, clean up, and file the page; others wanted exact capture. If they highlighted a sentence to quote later, they did not want AI rewriting it.
</p>
<p>
	Those sessions sharpened the v1 cut: full-page capture could be transformed aggressively into a structured note; selections needed stronger fidelity to the highlighted text; and follow-up chat needed to stay available without becoming the expected path.
</p>

<p class="subhead">
<b>Removing perceived waiting</b>
</p>
<p>
	The speed problem became clearer: it was not only system latency. It was the feeling that users had to wait and watch. We changed the flow so Mem started processing immediately, the countdown no longer blocked session kickoff, and the popup disappeared after the timer so users could move on.
</p>
<p>
	That also changed the pause behavior. Hover-pause had been useful when the timer felt too fast, but it made the popup feel like something users had to manage. For launch, the timer paused only when the input was active: if users were typing, Mem waited; otherwise it kept the one-click path moving. The session view moved behind an intentional click, so the default experience stayed lightweight.
</p>

<p class="subhead">
<b>Making the handoff trustworthy</b>
</p>
<p>
	The final polish focused on making each handoff explicit. The webpage preview became a sent-message-style screenshot bubble; the checkmark showed when the clip reached the backend; and the status metadata kept getting refined through launch so users could tell the page had reached Mem and was being processed.
</p>
<p>
	The shipped experience became a one-shot path for users who just wanted to save a page or selection, and a multi-turn path for users who wanted to keep working with the source.
</p>
<div class="case-study-figure">
	<video class="img-responsive browser-window-gif" src="mem/chrome-extension-draft/linear-countdown-flicker-01-rebuilt-browser-preview-opt-composition-2x-barpatch.mp4" autoplay muted loop playsinline></video>
</div>
<div class="case-study-figure">
	<video class="img-responsive browser-window-gif popup-window-gif" src="mem/chrome-extension-draft/one-shot-opt.mp4" autoplay muted loop playsinline></video>
		<video class="img-responsive browser-window-gif popup-window-gif" src="mem/chrome-extension-draft/multiturn-opt.mp4" autoplay muted loop playsinline></video>
</div>
<!-- <span class="caption"><i>For the default path, the extension still behaved like a traditional clipper: one click, useful note, source preserved.</i></span><br> -->

</div>

<h2 class="section_hed">Outcome</h2>
<div class="type_test" id="description_text">
<p>
	The Chrome Extension launched publicly in August 2025. In the first month, 1,261 users created 7,933 clips, averaging 6.3 clips per clipping user.
</p>
<p>
	That usage matched the design intent: the one-click path carried the bulk of activity, while optional AI control was still discoverable. 37% of clipping users sent at least one follow-up message from the extension, creating 2,352 follow-up messages in that first month.
</p>
<p>
	By July 2026, the Chrome Web Store listing showed 10,000+ users and a 4.9 rating.
</p>
<p>
	The strongest reviews validated the original bet: users did not value the extension because it moved content from one place to another. They valued that Mem summarized, outlined, tagged, preserved the source, and let them keep directing the AI from the clipped page.
</p>
<p>
	<img class="img-responsive case-study-media" src="review1-opt.webp">
	<img class="img-responsive case-study-media" src="review2-opt.webp">
	<img class="img-responsive case-study-media" src="review3.png">
	<span class="caption"><i>Launch-week reviews reinforced the same signal: users understood the extension as a step-change from a traditional clipper.</i></span>
</p>
</div>

<!-- end text and image -->
