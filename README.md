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

Serving the mobile application
`ns run android` or `ns preview`

Serving the api
`npm run start`


## Building the applications

Building the web application
`ng build --prod`

Building the mobile application
`We don't know yet`

Building the api
`Compling typescript to javascript`



## How to use

The api documentation is found when the api is running under `http://localhost:3000/api-docs`.
Documentation is added in the documentation folder within yaml files.
Using `npm run docu` wil process the yaml files and generate the json located in util/swagger.json.
This file is hosted when navigation to `/api-docs`.

The web application wil be working just like a website when application is build.
The app needs to be build with nativescript and will output the needed file for android/ios.



## Technologies used

- Angular (Web application)
  - Jasmine (Tests)
  - Karma (Tool for tests)
  - Compodoc (Documentation)

- Nodejs (Api)
  - Mongoose (ODM)
  - Swagger (Documentation)
  - Mocha (Testing)

- Native script (Mobile application)

## Made by

This application is made by Consultify.
You can contact us on: team@consultify.org
Check out our website!: https://www.consultify.org
![Logo-zwart-cropped](https://user-images.githubusercontent.com/25418123/112319672-95c75980-8cae-11eb-84a9-b9aaf29880bf.png)

