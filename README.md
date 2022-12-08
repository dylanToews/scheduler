# Interview Scheduler

The purpose of this project was to create a modern client application using the React view library. 

The application gives the user the ability to schedule appointments for available time slots with availabler mentors. 

The user is able to view, create, edit and delete appointments. The number of available spots for each day is shown on the side of the page and dynamically rendered based on current data. 

- Development focuses on a single page application (SPA) called Interview Scheduler, built using React.
- Data is persisted by the API server using a PostgreSQL database.
- The client application communicates with an API server over HTTP, using the JSON format.
- Jest tests were used through the development of the project.

*** This project was built as an educational assignment for Lighthouse Labs by Dylan Toews ***

## Screenshots

![Index and initial rendering](https://github.com/dylanToews/scheduler/blob/master/docs/index-page.png?raw=true)

![Shows user booking appointment](https://github.com/dylanToews/scheduler/blob/master/docs/enter-student-name.jpg.png?raw=true)

![Confirmation of delete appointment prior to implementation](https://github.com/dylanToews/scheduler/blob/master/docs/confirm-delete.png?raw=true)

## Setup

Install dependencies with `npm install`.

- react
- axios
- @testing-library/react-hooks
- react-test-renderer
...

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
