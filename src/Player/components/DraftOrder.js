import React, {Component} from 'react'
import GridList from '@material-ui/core/GridList/GridList'
import GridListTile from '@material-ui/core/GridListTile/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar/GridListTileBar'

class DraftOrder extends Component {
    render() {
        const {classes} = this.props
        return (
            <div className={classes.root}>
                <GridList cols={2.5} className={classes.gridList}>
                    {this.renderDraftOrder()}
                </GridList>
            </div>
        )
    }

    renderDraftOrder = () => {
        const {nextDrafters, drafters, classes} = this.props
        return nextDrafters.map(drafter => {
            const drafterName = drafters[drafter.index].name
            const keeper = drafter.keeper
            const title = keeper ? `${drafterName} is keeping ${keeper.Player}`:`${drafterName} pick`
            return (
                <GridListTile key={`${drafter.index}${drafter.round}`} classes={{root: classes.tile}}>
                    <GridListTileBar
                        title={title}
                    />
                </GridListTile>
            )
        })
    }
}

export default DraftOrder
