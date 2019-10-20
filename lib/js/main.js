/* UI Design: Tabs: The user sees a row of tabs above a content area. When the user clicks on one of the tabs,
the content in the content area changes based on which tab the user clicked.

API: DND 5e: http://www.dnd5eapi.co/

The data to populate the UI Pattern should come from the API. When the user loads the page, they should
see the data from the API load into the UI pattern on the screen.

Technical Requirements
Your project should meet the following requirements:

Runs without errors
Shows the UI pattern you selected populated with data from the API you selected
Functions according to the descriptions above. The user should be able to interact with your UI.
Includes a README written in well formatted Markdown (hint: look up a README template)
Shows a good commit history with frequent commits. We're looking for lots of small commits.*/
// const tabs = document.querySelectorAll(".tab");
// const firstActive = document.querySelectorAll(".first-active");
// const charDatTabs = document.querySelectorAll(".char-dat-tabs");
// const charDatBut = document.querySelectorAll(".char-dat-but");
const mainTabs = document.querySelectorAll(".maintabs");
const mainButs = document.querySelectorAll(".main-nav-but");
const url = "http://dnd5eapi.co/api/";

class Accordian {
    constructor(button, div, parent){ //takes in a button that is an a tag and an unappended div with the contents of the accordian, and the parent div to append the accordian to
        this.parent = parent;
        this.button = button;
        this.div = div;
        this.parent.appendChild(this.button);
        this.parent.appendChild(this.div);
        this.hide();
        this.clickCount = 0;
        this.button.addEventListener("click", (e) => {
            e.preventDefault();
            this.clickCount++;
            if(this.clickCount % 2 === 1) {
                this.unhide();
            } else {
                this.hide();
            }
        });
    }

    hide() {
        this.div.classList.add("hidden");
    }

    unhide() {
        this.div.classList.remove("hidden");
    }
}

class Tab{
    constructor(button, div, main) { //button is a button element, div is the div related to the button, main is a boolean for whether its a main tab, tabName is the name of the tab initilizes tabArray
        this.button = button;
        this.div = div;
        this.main = main;
        this.tabName = button.innerText;
        this.hide();
        this.tabArray;
        
    }

    addClickEvent() {
        this.button.addEventListener("click", (e) => {
            e.preventDefault();
            if(this.tabArray !== undefined) {
                this.unhide();
            }
            // this.div.classList.remove("hidden");
            let input = document.createElement("input");
            let label = document.createElement("label");
            let form = document.createElement("form");
            input.setAttribute("type", "text");
            input.setAttribute("id", "input");
            label.setAttribute("for", "input");
            label.innerText = "Search: ";
            form.classList.add("input-form");
            form.appendChild(label);
            form.appendChild(input);
            this.div.appendChild(form);
            let urlEnd = this.tabName.toLowerCase();
            if(urlEnd.split(" ").length > 1) { //if the urlend has more than one word it take out the spaces and replaces them with "-"
                urlEnd = urlEnd.split(" ").join("-");
            }
            fetch(url + urlEnd)
                .then(res => res.json())
                .then(res => {
                    for(let i = 1; i <= /*res.results.length*/20; i++) { //fetches all spells, makes them into accordian objects and appends them to the div
                        fetch(url + urlEnd + "/"+ i) 
                            .then(res => res.json())
                            .then(res => {
                                let div = document.createElement("div");
                                div.classList.add("accordian-div");
                                let aTag = document.createElement("a");
                                aTag.classList.add("accordian-button");
                                aTag.innerText = res.name;
                            })
                    }
                })
        });
    }

    appendTabArray(tabArray) { //adds an array of tabs in that the tab has as siblings
        this.tabArray = tabArray;
    }

    hide() { //hides the tab
        this.div.classList.add("hidden");
    }

    unhide() { //makes the tab visible while hiding the other tabs
        for(let i = 0; i < this.tabArray.length; i++) {
            this.tabArray[i].hide();
        }
        this.div.classList.remove("hidden");
    }

}



let mainTabObjects = [];
for(let i = 0; i < mainButs.length; i++) {
    mainTabObjects[i] = new Tab(mainButs[i], mainTabs[i], true);
}

for(let i = 0; i < mainTabObjects.length; i++) {
    mainTabObjects[i].appendTabArray(mainTabObjects);
    mainTabObjects[i].addClickEvent();
}

// old code below here

