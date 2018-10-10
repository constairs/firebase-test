import styled from 'styled-components';
import { colors } from '../../theme/theme';

export const CloseBtn = styled.button`
  width: 24px;
  height: 24px;
  border-radius: 100%;
  background-color: ${colors.accent}
  &:hover {
    background-color: lighten(${colors.accent}, 6%)
  }
`;
