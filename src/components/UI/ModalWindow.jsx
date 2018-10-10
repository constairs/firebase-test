import styled from 'styled-components';
import { CloseBtn } from './CloseBtn';
import { Form } from './Form';

export const ModalWindow = styled.div`
  display: block;
  height: auto;
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(0,0,0,.3);
  padding: 40px 30px;
  position: relative;
  ${CloseBtn} {
    position: absolute;
    top: 5px;
    right: 5px;
  };
  ${Form} {
    max-height: 400px;
  }
`;
