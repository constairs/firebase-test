import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';

import { MdClose } from 'react-icons/md';
import { colors } from '../../theme/theme';

const StyledClose = styled.button`
  width: 24px;
  height: 24px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  padding: 0;
  align-items: center;
  color: ${colors.light};
  background-color: ${colors.greyHover};
  border: none;
  :hover {
    background-color: ${colors.accent};
  }
`;

export const CloseBtn = ({ ...props }) => {
  const { onClickBtn } = props;
  return (
    <StyledClose onClick={onClickBtn}>
      <MdClose />
    </StyledClose>
  );
};

CloseBtn.propTypes = {
  onClickBtn: PropTypes.func.isRequired
};
