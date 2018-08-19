import React, {Component, Fragment} from 'react'
import Tabs from '@material-ui/core/Tabs/Tabs'
import Tab from '@material-ui/core/Tab/Tab'
import DraftListContainer from './DraftListContainer'
import playerData from '../../resources/players.json'
import drafters from '../../resources/drafters'
import TeamListContainer from './TeamListContainer'
import {find, every, isNull} from 'lodash'

class DraftToolContainer extends Component {
    state = {
        currentTab: 0,
        // DraftList
        currentDrafterIndex: -1,
        players: [],
        round: 1,
        visiblePlayers: [],
        // DraftList and TeamListContainer
        drafters: [],
        finished: false
    }

    componentDidMount() {
        const players = this.seedPlayers(playerData.data, drafters)
        const visiblePlayers = players.filter(player => !player.removed).slice(0, 15)
        const generatedDrafters = this.generateTeams(drafters)
        this.setState({
            drafters: generatedDrafters,
            players,
            visiblePlayers,
            ...this.nextDrafter(0, 1, generatedDrafters)
        })
    }

    render() {
        const {currentTab, currentDrafterIndex, players, visiblePlayers, drafters, round, finished} = this.state
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
                        finished={finished}
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
        const {currentDrafterIndex, players, round, drafters} = this.state
        const draftedPlayer = {
            ...players[index],
            removed: true,
            round
        }

        const remainingPlayers = this.replaceArray(players, index, [draftedPlayer])
        const visiblePlayers = remainingPlayers.filter(player => !player.removed).slice(0, 15)

        const drafter = drafters[currentDrafterIndex]
        const newDrafters = this.replaceArray(drafters, currentDrafterIndex, [{
            ...drafter,
            team: [...drafter.team, draftedPlayer]
        }])

        const isNewRound = currentDrafterIndex + 1 === drafters.length
        const nextDrafter = this.nextDrafter(isNewRound ? 0 : currentDrafterIndex + 1, isNewRound ? round + 1 : round, drafters)
        this.setState({
            visiblePlayers,
            drafters: newDrafters,
            players: remainingPlayers,
            ...nextDrafter
        })
    }

    replaceArray = (array, index, item) => {
        return [
            ...array.slice(0, index),
            ...item,
            ...array.slice(index + 1, array.length)
        ]
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

    nextDrafter = (currentDraftIndex, round, drafters) => {
        const remainingDrafters = drafters.slice(currentDraftIndex, drafters.length)
        const nextDraftIndex = remainingDrafters.reduce((acc, drafter, index) => {
            const {team} = drafter
            if (isNull(acc)) {
                if (every(team, player => player.round !== round)) {
                    return currentDraftIndex + index
                }
            }
            return acc
        }, null)

        if (isNull(nextDraftIndex)) {
            return this.nextDrafter(0, round + 1, drafters)
        }

        return {
            currentDrafterIndex: nextDraftIndex,
            round,
            finished: round > 16
        }
    }

    seedPlayers = (players, drafters) => {
        const keepers = drafters.reduce((acc, drafter) => {
            const {team} = drafter
            return [...acc, ...team.map(player => player.Player)]
        }, [])

        return players.reduce((acc, player) => {
            if (keepers.includes(player.Player)) {
                return [...acc, {...player, removed: true}]
            } else {
                return [...acc, player]
            }
        }, [])
    }
}

export default DraftToolContainer
