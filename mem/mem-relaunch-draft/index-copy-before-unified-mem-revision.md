# Mem 2.0 Relaunch — Copy Before Unified Mem Revision

Archived from `index.php` immediately before the July 15, 2026 narrative revision. This preserves the old written copy for comparison; styling markup and image tags are omitted, while the original visual positions are noted in brackets.

*Mem 2.0 was a rebrand and product redesign that snowballed (my bad!) into a full product relaunch 6 months later, ultimately becoming the foundation for monetization and a measurable lift in early retention.*

I started contract-to-hire in February 2025 to cover the founding designer’s maternity leave, and joined full-time as their second product designer in July. Initially briefed to apply a new brand identity from Red Antler in addition to regular sprint work, I ultimately decided I couldn’t simply paint over the issues that taunted me: everything was competing for the user’s attention via duplicative surfaces, redundant entry points, and floating action buttons everywhere; Mem's most differentiating and overlapping AI features were scattered across three disconnected surfaces that users weren’t reaching for; visual hierarchy—especially typographic, critical for a notes app—was all but nonexistent.

Additionally, product mess seemed to encourage user mess: users were dumping thoughts into Mem on the promise that they would be filed away, then surfaced back to them at the right moment; this was a promise that we were utterly failing to deliver on.

As with most jobs throughout my career, I was soon leading a comprehensive redesign: a six-month effort to overhaul the product's visual language, information architecture, and interaction model, optimizing the overall experience to better align with the brand promise of catalyzing the potential of every thought. My work would culminate in October 2025 as the Mem 2.0 relaunch.

**Goals:** Relaunch Mem with a new brand and a dramatically optimized product experience. Consolidate fragmented AI surfaces and interaction patterns, simplify the IA, eliminate redundancy, add long-requested features like dark mode and multitasking, improve discoverability of differentiating features, and ship it all as a single coordinated moment.

[The Mem homepage, before and after]

## Process

### Visioning

After receiving encouragement from the founder to think beyond a simple reskin, I started with a more basic question: what kind of workspace would make Mem's promise feel true? A new palette would not fix a product where capture, recall, search, and AI assistance all felt disconnected.

From there, I naturally went buck-wild exploring all my dreams for the product:

[Semantic/vector similarity (aka copilot) operating across your entire workspace, not just note-level.]

[The home page as a scratchpad for fleeting thoughts that Mem develops and files for you.]

[An explore feature enabling you to traverse your own knowledge repository, like a Wikipedia for your brain.]

I explored a more aggressive Copilot that could show topic history and relevant collections inside a note, a home surface for quick capture, and an Explore page that turned a workspace into topics, people, timelines, and trends. Those ideas did not make the relaunch, but they gave the CEO and me a shared language for the promise: Mem should help you feel organized without making you organize.

The first concrete product thesis was **browse everywhere**. Search was best for fast navigation, chat for recall and synthesis, and Copilot for browsing related context from the note already in front of you. The design problem was how to make those jobs feel like one intelligent workspace instead of three competing tools. The answer was not one flattened AI page; it was obvious handoffs so a user could navigate, browse, synthesize, and multitask without knowing which AI feature name to reach for.

That widened the work from fresh paint to three linked bets: make search and capture more prominent, make Copilot and Chat feel like Mem instead of hidden utilities, and make the app feel like a living workspace through the new brand and dark mode. Side-by-side work and tabs became launch-relevant because they supported the behavior we wanted: keep a note open, compare related material, and ask Mem for help without losing your place.

### Unifying the AI experience

The product's biggest problem was fragmentation. Search, Chat, and Copilot were Mem’s most differentiating AI features, yet they competed for visibility while overlapping in function—so users reached for none of them.

The work moved through a few increasingly opinionated models: Mem as a collaborator beside you, a combined copilot/chat panel, and side-by-side views that let the AI sit beside your work instead of replacing it. Each direction tested the same question from a different angle: was Mem becoming a chat app, or was chat one mode inside a real workspace?

As the exploration deepened, we landed somewhere radical: dubbed “Mem Magic,” a single overlay that would unify search, chat, copilot, quick capture, and notifications into one adaptive input. The field would respond to what you typed—a query surfaces results, a question opens chat, a stray fragment becomes a captured note—and Mem’s own activity could persist as sessions and actions instead of disappearing into an invisible background process.

