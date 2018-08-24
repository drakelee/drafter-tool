import React, {Component} from 'react'
import IconButton from '@material-ui/core/IconButton/IconButton'
import KeyboardArrowLeft from '@material-ui/core/internal/svg-icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/core/internal/svg-icons/KeyboardArrowRight'
import {withStyles} from '@material-ui/core/styles'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import LastPageIcon from '@material-ui/icons/LastPage'

class TablePaginationActions extends Component {
    render() {
        const {classes, count, page, rowsPerPage} = this.props
        return (
            <div className={classes.root}>
                <IconButton
                    onClick={this.handleFirstPageButtonClick}
                    disabled={page === 0}
                >
                    <FirstPageIcon/>
                </IconButton>
                <IconButton
                    onClick={this.handleBackButtonClick}
                    disabled={page === 0}
                >
                    <KeyboardArrowLeft/>
                </IconButton>
                <IconButton
                    onClick={this.handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                >
                    <KeyboardArrowRight/>
                </IconButton>
                <IconButton
                    onClick={this.handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                >
                    <LastPageIcon/>
                </IconButton>
            </div>
        )
    }

    handleFirstPageButtonClick = event => {
        this.props.onChangePage(event, 0)
    }

    handleBackButtonClick = event => {
        this.props.onChangePage(event, this.props.page - 1)
    }

    handleNextButtonClick = event => {
        this.props.onChangePage(event, this.props.page + 1)
    }

    handleLastPageButtonClick = event => {
        this.props.onChangePage(
            event,
            Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1)
        )
    }
}

const styles = {
    root: {
        flexShrink: 0
    }
}

export default withStyles(styles)(TablePaginationActions)
