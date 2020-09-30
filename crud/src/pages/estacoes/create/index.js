import React, { Component } from 'react';
import api from '../../../services/api';
import { TextField, ThemeProvider, createMuiTheme, Button } from '@material-ui/core'

import '../../style.css';

const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

export default class StationCreate extends Component {
    constructor(props){
        super(props);
        console.log('teste');
        this.state = {
            station: {}, 
            redirect: false
        }
    }

    render(){
        const { station, redirect } = this.state;
        
        if(redirect){
            return window.location.href = "/"
        }else{
            return(
                <div className="MainContainer">
                <ThemeProvider theme={darkTheme}>    
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <div className="Text">
                    <TextField id="serial" label="Número serial" variant="filled" value={station.serial} onChange={this.handleInputChange} InputLabelProps={{ style: { color: '#90CAF9' } }} fullWidth={true}/>
                    </div>
                    <div className="Text">
                    <TextField id="lat" label="Latitude" variant="filled" value={station.lat} onChange={this.handleInputChange} InputLabelProps={{ style: { color: '#90CAF9' } }} fullWidth={true}/>
                    </div>
                    <div className="Text">    
                    <TextField id="lon" label="Longitude" variant="filled" value={station.lon} onChange={this.handleInputChange} InputLabelProps={{ style: { color: '#90CAF9' } }} fullWidth={true}/>
                    </div>
                    <div className="Text">
                    <TextField id="nome" label="Nome" variant="filled" value={station.nome} onChange={this.handleInputChange} InputLabelProps={{ style: { color: '#90CAF9' } }} fullWidth={true}/>
                    </div>
                    <Button type="submit" variant="contained" color="primary">Inserir</Button>
                </form>  
                </ThemeProvider>      
                </div>
            )
        }      
    }

    handleInputChange = event => {
        const target = event.target;
        const name = target.id;
        const value = target.value;

        this.setState(prevState => ({
            station: { ...prevState.station, [name]: value }
        }))
    }

    handleSubmit = event => {
        let data = JSON.stringify(this.state.station);
        api.post(`/estacoes/new`, data, {
            headers: {'content-type': 'application/json'}
        }).then(
            this.setState({redirect: true})
        )

        event.preventDefault();
    }
}