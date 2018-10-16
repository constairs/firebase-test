import styled from 'styled-components';

import { ImgContainer } from '../../components/UI/ImgContainer';
import { Button } from '../../components/UI/Button';

export const ImgBtn = styled(Button)`
    font-size: 12px;
    padding: 0;  
`;

export const StyledProfile = styled.div`
  display: flex;
  align-items: center;
  p {
    margin: 10px 0
  };
  ${ImgContainer} {
    margin-right: 10px;
  };
`;
