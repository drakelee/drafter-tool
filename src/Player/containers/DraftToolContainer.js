import React, {Component, Fragment} from 'react'
import Tabs from '@material-ui/core/Tabs/Tabs'
import Tab from '@material-ui/core/Tab/Tab'
import DraftListContainer from './DraftListContainer'
import playerData from '../../resources/players.json'
import drafters from '../../resources/drafters'
import TeamListContainer from './TeamListContainer'
import find from 'lodash/find'

class DraftToolContainer extends Component {
    state = {
        currentTab: 0,
        // DraftList
        currentDrafterIndex: -1,
        players: [],
        round: 1,
        visiblePlayers: [],
        // DraftList and TeamListContainer
        drafters: []
    }

    componentDidMount() {
        const players = playerData.data
        const visiblePlayers = players.filter(player => !player.removed).slice(0, 15)
        const generatedDrafters = this.generateTeams(drafters)
        this.setState({
            drafters: generatedDrafters,
            players,
            visiblePlayers,
            currentDrafterIndex: 0
        })
    }

    render() {
        const {currentTab, currentDrafterIndex, players, visiblePlayers, drafters, round} = this.state

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
                    <DraftListContainer
                        currentDrafterIndex={currentDrafterIndex}
                        players={players}
                        visiblePlayers={visiblePlayers}
                        drafters={drafters}
                        handleDraftClick={this.handleDraftClick}
                        round={round}
                    />
                }
                {currentTab === 1 &&
                    <TeamListContainer
                        drafters={drafters}
                    />
                }
            </Fragment>
        )
    }


    handleTabChange = (event, value) => {
        this.setState({currentTab: value})
    }

    handleDraftClick = index => {
        const {currentDrafterIndex, players, round} = this.state
        players[index].removed = true
        const visiblePlayers = players.filter(player => !player.removed).slice(0, 15)
        const isNewRound = currentDrafterIndex + 1 === drafters.length
        this.setState({
            visiblePlayers,
            players,
            currentDrafterIndex: isNewRound ? 0 : currentDrafterIndex + 1,
            round: isNewRound ? round + 1 : round
        })
    }

    generateTeams = drafters => {
        const players = playerData.data
        return drafters.map(drafter => {
            const {team} = drafter
            const hydratedTeam = team.map(player => {
                return {
                    ...player,
                    ...find(players, ['Player', player.Player])
                }
            })
            return {
                ...drafter,
                team: hydratedTeam
            }
        })
    }
}

export default DraftToolContainer
