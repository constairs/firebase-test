import styled from 'styled-components';
import { Page } from '../../components/UI/Page';
import { colors } from '../../theme/theme';

export const StyledAuthPage = styled(Page)`
  background-color: ${colors.main};
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100% - 118px);
`;
