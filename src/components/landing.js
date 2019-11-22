import React, { Component } from 'react';
import './App.css';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({formErrors, ...rest})  => {
  let valid = true;

  // validate form errors being empty 
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });


  //validate the form was filled out 
  Object.values(rest).forEach(val => {
    val=== null && (valid = false );
  });
  return valid;
}


class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      }
    };

  }
  handleSubmit = e => {
    e.preventdefault();
    if (formValid(this.state)) {
      console.log(`
      --SUBMITTING--
      First Name: ${this.state.firstName}
      Last Name: ${this.state.lastName}
      Email: ${this.state.email}
      Password: ${this.state.password}
    `);
    } else {
      console.error('From INVALID - DISPLAY ERROR MESSAGE');
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "email":
        formErrors.email =
          emailRegex.test(value)
            ? ""
            : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state; // this is re rendered everytime the state is changed. 
    return (
      <div className="wrapper">
        <div className="from-wrapper">
          <h1> Appointment Booking App </h1>
          <h2>Create Account</h2>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input className={formErrors.firstName.length > 0 ? "error" : null } placeholder="First Name" type="text" name="firstName" noValidate
                onChange={this.handleChange}
              />
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span> // which makes this property more readable
              )}
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input className={formErrors.lastName.length > 0 ? "error" : null }  placeholder="Last Name" type="text" name="lastName" noValidate
                onChange={this.handleChange} 
              />
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span> // which makes this property more readable
              )}
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input className={formErrors.email.length > 0 ? "error" : null }  placeholder="Email" type="email" name="email" noValidate
                onChange={this.handleChange} 
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span> // which makes this property more readable
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input className={formErrors.password.length > 0 ? "error" : null } placeholder="Password" type="password" name="password" noValidate
                onChange={this.handleChange} 
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span> // which makes this property more readable
              )}
            </div>
            <div className="createAccount">
              <button type="submit"> Create Account</button>
              <small>Already have an acount ?</small>
            </div>
          </form>
        </div>
        <h3>OR</h3>
        <div className = "googlelogin">
           <button type="login">Login with Google</button>
        </div>
      </div>
    );
  }
}

export default Landing;
