import styled from 'styled-components';
import { colors } from '../../theme/theme';


export const StyledNav = styled.nav`
  padding: 50px 10px;
  ul {
    margin: 0;
    li {
      display: inline-block;
      margin: 0 10px;
      a {
        color: ${colors.accent};
        text-decoration: none;
        :hover {
          text-decoration: underline;
        }
      }
    }
  }
`;
