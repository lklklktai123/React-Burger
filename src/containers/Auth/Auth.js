import React, { useState, useEffect } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidity } from '../../shared/utility';
const Auth = props => {
  const [controls, setControls] = useState({
    email: {
      elementType: 'input',
      elementConfig: { type: 'email', placeholder: 'Mail Address' },
      value: '',
      validation: {
        require: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: 'input',
      elementConfig: { type: 'password', placeholder: 'Password' },
      value: '',
      validation: {
        require: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });
  const [isSignup, setIsSingnup] = useState(true);
  const { buildingBurger, setAuthRidirectPath, onSetAuthRedirectPath } = props;
  useEffect(() => {
    if (!buildingBurger && setAuthRidirectPath !== '/') {
      onSetAuthRedirectPath();
    }
  }, [buildingBurger, setAuthRidirectPath, onSetAuthRedirectPath]);

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          controls[controlName].validation
        ),
        touched: true,
      }),
    });
    setControls(updatedControls);
  };
  const submitHandler = event => {
    event.preventDefault();
    props.onAuth(controls.email.value, controls.password.value, isSignup);
  };
  const swithAuthModeHandler = () => {
    setIsSingnup(!isSignup);
  };

  const formElementArray = [];
  for (const key in controls) {
    formElementArray.push({
      id: key,
      config: controls[key],
    });
  }
  let form = formElementArray.map(formElementArray => (
    <Input
      key={formElementArray.id}
      elementType={formElementArray.config.elementType}
      elementConfig={formElementArray.config.elementConfig}
      value={formElementArray.config.value}
      changed={event => inputChangedHandler(event, formElementArray.id)}
      invalid={!formElementArray.config.valid}
      shouldValidate={formElementArray.config.validation}
      touched={formElementArray.config.touched}
    />
  ));
  if (props.loading) {
    form = <Spinner />;
  }
  let errorMessage = null;
  if (props.error) {
    errorMessage = <p>{props.error.message}</p>;
  }
  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }
  return (
    <div className={classes.Auth}>
      {authRedirect}
      {errorMessage}
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType="Success">SUBMIT</Button>
      </form>
      <Button btnType="Danger" clicked={swithAuthModeHandler}>
        SWITCH TO {isSignup ? 'SIGN IN' : 'SIGNUP'}
      </Button>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
  };
};
const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
