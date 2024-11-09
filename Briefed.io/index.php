<!-- text and image -->
<p>
Briefed.io revolutionizes how social security disability (SSDI) lawyers build their cases, which are based on clients' medical records that often exceed 1,000 pages. While technically impressive, the engineer-built MVP interface presented a steep learning curve for SSDI lawyers, many of whom are at the end of their careers with lower digital literacy. These lawyers relied on the founder himself to upload, process, and explore medical records on their behalf. Most who received a demo didn’t do much testing independently, and those who did found the UX confusing and unintuitive, hindering adoption and paid conversion.
</p>
<p>
I was brought on to redesign and implement a “self-service” version of their MVP that SSDI lawyers could use without hand-holding from the founder. My focus was on simplifying core functionalities, making task flows linear and intuitive, and creating clear affordances to create a frictionless experience for lawyers that would drive adoption.
</p>
<h2 class="section_hed">Process</h2>
<div class="type_test" id="description_text">
<p class="subhead">
<b>User Research</b>
</p><p>
I began by attending user interviews and observing live demos with the founder and interested lawyers. Watching the lawyers struggle firsthand offered critical insights:<ul>
	<li>
	Even logging in with predefined credentials posed challenging, highlighting the need for a simplified sign-up and onboarding process.
	</li>
	<li>
	Due to unclear information architecture and too-tiny type, lawyers had difficulty completing tasks. Clearer affordances, simplified hierarchies, and linear task flows became top priorities.
	</li>
	<li>
	Lawyers don’t typically know everything they should be looking for, with or without a state-of-the-art LLM digesting 1000 pages on their behalf. The ability to suggest search terms could effectively condense massive files into manageable summaries and offer immense time savings to a normally laborious process.
	</li>
	<li>
	Many users, especially those close to retirement or training new employees, were hesitant to invest time learning a new system. Ensuring effortless workflows and reliable results was crucial for adoption.
	</li>
</ul>
</p>
<p class="subhead">
<b>Ideation & Refinement</b>
</p><p>Because initial brand guidelines already existed, and because a redesign was a major component of my engagement, I presented simplified flows, new features, and usability improvements with high-fidelity mockups in Figma. Luckily, the founder was immediately thrilled and we found each other's ideas mutually inspiring, leading to a fruitful process of ideation, iteration, and refinement.
</p>
</div>
<h2 class="section_hed">Final Designs</h2>
<div class="type_test" id="description_text">
<p class="subhead">
<b>Login/signup</b>
</p><p>
Previously, lawyers needed the founder to manually set up accounts and upload medical files. I designed and implemented a simple quickstart flow that led users from sign-up/log-in directly into file selection/upload.<br>
<img class="img-responsive" src="./loginflow.png"><br>
</p>
<p class="subhead">
<b>Reducing complexity</b>
</p><p>I introduced a file upload flow that included automatic ingest and parse functionality, obscuring their innovation's complex backend processes to simplify the user flow significantly, with the goal of enabling lawyers to create cases independently.<br>
<img class="img-responsive" src="./file_upload.png"><br>
</p>
<p class="subhead">
<b>Simplified Workflows</b>
<p>
I replaced the static, text-based UI with linear task flows that made it clear what the next step was. Once a file was uploaded, the UI guided users directly to search. Suggested terms became clickable, and the search results page clearly showed options for adding or removing results from cases, dramatically reducing steps needed.</p>
<p>Additionally, searches were transformed into workspaces, allowing users to save and revisit their progress easily. A new side navigation bar gave quick access to previous searches, mimicking the familiar PC file management structure lawyers are so accustomed to, as well as a high-level readout of the file.<br>
<img class="img-responsive" src="./search.png"><br>
</p>
<p class="subhead">
<b>Usability improvements</b>
</p><p>The old web platform hindered usability with its text-based presentation, small font sizes, and non-standard and unobvious affordances:<br>
<img class="img-responsive" src="./old.gif"><br>
The new experience:<br>
<img class="img-responsive" src="./new.gif"><br>

</p>
</div>
<h2 class="section_hed">Implementation & Outcome</h2>
<div class="type_test" id="description_text">
	<p>
	Once the new flows were finalized, I built each page using HTML, Tailwind CSS, and JavaScript, and worked with the engineer to connect them to the backend. We even managed to launch early, despite the deadline suddenly moving up to accommodate a major speaking engagement and demoing opportunity. The new version is now being used for sales efforts.
</p>
</div>
<!-- end text and image -->
