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

for(let i = 0; i < tabs.length; i++) {
    if(!(tabs[i].classList.contains("first-active"))) {
        tabs[i].classList.add("hidden");
    }
}

for(let i = 0; i < charDatTabs.length; i++) {
    charDatBut[i].addEventListener("click", (e) => {
        e.preventDefault();
        let index = i;
        for(let j = 0; j < charDatBut.length; j++) {
            if(!(charDatTabs[j].classList.contains("hidden"))) {
                charDatTabs[j].classList.add("hidden");
            }
        }
        charDatTabs[index].classList.remove("hidden"); 
        let urlEnd = charDatBut[index].innerText.toLowerCase();
        if(urlEnd.split(" ").length > 1) {
            urlEnd = urlEnd.split(" ").join("-");
        } 
        console.log(urlEnd);
        for(let j = 1; j < 7; j++) {
            fetch(url + urlEnd + "/"+j)
                .then(res => res.json())
                .then(res => {
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
                                para.innerText = para.innerText + " "+ desc[i];
                            } else {
                                para.innerText = desc[i];
                            }
                        }


                    }, 100 + (j*100))
                    // console.dir(res);
                    // let element = document.createElement("p");
                })
                .catch(err => {
                    console.log("error",err);
                })
        }
    });
}
//use string conocation with button names and tolowercase to add event listenres with fetch methods in a loop
