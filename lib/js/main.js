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
const mainTabs = document.querySelectorAll(".maintabs");
const mainButs = document.querySelectorAll(".main-nav-but");
const url = "http://dnd5eapi.co/api/";

class Accordian {
  constructor(button, div, parent) {
    //takes in a button that is an a tag and an unappended div with the contents of the accordian, and the parent div to append the accordian to
    this.parent = parent;
    this.button = button;
    this.div = div;
    this.parent.appendChild(this.button);
    this.parent.appendChild(this.div);
    this.hide();
    this.clickCount = 0;
    this.button.addEventListener("click", e => {
      e.preventDefault();
      this.clickCount++;
      if (this.clickCount % 2 === 1) {
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

class Tab {
  constructor(button, div) {
    //button is a button element, div is the div related to the button, and tabName is the name of the tab initilizes tabArray
    this.button = button;
    this.div = div;
    this.tabName = button.innerText;
    this.hide();
    this.tabArray;
    this.clickCount = 0;
    this.accordianList = [];
  }

  addClickEvent() {
    //this should be called after appending tabarray
    this.button.addEventListener("click", e => {
      e.preventDefault();
      if (this.tabArray !== undefined) {
        this.unhide();
      }
      if (this.clickCount < 1) {
        let input = document.createElement("input");
        let label = document.createElement("label");
        let form = document.createElement("form");
        input.setAttribute("type", "text");
        input.setAttribute("id", "input");
        label.setAttribute("for", "input");
        label.innerText = "Search ";
        form.classList.add("input-form");
        input.addEventListener("keyup", e => {
          //add hide for divs when search activates
          let matchString = e.target.value;
          for (let i = 0; i < this.accordianList.length; i++) {
            if (matchString.length === 0) {
              this.accordianList[i].button.classList.remove("hidden");
            } else if (
              this.accordianList[i].button.innerText
                .substring(0, matchString.length)
                .toLowerCase() !== matchString.toLowerCase()
            ) {
              this.accordianList[i].button.classList.add("hidden");
            } else {
              this.accordianList[i].button.classList.remove("hidden");
            }
          }
        });
        form.appendChild(label);
        form.appendChild(input);
        this.div.appendChild(form);
        let urlEnd = this.tabName.toLowerCase();
        if (urlEnd.split(" ").length > 1) {
          //if the urlend has more than one word it take out the spaces and replaces them with "-"
          urlEnd = urlEnd.split(" ").join("-");
        }
        fetch(url + urlEnd, {
          mode: "cors"
        })
          .then(res => res.json())
          .then(res => {
            for (let i = 1; i <= res.results.length; i++) {
              //fetches all data, makes them into accordian objects and appends them to the div
              fetch(url + urlEnd + "/" + i, {
                mode: "cors"
              })
                .then(res => res.json())
                .then(res => {
                  let div = document.createElement("div");
                  div.classList.add("accordian-div");
                  let aTag = document.createElement("a");
                  aTag.classList.add("accordian-button");
                  aTag.innerText = res.name;
                  this.populate(div, res);
                  this.accordianList[i - 1] = new Accordian(
                    aTag,
                    div,
                    this.div
                  );
                });
            }
          });
        this.clickCount++;
      }
    });
  }

  appendTabArray(tabArray) {
    //adds an array of tabs that the tab has as siblings
    this.tabArray = tabArray;
  }

  hide() {
    //hides the tab
    this.div.classList.add("hidden");
  }

  unhide() {
    //makes the tab visible while hiding the other tabs
    for (let i = 0; i < this.tabArray.length; i++) {
      this.tabArray[i].hide();
    }
    this.div.classList.remove("hidden");
  }
}

class MonsterTab extends Tab {
  constructor(button, div, main) {
    super(button, div, main);
  }

  populate(div, aTag, res) {}
}

class SpellTab extends Tab {
  constructor(button, div, main) {
    super(button, div, main);
  }

  populate(div, res) {
    //school
    let school = document.createElement("p");
    school.innerText = res.school.name;
    div.appendChild(school);
    //level
    let level = document.createElement("p");
    if (res.level === 0) {
      level.innerText = "Cantrip";
    } else {
      level.innerText = "Level: " + res.level;
    }
    div.appendChild(level);
    //casting time
    let castTime = document.createElement("p");
    castTime.innerText = "Cast Time: " + res.casting_time;
    div.appendChild(castTime);
    //range
    let range = document.createElement("p");
    range.innerText = "Range: " + res.range;
    div.appendChild(range);
    //components
    let components = document.createElement("p");
    for (let i = 0; i < res.components.length; i++) {
      if (i === 0) {
        components.innerText = "Components: " + res.components[i] + ",";
      } else if (i === res.components.length - 1) {
        components.innerText = components.innerText + " " + res.components[i];
      } else {
        components.innerText =
          components.innerText + " " + res.components[i] + ",";
      }
    }
    div.appendChild(components);
    //ritual
    let ritual = document.createElement("p");
    ritual.innerText = "Ritual: " + res.ritual;
    div.appendChild(ritual);
    //concentration
    let concentration = document.createElement("p");
    concentration.innerText = "Concentration: " + res.concentration;
    div.appendChild(concentration);
    //duration
    let duration = document.createElement("p");
    duration.innerText = "Duration: " + res.duration;
    div.appendChild(duration);
    //classes
    let classes = document.createElement("p");
    for (let i = 0; i < res.classes.length; i++) {
      if (i === 0) {
        classes.innerText = "Classes: " + res.classes[i].name + ", ";
      } else if (i === res.classes.length - 1) {
        classes.innerText = classes.innerText + res.classes[i].name;
      } else {
        classes.innerText = classes.innerText + res.classes[i].name + ", ";
      }
    }
    div.appendChild(classes);
    //material
    if (res.material !== undefined) {
      let material = document.createElement("p");
      material.innerText = "Material(s): " + res.material;
      div.appendChild(material);
    }
    //description
    let description = document.createElement("p");
    for (let i = 0; i < res.desc.length; i++) {
      if (i === 0) {
        description.innerText = res.desc[i];
      } else {
        description.innerText = description.innerText + " " + res.desc[i];
      }
    }
    div.appendChild(description);
    //if higher_level
    if (res.higher_level !== undefined) {
      let higherLevel = document.createElement("p");
      for (let i = 0; i < res.higher_level.length; i++) {
        if (i === 0) {
          higherLevel.innerText = res.higher_level[i];
        } else {
          higherLevel.innerText =
            higherLevel.innerText + " " + res.higher_level[i];
        }
      }
      div.appendChild(higherLevel);
    }
    //phb page
    let page = document.createElement("p");
    page.innerText = res.page.toUpperCase();
    div.appendChild(page);
  }
}

let mainTabObjects = [];

mainTabObjects[0] = new SpellTab(mainButs[0], mainTabs[0]);
mainTabObjects[1] = new MonsterTab(mainButs[1], mainTabs[1]);

for (let i = 0; i < mainTabObjects.length; i++) {
  mainTabObjects[i].appendTabArray(mainTabObjects);
  mainTabObjects[i].addClickEvent();
}
