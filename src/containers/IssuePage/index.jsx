import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import moment from 'moment';
// import { history } from '../../redux/store';

import { fetchIssuesRequest, deleteIssueRequest, editIssueRequest } from '../../redux/issues/actions';

import { Spinner } from '../../components/UI/Spinner';
import { Button } from '../../components/UI/Button';
import { StyledIssuePage } from './index.styles';

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
    // history.push(`${location.pathname}/${this.props.issues.currentIssue.issueId}/edit`);
  }

  render() {
    const {
      currentIssue,
      issueFetching
    } = this.props.issues;
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
                  <div>
                    <p>{moment(currentIssue.createdAt).locale('ru').format('LLL')}</p>
                    <h1>{currentIssue.title}</h1>
                    <p>{currentIssue.description}</p>
                    <Button onClick={this.handleClickEdit}>Редактировать</Button>
                  </div>
                )
              }
            </div>
          ) : null
        }
      </StyledIssuePage>
    );
  }
}

export const IssuePage = connect(
  state => ({
    issues: state.issues,
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
};
