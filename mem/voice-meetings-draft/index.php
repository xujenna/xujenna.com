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

	.product-window {
		display: block;
		width: 100%;
		max-width: 760px;
		height: auto;
		border-radius: 10px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
	}

	.product-window-wide {
		display: block;
		width: 100%;
		max-width: 920px;
		height: auto;
		border-radius: 10px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.16);
	}

	.product-window-tight {
		display: block;
		width: 100%;
		max-width: 640px;
		height: auto;
		border-radius: 10px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.16);
	}

	.product-window-flat {
		display: block;
		width: 100%;
		max-width: 760px;
		height: auto;
		border-radius: 10px;
	}

	.isolated-mock {
		display: block;
		width: 100%;
		max-width: 640px;
		height: auto;
	}

	.isolated-mock-wide {
		display: block;
		width: 100%;
		max-width: 900px;
		height: auto;
	}

	.isolated-mock-tight {
		display: block;
		width: 100%;
		max-width: 460px;
		height: auto;
	}
</style>

<p>
	<i>Mem Voice started as a deceptively simple prompt: make it easy to remember thoughts out loud. It became a design system for turning messy speech into useful memory, then evolved into Mem's meeting capture experience.</i>
</p>
<p>
	The market was already crowded. Granola had made meeting notes feel polished, Reflect and Audiopen had carved out voice journaling and brain dumps, Otter had trained users to expect transcripts and speaker labels, and hardware-adjacent tools like Limitless and TwinMind were pushing toward always-on capture. Competing meant more than adding a record button. Mem had to answer a sharper question: what should a knowledge product do with audio after it hears it?
</p>
<p>
	<b>Goal:</b> Design a voice capture experience that transformed speech into organized, editable notes without making users babysit a transcript, then carry the strongest patterns into meeting capture without copying bot-based meeting tools.
</p>

<h2 class="section_hed">Process</h2>
<div class="type_test" id="description_text">

<p class="subhead">
<b>Transform, don't transcribe</b>
</p>
<p>
	The first product decision was philosophical. Voice was not supposed to be a transcription feature with a summary bolted on. Kevin and I framed it as transformation: Mem should listen, understand the recording in context, and produce something closer to the note the user meant to write.
</p>
<p>
	Early on, I mapped the problem across two dimensions: when transformation happened, and where recording started. Mobile was more likely to be a walk, commute, or half-formed brain dump. Desktop was more likely to be a meeting. Recording inside a note should update that note; recording globally might create several notes from one messy stream of consciousness.
</p>
<p>
	That distinction kept the product from collapsing into one generic recorder. Every recording had three artifacts: the transformed note, the audio file, and the transcript. The design question was how to expose all three without making users feel like they had to manage all three.
</p>
<img class="isolated-mock-tight" src="voice-modal-isolated.png" alt="Voice recording popover with transcript bubbles, waveform, timer, and Done control." />

<p class="subhead">
<b>Choosing not to be a bot</b>
</p>
<p>
	The obvious competitive move would have been to chase meeting bots. We chose the harder, more Mem-like starting point: a standalone recorder that could work across personal thoughts and meetings without joining calls as a visible participant.
</p>
<p>
	That choice created real constraints. Without a bot, speaker detection was weaker. Web could only capture microphone audio. Desktop needed system-audio permissions. Mobile needed offline-friendly capture and multitasking. We knew some competitors would beat us on speaker labels, but a no-bot experience better matched the brand: Mem should be the place where your own context becomes useful, not another guest in every meeting.
</p>
<p>
	The MVP was therefore intentionally phased: web online recording first, iOS and offline capture close behind, desktop system audio as the unlock for meetings. Real-time editing was tempting, but not worth the complexity for v1. Notes would be generated after stop, with accept, reject, and refine as the safer control loop.
</p>
<img class="isolated-mock" src="voice-staged-controls-isolated.png" alt="Voice-generated edit controls with Edited Note, Refine, and Accept actions." />

<p class="subhead">
<b>Designing for forgotten recordings</b>
</p>
<p>
	Voice had a failure mode text capture did not: people forget they are recording. Meetings bleed into each other. A quick thought turns into a twenty-minute ramble. A user starts a new note while an old recording is still running somewhere else.
</p>
<p>
	We explored persistent indicators, live waves, "jump to ongoing recording," "switch here," and heuristics that could nudge closure after silence, a new note, or a verbal goodbye. The goal was not just to show a red dot. It was to prevent the uniquely bad failure mode of audio products: losing a thought because the user did not understand what was still recording, processing, or stuck.
</p>
<p>
	That also shaped error recovery. If processing failed, the recording still needed to exist. If the user wanted to keep moving, Mem needed to create a stub note instead of trapping them in an upload state. A voice product earns trust by never making people wonder whether the thing they just said is gone.
</p>
<img class="isolated-mock-wide" src="voice-recording-row-isolated.png" alt="A note list row showing an active voice recording state." />

<p class="subhead">
<b>Research changed the trust model</b>
</p>
<p>
	I ran usability sessions with existing users, founders, power users, meeting-note-tool switchers, and people who had already built voice workflows around TokNotes, email-to-Mem, AI tablets, ChatGPT, Tana, Granola, Otter, and Limitless. The strongest signal was not "make the transcript prettier." It was that users needed proof.
