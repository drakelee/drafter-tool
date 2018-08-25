import React, {Component} from 'react'
import Table from '@material-ui/core/Table/Table'
import TableHead from '@material-ui/core/TableHead/TableHead'
import TableBody from '@material-ui/core/TableBody/TableBody'
import TableRow from '@material-ui/core/TableRow/TableRow'
import TableCell from '@material-ui/core/TableCell/TableCell'
import Button from '@material-ui/core/Button/Button'
import TableFooter from '@material-ui/core/TableFooter/TableFooter'
import TablePagination from '@material-ui/core/TablePagination/TablePagination'
import TablePaginationActions from './TablePaginationActions'

class DraftList extends Component {
    state = {
        headers: [],
        page: 0,
        rowsPerPage: 15,
        players: []
    }

    componentDidMount() {
        const {players} = this.props
        const headers = players.length ? this.getHeaders(players[0]) : []
        this.setState({headers})
    }

    componentDidUpdate(prevProps, prevState) {
        const {players} = this.props
        const {headers} = this.state
        if (!headers.length && players.length) {
            const headers = players.length ? this.getHeaders(players[0]) : []
            this.setState({headers})
        } else if (players !== prevState.players) {
            this.setState({
                players
            })
        }
    }

    render() {
        const {page, players, rowsPerPage} = this.state
        const nonKeepers = players.filter(player => !player.removed)
        const visiblePlayers = nonKeepers.filter(player => !player.removed).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        return (
            <Table>
                <TableHead>
                    {this.renderHeaderRows()}
                </TableHead>
                <TableBody>
                    {this.renderBodyRows(visiblePlayers)}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            colSpan={6}
                            count={nonKeepers.length}
                            rowsPerPage={15}
                            page={page}
                            onChangePage={this.handleChangePage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        )
    }

    renderHeaderRows = () => {
        const {headers} = this.state
        const {source} = this.props
        const whitelist = source === 0 ? ['Rank', 'Player', 'Team', 'Bye', 'POS'] : ['Rank', 'Overall', 'Team', 'Pos', 'Bye']
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

    renderBodyRows = players => {
        const {classes, finished, nextTurns, source} = this.props
        const {page, rowsPerPage} = this.state
        const adp = source === 0
        return players.map((player, index) => {
            const nonPagedIndex = (page * rowsPerPage) + index
            let estimatedPlayer
            if (nextTurns.includes(nonPagedIndex)) {
                estimatedPlayer = true
            }
            return (
                <TableRow
                    hover
                    key={player.Player}
                    classes={{
                        root: player.removed ? classes.tableRowRootDisabled : estimatedPlayer && classes.nextPlayer
                    }}
                >
                    <TableCell component='th' scope='row'>
                        {player.Rank}
                    </TableCell>
                    <TableCell>{adp ? player.Player : player.Overall}</TableCell>
                    <TableCell>{player.Team}</TableCell>
                    <TableCell>{adp ? player.Bye : player.Pos}</TableCell>
                    <TableCell>{adp ? player.POS : player.Bye}</TableCell>
                    <TableCell>
                        <Button
                            classes={{
                                root: classes.draftButtonRoot
                            }}
                            onClick={this.handleDraftClick(player.Rank)}
                            disabled={finished}
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
        handleDraftClick && handleDraftClick(parseInt(rank, 10) - 1)
    }

    handleChangePage = (event, page) => {
        this.setState({page})
    }
}

export default DraftList
