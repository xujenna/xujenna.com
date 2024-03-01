<script src='dir.php'></script>

<?php require('../../nav.inc'); ?>


<!-- <p><br></p> -->

<img class="img-responsive" style="margin-left:-3%" src="./cover.gif">

<div class="type_test" id="description_text">
<p>When I began working at Mindstrong in September 2019, I helped with the redesign of their electronic medical record (EMR) management web platform and had the pleasure of speaking to all of my patient-facing coworkers to understand their needs and workdays. From their stories, I learned a lot about our users with serious mental illnesses (SMI) and found that I empathized strongly with them because of my own history with depression.</p>
<p>By the end of 2019, I had produced an immoderate number of screens to develop ideas that not only up-leveled the existing Mindstrong UX but also were specifically tailored to the needs of our SMI population. These explorations directly informed the company's 2020 OKR planning, and I subsequently led a redesign and restructuring of Mindstrong's user app in H1.</p>
<p>Illustrations featured in the following screens are (sadly) placeholders from the incredible <a href="http://www.abbeylossing.com/" target="new">Abbey Lossing</a> and <a href="http://www.chrisdelorenzo.com/" target="new">Christopher Lorenzo</a>.</p>
</div>

<h2 class="section_hed">Background</h2>
<div class="type_test" id="description_text">

	<p>When thinking about redesigning an app used by an SMI population, I ultimately wanted to know: </p>
	<div class="inset_emphasis">
	<h3>What are their short- and long- term needs, and how can Mindstrong help meet those needs?</h3>
	</div>
	<p>Why the distinction between long and short term? Our users commonly turn to Mindstrong in moments of crisis, but our highly trained therapists are ultimately playing a long game: building up resilience in our users. Based on insights from Mindstrong's clinicians, member-support specialists and initial user research as well as and my own personal experience with depression, my operating hypotheses were:</p>

	<div class="inset_emphasis">
		<h3>When people with SMI seek help, it’s driven by the awareness that they struggle with daily functioning.</h3>
		<p>The Mindstrong app can help with these short-term needs by offering its users:
		<ul>
			<li>Interventions, urgent therapy sessions, and general 24/7 availability</li>
			<li>Psychiatry for medication adjustments or new prescriptions</li>
			<li>Coordination and/or collaboration with their existing care team</li>
		</ul>
		</p>
	</div>

	<div class="inset_emphasis">
		<h3>When people with SMI think about recovery, the goal is simply toward a former/“lost” level of functioning.</h3>
		<p>The Mindstrong app can manage these long term needs by offering:
		<ul>
			<li>A sense of support, self-worth, and security through regular therapy sessions</li>
			<li>Hope for the future through goal building and response plans</li>
			<li>A sense of progress through symptom tracking, coursework, and working with a therapist</li>
			<li>Psychoeducation/skills building</li>
		</ul>
		</p>
	</div>

	<p>In other words, our users' top priority is not to explore their data in a fussy, research-oriented app; they primarily need help managing their SMI. Mindstrong offloads some of this burden by providing care and/or coordinating it with existing providers, but a person's life can improve only if they put in the work themselves.</p>

	<p>The problem is, sometimes day-to-day survival is difficult enough for our SMI population, so the app would have to do most of the heavy lifting for them. The <b>dynamic homescreen module</b> was conceptualized as a guided, forthright, and dead-simple way to facilitate that work.</p>
</div>

<h2 class="section_hed">The Dynamic Homescreen Module</h2>
<img class="img-responsive" src="./vn/homescreen_modules/persistent_ranked.png">
<div class="type_test" id="description_text">
<p>I had initially envisioned the entire homescreen as a dynamic module with dynamic navigation; rather than expecting the user to know what, when, and how to do a certain task, the app would simply anticipate their needs or remind them to perform a task before its deadline for a fully guided, on-the-rails experience. No badges, no banners, no "inboxes", and fewer notifications.</p>
<p>For example, a module might request an emergency contact shortly after intake and begin the flow right there and then:</p>
	<img class="img-responsive inline_screens" src="./v1/emergency_contact/emergency_contact1.png">
	<span class="inline_screen_arrows">→</span>
	<img class="img-responsive inline_screens" src="./v1/emergency_contact/emergency_contact2.png">
