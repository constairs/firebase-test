import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { history } from '../../redux/store';

import {
  fetchIssuesRequest,
  deleteIssueRequest,
  editIssueRequest,
} from '../../redux/issues/actions';

import { Spinner } from '../../components/UI/Spinner';
import { IssueForm } from '../../components/IssueForm';
import { StyledIssuePage } from './index.styles';
import { IssueItem } from '../../components/IssueItem';

const Preloader = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 20px 0;
`;

class Issue extends React.Component {
  componentWillMount() {
    this.props.fetchIssuesRequest();
  }

  handleDelete = (issueId) => {
    this.props.deleteIssueRequest(issueId);
  }

  handleClickEdit = () => {
    history.push('/issues/issue/edit');
  }

  render() {
    const {
      currentIssue,
      issueFetching
    } = this.props.issues;
    const { email } = this.props.user;
    return (
      <StyledIssuePage>
        {
          currentIssue && currentIssue.issueId ?
          (
            <div>
              { issueFetching ?
                (<Preloader><Spinner /></Preloader>)
                :
                (
                  <IssueItem
                    issue={currentIssue}
                    username={email}
                    onEdit={this.handleClickEdit}
                    onAttachmentDownload={this.handleAttachmentDownload}
                  />
                )
              }
            </div>
          ) : null
        }
        <Switch>
          {/* <Route component={IssueItem} path="/issue/:id" /> */}
          <Route render={props => <IssueForm issue={props.issues.currentIssue} />} exact path="/issues/issue/edit" />
        </Switch>
      </StyledIssuePage>
    );
  }
}

export const IssuePage = connect(
  state => ({
    issues: state.issues,
    user: state.persistedUser,
  }),
  dispatch => ({
    fetchIssuesRequest: bindActionCreators(fetchIssuesRequest, dispatch),
    deleteIssueRequest: bindActionCreators(deleteIssueRequest, dispatch),
    editIssueRequest: bindActionCreators(editIssueRequest, dispatch),
  })
)(Issue);


Issue.propTypes = {
  fetchIssuesRequest: PropTypes.func.isRequired,
  deleteIssueRequest: PropTypes.func.isRequired,
  issues: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};
