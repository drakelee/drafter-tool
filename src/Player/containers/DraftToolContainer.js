import React, {Component, Fragment} from 'react'
import Tabs from '@material-ui/core/Tabs/Tabs'
import Tab from '@material-ui/core/Tab/Tab'
import DraftList from './DraftListContainer'
import playerData from '../../resources/players.json'

class DraftToolContainer extends Component {
    state = {
        currentTab: 0,
        // DraftList
        currentDrafterIndex: -1,
        players: [],
        visiblePlayers: [],
        drafters: []
    }

    componentDidMount() {
        const players = playerData.data
        const visiblePlayers = players.filter(player => !player.removed).slice(0, 15)
        this.setState({
            drafters,
            players,
            visiblePlayers,
            currentDrafterIndex: 0
        })
    }

    render() {
        const {currentTab, currentDrafterIndex, players, visiblePlayers, drafters} = this.state

        return (
            <Fragment>
                <Tabs
                    onChange={this.handleTabChange}
                    value={currentTab}
                >
                    <Tab label='Player List'/>
                    <Tab label='Team List'/>
                </Tabs>
                {currentTab === 0 &&
                    <DraftList
                        currentDrafterIndex={currentDrafterIndex}
                        players={players}
                        visiblePlayers={visiblePlayers}
                        drafters={drafters}
                        handleDraftClick={this.handleDraftClick}
                    />
                }
            </Fragment>
        )
    }


    handleTabChange = (event, value) => {
        this.setState({currentTab: value})
    }

    handleDraftClick = index => {
        const {currentDrafterIndex, players} = this.state
        players[index].removed = true
        const visiblePlayers = players.filter(player => !player.removed).slice(0, 15)

        this.setState({
            visiblePlayers,
            players,
            currentDrafterIndex: currentDrafterIndex + 1 === drafters.length ? 0 : currentDrafterIndex + 1
        })
    }
}

const drafters = [
    {name: 'Andrew'}, {name: 'Shawn'}, {name: 'Drake'}, {name: 'Brandon'}, {name: 'Jace'}, {name: 'Matt'}, {name: 'Geoffrey'},
    {name: 'Colman'}, {name: 'Darcy'}, {name: 'Kevin'}, {name: 'Cody'}, {name: 'Dustin'}
]

export default DraftToolContainer
