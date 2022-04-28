import React from 'react'
import { Menu } from 'semantic-ui-react'

const TopNav=({setTrackerData})=> {


    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item
            name='home'
          />
          <Menu.Menu position='right'>
            <Menu.Item
              name='logout'
              onClick={(e) => setTrackerData((ev) => ({ ...ev, showLoginPage: true }))}
            />
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
  export default TopNav;