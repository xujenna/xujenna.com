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
		font-size: 0.86em;
		line-height: 1.4;
	}
</style>
<div class="type_test" id="description_text">

<p>
		<i>Mem 2.0 was a rebrand and product redesign that snowballed (my bad!) into a full product relaunch six months later. At its center was a question that would only become more urgent as AI improved: what happens when Search, Chat, and proactive recall stop behaving like separate features?</i>
</p>
<!-- <p>
	<b>Role:</b> Sole designer on the Mem 2.0 redesign—visual language, information architecture, and interaction model. &nbsp;<b>Team:</b> the founder/CEO and engineering partners across web, desktop, iOS, and launch surfaces. &nbsp;<b>Timeline:</b> Feb–Oct 2025.
</p> -->
<p>
	I started contract-to-hire in February 2025 to cover the founding designer’s maternity leave, and joined full-time as their second product designer in July. Initially briefed to apply a new brand identity from Red Antler in addition to regular sprint work, I realized the problem was bigger than a pain job could solve: duplicative surfaces, redundant entry points, and floating action buttons competed for attention; visual hierarchy—especially typographic, critical for a notes app—was all but nonexistent; and Mem’s most differentiating AI capabilities were scattered across three surfaces that users did not experience as meaningfully different. 
</p>
<p>
	As with most jobs throughout my career, I was soon leading a comprehensive redesign: a six-month effort to overhaul the product's visual language, information architecture, and interaction model, optimizing the overall experience to better align with the brand promise of catalyzing the potential of every thought. My work would culminate in October 2025 as the Mem 2.0 relaunch.
</p>
<p>
<b>Goals:</b> Relaunch Mem with a new brand and a dramatically optimized product experience. Design one coherent relationship between users and Mem’s increasingly overlapping intelligence; simplify the IA; eliminate redundancy; add long-requested features like dark mode and multitasking; and ship it all as a single coordinated moment.
</p>

<div class="case-study-figure">
	<video class="img-responsive browser-window-gif" src="./mem/mem-relaunch-draft/pre-redesign-app-tour.mp4" autoplay muted loop playsinline></video>
	<p class="caption">Previous: Mem 1.0</p>
	<video class="img-responsive browser-window-gif" src="./mem/mem-relaunch-draft/redesign-root-views-tour.mp4" autoplay muted loop playsinline></video>
	<p class="caption">Final: Mem 2.0</p>
</div>

<h2 class="section_hed">Process</h2>
<p class="subhead">
<b>Visioning</b>
</p>
<p>
	After receiving encouragement from the founder to think beyond a simple reskin, I naturally went wild exploring all my dreams for the product:
</p>
<!-- ASSET DIRECTION: Show one focused early exploration of workspace-wide Copilot/vector similarity. -->
<div class="case-study-figure">
	<img class="img-responsive case-study-media" src="dreams_copilot-opt.webp">
	<p class="caption">Semantic/vector similarity (aka copilot) operating across your entire workspace, not just note-level.</p>
</div>
<!-- ASSET DIRECTION: Show one focused home/scratchpad proposal illustrating a place for fleeting thoughts, not a generic dashboard. -->
<div class="case-study-figure">
	<img class="img-responsive case-study-media" src="dreams_home-opt.webp">
	<p class="caption">The home page as a scratchpad for fleeting thoughts that Mem develops and files for you.</p>
</div>
<!-- ASSET DIRECTION: Show one focused Explore proposal that makes personal knowledge visibly traversable—topics, people, timelines, or threads. -->
<div class="case-study-figure">
	<img class="img-responsive case-study-media" src="dreams_explore-opt.webp">
	<p class="caption">An explore feature enabling you to traverse your own knowledge repository, like a Wikipedia for your brain.</p>
</div>
<p>
	I explored a more aggressive Copilot that could show topic history and relevant collections inside a note, a home surface for quick capture, and an Explore experience that turned a workspace into topics, people, timelines, and trends. Together, the explorations clarified the promise: Mem should help you feel organized without making you organize.
	</p>
