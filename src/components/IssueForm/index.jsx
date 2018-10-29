import React from 'react';
import { PropTypes } from 'prop-types';
import { MdAttachFile, MdAudiotrack, MdInsertDriveFile } from 'react-icons/md';
import Select from 'react-select';

import { Input } from '../UI/Input';
import { StyledIssueForm, SmButton, Files, ProgressList } from './index.styles';
import { Textarea } from '../UI/Textarea';
import { Label } from '../UI/Label';
import { Button } from '../UI/Button';
import { Modal } from '../Modal';
import { FileUploadForm } from '../FileUploadForm';
import { Spinner } from '../UI/Spinner';

import { FilesList } from '../UI/FilesList';
import { FilePreviewItem } from '../UI/FilePreviewItem';
import { FilePreloader } from '../UI/FilePreloader';

export class IssueForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      issueTitle: props.issue.title || '',
      issueDescription: props.issue.description || '',
      issueFiles: props.issue.attachedFiles || [],
      showUploadFileForm: false,
      issueFor: props.issue.for || '',
    };
  }

  handleChangeInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value, showUploadFileForm: false, });
  }

  handleChangeSelect = (issueFor) => {
    this.setState({ issueFor });
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
      this.state.issueFor.value,
      this.props.issue.createdAt ? Date.now() : null,
    ];
    const { issueFiles } = this.state;

    if (this.props.issue.issueId) {
      this.props.onEditIssue({ issueData, issueFiles });
    } else {
      this.props.onCreateIssue({ issueData, issueFiles });
      // this.setState({
      //   issueTitle: '',
      //   issueDescription: '',
      //   issueFor: '',
      //   issueFiles: []
      // });
    }
  }

  render() {
    const {
      issueTitle, issueDescription, issueFiles, showUploadFileForm, issueFor
    } = this.state;
    const {
      users,
      uploadingFiles
    } = this.props;

    const options = users.map(user => ({ value: user.email.split('@')[0], label: user.email.split('@')[0], }));

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
          <Label htmlFor="for">
            <span>For</span>
            <Select id="for" name="issueFor" onChange={this.handleChangeSelect} value={issueFor} options={options} />
          </Label>
          <SmButton type="button" onClick={this.handleModal}><MdAttachFile /></SmButton>
          {issueFiles.length > 0 ?
            <Files>
              <p>{`Прикреплено файлов: ${issueFiles.length}`}</p>
              <FilesList>
                {
                  issueFiles.map(file => (
                    <li key={file.lastModified}>
                      <FilePreviewItem>
                        {
                          /* eslint-disable */
                          RegExp('image', 'i').test(file.type) ?
                          <div>
                            <img src={file.preview} alt={file.name} />
                          </div>
                            
                          : RegExp('audio', 'i').test(file.type) ? <MdAudiotrack /> : <MdInsertDriveFile />
                          /* eslint-disable */
                        }
                      </FilePreviewItem>
                    </li>
                  ))
                }
              </FilesList>
              {
                uploadingFiles && uploadingFiles.length > 0 ? (
                  <ProgressList>
                    {
                      uploadingFiles.map(item => (
                        <li key={item.name}>
                          {
                            item.progress !== 100 ?
                            <FilePreloader>
                              <Spinner />
                              <p>{item.progress.toFixed() + '%'}</p>
                            </FilePreloader>   
                            :
                            null
                          }
                        </li>
                      ))
                    }                         
                  </ProgressList>
                ) : (null)
              }
            </Files> : null}
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
  users: [],
  onEditIssue: null,
  onCreateIssue: null,
  uploadingFiles: [],
};

IssueForm.propTypes = {
  onCreateIssue: PropTypes.func,
  onEditIssue: PropTypes.func,
  users: PropTypes.arrayOf(PropTypes.any),
  issue: PropTypes.objectOf(PropTypes.any),
  uploadingFiles: PropTypes.array,
};
