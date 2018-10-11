import styled from 'styled-components';
import { colors } from '../../theme/theme';

export const Panel = styled.div`
  width: 100%;
  padding: 10px 20px;
  border-radius: 5px;
  display: block;
  background-color: ${colors.grey};
  transition: all .2s;
  color: ${colors.black};
  :hover {
    background-color: ${colors.dGrey};
  }
`;
