import React, { Component } from 'react';
import api from '../../../services/api';
import { TextField, ThemeProvider, createMuiTheme, Button } from '@material-ui/core';

import '../../style.css';

const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
});


export default class UpdateEstacao extends Component{
    state = {
        estacoes: {},
        redirect: false
    }    

    componentDidMount(){
        this.loadList();
    }

    loadList = async () => {
        const { id } = this.props.match.params;

        const response = await api.get(`/estacoes/find/${id}`);
        console.log(response);
        this.setState({ estacoes: response.data }); 
    }

    render(){
        const { estacoes, redirect } = this.state;
        
        if(redirect){
            return window.location.href = `/`
        }else{
            return(
                <div className="MainContainer">
                <ThemeProvider theme={darkTheme}>    
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <div className="Text">
                    <TextField id="serial" label="Número serial" variant="filled" value={estacoes.serial} fullWidth={true} onChange={this.handleInputChange} InputLabelProps={{ style: { color: '#90CAF9' } }}  />
                    </div>
                    <div className="Text">    
                    <TextField id="lat" label="Latitude" variant="filled" value={estacoes.lat} fullWidth={true} onChange={this.handleInputChange} InputLabelProps={{ style: { color: '#90CAF9' } }}  />
                    </div>
                    <div className="Text">
                    <TextField id="lon" label="Longitude" variant="filled" value={estacoes.lon} fullWidth={true} onChange={this.handleInputChange} InputLabelProps={{ style: { color: '#90CAF9' } }}  />
                    </div>
                    <div className="Text">
                    <TextField id="nome" label="Nome" variant="filled" value={estacoes.nome} fullWidth={true} onChange={this.handleInputChange} InputLabelProps={{ style: { color: '#90CAF9' } }}  />
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
            estacoes: { ...prevState.estacoes, [name]: value }
        }))
    }

    handleSubmit = event => {
        const { id } = this.props.match.params;
        let data = JSON.stringify(this.state.estacoes);
        
        api.put(`/estacoes/update/${id}`, data, {
            headers: {'content-type': 'application/json'}
        }).then(
            this.setState({redirect: true})
        )

        event.preventDefault();
    }
}