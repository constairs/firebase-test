import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogoutRequest, userUpdateRequest } from '../../redux/user/actions';

import { RoundImg } from '../../components/UI/RoundImg';
import { ImgContainer } from '../../components/UI/ImgContainer';
import { StyledProfile } from './index.styles';
import { Button } from '../../components/UI/Button';
import { Modal } from '../../components/Modal';
import { UpdateUserForm } from '../../components/UpdateUserForm';

class Profile extends React.Component {
  state = {
    showModal: false,
  }

  handleLogout = () => {
    this.props.userLogoutRequest();
  }

  handleUpdate = (updateUserData) => {
    this.props.userUpdateRequest(updateUserData);
    this.setState({
      showModal: false,
    });
  }

  handleShowModal = () => {
    this.setState({
      showModal: true,
    });
  }

  render() {
    const {
      authData,
      photoURL,
      displayName
    } = this.props.user;
    const { showModal } = this.state;
    return (
      <StyledProfile>
        <ImgContainer>
          <Button onClick={this.handleShowModal}>Change</Button>
          <RoundImg
            src={photoURL || 'https://firebase.google.com/_static/images/firebase/touchicon-180.png'}
            alt={displayName || 'Profile'}
          />
        </ImgContainer>
        <div>
          {
            displayName ? <p>{displayName}</p> : null
          }
          <p>{authData}</p>
          {
          authData ?
            <button type="button" onClick={this.handleLogout}>Logout</button>
          : null
          }
        </div>
        <Modal component={UpdateUserForm} show={showModal} onUpdateUser={this.handleUpdate} />
      </StyledProfile>
    );
  }
}

export const UserProfile = connect(
  state => ({
    user: state.persistedUser
  }),
  dispatch => ({
    userLogoutRequest: bindActionCreators(userLogoutRequest, dispatch),
    userUpdateRequest: bindActionCreators(userUpdateRequest, dispatch),
  })
)(Profile);


Profile.propTypes = {
  userLogoutRequest: PropTypes.func.isRequired,
  userUpdateRequest: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};
