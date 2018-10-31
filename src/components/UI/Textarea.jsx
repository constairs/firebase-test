import styled from 'styled-components';

import { colors } from '../../theme/theme';

export const Textarea = styled.textarea`
  border: 1px solid ${colors.dGrey};
  width: 100%;
  border-radius: 3px;
  text-indent: 4px;
  padding: 4px 0;
  :focus {
    border: 1px solid ${colors.accent}
  };
`;
