import React from 'react';
import { PropTypes } from 'prop-types';

import { Input } from '../UI/Input';
import { Form } from '../UI/Form';
import { Label } from '../UI/Label';
import { Button } from '../UI/Button';

export class LoginForm extends React.Component {
  state = {
    emailInput: '',
    passwordInput: ''
  };

  handleChangeInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const loginUserData = [
      this.state.emailInput,
      this.state.passwordInput
    ];
    this.props.onLoginUser(loginUserData);
    this.setState({
      emailInput: '',
      passwordInput: ''
    });
  }

  render() {
    const { emailInput, passwordInput } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Label htmlFor="email">
          <span>Email</span>
          <Input id="email" name="emailInput" onChange={this.handleChangeInput} value={emailInput} />
        </Label>
        <Label htmlFor="password">
          <span>Password</span>
          <Input id="password" name="passwordInput" onChange={this.handleChangeInput} value={passwordInput} />
        </Label>
        <Button>Login</Button>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  onLoginUser: PropTypes.func.isRequired,
};
