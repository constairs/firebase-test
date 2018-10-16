import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import { UserProfile } from '../UserProfile';
import { UserNotification } from '../UserNotification';

import {
  changeEmailRequest,
  sendVerificationRequest,
  changePasswordRequest,
  userDeleteRequest
} from '../../redux/user/actions';

import { Page } from '../../components/UI/Page';
import { Input } from '../../components/UI/Input';
import { Button } from '../../components/UI/Button';
import { Form } from '../../components/UI/Form';
import { Div } from './index.styles';

class Profile extends React.Component {
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

  render() {
    const {
      showChangeEmail,
      showSendVerification,
      showChangePassword,
      changeEmailInput,
      sendVerification,
      changePassword
    } = this.state;
    return (
      <Page>
        <UserNotification />
        <UserProfile />
        <div>
          <Div>
            <Button name="showChangeEmail" onClick={this.handleChangeButton}>Изменить email</Button>
            { showChangeEmail ?
              <Form onSubmit={this.changeEmailRequest}>
                <Input name="changeEmailInput" value={changeEmailInput} onChange={this.handleChangeInput} />
                <Button>Send</Button>
              </Form>
            : null }
          </Div>
          <Div>
            <Button name="showSendVerification" onClick={this.handleChangeButton}>Подтвердить email для входа</Button>
            { showSendVerification ?
              <Form onSubmit={this.sendVerificationRequest}>
                <Input name="sendVerification" value={sendVerification} onChange={this.handleChangeInput} />
                <Button>Send</Button>
              </Form>
            : null }
          </Div>
          <Div>
            <Button name="showChangePassword" onClick={this.handleChangeButton}>Изменить пароль</Button>
            { showChangePassword ?
              <Form onSubmit={this.changePasswordRequest}>
                <Input name="changePassword" value={changePassword} onChange={this.handleChangeInput} />
                <Button>Send</Button>
              </Form>
            : null }
          </Div>
          <div>
            <Button onClick={this.props.userDeleteRequest}>Удалить аккаунт</Button>
          </div>
        </div>
      </Page>
    );
  }
}

export const ProfilePage = connect(
  state => ({
    user: state.persistedUser
  }),
  dispatch => ({
    changeEmailRequest: bindActionCreators(changeEmailRequest, dispatch),
    sendVerificationRequest: bindActionCreators(sendVerificationRequest, dispatch),
    changePasswordRequest: bindActionCreators(changePasswordRequest, dispatch),
    userDeleteRequest: bindActionCreators(userDeleteRequest, dispatch)
  })
)(Profile);


Profile.propTypes = {
  changeEmailRequest: PropTypes.func.isRequired,
  sendVerificationRequest: PropTypes.func.isRequired,
  changePasswordRequest: PropTypes.func.isRequired,
  userDeleteRequest: PropTypes.func.isRequired
};
