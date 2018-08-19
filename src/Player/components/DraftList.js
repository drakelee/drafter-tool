import React, {Component} from 'react'
import Table from '@material-ui/core/Table/Table'
import TableHead from '@material-ui/core/TableHead/TableHead'
import TableBody from '@material-ui/core/TableBody/TableBody'
import TableRow from '@material-ui/core/TableRow/TableRow'
import TableCell from '@material-ui/core/TableCell/TableCell'
import Button from '@material-ui/core/Button/Button'

class DraftList extends Component {
    state = {
        headers: []
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
            <Table>
                <TableHead>
                    {this.renderHeaderRows()}
                </TableHead>
                <TableBody>
                    {this.renderBodyRows()}
                </TableBody>
            </Table>
        )
    }

    renderHeaderRows = () => {
        const {headers} = this.state
        const whitelist = ['Rank', 'Player', 'Team', 'Bye', 'POS', 'AVG']
        const filteredHeaders = headers.filter(header => whitelist.includes(header))
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
        const {classes, players} = this.props
        return players.map((player, index) => {
            return (
                <TableRow
                    hover
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
                            onClick={this.handleDraftClick(player.Rank)}
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

    handleDraftClick = rank => () => {
        const {handleDraftClick} = this.props
        handleDraftClick && handleDraftClick(rank - 1)
    }
}

export default DraftList
