import styled from 'styled-components';
import { Form } from '../../components/UI/Form';
import { colors } from '../../theme/theme';

export const StyledAuthForm = styled(Form)`
  background-color: ${colors.light};
  border-radius: 10px;
  padding: 40px 30px;
  box-shadow: 2px 3px 5px rgba(0,0,0, .33);
`;
