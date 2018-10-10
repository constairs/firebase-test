import React from 'react';
import { PropTypes } from 'prop-types';

import { Button } from '../UI/Button';
import { RoundImg } from '../UI/RoundImg';


export const Img = ({ ...props }) => {
  const {
    src,
    alt,
    btn,
    btnTitle,
    onClickBtn,
    additionalTitle
  } = props;
  return (
    <Img>
      {btn ? (
        <Button onClick={onClickBtn} title={additionalTitle}>
          {btnTitle}
        </Button>
      ) : null}
      <RoundImg src={src} alt={alt} />
    </Img>
  );
};

Img.defaultProps = {
  src: '',
  alt: '',
  btn: false,
  btnTitle: '',
  onClickBtn: null,
  additionalTitle: '',
  className: '',
};

Img.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  btn: PropTypes.bool,
  btnTitle: PropTypes.string,
  onClickBtn: PropTypes.func,
  additionalTitle: PropTypes.string,
  className: PropTypes.string
};
