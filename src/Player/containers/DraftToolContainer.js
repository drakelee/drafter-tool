import React, {Component, Fragment} from 'react'
import Tabs from '@material-ui/core/Tabs/Tabs'
import Tab from '@material-ui/core/Tab/Tab'
import DraftListContainer from './DraftListContainer'
import playerData from '../../resources/players.json'
import drafters from '../../resources/drafters'
import TeamListContainer from './TeamListContainer'
import {head, find, every, isEmpty, reverse} from 'lodash'
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
        finished: false,
        // User Specific
        nextTurn: -1
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
        if (nextDrafter && nextDrafter !== head(prevState.nextDrafters)) {
            const keeper = nextDrafter.keeper
            if (keeper) {
                this.handleDraftClick(keeper.Rank - 1, true)
            }
        }
    }

    render() {
        const {currentTab, currentDrafterIndex, players, visiblePlayers, drafters, round, finished, nextDrafters, nextTurn} = this.state
        const {userIndex} = this.props
        return (
            <Fragment>
                <DraftOrderContainer
                    nextDrafters={nextDrafters}
                    currentDrafterIndex={currentDrafterIndex}
                    drafters={drafters}
                    userIndex={userIndex}
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
                        userIndex={userIndex}
                        nextTurn={nextTurn}
                    />
                }
                {currentTab === 1 &&
                    <TeamListContainer
                        drafters={drafters}
                        userIndex={userIndex}
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

        const isMovingForward = round % 2 !== 0
        const isNewRound = isMovingForward ? currentDrafterIndex + 1 === drafters.length : currentDrafterIndex - 1  < 0
        let nextIndex
        if (isNewRound && isMovingForward) {
            nextIndex = drafters.length - 1
        } else if (isNewRound && !isMovingForward) {
            nextIndex = 0
        } else if (isMovingForward) {
            nextIndex = currentDrafterIndex + 1
        } else if (!isMovingForward) {
            nextIndex = currentDrafterIndex - 1
        }
        const nextDrafter = this.nextDrafter(nextIndex, isNewRound ? round + 1 : round, drafters)
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

    nextDrafter = (currentDraftIndex, round, drafters, prevIter = [], nextTurn, nextTurnFound) => {
        const {userIndex} = this.props
        if (round > 16) {
            return {
                currentDrafterIndex: 0,
                nextDrafters: [],
                round: 17,
                finished: true
            }
        }
        const isForward = round % 2 !== 0
        let nextTurnCounter = nextTurn || 0
        let foundNextTurn = nextTurnFound
        let remainingDrafters = drafters.slice(isForward ? currentDraftIndex : 0, isForward ? drafters.length : currentDraftIndex + 1)
        if (!isForward) remainingDrafters = reverse(remainingDrafters)
        const nextDrafters = remainingDrafters.reduce((acc, drafter, index) => {
            const indexDir = isForward ? index : -index
            const drafterIndex = currentDraftIndex + indexDir
            const {team} = drafter

            if (drafterIndex === userIndex && !foundNextTurn && nextTurnCounter !== 0) {
                foundNextTurn = true
            }

            if (every(team, player => player.round !== round)) {
                if (drafterIndex !== userIndex && !foundNextTurn) {
                    nextTurnCounter += 1
                }
                return [...acc, {index: drafterIndex, round}]
            } else {
                const keeper = find(team, player => player.round === round)
                return [...acc, {index: drafterIndex, keeper, round}]
            }
        }, prevIter)

        let fullList = nextDrafters.slice(0, 30)
        const startFromBeginning = (round + 1) % 2 !== 0
        const initialIndex = startFromBeginning ? 0 : drafters.length - 1
        if (isEmpty(nextDrafters) && round + 1 <= 16) {
            return this.nextDrafter(initialIndex, round + 1, drafters)
        } else if (nextDrafters.length < 30 && round + 1 <= 16) {
            const continueSearch = this.nextDrafter(initialIndex, round + 1, drafters, nextDrafters, nextTurnCounter, foundNextTurn)
            fullList = continueSearch.nextDrafters.slice(0, 30)
            nextTurn = continueSearch.nextTurn
        }
        return {
            currentDrafterIndex: head(fullList).index,
            nextDrafters: round > 16 ? [] : fullList,
            round,
            finished: round > 16,
            nextTurn
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
