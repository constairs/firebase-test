import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import { createIssueRequest } from '../../redux/issues/actions';

import { Page } from '../../components/UI/Page';
import { IssueForm } from '../../components/IssueForm';


class NewIssue extends React.Component {
  handleCreateIssue = (createIssueData) => {
    this.props.createIssueRequest({ user: this.props.user.email, createIssueData });
  }

  render() {
    const { users } = this.props.user;
    return (
      <Page>
        <h1>Create Issue</h1>
        <IssueForm
          users={users}
          onCreateIssue={this.handleCreateIssue}
        />
      </Page>
    );
  }
}

export const NewIssuePage = connect(
  state => ({
    user: state.persistedUser,
    issues: state.issues,
  }),
  dispatch => ({
    createIssueRequest: bindActionCreators(createIssueRequest, dispatch)
  })
)(NewIssue);


NewIssue.propTypes = {
  createIssueRequest: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};
