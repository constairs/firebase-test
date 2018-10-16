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
      issueFiles: props.issue.attachedFiles || [],
      showUploadFileForm: false,
    };
  }

  handleChangeInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value, showUploadFileForm: false, });
  }

  handleModal = () => {
    this.setState({
      showUploadFileForm: !this.state.showUploadFileForm,
    });
  }

  handleFileSend = (files) => {
    this.setState({
      issueFiles: files,
    });
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
    const { issueFiles } = this.state;

    if (this.props.issue.issueId) {
      this.props.onEditIssue({ issueData, issueFiles });
    } else {
      this.props.onCreateIssue({ issueData, issueFiles });
      this.setState({
        issueTitle: '',
        issueDescription: '',
        issueFiles: []
      });
    }
  }

  render() {
    const {
      issueTitle, issueDescription, issueFiles, showUploadFileForm
    } = this.state;
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
          <SmButton type="button" onClick={this.handleModal}><MdAttachFile /></SmButton>
          {issueFiles.length > 0 ? `Прикреплено файлов: ${issueFiles.length}` : null}
          <Button type="submit" disabled={!issueTitle}>{this.props.issue.issueId ? 'Edit' : 'Create'}</Button>
        </StyledIssueForm>
        <Modal
          component={FileUploadForm}
          show={showUploadFileForm}
          onFileSend={this.handleFileSend}
          attachedFiles={issueFiles}
          onCloseModal={this.handleModal}
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
};

IssueForm.propTypes = {
  onCreateIssue: PropTypes.func,
  onEditIssue: PropTypes.func,
  issue: PropTypes.objectOf(PropTypes.any)
};
