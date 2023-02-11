# hooloo

A frontend UI I built for a fictional streaming platform.

## Purpose

I built this application to improve my React skills and gain knowledge of modern react-router-dom hooks such as Route, Routes, useLocation, useNavigate, etc. 

## Functionality

This application:

- Is a SPA
- Allows the user to login and change their username/password.
- Fetches movie data from the OMDB api and displays it in movie card components.
- Allows the user to search for movies.
- Allows the user to star movies, which are then saved in the Starred page via localStorage.
- Has a Genres page that fetches movie data based on the specific genre the user chooses.
- Has an Account page that allows the user to change the default username and password.

## How To Use

**Default usename**: admin
**Default password**: admin

## Technologies Used

- HTML5
- CSS3
- SASS
- JavaScript
- React

## Disclaimer

The current version of this application stores username and password data in localStorage which is NOT a best practice. When creating a production level application, this type of data should be hashed, salted and stored in a database.

## Live

https://hooloo.netlify.app/
