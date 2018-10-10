import styled from 'styled-components';

export const ModalWrapper = styled.div`
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  left: 0;
  top: 0;
  background-color: rgba(255,255,255,.8);
  z-index: 10;
  ${props => (props.show ? 'dislay: block' : 'display: none')}
`;