// for(let i = 0; i < tabs.length; i++) { // makes all the outer tab divs hidden
//     if(!(tabs[i].classList.contains("first-active"))) {
//         tabs[i].classList.add("hidden");
//     }
// }
// let divLengths = [];
// for (let i = 0; i < charDatTabs.length; i++) { //set the initial lengths of each of the divs to be used later to make sure that the div is only populated once
//     divLengths[i] = charDatTabs[i].childNodes.length;
// }
// let tabRuns = [];
// for (let i = 0; i < charDatTabs.length; i++) { //set an array for all tabs (just char tabs for now) that counts if its been run or not
//     tabRuns[i] = 0;
// }

// // for(let i = 0; i < mainButs.length; i++) { //adds event listners to all main nav buttons
// //     mainButs[i].addEventListener("click", (e) => {
// //         e.preventDefault();
// //         let index = i;
// //         for(let j = 0; j < tabs.length; j++) { //hides all tabs
// //             if(!(tabs[j].classList.contains("hidden"))) {
// //                 tabs[j].classList.add("hidden");
// //             }
// //         }
// //         mainTabs[index].classList.remove("hidden"); //unhides the clicked on button's corresponding div

// //     })
// // }

// for(let i = 0; i < charDatTabs.length; i++) { //adds event listeners to all the character data buttons
//     charDatBut[i].addEventListener("click", (e) => { //event listener
//         e.preventDefault();
//         let index = i;
//         for(let j = 0; j < charDatBut.length; j++) { //hides all character data tabs
//             if(!(charDatTabs[j].classList.contains("hidden"))) {
//                 charDatTabs[j].classList.add("hidden");
//             }
//         }
//         charDatTabs[index].classList.remove("hidden"); //unhides the clicked on button's corresponding div
//         let urlEnd = charDatBut[index].innerText.toLowerCase(); //take the button's text and moves it to lower case
//         if(urlEnd.split(" ").length > 1) { //if the urlend has more than one word it take out the spaces and replaces them with "-"
//             urlEnd = urlEnd.split(" ").join("-");
//         } 
//         console.log(urlEnd);
//         let infoList = [];
//         fetch(url + urlEnd) //fetch the whole section of the api so we can check the length of the array of objects for the for loop later
//                 .then(res => res.json())
//                 .then(res => {
//                     console.dir(res.results);
//                     infoList = infoList.concat(res.results);
//                     console.dir(infoList);
//                 })
//                 .catch(err => {
//                     console.log("error ",err);
//                 })
//         // console.dir(infoList);
//         // if(charDatTabs[i].classList.contains("abil-sco-tab")) {
//         // console.log(`Results:  ${tabRuns[index] === 0 && charDatTabs[index].classList.contains("prof-tab")} index: ${index} tabRuns[index]: ${tabRuns[index]}`);
//         setTimeout(() => { //makes the program wait for the fetch to go through for infoList
//             // console.log(`Results:  ${tabRuns[index] === 0} ${charDatTabs[index].classList.contains("prof-tab")} index: ${index} tabRuns[index]: ${tabRuns[index]}`);
//             console.dir(infoList);
//             for(let j = 1; j <= infoList.length; j++) { //loops through each object in the array returned by the api and uses the data to populate the tab clicked
//                 fetch(url + urlEnd + "/"+j) //grab the next object in the api
//                     .then(res => res.json()) //convert to json
//                     .then(res => { // the meat of the for loop where the processing of data and populating is done
//                         // console.log(charDatTabs[index].childNodes.length +" "+ divLengths[index])
//                         // console.log(`Results:  ${tabRuns[index] === 0} ${charDatTabs[index].classList.contains("prof-tab")} index: ${index} tabRuns[index]: ${tabRuns[index]}`);
//                         if(tabRuns[index] === 0 && charDatTabs[index].classList.contains("abil-sco-tab")){ //if the tab is the ability score tab then the data is processed throught this code
//                             setTimeout(() => {
//                                 console.dir(res);
//                                 let para = document.createElement("p"); //create the elements to populate with information
//                                 let h1 = document.createElement("h1");
//                                 let ul = document.createElement("ul");
//                                 let li = [];
//                                 for(let k = 0; k < res.skills.length; k++) { //create a number of list items equal to the amount of skills
//                                     li[k] = document.createElement("li");
//                                 }
//                                 h1.innerText = res.full_name+" ("+res.name+")"; //set h1 equal to the full name and its appreviation ie "Strength (STR)"
//                                 for(let k = 0; k < res.desc.length; k++) { //compile the informtaion in the description array into the p element
//                                     if(k !== 0) {
//                                         para.innerText = para.innerText + " "+ res.desc[index];
//                                     } else {
//                                         para.innerText = res.desc[index];
//                                     }
//                                 }
//                                 for(let k = 0; k < li.length; k++) { //populate the list elements with their respective skills and append them to the ul
//                                     li[k].innerText = res.skills[k].name;
//                                     ul.appendChild(li[k]);
//                                 }
//                                 charDatTabs[index].appendChild(h1); //append h1 to the current character data tab (ability scores)
//                                 charDatTabs[index].appendChild(para); //append p element to ability score
//                                 charDatTabs[index].appendChild(ul); //append ul to ability scores


