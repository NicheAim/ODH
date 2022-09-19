# OCP UI Coding Practices

This coding practices documentation is a companion documentation of [style guide](style-guide.md).

## Table of Contents

  1. [Select Right Component Type to Generate](#select-right-component-type-to-generate)
  1. [Redux Action Type Constant Naming Convention](#redux-action-type-constant-naming-convention)
  1. [Redux Saga Generator Function Convention](#redux-saga-generator-function-convention)
  1. [File Naming Convention](#file-naming-convention)
  1. [Routing Convention](#routing-convention)
  1. [In `componentDidMount()` to Get Data from Remote](#in-componentdidmount-to-get-data-from-remote)

## Select Right Component Type to Generate

  When use `npm run generate` to generate component:
  - For presentational component, select **Stateless Function** component.
  - For container component, select `React.Component`.

## Redux Action Type Constant Naming Convention
  - General: `<VERB IN PRESENT TENSE IN UPPER CASE>_<NOUN IN UPPER CASE>`
  - For Ajax call side effect related action types, follow this pattern to create three action types.
    - `<VERB IN PRESENT TENSE IN UPPER CASE>_<RESOURCE NAME IN UPPER CASE>`
    - `<VERB IN PRESENT TENSE IN UPPER CASE>_<RESOURCE NAME IN UPPER CASE>_SUCCESS`
    - `<VERB IN PRESENT TENSE IN UPPER CASE>_<RESOURCE NAME IN UPPER CASE>_ERROR`
    - Group these action type constants together when declaring them.
    - The verbs: GET, CREATE, UPDATE, SAVE (for both Creation and Update), DELETE

## Redux Saga Generator Function Convention
  - One component should have at most one corresponding saga.js file.
  - In saga.js, should follow Watcher Worker pattern to naming a generator function
    - Watcher function: `watch<Worker Function Name in PascalCase>Saga`
    - Worker function: `<Verb in camelCase><Noun in PascalCase>Saga`
  - If there are multiple watchers in one saga.js, should export a rootSaga by using yield all to run tasks in parallel:
  
    ```rootSaga
    export default function* rootSaga() {
      yield all([
        watchVerbNoun1Saga(),
        watchVerbNoun2Saga(),
      ]};
    }
    ```

## File Naming Convention
  - `render.js` - for ReactDOM.render factory for golden layout purpose
  - `api.js` - for backend Ajax call, will always utilize request.js
  - `styles.css` - for css used in a component. when imported, it will be like `import styles from './styles.css';`
  - For a component related to FHIR resource, we should use the FHIR resource name in the official FHIR documentation as part of the source code file name for the component 

## Routing Convention
  - Create, e.g create Healthcare Service
    - Route:  `/manage-ealthcare-service`
    - Container Component: `ManageHealthcareServicePage`
    - Presentational Component: `ManageHealthcareServicePage`
  - Edit, e.g edit Healthcare Service
    - Route:  `/manage-ealthcare-service/:id`
    - Container Component: `ManageHealthcareServicePage`
    - Presentational Component: `ManageHealthcareServicePage`
  - Any component to which can be routed should be a container component (even though it is not connected to anywhere and has no much logic) and should be suffixed with `Page`
  - Add helmet for each page container component configured in route (eg. Home page, Manage Practitioner page):
    - Answer Yes for `Do you want headers?` question when using `npm run generate` to generate container component


## In `componentDidMount()` to Get Data from Remote
  References:
  - [`componentDidMount`](https://reactjs.org/docs/react-component.html#componentdidmount)
  - [Where to Fetch Data: `componentWillMount` vs `componentDidMount`](https://daveceddia.com/where-fetch-data-componentwillmount-vs-componentdidmount/)
