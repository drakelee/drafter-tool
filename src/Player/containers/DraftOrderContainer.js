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
        overflow: 'hidden',
        justifyContent: 'flex-start'
    },
    gridList: {
        flexWrap: 'noWrap',
        transform: 'translateZ(0)'
    },
    tile: {
        width: 100,
        flex: 1,
        '&:hover': {
            width: 400
        }
    },
    tileKeeper: {
        backgroundColor: '#FF9800',
        flex: 1,
        width: 100,
        '&:hover': {
            width: 400
        }
    },
    tileDrafter: {
        backgroundColor: '#BF360C',
        flex: 1,
        width: 100,
        '&:hover': {
            width: 400
        }
    },
    roundTile: {
        flex: 1,
        width: 110
    },
    tileUser: {
        backgroundColor: '#4CAF50',
        width: 100,
        '&:hover': {
            width: 400
        }
    }
}

export default withStyles(styles)(DraftOrderContainer)
