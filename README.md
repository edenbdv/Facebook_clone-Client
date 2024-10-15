# Facebook_clone-client

**Login Page:**
![image](https://github.com/user-attachments/assets/8dd01c14-2deb-4a70-b336-87779b76feb5)

**Sign Up Page:**
![image](https://github.com/user-attachments/assets/f0c9c4f3-20bd-4cc9-b677-a5f4d6371ed9)

**Feed Page:**

<img width="919" alt="Feed" src="https://github.com/user-attachments/assets/8117ee96-2e87-4c3b-8ef8-40cd53066e49">



![‏‏comment](https://github.com/user-attachments/assets/bc47bdef-1bdd-48e5-b8af-fb7acf65312f)


"Foobar" is a social networking application similar to Facebook, designed to connect people and support sharing of updates and photos.

wiki: https://github.com/edenbdv/Facebook_clone-Server.git

## Features

- **Sign Up and Login:** Foobar allows users to create accounts securely with a unique username and password. Users can then log in to access their accounts and use the app's features. Note that during signup, you must upload a profile picture, and your full name should only consist of letters. Your username must be unique, and your password must contain at least 8 characters, including letters and numbers, and it must match the password you entered again.

- **Feed:** The core feature of Foobar is its feed, where users can view updates, posts, and media. On the feed page, you'll find all the posts on Foobar. You have the ability to create new posts, edit existing ones, and delete them as needed. Additionally, you can comment on posts and like them. At the top menu, you'll find a search box along with two buttons: the Log Out button, which redirects you to the login page and logs out the current user, and the Night Mode button, which switches the site's theme.

## Technologies Used

- **Frontend:** The frontend of Foobar is built with **HTML, CSS, and JavaScript, utilizing React.js** for dynamic user interfaces. It features reusable components for improved maintainability and scalability. React Hooks manage state and side effects efficiently, while the Fetch API allows asynchronous data retrieval, keeping the UI responsive. This integration of form handling, data fetching, and conditional rendering ensures a smooth user experience, complemented by React's ecosystem of routing and state management libraries.

## Dependencies

- **Frontend:**
  - React.js
  - React Router
  - Bootstrap 

## Running the code

1. Clone the repository:

   ```bash
   git clone client https://github.com/edenbdv/Facebook_clone-Client.git
   git clone server https://github.com/edenbdv/Facebook_clone-Server.git
   ```

2. Install dependencies for both client and server:

   ```bash
   cd Facebook_clone-client
   npm install
   cd ../Facebook_clone-Server
   npm install
   ```

3. Build the client-side code:

   ```bash
   npm run build
   ```
   
4. Copy the `build/static` folder from the client into the server directory

5. Set up configuration:

   - In the `config` folder of both client and server, modify the `config.js` file to include the appropriate IP address and port (also in App.js) for your server.

## Usage

1. Run in the server:

   ```bash
   node app.js
   ```
2. Run in the client:
      ```bash
   npm start
   ```
This will open "Foobar" in your browser at `http://ip:port`.


### Tip:
For the best experience, log in using the credentials for user **Eden1@gmail.com** (Password: **Eden1234**), although any account will function properly.


## Work Process

Our development process follows these steps:

1. **Planning:** We start with brainstorming and defining the features and functionalities of Foobar and then we put it onto Jira.
2. **Design:** Once the requirements are clear, we move to the design phase.
3. **Implementation:** With the designs in hand, we proceed to implement the frontend components of Foobar, ensuring they meet the specified requirements.
