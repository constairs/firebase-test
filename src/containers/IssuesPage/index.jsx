import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import {
  fetchIssuesRequest,
  deleteIssueRequest,
  editIssueRequest,
  getIssueRequest,
} from '../../redux/issues/actions';

import { fetchUsersRequest } from '../../redux/user/actions';

import { Page } from '../../components/UI/Page';
import { Spinner } from '../../components/UI/Spinner';
import { IssuesNotification } from '../IssuesNotification';
import { IssueList } from '../../components/IssueList';

const Preloader = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 20px 0;
`;

class Issues extends React.Component {
  componentDidMount() {
    this.props.fetchIssuesRequest({ user: this.props.user.email, forOwner: false });
  }

  handleDelete = (issue) => {
    this.props.deleteIssueRequest(issue);
  }

  handleGetIssue = (issueId) => {
    this.props.getIssueRequest({ user: this.props.user.email, forOwner: false, issueId });
  }

  handleEdit = (issue) => {
    this.props.editIssueRequest(issue);
  }

  render() {
    const { issues, issuesFetching } = this.props.issues;
    const { email } = this.props.user;
    return (
      <Page>
        {
          issues.length > 0
          && !issuesFetching
          ?
          (
            <div>
              <IssueList
                issues={issues}
                username={email}
                onEditIssue={this.handleEdit}
                onDeleteIssue={this.handleDelete}
                onGetIssue={this.handleGetIssue}
                onAttachmentDownload={this.handleAttachmentDownload}
              />
            </div>
          ) : (
            <div>
              {issuesFetching ? <Preloader><Spinner /></Preloader> : <h1>No issues</h1>}
            </div>
          )
        }
        <IssuesNotification />
      </Page>
    );
  }
}

export const IssuesPage = connect(
  state => ({
    issues: state.issues,
    user: state.persistedUser,
  }),
  dispatch => ({
    fetchIssuesRequest: bindActionCreators(fetchIssuesRequest, dispatch),
    deleteIssueRequest: bindActionCreators(deleteIssueRequest, dispatch),
    editIssueRequest: bindActionCreators(editIssueRequest, dispatch),
    getIssueRequest: bindActionCreators(getIssueRequest, dispatch),
    fetchUsersRequest: bindActionCreators(fetchUsersRequest, dispatch),
  })
)(Issues);

Issues.propTypes = {
  fetchIssuesRequest: PropTypes.func.isRequired,
  deleteIssueRequest: PropTypes.func.isRequired,
  editIssueRequest: PropTypes.func.isRequired,
  getIssueRequest: PropTypes.func.isRequired,
  issues: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};
