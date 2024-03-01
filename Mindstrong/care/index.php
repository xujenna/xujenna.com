<!-- <script src='dir.php'></script> -->

<?php require('../../nav.inc'); ?>


<!-- <p><br></p> -->

<!-- <img class="img-responsive" style="margin-left:-30px" src="./cover.gif"> -->

<div id="description_text">
<p>During my first few months at Mindstrong in 2019, I worked with the Head of Design to redesign and develop new features for Care, an electronic medical record (EMR) management web platform for our in-house clinicians. A selection of my favorites follow.</p>
</div>

<h2 class="section_hed">Timeline</h2>
<div id="description_text">
	<p>"Timeline" was one of my first projects, and an invaluable learning experience; I was able to perform ongoing interviews with my clients and sanity-check multiple iterations. But my coworkers taught me the most valuable lesson of all: to check my assumptions.

	<div class="inset_emphasis">
		<p><b>Problem:</b></p>
		<p>Mindstrong was in growth mode, which meant our in-house clinicians were burdened with increasingly large caseloads. The more patients a clinician had, the less time they had to take notes after sessions, and read notes before sessions. Because these notes were the only recourse for keeping up with a patient, clinicians struggled to maintain the human connection so crucial to therapy.
		</p>
		<p>Not only did the existing platform burden clinical work, but there was pressure to refrain from relying on the EMR, so most clinicians maintained their own spreadsheets to keep track of the important human details their patients shared during sessions.</p>
	</div>
	<img class="img-responsive" src="./timeline/clinician_spreadsheet.png">

	<div class="inset_emphasis">
		<p><b>Opportunity:</b></p>
		<h3>The platform could facilitate a continuity of care by providing clinicians with a pre-session, quick but comprehensive snapshot of a patient's progress that included both standard EMR data as well as anything they thought important to follow up on.</h3>
	</div>
		<p>The snapshot would be illustrated by a plethora of indicators that clinicians monitored, including:</p>
		<ul>
			<li>Clinician entry
				<ul class="sub_bullets">
					<li>life events and stressors</li>
					<li>clinical scores</li>
					<li>updates to profile</li>
				</ul>
			</li>
			<li>System emtry
				<ul class="sub_bullets">
					<li>elevated biomarker alerts</li>
					<li>session entries/summaries</li>
					<li>any new documents</li>
					<li>requested sessions</li>
				</ul>
			</li>
			<li>External data
				<ul class="sub_bullets">
					<li>insurance</li>
					<li>third-party data</li>
				</ul>
			</li>
		</ul>
		<p>Biomarkers would be the focal point, as Mindstrong was actively validating them and needed buy-in from their clinicians. As such, I thought this was a simple data viz problem, and got straight to work.</p>
		<img class="img-responsive" src="./timeline/comps/timeline1.png">
		<p>
			The hope was that biomarkers would indicate the "cause", and concurrent events would be the "effect", so I thought it would be helpful to show the events as points on the biomarker graph. Because were was so many variables, I also included a filtering mechanism for when clinicians were looking for specific trends over a specific duration.
		</p>
		<p>
			Based on initial feedback, I realized that line graphs weren't particularly easy to read, and weren't very scalable to boot. Perhaps a heat map make a better snapshot. You could quickly see where the (alleged) problem days where, and hover over to see the details! I love data viz!
		</p>
		<img class="img-responsive" src="./timeline/comps/timeline2.png">
		<p>
			Turns out, clinicians were much less interested in the biomarkers or data than I was. Perhaps if they had more time, they'd play around with the the different charts and dig around in the data. But for a pre-session memory jog, the visualizations would be overwhelming, and they didn't want to click through to see details. They wanted the recent events in front of their faces. It was way more important to see whether a patient expressed suicidal intent than to see their biomarker level. 
		</p>
		<p>
			One clinician mentioned liking macOS's Time Machine software, where you could scrub through to see records from the past. So I went back to the drawing board with this:
		</p>
		<img class="img-responsive" src="./timeline/comps/timeline3.png">
		<p>
			It was what the clinician asked for, and my boss's boss was super excited about it, but I still thought it was too much work for the clinician. Then I realized: if clinicians wanted to scroll through a patient's history in order to get a sense of their progress—well, a computer could do that for them. The back end could facilitate much of the clinical analysis and provide a high-level snapshot on user metrics. Clinicians shouldn't be expected to perform human calculus during their 10 minute breaks between sessions.
		</p>
		<p>So yeah, that's how "Dashboard" was born.</p>
		<img class="img-responsive" src="./timeline/comps/timeline5.png">
		<p>The cool thing about outsourcing analytical work to a computer is that suddenly, your scope is way wider; introducing ✨Insights✨, your data science assistant. In the above example, it warns the clinician that, during the time frame they selected, their patient was at a 6% higher risk for suicide than normal, but 8% lower than the general Mindstrong population.</p>
		<p>There was a lot of excitement around this idea: clinicians wanted a dashboard for their entire panel (ie, aggregated stats for all their patients); product saw this as a way to maximize engagement efforts. While these ideas were beyond the capabilities of the platform's engineering resources at the time, they're still informing its development to this day.</p>

	</div>

	<h2 class="section_hed">Tasks</h2>
	<div id="description_text">
		<p>Being a big advocate of outsourcing low-level work to computers, I was excited to explore the idea of a task engine for Care.</p>
		<p>Between regular therapy sessions, clinicians were expected to monitor all 60+ patients in their caseload for certain events (biomarkers, hospitalizations, disengagement, etc) and respond in accordance to elaborate protocols.</p>
		<img class="img-responsive" src="./old_care.png">
		<div class="inset_emphasis">
			<p><b>Problem:</b></p>
			<p>The existing Care platform was built for multiple stakeholders (member support, psychiatrists, clinicians, etc), and clinicians especially needed to dig around for the information they needed, for every patient they had. Its passivity meant that clinicians monitored with the help of their own spreadsheets.</p>
			<p>Clinical protocols for such events were documented in yet more Google Docs.</p>
		</div>
		<img class="img-responsive" src="./tasks/protocol/protocol_animation.gif">
		<p>Clinical protocols were complex but resembled decision trees, which could be easily automated—especially considering that many of the triggers (biomarker alerts, drop offs in engagement, hospitalizations) were coming from the back end.</p>
		<div class="inset_emphasis">
			<p><b>Opportunity:</b></p>
			<h3>Automating the protocols with a task engine could free clinicians from the administrative burden of managing the progress of a large and ever shifting panel size, thereby allowing them to focus their energy on delivering high quality care.</h3>
		</div>
		<p>After interviewing many clinicians about their workflow and protocols, and product for business needs, I designed the following flow that demonstrates how a task engine might help facilitate our overburdened clinicians, removing the need to manage external spreadsheets, memorize or refer to protocols, or search a patient's EMR for information required to follow such protocols.</p>

	</div>

	<div class="slideshow-container">
		<a class="prev" onclick="plusSlides(-1)">Prev</a> / 
		<a class= "next" onclick="plusSlides(1)">Next</a>
		<p id="caption">Similar to your basic task management app, there are three states your task can be in: current, pending, and completed. These states are represented in a 3-column layout which organize the Tasks workspace.</p>
		<img id="slide_img" src="./tasks/comps/step0.png">
	</div>

