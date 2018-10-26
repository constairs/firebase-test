import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Label } from '../../components/UI/Label';

const Styled = styled.div`
  width: 200px;
  input {
    width: 30px;
    height: 30px;
  };
`;

export class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: props.checked
    };
  }
  handleChange = () => {
    this.setState({
      isChecked: !this.state.isChecked
    });
  }

  render() {
    const { id, labelText } = this.props;
    const { isChecked } = this.state;
    return (
      <Styled>
        <Label htmlFor={id}>{labelText}</Label>
        <input id={id} type="checkbox" checked={isChecked} onChange={this.handleChange} />
      </Styled>
    );
  }
}

Checkbox.defaultProps = {
  labelText: '',
  checked: false
};

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  checked: PropTypes.bool
};
