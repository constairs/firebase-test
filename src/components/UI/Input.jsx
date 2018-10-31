import styled from 'styled-components';
import { colors } from '../../theme/theme';

export const Input = styled.input`
  height: 30px;
  width: 100%;
  border: 1px solid ${colors.dGrey};
  border-radius: 3px;
  text-indent: 4px;
  padding: 4px 0;
  :focus {
    border-color: ${colors.accent};
  };
`;
