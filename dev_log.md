# Pomotris

### MVP

* [ ] A pomodoro clock with a setting option for each session (25 min, 30 min and 50 min)
* [ ] A tetris-looking chart to show how much time user spend
* [ ] A weekly bar chart to show a user how much time she has spent during the week
* [ ] A daily table report to show a user names of tasks on each pomotris session
* [ ] Signup and login

### Prototype

Below, there are prototype images created on Figma

<img src="assets/clock_myPage.png" width="600" display="inline">

<img src="assets/signupLogin.png" width="600" display="inline">

---

### Specification

* [ ] When entering it goes to `/(home)`

**Timer**

* [ ] (pomodoro timer) user can set timer by clicking setting button (25, 50 for working time 5/10 for break)
* [ ] (pomodoro timer) once user choose working time/ break time, it decides which block to use for tetris
* [ ] (pomodoro timer) user can put name of task on `Enter your task form`
* [ ] (tetris chart) chart is has one block accumulated as default
* [ ] (tetris chart) total time is set `00:00`

* [ ] (pomodoro timer) before user clicks START button and a STOP button is disabled
* [ ] (pomodoro timer) after user clicks START button and a STOP button is abled
* [ ] (pomodoro timer) name of task will be displayed under the timer
* [ ] (pomodoro timer) user clicks START button and START button changes to PAUSE
* [ ] (pomodoro timer) user clicks PAUSE button, timer stops and PAUSE button changes to RESUME
* [ ] (pomodoro timer) user clicks PAUSE button, STOP button continues as STOP
* [ ] (pomodoro timer) user clicks STOP button without the set time has finished, it does not collect the data and goes back to initial point.(Reset time, START/STOP(disabled) button)
* [ ] (pomodoro timer) user clicks STOP button, it goes back to initial point.(Reset time, START(able)/STOP(disabled) button)

* [ ] (pomodoro timer) only working time will be accumulate on tetris chart (no break time block is considered)
* [ ] (pomodoro timer) once timer is finished, alert a popup with sound/ message 'your time is done. start your break time'
* [ ] (pomodoro timer, tetris chart) once timer is finished, tetris block accumulates on chart.
* [ ] (pomodoro timer, tetris chart) once timer is finished, total time is updated adding block unit (no breaking time)
* [ ] (pomodoro timer) once timer is finished, we collect block unit (working time), task name, entry time, end time.
* [ ] (pomodoro timer) once timer is finished, (logged in) it commits data to user DB. (no logged in) it saves to localStorage.
* [ ] (pomodoro timer) after alert pop is removed by user click, it display timer set to chosen break time( 5/10 min )
* [ ] (pomodoro timer, break time) user has STOP and SKIP button.
* [ ] (pomodoro timer, break time) user has click STOP and button changes to RESUME.
* [ ] (pomodoro timer, break time) user has click RESUME, timer starts and button changes to STOP.
* [ ] (pomodoro timer, break time) user has click SKIP, it goes back to initial point. (Reset time, START(able)/STOP(disabled) button)

* [ ] (tetris chart) tetris is played alone once the timer is finished.
* [ ] (tetris chart) when user hover a block, targeted block displays info tab with name of task

**Login/Logout**

* [ ] (without login) user can use pomodoro timer, can add task name, tetris chart.
* [ ] (without login) user data will be save on localStorage(cache) before login or signup.
* [ ] (without login) user cannot have access to statistics (myPage)
* [ ] (without login) On navbar, it shows `Log in` button on right side
* [ ] (without login) when user exceed 10 hour, tetris chart/task name/etc all data is reset
* [ ] (without login) when refresh, all data (stored at cache) is reset
* [ ] (without login) when click, `Log in` button, a modal pops up to give login/signup options

* [ ] (with login) previous data will not be save to DB
* [ ] (with login) once logged in, it goes to initial point. (Reset time, START(able)/STOP(disabled, tetris chart default)
* [ ] (with login) login button displays username
* [ ] (with login) username button has 3 drop down menus (myPage/logout/share)
* [ ] (with login) user clicks myPage, it goes goes to user dashboard where it shows statistics of weekly report
* [ ] (with login) user clicks share, user can choose media to share her _daily record_
* [ ] (with login) user clicks share, it generates a new page of chosen media for sharing
* [ ] (with login) user clicks log out, user logs out. Button changes to `Log in`.
* [ ] (with login) user clicks log out, it goes to initial point. (Reset time, START(able)/STOP(disabled, tetris chart default)

**Sign up**

* [ ] (sign up option) user click `Sign Up`, it display signup form.
* [ ] (sign up option) user click `Register`, validate data
* [ ] (sign up option) after validation, `Register` button becomes `Log in`
* [ ] (sign up option) user click `Log in`, it goes lead to log in page.

**My Page**

* [ ] (user dashboard) user click `My page`, we request data from DB
* [ ] (user dashboard) user click `My page`, it displays a bar chart of weekly activity
* [ ] (user dashboard) at upper right side of bar chart, it displays the date range (a week)
* [ ] (user dashboard) bar chart display 7 bars(records) of previous days including today date.
* [ ] (user dashboard) each bar display date
* [ ] (user dashboard) user click a bar, the bar changes color.
* [ ] (user dashboard) user click a bar, a table chart appears below
* [ ] (user dashboard) a table chart has task name, pomotris(block unit) and entry time columns
* [ ] (user dashboard) a table chart's last row shows total time
* [ ] (user dashboard) user click Pomotris logo on the left side of navbar, it goes back to timer at initial point.

---

### Stretch goal

* [ ] Share feature linked to Facebook and Twitter
* [ ] OAuth with Facebook
* [ ] Admin mode to delete user and more

### Stack

* Frontend: HTML5, CSS(possibly with LESS), React.js
* Backend: Node.js with Express.js
* Database: MySQL
* Testing: Jest/Enzyme for Frontend
* Atom & Github

### Architecture

<img src="assets/architecture.png" width="400" display="inline">

### Flowchart

<img src="assets/logIn.jpg" width="400" display="inline">
<img src="assets/signUp.jpg" width="400" display="inline">
<img src="assets/analystic.jpg" width="400" display="inline">
