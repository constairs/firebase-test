import styled from 'styled-components';
import Select from 'react-select';
import { colors } from '../../theme/theme';

export const StyledSelect = styled(Select)`
  :focus {
    border-color: ${colors.accent};
  } 
`;