<p>
	I pushed Explore beyond a standalone destination—into Search, notes, and collections—while Copilot expanded beyond the currently open note. But the more places I brought these behaviors, the harder it became to defend them as separate surfaces. Semantic Search could find related notes. Chat could retrieve and synthesize them. Copilot could surface them before the user asked. The underlying intelligence was converging even as the interface continued multiplying doors into it. And users used them interchangably—using Chat to search, Search to find related notes, and Copilot to retrieve context they might otherwise ask Chat for—while all three entry points competed for visibility.
	</p>
<!-- ASSET DIRECTION: Use a short three-step sequence: (1) Explore in Search, (2) Explore in notes/collections, (3) Copilot everywhere or “chat + copilot = mem.” Show one focused mock per step. -->
<p>
	The problem was not simply teaching users a cleaner definition of each feature. Those definitions were becoming less real. Experientially and brand-wise, it made more sense to give users one relationship with Mem instead of asking them to choose among our internal feature categories.
	</p>
<p class="subhead">
<b>Unified Mem</b>
</p>
<p>
	These explorations led me to push a broader product thesis: <b>Unified Mem</b>. Instead of separate Search, Chat, and Copilot entry points, users would have one Mem-branded place to “talk” to the product. Mem—not the user—would determine whether the moment called for searching and retrieval, conversation and synthesis, or proactive vector similarity that surfaced adjacent knowledge.
</p>
<p>
	The challenge was making one adaptive experience feel coherent rather than unpredictable: preserving context and sources, communicating what Mem was doing, and distinguishing a quick interaction from something that belonged in the user’s workspace. I explored how the model could extend across desktop and mobile, from quick capture through completed actions.
	</p>
<!-- ASSET DIRECTION: This is the key process visual. Show 3–4 focused Unified Mem iterations in order: an early unified entry point; clearer search/chat/proactive behavior; a processing or completed state; and the strongest late desktop or mobile concept. Add brief captions explaining what changed. -->
<p>
	The direction had support, but it arrived late in an already ambitious relaunch. We did not have the time or engineering capacity to rebuild the core interaction model so close to the deadline, so we walked the full convergence back. This was a launch-scope decision, not a conclusion that Search, Chat, and proactive recall should remain separate forever.
	</p>
<p>
	A narrower expression of the thesis survived. We created a single <b>Mem</b> entry point that opened Chat and Copilot—renamed <b>Heads Up</b>—stacked in the same panel. Heads Up surfaced proactive context and related notes above, while Chat remained accessible directly below it. Search stayed Search, outside that panel. We did not ship the full three-way convergence I had proposed, but we stopped making users choose between two competing ways of talking to Mem.
	</p>
<!-- ASSET DIRECTION: BEFORE/AFTER of the same editor context: old separate/hidden Chat and Copilot entry points versus the shipped single “Mem” entry point opening a stacked Heads Up + Chat panel. If Search is visible, keep it visibly separate so the image does not imply that full Unified Mem shipped. -->
<p class="subhead">
<b>Optimizing the workspace</b>
</p><p>Mem 1.0 had accumulated clutter: floating action buttons and bars, duplicative surfaces and entry points, all competing for attention. The sidebar siloed everything into Library / Notes / Collections / Templates, with flat Pinned and Recents lists stranded below. I restructured it around how people actually returned to work: pinned notes and collections together, collapsible sections, and collection tags shown inline on every note in list view. Organization became legible at a glance instead of buried a click away. <i>(See the before/after at the top.)</i>
</p>
<!-- ASSET DIRECTION: Tight before/after of sidebar IA. Highlight pinned notes + collections together, collapsible sections, and inline collection tags. Avoid repeating the full homepage comparison. -->
<p>
	I also added tabs and panes for multitasking, including back navigation, links opening in tabs, clear active states, pane resizing and drop zones, and the ability to compare notes or keep Chat open without losing your place.
	</p>
