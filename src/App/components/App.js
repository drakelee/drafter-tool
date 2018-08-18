import React, {Component} from 'react'
import NavBarContainer from '../../Nav/containers/NavBarContainer'
import {withStyles} from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar/Toolbar'
import DraftList from '../../Player/containers/DraftListContainer'

class App extends Component {
    render() {
        const {classes} = this.props
        return (
            <div className="classes.root">
                <NavBarContainer
                    title='Draft Tool'
                />
                <Toolbar>
                    <main className={classes.content}>
                        <DraftList/>
                    </main>
                </Toolbar>
            </div>
        )
    }
}

const styles = {
    root: {
        height: '100%',
        width: '100%',
        position: 'relative',
        display: 'flex',
        zIndex: 1,
        overflow: 'hidden',
    },
    content: {
        flexGrow: 1
    }
}

export default withStyles(styles)(App)
