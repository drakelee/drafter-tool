import React, {Component} from 'react'
import GridList from '@material-ui/core/GridList/GridList'
import GridListTile from '@material-ui/core/GridListTile/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar/GridListTileBar'
import {head, isEmpty} from 'lodash'

class DraftOrder extends Component {
    state = {
        currentRound: -1
    }

    componentDidMount() {
        const {nextDrafters} = this.props
        const currentRound = !isEmpty(nextDrafters) && head(nextDrafters).round
        this.setState({
            currentRound
        })
    }

    componentDidUpdate(prevProps, prevState) {
        const {nextDrafters} = this.props
        const currentRound = !isEmpty(nextDrafters) && head(nextDrafters).round

        if (currentRound !== prevState.currentRound) {
            this.setState({
                currentRound
            })
        }
    }

    render() {
        const {classes} = this.props
        const {currentRound} = this.state
        return (
            <div className={classes.root}>
                <GridList cols={2.5} className={classes.gridList}>
                    {this.renderDraftRound(currentRound)}
                    {this.renderDraftOrder()}
                </GridList>
            </div>
        )
    }

    renderDraftOrder = () => {
        const {nextDrafters, drafters, classes, userIndex} = this.props
        return nextDrafters.map((drafter, index) => {
            const drafterName = drafters[drafter.index].name
            const keeper = drafter.keeper
            const currentDrafter = index === 0
            const userTeam = !currentDrafter && userIndex === drafter.index
            const title = keeper ? `${drafterName} is keeping ${keeper.Player}`:`${drafterName}`
            return (
                <GridListTile
                    key={`${drafter.index}${drafter.round}`}
                    classes={{
                        root: classes.tile,
                        tile: this.draftTileStyle(currentDrafter, keeper, userTeam)
                    }}
                >
                    <GridListTileBar
                        title={title}
                    />
                </GridListTile>
            )
        })
    }

    renderDraftRound = round => {
        const {classes} = this.props
        const title = `Round ${round}`
        return (
            <GridListTile classes={{tile: classes.roundTile, root: classes.roundTile}}>
                <GridListTileBar
                    title={title}
                />
            </GridListTile>
        )

    }

    draftTileStyle = (currentDrafter, keeper, userTeam) => {
        const {classes} = this.props
        if (keeper) {
            return classes.tileKeeper
        } else if (currentDrafter) {
            return classes.tileDrafter
        } else if (userTeam) {
            return classes.tileUser
        } else {
            return classes.tile
        }
    }
}

export default DraftOrder
