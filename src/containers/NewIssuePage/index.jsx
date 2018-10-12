import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import { createIssueRequest } from '../../redux/issues/actions';

import { Page } from '../../components/UI/Page';
import { IssueForm } from '../../components/IssueForm';


class NewIssue extends React.Component {
  handleCreateIssue = (createIssueData) => {
    this.props.createIssueRequest(createIssueData);
  }

  handleUploadFile = () => {
  }

  render() {
    return (
      <Page>
        <h1>Create Issue</h1>
        <IssueForm onUploadFile={this.handleUploadFile} onCreateIssue={this.handleCreateIssue} />
      </Page>
    );
  }
}

export const NewIssuePage = connect(
  state => ({
    user: state.persistedUser
  }),
  dispatch => ({
    createIssueRequest: bindActionCreators(createIssueRequest, dispatch)
  })
)(NewIssue);


NewIssue.propTypes = {
  createIssueRequest: PropTypes.func.isRequired
};
