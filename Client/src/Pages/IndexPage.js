import React from "react";
import Card from "../components/UI/Card/Card";
import classes from "../components/Home/Home.module.css";
import Button from "../components/UI/Button/Button";
import { Link } from "react-router-dom";

const IndexPage = (props) => {
  return (
    <div className={classes.center}>
      <Card className={classes.home}>
        <div className={classes.introSection}>
          <h1>Welcome to Group 7 Dashboard</h1>
          <p>
            
          </p>
          <div className={classes.buttons}>
            <Link to="/user/login">
              <Button>Login</Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default IndexPage;