//                             }, 200 + (j*25));
//                         } else if(tabRuns[index] === 0 && charDatTabs[index].classList.contains("skill-tab")) { //if the tab is the skills tab the data is proccessed through this code
//                             setTimeout(() => {
//                                 console.dir(res);
//                                 let h2 = document.createElement("h2");
//                                 let para = document.createElement("p");
//                                 if(j === 1) {
//                                     h2.innerText = res.name + " (DEX)";
//                                 } else {
//                                     h2.innerText = res.name + " ("+res.ability_score.name+")";
//                                 }
//                                 if(res.desc.length > 1) {
//                                     console.log("Error: full description not displayed: js line 124");
//                                 }
//                                 para.innerText = res.desc[0];
//                                 charDatTabs[index].appendChild(h2);
//                                 charDatTabs[index].appendChild(para);
//                             }, 200 + (j*25));
//                         } else if(tabRuns[index] === 0 && charDatTabs[index].classList.contains("prof-tab")) { //there are 120 proficiencies, make this into an alphabetized list with a search bar that will real time narrow the list. Maybe make each item accordian if you have time
//                             setTimeout(() => {
//                                 console.dir(res);
//                                 if(res.classes.length !== 0 || res.races.length !== 0) {
//                                     let h2 = document.createElement("h2"); //creating the element for the name
//                                     let h3 = document.createElement("h3"); //creating the element for the type
//                                     h2.innerText = res.name;
//                                     h3.innerText = "Type: "+res.type;
//                                     charDatTabs[index].appendChild(h2);
//                                     charDatTabs[index].appendChild(h3);
//                                     if(res.classes.length > 0) {
//                                         let ul1 = document.createElement("ul");
//                                         let li1 = [];
//                                         let h4 = document.createElement("h4");
//                                         h4.innerText = "Classes: ";
//                                         for(let k = 0; k < res.classes.length; k++) { //create a number of list items equal to the amount of classes if there are any
//                                             li1[k] = document.createElement("li");
//                                             li1[k].innerText = res.classes[k].name;
//                                             ul1.appendChild(li1[k]);
//                                         }
//                                         charDatTabs[index].appendChild(h4);
//                                         charDatTabs[index].appendChild(ul1);
//                                     }
//                                     if(res.races.length > 0 ) {
//                                         let ul2 = document.createElement("ul");
//                                         let li2 = [];
//                                         let h4 = document.createElement("h4");
//                                         h4.innerText = "Races: "
//                                         for(let k = 0; k < res.races.length; k++) { //create a number of list items equal to the amount of races if there are any
//                                             li2[k] = document.createElement("li");
//                                             li2[k].innerText = res.races[k].name;
//                                             ul2.appendChild(li2[k]);
//                                         }
//                                         charDatTabs[index].appendChild(h4);
//                                         charDatTabs[index].appendChild(ul2);
//                                     }
//                                 }
//                             }, 200 + (j*25));
//                         } else if(tabRuns[index] === 0 && charDatTabs[index].classList.contains("lang-tab")) { //if the tab is the languages tab the data is processed through this code
//                             setTimeout(() => {
//                                 console.dir(res);
//                             }, 200 + (j*25));
//                         } else { //if the tab isnt one of the tabs under the character data tab or the tab has already been clicked and populated then this code runs
//                             console.log("error");
//                         }
//                         // console.dir(res);
//                         // let element = document.createElement("p");
//                     })
//                     .catch(err => {
//                         console.log("error",err);
//                     })
//                 if(j === infoList.length) {
//                     setTimeout(() => {
//                         tabRuns[index]++; 
//                     }, 1000);
//                 }
//             }
//         }, 300);
//         // } else if (charDatTabs[i].classList.contains("skill-tab")) {

//     });
// }
// //use string conocation with button names and tolowercase to add event listenres with fetch methods in a loop
