import React from 'react';
import { PropTypes } from 'prop-types';

import { Textarea } from '../UI/Textarea';
import { Checkbox } from '../UI/Checkbox';
import { Label } from '../UI/Label';
import { Button } from '../UI/Button';

export class AnswerForm extends React.Component {
  state = {
    text: '',
    isCheckbox: false,
  };

  changeText = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value
    });
  }

  submitIssueAnswer = (e) => {
    e.preventDefault();
    const formData = {
      answerText: this.state.text,
      isComplete: this.state.isCheckbox
    };
    this.props.onAnswerForm(formData);
  }

  render() {
    const { text, isCheckbox } = this.state;
    return (
      <form onSubmit={this.submitIssueAnswer}>
        <Label >
          <span>Text</span>
          <Textarea onChange={this.changeText} name="text" value={text} />
        </Label>
        <Label>
          <span>Checkbox</span>
          <Checkbox id="checkbox" checked={isCheckbox} />
        </Label>
        <Button type="submit">Submit</Button>
      </form>
    );
  }
}


AnswerForm.propTypes = {
  onAnswerForm: PropTypes.func.isRequired,
};
