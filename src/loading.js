import React from 'react';
import PropTypes from 'prop-types';

export default class Loading extends React.Component {
    render() {
        let text = this.props.loadFailed ? 'Failed to load words files' : 'Loading...';
        return (
            <div className='loading'>
                <span className='text'>
                    {text}
                </span>
            </div>
        );
    }
}

Loading.propTypes = {
    loadFailed: PropTypes.bool.isRequired,
};