import React from 'react';
import { PropTypes } from 'prop-types';

import { Input } from '../UI/Input';
import { Form } from '../UI/Form';
import { Label } from '../UI/Label';
import { Button } from '../UI/Button';

export class ResetForm extends React.Component {
  state = {
    emailInput: '',
  };

  handleChangeInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onResetPassword(this.state.emailInput);
    this.setState({
      emailInput: '',
    });
  }

  render() {
    const { emailInput } = this.state;
    return (


      <Form onSubmit={this.handleSubmit}>
        <Label htmlFor="email">
          <span>Email</span>
          <Input id="email" name="emailInput" onChange={this.handleChangeInput} value={emailInput} />
        </Label>
        <Button>Send</Button>
      </Form>
    );
  }
}

ResetForm.propTypes = {
  onResetPassword: PropTypes.func.isRequired
};
