import React from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import useInput from '../../hooks/use-input';

const Login = (props) => {
  const {
    value: enteredUsername,
    isValid: usernameIsValid,
    valueChangeHandler: usernameInputHandler,
    reset: resetUsername,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    valueChangeHandler: passwordInputHandler,
    reset: resetPassword,
  } = useInput((value) => value.trim() !== '');

  const submitHandler = (event) => {
    event.preventDefault();
  
    if (!usernameIsValid || !passwordIsValid) {
      // Show alert for incorrect login
      alert('Incorrect username and/or password! Please try again.');
      // Clear input fields for easier re-entry
      resetUsername();
      resetPassword();
      return; // Prevent further processing
    }
  
    // User input is valid, proceed with login logic
    props.logger(enteredUsername, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="username"
          label="Username"
          type="text"
          onChange={usernameInputHandler}
          isValid={true} // No constraint for username validation
        />
        <Input
          id="password"
          label="Password"
          type="password"
          onChange={passwordInputHandler}
          isValid={true} // No constraint for password validation
        />
        <h6 className={classes.error}>{props.error}</h6>

        <div className={classes.actions}>
          <Button
            type="submit"
            className={classes.btn}
            disabled={!usernameIsValid || !passwordIsValid}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
