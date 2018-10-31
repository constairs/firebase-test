import styled from 'styled-components';
import { colors } from '../../theme/theme';

export const Notification = styled.div`
  width: 300px;
  padding: 5px 15px;
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(0,0,0,.3);
  background-color: ${colors.grey};
  position: fixed;
  top: 50px;
  right: 20px;
  transition: opacity .1s;
  transform: ${props => (props.show ? 'translateY(0px)' : 'translateY(20px); opacity: 0;')};
  opacity: ${props => (props.show ? '1' : '0')};
  >button {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 20px;
    height: 20px;
  };
`;
