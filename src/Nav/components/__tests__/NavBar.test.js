import React from 'react'
import {createShallow} from '@material-ui/core/test-utils'
import NavBar from '../NavBar'
import renderer from 'react-test-renderer'

const shallow = createShallow()
const setup = overrideProps => {
    const classes = {
        menuButton: '',
        root: {},
        flex: ''
    }
    const wrapper = shallow(
        <NavBar
            classes={classes}
            {...overrideProps}
        />
    )
}

describe('<NavBar/>', () => {
    it('renders correctly', () => {
        const classes = {
            menuButton: '',
            root: {},
            flex: ''
        }
        const tree = renderer.create(
            <NavBar
                classes={classes}
            />
        ).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
