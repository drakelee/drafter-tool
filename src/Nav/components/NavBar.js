import React, {Component} from 'react'
import AppBar from '@material-ui/core/AppBar/AppBar'
import Toolbar from '@material-ui/core/Toolbar/Toolbar'
import Typography from '@material-ui/core/Typography/Typography'

class NavBar extends Component {
    render() {
        const {title, classes} = this.props

        return (
            <AppBar position='absolute' className={classes.appBar}>
                <Toolbar>
                    <Typography variant='title' color='inherit' noWrap>
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
        )
    }
}

export default NavBar
