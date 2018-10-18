import React from 'react';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import { MdInsertDriveFile, MdAudiotrack } from 'react-icons/md';

import { Button } from '../UI/Button';
import { ALink } from '../UI/ALink';
import { FilesList } from '../UI/FilesList';
import { FilePreviewItem } from '../UI/FilePreviewItem';


export class IssueItem extends React.Component {
  handleClickEdit = () => {
    this.props.onEdit(this.props.issue.issueId);
  }

  render() {
    const {
      title,
      description,
      createdAt,
      attachedFiles,
      owner
    } = this.props.issue;
    const { username } = this.props;
    return (
      <div>
        <p>{moment(createdAt).locale('ru').format('LLL')}</p>
        <h1>{title}</h1>
        <p>{description}</p>
        {attachedFiles ? (
          <FilesList>
            {
              attachedFiles.map(file =>
                (
                  <li key={file.name}>
                    <FilePreviewItem>
                      {
                        /* eslint-disable */
                        RegExp('image', 'i').test(file.type) ?
                          <img src={file.downloadUrl} alt={file.name} />
                        : RegExp('audio', 'i').test(file.type) ? <MdAudiotrack /> : <MdInsertDriveFile />
                        /* eslint-disable */
                      }
                    </FilePreviewItem>
                    <ALink
                      href={file.downloadUrl}
                      title={file.name}
                    >
                      {file.name.length > 10 ? `${file.name.slice(0, 7)}...${file.name.split('.')[file.name.split('.').length - 1]}` : file.name}
                    </ALink>
                    <p>{file.size} кб.</p>
                  </li>
                )
              )
            }
          </FilesList>
          )
        : null}
        { username.split('@')[0] === owner ? <Button onClick={this.handleClickEdit}>Редактировать</Button> : null }
      </div>
    );
  }
}


IssueItem.propTypes = {
  onEdit: PropTypes.func.isRequired,
  issue: PropTypes.objectOf(PropTypes.any).isRequired,
  username: PropTypes.string.isRequired,
};
