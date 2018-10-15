import React from 'react';
import { PropTypes } from 'prop-types';
import moment from 'moment';

import { Button } from '../UI/Button';
import { ALink } from '../UI/ALink';

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
      issueId
    } = this.props.issue;
    return (
      <div>
        <p>{moment(createdAt).locale('ru').format('LLL')}</p>
        <h1>{title}</h1>
        <p>{description}</p>
        {attachedFiles ? (
          <ul>
            {
                attachedFiles.map(file => (<li key={issueId}><ALink>{file}</ALink></li>))
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
};
