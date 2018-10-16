import React from 'react';
import PropTypes from 'prop-types';
import {
  MdInsertDriveFile,
  MdClose,
  MdImage
} from 'react-icons/md';

import { FilePreviewItem } from '../UI/FilePreviewItem';
import { Button } from '../UI/Button';

export class FileItem extends React.Component {
  handleClearFile = () => {
    this.props.onClickRemove(this.props.lastModified);
  }

  render() {
    const {
      type,
      size,
    } = this.props;
    return (
      <li>
        <Button type="button" onClick={this.handleClearFile}>
          <MdClose />
        </Button>
        <FilePreviewItem>
          {
                RegExp('image', 'i').test(type) ?
                  <MdImage />
                : <MdInsertDriveFile />
              }
        </FilePreviewItem>
        <p>{size} кб</p>
      </li>
    );
  }
}

FileItem.propTypes = {
  onClickRemove: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  lastModified: PropTypes.number.isRequired,
};
