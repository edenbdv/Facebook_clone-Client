# Facebook_clone-client

<img width="922" alt="‏‏Feed" src="https://github.com/user-attachments/assets/a122e367-369f-44a8-b253-3128fd96639d">





"Foobar" is a social networking application similar to Facebook, designed to connect people and support sharing of updates and photos.

wiki: https://github.com/edenbdv/Facebook_clone-Server.git

## Features

### **Login and Signup** 
Foobar allows users to create accounts securely with a unique username and password. Key features include:
- **Create Account:** 
  - Users can securely create an account with a unique username and password.
    - **Password Requirements:**
    - Contains at least 8 characters.
    - Includes both letters and numbers.
    - Must match the password entered again.

  This secure and user-friendly process ensures a smooth onboarding experience for new users.

- **Login:** 
  - Users can log in to access their accounts and use the app's features.


![login](https://github.com/user-attachments/assets/334173b9-571f-4a1e-a27c-9c672ea950aa)
  
![image](https://github.com/user-attachments/assets/60b2b411-2f21-4230-a27b-9eb5f9b74171)


### **Feed**
The core feature of Foobar is its feed, where users can view updates, posts, and media. Key features include:

- **Posts:** Users can see, create, and edit posts.
- **Comments and Likes:** Users can comment on and like posts.
- **Search Functionality:** A search box is available at the top menu.
- **Navigation Buttons:**
  - **Log Out:** Redirects to the login page and logs out the current user.
  - **Night Mode:** Switches the site's theme.

<img width="922" alt="‏‏Feed" src="https://github.com/user-attachments/assets/b97d8a45-7bd7-4dd5-b956-e6f4f1cbc1be">
<img width="952" alt="Feed2" src="https://github.com/user-attachments/assets/ab15f9d9-d73b-4803-adfd-62823b706e4c">


### **Profile Page**
The Profile page in Foobar provides users with an overview of their personal information and social connections. Key features include:

- **Edit Personal Details:** Users can easily update their display name, profile picture, and other personal information to keep their profile current and engaging.

- **View Friends:** Users can view a list of their friends, allowing them to keep track of their connections on the platform.

- **Friend Requests Management:** The Profile page allows users to accept or decline incoming friend requests, facilitating seamless social interactions.

- **User Interaction:** Users can explore additional options related to their friends and friend requests, enhancing their networking experience on Foobar.

This user-friendly interface ensures that managing personal profiles and social connections is efficient and intuitive.
  <img width="1131" alt="‏‏לכידה" src="https://github.com/user-attachments/assets/41f0069f-64d6-462e-a972-b2b7ff773ad1">


## Technologies Used (whole project)

- **Frontend:** The frontend of Foobar is built with **HTML, CSS, and JavaScript, utilizing React.js** for dynamic user interfaces. It features reusable components for improved maintainability and scalability. React Hooks manage state and side effects efficiently, while the Fetch API allows asynchronous data retrieval, keeping the UI responsive. This integration of form handling, data fetching, and conditional rendering ensures a smooth user experience, complemented by React's ecosystem of routing and state management libraries.

- - **Backend:** The backend of Foobar is designed to handle server-side logic and routing efficiently. Key features include:
  - **Node.js:** Utilizes a non-blocking, event-driven architecture for efficient handling of multiple connections.
  - **Express.js:** Simplifies server creation and routing, providing a robust set of features for web applications.
  - **MongoDB:** A NoSQL database used for storing user data and posts, offering flexibility and scalability.
  - **jsonwebtoken:** Implements JSON Web Tokens for secure user authentication and authorization, ensuring safe access to protected resources.
  - **WebSockets:** Enables real-time communication between clients and the server, facilitating instant updates.
  - **Multithreading:** Supports concurrent processing, allowing the server to handle multiple requests simultaneously for improved performance.


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
