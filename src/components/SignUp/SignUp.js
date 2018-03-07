import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const SignUpPage = () =>
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        username: '',
        email: '',
        passwordOne: '',
        passwordTwo: '',
        error: null
    }
  }

  onSubmit(event) {
    const {
        username,
        email,
        passwordOne,
      } = this.state;
  
      auth.doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
          this.setState(() => ({ username: '',
          email: '',
          passwordOne: '',
          passwordTwo: '',
          error: null}));
        })
        .catch(error => {
          this.setState({'error': error});
        });
  
      event.preventDefault();
  }

  render() {
    const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    username === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={username}
          onChange={event => this.setState({'username': event.target.value})}
          type="text"
          placeholder="Full Name"
        />
        <input
          value={email}
          onChange={event => this.setState({'email': event.target.value})}
          type="text"
          placeholder="Email Address"
        />
        <input
          value={passwordOne}
          onChange={event => this.setState({'passwordOne': event.target.value})}
          type="password"
          placeholder="Password"
        />
        <input
          value={passwordTwo}
          onChange={event => this.setState({'passwordTwo': event.target.value})}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

const SignUpLink = () =>
  <p>
    Don't have an account?
    {' '}
    <Link to={"/signup"}>Sign Up</Link>
  </p>

export default SignUpPage;

export {
  SignUpForm,
  SignUpLink,
};