Mem Magic explored an always-available input, contextual versions inside notes, “remember anything” language, source-adding, note creation, auto-organize, auto-format, Chrome/email capture, thinking states, completed states, sessions, actions, and mobile patterns that made the same idea feel native. The concept was exciting because it made Mem feel truly agentic, but it also asked users and engineering to absorb too many new patterns at once.

I loved it and fought for it until the eleventh hour of the launch. We still killed it. The interaction patterns were too unfamiliar and the engineering lift too large to bet a make-or-break launch on. What survived was the pragmatic core of the idea: a **Heads Up** panel that surfaced proactive context, related notes, and relevant actions, with chat always accessible right below it. Users no longer had to understand the difference between copilot and chat to get the value of both.

[Before/after: editor with the unified right sidebar, Heads Up + chat]

### Optimizing the workspace

Mem 1.0 had accumulated clutter: floating action buttons and bars, duplicative surfaces and entry points, all competing for attention. The sidebar siloed everything into Library / Notes / Collections / Templates, with flat Pinned and Recents lists stranded below. I restructured it around how people actually returned to work: pinned notes and collections together, collapsible sections, and collection tags shown inline on every note in list view. Organization became legible at a glance instead of buried a click away. *(See the before/after at the top.)*

[Before/after: sidebar and information architecture]

There was also no room for tablestakes multitasking workflows. Tabs and panes became the practical workspace structure underneath the bigger vision: side-by-side work, note comparison, related context, and chat without losing your place. Once that direction was clear, the work became less about adding ideas and more about reducing ambiguity: back navigation, links opening in tabs, scrollable tabs instead of an overflow menu, explicit active-tab states, pane resize handles and drop zones, sidebar hover and collapse states, note/link behavior, and a new-tab home that brought proactive context beside the work instead of competing with it.

[Tabs and panes / multitasking]

### Building the visual system

Throughout my product explorations, I was simultaneously honing in on a new visual language with every mock. The product needed to feel warm, lived-in, and legible without losing the speed of a work tool. That meant translating the new brand into product decisions: palette, margins, buttons, information hierarchy, sidebar states, core views, color ramps, type styles, componentry, and a purpose-built dark mode palette rather than an inverted one.

The founding designer came back from mat leave early to help lead the formalization of the system with engineers. From there, we worked surface by surface: semantic variables for dark mode, a full reskin of core components before secondary pages, and refreshed color, typography, spacing, iconography, and interaction patterns so the whole product finally felt like one thing.

[Organic-modern moodboard / brand inspiration]

[Design system: color ramps, canvas/latte + ink dark mode, type scale]

[Dark mode]

The product did not ship every dream. Explore did not make it. Mem Magic did not make it. But the through-line was intact: a cleaner workspace, a more cohesive AI thought-partner model, a proactive Heads Up surface, and a product that finally looked, felt, and functioned like the promise we were selling.

[Product tour]

## Outcome

We shipped as one coordinated moment in October 2025, and early launch-window signals moved in the right direction.

Post-launch cohort analysis showed day-1 retention climb from ~19% to ~23%. Users who engaged with the newly branded **Heads Up** retained at 173% higher rates. *69%* of new users composed a note within their first 24 hours, and *24%* found their way to chat.

The redesigned surfaces saw meaningful use in the launch month. Pane splitting grew from *712* users in September to *2,097* in October, chat-message senders rose from *533* to *4,744*, and the Copilot surface, relaunched as Heads Up, grew from *32* users in September to *1,126* clickers in October.

Early monetization signals were promising, too: note-gate users converted at *55%*, chat-gate users converted at *46%*, and free-to-paid subscription activations rose from *77* users in September to *951* in October. ARR ramped from effectively zero at launch to about *$62.5K* in the early October launch window, and the launch landed in Product Hunt’s top five.

Those who had churned off Mem 1.0 returned and described 2.0 as visually stronger, faster, more frictionless, and easier to trust as a daily workspace. One user described Heads Up recall as feeling like "a second brain that's actually useful," which was probably the most satisfying version of the brand promise coming back in a user's own words.

[Testimonials]
