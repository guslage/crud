import React, { Component } from 'react';
import api from '../../../services/api';
import { TextField, ThemeProvider, createMuiTheme, Button } from '@material-ui/core'

import '../../style.css';

const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

export default class CreateDado extends Component {
    state = {
        dados: {
            temperatura: "",
            velocidade_vento: "",
            umidade: "",
            data: "",
            estacaoId: this.props.match.params.estacaoId
        }, redirect: false
    }

    render(){
        const { dados, redirect } = this.state;
        
        if(redirect){
            return window.location.href = `/estacoes/find/${dados.estacaoId}`
        }else{
            return(
                <div className="MainContainer">
                <ThemeProvider theme={darkTheme}>    
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <div className="Text">
                    <TextField type="number" id="temperatura" label="Temperatura" variant="filled" defaultValue={dados.temperatura} onChange={this.handleInputChange} InputLabelProps={{ style: { color: '#90CAF9' } }} inputProps={{step: 0.1}} fullWidth={true}/>
                    </div>
                    <div className="Text">
                    <TextField type="number" id="velocidade_vento" label="Velocidade do vento" variant="filled" defaultValue={dados.velocidade_vento} onChange={this.handleInputChange} InputLabelProps={{ style: { color: '#90CAF9' } }} inputProps={{step: 0.1}} fullWidth={true}/>
                    </div>
                    <div className="Text">
                    <TextField type="number" id="umidade" label="Umidade" variant="filled" defaultValue={dados.umidade} onChange={this.handleInputChange} InputLabelProps={{ style: { color: '#90CAF9' } }} inputProps={{step: 0.1}} fullWidth={true}/>
                    </div>
                    <div className="Text">
                    <TextField id="data" label="Birthday" type="date" defaultValue={dados.data} InputLabelProps={{ shrink: true, style: { color: '#90CAF9' } }} onChange={this.handleInputChange} fullWidth={true}/>
                    </div>
                    <div className="Text">
                    <TextField type="number" id="estacaoId" label="Estação pertencente" variant="filled" defaultValue={dados.estacaoId} InputLabelProps={{ style: { color: '#90CAF9' } }} fullWidth={true}/>
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
            dados: { ...prevState.dados, [name]: value }
        }))
    }

    handleSubmit = event => {
        let data = JSON.stringify(this.state.dados);
        
        api.post(`/dados/new`, data, {
            headers: {'content-type': 'application/json'}
        }).then(
            this.setState({redirect: true})
        )
        event.preventDefault();
    }
}