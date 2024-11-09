<!-- text and image -->
<p>
FirstThen’s founders came to me with an ambitious vision: to democratize ADHD care with scalable, self-guided, evidence-based digital tools that could address widespread challenges of access, fragmentation, and lifelong care management and adherence. Having created an elaborate evidence-based framework borne from research and user interviews, the founders now needed an MVP to secure early validation, generate user interest, and prove their concept’s effectiveness in real-world settings.
</p>
<p>
I was brought on to reduce a lofty vision into a testable MVP that would quickly validate FirstThen’s core product hypothesis.
</p>
<h2 class="section_hed">Process</h2>
<div class="type_test" id="description_text">
<p class="subhead">
<b>User Research Synthesis</b>
</p><p>
The founders provided notes from customer discovery interviews with families; I synthesized the data to distill key insights, including:<ul>
	<li>
	Parents were utterly overwhelmed with expensive options and needed help choosing and managing care for their children (and themselves).
	</li>
	<li>
	Families faced high emotional and financial stress, with fragmented, inconsistent care making it hard to establish effective routines.
	</li>
	<li>
	Parents struggled to implement clinician-recommended strategies by themselves at home and needed support between sessions.
	</li>
</ul>
</p>
<p class="subhead">
<b>Product definition</b>
</p><p>Armed with these insights, I guided the founders through several scoping and refining exercises to turn their lofty vision into an MVP, including user experience mapping, user journey mapping, personas, product matrices, roadmapping, among others:
<img class="img-responsive" src="./1 User Journey Map.png"><br>
<img class="img-responsive" src="./2 ADVISOR MEETING_User Journey Map.jpg"><br>
<img class="img-responsive" src="./3 Screen Shot 2022-09-14 at 9.50.36 AM.png"><br>
</p>
<p class="subhead">
<b>Wireframing</b>
</p><p>We landed on two core functionalities that would allow us to adequately test the founding hypotheses that a mobile app could address ADHD families' pain points: digital intervention (morning routine tool) and psychoeducation. I translated this minimally viable feature set into wireframes:
</p>
<p class="subhead">
<b>Iterative Feedback & Refinement</b>
</p><p>We met regularly with FirstThen’s clinical advisors to ensure designs were informed by clinical experience and aligned with best practices. Their feedback fed rounds of iteration, refining features for usability, flexibility, and engagement.
<img class="img-responsive" src="./4 ADVISOR MEETING_V1 Prototype Wireframes.jpg"><br>
</p>
</div>
<h2 class="section_hed">V1 MVP Design</h2>
<div class="type_test" id="description_text">
<p class="subhead">
<b>Morning Routine</b>
</p><p>
Morning routines are a foundational and early ADHD intervention, normally done with paper, magnets, or other physical mediums. ADHD can make completing tasks and time management particularly challenging, and a morning routine provides structure that not only reduces stress, but gets everyone out the door on time.</p>
<p>
	Clinicians recommend keeping track of time spent on each routine task, which helps set expectations and build efficiency and consistency. We designed the time goals to be flexible and realistic, aiming to support gradual improvement rather than setting overly rigid expectations. The initial approach involved establishing a baseline by timing how long a child naturally took to complete each step of a routine. From this baseline, the UI calculates a 25% reduction over time, which parents can adjust as needed to keep it achievable and motivating for their child.
</p>
<p>
Our tool enabled parents to customize their child's morning routine with clear steps, illustrations, and built-in timers to track progress. GIF rewards celebrated task completion, providing positive reinforcement to motivate children to complete their routine.</p>
</p>
<p class="subhead">
<b>Psychoeducation Modules</b>
</p><p>Developed in collaboration with clinical experts, these modules were designed to be easily digestible during busy days, and offered practical ADHD management education in short, actionable formats. Visual and audio options accommodated different learning styles in parents—likely to have ADHD themselves!<br>
</p>
<img class="img-responsive" src="./5 firstThen_demo.gif"><br>
</div>
<h2 class="section_hed">Implementation, Testing, and Iteration</h2>
<div class="type_test" id="description_text">
	<p>
	Once the flows were finalized, I built the interactive prototype as a Firebase web app (HTMl, CSS, Javascript, NodeJS) that users could download onto their devices, which was crucial for in-home testing.
	</p>
	<p>
	We conducted a two-week Beta Test with 10 families using our prototype at home, gathering feedback through interviews, surveys, usage data, and direct observations. Main insights and resulting refinements included:
	<ul>
		<li>Overall, parents responded positively, particularly appreciating the structured yet engaging and flexible approach. Younger children loved the gif rewards for completing tasks, though parents highlighted the need for greater variety.
			<ul>
				<li><b>V2 improvement:</b> Added many more gifs, as well as illustrations throughout the child-facing experience
				</li>
				<li><b>V2 improvement:</b> Added photos and transcripts to the parent-facing experience
				</li>
			</ul>
		</li>
		<li>As expected, the timers were extremely motivating for the children—unexpectedly, they were sometimes <i>too</i> motivating. Some children felt discouraged—and sometimes very upset!—when they couldn't beat their times every day.
			<ul>
				<li><b>V2 improvement:</b> Added the ability for parents to toggle the visibility of and adjust time goals to better suit their child’s needs for the day.
				</li>
			</ul>
		</li>
		<li>Some parents felt the tool was too basic, and wanted to build more routines for other parts of the day. Most parents were eager to learn and do more.
			<ul>
				<li><b>V2 improvement:</b> Added the ability to create and manage custom routines, allowing parents to apply the same structured approach to any part of their day.
				</li>
				<li><b>V2 improvement:</b> Added several more psychoeducation modules, and an updated home screen to accommodate.
				</li>
			</ul>
		</li>
	</ul>
	</p>
</div>
<h2 class="section_hed">V2 Preview</h2>
<div class="type_test" id="description_text">
<img class="img-responsive" src="./firstThen_demo.gif"><br>
</div>
<!-- end text and image -->
