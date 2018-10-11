import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { history } from '../../redux/store';

import { fetchIssuesRequest } from '../../redux/issues/actions';

import { Page } from '../../components/UI/Page';
import { Button } from '../../components/UI/Button';
import { IssuesNotification } from '../IssuesNotification';
import { IssueList } from '../../components/IssueList';

class Issues extends React.Component {
  componentWillMount() {
    this.props.fetchIssuesRequest();
  }

  addNesIssue = () => {
    history.push('/issues/new');
  }

  render() {
    const { issues, issuesFetching } = this.props.issues;
    return (
      <Page>
        { issues.length > 0 && !issuesFetching ?
        (
          <div>
            <IssueList issues={issues} />
            <Button onClick={this.addNesIssue}>New issue</Button>
          </div>

        )
        :
        (
          <div>
            {issuesFetching ? <h1>Fetching...</h1> : <h1>No issues</h1>}
            <Button onClick={this.addNesIssue}>New issue</Button>
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
    fetchIssuesRequest: bindActionCreators(fetchIssuesRequest, dispatch)
  })
)(Issues);


Issues.propTypes = {
  fetchIssuesRequest: PropTypes.func.isRequired,
  issues: PropTypes.objectOf(PropTypes.any).isRequired,
};
