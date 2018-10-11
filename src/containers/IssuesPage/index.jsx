import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { history } from '../../redux/store';


import {
  changeEmailRequest,
  sendVerificationRequest,
  changePasswordRequest,
  userDeleteRequest
} from '../../redux/user/actions';

import { Page } from '../../components/UI/Page';
import { Button } from '../../components/UI/Button';

class Issues extends React.Component {
  state = {
    showChangeEmail: false,
    showSendVerification: false,
    showChangePassword: false,
    changeEmailInput: '',
    sendVerification: '',
    changePassword: ''
  }

  handleChangeButton = ({ target }) => {
    const { name } = target;
    this.setState({
      [name]: !this.state[name]
    });
  }

  handleChangeInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value
    });
  }

  changeEmailRequest = (e) => {
    e.preventDefault();
    this.props.changeEmailRequest(this.state.changeEmailInput);
    this.setState({
      changeEmailInput: ''
    });
  }

  sendVerificationRequest = (e) => {
    e.preventDefault();
    this.props.sendVerificationRequest(this.state.changeVerification);
    this.setState({
      showSendVerification: ''
    });
  }

  changePasswordRequest = (e) => {
    e.preventDefault();
    this.props.changePasswordRequest(this.state.changePassword);
    this.setState({
      changePassword: ''
    });
  }

  addNesIssue = () => {
    history.push('/issues/new');
  }

  render() {
    return (
      <Page>
        <div>
          <h1>No issues</h1>
          <Button onClick={this.addNesIssue}>New issue</Button>
        </div>
      </Page>
    );
  }
}

export const IssuesPage = connect(
  state => ({
    user: state.persistedUser
  }),
  dispatch => ({
    changeEmailRequest: bindActionCreators(changeEmailRequest, dispatch),
    sendVerificationRequest: bindActionCreators(sendVerificationRequest, dispatch),
    changePasswordRequest: bindActionCreators(changePasswordRequest, dispatch),
    userDeleteRequest: bindActionCreators(userDeleteRequest, dispatch)
  })
)(Issues);


Issues.propTypes = {
  changeEmailRequest: PropTypes.func.isRequired,
  sendVerificationRequest: PropTypes.func.isRequired,
  changePasswordRequest: PropTypes.func.isRequired,
};
