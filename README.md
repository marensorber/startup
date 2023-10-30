# startup

## Specification
On my application users will be able to learn more about themselves. After creating an account they will be able to take personality quizzes, view their results, and read more about their personality. 

#### Design
##### Login
![Login Page](loginpage.png)
##### Home Page Layout
![Home Page Design](homepage.png)
##### Active Quiz Page
![Active Quiz Design](activequiz.png)
##### Results Page
![Results Page](resultspage.png)

#### Key Features
- Secure login
- Ability to select between quizzes
- Clear display of quiz results
- Ability to save and view previous quiz attempts
- Progress bar that indicates user's progress to completion 
- Ability for users to delete old results

#### Technology Usage
**HTML** - Uses correct HTML structure, four HTML pages, one for login/register, one for the user's home page, one for the active quiz environment, and one for quiz results

**JavaScript** - Provides login, progress bar, displaying questions,, backend endpoint calls.

**Service** - Backend service with endpoints for:
- login/register
- retrieving old results
- submitting new results

**Database Data** - Store user information, results, and general data in the database. 

**Authentication** - Users login and register for accounts with secure credentials. All results will be saved and viewable upon logging into the application. 

**WebSocket Data** - Progress bar updates as users complete the quiz

**React** - Application ported to use the React web framework.


#### HTML Deliverable
**HTML pages** - 6 html files, one for login(index), home, user, results, quiz, and active quiz

**Links** - login links to home, which links to user and quiz, user links to results, quiz links to results and active quiz, activequiz links to home and results, and results links to home.

**Text** - There is textual content and image representations in all locations.

**Login/Register** - Input box and submit for register and login

**Database** - The user information and results represent data pulled from the database

**Websocket** - the progress bar represents the user's real time progress through the quiz

#### CSS Deliverable
I still have some work I'd like to do on the CSS for my application, but I have acheived the basic appearance of the pages. 

**Simon** - I looked over the Simon CSS and deployed it to my domain at simon.marensorber.com

**Header, footer, and main content body** 

**Navigation elements** - All links are operating well, and I've added home buttons to most of the pages that need it. The Logout button also redirects the user to the login page.

**Responsive to window resizing** - My app is flexible and looks good on my phone and in different window sizes.

**Application elements** - All the application elements are appearing roughly the way I'd like them to. 

**Application text content** - I have consistent fonts and layout of text. I may go back in and change the font, but it is currently serviceable.

**Application images** - I am still waiting on my final icons (My roommate who is an art major is designing them for me) but I have put in temporary ones until she's finished. 
