import React, {Component} from 'react'
import Table from '@material-ui/core/Table/Table'
import Paper from '@material-ui/core/Paper/Paper'
import TableHead from '@material-ui/core/TableHead/TableHead'
import TableBody from '@material-ui/core/TableBody/TableBody'
import TableRow from '@material-ui/core/TableRow/TableRow'
import TableCell from '@material-ui/core/TableCell/TableCell'
import _ from 'lodash'
import Button from '@material-ui/core/Button/Button'

class DraftList extends Component {
    state = {
        headers: [],
        selectedIndex: -1
    }

    componentDidMount() {
        const {players} = this.props
        const headers = players.length ? this.getHeaders(players[0]) : []
        this.setState({headers})
    }

    componentDidUpdate() {
        const {players} = this.props
        const {headers} = this.state
        if (!headers.length && players.length) {
            const headers = players.length ? this.getHeaders(players[0]) : []
            this.setState({headers})
        }
    }

    render() {
        return (
            <Paper>
                <Table>
                    <TableHead>
                        {this.renderHeaderRows()}
                    </TableHead>
                    <TableBody>
                        {this.renderBodyRows()}
                    </TableBody>
                </Table>
            </Paper>
        )
    }

    renderHeaderRows = () => {
        const {headers} = this.state
        const whitelist = ['Rank', 'Player', 'Team', 'Bye', 'POS', 'AVG']
        const filteredHeaders = _.filter(headers, header => whitelist.includes(header))
        return (
            <TableRow>
                {
                    filteredHeaders.map(header => {
                        return <TableCell key={header}>{header}</TableCell>
                    })
                }
                <TableCell/>
            </TableRow>
        )
    }

    renderBodyRows = () => {
        const {classes, selectedIndex, players} = this.props
        return players.map((player, index) => {
            const selected = selectedIndex === index
            return (
                <TableRow
                    hover
                    selected={selected}
                    key={index}
                    classes={{
                        root: player.removed && classes.tableRowRootDisabled
                    }}
                >
                    <TableCell component='th' scope='row'>
                        {player.Rank}
                    </TableCell>
                    <TableCell>{player.Player}</TableCell>
                    <TableCell>{player.Team}</TableCell>
                    <TableCell>{player.Bye}</TableCell>
                    <TableCell>{player.POS}</TableCell>
                    <TableCell>{player.AVG}</TableCell>
                    <TableCell>
                        <Button
                            classes={{
                                root: classes.draftButtonRoot
                            }}
                            onClick={this.handleDraftClick(index)}
                        >
                            Draft
                        </Button>
                    </TableCell>
                </TableRow>
            )
        })
    }

    getHeaders = row => {
        return Object.keys(row)
    }

    handleDraftClick = index => () => {
        const {handleDraftClick} = this.props
        handleDraftClick && handleDraftClick(index)
    }
}

export default DraftList
