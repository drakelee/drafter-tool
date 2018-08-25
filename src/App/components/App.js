import React, {Component} from 'react'
import NavBarContainer from '../../Nav/containers/NavBarContainer'
import {withStyles} from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar/Toolbar'
import DraftToolContainer from '../../Player/containers/DraftToolContainer'
import CurrentDrafter from '../../Player/components/CurrentDrafter'

class App extends Component {
    state = {
        userIndex: -1,
        source: -1
    }

    render() {
        const {classes} = this.props
        const {userIndex, source} = this.state
        return (
            <div className="classes.root">
                <NavBarContainer
                    title='Draft Tool'
                />
                <Toolbar/>
                <main className={classes.content}>
                    {(userIndex === -1 || source === -1) && <CurrentDrafter handleChange={this.handleChange} handleSourceChange={this.handleSourceChange}/>}
                    {userIndex > -1  && source > -1 && <DraftToolContainer userIndex={userIndex} source={source}/>}
                </main>
            </div>
        )
    }

    handleChange = index => {
        this.setState({
            userIndex: index
        })
    }

    handleSourceChange = index => {
        this.setState({
            source: index
        })
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
