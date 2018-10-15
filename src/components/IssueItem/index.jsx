import React from 'react';
import { PropTypes } from 'prop-types';
import moment from 'moment';

import { Button } from '../UI/Button';
import { ALink } from '../UI/ALink';

export class IssueItem extends React.Component {
  handleClickEdit = () => {
    this.props.onEdit(this.props.issue.issueId);
  }

  handleAttachmentClick = (e) => {
    e.preventDefault();
    const filename = e.target.href.split('/');
    this.props.onAttachmentDownload(filename[filename.length - 1]);
  }

  render() {
    const {
      title,
      description,
      createdAt,
      attachedFiles,
    } = this.props.issue;
    return (
      <div>
        <p>{moment(createdAt).locale('ru').format('LLL')}</p>
        <h1>{title}</h1>
        <p>{description}</p>
        {attachedFiles ? (
          <ul>
            {
              attachedFiles.map(file =>
                (<li key={file}>
                  <ALink href={file} onClick={this.handleAttachmentClick}>{file}</ALink>
                </li>)
              )
            }
          </ul>
          )
        : null}
        <Button onClick={this.handleClickEdit}>Редактировать</Button>
      </div>
    );
  }
}


IssueItem.propTypes = {
  onEdit: PropTypes.func.isRequired,
  issue: PropTypes.objectOf(PropTypes.any).isRequired,
  onAttachmentDownload: PropTypes.func.isRequired,
};
