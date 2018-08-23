import React, {Component} from 'react'
import InputLabel from '@material-ui/core/InputLabel/InputLabel'
import Select from '@material-ui/core/Select/Select'
import MenuItem from '@material-ui/core/MenuItem/MenuItem'

class CurrentDrafter extends Component {
    state = {
        userIndex: ''
    }

    render() {
        return (
            <form autoComplete='off'>
                <InputLabel>Who are you?</InputLabel>
                <Select
                    value={this.state.userIndex}
                    onChange={this.handleChange}
                >
                    {this.renderMenuItems()}
                </Select>
            </form>
        )
    }

    renderMenuItems = () => {
        return drafters.map((drafter, index) => {
            return <MenuItem value={index} key={index}>{drafter}</MenuItem>
        })
    }

    handleChange = event => {
        const {handleChange} = this.props
        this.setState({
            userIndex: event.target.value
        })
        handleChange && handleChange(event.target.value)
    }
}

const drafters = ['Andrew', 'Shawn', 'Drake', 'Brandon', 'Jace', 'Matt', 'Geoffrey', 'Colman', 'Darcy', 'Kevin', 'Cody', 'Dustin']

export default CurrentDrafter
