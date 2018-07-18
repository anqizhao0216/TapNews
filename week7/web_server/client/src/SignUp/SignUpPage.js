import React from 'react';
import SignUpForm from './SignUpForm';
import PropTypes from 'prop-types';

class SignUpPage extends React.Component {

  constructor(props, context) {
      super(props, context);

      this.state = {
          errors: {},
          user: {
              email: '',
              password: '',
              confirm_password: ''
          }
      };

      this.processForm = this.processForm.bind(this);
      this.changeForm = this.changeForm.bind(this);
  }

  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();
    const email = this.state.user.email;
    const password = this.state.user.password;
    const confirm_password = this.state.user.confirm_password;

    console.log('email: ' + email);
    console.log('password: ' + password);
    console.log('confirm_password: ' + confirm_password);

    if(password !== confirm_password){
        console.log("password and confirm password don't match on submit!!!");
        return;
    }

    // Post login data
    fetch('http://localhost:3000/auth/signup', {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.user.email,
        password: this.state.user.password
      })
    }).then(response => {
      if (response.status === 200) {
        this.setState({
          errors: {}
        });

        this.context.router.replace('/login');
      } else {
        response.json().then(function(json) {
          console.log(json);
          const errors = json.errors ? json.errors : {};
          errors.summary = json.message;
          this.setState({errors});
        }.bind(this));
      }
    });
  }

  changeForm(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });

    if(this.state.user.password !== this.state.user.confirm_password) {
      const errors = this.state.errors;
      errors.password = "Password and Confirm Password don't match!";
      this.setState({errors});
    }else{
        const errors = this.state.errors;
        errors.password = '';
        this.setState({errors});
    }

  }

  render() {
    return (
      <SignUpForm
          onSubmit={this.processForm}
          onChange={this.changeForm}
          errors={this.state.errors}
          user={this.state.user}
      />
    );
  }
}

// To make react-router work
SignUpPage.contextTypes = {
    router: PropTypes.object.isRequired
};

export default SignUpPage;
