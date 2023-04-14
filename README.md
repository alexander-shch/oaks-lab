# Phase planner
About: 

Every startup goes through several stages. In every stage, there are necessary steps to be accomplished.
Create a simple application that documents this progress.

Every phase can have an unlimited amount of tasks
- If the startup accomplishes all tasks in the phase, it’s marked as done and unlocks the next phase.
- Tasks cannot be marked as completed unless all tasks in the previous phase were completed.
- Propose and implement a solution how to reopen (undo) a task.


What was done int this project?
- We can create (inject) a new list for different startups/phase planning
- We can edit that already created steps
- We can continue with the next phase only if all tasks were completed
- We can toggle between different phase planners
- On completion a random fact will be displayed (Can be refreshed)
- All data is stored in LocalStorage and no DB/API is required to run this example

Need to be done
- Create Phase planner (Remove the default injector), this need to be set via a dynamic form, can use formik or json forms for implementation (Not a must)
- - A user can have more than 1 phase
- - Each Phase can have more than 1 task
- - Tasks can be re-ordered (Sorted)
- - Be able to set icons for Phases and tasks for visibility
- - Nice to have, be able to assign a specific user to a task or the entire Phase
- Create Phase edit form, re-use the above implementation
- Defined the Phase planner rule mode (Phases might require different behaviors)
- - Dynamic - A user can toggle any task in any phase (Agile approach)
- - Waterfall - A user can complete a task only after the previous task was completed
- - Strict - Same as Waterfall but a user can not toggle tasks e.g can not set a task as not completed after he completed it
- - - Make sure to create some kind of a prompt on completing a task to make sure the user understands that this can not be undone.
- - - Only an admin or a manager can undo this step (Relying on role base user auth was already implemented)
- - More rules behaviors might be added later
- Let the user decide which stepper design he wants to use, can be found [here](https://mui.com/material-ui/react-stepper/) with more examples
- Make sure to connect to an API
- - Base structure can be found [here](https://github.com/alexander-shch/oaks-lab/blob/main/src/modules/PhasePlanner/models/index.ts)
- - We can discuss the structure on a later stage to make sure we cover all required use cases + leave space for custom requirements in the future

**Some phase tasks might require sub-tasks, make sure to define the schema with availability for children tasks (To keep in mind)**


# To get started
Do not use the public folder as the deployed path might vary and it's not consistent to where the project is in the directory

To be able to run the project make sure to run installation for all packages first by running `npm install` or `yarn`. This specific project was created using `yarn`, you can use `npm` if it's simpler or preferred, just to be noticed that in that case the `lock` file will be ignored

After installing all dependencies just run `yarn start` and open the browser on `localhost:3000`

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
