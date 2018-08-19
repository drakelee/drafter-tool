import React, {Component} from 'react'
import Toolbar from '@material-ui/core/Toolbar/Toolbar'
import Typography from '@material-ui/core/Typography/Typography'

class CurrentDrafterToolbar extends Component {
    render() {
        const {currentDrafterIndex, drafters} = this.props
        return (
            <Toolbar>
                <Typography variant='title' color='inherit'>
                    {drafters[currentDrafterIndex] && drafters[currentDrafterIndex].name} is picking
                </Typography>
            </Toolbar>
        )
    }
}

export default CurrentDrafterToolbar
