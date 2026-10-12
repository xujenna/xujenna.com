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

	/* pull captions up against the media they describe */
	.case-study-figure > :is(img, video):has(+ .caption),
	.case-study-figure > .inline_screens {
		margin-bottom: 18px;
	}
</style>
<div class="type_test" id="description_text">

<p>
	I started at Mem, an AI note-taking app, to cover the founding designer’s maternity leave, eventually joining full-time as their second design hire. In addition to regular sprint work, they handed me a set of brand guidelines from Red Antler and asked me to apply them. 
</p>
<p>
	I opportunistically developed my own agenda: culling duplicative surfaces and floating action buttons competing for attention, establishing visual hierarchy (especially typographic, which was all but nonexistent), and unifying Mem’s most differentiating AI capabilities that were scattered across multiple surfaces. As with most jobs throughout my career, I was soon leading a comprehensive redesign, overhauling the product’s visual language, information architecture, and interaction model.
</p>

<div class="case-study-figure">
	<video class="img-responsive browser-window-gif" src="/mem/mem-relaunch-draft/pre-redesign-app-tour.mp4" autoplay muted loop playsinline preload="metadata"></video>
	<p class="caption">Before: Mem 1.0</p>
	<video class="img-responsive browser-window-gif" src="/mem/mem-relaunch-draft/redesign-root-views-tour.mp4" autoplay muted loop playsinline preload="metadata"></video>
	<p class="caption">After: Mem 2.0</p>
</div>

<p>
	The new brand in a nutshell: a match for great minds. Mem as your thought partner, that works alongside you and has your back. For creative, tireless, nonlinear thinkers and leaders, drawn to the promise that Mem would organize their multifaceted lives for them.
</p>
<div class="case-study-figure">
	<img class="img-responsive case-study-media" src="brand-guidelines-opt.webp">
	<p class="caption">Red Antler’s brand guidelines</p>
</div>

<h2 class="section_hed">Process</h2>
<p class="subhead">
<b>Explore</b>
</p>
<p>
	With encouragement from the founder to think beyond a reskin, I naturally started by dumping all my wildest dreams for Mem into Figma. From that mess, the founder and I quickly narrowed in on three threads.
</p>
<p>
	The first was Explore, a way to browse Mem’s understanding of your notes, kind of like a personal Wikipedia. It didn’t enable any workflows, but we saw it as a trust-building surface; proof that Mem not only understood your brain, but could organize it too. We loved it, but ended up nixing it to prioritize higher impact product changes.
</p>
<div class="case-study-figure">
	<img class="img-responsive browser-window-gif case-study-media" src="explore-opt.webp">
	<p class="caption">Explore: a Wikipedia for your brain</p>
</div>

<p class="subhead">
<b>Unified Mem</b>
</p>
<p>
	The second thread was my main campaign: Unified Mem. Mem at that point had three AI features: 
	<ol>
		<li>Semantic search, which worked even if you only vaguely knew what the note was about</li>
		<li>Chat, an LLM that could pull in your notes as context</li>
		<li>Copilot, which theoretically surfaced related notes as you wrote, but in reality was noisy and didn’t work well</li>
	</ol>
</p>
<p>
	My thesis was that these three features were already overlapping in function, and would only continue to converge as AI improved. Search and Copilot were both running vector similarity under the hood, and Chat could do both functions better. Users had figured this out too: they used Chat to search and Search to find related notes, so having three separate surfaces just meant they were competing for attention.
</p>
<div class="case-study-figure">
	<img class="img-responsive case-study-media" src="mem1-copilot-opt.webp">
	<p class="caption">Before: Copilot and Chat as competing tabs, with Search up top</p>
</div>
<p>
	My first mocks consolidated Chat and Copilot, with Copilot acting as Chat’s empty state—so Mem was already thinking about your note before you started talking to it. This sent us down a rabbit hole of ergonomics: what if Copilot had an update while you were chatting? How would you switch back and forth without losing your train of thought? We eventually landed on a stacked drawer behind a single Mem logo, which had an added brand benefit: Mem, literally working alongside you as your thought partner.
