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
    uploadedFile: [],
    fileToUpload: '',
    errorUpload: ''
  };

  handleTextInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleFileForm = (e) => {
    e.preventDefault();
    const fileData = [
      ...this.state.uploadedFile,
    ];
    this.props.onFileSend(fileData);
    this.setState({
      uploadedFile: [],
      fileUploadModal: false,
      fileToUpload: '',
      fileMessageText: '',
    });
  };

  fileUploadModal = () => {
    this.setState({ fileUploadModal: !this.state.fileUploadModal });
  };

  handleDropFile = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.setState({
          fileToUpload: file,
        });
        this.setState({
          uploadedFile: [file, file.name, file.type, file.size],
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

  handleClearFile = () => {
    this.setState({
      uploadedFile: [],
      fileToUpload: '',
      fileMessageText: '',
    });
  }

  render() {
    const {
      fileToUpload,
      fileMessageText,
      errorUpload
    } = this.state;
    return (
      <StyledForm onSubmit={this.handleFileForm}>
        <StyledDropzone onDrop={this.handleDropFile} />
        {fileToUpload ? (
          <div>
            <p>Файл для отправки</p>
            <div>
              <Button onClick={this.handleClearFile}>
                <MdClose />
              </Button>
              <FilePreviewItem>
                <MdInsertDriveFile />
              </FilePreviewItem>
              <p>{fileToUpload.size} кб</p>
            </div>
          </div>
      ) : null}
        {errorUpload || null}
        <Input
          type="text"
          placeholder="Сообщение"
          name="fileMessageText"
          value={fileMessageText}
          onChange={this.handleTextInput}
          disabled={!fileToUpload}
        />
        <Button type="submit">Отправить</Button>
      </StyledForm>
    );
  }
}

FileUploadForm.propTypes = {
  onFileSend: PropTypes.func.isRequired,
};
