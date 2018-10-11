import React from 'react';
import { PropTypes } from 'prop-types';

import { Input } from '../UI/Input';
import { StyledIssueForm } from './index.styles';
import { Textarea } from '../UI/Textarea';
import { Label } from '../UI/Label';
import { Button } from '../UI/Button';

export class CreateIssueForm extends React.Component {
  state = {
    issueTitle: '',
    issueDescription: ''
  };

  handleChangeInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const createIssueData = [
      Date.now(),
      this.state.issueTitle,
      this.state.issueDescription,
    ];
    this.props.onCreateIssue(createIssueData);
    this.setState({
      issueTitle: '',
      issueDescription: ''
    });
  }

  render() {
    const { issueTitle, issueDescription } = this.state;
    return (
      <StyledIssueForm onSubmit={this.handleSubmit}>
        <Label htmlFor="title">
          <span>Title</span>
          <Input id="title" name="issueTitle" onChange={this.handleChangeInput} value={issueTitle} />
        </Label>
        <Label htmlFor="description">
          <span>Description</span>
          <Textarea id="description" name="issueDescription" onChange={this.handleChangeInput} value={issueDescription} />
        </Label>
        <Button>Create</Button>
      </StyledIssueForm>
    );
  }
}

CreateIssueForm.propTypes = {
  onCreateIssue: PropTypes.func.isRequired,
};
