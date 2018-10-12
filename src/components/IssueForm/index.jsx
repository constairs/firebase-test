import React from 'react';
import { PropTypes } from 'prop-types';
import { MdAttachFile } from 'react-icons/md';

import { Input } from '../UI/Input';
import { StyledIssueForm, SmButton } from './index.styles';
import { Textarea } from '../UI/Textarea';
import { Label } from '../UI/Label';
import { Button } from '../UI/Button';
import { Modal } from '../Modal';
import { FileUploadForm } from '../FileUploadForm';


export class IssueForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      issueTitle: props.issue.title || '',
      issueDescription: props.issue.description || '',
      showUploadFileForm: false,
    };
  }

  handleChangeInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleOpenFileModal = () => {
    this.setState({
      showUploadFileForm: true,
    });
  }

  handleFileSend = (fileData) => {
    this.props.onUploadFile(fileData);
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
    const { issueTitle, issueDescription, showUploadFileForm } = this.state;
    return (
      <div>
        <StyledIssueForm onSubmit={this.handleSubmit}>
          <Label htmlFor="title">
            <span>Title</span>
            <Input id="title" name="issueTitle" onChange={this.handleChangeInput} value={issueTitle} />
          </Label>
          <Label htmlFor="description">
            <span>Description</span>
            <Textarea id="description" name="issueDescription" onChange={this.handleChangeInput} value={issueDescription} />
          </Label>
          <SmButton type="button" onClick={this.handleOpenFileModal}><MdAttachFile /></SmButton>
          <Button>{this.props.issue.issueId ? 'Edit' : 'Create'}</Button>
        </StyledIssueForm>
        <Modal
          component={FileUploadForm}
          show={showUploadFileForm}
          onFileSend={this.handleFileSend}
        />
      </div>
    );
  }
}

IssueForm.defaultProps = {
  issue: {
    title: '',
    description: ''
  },
  onEditIssue: null,
  onCreateIssue: null,
  onUploadFile: null,
};

IssueForm.propTypes = {
  onCreateIssue: PropTypes.func,
  onUploadFile: PropTypes.func,
  onEditIssue: PropTypes.func,
  issue: PropTypes.objectOf(PropTypes.any)
};
