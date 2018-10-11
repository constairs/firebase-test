import React from 'react';
import { PropTypes } from 'prop-types';

import { Input } from '../UI/Input';
import { StyledLoginForm } from './index.styles';
import { Label } from '../UI/Label';
import { Button } from '../UI/Button';
import { ALink } from '../UI/ALink';

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
      <StyledLoginForm onSubmit={this.handleSubmit}>
        <Label htmlFor="email">
          <span>Email</span>
          <Input id="email" name="emailInput" onChange={this.handleChangeInput} value={emailInput} />
        </Label>
        <Label htmlFor="password">
          <span>Password</span>
          <Input id="password" name="passwordInput" onChange={this.handleChangeInput} value={passwordInput} />
        </Label>
        <ALink onClick={this.props.onResetPassword}>Забыли пароль?</ALink>
        <Button>Login</Button>
      </StyledLoginForm>
    );
  }
}

LoginForm.propTypes = {
  onLoginUser: PropTypes.func.isRequired,
  onResetPassword: PropTypes.func.isRequired
};
