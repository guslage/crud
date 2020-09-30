import React, { Component } from 'react';
import api from '../../../services/api';
import { TextField, ThemeProvider, createMuiTheme, Button } from '@material-ui/core'

import '../../style.css';

const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

export default class DataUpdate extends Component {
    state = {
        data: [], 
        redirect: false
    }

    componentDidMount(){
        this.loadList();
    }

    loadList = async () => {
        const { id } = this.props.match.params;
        const response = await api.get(`/data/find/${id}`);
        this.setState({ data: response.data[0] }); 
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
                    <TextField type="number" id="temperatura" label="Temperatura" variant="filled" value={data.temperatura} onChange={this.handleInputChange} InputLabelProps={{ style: { color: '#90CAF9' } }} inputProps={{step: 0.1}} fullWidth={true}/>
                    </div>
                    <div className="Text">
                    <TextField type="number" id="velocidade_vento" label="Velocidade do vento" variant="filled" value={data.velocidade_vento} onChange={this.handleInputChange} InputLabelProps={{ style: { color: '#90CAF9' } }} inputProps={{step: 0.1}} fullWidth={true}/>
                    </div>
                    <div className="Text">
                    <TextField type="number" id="umidade" label="Umidade" variant="filled" value={data.umidade} onChange={this.handleInputChange} InputLabelProps={{ style: { color: '#90CAF9' } }} inputProps={{step: 0.1}} fullWidth={true}/>
                    </div>
                    <div className="Text">
                    <TextField id="data" label="Birthday" type="date" value={data.data} InputLabelProps={{ shrink: true, style: { color: '#90CAF9' } }} onChange={this.handleInputChange} fullWidth={true}/>
                    </div>
                    <div className="Text">
                    <TextField type="number" id="estacaoId" label="Estação pertencente" variant="filled" value={data.estacaoId} InputLabelProps={{ style: { color: '#90CAF9' } }} fullWidth={true}/>
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
            data: { ...prevState.data, [name]: value }
        }))
    }

    handleSubmit = event => {
        const { id } = this.props.match.params;
        let req = this.state.data;
        
        api.put(`/data/update/${id}`, req, {
            headers: {'content-type': 'application/json'}
        }).then(
            this.setState({redirect: true})
        )
        event.preventDefault();
    }
}