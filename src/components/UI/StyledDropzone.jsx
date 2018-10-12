import styled from 'styled-components';
import Dropzone from 'react-dropzone';

export const StyledDropzone = styled(Dropzone)`
  margin: 0 auto;
  margin-bottom: 15px;
  position: relative;
  width: 220px;
  height: 220px;
  border-width: 2px;
  border-color: #666666;
  border-style: dashed;
  border-radius: 5px;
  cursor: pointer;
`;
