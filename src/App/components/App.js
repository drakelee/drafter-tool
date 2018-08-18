import React, {Component} from 'react'
import NavBarContainer from '../../Nav/containers/NavBarContainer'
import {withStyles} from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar/Toolbar'
import DraftList from '../../Player/containers/DraftListContainer'
import Tabs from '@material-ui/core/Tabs/Tabs'
import Tab from '@material-ui/core/Tab/Tab'

class App extends Component {
    state = {
        currentTab: 0
    }

    render() {
        const {classes} = this.props
        const {currentTab} = this.state
        return (
            <div className="classes.root">
                <NavBarContainer
                    title='Draft Tool'
                />
                <Toolbar/>
                <main className={classes.content}>
                    <Tabs
                        onChange={this.handleTabChange}
                        value={currentTab}
                    >
                        <Tab label='Player List'/>
                        <Tab label='Team List'/>
                    </Tabs>
                    {currentTab === 0 && <DraftList/>}
                </main>
            </div>
        )
    }

    handleTabChange = (event, value) => {
        this.setState({currentTab: value})
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
