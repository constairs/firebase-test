import React from 'react';
import { PropTypes } from 'prop-types';

import { Input } from '../UI/Input';
import { StyledIssueForm } from './index.styles';
import { Textarea } from '../UI/Textarea';
import { Label } from '../UI/Label';
import { Button } from '../UI/Button';


export class IssueForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      issueTitle: props.issue.title || '',
      issueDescription: props.issue.description || ''
    };
  }

  handleChangeInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const issueData = [
      this.props.issue.issueId || `id${(+new Date()).toString(16)}`,
      this.props.issue.createdAt || Date.now(),
      this.state.issueTitle,
      this.state.issueDescription,
      this.props.issue.createdAt ? Date.now() : null,
    ];

    if (this.props.issue.issueId) {
      this.props.onEditIssue(issueData);
    } else {
      this.props.onCreateIssue(issueData);
      this.setState({
        issueTitle: '',
        issueDescription: ''
      });
    }
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
        <Button>{this.props.issue.issueId ? 'Edit' : 'Create'}</Button>
      </StyledIssueForm>
    );
  }
}

IssueForm.defaultProps = {
  issue: {
    title: '',
    description: ''
  }
};

IssueForm.propTypes = {
  onCreateIssue: PropTypes.func.isRequired,
  onEditIssue: PropTypes.func.isRequired,
  issue: PropTypes.objectOf(PropTypes.any)
};
