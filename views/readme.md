# IUB Student Portal

**This document is not meant to be fully focused on the project, but rather act as a supplementary guide to aid in understanding the project**

**A proper documentation will be penned down later**

## Updates:

- [x] Server working
- [x] Connection established with main index.ejs
- [x] JS(Client-side), CSS, and other frameworks, libraries should be moved to the public folder, where static files will be handled
- [x] Using Bower as the frontend package manager to import Bootstrap and jQuery
~~- [ ] **Incomplete integration with Bootstrap for some reason:**~~
~~- [ ] * Bootstrap connection made, but with partial viewing~~
~~- [ ] * Play around with index.ejs to verify, but it works~~
~~- [ ] * Try making changes to the main.css file and see if that's the issue, although console doesn't give any errors about the connection to the file~~
- [x] **CSS file integration done, although with a little caveat: The Bootstrap CSS files from Bower doesn't work completely, so Bootstrap CDN was used instead**
- [x] Installed MongoDB
- [x] Installed MongoDB module
- [x] MongoDB connected and running
- [x] Using passport.js to handle login and authentication
- [x] Using LocalStrategy: storing the usernames and password in our local database
- [x] Also using bcrypt.js to hash passwords, and match hash to user input 
- [x] Routes directory added, and routing functional:
  * server.js only has the home route, and all other routes are in the routes directory
- [x] User schema created
- [x] Middlewares added for express-session, express-messages, express-validator
- [x] Custom message.ejs template added to display middleware messages using connect-flash 
- [x] Backend working
- [x] Registration/Signup working: Full integration with database
- [x] To make passport work, create a config file  created, and place strategies there
- [x] Login system also working: Fully functional with passport and mongodb
- [x] User schema updated
- [ ] Email addresses need to be verified to ensure only one account per email address
- [x] Access control implementation required: Preventing outside users to see the dashboard
- [x] Access controls added: Non-users cannot directly go to dashboard, nor the admin-dash page
- [x] Second collection for database required, and added
- [ ] Potential improvement/optimization: Currently have to set the navbar despite using ejs for each page added that follows from dashboard. Mostly because the class="active" moves around. Must be a workaround
- [x] Posts can now be viewed in the dashboard
- [x] Posts can be added and then viewed
- [x] Posts can be edited and updated, and have it reflected in the database: Create, Read, Update working
- [x] AJAX required to delete posts
- [x] Full CRUD functionality
- [x] ~~Removed required: true on Post schema~~
- [x] Google Calendar added
- [ ] Bug: Post update prompts show up on Login Page and Add Post page (even when you go to dash from Add Post page and then logout)
- [x] Vulnerability: Any logged in users can go straight to another user's edit form page
- [x] Public/private posts added
- [ ] Issue rendering the prompt messages properly

[More on Modules](https://www.sitepoint.com/understanding-module-exports-exports-node-js/)

## On MVC Patterns:

**Stands for Model-View-Controller**

* Software Architectural Design Pattern
* Separates application functionality, logic, and interface in an application
* Promotes organized programming
* *Frameworks that use MVC Concepts:*
  * Ruby on Rails(Ruby)
  * Sinatra(Ruby)
  * Laravel(PHP)
  * Codeigniter(PHP)
  * Zend(PHP)
  * Express(JS)
  * Backbone(JS)
  * Angular(JS)
  * Django(Python)
  * Flask(Python)

## On express modules:

### For setting up flash messaging, that'll inform the users about CRUD functionalities:

Use node module `express-messages` for that. This requires the following middlewares:
  * `connect-flash` -> Handles storing the messages
  * `express-session` -> Handles session info(?); Also needed for some of the mentioned middleware, so include that first
  * `express-validator` -> To display messages on the client's browser
  * `express-router` -> To transfer routes from the server.js file to the routes folder

**Note** Session data is not saved in the cookie itself, just the session ID. Session data is stored server-side.

#### On `express-session`:

`resave`: Forces the session to be saved back to the session store, even if the session was never modified during the request.

Default value is `true`, but that's deprecated. Use `false`

`saveUninitialized`: Forces a session that is uninitialized to be saved to the store.

Default value is `true`. Choosing `false` is useful for implementing login sessions

## Warnings:

~~Check article.ejs file code segment:~~
~~````~~
~~<a class="btn btn-danger delete-article data-id=" href="#">Delete</a>~~
~~````~~

~~For easy directory pathfinding:~~
~~````~~
~~C:\MongoDB\Server\4.0\bin~~
~~````~~