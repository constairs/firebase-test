import React from 'react';
import PropTypes from 'prop-types';

import { StyledForm } from './index.styles';
import { StyledDropzone } from '../UI/StyledDropzone';
import { FilesList } from '../UI/FilesList';
import { FileItem } from '../FileItem';
import { Button } from '../UI/Button';

export class FileUploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedFiles: props.attachedFiles || [],
      errorUpload: ''
    };
  }

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
    });
  };

  handleRemoveFile = (del) => {
    this.setState({
      uploadedFiles: this.state.uploadedFiles.filter(item => item.lastModified !== del),
    });
  }

  render() {
    const {
      uploadedFiles,
      errorUpload
    } = this.state;
    return (
      <StyledForm onSubmit={this.handleFileForm}>
        <StyledDropzone onDrop={this.handleDropFile} />
        {uploadedFiles.length > 0 ? (
          <div>
            <p>Файлы для отправки</p>
            <FilesList>
              {
              uploadedFiles.map(file => (
                <FileItem
                  key={file.lastModified}
                  lastModified={file.lastModified}
                  type={file.type}
                  name={file.name}
                  size={file.size}
                  onClickRemove={this.handleRemoveFile}
                />
              ))
            }
            </FilesList>
          </div>
      ) : null}
        {errorUpload || null}
        <Button type="submit">Отправить</Button>
      </StyledForm>
    );
  }
}

FileUploadForm.defaultProps = {
  attachedFiles: [],
};

FileUploadForm.propTypes = {
  onFileSend: PropTypes.func.isRequired,
  attachedFiles: PropTypes.arrayOf(PropTypes.any),
};
