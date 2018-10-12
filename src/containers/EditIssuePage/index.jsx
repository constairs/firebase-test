import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { history } from '../../redux/store';

import { createIssueRequest, editIssueRequest } from '../../redux/issues/actions';

import { Page } from '../../components/UI/Page';
import { IssueForm } from '../../components/IssueForm';


class EditIssue extends React.Component {
  handleCreateIssue = (createIssueData) => {
    this.props.createIssueRequest(createIssueData);
  }

  handleEditIssue= (issueData) => {
    this.props.editIssueRequest(issueData);
  }

  addNesIssue = () => {
    history.push('/issues/new');
  }

  render() {
    const { currentIssue } = this.props.issues;
    return (
      <Page>
        <h1>Edit Issue</h1>
        <IssueForm
          issue={currentIssue}
          onEditIssue={this.handleEditIssue}
          onCreateIssue={this.handleCreateIssue}
        />
      </Page>
    );
  }
}

export const EditIssuePage = connect(
  state => ({
    issues: state.issues,
  }),
  dispatch => ({
    createIssueRequest: bindActionCreators(createIssueRequest, dispatch),
    editIssueRequest: bindActionCreators(editIssueRequest, dispatch)
  })
)(EditIssue);


EditIssue.propTypes = {
  createIssueRequest: PropTypes.func.isRequired,
  editIssueRequest: PropTypes.func.isRequired,
  issues: PropTypes.objectOf(PropTypes.any).isRequired,
};
