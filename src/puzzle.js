import React from 'react';
import Cookies from 'js-cookie';

import Loading from './loading';
import PatternsDisplay from './patterns-display';
import PuzzleInput from './puzzle-input';
import WordsDisplay from './words-display';

const wordsPath = './realWords.txt',
    patternsPath = './patterns.txt';

let allWords,
    patterns;

export default class Puzzle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            loadFailed: false,
            progress: new Set(),
            pattern: null,
        };

        this.handleTestPattern = this.handleTestPattern.bind(this);
    }

    componentDidMount() {
        let self = this;
        Promise.resolve()
            .then(() => loadTextFile(wordsPath))
            .then((data) => {
                allWords = new Set(data.split('\n'));
            })
            .then(() => loadTextFile(patternsPath))
            .then((data) => {
                patterns = new Set(data.split('\n'));
            })
            .then(loadProgress)
            .then((progress) => {
                self.setState({
                    loaded: true,
                    progress: progress,
                });
            })
            .catch(() => {
                self.setState({
                    loadFailed: true,
                });
            });
    }

    handleTestPattern(pattern) {
        if (patterns.has(pattern)) {
            let progress = this.state.progress;
            progress.add(pattern);

            this.setState({
                progress: progress,
                pattern: pattern,
            });

            Cookies.set('progress', Array.from(progress).join(','));
        } else {
            this.setState({
                pattern: pattern,
            });
        }
    }

    render() {
        if (!this.state.loaded) {
            return <Loading loadFailed={this.state.loadFailed} />;
        }

        return (
            <div className='puzzle container'>
                <PuzzleInput onTestPattern={this.handleTestPattern} />
                {this.state.pattern ? <WordsDisplay words={allWords} pattern={this.state.pattern} /> : null}
                <PatternsDisplay patterns={patterns} progress={this.state.progress} />
            </div>
        );
    }
}

async function loadTextFile(path) {
    var xhr = new XMLHttpRequest(),
        promise = new Promise((res, rej) => {
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        res(xhr.responseText);
                    } else {
                        rej(null);
                    }
                }
            };

            xhr.open("GET", path);
            xhr.send();
        });

    return promise;
}

function loadProgress() {
    if (!Cookies.get('progress')) {
        Cookies.set('progress', '');
    }

    try {
        let progress = new Set(Cookies.get('progress').split(','));
        progress.delete('');

        return progress;
    } catch (e) {
        Cookies.set('progress', '');
        return new Set();
    }
}