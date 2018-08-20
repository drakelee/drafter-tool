import React, {Component, Fragment} from 'react'
import Tabs from '@material-ui/core/Tabs/Tabs'
import Tab from '@material-ui/core/Tab/Tab'
import DraftListContainer from './DraftListContainer'
import playerData from '../../resources/players.json'
import drafters from '../../resources/drafters'
import TeamListContainer from './TeamListContainer'
import {head, find, every, isEmpty} from 'lodash'
import DraftOrderContainer from './DraftOrderContainer'

class DraftToolContainer extends Component {
    state = {
        currentTab: 0,
        // DraftOrder
        nextDrafters: [],
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

    componentDidUpdate(prevProps, prevState) {
        const {nextDrafters} = this.state
        const nextDrafter = head(nextDrafters)
        if (nextDrafter !== head(prevState.nextDrafters)) {
            const keeper = nextDrafter.keeper
            if (keeper) {
                this.handleDraftClick(keeper.Rank - 1, true)
            }
        }
    }

    render() {
        const {currentTab, currentDrafterIndex, players, visiblePlayers, drafters, round, finished, nextDrafters} = this.state
        return (
            <Fragment>
                <DraftOrderContainer
                    nextDrafters={nextDrafters}
                    currentDrafterIndex={currentDrafterIndex}
                    drafters={drafters}
                />
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

    handleDraftClick = (index, isKeeper) => {
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
            team: [...drafter.team, ...isKeeper ? [] : [draftedPlayer]]
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

    nextDrafter = (currentDraftIndex, round, drafters, prevIter = []) => {
        const remainingDrafters = drafters.slice(currentDraftIndex, drafters.length)
        const nextDrafters = remainingDrafters.reduce((acc, drafter, index) => {
            const {team} = drafter
            if (every(team, player => player.round !== round)) {
                return [...acc, {index: currentDraftIndex + index, round}]
            } else {
                const keeper = find(team, player => player.round === round)
                return [...acc, {index: currentDraftIndex + index, keeper, round}]
            }
        }, prevIter)

        let fullList = nextDrafters.slice(0, 12)
        if (isEmpty(nextDrafters)) {
            return this.nextDrafter(0, round + 1, drafters)
        } else if (nextDrafters.length < 12) {
            fullList = this.nextDrafter(0, round + 1, drafters, nextDrafters).nextDrafters.slice(0, 12)
        }

        return {
            currentDrafterIndex: head(fullList).index,
            nextDrafters: fullList,
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