</div>

<script>
var captions = ["Similar to your basic task management app, there are three states your task can be in: current, pending, and completed. These states are represented in a 3-column layout which organize the Tasks workspace.", "The 'current task' column details the next step of the highest priority task, what’s already been done, and who did it. In this case, a patient’s biomarkers went out of range yesterday, which triggered a workflow to assure their safety.", "The system provides the next decision to be made, per clinical protocol. In this case, the clinician calls the number provided for the patient's emergency contact. They make contact, so the task engine gives options for the next step.", "Once clinical judgement is applied, the system facilitates the chosen action. In this case, the clinicians decides to follow up on an unanswered, previously sent message to the patient. The task engine suggests an editable message to be sent to the patient, Judy.", "Once all available actions are taken, the still uncompleted task goes into the 'pending tasks' column for a specified period of time. Once it's time to follow up, the task will go back to the 'current task' column. In this case, the clinician will check back in one hour.", "Now that the task is pending, the next highest priority task appears in 'current task'. In this case, it's another biomarker trigger. The clinician sent a message to the patient yesterday, but never received a response.", "Since there's been no sign of the patient for 24 hours, the clinician calls the patient at the number provided by the task engine, per clinical protocol, and is able to reach them. The task engine asks for notes on the interaction, as well as the outcome.", "During the phone call with the patient, the clinician in this case makes an appointment for a future session. Once indicated, the task is then allowed to complete according to clinical protocol.", "The task is then archived in the 'completed tasks' column. This record allows clinicians to refer back to past cases, but also instills a sense of accomplishment (arguably the best part of any task management app).", "That's the gist of Tasks. This flow was was presented to product and subsequently added to a distant future roadmap. These explorations informed later designs, which are still in development."]

var slideIndex = 0;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  if (n > captions.length-1) {slideIndex = 0}    
  if (n < 0) {slideIndex = captions.length -1}

  document.getElementById('slide_img').src="./tasks/comps/step" + slideIndex + ".png"
  document.getElementById('caption').innerHTML = captions[slideIndex]
}

</script>




</div>

<!-- end text and image -->

   </div>
  </div>
</div>
</body>