import React from 'react';
import { PropTypes } from 'prop-types';

import { Input } from '../UI/Input';
import { Form } from '../UI/Form';
import { Label } from '../UI/Label';
import { Button } from '../UI/Button';

export class UpdateUserForm extends React.Component {
  state = {
    nameInput: '',
    imageUrlInput: ''
  };

  handleChangeInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const updateUserData = [
      this.state.nameInput,
      this.state.imageUrlInput
    ];
    this.props.onUpdateUser(updateUserData);
    this.setState({
      nameInput: '',
      imageUrlInput: ''
    });
  }

  render() {
    const { nameInput, imageUrlInput } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Label htmlFor="email">
          <span>Name</span>
          <Input id="email" name="nameInput" onChange={this.handleChangeInput} value={nameInput} />
        </Label>
        <Label htmlFor="password">
          <span>Image url</span>
          <Input id="password" name="imageUrlInput" onChange={this.handleChangeInput} value={imageUrlInput} />
        </Label>
        <Button>Confirm update</Button>
      </Form>
    );
  }
}

UpdateUserForm.propTypes = {
  onUpdateUser: PropTypes.func.isRequired,
};
