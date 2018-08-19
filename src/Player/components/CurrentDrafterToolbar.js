import React, {Component} from 'react'
import Toolbar from '@material-ui/core/Toolbar/Toolbar'
import Typography from '@material-ui/core/Typography/Typography'

class CurrentDrafterToolbar extends Component {
    render() {
        const {currentDrafterIndex, drafters, round, finished} = this.props
        const title = finished ? 'Draft is finished.' : `Round ${round}/16: ${drafters[currentDrafterIndex] && drafters[currentDrafterIndex].name} is picking`
        return (
            <Toolbar>
                <Typography variant='title' color='inherit'>
                    {title}
                </Typography>
            </Toolbar>
        )
    }
}

export default CurrentDrafterToolbar
