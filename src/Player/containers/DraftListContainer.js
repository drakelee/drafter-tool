import React, {Component, Fragment} from 'react'
import DraftList from '../components/DraftList'
import {withStyles} from '@material-ui/core/styles'
import CurrentDrafterToolbar from '../components/CurrentDrafterToolbar'
import Paper from '@material-ui/core/Paper/Paper'

class DraftListContainer extends Component {

    render() {
        const {classes, currentDrafterIndex, drafters, visiblePlayers, handleDraftClick, round, finished, nextTurn} = this.props
        return (
            <Fragment>
                <Paper>
                    <CurrentDrafterToolbar
                        classes={classes}
                        drafters={drafters}
                        currentDrafterIndex={currentDrafterIndex}
                        round={round}
                        finished={finished}
                        nextTurn={nextTurn}
                    />
                    <DraftList
                        players={visiblePlayers}
                        classes={classes}
                        handleDraftClick={handleDraftClick}
                        finished={finished}
                        nextTurn={nextTurn}
                    />
                </Paper>
            </Fragment>
        )
    }
}



const styles = {
    draftButtonRoot: {
        backgroundColor: '#dedede',
        '&:hover': {
            backgroundColor: '#00C853'
        }
    },
    tableRowRoot: {

    },
    tableRowRootDisabled: {
        display: 'none'
    },
    draftToolbar: {
        flex: 1
    },
    nextPlayer: {
        backgroundColor: '#A5D6A7'
    }
}

export default withStyles(styles)(DraftListContainer)
