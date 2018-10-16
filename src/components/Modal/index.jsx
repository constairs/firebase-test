import React from 'react';
import PropTypes from 'prop-types';
import { ModalWindow } from '../UI/ModalWindow';
import { CloseBtn } from '../UI/CloseBtn';
import { ModalWrapper } from './index.styles';

export class Modal extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (props.show !== state.show) {
      return { show: props.show };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      show: props.show,
    };
  }

  handleCloseModal = () => {
    this.props.onCloseModal();
  }

  render() {
    const { component: Component } = this.props;
    const { show } = this.state;
    return (
      <ModalWrapper show={show}>
        <ModalWindow>
          <CloseBtn onClickBtn={this.handleCloseModal} />
          <Component {...this.props} />
        </ModalWindow>
      </ModalWrapper>
    );
  }
}

Modal.propTypes = {
  component: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
