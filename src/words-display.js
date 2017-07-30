import React from 'react';
import PropTypes from 'prop-types';

const vowels = ['a', 'e', 'i', 'o', 'u'];

export default class WordsDisplay extends React.Component {
    render() {
        let wordList = [];

        for (let v of vowels) {
            let word = this.props.pattern.replace(/\*/g, v),
                wordNode;

            if (this.props.words.has(word)) {
                wordNode = <a target='definition' href={'http://www.dictionary.com/browse/' + word}>{word}</a>;
            } else {
                wordNode = word;
            }

            wordList.push(
                <li key={word} className={this.props.words.has(word) ? '' : 'invalidWord'}>
                    {wordNode}
                </li>
            );
        }

        return (
            <div className='row'>
                <div className='col-xs-12'>
                    <div className='well patternWords'>
                        <ul className='list-inline list-unstyled'>{wordList}</ul>
                    </div>
                </div>
            </div>
        );
    }
}

WordsDisplay.propTypes = {
    words: PropTypes.instanceOf(Set).isRequired,
    pattern: PropTypes.string.isRequired,
};