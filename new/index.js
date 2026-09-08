let projects
let allTags
let mobile
const cardTransitionMs = 650
const cardCollapseMs = 325
const cardCollapseOverlapMs = 200

function getDocumentTop(element) {
    return element.getBoundingClientRect().top + window.scrollY
}

function smoothScrollTo(top, duration = cardTransitionMs) {
    return new Promise(resolve => {
        const start = window.scrollY
        const distance = top - start
        const startTime = performance.now()
        const easeInOutCubic = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

        function step(now) {
            const elapsed = Math.min((now - startTime) / duration, 1)
            window.scrollTo(0, start + distance * easeInOutCubic(elapsed))
            if (elapsed < 1) {
                requestAnimationFrame(step)
            } else {
                resolve()
            }
        }

        requestAnimationFrame(step)
    })
}

function isFilterCollapsed() {
    return document.getElementById('filter-minMax-icon').classList.contains('chevron-right-icon')
}

function getFilterCollapsedHeight() {
    const filter = document.getElementById('filters')
    const rect = filter.getBoundingClientRect()
    return Math.round(rect.height) + 'px'
}

function getFilterExpandedHeight() {
    return document.getElementById('filter-inputs').offsetHeight + document.getElementById('filter-minMax').offsetHeight + 'px'
}

function expandFilterMenu() {
    const filter = document.getElementById('filters')
    const inputs = document.getElementById('filter-inputs')

    filter.style.height = getFilterCollapsedHeight()
    inputs.style.display = 'block'
    filter.offsetHeight
    filter.style.height = getFilterExpandedHeight()
}

function syncCollapsedCardsWithFilter() {
    const height = isFilterCollapsed() ? getFilterCollapsedHeight() : getFilterExpandedHeight()
    document.querySelectorAll('.collapsed').forEach(card => {
        card.style.display = ''
        card.style.height = height
        card.style.minHeight = height
        card.style.maxHeight = height
        card.style.paddingTop = ''
        card.style.paddingBottom = ''
        card.classList.toggle('collapsed-min', isFilterCollapsed())
    })
}

function resetCollapsedContent(card) {
    const linkOut = card.querySelector('.link_out')
    const readMore = card.querySelector('.readMore')

    if(linkOut) linkOut.style.display = "none"
    if(readMore) readMore.innerHTML = "Read More <i class='material-icons'>open_in_full</i>"
}

function restoreCollapsedCard(card, animate = false, targetTop = 0) {
    if(!animate) {
        resetCollapsedContent(card)
        card.removeAttribute('style')
        card.className = 'project-card displayed no-transition'
        requestAnimationFrame(() => card.classList.remove('no-transition'))
        return
    }

    const expandedRect = card.getBoundingClientRect()
    const expandedStyle = window.getComputedStyle(card)
    const overlay = card.cloneNode(true)

    resetCollapsedContent(card)

    overlay.removeAttribute('id')
    overlay.className = 'project-card expanded no-transition'
    overlay.style.position = 'fixed'
    overlay.style.top = expandedRect.top + 'px'
    overlay.style.left = expandedRect.left + 'px'
    overlay.style.width = expandedRect.width + 'px'
    overlay.style.height = expandedRect.height + 'px'
    overlay.style.margin = '0'
    overlay.style.padding = expandedStyle.padding
    overlay.style.overflow = 'hidden'
    overlay.style.boxSizing = 'border-box'
    overlay.style.pointerEvents = 'none'
    overlay.style.zIndex = '1000'
    document.body.appendChild(overlay)

    card.removeAttribute('style')
    card.className = 'project-card displayed no-transition'
    card.style.visibility = 'hidden'

    const collapsedRect = card.getBoundingClientRect()
    const collapsedStyle = window.getComputedStyle(card)
    overlay.offsetHeight
    overlay.classList.remove('no-transition')
    overlay.style.transition = 'top ' + cardCollapseMs + 'ms ease, left ' + cardCollapseMs + 'ms ease, width ' + cardCollapseMs + 'ms ease, height ' + cardCollapseMs + 'ms ease, padding ' + cardCollapseMs + 'ms ease'

    requestAnimationFrame(() => {
        overlay.style.top = targetTop + 'px'
        overlay.style.left = collapsedRect.left + 'px'
        overlay.style.width = collapsedRect.width + 'px'
        overlay.style.height = collapsedRect.height + 'px'
        overlay.style.padding = collapsedStyle.padding
    })

    setTimeout(() => {
        overlay.remove()
        card.removeAttribute('style')
        card.className = 'project-card displayed no-transition'
        requestAnimationFrame(() => card.classList.remove('no-transition'))
    }, cardCollapseMs)
}

