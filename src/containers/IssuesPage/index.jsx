import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { history } from '../../redux/store';

import { fetchIssuesRequest, deleteIssueRequest, editIssueRequest, getIssueRequest } from '../../redux/issues/actions';

import { Page } from '../../components/UI/Page';
import { Spinner } from '../../components/UI/Spinner';
import { Button } from '../../components/UI/Button';
import { IssuesNotification } from '../IssuesNotification';
import { IssueList } from '../../components/IssueList';

const Preloader = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 20px 0;
`;

class Issues extends React.Component {
  componentWillMount() {
    this.props.fetchIssuesRequest();
  }

  addNewIssue = () => {
    history.push('/issues/new');
  }

  handleDelete = (issueId) => {
    this.props.deleteIssueRequest(issueId);
  }

  handleGetIssue = (issueId) => {
    this.props.getIssueRequest(issueId);
  }

  handleEdit = (issueId) => {
    this.props.editIssueRequest(issueId);
  }

  render() {
    const { issues, issuesFetching } = this.props.issues;
    return (
      <Page>
        { issues.length > 0 && !issuesFetching ?
        (
          <div>
            <IssueList
              issues={issues}
              onEditIssue={this.handleEdit}
              onDeleteIssue={this.handleDelete}
              onGetIssue={this.handleGetIssue}
            />
            <Button onClick={this.addNewIssue}>New issue</Button>
          </div>

        )
        :
        (
          <div>
            {issuesFetching ? <Preloader><Spinner /></Preloader> : <h1>No issues</h1>}
            <Button onClick={this.addNewIssue}>New issue</Button>
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
    issues: state.issues
  }),
  dispatch => ({
    fetchIssuesRequest: bindActionCreators(fetchIssuesRequest, dispatch),
    deleteIssueRequest: bindActionCreators(deleteIssueRequest, dispatch),
    editIssueRequest: bindActionCreators(editIssueRequest, dispatch),
    getIssueRequest: bindActionCreators(getIssueRequest, dispatch),
  })
)(Issues);


Issues.propTypes = {
  fetchIssuesRequest: PropTypes.func.isRequired,
  deleteIssueRequest: PropTypes.func.isRequired,
  editIssueRequest: PropTypes.func.isRequired,
  getIssueRequest: PropTypes.func.isRequired,
  issues: PropTypes.objectOf(PropTypes.any).isRequired,
};
