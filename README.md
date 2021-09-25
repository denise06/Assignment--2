# Paradise Bakers?

## PROJECT  2 :   Single Page Application Using Vue

This app is built as a one stop platform to allow homebased bakers to upload their products and share their master piece. This idea stems from the surge in homebakers during the Covid-19 pandemic period. With more sellers selling their home baked items, Baker Paradise will help to close the gap between buyers and sellers. Buyers no longer have to follow numerous instagram pages and contact sellers on by one. 



## FEATURES 
The APP plans to have the following features.

_Basic_
- A overview of all the seller listing in one page
- Contains action buttons which allows sellers to upload new items as well as edit existing listing
- Quick client site search helps buyers to quickly filter items that they are looking for via Item Name, Item Description and even search for their favourite seller (Seller Name)
- Tabluar format for the listing gives it a neat and concise overview of the item listings.
- Restful API was used, with a database personalised for the Paradise Bakers usecase. Any adding, edit and delete will call the different endpoints and update the database.


_Intermediate (coming soon...)_
- Sellers will be able to delete the items should the item is discontinued
- Allow uploading of images for each item listing


_Advance (current version will not have any development for this level)_
- Sign in button for sellers where they are only allowed to edit/delete items uploaded by them
- More form validation when creating item listings 

## UI/UX
The navigation bar is responsive for small, medium and large screens based on Bootstrap's breakpoints. 

Design was kept to a simple black and white with blue and red action buttons to clearly display the actions that sellers can take. Listings are displayed using a simple table format which gives it a clean look. 

Adding new items can be found at the top navigation panel. Upon clicking, the form displays a clear and intuitive inpur format with the use of checkboxes, drop downs, text input and radio buttons. 

The main highlight of the App is the 3 quick search inputs which helps to filter the long item listings based on the Shop Name, Item Name, Item Description. This client site serching greatly enhances the buyer's UX as they navigate their way through the plethora of listings. This greatly reduces the need for buyers to search on numerous instagram pages or websites to find the contact info of a home bakers. 

To sellers, they no longer need to fret about the cost of curating their own personal business website to showcase their talents. With the use of this one stop platform, Paradise Bakers helps them publicise and bring them closer to interested buyers. Paradise Bakers also allows sellers to see what their close competitors are doing, providing a level playing field. 



## Demo

A live demo can be found here https://denise06.github.io/assignment1_maps/. 

![Overview of Project in different devices](https://github.com/denise06/assignment1_maps/blob/main/images/Demo.png)



## Technologies
1. Vue
2. MongoDB
3. Express
4. Bootstrap
5. Javascript

## Features
This site orientate around the use of Vue for the front end development and express to create the end points and update the database on MongoDB

My Design of the site:
- Simple and quick 
- 3 different filters to allow buyers to quickly filter through the listings
   - Item Name
   - Item Descriptions
   - Shop Name

- Seller login button changes colour to indicate that it's a seller that's viewing the page
- Adding of new items action button can be found on the navigation panel
- Editting of each item will display the current item details in the same form format to allow sellers to quickly update 


_Limitations: 

_Delelte button currently not working_
_No additional view button to see a longer item details, all in one page_

_Features Left to Implement_
_-Allow sellers to delete the item  _
_- Action button (add/delete) only appears when the "Seller" button is clicked

## Testing
Manual Testing is done to ensure that the all functions are functional.


*No* | *Steps* | *Expected Results* | *Observations*
--- | --- | --- | ---
1 | `When App is loaded ` | `All item listing can be displayed, showing the item details in a tabluar format` | **Pass** 
2 | `Click on 'Add new listings' button` | `Form showing the input fields (Shop Name, Item Name, Item Description, category, Bundle deal available, Contact information, Delivery method drop down, category checkboxes), some with default fields filled in` | **Pass** 
3 | `Enter mock item data and click "Add" button` | `Return back to the All listing page with newly added item appearing at the bottom of the table. A green alert sign of "A new item has been added` will display at the top of the home page | **Pass** 
4 | `Click on the Edit button` | `Original item details are prefilled in the form` | **Pass** 
5 | `Update the Item name/delivery method/category and click "Update" button` | `Return back to All listing page with item being updated with latest information` | **Pass** 
6 | `Click on Delete button` | `Alert showing "An item has been deleted, please refresh the page` | **Pass** 
7 | `Click refresh button to reload app` | `Item is removed from the All listing page` | **Pass** 
8 | `Click on the seller button` | `Colour changed from yellow to red` | **Pass** 
9 | `Enter P in the Item Name search box ` | `All listings are filtered to show items name with P in it (not case sensitive). The item count is also updated according to the number of filtered items output` | **Pass** 
10 | `Enter P in the Item Description search box ` | `All listings are filtered to show items descriptions with P in it (not case sensitive). The item count is also updated according to the number of filtered items output` | **Pass** 
10 | `Enter P in the Shop Name search box ` | `All listings are filtered to show items with Shop Name containing P in it (not case sensitive). The item count is also updated according to the number of filtered items output` | **Pass** 


## Deployment

This site is hosted using GitHub pages, deployed directly from the master branch. 
The deployed site will update automatically upon new commits to the master branch. In order for the site to deploy correctly on GitHub pages, the landing page must be named index.html.
To run locally, you may click on the following link (https://denise06.github.io/assignment1_maps/)   into your terminal. 
To cut ties with this GitHub repository, type.git remote rm origin.into the terminal.

## Credits


 
Designs, layout and functions are original

Media
- Dropdown were taken from https://pro.fontawesome.com/releases/v5.10.0/css/all.css, a font/icon image library
- Home bakers logo icons were taken from https://flaticon.com



Acknowledgements
1. Use of Font Awesome full icons
2. Use of Flaticons for homebaker logo