function collapseExpandedCard(card, scrollTop, waitForScroll = true) {
    if(!waitForScroll) {
        restoreCollapsedCard(card)
        return
    }

    smoothScrollTo(scrollTop, cardTransitionMs)
    setTimeout(() => restoreCollapsedCard(card, true, 0), Math.max(cardTransitionMs - cardCollapseOverlapMs, 0))
}

function setExpandedCardWidth(card) {
    if(!card) return

    if(window.innerWidth <= 681) {
        card.style.width = ''
        return
    }

    const referenceCard = document.querySelector('.project-card.displayed')
    if(!referenceCard) return

    const referenceWidth = referenceCard.getBoundingClientRect().width
    const referenceMarginRight = parseFloat(window.getComputedStyle(referenceCard).marginRight) || 0
    card.style.width = (referenceWidth * 2 + referenceMarginRight) + 'px'
}
// const projectsByTags;
async function loadData() {
    projects = await d3.json('./new/projects.json');
    for (const project of projects) {
        if(project.documentation){
            let rawHTML = await d3.text(project.documentation)
            let splitHTML = rawHTML.split('\n')
            let startIndex = ''
            //splitHTML.indexOf('    \t<!-- text and image -->') < 0 ? splitHTML.indexOf('<!-- text and image -->') : splitHTML.indexOf('    \t<!-- text and image -->')
            if(splitHTML.indexOf('    \t<!-- text and image -->') > 0){
                startIndex = splitHTML.indexOf('    \t<!-- text and image -->')
            } else if (splitHTML.indexOf('<!-- text and image -->') > 0){
                startIndex = splitHTML.indexOf('<!-- text and image -->')
            }else if (splitHTML.indexOf("<?php require('../../nav.inc'); ?>") > 0){
                startIndex = splitHTML.indexOf("<?php require('../../nav.inc'); ?>") + 1
            }

            let endIndex = ''
            if(splitHTML.indexOf('<script>') > 0){
                endIndex = splitHTML.indexOf('<script>')
            } else if (splitHTML.indexOf('<!-- end text and image -->') > 0){
                endIndex = splitHTML.indexOf('<!-- end text and image -->')
            }else if (splitHTML.indexOf('</body>') > 0){
                endIndex = splitHTML.indexOf('</body>')
            }
            let newHTMLarray = splitHTML.slice(startIndex, endIndex)
            // newHTMLarray.forEach(line => {
            //     line.split('<').map(attr => { 
            //         if (attr.includes('img-responsive')) {
            //             attr = attr.slice(0, attr.indexOf('"')+1) + project.documentation.replace('index.php', '') + attr.slice(attr.indexOf('"')+1).replace('./', '')
            //         }
            //         return attr
            //     })
            //     return line
            // })

            project.descr_HTML = newHTMLarray.join(' ')

                if(project.descr_HTML.match(/<div/g) && project.descr_HTML.match(/<div/g).length > project.descr_HTML.match(/<\/div/g).length){
                    project.descr_HTML += ('</div>').repeat(project.descr_HTML.match(/<div/g).length - project.descr_HTML.match(/<\/div/g).length)
                }
    
            // if(d.imgs && !d.descr_HTML.includes(d.imgs[0])){
            if(project.imgs){
                // Print spreads get a hairline border via CSS (see .print-page)
                let imgClass = project.medium && project.medium.includes('print') ? 'img-responsive print-page' : 'img-responsive'
                // Portrait images are single pages: tag them on load so CSS can size them to one page-width of a spread
                let onload = project.medium && project.medium.includes('print') ? " onload='if(this.naturalWidth<this.naturalHeight)this.classList.add(\"single-page\")'" : ''
                project.imgs.forEach(file => {
                    project.descr_HTML += "<img src='" + project.documentation.replace('index.php', '') + file + "' class='" + imgClass + "'" + onload + ">"
                })
            }
        
            
            console.log(project.descr_HTML)
        }
    }

    allTags = new Set(projects.reduce((acc,val)=> {return acc.concat(val.tags)}, []))
    // projectsByTags = {}
    
    // tags.forEach(tag => {

    // })
    // let tagged = Array.from(document.querySelectorAll('input[type="checkbox"]')).map(box => box.value)

    displayProjects(allTags)
    if(window.location.href.includes("#")) {document.getElementById(window.location.href.slice(window.location.href.indexOf("#") + 1)).querySelector(".readMore").click()}
}

