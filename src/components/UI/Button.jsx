import styled from 'styled-components';

import { colors } from '../../theme/theme';

export const Button = styled.button`
  display: block;
  width: 100%;
  background-color: ${colors.accent};
  border: none;
  border-radius: 3px;
  color: ${colors.light};
  padding: 10px 12px;
  letter-spacing: 1px;
  font-size: 14px;
`;
