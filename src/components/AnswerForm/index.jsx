import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

import { Textarea } from '../UI/Textarea';
import { Label } from '../UI/Label';
import { Button } from '../UI/Button';


const StyledCheckbox = styled.div`
  input {
    width: 30px;
    height: 30px;
  };
`;

export class AnswerForm extends React.Component {
  state = {
    text: '',
    isComplete: false,
  };

  changeInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value
    });
  }

  changeCheckbox = () => {
    this.setState({
      isComplete: !this.state.isComplete
    });
  }

  submitIssueAnswer = (e) => {
    e.preventDefault();
    const formData = {
      answerText: this.state.text,
      isComplete: this.state.isComplete
    };
    this.props.onAnswerForm(formData);
  }

  render() {
    const { text, isComplete } = this.state;
    return (
      <form onSubmit={this.submitIssueAnswer}>
        <Label>
          <span>Text</span>
          <Textarea onChange={this.changeInput} name="text" value={text} />
        </Label>
        <Label>
          <span>Checkbox</span>
          <StyledCheckbox>
            <input type="checkbox" id="checkbox" onChange={this.changeCheckbox} name="isCheckbox" checked={isComplete} />
          </StyledCheckbox>
        </Label>
        <Button type="submit">Submit</Button>
      </form>
    );
  }
}


AnswerForm.propTypes = {
  onAnswerForm: PropTypes.func.isRequired,
};
