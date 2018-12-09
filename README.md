# IUB Student Portal

**Documentation to explain the Project**

### Group Members:

* Amirah Maiza Kabir
* Farihah Nadah Kabir
* Hasnain Hossain

*IUB Student Portal is meant to be a simple, integrated platform for IUB students to come together and share their academic questions and concerns with faculties, based on their courses, and for them to also manage and keep track of their own course and academic information.*

Its primary purpose and goal is to replace all the small, individual clusters of Facebook groups that are created in order to share information. 

## Technologies used:

* node.js & npm
* Express framework
* MongoDB
* Mongoose ORM
* Pug Template Engine
* Bower Package Manager
* jQuery & AJAX

## Modules installed so far:
  * npm 
  * nodemon
  * express
  * body-parser
  * ejs
  * bower
  * mongodb
  * mongoose
  * passport
  * passport-local: Local database
  * bcryptjs: For password hashing
  * connect-flash: For flash messages
  * express-messages: For flash messaging
  * express-session: For flash messaging
  * express-validator: Validates forms

## Warnings:

* CSS library installed under Bower does not work properly
* Navbars needed to be added for each page, despite EJS
* Footer not exactly a ‘footer’
* “My Content” dropdown button in dashboard does not work properly
* Message prompts not working entirely as it should; issue rendering properly
* Multiple email addresses can be used to create an account


## The MVC Model:

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

* Controller is the `routes` directory for now
* Takes in user input(From View/URL)
* Processes requests: `GET`, `POST`, `PUT`, `DELETE`
  * *From the browser you can only do a `GET` or `POST`*
  * Use HTTP Clients to make other requests
* Gets data from the model: *Controller will ask the model to get some data from a database, and then the controller will take the data and load a view, and pass that data into it, from where the template takes over. Can also load a view without passing data, i.e. just a page with HTML/CSS*

**Sequence of redirections for the MVC Pattern:**

1. User sees the view of the application in the browser and makes a request with input to...
2. ...a Router: The request can be some kind of link that they clicked on, and the router calls a specific...
3. ...Controller method based on the route, and if data is needed, the controller will interact with the...
4. ...Model, which interacts with the...
5. ...Database.
6. Once the controller gets that data passed, it can load a...
7. ...View, and it can send the data to the view and it can be dealt with the...
8. ...Template Engine.
9. Finally, send the view back to the browser for the user to see.

**Pseudo-Code for the Pattern:**

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