import styled from 'styled-components';

import { FilePreviewItem } from '../UI/FilePreviewItem';
import { Button } from '../UI/Button';

export const FilesList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0;
  li {
    margin: 0 10px;
    display: block;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 0;
    position: relative;
    width: 90px;
    overflow: hidden;
    word-wrap: break-word;
    text-align: center;
    img {
      width: 100%;
      display: block;
      border-radius: 5px;
    }
    ${FilePreviewItem} {
      margin-bottom: 10px;
    };
    ${Button} {
      width: 16px;
      height: 16px;
      background-color: #000;
      border-radius: 100%;
      position: absolute;
      right: 4px;
      top: 10px
      padding: 0;
      meargin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
`;
