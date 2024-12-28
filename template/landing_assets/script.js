// add class "chrome" to body if browser is chromium
// since scroll snap has complicated support in non-chromium browsers
if (!!window.chrome) {
    document.body.classList.add('chrome')
}

// set desktop breakpoint to distinguish screen size from mobile
const desktopWidthThreshold = 768;

// boolean is true if screen size exceeds desktop breakpoint
let isDesktop = window.innerWidth >= desktopWidthThreshold;

// set scroll update sensitivity
// aka. when to trigger background picture and nav menu update
// for example, a value of 0.25 means the update is triggered
// when the top of the screen reaches 25% before the section
// and 75% within the section
let scrollUpdateSensitivity;
if (isDesktop && !!window.chrome) {
    // for snap scrolling
    scrollUpdateSensitivity = 0.25
} else {
    // for manual scrolling
    scrollUpdateSensitivity = 0.40
}

// remove the class passed in as argument from all of the querySelectorAll elements
const removeClassFromAll = (queryAll, cssClass) => {
    for (let i=0;i<queryAll.length;i++) {
        queryAll[i].classList.remove(cssClass)
    }
}

// navbar is hidden by default if the browser doesn't support JS
// this removes the hidden class and shows it
document.getElementById('menu').classList.remove('hidden')

const left = document.getElementById('left');
const right = document.getElementById('right');

right.scrollTo(0,0)



// INTRO SHUFFLE ===============================================================
// this handles the "shuffle" feature at the top of the page
// that says what I do

// how frequent should the list change, in milliseconds
const changeInterval = 2250;

// shuffle from this list
const shuffleFrom = [
    "a web developer",
    "a university student",
    "an accountant",
    "an urban planner",
    "a sociable introvert",
    "a night owl",
    "a city biker"
]

const shuffle = document.querySelector('#contentwrapper>section#top p.shuffle');

// current index from "shuffleFrom" that is showing on screen
// defaults to 0 (first one)
let shuffleIndex = 0;

// prefix (a,an) is hidden by default if the browser doesn't support JS
// this adds the active class and shows it
shuffle.querySelector('.prefix').classList.add('active');

// function is executed every interval of changeInterval
const doShuffle = () => {
    // hide the word
    shuffle.querySelector('.spins').classList.remove('active');

    // wait 500ms (hiding animation time)
    setTimeout(()=> {
        // if current index exceeds the list, reset the counter
        if (shuffleIndex >= shuffleFrom.length) shuffleIndex = 0; 

        // prefix defaults to nothing and word defaults to the entire string
        let prefix = ""
        let word = shuffleFrom[shuffleIndex]

        // if there is more than one word in the string, take the first word
        // to be prefix and the rest be the word
        if (shuffleFrom[shuffleIndex].split(" ").length > 1) {
            prefix = shuffleFrom[shuffleIndex].split(" ")[0]
            word = shuffleFrom[shuffleIndex].split(" ").slice(1).join(" ")
        }

        // set HTML prefix and word
        shuffle.querySelector('.prefix').innerHTML = prefix;
        shuffle.querySelector('.spins').innerHTML = word;

        // show the word
        shuffle.querySelector('.spins').classList.add('active');

        // add to counter and exit function
        shuffleIndex++;
        return;
    },500)
}

doShuffle()
const shuffleInterval = setInterval(doShuffle,changeInterval)



// SKILL SECTION EXPANSION =====================================================
// this handles the collapsible boxes in the skill section

// boolean is true if there is any expanded boxes
let expanded = false;

// collapsible boxes default to show everything if the browser doesn't support JS
// this closes all the boxes without animation
// animation is not included in the CSS to avoid delay from this step
removeClassFromAll(document.querySelectorAll('#contentwrapper>section#skills .item.active'),"active")

// adds animation back to each box using the class "loaded"
// this is done after a small delay since animation would
// render anyway on firefox if both are run simultaneously
setTimeout(()=>{
    for (let j=0; j<document.querySelectorAll('#contentwrapper>section#skills .item .desc').length; j++) {
        document.querySelectorAll('#contentwrapper>section#skills .item .desc')[j].classList.add('loaded')
    }
},10)

