import "./homepage.styles.scss";

const HomePage = ({ currentUser }) => {
  return (
    <div className="homepage">
      <h1>Welcome to the homepage!</h1>

      {currentUser && <h3>You are logged in as: {currentUser.displayName} </h3>}
      {!currentUser && <h3>You are not logged in.</h3>}
    </div>
  );
};

export default HomePage;
