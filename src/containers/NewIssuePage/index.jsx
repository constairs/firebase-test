import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { history } from '../../redux/store';


import { createIssueRequest } from '../../redux/issues/actions';

import { Page } from '../../components/UI/Page';
import { CreateIssueForm } from '../../components/CreateIssueForm';


class NewIssue extends React.Component {
  handleCreateIssue = (createIssueData) => {
    this.props.createIssueRequest(createIssueData);
  }

  addNesIssue = () => {
    history.push('/issues/new');
  }

  render() {
    return (
      <Page>
        <CreateIssueForm onCreateIssue={this.handleCreateIssue} />
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
