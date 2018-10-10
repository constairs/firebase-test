import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogoutRequest } from '../../redux/user/actions';

class Profile extends React.Component {
  handleLogout = () => {
    this.props.userLogoutRequest();
  }

  render() {
    const { authData } = this.props.user;
    return (
      <div>
        <p>{authData}</p>
        {
          authData ?
            <button type="button" onClick={this.handleLogout}>Logout</button>
          : null
        }
      </div>
    );
  }
}

export const UserProfile = connect(
  state => ({
    user: state.persistedUser
  }),
  dispatch => ({
    userLogoutRequest: bindActionCreators(userLogoutRequest, dispatch),
  })
)(Profile);


Profile.propTypes = {
  userLogoutRequest: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};
