# react-firebase-sign-up-login

This is a React app that uses Firebase to login users and save their data.

## Features

- No Redux
- Firebase authentication (Web version 9 - modular)
- Cloud Firestore database (Web version 9 - modular)

## Installation

- Install my-project with git clone:

```bash
  git clone https://github.com/GAlexandruD/react-firebase-sign-up-login.git
  cd react-firebase-sign-up-login
  yarn
```

- Make a file named "react-firebase-sign-up-login.apikey.js" in "src/firebase/"

```bash
  touch src/firebase/react-firebase-sign-up-login.apikey.js
```

- Add your API Key details from Firebase so the file looks like this:

```bash
export const localApiKey = {
   apiKey: "Your firebase apiKey",
   authDomain: "Your firebase authDomain",
   projectId: "Your firebase projectID",
   storageBucket: "Your firebase storageBucket",
   messagingSenderId: "Your firebase messagingSenderId",
   appId: "Your firebase appId",
 };
```
