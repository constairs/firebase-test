import styled from 'styled-components';
import { colors } from '../../theme/theme';

export const ALink = styled.a`
  color: ${colors.accent};
  cursor: pointer;
  text-decoration: underline;
  display: inline-block;
  margin-bottom: 6px;
  font-size: 14px;
  :hover {
    text-decoration: none;
  };
`;
