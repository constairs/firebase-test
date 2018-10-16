import styled from 'styled-components';
import { colors } from '../../theme/theme';

export const ABtn = styled.button`
  color: ${colors.accent};
  border: none;
  display: inline-block;
  cursor: pointer;
  text-decoration: underline;
  display: inline-block;
  margin-bottom: 6px;
  font-size: 14px;
  background-color: transparent;
  :hover {
    text-decoration: none;
  }
`;

export const ALink = styled.a`
  color: ${colors.accent};
  cursor: pointer;
  text-decoration: underline;
  display: inline-block;
  margin-bottom: 6px;
  font-size: 14px;
  :hover {
    text-decoration: none;
  }
`;
