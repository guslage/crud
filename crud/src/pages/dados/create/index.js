import React, { Component } from 'react';
import api from '../../../services/api';
import { TextField, ThemeProvider, createMuiTheme, Button } from '@material-ui/core'

import '../../style.css';

const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

export default class DataCreate extends Component {
    state = {
        data: {
            temperatura: "",
            velocidade_vento: "",
            umidade: "",
            data: "",
            estacaoId: this.props.match.params.estacaoId
        }, redirect: false
    }

    render(){
        const { data, redirect } = this.state;
        
        if(redirect){
            return window.location.href = `/estacoes/find/${data.estacaoId}`
        }else{
            return(
                <div className="MainContainer">
                <ThemeProvider theme={darkTheme}>    
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <div className="Text">
                    <TextField type="number" id="temperatura" label="Temperatura" variant="filled" defaultValue={data.temperatura} onChange={this.handleInputChange} InputLabelProps={{ style: { color: '#90CAF9' } }} inputProps={{step: 0.1}} fullWidth={true}/>
                    </div>
                    <div className="Text">
                    <TextField type="number" id="velocidade_vento" label="Velocidade do vento" variant="filled" defaultValue={data.velocidade_vento} onChange={this.handleInputChange} InputLabelProps={{ style: { color: '#90CAF9' } }} inputProps={{step: 0.1}} fullWidth={true}/>
                    </div>
                    <div className="Text">
                    <TextField type="number" id="umidade" label="Umidade" variant="filled" defaultValue={data.umidade} onChange={this.handleInputChange} InputLabelProps={{ style: { color: '#90CAF9' } }} inputProps={{step: 0.1}} fullWidth={true}/>
                    </div>
                    <div className="Text">
                    <TextField id="data" label="Birthday" type="date" defaultValue={data.data} InputLabelProps={{ shrink: true, style: { color: '#90CAF9' } }} onChange={this.handleInputChange} fullWidth={true}/>
                    </div>
                    <div className="Text">
                    <TextField type="number" id="estacaoId" label="Estação pertencente" variant="filled" defaultValue={data.estacaoId} InputLabelProps={{ style: { color: '#90CAF9' } }} fullWidth={true}/>
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
            data: { ...prevState.data, [name]: value }
        }))
    }

    handleSubmit = event => {
        let req = JSON.stringify(this.state.data);
        
        api.post(`/dados/new`, req, {
            headers: {'content-type': 'application/json'}
        }).then(
            this.setState({redirect: true})
        )
        event.preventDefault();
    }
}