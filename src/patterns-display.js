import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class PatternsDisplay extends React.Component {
    render() {
        let patternsByLen = new Array(10);
        for (let p of this.props.patterns) {
            if (!patternsByLen[p.length]) {
                patternsByLen[p.length] = [];
            }

            patternsByLen[p.length].push(p);
        }

        let content = [];
        for (let pLen = 0; pLen < patternsByLen.length; pLen++) {
            let pList = patternsByLen[pLen],
                patternList = [],
                allPatternsCompleted = true,
                patternsCompleted = 0;

            if (!pList) {
                continue;
            }

            for (let p of pList) {
                if (this.props.progress.has(p)) {
                    patternList.push(<li key={p} className='found'>{p}</li>);
                    patternsCompleted++;
                } else {
                    allPatternsCompleted = false;
                    patternList.push(
                        <li key={p}>{p.replace(/[a-z]/g, '_')}</li>
                    );
                }
            }

            let contentClasses = [
                'patternList',
                'panel-body'
            ];

            if (pLen > 5) {
                if (pLen > 7) {
                    contentClasses.push('col1');
                } else {
                    contentClasses.push('col2');
                }
            }

            content.push(
                <div key={'patterns-' + pLen} className='patternBlock'>
                    <div className={classnames('panel', allPatternsCompleted ? 'panel-success' : 'panel-default')}>
                        <div className='panel-heading'>
                            <h3 className='panel-title pull-left'>{pLen}-length words</h3>
                            <h3 className='panel-title pull-right'>{patternsCompleted} / {pList.length}</h3>
                            <div className='clearfix' />
                        </div>
                        <div className={classnames(contentClasses)}>
                            <ul className='list-unstyled'>
                                {patternList}
                            </ul>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className='row'>
                <div className='puzzleDisplay col-xs-12'>
                    {content}
                </div>
            </div>
        );
    }
}

PatternsDisplay.propTypes = {
    patterns: PropTypes.instanceOf(Set).isRequired,
    progress: PropTypes.instanceOf(Set).isRequired,
}