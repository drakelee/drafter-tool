import React, {Component} from 'react'
import Toolbar from '@material-ui/core/Toolbar/Toolbar'
import Typography from '@material-ui/core/Typography/Typography'

class CurrentDrafterToolbar extends Component {
    render() {
        const {currentDrafterIndex, drafters, round, finished, nextTurn, classes} = this.props
        const title = finished ? 'Draft is finished.' : `Round ${round}/16: ${drafters[currentDrafterIndex] && drafters[currentDrafterIndex].name} is picking`
        const turnsRemaining = finished ? '' : `Your next turn is in ${nextTurn} non-keeper picks`
        return (
            <Toolbar>
                <Typography variant='title' color='inherit' className={classes.draftToolbar}>
                    {title}
                </Typography>
                <Typography variant='subheading' color='inherit' align='right'>
                    {turnsRemaining}
                </Typography>
            </Toolbar>
        )
    }
}

export default CurrentDrafterToolbar
