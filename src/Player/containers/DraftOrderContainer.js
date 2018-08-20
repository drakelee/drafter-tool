import React, {Component} from 'react'
import DraftOrder from '../components/DraftOrder'
import {withStyles} from '@material-ui/core/styles'

class DraftOrderContainer extends Component {
    render() {
        return (
            <DraftOrder {...this.props}/>
        )
    }
}

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        width: '100%'
    },
    gridList: {
        width: '100%',
        flexWrap: 'noWrap',
        transform: 'translateZ(0)'
    },
    tile: {
        width: 400
    }
}

export default withStyles(styles)(DraftOrderContainer)
