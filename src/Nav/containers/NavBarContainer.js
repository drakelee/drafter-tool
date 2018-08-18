import React, {Component} from 'react'
import NavBar from '../components/NavBar'
import {withStyles} from '@material-ui/core/styles'

class NavBarContainer extends Component {
    render() {
        const {title} = this.props

        return (
            <NavBar
                title={title}
                {...this.props}
            />
        )
    }
}

const styles = {
    appBar: {
    }
}

export default withStyles(styles)(NavBarContainer)