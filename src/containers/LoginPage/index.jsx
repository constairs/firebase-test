import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUserRequest } from '../../redux/user/actions';

import { AuthForm } from '../../components/AuthForm';

class Login extends React.Component {
  handleCreateUser = (createUserData) => {
    this.props.createUserRequest(createUserData);
  }

  render() {
    return (
      <AuthForm onCreateUser={this.handleCreateUser} />
    );
  }
}

export const LoginPage = connect(
  state => ({
    user: state.persistedUser
  }),
  dispatch => ({
    createUserRequest: bindActionCreators(createUserRequest, dispatch),
  })
)(Login);


Login.propTypes = {
  createUserRequest: PropTypes.func.isRequired,
};
