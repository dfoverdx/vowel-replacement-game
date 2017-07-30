import React from 'react';
import PropTypes from 'prop-types';

export default class PuzzleInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputValue: '',
        };

        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    handleValueChange(e) {
        this.setState({
            inputValue: e.target.value.toLowerCase(),
        });
    }

    handleKeyUp(e) {
        if (e.key === 'Enter' || e.key === 'Return') {
            this.props.onTestPattern(e.target.value);
            this.setState({
                inputValue: '',
            });
        }
    }

    render() {
        return (
            <div className='form-group'>
                <label htmlFor='puzzleInput'>Pattern:</label>
                <input id='puzzleInput' type='text' className='form-control' onKeyUp={this.handleKeyUp}
                    onChange={this.handleValueChange} value={this.state.inputValue} />
            </div>
        );
    }
}

PuzzleInput.propTypes = {
    onTestPattern: PropTypes.func.isRequired,
};