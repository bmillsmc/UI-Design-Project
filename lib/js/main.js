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
