import styled from 'styled-components';

export const ImgContainer = styled.div`
  width: 60px;
  height: 60px;
  img {
    width: 100%;
  };
  position: relative;
  button {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 100%;
    border-radius: 100%;
    background-color: rgba(0,0,0,.7);
    color: #fff;
    letter-spacing: 1px;
    opacity: 0;
    transform: translateY(10px);
    transition: all .2s;
    border: none;
  };
  : hover {
    button {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
