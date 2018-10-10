import styled from 'styled-components';

import { ImgContainer } from '../../components/UI/ImgContainer';

export const StyledProfile = styled.div`
  display: flex;
  align-items: center;
  p {
    margin: 10px 0
  };
  ${ImgContainer} {
    margin-right: 10px;
  }
`;
