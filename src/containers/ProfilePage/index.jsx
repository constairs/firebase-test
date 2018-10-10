import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import { UserProfile } from '../UserProfile';
import { UserNotification } from '../UserNotification';

import {
  changeEmailRequest,
  changeVerificationRequest,
  changePasswordRequest
} from '../../redux/user/actions';

import { Page } from '../../components/UI/Page';
import { Input } from '../../components/UI/Input';
import { Button } from '../../components/UI/Button';
import { Form } from '../../components/UI/Form';

class Profile extends React.Component {
  state = {
    showChangeEmail: false,
    showChangeVerification: false,
    showChangePassword: false,
    changeEmailInput: '',
    changeVerification: '',
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
      changeEmailInput: '',
    });
  }

  changeVerificationRequest = (e) => {
    e.preventDefault();
    this.props.changeVerificationRequest(this.state.changeVerification);
    this.setState({
      changeVerification: '',
    });
  }

  changePasswordRequest = (e) => {
    e.preventDefault();
    this.props.changePasswordRequest(this.state.changePassword);
    this.setState({
      changePassword: '',
    });
  }

  render() {
    const {
      showChangeEmail,
      showChangeVerification,
      showChangePassword,
      changeEmailInput,
      changeVerification,
      changePassword
    } = this.state;
    return (
      <Page>
        <UserNotification />
        <UserProfile />
        <div>
          <p>
            <Button name="showChangeEmail" onClick={this.handleChangeButton}>Изменить email</Button>
            { showChangeEmail ?
              <Form onSubmit={this.changeEmailRequest}>
                <Input name="changeEmailInput" value={changeEmailInput} onChange={this.handleChangeInput} />
                <Button>Send</Button>
              </Form>
            : null }
          </p>
          <p>
            <Button name="showChangeVerification" onClick={this.handleChangeButton}>Изменить email для входа</Button>
            { showChangeVerification ?
              <Form onSubmit={this.changeVerificationRequest}>
                <Input name="changeVerification" value={changeVerification} onChange={this.handleChangeInput} />
                <Button>Send</Button>
              </Form>
            : null }
          </p>
          <p>
            <Button name="showChangePassword" onClick={this.handleChangeButton}>Изменить пароль</Button>
            { showChangePassword ?
              <Form onSubmit={this.changePasswordRequest}>
                <Input name="changePassword" value={changePassword} onChange={this.handleChangeInput} />
                <Button>Send</Button>
              </Form>
            : null }
          </p>
          <p>
            <Button>Удалить аккаунт</Button>
          </p>
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
    changeVerificationRequest: bindActionCreators(changeVerificationRequest, dispatch),
    changePasswordRequest: bindActionCreators(changePasswordRequest, dispatch),
  })
)(Profile);


Profile.propTypes = {
  changeEmailRequest: PropTypes.func.isRequired,
  changeVerificationRequest: PropTypes.func.isRequired,
  changePasswordRequest: PropTypes.func.isRequired,
};
