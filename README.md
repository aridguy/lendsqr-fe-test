# Getting Started with Create React App

📁 Project Architecture (LENDSQR-like React + TypeScript)


LENDSQR/
├── node_modules/                  # Node dependencies
├── public/                        # Static public assets (favicon, index.html)
├── src/                           # All application source code
│
│   ├── Asset/                     # Static assets used throughout the app
│   │   ├── active-users.png
│   │   ├── home_img.png
│   │   ├── logo.svg
│   │   └── ... (other image assets)
│
│   ├── components/                # Reusable UI components
│   │   ├── DashboardLayout.jsx    # Layout wrapper for dashboard views
│   │   ├── Navbar.jsx             # Top navigation bar component
│   │   ├── Pagination.jsx         # Reusable pagination component
│   │   ├── PrivateRoute.jsx       # Protected route logic (auth guard) reusable
│   │   
│
│   ├── routes/                    # Route-based pages/views
│   │   ├── Dashboard.tsx          # Dashboard page after login
│   │   ├── Login.tsx              # Login page
│   │   └── NoPage.tsx             # 404 Page not found
│
│   ├── services/                  # API service calls (Axios/fetch setup)
│   │   └── api.tsx                # Central API configuration file
│
│   ├── App.tsx                    # Root app component (holds routing layout)
│   ├── App.css                    # Global styles
│   ├── index.tsx                  # React app entry point
│   ├── index.css                  # Base CSS (used in index.tsx)
│   ├── react-app-env.d.ts         # TypeScript environment declarations
│   └── logo.svg                   # App logo (used in multiple places)
│
├── package.json                   # Project dependencies and scripts
└── tsconfig.json                  # TypeScript configuration


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

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

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


