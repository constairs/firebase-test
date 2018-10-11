import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeNotification } from '../../redux/issues/actions';

import { Notification } from '../../components/UI/Notification';
import { CloseBtn } from '../../components/UI/CloseBtn';

class NotificationWindow extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (state.showNotification !== props.notification.show) {
      return { showNotification: props.notification.show };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      showNotification: this.props.notification.show,
    };
  }


  closeButton = () => {
    this.props.closeNotification();
  }

  render() {
    const { error, success } = this.props.notification;
    const { showNotification } = this.state;
    return (
      <Notification show={showNotification}>
        <CloseBtn onClick={this.closeButton} />
        <p>{error || success}</p>
      </Notification>
    );
  }
}

export const IssuesNotification = connect(
  state => ({
    notification: state.issues.notification
  }),
  dispatch => ({
    closeNotification: bindActionCreators(closeNotification, dispatch),
  })
)(NotificationWindow);


NotificationWindow.propTypes = {
  closeNotification: PropTypes.func.isRequired,
  notification: PropTypes.objectOf(PropTypes.any).isRequired,
};
