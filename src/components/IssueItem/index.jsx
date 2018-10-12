import React from 'react';
import { PropTypes } from 'prop-types';
import moment from 'moment';

import { Button } from '../UI/Button';

export class IssueItem extends React.Component {
  handleClickEdit = () => {
    this.props.onEdit(this.props.issue.issueId);
  }

  render() {
    const {
      title,
      description,
      createdAt
    } = this.props.issue;
    return (
      <div>
        <p>{moment(createdAt).locale('ru').format('LLL')}</p>
        <h1>{title}</h1>
        <p>{description}</p>
        <Button onClick={this.handleClickEdit}>Редактировать</Button>
      </div>
    );
  }
}


IssueItem.propTypes = {
  onEdit: PropTypes.func.isRequired,
  issue: PropTypes.objectOf(PropTypes.any).isRequired,
};
