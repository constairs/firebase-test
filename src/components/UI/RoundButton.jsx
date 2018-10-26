import styled from 'styled-components';
import { colors } from '../../theme/theme';

export const RoundButton = styled.button`
  border-radius: 100%;
  width: 50px;
  height: 50px;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.accent};
  border: none;
  opacity: 0;
  transition: .2s ease-in-out;
  :hover {
    opacity: 1;
  };
`;