<p>The spoon-fed approach to dynamic modules quickly became a business concern as it was being built out. What if a user simply ignored the presented task? Would we timebox the module? How long would we display it before moving on to the next module? The framework was a great platform to quickly iterate and test on, but how would we prioritize and timbox a potentially endless number of modules? There would need to be more than one.</p>

<p>Stress tested, the core principles of the dynamic homescreen module became:</p>
<ul>
	<li><b>Practicality</b>: Modules break a user's journey into actionable, discrete steps that coordinate business, clinical, and user needs, all of which are planned and managed by Mindstrong, its clinicians, and/or its back end</li>
	<li><b>Prioritization</b>: Modules rank these tasks so that the user is able to not only fulfill requirements, meet deadlines, and make progress, but do so effortlessly</li>
	<li><b>Dynamism</b>: Modules add and remove themselves based on where the user is in their clinical, personal, and Mindstrong journey</li>
	<li><b>Scarcity</b>: Modules are presented as a limited and varied selection, in order to ensure focus and avoid overwhelming members (a slippery slope to demoralization)</li>
	<li><b>Patience</b>: Modules do not insist, merely suggest. Modules are not essential to the user and do not address urgent needs, which are primarily what they turn to Mindstrong for and are prominently available in the app’s simplified navigation.</li>
	<li><b>Affability</b>: Modules help to relieve clinicians of administration burdens, but should still be imbued with their warmth and serve as friendly reminders in a familiar tone. </li>
</ul>
<p>Below, the categories of modules we socialized to the team:</p>
<p><b>Welcome modules:</b> Shown after onboarding, intended to supplement or facilitate intake.</p>
	<img class="img-responsive inline_screens" src="./vn/homescreen_modules/welcome_intro.png">
	<img class="img-responsive inline_screens" src="./vn/homescreen_modules/welcome_team.png">
	<img class="img-responsive inline_screens" src="./vn/homescreen_modules/welcome_survey.png">
<p><b>Therapy session modules:</b> Intended to keep a patient in regular sessions with their assigned therapist.</p>
	<img class="img-responsive inline_screens" src="./vn/homescreen_modules/session_schedule.png">
	<img class="img-responsive inline_screens" src="./vn/homescreen_modules/session_future.png">
	<img class="img-responsive inline_screens" src="./vn/homescreen_modules/session_now.png">
<p><b>Psychiatry session modules:</b> Intended to help manage a patient's medications, if they opt in to Mindstrong's psychiatric services.</p>
	<img class="img-responsive inline_screens" src="./vn/homescreen_modules/psychiatry_renewal.png">
	<img class="img-responsive inline_screens" src="./vn/homescreen_modules/psychiatry_adjustment.png">
<p><b>Biomarker modules:</b> Intended to facilitate clinical biomarker protocols.</p>
	<img class="img-responsive inline_screens" src="./vn/homescreen_modules/biomarker_daily.png">
	<img class="img-responsive inline_screens" src="./vn/homescreen_modules/biomarker_mid.png">
	<img class="img-responsive inline_screens" src="./vn/homescreen_modules/biomarker_high.png">
<p><b>Survey, administrative, and homework modules:</b> Intended to manage the work needed for therapy.</p>
	<img class="img-responsive inline_screens" src="./vn/homescreen_modules/misc_surveys.png">
	<img class="img-responsive inline_screens" src="./vn/homescreen_modules/misc_administrative.png">
	<img class="img-responsive inline_screens" src="./vn/homescreen_modules/misc_homework.png">
	
</div>