// this gets triggered by the onclick in each boxes HTML
const toggleExpander = (item,parent) => {
    // if "null" is passed in or the clicked item is active, then collapse all
    // (since by design there can be only one expanded box)
    if (item === null || item.classList.contains('active')) {
        removeClassFromAll(parent.querySelectorAll('.item.active'),"active")
        expanded = false;
        return;
    } else {
        // if the clicked item is not active, collapse everything else and expand it
        removeClassFromAll(parent.querySelectorAll('.item.active'),"active")
        item.classList.add('active');
        expanded = true;
        return;
    }  
}



// VIEWPORT DETECTION ==========================================================
// this handles some CSS fixes and the change in viewport

// a list holding how far each section is to the top of the page
// not constant since it can be changed by resizing the window
let sectionOffsetTop = [];

// a list holding the heights of each section
// not constant since it can be changed by resizing the window
let sectionHeights = [];


// function runs on load and every viewport update
const retrieveHeightData = (parent) => {
    // update isDesktop
    isDesktop = window.innerWidth >= desktopWidthThreshold; 

    // collapse all skill section boxes
    // since by design all boxes are collapsed when viewport is changed
    toggleExpander(null,document.getElementById('skills')); 

    // reset sectionOffsetTop and sectionHeights
    sectionOffsetTop = [];
    sectionHeights = [];

    // go through each section and retrieve both values
    for (let i=0;i<parent.querySelectorAll('section').length;i++) { 
        sectionOffsetTop.push(parent.querySelectorAll('section')[i].offsetTop);
        sectionHeights.push(parent.querySelectorAll('section')[i].offsetHeight);
    }

    // this handles the desktop only issue where an absolutely positioned 50% width 
    // contentwrapper set as left:50% will take the browser scrollbar into account and not 
    // pushing it all the way like how the fixed positioned elements do
    // Note that this can be fixed by disabling the scrollbar altogether, but I want to keep it
    // This is fixed by pushing the contentwrapper out by the same amount as the left width
    if (isDesktop) {
        document.getElementById('contentwrapper').style.left = (Math.floor(left.getBoundingClientRect().width)) + "px";
        // using getBoundingClientRect since offsetWidth rounds to the nearest integer (I want it to round down)
    } else {
        document.getElementById('contentwrapper').style.left = "0";
    }
}

retrieveHeightData(right);
window.addEventListener('resize',()=> {retrieveHeightData(right);})



// SCROLL DETECTION ============================================================
// this handles the automatic update of the background fill picture and the navbar

// current index of the section showing on screen
let currentSection = 0;

// function runs on scroll
const setSection = () => {
    // verify criteria for each section before continuing
    for (let i=0;i<sectionOffsetTop.length;i++) {
        if ( 
            // don't check for the same section
            i !== currentSection &&
            // top of screen is within criteria (see scrollUpdateSensitivity at the top)
            right.scrollTop > (sectionOffsetTop[i]-(scrollUpdateSensitivity*sectionHeights[i])) &&
            right.scrollTop < (sectionOffsetTop[i]+((1-scrollUpdateSensitivity)*sectionHeights[i]))
        ) {
            // following code only gets executed if the user has moved on to a different section

            currentSection = i

            // remove current fill and activate new fill
            removeClassFromAll(left.querySelectorAll('.fill.active'),"active")
            left.querySelector(`.fill[data-for='${currentSection+1}']`).classList.add('active');

            // remove current nav item
            removeClassFromAll(document.querySelectorAll('nav#menu .item.active'),"active")

            // activate new nav item expect if at the top
            // by design there is no nav menu for the top section
            if (currentSection != 0) {
                // since there is no nav menu for the top, the nav index for each section is shifted by -1
                document.querySelectorAll('nav#menu .item')[currentSection-1].classList.add('active');
            }

            // collapse skill section when scroll away
            if ( 
                currentSection !== 2 &&
                expanded &&
                (
                    // far away and (small screen or chrome)
                    ((!isDesktop || !window.chrome) && currentSection!==1 && currentSection!==3) ||
                    // different section and chrome
                    (isDesktop && !!window.chrome)
                )
            ) {
                // collapse skill section 
                toggleExpander(null,document.getElementById('skills'));
            }
        }
    }
}

setSection();
right.addEventListener("scroll",setSection);

// function gets triggered by the onclick in nav menu
// there is plan to switch to anchor tag for it to work without JS
// Note that the "section" integer is index 1, not 0
const goTo = (section) => {
    // collapse skill section
    if (expanded) { toggleExpander(null,document.getElementById('skills')); }

    // Since section is index 1, shift the value by -1 to match the list
    right.scrollTop = sectionOffsetTop[section-1];
}