import React, { Component } from 'react';
import api from '../../../services/api';
import { TextField, ThemeProvider, createMuiTheme, Button } from '@material-ui/core';

import '../../style.css';

const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
});

export default class StationUpdate extends Component{
    state = {
        station: {},
        redirect: false
    }    

    componentDidMount(){
        this.loadList();
    }

    loadList = async () => {
        const { id } = this.props.match.params;
        const response = await api.get(`/estacoes/find/${id}`);
        this.setState({ station: response.data });         
    }

    render(){
        const { station, redirect } = this.state;
        
        if(redirect){
            return window.location.href = `/`
        }else{
            return(
                <div className="MainContainer">
                <ThemeProvider theme={darkTheme}>    
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <div className="Text">
                    <TextField id="serial" label="Número serial" variant="filled" value={station.serial} fullWidth={true} onChange={this.handleInputChange} InputLabelProps={{ style: { color: '#90CAF9' } }}  />
                    </div>
                    <div className="Text">    
                    <TextField id="lat" label="Latitude" variant="filled" value={station.lat} fullWidth={true} onChange={this.handleInputChange} InputLabelProps={{ style: { color: '#90CAF9' } }}  />
                    </div>
                    <div className="Text">
                    <TextField id="lon" label="Longitude" variant="filled" value={station.lon} fullWidth={true} onChange={this.handleInputChange} InputLabelProps={{ style: { color: '#90CAF9' } }}  />
                    </div>
                    <div className="Text">
                    <TextField id="nome" label="Nome" variant="filled" value={station.nome} fullWidth={true} onChange={this.handleInputChange} InputLabelProps={{ style: { color: '#90CAF9' } }}  />
                    </div>

                    <Button type="submit" variant="contained" color="primary">Atualizar</Button>
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
        const { id } = this.props.match.params;
        let data = JSON.stringify(this.state.station);
        
        api.put(`/station/update/${id}`, data, {
            headers: {'content-type': 'application/json'}
        }).then(
            this.setState({redirect: true})
        )

        event.preventDefault();
    }
}