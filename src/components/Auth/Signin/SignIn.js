import useInput from "../../../hooks/use-input";
import { useNavigate } from "react-router-dom";
import './SignIn.css'
const SignIn = () => {
  const isEmail = (value) => value.includes("@");
  const isPasswordLength = (value) => value.length > 5;
  let navigate = useNavigate();

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);
  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isPasswordLength);
  let formIsValid = false;
  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }
    console.log("Login Submitted!");
    console.log(emailValue);
    resetEmail();
    resetPassword();
  };
  const navigateToSignUp = () => {
    navigate("../signup", { replace: true });
  };
  const emailClasses = emailHasError ? "form-control invalid" : "form-control";
  return (
    <form onSubmit={submitHandler} className="align-middle">
      <h3>Sign In</h3>
      <div className={emailClasses}>
        <label htmlFor="name">E-Mail</label>
        <br />
        <input
          type="text"
          id="name"
          value={emailValue}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailHasError && (
          <p className="error-text">Please enter a valid email address.</p>
        )}
      </div>
      <div className={emailClasses}>
        <label htmlFor="name">Password</label>
        <br />
        <input
          type="text"
          id="name"
          value={passwordValue}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
        />
        {passwordHasError && (
          <p className="error-text">Please enter ateast 6 characters.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
      <p>
        Don't have an account? <span className="cursor-pointer green-color" onClick={navigateToSignUp}>Sign Up for free</span>
      </p>
    </form>
  );
};

export default SignIn;
