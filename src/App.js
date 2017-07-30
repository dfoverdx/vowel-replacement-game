import React, { Component } from 'react';
import './App.css';

import Puzzle from './puzzle';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className='jumbotron'>
                    <div className='container'>
                        <h1>Replaceable Vowels Puzzle</h1>
                    </div>
                </div>
                <Puzzle />
            </div>
        );
    }
}

export default App;