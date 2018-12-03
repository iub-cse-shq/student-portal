# IUB Student Portal

**This document is not meant to be fully focused on the project, but rather act as a supplementary guide to aid in understanding the project**

**A proper documentation will be penned down later**

# Updates:

- [x] Server working
- [x] Connection established with main index.ejs
- [x] JS(Client-side), CSS, and other frameworks, libraries should be moved to the public folder, where static files will be handled
- [x] Using Bower as the frontend package manager to import Bootstrap and jQuery
- [ ] ~~**Incomplete integration with Bootstrap for some reason:**~~
- [ ] ~~* Bootstrap connection made, but with partial viewing~~
- [ ] ~~* Play around with index.ejs to verify, but it works~~
- [ ] ~~* Try making changes to the main.css file and see if that's the issue, although console doesn't give any errors about the connection to the file~~
- [x] **CSS file integration done, although with a little caveat: The Bootsrap CSS files from Bower doesn't work completely, so Bootstrap CDN was used instead**

* Modules installed so far:
    * npm installed 
    * nodemon
    * express
    * body-parser
    * ejs
    * bower
* Required Modules:
    * mongodb
    * mongoose

## Technologies used:

* node.js & npm
* Express framework
* MongoDB
* Mongoose ORM
* Pug Template Engine
* Bower Package Manager
* jQuery & AJAX

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

**Model**

* Getting and manipulating data related logic
* Interactions with database(CRUD operations)
* Communicates with Controller: *Controller can request data through the model*
* Can sometimes update the view(Depends on Framework): *Controller mostly updates the view*
* Can also be file systems

**View**

* What the end user sees(UI)
* HTML/CSS
* Dynamic views/values from the controller
* Communicates with the controller
* Template Engines may vary: *Template Engines allows dynamic data*
  * Handlebars(JS)
  * Dust(JS)
  * ERB(Ruby)
  * HAML(Ruby)
  * Jinja(Flask)

**Controller**

* Takes in user input(From View/URL)
* Processes requests: `GET`, `POST`, `PUT`, `DELETE`
  * *From the browser you can only do a `GET` or `POST`*
  * Use HTTP Clients to make other requests
* Gets data from the model: *Controller will ask the model to get some data from a database, and then the controller will take the data and load a view, and pass that data into it, from where the template takes over. Can also load a view without passing data, i.e. just a page with HTML/CSS*

**Sequence:**

1. User sees the view of the application in the browser and makes a request with input to...
2. ...a Router: The request can be some kind of link that they clicked on, and the router calls a specific...
3. ...Controller method based on the route, and if data is needed, the controller will interact with the...
4. ...Model, which interacts with the...
5. ...Database.
6. Once the controller gets that data passed, it can load a...
7. ...View, and it can send the data to the view and it can be dealt with the...
8. ...Template Engine.
9. Finally, send the view back to the browser for the user to see.

[Pseudo-MVC Pattern]()

**Pseudo-Code for the Pattern:**
Sample User HTML: http://yourapp.com/users/profile/1

Corresponding Code:
````
/routes
  users/profile/:id = Users.getProfile(id)

/controllers
  class Users{
    function getProfile(id){
      profile = this.UserModel.getProfile(id)

      renderView('users/profile', profile)
    }
  }

/models
  Class UserModel{
    function getProfile(id){
      data = this.db.get('SELECT * FROM users WHERE id = id')
      return data;
    }
  }

/views
  /users
    /profile
    h1 {{profile.name}} /h1
    ul
      Email:{{profile.email}} /li
      Phone:{{profile.phone}} /li
    /ul
````
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