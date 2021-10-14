import React from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/homepage/homepage.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument, db } from "./firebase/firebase.utils";
import { onAuthStateChanged } from "@firebase/auth";
import { onSnapshot } from "firebase/firestore";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    ///THIS DOES NOT WORK!
    // this.unsubscribeFromAuth = onAuthStateChanged(
    //   auth,
    //   (userAuth) => async () => {
    //     if (userAuth) {
    //       const userRef = await createUserProfileDocument(userAuth);

    //       console.log("I'm working. Ha ha ha!", userRef);
    //       onSnapshot(userRef, (doc) => {
    //         this.setState({
    //           currentUser: {
    //             id: userRef.id,
    //             ...doc.data(),
    //           },
    //         });
    //         console.log("I am logging the state in App.js", this.state);
    //       });
    //     } else {
    //       this.setState({ currentUser: userAuth });
    //     }
    //   }
    // );

    this.unsubscribeFromAuth = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        createUserProfileDocument(userAuth).then((userData) =>
          onSnapshot(userData, (doc) => {
            this.setState({
              currentUser: {
                id: userData.id,
                ...doc.data(),
              },
            });
            console.log("I am logging the state in App.js", this.state);
          })
        );
      } else {
        this.setState({ currentUser: userAuth });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    // FUNCTION TO READ FROM DB
    // const myReadFunction = async () => {
    //   const docRef = doc(db, "users", "FirstUser");
    //   const docSnap = await getDoc(docRef);

    //   if (docSnap.exists()) {
    //     console.log("Document data: ", docSnap.data());
    //   } else {
    //     console.log("No such document!");
    //   }
    // };
    // myReadFunction();

    // Function to WRITE to DB
    // const myAsyncFunction = async () => {
    //   const citiesRef = collection(db, "users");

    //   await setDoc(doc(citiesRef, "FirstUser"), {
    //     displayName: "The Great Minskis",
    //   });
    // };
    // myAsyncFunction();
    //////////////////////////////
    /////////////////////////////

    // const querySnapshot = getDocs(collection(db, "users")).then((data) =>
    //   console.log(data)
    // );

    // console.log(querySnapshot.id, querySnapshot.data());

    // querySnapshot.forEach((doc) => {
    //   console.log(`${doc.id} => ${doc.data()}`);
    // });

    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route
            exact
            path="/"
            render={() => <HomePage currentUser={this.state.currentUser} />}
            // component={<HomePage currentUser={this.state.currentUser} />}
          />
          <Route path="/signin/" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
