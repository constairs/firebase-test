import styled from 'styled-components';
import { colors } from '../../theme/theme';

import { CloseBtn } from './CloseBtn';

export const Notification = styled.div`
  width: 300px;
  padding: 5px 15px;
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(0,0,0,.3);
  background-color: ${colors.grey};
  position: fixed;
  top: 50px;
  right: 20px;
  ${props => (props.show ? 'display:block;' : 'display: none;')}
  ${CloseBtn} {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 20px;
    height: 20px;
  }
`;
