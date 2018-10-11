import React from 'react';
import { PropTypes } from 'prop-types';
import moment from 'moment';

import { Panel } from '../UI/Panel';
import { StyledIssueItem } from './index.styles';

export const IssueListItem = ({ ...props }) => {
  const { title, description, createdAt } = props.item;
  return (
    <StyledIssueItem>
      <Panel onClick={props.onClikItem}>
        <p>{moment(createdAt).locale('ru').format('LLL')}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </Panel>
    </StyledIssueItem>
  );
};


IssueListItem.propTypes = {
  onClikItem: PropTypes.func.isRequired,
  item: PropTypes.objectOf(PropTypes.any).isRequired,
};
