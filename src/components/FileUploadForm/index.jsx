import React from 'react';
import PropTypes from 'prop-types';
import {
  MdInsertDriveFile,
  MdClose
} from 'react-icons/md';

import { StyledForm } from './index.styles';
import { FilePreviewItem } from '../UI/FilePreviewItem';
import { StyledDropzone } from '../UI/StyledDropzone';
import { Button } from '../UI/Button';
import { Input } from '../../components/UI/Input';

export class FileUploadForm extends React.Component {
  state = {
    fileMessageText: '',
    uploadedFiles: [],
    errorUpload: ''
  };

  handleTextInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleDropFile = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.setState({
          uploadedFiles: [...this.state.uploadedFiles, file],
        });
      };
      reader.onerror = () => {
        this.setState({
          errorUpload: 'Ошибка загрузки файла'
        });
      };
      reader.readAsBinaryString(file);
    });
  };

  handleFileForm = (e) => {
    e.preventDefault();
    this.props.onFileSend(this.state.uploadedFiles);
    this.setState({
      uploadedFiles: [],
      fileMessageText: '',
    });
  };

  handleClearFile = () => {
    this.setState({
      uploadedFiles: [],
      fileMessageText: '',
    });
  }

  render() {
    const {
      uploadedFiles,
      fileMessageText,
      errorUpload
    } = this.state;
    return (
      <StyledForm onSubmit={this.handleFileForm}>
        <StyledDropzone onDrop={this.handleDropFile} />
        {uploadedFiles.length > 0 ? (
          <div>
            <p>Файлы для отправки</p>
            {
              uploadedFiles.map(file => (
                <div key={file.lastModified}>
                  <Button onClick={this.handleClearFile}>
                    <MdClose />
                  </Button>
                  <FilePreviewItem>
                    <MdInsertDriveFile />
                  </FilePreviewItem>
                  <p>{file.size} кб</p>
                </div>
              ))
            }
          </div>
      ) : null}
        {errorUpload || null}
        <Input
          type="text"
          placeholder="Сообщение"
          name="fileMessageText"
          value={fileMessageText}
          onChange={this.handleTextInput}
          disabled={!uploadedFiles}
        />
        <Button type="submit">Отправить</Button>
      </StyledForm>
    );
  }
}

FileUploadForm.propTypes = {
  onFileSend: PropTypes.func.isRequired,
};
