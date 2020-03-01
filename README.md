# FrontendInterviewTest

# Test exam on frontend developer vacancy
## The guidance for the test task.
For resolving the task it is allowed and necessary to use any frameworks and components which would save your time and allow to solve the task optimally. However, we ask you to provide short description of frameworks or libraries that were used and what for.
 
## Practical test

 - We dont have full detailed requirements to the system functionality here as they are not necessary in this task and you are allowed to make certain assumptions. The purpose of this task is to assess your practice skills of developing and designing the client part of web applications.
 - All calls to the API / server-side must be mocked.
 - We dont provide design of the screens here, so the level of design / pixel perfect layout will not be evaluated here.
 - The layout of all screens must be adaptive - to support different sizes of device screens, including mobile screens.
 - Big advatage would be to think through and design corresponding toolset to support future scalability of the project  

### Payment terminal for the cell providers 

Develop (HTML/CSS-coding and implement client-side logic) application interface for the terminal providing the service of refilling the balance of cellular operators. The application should have the following screens / basic input and control elements:

1. Main screen
  - The list of supported telecom operators: MTS, Beeline, Megafon (implement flexibility to extend list of supported operators).
  - Click on certain operator should redirec to the refilling screen.
2. Refill balance form
  - Identifier of the selected operator
  - Phone number input field (with mask and validation)
  - The field for entering the amount of refill in rubles (with mask and validation, min possible amount - 1 rub, max - 1000 rubles)
  - Submit button - should wait for a response from the server, show a message about the success or error. In case of success, return to the main screen. Success and error should be implemented randomly.
 

## Comments

The result of your work should be published here, on github. You should send us link to github repository with source code and a link to the working version of the app (for this you can use github pages or any other hosting).

If you have questions, you can always ask them by contacting the person who gave you the task.

## Angular CLI README Information

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
