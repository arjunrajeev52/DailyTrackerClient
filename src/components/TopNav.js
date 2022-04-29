import React from 'react'
import { Icon, Menu } from 'semantic-ui-react'

const TopNav=({setTrackerData})=> {


    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item>
          <Icon circular color='teal' size='large' name="balance scale"/>
         <i style={{fontSize:'20px'}}>Daily Track</i>
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item
              onClick={(e) => setTrackerData((ev) => ({ ...ev, showLoginPage: true,user:'',pass:'' }))}
            >
                <Icon circular color='teal' size='large' name="sign-out"/>
                Logout
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
  export default TopNav;