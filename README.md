# Facebook_clone-client

<img width="916" alt="‏‏Feed" src="https://github.com/user-attachments/assets/21c4aa4f-3868-4b31-94b7-fa83bf640bb3">




"Foobar" is a social networking application similar to Facebook, designed to connect people and support sharing of updates and photos.

wiki: https://github.com/edenbdv/Facebook_clone-Server.git


## Technologies Used (whole project)

**Frontend:** The frontend of Foobar is built with **JavaScript, React, HTML, and CSS**. Key features include:
- **JavaScript:** Provides dynamic functionality and interactivity.
- **React:** Used for building reusable components and managing state efficiently.
- **HTML & CSS:** Structures and styles the user interface, ensuring a responsive design.


**Backend:** The backend of Foobar is designed to handle server-side logic and routing efficiently. Key features include:
- **Node.js:** Utilizes a non-blocking, event-driven architecture for efficient handling of multiple connections.
- **Express.js:** Simplifies server creation and routing, providing a robust set of features for web applications.
- **MongoDB:** A NoSQL database used for storing user data and posts, offering flexibility and scalability.
- **jsonwebtoken:** Implements JSON Web Tokens for secure user authentication and authorization, ensuring safe access to protected resources.
- **WebSockets:** Enables real-time communication between clients (the web server) and the server (the bloom-filter/TCP server), facilitating instant updates.
- **Multithreading:** Supports concurrent processing, allowing the server (the bloom-filter/TCP server) to handle multiple requests simultaneously for improved performance.
- **TCP:** Utilizes Transmission Control Protocol for reliable and ordered data transmission.


- **RESTful API:** Implements REST principles for structured and efficient communication between the frontend and backend.



## Features

### **Login and Signup** 
Foobar allows users to create accounts securely with a unique username and password. Key features include:
- **Create Account:** 
  - Users can securely create an account with a unique username and password.
    - **Password Requirements:** Contains at least 8 characters,Includes both letters and number.

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
  - 
<img width="916" alt="‏‏Feed" src="https://github.com/user-attachments/assets/66fad14e-983a-4382-b67a-e292c9ee81a3">
<img width="952" alt="Feed2" src="https://github.com/user-attachments/assets/ab15f9d9-d73b-4803-adfd-62823b706e4c">
<img width="948" alt="comments" src="https://github.com/user-attachments/assets/3c9f6b19-645c-4c63-a02f-92a37a9ba610">
<img width="951" alt="likes" src="https://github.com/user-attachments/assets/97f12a06-1c1b-40c1-bc02-ed0c26c9262f">


### **Profile Page**
The Profile page in Foobar provides users with an overview of their personal information and social connections. Key features include:

- **Edit Personal Details:** Users can easily update their display name, profile picture, and other personal information to keep their profile current and engaging.

- **View Friends:** Users can view a list of their friends, allowing them to keep track of their connections on the platform.

- **Friend Requests Management:** The Profile page allows users to accept or decline incoming friend requests, facilitating seamless social interactions.

- **User Interaction:** Users can explore additional options related to their friends and friend requests, enhancing their networking experience on Foobar.

This user-friendly interface ensures that managing personal profiles and social connections is efficient and intuitive.
  <img width="952" alt="edit-profile" src="https://github.com/user-attachments/assets/b1e05037-031c-4e95-b11c-2991d1adee97">
  <img width="1131" alt="‏‏לכידה" src="https://github.com/user-attachments/assets/41f0069f-64d6-462e-a972-b2b7ff773ad1">



## Running the client-side:

-**important note**: you will need also the clone and run the bloom-filter server (the web server comminucates with it) 
you can see the instructuins for it right here:
Bloom-Filter server: https://github.com/edenbdv/BloomFilter.git

### Running the Client with Docker

To run the client application using Docker, follow the steps below:

1. **Build the Docker Image**

First, navigate to the directory containing the `Dockerfile`. Then, run the following command to build the Docker image:

```bash
docker build -t facebook-clone-client .

This will create a Docker image named facebook-clone-client based on the instructions in the Dockerfile.

 2.  **Run the Docker Container**
-After building the Docker image, you can run the container using the following command:

```bash
docker run -p 3000:3000 --env-file .env facebook-clone-client
- Once the Docker container is running, open your browser and navigate to http://localhost:3000. You should be able to see and interact with the client application.

### Running the Client without Docker

## Dependencies

- **Frontend:**
  - React.js
  - React Router
  - Bootstrap
 

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