function displayProjects(tags){
    console.log(projects)
    tags = Array.from(tags).map(tag => tag.replaceAll(' ', '-'))
    // const t = svg.transition()
    // .duration(750);
    if(document.querySelector('.expanded') !== null) document.querySelector('.expanded').style = ''

    let filters = d3.select('#filters')
    let projContainer = d3.select("#projects")
    const t = projContainer.transition()
    .duration(750);
    // .append("div")
    d3.selectAll('.link_out')
        .style('display','none')

    const projUpdate = projContainer.selectAll(".project-card")
        .data(projects.filter(project => project.tags.some(r=>Array.from(tags).includes(r.replaceAll(' ', '-')))))
        // .call(update => update.transition(t))
        .style("right", 0)
        .style("height", "min-content")
        .classed("hidden", false)
        // .attr("class", "project-card")

    const projEnter = projUpdate.enter().append('div')
        // .attr("class", "project-card")
        // .html(d=>cardHTML(d))

    const projExit = projUpdate.exit()
        // .call(exit => exit.transition(t))
        .attr("class", "project-card collapsed")

    // .remove());
    let currentProj = projEnter.merge(projUpdate)
        .attr("class", "project-card displayed")
        .attr("id", d => d.project_title.indexOf("</span>") > 0 ? d.project_title.slice(d.project_title.indexOf("</span>") + 7).replaceAll(/[^a-zA-Z ]/g, "").replaceAll(' ', '-') : d.project_title.replaceAll(/[^a-zA-Z ]/g, "").replaceAll(' ', '-'))
        .html(d=>cardHTML(d))
        .attr("height", "min-content")

        
    currentProj.each(proj => {
        if(proj.documentation && proj.documentation.includes('index.php')){
            let projID = proj.project_title.indexOf("</span>") > 0 ? proj.project_title.slice(proj.project_title.indexOf("</span>") + 7).replaceAll(/[^a-zA-Z ]/g, "").replaceAll(' ', '-') : proj.project_title.replaceAll(/[^a-zA-Z ]/g, "").replaceAll(' ', '-')
            let projDiv = d3.select('#' + projID)
            let newSrc = proj.documentation.replace('index.php', '')
            // Documentation HTML is fetched and injected into the main page, so
            // relative media URLs otherwise resolve against the site root instead
            // of the documentation file's directory.
            projDiv.selectAll('.link_out img, .link_out video, .link_out audio, .link_out source')
            .each(function(d, i) {
                let oldSrc = d3.select(this).attr('src')
                let normalizedSrc = oldSrc ? oldSrc.replace(/^\.\//, '') : ''
                let normalizedBase = newSrc.replace(/^\.\//, '')

                if(oldSrc &&
                    !oldSrc.includes('http') &&
                    !oldSrc.startsWith('/') &&
                    !oldSrc.startsWith('data:') &&
                    !oldSrc.startsWith('blob:') &&
                    !normalizedSrc.startsWith(normalizedBase)){

                    // let imgSrc = oldSrc.split('/')[d3.select(this).attr('src').split('/').length-1]
                    d3.select(this)
                        .attr('src', newSrc + oldSrc.replace(newSrc, '').replace('./', ''));
                    // .attr('src', newSrc + imgSrc.replace('./', ''));
                } 
                // else if(oldSrc.split('/').some(r => newSrc.split('/').includes(r)) && !oldSrc.includes('new_doc') && !oldSrc.includes('http')) {
                //     let imgSrc = oldSrc.split('/')[d3.select(this).attr('src').split('/').length-1]
                //     d3.select(this)
                //     .attr('src', newSrc + imgSrc);
                // } 
            });
        }
    })
    
        // let newProjects = projects.filter(project => project.tags.some(r=>Array.from(tags).includes(r.replaceAll(' ', '-'))))
        // newProjects.forEach(project=>{
        //     let id = project.project_title.replaceAll(/[^a-zA-Z ]/g, "").replaceAll(' ', '-')
        //     let projectCard = document.getElementById(id)
        //     projectCard.classList = "project-card displayed"
        //     projectCard.style.right = 0
        // })
        // projects.filter(function(i) {return this.indexOf(i) < 0;}, newProjects).forEach(project=>{
        //     let id = project.project_title.replaceAll(/[^a-zA-Z ]/g, "").replaceAll(' ', '-')
        //     let projectCard = document.getElementById(id)
        //     projectCard.classList = "project-card collapsed"
        //     projectCard.style.width = ""
        // })
    if(mobile){
        d3.selectAll('.collapsed')
            .classed('hidden', true)
    } else{
        d3.selectAll('.collapsed')
            .style("right", (d, i) => i * 10)
        syncCollapsedCardsWithFilter()

            // .html('')
        filters
            .style("right", d3.select('.collapsed')._groups[0][0] == null ? 0 : parseInt(d3.selectAll('.collapsed:last-of-type').style('right').replace('px', '')) + 10)
    }
    
    d3.selectAll('.tag').on('click', event => {
        let tagged = Array.from(event.target.classList)[1]
        document.querySelectorAll("input[type='checkbox']").forEach(checkbox => {
            if(checkbox.value == tagged){
                checkbox.checked = true
            }else {
                checkbox.checked = false
            }
        })

        displayProjects([tagged])
    })

    // .join("div")
    //     .attr("class", "project-card")
    //     .html(d=>cardHTML(d))
    //     // .on("click", (event, d)=>{
    //     //     window.location = d.link_out
    //     // })
    d3.selectAll('.minMax').on('click', (event) => {
        let targetForExpansion = event.currentTarget.parentElement.classList.contains('expanded') ? false : event.currentTarget.parentElement
        let scrollDelay = 150

        if(document.querySelector('.expanded') !== null){ //if something else is big, make it small
            let prevExpanded = document.querySelector('.expanded')
            let returnTop = parseFloat(prevExpanded.dataset.returnScrollTop)
            if(Number.isNaN(returnTop)) returnTop = getDocumentTop(prevExpanded)
            if(!targetForExpansion){
                collapseExpandedCard(prevExpanded, returnTop)
            } else {
                collapseExpandedCard(prevExpanded, window.scrollY, false)
                scrollDelay = 250
            }
        }
        if(targetForExpansion){ // make target big
            targetForExpansion.dataset.returnScrollTop = getDocumentTop(targetForExpansion)
            targetForExpansion.className = 'project-card expanded'
            targetForExpansion.style.transition = 'width ' + cardTransitionMs + 'ms ease, height ' + cardTransitionMs + 'ms ease, padding ' + cardTransitionMs + 'ms ease'
            targetForExpansion.style.boxSizing = 'border-box'
            setExpandedCardWidth(targetForExpansion)
            
            document.querySelector('.expanded > .link_out').style.display = "block"
            document.querySelector('.expanded > .readMore').innerHTML = "Minimize <i class='material-icons'>close_fullscreen</i>"
            setTimeout(() => {
                smoothScrollTo(getDocumentTop(targetForExpansion), cardTransitionMs)
            }, scrollDelay)
        }


        // if(event.currentTarget.parentElement.classList.contains('expanded')){ // if target is big, make it small
        //     document.querySelector('.expanded > .link_out').style.display = "none"
        //     document.querySelector('.expanded > .readMore').innerHTML = "Read More <i class='material-icons'>open_in_full</i>"
        //     document.querySelector('.expanded').style = ''
        //     document.querySelector('.expanded').className = 'project-card displayed'
        // }
        // else if(document.querySelector('.expanded') == null){ // if nothing is big, just make target big
        //     event.currentTarget.parentElement.className = 'project-card expanded'
        //     // if(window.innerWidth >= 900 && window.innerWidth <= 1400) document.querySelector('.project-card.expanded').style.width = parseFloat(window.getComputedStyle(document.querySelectorAll('.project-card.displayed')[0]).width) * 3 + parseFloat(window.getComputedStyle(document.querySelectorAll('.project-card.displayed')[0]).marginRight) * 2
        //     // if(window.innerWidth >= 600 && window.innerWidth < 900) document.querySelector('.project-card.expanded').style.width = parseFloat(window.getComputedStyle(document.querySelectorAll('.project-card.displayed')[0]).width) * 2 + parseFloat(window.getComputedStyle(document.querySelectorAll('.project-card.displayed')[0]).marginRight)
        //     document.querySelector('.project-card.expanded').style.boxSizing = 'border-box'

        //     if(window.innerWidth >= 900) document.querySelector('.project-card.expanded').style.width = document.querySelectorAll('.project-card.displayed')[0].offsetWidth * 2 + (parseFloat(window.getComputedStyle(document.querySelectorAll('.project-card.displayed')[0]).marginRight))

        //     document.querySelector('.expanded > .link_out').style.display = "block"
        //     document.querySelector('.expanded > .readMore').innerHTML = "Minimize <i class='material-icons'>close_fullscreen</i>"
        // }
        // else if(document.querySelector('.expanded') !== null){ //if something else is big, make it small, then make target big
        //     document.querySelector('.expanded > .link_out').style.display = "none"
        //     document.querySelector('.expanded > .readMore').innerHTML = "Read More <i class='material-icons'>open_in_full</i>"
        //     document.querySelector('.expanded').style = ''
        //     document.querySelector('.expanded').className = 'project-card displayed'
            
        //     event.currentTarget.parentElement.className = 'project-card expanded'
        //     // if(window.innerWidth >= 900 && window.innerWidth <= 1400) document.querySelector('.project-card.expanded').style.width = parseFloat(window.getComputedStyle(document.querySelectorAll('.project-card.displayed')[0]).width) * 3 + parseFloat(window.getComputedStyle(document.querySelectorAll('.project-card.displayed')[0]).marginRight) * 2
        //     document.querySelector('.project-card.expanded').style.boxSizing = 'border-box'

        //     if(window.innerWidth >= 900) document.querySelector('.project-card.expanded').style.width = document.querySelectorAll('.project-card.displayed')[0].offsetWidth * 2 + (parseFloat(window.getComputedStyle(document.querySelectorAll('.project-card.displayed')[0]).marginRight))

        //     // document.querySelector('.project-card.expanded').style.width = '100%'
        //     document.querySelector('.expanded > .link_out').style.display = "block"
        //     document.querySelector('.expanded > .readMore').innerHTML = "Minimize <i class='material-icons'>close_fullscreen</i>"
        // }
        // document.querySelector('.expanded').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})

    })
}

d3.selectAll("input[type='checkbox']").on("change", (event)=>{
    let tag = event.target.value
    console.log(event)
    let tagged = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(box => box.value)
    // if(event.target.checked == true){
    if(tagged.length == 0){
        tagged = allTags
    } 
    displayProjects(tagged)
    // }
})


document.getElementById('filter-minMax').addEventListener('click', event => {
    let caret = document.getElementById('filter-minMax-icon')
    if (caret.classList.contains('expand-less-icon')){
        caret.className = 'material-icons chevron-right-icon'
        caret.innerHTML = 'chevron_right'
        document.getElementById('filter-inputs').style.display = 'none'
        // document.getElementById('filters').style.minHeight = '240px';
        document.getElementById('filters').style.height = '40px';
        syncCollapsedCardsWithFilter()

    }else{
        caret.className = 'material-icons expand-less-icon'
        caret.innerHTML = 'expand_more'
        // document.getElementById('filters').style.minHeight = 'min-content';
        // document.getElementById('filters').style.height = '240px';
        expandFilterMenu()
        syncCollapsedCardsWithFilter()
    }
})


function cardHTML(d){

    let description = '<p>' + d.description_short + '</p>'
    let role = '<p><span class="lead-in">Role </span>' + d.role.join(', ') + '</p>'
    let medium = '<p><span class="lead-in">Medium </span>' + d.medium.join(', ') + '</p>'
    let featured = ''
    if(d.featured_on.length > 0){
        featured += '<p><span class="lead-in">Featured on </span><span class="featured-links">'
        d.featured_on.forEach((site,i) => {
            featured += '<a href="' + site.url + '" target="new">' + site.name + '</a>'
            if(i < d.featured_on.length - 1){
                featured += ', '
            }
        })
        featured += '</p></span>'
    }

    let tags = '<div class="tags">'
    d.tags.forEach(tag => {
        tags += '<div class="tag ' + tag.replaceAll(' ', '-') + '">' + tag + '</div>'
    })
    tags += '</div>'

    let more = ''
    let canExpand = Boolean(d.descr_HTML)
    let minMaxClass = canExpand ? ' minMax' : ''
    let isVideoCover = /\.(mp4|mov|webm)(\?.*)?$/i.test(d.img_src)
    let coverClass = d.medium && d.medium.includes('print') ? 'card-img print-page' : 'card-img'
    let coverMedia = isVideoCover ? '<video src="' + d.img_src + '" class="card-img" autoplay muted loop playsinline preload="metadata"></video>' : '<img src="' + d.img_src + '" class="' + coverClass + '">'
    let coverImg = '<div class="cover-img-container' + minMaxClass + '">' + coverMedia + '</div>'
    let title = '<p class="' + (canExpand ? 'minMax ' : '') + 'card-title">' + d.project_title + '</p>'

    // if(d.descr_HTML && d.descr_HTML.replaceAll(' ', '').length > 0){

    if(d.descr_HTML){
    //     if(d.descr_HTML.replaceAll(' ', '').length > 0){
    //         if(d.descr_HTML.match(/<div/g) && d.descr_HTML.match(/<div/g).length > d.descr_HTML.match(/<\/div/g).length){
    //         d.descr_HTML += ('</div>').repeat(d.descr_HTML.match(/<div/g).length - d.descr_HTML.match(/<\/div/g).length)
    //     }
    // }

    //     // if(d.imgs && !d.descr_HTML.includes(d.imgs[0])){
    //     if(d.imgs){
    //         d.imgs.forEach(file => {
    //             d.descr_HTML += "<img src='" + d.documentation.replace('index.php', '') + file + "' class='img-responsive'>"
    //         })
    //     }
        
        more += '<div class="link_out">' + d.descr_HTML + '</div><div class="minMax readMore lead-in">Read More <i class="material-icons">open_in_full</i></div>'
    }
    if(d.link_out){
        more += '<div class="openProj lead-in"><a href="' + d.link_out + '" target="new">Open Project <i class="material-icons">open_in_new</i></a></div>'

    }

    return (coverImg + title + description + role + medium + featured + tags + more )
}

window.addEventListener("load", (event) => {
    loadData()
    if(window.innerWidth < 600) mobile = true
    if(mobile) document.getElementById('filter-minMax').click()
    d3.select('#filters').style("right", "10px")
})

let resizeFrame
window.addEventListener('resize', () => {
    if(resizeFrame) cancelAnimationFrame(resizeFrame)
    resizeFrame = requestAnimationFrame(() => {
        setExpandedCardWidth(document.querySelector('.project-card.expanded'))
    })
})

let tasksCaptions = ["Similar to your basic task management app, there are three states your task can be in: current, pending, and completed. These states are represented in a 3-column layout which organize the Tasks workspace.", "The 'current task' column details the next step of the highest priority task, what’s already been done, and who did it. In this case, a patient’s biomarkers went out of range yesterday, which triggered a workflow to assure their safety.", "The system provides the next decision to be made, per clinical protocol. In this case, the clinician calls the number provided for the patient's emergency contact. They make contact, so the task engine gives options for the next step.", "Once clinical judgement is applied, the system facilitates the chosen action. In this case, the clinicians decides to follow up on an unanswered, previously sent message to the patient. The task engine suggests an editable message to be sent to the patient, Judy.", "Once all available actions are taken, the still uncompleted task goes into the 'pending tasks' column for a specified period of time. Once it's time to follow up, the task will go back to the 'current task' column. In this case, the clinician will check back in one hour.", "Now that the task is pending, the next highest priority task appears in 'current task'. In this case, it's another biomarker trigger. The clinician sent a message to the patient yesterday, but never received a response.", "Since there's been no sign of the patient for 24 hours, the clinician calls the patient at the number provided by the task engine, per clinical protocol, and is able to reach them. The task engine asks for notes on the interaction, as well as the outcome.", "During the phone call with the patient, the clinician in this case makes an appointment for a future session. Once indicated, the task is then allowed to complete according to clinical protocol.", "The task is then archived in the 'completed tasks' column. This record allows clinicians to refer back to past cases, but also instills a sense of accomplishment (arguably the best part of any task management app).", "That's the gist of Tasks. This flow was was presented to product and subsequently added to a distant future roadmap. These explorations informed later designs, which are still in development."]

var tasksIndex = 0;
// showSlides(tasksIndex);

function plusSlides(n) {
    showSlides(tasksIndex += n);
}

function currentSlide(n) {
    showSlides(tasksIndex = n);
}

function showSlides(n) {
  if (n > tasksCaptions.length-1) {tasksIndex = 0}    
  if (n < 0) {tasksIndex = tasksCaptions.length -1}

  document.getElementById('slide_img').src="./Mindstrong/care/tasks/comps/step" + tasksIndex + ".png"
  document.getElementById('caption').innerHTML = tasksCaptions[tasksIndex]
}
