# App Info

* Created a Crypto List Details application using React.js. The application starts with the list screen.
* By default, 50 items are displayed on the first page. Users can change the page number and the number of rows displayed.
* Using the currency filter, users can switch currencies and view data in the selected currency.
* A search box allows users to search by the name or symbol of a cryptocurrency entity.
* The search box includes an autocomplete feature showing the last 10 recent searches.
* The total results are displayed on the right side of the currency filter for better clarity.
* Key details are displayed on the list screen. Clicking on a row redirects users to the details page for the selected cryptocurrency.
* The details page displays all relevant information about the selected cryptocurrency, including details in the chosen currency.
* Toaster notifications are used to display success and error messages.
* The application is responsive, with CSS rules added for smaller screen widths. Sizes are defined in rem units to improve accessibility.
* The codebase is optimized with configurable and reusable components for maintainability.
* Data caching is implemented for 15 minutes to reduce API calls after the cache expires.
* The crypto list details are stored in IndexedDB, while selectedCurrency and recentSearches are stored in localStorage to demonstrate different storage methods.
* Test cases have been written for multiple files to ensure application stability.
* The application is deployed on Vercel: https://crypto-list-currency-assignment-ss83.vercel.app/
* Local Code Recording: https://drive.google.com/file/d/1b3EG9bKsKlYUi81sU1qs8wfbJuabxWXI/view?usp=sharing
* Application Walkthrough Recording: https://drive.google.com/file/d/1idNeTTibAgz-zIqq5bkgT-U7_GLYUyQW/view?usp=sharing
* Test Cases: https://drive.google.com/file/d/1-Rf0mCkN931yhEqbBbwi7h0dhTp8YcG9/view?usp=sharing

Create React App Details

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
