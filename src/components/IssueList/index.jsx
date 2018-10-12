import React from 'react';
import { PropTypes } from 'prop-types';

import { StyledIssuesList } from './index.styles';
import { IssueListItem } from '../IssueListItem';

export class IssueList extends React.Component {
  handleClickIssue = (issueId) => {
    this.props.onGetIssue(issueId);
  }

  handleDeleteIssue = (issueId) => {
    this.props.onDeleteIssue(issueId);
  }

  render() {
    const { issues } = this.props;
    return (
      <StyledIssuesList>

        {
          issues.map(issue =>
            (<IssueListItem
              key={issue.issueId}
              item={issue}
              onClickItem={this.handleClickIssue}
              onDelete={this.handleDeleteIssue}
            />)
          )
        }
      </StyledIssuesList>
    );
  }
}

IssueList.propTypes = {
  issues: PropTypes.arrayOf(PropTypes.any).isRequired,
  onDeleteIssue: PropTypes.func.isRequired,
  onGetIssue: PropTypes.func.isRequired,
};
