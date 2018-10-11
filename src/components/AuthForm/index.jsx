import React from 'react';
import { PropTypes } from 'prop-types';

import { Input } from '../UI/Input';
import { Form } from '../UI/Form';
import { Label } from '../UI/Label';
import { Button } from '../UI/Button';

export class AuthForm extends React.Component {
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
    const createUserData = [
      this.state.emailInput,
      this.state.passwordInput
    ];
    this.props.onCreateUser(createUserData);
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
        <Button>Auth</Button>
      </Form>
    );
  }
}

AuthForm.propTypes = {
  onCreateUser: PropTypes.func.isRequired
};