<!-- ASSET DIRECTION: One polished shipped screen is enough. Show tabs and two panes in a realistic multitasking state. -->
<p class="subhead">
<b>Building the visual system</b>
</p><p>Throughout my product explorations, I was simultaneously honing in on a new visual language with every mock. The product needed to feel warm, lived-in, and legible without losing the speed of a work tool. That meant translating the new brand into product decisions: palette, margins, buttons, information hierarchy, sidebar states, core views, color ramps, type styles, componentry, and a purpose-built dark mode palette rather than an inverted one.
</p>
<p>
	Near the end of the redesign, the returning founding designer helped codify the work into a formal design system with engineers. From there, we worked surface by surface: semantic variables for dark mode, a full reskin of core components before secondary pages, and refreshed color, typography, spacing, iconography, and interaction patterns so the whole product finally felt like one thing.
</p>
<!-- ASSET DIRECTION: A tightly cropped organic-modern moodboard paired with one resulting product screen; the point is translation from brand atmosphere to interface, not inspiration alone. -->
<!-- ASSET DIRECTION: One composed design-system asset with canvas/latte and ink color ramps plus the type scale. Keep component samples secondary and legible. -->
<!-- ASSET DIRECTION: Matched light/dark versions of the same screen to show that ink was purpose-built rather than mechanically inverted. -->
<p>
	The product did not ship every dream. Explore and the full Unified Mem model did not make the relaunch. But the through-line was intact: a cleaner workspace, a more coherent relationship among Mem’s AI capabilities, proactive Heads Up recall, and a product that finally looked, felt, and functioned like the promise we were selling.
</p>
	<!-- ASSET DIRECTION: Keep this product tour only if it clearly covers the shipped sidebar, Mem panel, multitasking, and dark mode. Otherwise replace it with a shorter highlight reel. -->
<div class="case-study-figure"><video class="img-responsive browser-window-gif" src="./mem/mem-relaunch-draft/tour-web-edited-voice-shortened-v3.mp4" autoplay muted loop playsinline></video></span>
	</div>

</div>
<h2 class="section_hed">Outcome</h2>
<div class="type_test" id="description_text">
	<p>We shipped as one coordinated moment in October 2025, and early launch-window signals moved in the right direction.</p>
<p>Post-launch cohort analysis showed day-1 retention climb from ~19% to ~23%. Heads Up use on day zero was associated with a 173% lift in day-1 retention compared with non-use. <i>69%</i> of new users composed a note within their first 24 hours, and <i>24%</i> found their way to Chat.
</p>
<p>
	The redesigned AI surfaces also found meaningful use in the launch month: Chat message senders rose from <i>533</i> in September to <i>4,744</i> in October, and the Copilot surface, relaunched as Heads Up, grew from <i>32</i> users to <i>1,126</i> clickers.
</p>
<p>Early monetization signals were promising, too: note-gate users converted at <i>55%</i>, chat-gate users converted at <i>46%</i>, and free-to-paid subscription activations rose from <i>77</i> users in September to <i>951</i> in October. ARR ramped from effectively zero at launch to about <i>$62.5K</i> in the early October launch window, and the launch landed in Product Hunt’s top five.
</p>
<p>
Those who had churned off Mem 1.0 returned and described 2.0 as visually stronger, faster, more frictionless, and easier to trust as a daily workspace. One user described Heads Up recall as feeling like "a second brain that's actually useful," which was probably the most satisfying version of the brand promise coming back in a user's own words.</p>
<!-- ASSET DIRECTION: Curate 3–5 testimonial crops into one clean composition. Prioritize feedback that validates the case-study claims: visual coherence, frictionless daily use, proactive Heads Up recall, and returning after Mem 1.0. -->
<p>
	<img class="img-responsive case-study-media" src="hype1-opt.webp"><br>
	<img class="img-responsive case-study-media" src="hype2-opt.webp"><br>
	<img class="img-responsive case-study-media" src="./hype3.png"><br>
	<img class="img-responsive case-study-media" src="hype4-opt.webp"><br>
	<img class="img-responsive case-study-media" src="hype5-opt.webp"><br>
</p>
</div>
<!-- end text and image -->
