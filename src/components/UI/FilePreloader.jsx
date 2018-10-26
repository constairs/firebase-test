import styled from 'styled-components';

import { Spinner } from './Spinner';
import { RoundButton } from './RoundButton';

export const FilePreloader = styled.div`
  width: 70px;
  height: 70px;
  position: relative;
  background-color: rgba(255,255,255, .7);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  p {
    font-size: 14px;
  };
  ${Spinner} {
    position: absolute;
    width: 60px;
    height: 60px;
    top: 50%;
    left: 50%;
    margin-top: -30px;
    margin-left: -30px;
  };
  ${RoundButton} {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -25px;
    margin-left: -25px;
  };
`;
