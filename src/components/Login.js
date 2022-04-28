import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import axios from "axios";
import {Tracker_Url} from '../constant'

const LoginForm = ({setTrackerData,trackerData}) => {
    const loginFun =()=>{
        setTrackerData((e) => ({ ...e, loaderFlag: true }));
        axios
      .get(`${Tracker_Url.Server_url}/Posts`,{
        params: {
          sheet: 'Sheet2'
        }})
      .then((readData) => {
        readData.data.shift();
        if(trackerData.pass === readData.data[0][1] && trackerData.user === readData.data[0][0]){
            setTrackerData((e) => ({ ...e, showLoginPage: false,loginStatus:true }));
        }else{
            setTrackerData((e) => ({ ...e, showLoginPage: true,loginStatus:false }));
        }
        setTrackerData((e) => ({ ...e, loaderFlag: false }));
      });
    };

    return (
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        Log-in to your account
      </Header>
      <Form size='large' warning={!trackerData.loginStatus}>
        <Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' 
          onChange={(e) => setTrackerData((ev) => ({ ...ev, user: e.target.value }))}/>
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            onChange={(e) => setTrackerData((ev) => ({ ...ev, pass: e.target.value }))}
          />
          <Message
      warning
      header='Could you check something!'
      list={[
        'Incorrect user name or password',
      ]}
    />

          <Button color='teal' fluid size='large' onClick={()=>loginFun()}>
            Login
          </Button>
        </Segment>
      </Form>
      <Message>
        New to us? <a href='#'>Sign Up</a>
      </Message>
    </Grid.Column>
  </Grid>
);
    }

export default LoginForm