# Starter Repository for Assignment
You are required to build your folder structures for your project.

1. Create Folders and Files. 
>bed-ca2-THIRI03
 >public
  >css
  >images
  >js
 >src
  >configs
   >createSchema
   >initTables.js
  >controllers
  >middlewares
   >bcryptMiddleware.js
   >jwtMiddleware.js
  >models
  >routes
  >services
   >db.js
  >app.js
 >.env
 >index.js

2. Created new database called "ca2_db"
3. Implement SQL statements to the initTables.js from CA1.
4. Prepare the createSchema.js file.
5. Prepare .env file
6. Implement the app.js file.
7. Implement codes for db.js
8. Implement codes for index.js.
9. Prepare new js files in the controller folder as in CA1.
10. Prepare new js files in the model folder as in CA1.
11. Prepare new js files in the routes folder as in CA1.
12. Implement codes for the controllers folder. 
13. Implement codes for the middlewares folder.
14. Implement codes for the models folder.
15. Install required modules such as (dotenv, express, nodemon, mysql2, bcrypt, etc)
16. Try running "npm run dev" to see if it works.
17. Add index.html, login.html and register.html
18. Add css files, color.css and style.css.
19. Plan the pages and the connections. 
20. Created userIntro.html(for the "How to" Page), showAllTasks.html, showAllRewards.html, showAllPets.html.


21. Coded the index.html (welcome page).
    1. Added a navbar, navbar color using bootstrap and linked the related pages according to the navbar. 
    //when the user is not logged in or registered, he will only be able to see the list of pet, task, reward and "how to" page (explanation of how the programme flows).
    2. Created a footer for the page. 

22. Implement the codes for register.html.
    1. Added Navbar.
    2. Added the Username, email, password and confirm password forms. 
    3. Added the footer. 
23. Created a registerUser.js file under js folder.
24. Coded for registerUser.js.
25. Created a file named getCurrentURL.js
    1. Implemented codes for getCurrentURL.js
26. Created a queryCmds.js
    1. Added fetchMethod function to the file.

27. Added a new column to the user table. 
    1. password
    2. created_on
    3. updated_on
    4. last_login_on

28. Make sure the register feature works giving a token. 
    register body
    {
        "username": "thiri"
        "email": "thiri@example.com"
        "password": "123456"
    }

29. Added loginUser.js file.
30. Work on login feature. 
    1. prepare login.html file with nav bar and require forms. 
    2. the require information on login are email and password. 

31. Added a Login Button to both register and login, added codes to redirect to login page when clicked. 
32. Added an png image from the web in both index, register and login pages, the source link is also commented. 
<https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Fso%2Fpets&psig=AOvVaw2sHgouTaJUWm1X4fVgstG8&ust=1706600005037000&source=images&cd=vfe&opi=89978449&ved=0CBUQjhxqFwoTCPjb1ciKgoQDFQAAAAAdAAAAABAJ>
33. commit until registeration and login page. 
34. Created a getPet.js file, to show the pets on showAllPets.html.
35. Use the cards to display the basic of the pets. 
 - just to show the pet names and the types
 - there is a view detail button to show more details of the pet.

36. Created a two new files,showSinglePetDetails.html and singlePet.js. 
37. Added codes for the two files mentioned. 
38. After the successful fetching of single pet details, added a button underneath which is linked to see all the pets. 
39. Created a file named getAllTasks.js.
40. Implemented task route in main routes.
41. Used <table></table>, bootstrap to display the task table. 
42. To get each task, getTaskDetails function is created. 
43. Created getAllRewards.js file to fetch the rewards. 
44. table created to display the rewards.
45. Created a userProfile.js. 
46. Created a table called messages for the message forum. 
47. Added new files named showAllMessages.html and messageForum.js. 
48. Prepare new files such as messagesController.js, messagesModel.js and messagesRoute.js.
49. Coded for message table. 
50. made changes to the userModel and userController to get the user_id for profile.html to be redirected. 
51. Updated a new background for body. 
52. Added a dropdown button in the nav bar in profile.html.
53. Created showUpdate.html and updateProfile.js for updating profile.

video recording link: https://ichatspedu-my.sharepoint.com/personal/thiriw12_23_ichat_sp_edu_sg/Documents/Recordings/Meeting%20with%20THIRI%20LAE%20WIN-20240203_054111-Meeting%20Recording.mp4?web=1&referrer=Teams.TEAMS-ELECTRON&referrerScenario=MeetingChicletGetLink.view.view

html > javascript 

1. index.html
2. login.html > loginUser.js
3. register.html > registerUser.js
4. showAllPets.html > getPets.js
5. showAllTask.html > getAllTasks.js
6. showAllRewards.html > getAllRewards.js
7. userIntro.html
8. profile.html > userProfile.js
9. updateProfile.html > updateProfile.js
10. showUserOwnedPets.html > getUserOwnedPets.js
11. showUserTask.html > getUserTask.js
12. showUserReward.html > getUserRewards.js
13. showSinglePetDetails.html > singlePet.js
14. showAllMessage.html > messageForum.js
15. addNewMessage.html > sendMessage.js
16. singleUserMessage.html > showUserMessage.js
17. showUpdateMessage.html > updateMessage.js
