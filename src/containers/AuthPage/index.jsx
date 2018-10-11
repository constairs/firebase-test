import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userCreateRequest } from '../../redux/user/actions';

import { AuthForm } from '../../components/AuthForm';
import { UserNotification } from '../UserNotification';
import { StyledAuthPage } from './index.styles';

class Auth extends React.Component {
  handleCreateUser = (createUserData) => {
    this.props.userCreateRequest(createUserData);
  }

  render() {
    return (
      <StyledAuthPage>
        <AuthForm onCreateUser={this.handleCreateUser} />
        <UserNotification />
      </StyledAuthPage>
    );
  }
}

export const AuthPage = connect(
  state => ({
    user: state.persistedUser
  }),
  dispatch => ({
    userCreateRequest: bindActionCreators(userCreateRequest, dispatch),
  })
)(Auth);


Auth.propTypes = {
  userCreateRequest: PropTypes.func.isRequired,
};
