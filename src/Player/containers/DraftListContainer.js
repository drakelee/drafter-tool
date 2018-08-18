import React, {Component, Fragment} from 'react'
import DraftList from '../components/DraftList'
import {withStyles} from '@material-ui/core/styles'
import playerData from '../../resources/players.json'
import CurrentDrafterToolbar from '../components/CurrentDrafterToolbar'
import Toolbar from '@material-ui/core/Toolbar/Toolbar'

class DraftListContainer extends Component {
    state = {
        players: [],
        drafters: [],
        selectedIndex: -1,
        currentDrafterIndex: -1
    }

    componentDidMount() {
        const players = playerData.data
        this.setState({
            drafters,
            players,
            currentDrafterIndex: 0
        })
    }

    render() {
        const {classes} = this.props
        const {currentDrafterIndex, drafters, selectedIndex, players} = this.state
        return (
            <Fragment>
                <Toolbar/>
                <CurrentDrafterToolbar
                    drafters={drafters}
                    currentDrafterIndex={currentDrafterIndex}
                />
                <DraftList
                    players={players}
                    classes={classes}
                    selectedIndex={selectedIndex}
                    handleDraftClick={this.handleDraftClick}
                />
            </Fragment>
        )
    }

    handleDraftClick = index => {
        const {currentDrafterIndex, selectedIndex, players} = this.state
        players[index].removed = true

        this.setState({
            players,
            selectedIndex: selectedIndex === index ? -1 : index,
            currentDrafterIndex: currentDrafterIndex + 1 === drafters.length ? 0 : currentDrafterIndex + 1
        })
    }
}

const drafters = [
    {name: 'Andrew'}, {name: 'Shawn'}, {name: 'Drake'}, {name: 'Brandon'}, {name: 'Jace'}, {name: 'Matt'}, {name: 'Geoffrey'},
    {name: 'Colman'}, {name: 'Darcy'}, {name: 'Kevin'}, {name: 'Cody'}, {name: 'Dustin'}
]

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
