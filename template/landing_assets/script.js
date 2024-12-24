const whatami = [
    "city biker",
    "web developer",
    "university student",
    "accountant",
    "urban planner",
    "sociable introvert",
    "night owl"
]

const vowels = ["a","e","i","o","u"]

const spinner = document.querySelector('#contentwrapper>section#top p.whatami>.spins');
let whatamiCount = 0;

const changeWhatami = () => {
    spinner.classList.remove('active');
    whatamiCount++;

    setTimeout(()=> {
        if (whatamiCount === whatami.length) whatamiCount = 0;

        spinner.innerHTML = whatami[whatamiCount];
        if (vowels.includes(whatami[whatamiCount].slice(0,1)) && whatami[whatamiCount] !== "university student") {
            document.querySelector('#contentwrapper>section#top p.whatami>.prefix').innerHTML = 'an';
        } else {
            document.querySelector('#contentwrapper>section#top p.whatami>.prefix').innerHTML = 'a';
        }

        spinner.classList.add('active');
    },500)
    
}

changeWhatami();
let spinnerInterval = setInterval(changeWhatami,2250)

let expanded = false;

const toggleExpander = (item,parent) => {
    if (item==='collapse') {
        for (i=0;i<parent.querySelectorAll('.item.active').length;i++) {
            parent.querySelectorAll('.item.active')[i].classList.remove('active')
        }
        return;
    }
    if (!item.classList.contains('active')) {
        for (i=0;i<parent.querySelectorAll('.item.active').length;i++) {
            parent.querySelectorAll('.item.active')[i].classList.remove('active')
        }
        item.classList.add('active');
        expanded = true;
    } else {
        item.classList.remove('active');
        expanded = false;
    }  
}

let sectionHeights = [];

const retrieveSectionHeights = (parent) => {
    toggleExpander('collapse',document.getElementById('skills'));
    sectionHeights = [];
    for (i=0;i<parent.querySelectorAll('section').length;i++) {
        sectionHeights.push(parent.querySelectorAll('section')[i].offsetTop);
    }
}

const left = document.getElementById('left');
const right = document.getElementById('right');

retrieveSectionHeights(right);

window.addEventListener('resize',()=> {
    retrieveSectionHeights(right);
})


right.addEventListener("scroll",()=> {
    for (i=0;i<sectionHeights.length;i++) {
        let sectionHeight;
        if (!!sectionHeights[i+1]) {
            sectionHeight = sectionHeights[i+1] - sectionHeights[i];
        } else {
            sectionHeight = right.querySelectorAll('section')[right.querySelectorAll('section').length - 1].offsetHeight;
        }

        if ((sectionHeights[i]-(0.20*sectionHeight)) < right.scrollTop && right.scrollTop < (sectionHeights[i]+(0.80*sectionHeight))) {
            for (j=0;j<left.querySelectorAll('.fill.active').length;j++) {
                left.querySelectorAll('.fill.active')[j].classList.remove('active');
            }
            left.querySelector(`.fill[data-for='${i+1}']`).classList.add('active');

            for (k=0;k<document.querySelectorAll('nav#menu .item.active').length;k++) {
                document.querySelectorAll('nav#menu .item.active')[k].classList.remove('active');
            }

            // if (i!==2) {
            //     if (expanded) {
            //         document.querySelector('#skills .item.active').classList.remove('active');
            //         expanded = false;
            //     }
            // }
            
            if (i!==0) {
                document.querySelectorAll('nav#menu .item')[i-1].classList.add('active');
            }
        }
    }
})

// let leftscrollwarn = 0;

// document.getElementById('left').addEventListener("wheel", (e) => {
//     if (leftscrollwarn === 0) {
//         document.getElementById('leftscrollwarning').classList.add('active');
//         leftscrollwarn = 1;
//         setTimeout(()=>{
//             document.getElementById('leftscrollwarning').classList.remove('active');
//             leftscrollwarn = 0;
//         },3000)
//     }
// })

const goTo = (section) => {
    right.scrollTop = sectionHeights[section-1];
}