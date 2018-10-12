import React from 'react';
import { PropTypes } from 'prop-types';
import moment from 'moment';

import { Panel } from '../UI/Panel';
import { Button } from '../UI/Button';
import { StyledIssueItem } from './index.styles';

export class IssueListItem extends React.Component {
  handleClickDelete = () => {
    this.props.onDelete(this.props.item.issueId);
  }

  handleClickItem = () => {
    this.props.onClickItem(this.props.item.issueId);
  }

  render() {
    const { title, description, createdAt } = this.props.item;
    return (
      <StyledIssueItem onClick={this.handleClickItem}>
        <Panel>
          <p>{moment(createdAt).locale('ru').format('LLL')}{this.props.item.updatedAt ? ` (Обновлено: ${moment(this.props.item.updatedAt).locale('ru').format('LLL')})` : null}</p>
          <h1>{title}</h1>
          <p>{description}</p>
          <Button onClick={this.handleClickDelete}>Удалить</Button>
        </Panel>
      </StyledIssueItem>
    );
  }
}


IssueListItem.propTypes = {
  onClickItem: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  item: PropTypes.objectOf(PropTypes.any).isRequired,
};
