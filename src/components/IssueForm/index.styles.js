import styled from 'styled-components';
import { colors } from '../../theme/theme';
import { Form } from '../UI/Form';
import { Button } from '../UI/Button';

export const StyledIssueForm = styled(Form)`
  width: 100%;
`;

export const SmButton = styled(Button)`
  width: auto;
  margin-bottom: 16px;
  background-color: ${colors.accent};
  color: #000;
  border-radius: 100%;
  transition: all .2s ease-in-out;
  padding: 0;
  text-align: center;
  line-height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 34px;
  :hover {
    background-color: ${colors.dGrey};
  }
`;
