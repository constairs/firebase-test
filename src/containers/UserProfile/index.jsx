import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogoutRequest, userUpdateRequest } from '../../redux/user/actions';

import { RoundImg } from '../../components/UI/RoundImg';
import { ImgContainer } from '../../components/UI/ImgContainer';
import { StyledProfile, ImgBtn } from './index.styles';
import { SmButton } from '../../components/UI/SmButton';
import { Modal } from '../../components/Modal';
import { UpdateUserForm } from '../../components/UpdateUserForm';

class Profile extends React.Component {
  state = {
    showModal: false
  }

  handleLogout = () => {
    this.props.userLogoutRequest();
  }

  handleUpdate = (updateUserData) => {
    this.props.userUpdateRequest(updateUserData);
    this.setState({
      showModal: false
    });
  }

  handleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  render() {
    const {
      email,
      photoURL,
      displayName
    } = this.props.user;
    const { showModal } = this.state;
    return (
      <StyledProfile>
        <ImgContainer>
          <ImgBtn onClick={this.handleModal}>Change</ImgBtn>
          <RoundImg
            src={photoURL || 'https://firebase.google.com/_static/images/firebase/touchicon-180.png'}
            alt={displayName || 'Profile'}
          />
        </ImgContainer>
        <div>
          {
            displayName ? <p>{displayName}</p> : null
          }
          <p>{email}</p>
          {
          email ?
            <SmButton type="button" onClick={this.handleLogout}>Logout</SmButton>
          : null
          }
        </div>
        <Modal
          component={UpdateUserForm}
          show={showModal}
          onUpdateUser={this.handleUpdate}
          onCloseModal={this.handleModal}
        />
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
    userUpdateRequest: bindActionCreators(userUpdateRequest, dispatch)
  })
)(Profile);


Profile.propTypes = {
  userLogoutRequest: PropTypes.func.isRequired,
  userUpdateRequest: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired
};
