import React from 'react';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import { MdInsertDriveFile, MdAudiotrack } from 'react-icons/md';

import { Panel } from '../UI/Panel';
import { Button } from '../UI/Button';
import { StyledIssueItem } from './index.styles';
import { ALink } from '../UI/ALink';
import { FilesList } from '../UI/FilesList';
import { FilePreviewItem } from '../UI/FilePreviewItem';

export class IssueListItem extends React.Component {
  handleClickDelete = () => {
    this.props.onDelete(this.props.item);
  }

  handleClickItem = () => {
    this.props.onClickItem(this.props.item.issueId);
  }

  render() {
    const {
      title, description, createdAt, attachedFiles, owner
    } = this.props.item;
    const { username } = this.props;
    return (
      <StyledIssueItem onClick={this.handleClickItem}>
        <Panel>
          <p>{moment(createdAt).locale('ru').format('LLL')}{this.props.item.updatedAt ? ` (Обновлено: ${moment(this.props.item.updatedAt).locale('ru').format('LLL')})` : null}</p>
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
                      <span>{file.size} кб.</span>
                    </li>
                  )
                )
              }
            </FilesList>
          ) : null}
          { username.split('@')[0] === owner ? <Button onClick={this.handleClickDelete}>Удалить</Button> : null }
        </Panel>
      </StyledIssueItem>
    );
  }
}

IssueListItem.propTypes = {
  onClickItem: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  item: PropTypes.objectOf(PropTypes.any).isRequired,
  username: PropTypes.string.isRequired,
};