<h2 class="section_hed">Simplicity First</h2>
<img class="img-responsive" src="./future_map.jpg">
<div class="type_test" id="description_text">
<!-- <p>With the user's work managed and delivered in digestible pieces at the appropriate times, the navigation was also able to play a more targeted role in the app. -->
	<p>With the dynamic homescreen module playing a management role for clinicians, users, and Mindstrong, the navigation was able to play a much more targeted role. Two buttons—"View my progress" and "Get help now"—encompassed the core of why users would open the Mindstrong app at all (ie, their long- and short-term needs, respectively).</p>

	<div class="inset_emphasis">
		<p><b>"View my progress"</b> was, and still is, completely aspirational: an amalgamation of the hopes and dreams of clinicians, users, and Mindstrong alike. For clinicians, it could be a digital workbook that facilitates the work they give their patients. For Mindstrong, it could be a modular guide that helps standardize treatment across dozens of clinicians, as well as a repository for the data it collects. For the users, it could be a toolbox for their long-term goals and an accessible version of a clinician's chart, from which they could get a sense of their progress.</p> 
	</div>
	<img class="img-responsive inline_screens" src="./vn/progress/Toolbox.png">
	<img class="img-responsive inline_screens" src="./vn/progress/Toolbox_Course.png">
	<img class="img-responsive inline_screens" src="./vn/progress/Toolbox_Skills.png">

	<img class="img-responsive inline_screens" src="./vn/progress/Toolbox_Goals.png">
	<img class="img-responsive inline_screens" src="./vn/progress/session_history.png">
	<img class="img-responsive inline_screens" src="./vn/progress/session_history2.png">

	<img class="img-responsive inline_screens" src="./vn/progress/MS_scores.png">
	<img class="img-responsive inline_screens" src="./vn/progress/Surveys.png">

	<div class="inset_emphasis">
		<p><b>"Get help now"</b> is an aspirational triaging mechanism. Mindstrong clinicians often get urgent session requests for decidedly nonurgent reasons; this flow is designed to get users the help they need while reducing clinical burden.</p> 
	</div>

	<img class="img-responsive inline_screens" src="./vn/help/triage1.png">
	<span class="inline_screen_arrows">→</span>
	<img class="img-responsive inline_screens" src="./vn/help/triage2.png">
	<span class="inline_screen_arrows">→</span>
	<img class="img-responsive inline_screens" src="./vn/help/triage3.png">
	<span class="inline_screen_arrows">→</span>
	<img class="img-responsive inline_screens" src="./vn/help/triage4.png">
	<span class="inline_screen_arrows">→</span>
	<img class="img-responsive inline_screens" src="./vn/help/triage5.png">
	<span class="inline_screen_arrows">→</span>
	<img class="img-responsive inline_screens" src="./vn/help/triage6.png">
	<span class="inline_screen_arrows">→</span>
	<img class="img-responsive inline_screens" src="./vn/help/triage7.png">
	<span class="inline_screen_arrows">→</span>
	<img class="img-responsive inline_screens" src="./vn/help/triage8.png">
	<span class="inline_screen_arrows">→</span>
	<img class="img-responsive inline_screens" src="./vn/help/triage9.png">
	
	<p>While interviewing clinicians for this feature, I realized that "Get help now" could also incorporate the clinical protocols (both formal and informal) that they have established for emergencies. By automating the rote questioning necessary before any action can be taken, wait times for the next available therapist can be maximized effectively.</p>
	<img class="img-responsive" src="./vn/help/map.png">
	<p>These explorations were presented as northstar vision and influenced product planning for 2020.</p>
</div>

<!-- <h3 class="section_hed">Visual Explorations</h3>
<div class="type_test" id="description_text">
	<p>Illustrations are (sadly) placeholder and by the incredible <a href="http://www.abbeylossing.com/" target="new">Abbey Lossing</a> and <a href="http://www.chrisdelorenzo.com/" target="new">Christopher Lorenzo</a>.</p>
</div> -->

<script>

// for (i=0; i<pngs.length; i++) {
// 	$('#img-container').append("<p><img class='img-responsive' src='" + pngs[i] + ".png'> </p>");
// }

// for (i=0; i<jpgs.length; i++) {
// 	$('#img-container').append("<p><img class='img-responsive' src='" + jpgs[i] + ".jpg'> </p>");

// }


</script>




</div>

<!-- end text and image -->

   </div>
  </div>
</div>
</body>