</p>
<p>
	"Incorporate into note" was the clearest failure. Nearly every participant thought it would paste the transcript into the note, when the actual model was that Mem could use the transcript as a source. Users were not being pedantic; they were trying to understand whether Mem had preserved the raw material. Mario and Franklin even created extra notes just to keep transcripts around because, as they put it, they wanted to "feed the brain."
</p>
<p>
	The diff UI had a similar problem. Green looked final, not pending. Strike-through looked like the note itself, not a proposed change. And when sources were tucked away, users worried the recording or transcript had disappeared. The research pushed the design away from clever transformation and toward visible provenance: transcript, audio, source, generated note, and pending edit state all had to be legible.
</p>
<img class="isolated-mock-wide" src="voice-editor-toolbar-isolated.png" alt="Voice mode shown as a first-class control in the editor toolbar." />

<p class="subhead">
<b>Letting mobile lead</b>
</p>
<p>
	Voice looked like a desktop meeting feature from the outside, but research kept pulling it back to mobile capture. Mark said almost all of his capture moments happened on his phone. Matt described walking as the perfect time to think, and texting while walking as the worst possible interface.
</p>
<p>
	That changed the interaction model. The voice button moved out of the crowded toolbar and into a floating action button that followed the keyboard. The transcript collapsed to a single line when space was tight. Sources moved to the bottom so users could find them. The note view could expand full screen, but half-height was often better because people wanted to keep writing while recording.
</p>
<p>
	Those decisions sound small, but they were the product. The more speech behaves like capture, the less it can ask users to stop what they are doing.
</p>

<p class="subhead">
<b>Following the market into meetings</b>
</p>
<p>
	We initially framed meetings as next, not first. The technical reality supported that caution: multi-speaker audio without headphones transcribed poorly, system audio was hard, and speaker attribution was a spectrum of needs we could not fully satisfy at launch.
</p>
<p>
	Users pulled the product there anyway. Mark used Voice on a real forty-five-minute call and valued how it captured the relevant points. Tobi compared the experience against every AI meeting-note tool he had tried. Aman wanted the richness of ChatGPT, the live emphasis of Granola and Tana, and the structure of a real meeting note. The product was being judged as a meeting tool whether or not we called it one.
</p>
<p>
	The work eventually shifted into Meetings: automatic detection, "meeting started / take notes" notifications, ongoing-recording alerts, global recording locks, and desktop-first constraints. We reused learnings from the Chrome extension's notification UX because the interaction problem was similar: Mem needed to act automatically, but still give users a short, understandable window to intervene.
</p>
<img class="isolated-mock" src="meeting-notification-isolated.png" alt="Meeting detected notification with a Take notes for me action." />
<img class="isolated-mock" src="meeting-start-row-isolated.png" alt="Calendar meeting notification row with Join meeting and open Mem action." />

<p class="subhead">
<b>The speaker identity problem</b>
</p>
<p>
	Meetings also exposed the flaw in the no-bot strategy. A standalone recorder could avoid the social awkwardness of a meeting bot, but the technology often knew only one thing with confidence: what came from <i>your</i> side of the audio stack versus everything else. That was not enough to produce trustworthy meeting notes.
</p>
<p>
	The failures were not cosmetic. When Mem could not distinguish the user from a coworker, the generated note required heavy manual edits. In other cases, transcripts labeled every speaker as <i>Me</i>, which made both the transcript and the downstream summary harder to trust. The product had crossed from "rough transcript" into "confidently wrong memory."
</p>
<p>
	Our first mitigation was to use calendar context to narrow the speaker pool: if Mem knew the meeting title and participants, it could at least reason from a smaller set of likely people. But calendar data could only reduce ambiguity, not solve attribution. The next phase became full speaker-attribution work: cleaner backend speaker indexing, clearer live speaker identity in the UI, and a broader reliability push across the meeting surfaces people actually used.
</p>
<p>
	That thread tied the whole project back to its original thesis. Voice was only valuable if transformation increased trust. For meetings, that meant Mem had to know not just <i>what</i> was said, but when to be careful about <i>who</i> said it.
</p>

<p class="subhead">
<b>Shipping in phases</b>
</p>
<p>
	Voice shipped first as personal capture, then kept moving toward the meeting use case as the technical pieces caught up. System audio and meeting reliability remained harder than personal dictation, so the product matured through reliability work rather than one clean launch moment.
</p>
<p>
	Calendar Integration and Meeting Autopilot became the communication layer for the same product direction: Mem could notice the meeting, ask whether to take notes, record without a bot, and turn the conversation into a useful note.
</p>

</div>

<h2 class="section_hed">Outcome</h2>
<div class="type_test" id="description_text">
<p>
	The strongest qualitative signal came from users who already had alternatives. Mario said Voice could replace TokNotes. Mark used it on a real forty-five-minute call and said it captured the relevant points. Tobi, who had tried nearly every AI meeting-note tool, said the experience might bring him back to Mem.
</p>
<p>
	Voice also gave Mem a way to compete in a noisy meeting-notes market without becoming a bot-first transcription app. The product stance held: transform speech into memory, preserve the source, and let users keep moving.
</p>
</div>

<!-- end text and image -->
