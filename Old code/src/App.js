import React from 'react';
import Joystick from './components/Joystick.js';
import Log from './components/Log.js';
import Header from './components/Header.js'
import ConnectionBox from './components/ConnectionBox'
import socketIOClient from 'socket.io-client';

import './app.css';



class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            connection: 'close',
            view: "joystick",
            logs: [],
            clientId: ""
        }

        this.coordinates = {
            A: {},
            B: {} 
        }

        // Empty Socket object to avoid undefined socket error
        this.socket = socketIOClient({'reconnectionAttempts': 1,});
    }

    // Callback passed to both joystick components to get coordinate (x,y) values and store them in the App's state
    getJoystickValue = (cds) => {
        this.coordinates = {...this.coordinates, ...cds}; 
        console.log("after", this.coordinates);
    }

    isEmpty = (obj) => {
        if (Object.keys(obj).length === 0) {
            return true;
        }
        return false;
    }


    // Callback passed to ConnectionBox component to make Socket.io connection
    makeConnection = (endpoint) => {

       this.socket = socketIOClient(endpoint, {'reconnectionAttempts': 1,});

       this.setState({
           logs: [...this.state.logs, `Establishing connection with ${endpoint}`]
       });

       // Socket.IO RECONNECT_ERROR event listener (Logs if fails to connect after specified attempts)
       this.socket.on('reconnect_error', (err)=>{
        console.log(err);
        this.setState({
            logs: [...this.state.logs, `Failed to connect with host.`]
        })
        })

        // Socket.IO CONNECT event listener (Logs info if successfuly connected)
        this.socket.on('connect', ()=>{
            this.setState({
                logs: [...this.state.logs, `Successfuly connected with ${endpoint}`],
                connection: 'open'
            });
        })

        // Socket.IO DISCONNECT event listener (Logs info when disconnects from server)
        this.socket.on('disconnect', ()=>{
            this.setState({
                logs: [...this.state.logs, `Disconnected with server`],
                connection: 'close'
            });
            
        })

        this.interval = setInterval(()=> {
           
            if (this.socket.connected && !(this.isEmpty(this.coordinates.A) && this.isEmpty(this.coordinates.B))) {
                this.socket.emit('coords', this.coordinates);
             }
        }, 60)
        
    
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    // Callback passed to status pill to toggle between connection box and joystick view
    toggleView = () => {
        if (this.state.view === "joystick") {
            this.setState({view: "form"});
        }
        else {
            this.setState({view: "joystick"});
        }

    }

    // Determines current view on the state of view
    currentView = () => {
        if (this.state.view === "form") {
            return (
                <div className="container">
                    <ConnectionBox status={this.state.connection} socketIO={this.socket} sock={this.makeConnection} viewToggle={this.toggleView}></ConnectionBox>
                </div>
                );
        }
        else {
            return (
                <div className="container">
                    <Header status={this.state.connection} viewToggle={this.toggleView}></Header>
                    <div className="pad">
                        <Joystick jname="A" getValues={this.getJoystickValue} time={60}></Joystick>
                        <Log logText={this.state.logs}></Log>
                        <Joystick jname="B" getValues={this.getJoystickValue} time={60}></Joystick>              
                    </div>
                </div>
                );
        }
    }


    render() {
        return (this.currentView());
    }
}

export default App;
