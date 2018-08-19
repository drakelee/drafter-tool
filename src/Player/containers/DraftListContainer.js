import React, {Component, Fragment} from 'react'
import DraftList from '../components/DraftList'
import {withStyles} from '@material-ui/core/styles'
import CurrentDrafterToolbar from '../components/CurrentDrafterToolbar'
import Toolbar from '@material-ui/core/Toolbar/Toolbar'
import Paper from '@material-ui/core/Paper/Paper'

class DraftListContainer extends Component {

    render() {
        const {classes, currentDrafterIndex, drafters, visiblePlayers, handleDraftClick, round} = this.props
        return (
            <Fragment>
                <Toolbar/>
                <Paper>
                    <CurrentDrafterToolbar
                        drafters={drafters}
                        currentDrafterIndex={currentDrafterIndex}
                        round={round}
                    />
                    <DraftList
                        players={visiblePlayers}
                        classes={classes}
                        handleDraftClick={handleDraftClick}
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
    }
}

export default withStyles(styles)(DraftListContainer)
