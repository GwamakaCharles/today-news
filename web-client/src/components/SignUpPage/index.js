import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import "./index.scss";
import validateForm from "@/util/validateForm";
import { userAction } from "@/actions";
import { NavBar, InlineError } from "@/components/common";
import { userSelector, errorSelector } from "@/reducers/selectors";
import SignUpForm from "./SignUpForm";

class SignUpPage extends React.Component {
  state = {
    clientErrors: {},
    credentials: {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  };

  componentWillUnmount() {
    this.setState({
      credentials: {
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
      }
    });
  }

  redirectToLogin = () => {
    const { history } = this.props;
    history.push("/singin");
  };

  handleChange = e => {
    const { credentials } = this.state;
    const field = e.target.name;
    credentials[field] = e.target.value;
    this.setState({
      credentials
    });
    if (credentials.password !== credentials.confirmPassword) {
      const { clientErrors } = this.state;
      clientErrors.confirmPassword =
        "Password and Confirm Password don't match.";
      this.setState({ clientErrors });
    } else {
      const { clientErrors } = this.state;
      clientErrors.confirmPassword = "";
      this.setState({ clientErrors });
    }
  };

  handleRegister = e => {
    e.preventDefault();

    const {
      credentials,
      credentials: { username, email, password, confirmPassword }
    } = this.state;

    if (password === confirmPassword) {
      const clientErrors = validateForm.signup(credentials);
      this.setState({ clientErrors });

      if (Object.keys(clientErrors).length === 0) {
        const { fetchSignUpUser } = this.props;
        fetchSignUpUser({ username, email, password });
      }
    }
  };

  render() {
    const { clientErrors, credentials } = this.state;
    const { isUserLoggedIn, error } = this.props;
    return (
      <React.Fragment>
        {isUserLoggedIn && <Redirect to="/" />}
        <NavBar />
        <SignUpForm
          handleRegister={this.handleRegister}
          onChange={this.handleChange}
          redirectToLogin={this.redirectToLogin}
          clientErrors={clientErrors}
          credentials={credentials}
        />
        <br />
        {error && <InlineError text={error} />}
      </React.Fragment>
    );
  }
}

SignUpPage.propTypes = {
  fetchSignUpUser: PropTypes.func.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  error: PropTypes.string
};

const stateToProps = state => ({
  isUserLoggedIn: userSelector.getIsUserLoggedIn(state),
  error: errorSelector.getError(state)
});

const dispatchToProps = dispatch => ({
  fetchSignUpUser: credential => {
    dispatch(userAction.fetchSignUpUser(credential));
  }
});
export default connect(
  stateToProps,
  dispatchToProps
)(SignUpPage);
