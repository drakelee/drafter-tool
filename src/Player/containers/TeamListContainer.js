import React, {Component, Fragment} from 'react'
import Paper from '@material-ui/core/Paper/Paper'
import Table from '@material-ui/core/Table/Table'
import TableHead from '@material-ui/core/TableHead/TableHead'
import TableBody from '@material-ui/core/TableBody/TableBody'
import TableRow from '@material-ui/core/TableRow/TableRow'
import TableCell from '@material-ui/core/TableCell/TableCell'
import Toolbar from '@material-ui/core/Toolbar/Toolbar'
import Typography from '@material-ui/core/Typography/Typography'

class TeamListContainer extends Component {
    render() {
        return (
            <Fragment>
                <Toolbar/>
                {this.renderTeamTables()}
            </Fragment>
        )
    }

    renderTeamTables = () => {
        const {drafters} = this.props
        return drafters.map(drafter => {
            const {team, name} = drafter
            return (
                <Paper key={name}>
                    <Toolbar>
                        <Typography variant='title'>
                            {name}
                        </Typography>
                    </Toolbar>
                    <Table>
                        <TableHead>
                            {this.renderHeaderRows()}
                        </TableHead>
                        <TableBody>
                            {this.renderBodyRows(team)}
                        </TableBody>
                    </Table>
                </Paper>
            )
        })
    }

    renderHeaderRows = () => {
        return (
            <TableRow>
                {
                    teamHeaders.map(header => {
                        return <TableCell key={header}>{header}</TableCell>
                    })
                }
            </TableRow>
        )
    }

    renderBodyRows = team => {
        return team.map(player => {
            return (
                <TableRow
                    hover
                    key={player.round}
                >
                    <TableCell component='th' scope='row'>
                        {player.POS}
                    </TableCell>
                    <TableCell>{player.Player}</TableCell>
                    <TableCell>{player.round}</TableCell>
                    <TableCell>{player.Team}</TableCell>
                    <TableCell>{player.Bye}</TableCell>
                </TableRow>
            )
        })
    }
}

const teamHeaders = ['POS', 'Player', 'Round', 'Team', 'Bye']

export default TeamListContainer