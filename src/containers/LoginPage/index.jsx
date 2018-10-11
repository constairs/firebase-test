import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLoginRequest, resetPasswordRequest } from '../../redux/user/actions';

import { LoginForm } from '../../components/LoginForm';
import { ResetForm } from '../../components/ResetForm';
import { UserNotification } from '../UserNotification';
import { Modal } from '../../components/Modal';
import { StyledLoginPage } from './index.styles';

class Login extends React.Component {
  state = {
    showResetModal: false
  };

  handleLoginUser = (loginUserData) => {
    this.props.userLoginRequest(loginUserData);
  }


  handleResetPasswordModal = () => {
    this.setState({
      showResetModal: true
    });
  }

  handleResetPassword = (emailAddress) => {
    this.props.resetPasswordRequest(emailAddress);
    this.setState({
      showResetModal: false
    });
  }

  render() {
    const { showResetModal } = this.state;
    return (
      <StyledLoginPage>
        <UserNotification />
        <LoginForm
          onLoginUser={this.handleLoginUser}
          onResetPassword={this.handleResetPasswordModal}
        />
        <Modal
          component={ResetForm}
          show={showResetModal}
          onResetPassword={this.handleResetPassword}
        />
      </StyledLoginPage>
    );
  }
}

export const LoginPage = connect(
  state => ({
    user: state.persistedUser
  }),
  dispatch => ({
    userLoginRequest: bindActionCreators(userLoginRequest, dispatch),
    resetPasswordRequest: bindActionCreators(resetPasswordRequest, dispatch),
  })
)(Login);


Login.propTypes = {
  userLoginRequest: PropTypes.func.isRequired,
  resetPasswordRequest: PropTypes.func.isRequired
};
