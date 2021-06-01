# VvE Application
[![Build Status](https://travis-ci.com/KeithMarex/VvE-APP.svg?branch=main)](https://travis-ci.com/KeithMarex/VvE-APP)
![GitHub](https://img.shields.io/github/license/KeithMarex/VvE-APP)

The VvE App is intended as a central place for sharing information within a specific VvE.
The app was commissioned by Hicham Ben Yessef.


## Installing dependencies

Execute in 3 directories
`npm install`


## Running the applications

Serving the web application
`ng serve`

Serving the mobile application (Emulator needs to be running)
`expo start --android` or `expo start --ios` or `expo start`

Serving the api
`npm run start`


## Building the applications

Building the web application
`ng build --prod`

Building the mobile application
`We don't know yet`

Building the api
`npm run build`


## How to use

Here you can find extra information regarding using the whole project.

### Api

The api documentation is found when the api is running under `http://localhost:3000/api-docs`.
Documentation is added in the documentation folder within yaml files.
Using `npm run docu` wil process the yaml files and generate the json located in util/swagger.json.
The swagger.json file is hosted by the api not the yaml files those are for easy and clean documenting.

For running the api in production, PM2 and ![pm2-git-hook](https://github.com/jmensch1/pm2-git-hook) are used.
  - Starting the api `npm run prodstart`
  - Stopping the api `npm run prodstop`

The setup is in the ./API/ecosystem.config.js where an automatic command for git updates is.

Running the tests
`npm run test`

#### env
  - DATABASE_URL= mongodb://user:password@url:port/database?authSource=admin
  - ACCESS_TOKEN= secret
  - REFRESH_TOKEN= secret
  - PORT=3000
  - MAIL_USER=mail@gmail.com
  - MAIL_PASS=password
  - URL_IMGBB=https://api.imgbb.com/1/upload?key=secret

### Web application and App
The web application wil be working just like a website when application is build.
The app needs to be build with react native and will output the needed file for android/ios (Ios can only be built on apple device).


## Technologies used

- Angular (Web application)
  - Jasmine (Tests)
  - Karma (Tool for tests)
  - Compodoc (Documentation)

- Nodejs (Api)
  - Mongoose (ODM)
  - Swagger (Documentation)
  - Mocha (Testing)

- React native (Mobile application)
  - Esdoc (Documentation)
  - Jest (Testing)

## Made by

This application is made by Consultify.
  - Jan van Overbeek
  - Koen van der Marel
  - Jeroen Bol
  - Kaz Schraven
  - Jordy Koemans
  - Sander Scheenstra

You can contact us on: team@consultify.org
Check out our website!: https://www.consultify.org
![Logo-zwart-cropped](https://user-images.githubusercontent.com/25418123/112319672-95c75980-8cae-11eb-84a9-b9aaf29880bf.png)