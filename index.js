let projects
let allTags
// const projectsByTags;

async function loadData() {
    projects = await d3.json('projects.json');
    for (const project of projects) {
        if(project.documentation){
            project.descr_HTML = await d3.text(project.documentation)
        }
    }

    allTags = new Set(projects.reduce((acc,val)=> {return acc.concat(val.tags)}, []))
    // projectsByTags = {}
    
    // tags.forEach(tag => {

    // })
    // let tagged = Array.from(document.querySelectorAll('input[type="checkbox"]')).map(box => box.value)

    displayProjects(allTags)
}

function displayProjects(tags){
    console.log(projects)
    tags = Array.from(tags).map(tag => tag.replaceAll(' ', '-'))
    // const t = svg.transition()
    // .duration(750);

    let filters = d3.select('#filters')
    let projContainer = d3.select("#projects")
    const t = projContainer.transition()
    .duration(750);
    // .append("div")
    const projUpdate = projContainer.selectAll(".project-card")
        .data(projects.filter(project => project.tags.some(r=>Array.from(tags).includes(r.replaceAll(' ', '-')))))
        // .call(update => update.transition(t))
        .style("right", 0)
        // .attr("class", "project-card")


    const projEnter = projUpdate.enter().append('div')
    // .attr("class", "project-card")
    // .html(d=>cardHTML(d))

    const projExit = projUpdate.exit()
        // .call(exit => exit.transition(t))
        .attr("class", "project-card collapsed")

    // .remove());
    projEnter.merge(projUpdate)
        .attr("class", "project-card displayed")
        .html(d=> cardHTML(d))
    
    d3.selectAll('.collapsed')
    .style("right", (d, i) => i * 10)
    .html('')

    filters.style("right", d3.select('.collapsed')._groups[0][0] == null ? 0 : parseInt(d3.selectAll('.collapsed:last-of-type').style('right').replace('px', '')) + 10)
    
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
        if(event.currentTarget.parentElement.classList.contains('expanded')){ // if target is big, make it small
            document.querySelector('.expanded > .link_out').style.display = "none"
            document.querySelector('.expanded > .readMore').innerHTML = "Read More <i class='material-icons'>open_in_full</i>"

            document.querySelector('.expanded').className = 'project-card displayed'
        }
        else if(document.querySelector('.expanded') == null){ // if nothing is big, just make target big
            event.currentTarget.parentElement.className = 'project-card expanded'
            document.querySelector('.expanded > .link_out').style.display = "block"
            document.querySelector('.expanded > .readMore').innerHTML = "Minimize <i class='material-icons'>close_fullscreen</i>"
            
        }
        else if(document.querySelector('.expanded') !== null){ //if something else is big, make it small, then make target big
            document.querySelector('.expanded > .link_out').style.display = "none"
            document.querySelector('.expanded > .readMore').innerHTML = "Read More <i class='material-icons'>open_in_full</i>"
            document.querySelector('.expanded').className = 'project-card displayed'
            event.currentTarget.parentElement.className = 'project-card expanded'
            document.querySelector('.expanded > .link_out').style.display = "block"
            document.querySelector('.expanded > .readMore').innerHTML = "Minimize <i class='material-icons'>close_fullscreen</i>"

        }
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
        caret.classList = 'material-icons expand-more-icon'
        caret.innerHTML = 'expand_more'
        document.getElementById('filter-inputs').style.display = 'none'
        // document.getElementById('filters').style.minHeight = '240px';
        document.getElementById('filters').style.height = '40px';
        document.querySelectorAll('.collapsed').forEach(card => {card.classList.add('collapsed-min')})

    }else{
        caret.classList = 'material-icons expand-less-icon'
        caret.innerHTML = 'expand_less'
        document.getElementById('filter-inputs').style.display = 'block'
        // document.getElementById('filters').style.minHeight = 'min-content';
        document.getElementById('filters').style.height = '240px';
        document.querySelectorAll('.collapsed').forEach(card => {card.classList.remove('collapsed-min')})
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
    let coverImg = ''
    let title = ''

    if(d.descr_HTML){
        more += '<div class="link_out">' + d.descr_HTML + '</div><div class="minMax readMore lead-in">Read More <i class="material-icons">open_in_full</i></div>'
        coverImg = '<img src="' + d.img_src + '" class="card-img minMax">'
        title = '<p class="minMax card-title">' + d.project_title + '</p>'
    }
    if(d.link_out){
        more += '<div class="openProj lead-in"><a href="' + d.link_out + '" target="new">Open Project <i class="material-icons">open_in_new</i></a></div>'
        coverImg = '<a href="' + d.link_out + '" target="new"><img src="' + d.img_src + '" class="card-img"></a>'
        title = '<p class="card-title"><a href="' + d.link_out + '" target="new" class="card-title">' + d.project_title + '</a></p>'
    }

    return (coverImg + title + description + role + medium + featured + tags + more)
}

loadData()
