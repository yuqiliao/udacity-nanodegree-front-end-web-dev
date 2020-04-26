/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

// create sectionList object
const sections= document.querySelectorAll("section");

let sectionIDs = []
let sectionDataNavs = [];
for (section of sections){
    const sectionID = section.getAttribute("id")
    const sectionDataNav = section.getAttribute("data-nav");
    
    sectionIDs.push(sectionID);
    sectionDataNavs.push(sectionDataNav);
}


let sectionList = {};
sectionIDs.forEach((key, i) => sectionList[key] = sectionDataNavs[i]);

// get navbar__list id
const navbarList = document.getElementById("navbar__list");

// get header tag
const headerTag = document.querySelector("header");

// // get .navbar__link
// const navbarLinksList = document.getElementsByClassName("navbar__link");
// //const navbarLinksList = document.querySelectorAll(".navbar__link"); //this won't work because https://stackoverflow.com/questions/18735188/queryselectorall-not-working



/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav + add href links 
function createUL(sectionID){
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.textContent = sectionList[sectionID];
    a.setAttribute("href", "#"+sectionID);
    a.setAttribute("class", "navbar__link");
    navbarList.appendChild(li).appendChild(a);
}

function createHeaderList(){
    //for header
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.textContent = "Home";
    a.setAttribute("href", "#");
    a.setAttribute("class", "navbar__link");
    navbarList.appendChild(li).appendChild(a);

    //for sections (dynamically)
    sectionIDs.forEach(createUL)
}



// Add class 'active' to the section that is cloest to the top of viewport

function addActiveClass() {
    //for each section, what's the absolute distance between the section to the top?
    const distanceToTopArray = []
    sections.forEach((section) => {
        const distanceToTop = section.getBoundingClientRect().top;
        distanceToTopArray.push(Math.abs(distanceToTop));
    });
    
    // get the smallest distance
    const closest = Math.min(...distanceToTopArray);

    // add the "active" class to the section that is the closest; remove it when it's not
    sections.forEach((section) => {
        const distanceToTop = section.getBoundingClientRect().top;
        if (Math.abs(distanceToTop) === closest){
            section.classList.add("active");
        } else {
            section.classList.remove("active");
        }
    });

    // Bonus: make header's opacity 0.7 when scolling down
    if(window.scrollY > 0){
        headerTag.setAttribute("style","opacity:0.7; transition: all 1s");
    } else {
        headerTag.setAttribute("style","opacity:1; transition: all 1s");
    }

}


// Scroll to anchor ID using scrollTO event
function scrollToSection(element){

    //prevent default jumping
    element.preventDefault();

    //get the target element's destination href
    const destinationHref = element.target.href;
    // parse destinationHref to get the section id
    if(destinationHref !== undefined){
        const secetionIDsNew = destinationHref.split("/").slice(-1);
        // console.log(secetionIDsNew);
        // console.log((secetionIDsNew[0] === "#"));
        //get the destination element's offsetTop
        if(secetionIDsNew[0] === "#") {
            var destinationElementOffsetTop = 0;
        } else {
            var destinationElementOffsetTop = document.querySelector(secetionIDsNew).offsetTop;
        }   
    }

    // define scrollOptions
    const scrollOptions = {
        left: 0,
        top: destinationElementOffsetTop,
        behavior: 'smooth'
    }

    // scroll to that point
    window.scrollTo(scrollOptions);
    
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
createHeaderList();

// Set sections as active
document.addEventListener('scroll', addActiveClass);

// Scroll to section on link click
navbarList.addEventListener('click', scrollToSection);


