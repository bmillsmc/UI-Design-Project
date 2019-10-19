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
const tabs = document.querySelectorAll(".tab");
const firstActive = document.querySelectorAll(".first-active");
const charDatTabs = document.querySelectorAll(".char-dat-tabs");
const charDatBut = document.querySelectorAll(".char-dat-but");
const url = "http://dnd5eapi.co/api/";

for(let i = 0; i < tabs.length; i++) { // makes all the outer tab divs hidden
    if(!(tabs[i].classList.contains("first-active"))) {
        tabs[i].classList.add("hidden");
    }
}
let divLengths = [];
for (let i = 0; i < charDatTabs.length; i++) {
    divLengths[i] = charDatTabs[i].childNodes.length;
}
for(let i = 0; i < charDatTabs.length; i++) { //adds event listeners to all the character data buttons
    charDatBut[i].addEventListener("click", (e) => { //event listener
        e.preventDefault();
        let index = i;
        for(let j = 0; j < charDatBut.length; j++) { //hides all character data tabs
            if(!(charDatTabs[j].classList.contains("hidden"))) {
                charDatTabs[j].classList.add("hidden");
            }
        }
        charDatTabs[index].classList.remove("hidden"); //unhides the clicked on button's corresponding div
        let urlEnd = charDatBut[index].innerText.toLowerCase(); //take the button's text and moves it to lower case
        if(urlEnd.split(" ").length > 1) { //if the urlend has more than one word it take out the spaces and replaces them with "-"
            urlEnd = urlEnd.split(" ").join("-");
        } 
        console.log(urlEnd);
        let infoList;
        fetch(url + urlEnd)
                .then(res => res.json())
                .then(res => {
                    console.dir(res);
                    infoList = res;
                })
                .catch(err => {
                    console.log("error ",err);
                })
        // if(charDatTabs[i].classList.contains("abil-sco-tab")) {
            for(let j = 1; j < infoList.results.length; j++) {
                fetch(url + urlEnd + "/"+j)
                    .then(res => res.json())
                    .then(res => {
                        console.log(charDatTabs[i].childNodes.length +" "+ divLengths[i])
                        if(charDatTabs[i].childNodes.length <= divLengths[i]){
                            setTimeout(() => {
                                console.dir(res);
                                let para = document.createElement("p");
                                let h1 = document.createElement("h1");
                                let ul = document.createElement("ul");
                                let li = [];
                                for(let k = 0; k < res.skills.length; k++) {
                                    li[k] = document.createElement("li");
                                }
                                h1.innerText = res.full_name+" ("+res.name+")";
                                for(let k = 0; k < res.desc.length; k++) {
                                    if(k !== 0) {
                                        para.innerText = para.innerText + " "+ res.desc[i];
                                    } else {
                                        para.innerText = res.desc[i];
                                    }
                                }
                                for(let k = 0; k < li.length; k++) {
                                    li[k].innerText = res.skills[k].name;
                                    ul.appendChild(li[k]);
                                }
                                charDatTabs[index].appendChild(h1);
                                charDatTabs[index].appendChild(para);
                                charDatTabs[index].appendChild(ul);


                            }, 100 + (j*100))
                        }
                        // console.dir(res);
                        // let element = document.createElement("p");
                    })
                    .catch(err => {
                        console.log("error",err);
                    })
            }
        // } else if (charDatTabs[i].classList.contains("skill-tab")) {

         
    });
}
//use string conocation with button names and tolowercase to add event listenres with fetch methods in a loop