</p>
<div class="case-study-figure">
	<video class="img-responsive browser-window-gif case-study-media" src="/mem/mem-relaunch-draft/unified-mem-stacked-drawer.mp4" autoplay muted loop playsinline preload="metadata"></video>
	<p class="caption">The stacked drawer: Copilot by default, Chat a click away</p>
</div>
<p>
	At the last minute, as I was trying to formalize the scope of the relaunch, we really went for it with a truly unified Mem. The entire top bar became a handoff layer; an input that could divine whether you wanted to ask a question, search for a note, generate a new one, or organize a bunch of them. Copilot, rebranded as Heads Up, became a notification drawer in the corner. I especially loved it for iOS: coupled with a voice mode feature I was concurrently designing, it could promote the mobile app from a simple reference surface to an efficient capture surface.
</p>
<div class="case-study-figure">
	<video class="img-responsive browser-window-gif case-study-media" src="/mem/mem-relaunch-draft/unified-mem-handoff.mp4" autoplay muted loop playsinline preload="metadata"></video>
	<p class="caption">One input to ask, search, write, and organize</p>
	<video class="img-responsive inline_screens" src="/mem/mem-relaunch-draft/unified-mem-ios-voice.mp4" autoplay muted loop playsinline preload="metadata"></video>
	<video class="img-responsive inline_screens" src="/mem/mem-relaunch-draft/unified-mem-ios-memit.mp4" autoplay muted loop playsinline preload="metadata"></video>
	<p class="caption">Unified Mem on iOS</p>
</div>
<p>
	Ultimately, the founder made the call to revert to the more moderate stacked drawer; it was too much change to the core interaction model, too late in the game. So we shipped Heads Up and Chat together behind one Mem entry point, while keeping Search the same.
</p>
<div class="case-study-figure">
	<video class="img-responsive browser-window-gif case-study-media" src="/mem/mem-relaunch-draft/shipped-mem-panel.mp4" autoplay muted loop playsinline preload="metadata"></video>
	<p class="caption">Shipped: Heads Up and Chat in one Mem panel</p>
</div>

<p class="subhead">
<b>Visual language</b>
</p>
<p>
	While I was generating all these explorations, I was also honing in on the third thread with every mock: hierarchy (especially typography), a sidebar and top bar that went through many, many iterations, a refined palette, margins, and general fit and finish, tabs and panes for multitasking, and a purpose-built dark mode rather than an inverted one. A month before launch, the returning designer helped codify it all into a design system with engineering, complete with semantic variables.
</p>
<div class="case-study-figure">
	<img class="img-responsive browser-window-gif case-study-media" src="dark-mode-opt.webp">
</div>

</div>
<h2 class="section_hed">Outcome</h2>
<div class="type_test" id="description_text">
<p>
	Mem 2.0 launched in October 2025 and landed in Product Hunt’s top five.
</p>
<div class="case-study-figure">
	<video class="img-responsive browser-window-gif" src="/mem/mem-relaunch-draft/tour-web-edited-voice-shortened-v3.mp4" autoplay muted loop playsinline preload="metadata"></video>
</div>
<p>
	Monthly Copilot/Heads Up saw a 35x bump. Day-1 retention rose from ~19% to ~23%, and new users who tried Heads Up on their first day came back at nearly three times the rate of those who didn’t.
</p>
<p>
	The relaunch also seemed to work as a brand reset. We heard from churned Mem 1.0 users coming back to try 2.0 and loving it. 
</p>
<p>
	<img class="img-responsive case-study-media" src="hype4-opt.webp"><br>
	<img class="img-responsive case-study-media" src="hype5-opt.webp"><br>
	<img class="img-responsive case-study-media" src="hype6-opt.webp"><br>
	<img class="img-responsive case-study-media" src="hype2-opt.webp"><br>
</p>
</div>
<!-- end text and image -->
