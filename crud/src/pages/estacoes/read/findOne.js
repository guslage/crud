import React, { Component} from 'react';
import api from '../../../services/api';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, createMuiTheme, ThemeProvider, Button }  from '@material-ui/core';

import '../../style.css';

const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

export default class StationFind extends Component {
    state = {
        station: [] ,
        data: []
    }

    componentDidMount(){
        this.loadList();
    }

    loadList = async () => {
        const { id } = this.props.match.params;
        const response = await api.get(`/estacoes/find/${id}`);
        this.setState({ station: response.data, data: response.data.dados});  
    }

    async DeleteStation(id){
        await api.delete(`/estacoes/delete/${id}`);
        window.location.href = "/"
    }

    async DeleteData(id){
        await api.delete(`/dados/delete/${id}`);
        window.location.reload();
    }

    render(){
        const { station, data } = this.state;
        
        return (
        <div>    
        <div className="MainContainer">{
            <ThemeProvider theme={darkTheme}>
            <TableContainer component={Paper}>
            <Table size="small">
                <TableHead style={{fontSize: 16}}>
                <TableRow>
                    <TableCell align="center">#</TableCell>
                    <TableCell align="center">Número Serial</TableCell>
                    <TableCell align="center">Latitude</TableCell>
                    <TableCell align="center">Longitude</TableCell>
                    <TableCell align="center">Nome</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key={station.id}>
                    <TableCell align="center">{station.id}</TableCell>    
                    <TableCell align="center">{station.serial}</TableCell>
                    <TableCell align="center">{station.lat}</TableCell>
                    <TableCell align="center">{station.lon}</TableCell>
                    <TableCell align="center">{station.nome}</TableCell>
                    <TableCell align="right"><Button href={`/estacoes/update/${station.id}`} variant="contained" size="small" color="primary">Atualizar</Button></TableCell>
                    <TableCell align="right"><Button variant="contained" size="small" color="secondary" onClick={() => {this.DeleteStation(station.id)}}>Excluir</Button></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            </TableContainer>
            </ThemeProvider>
        }</div>

        <div className="MainContainer">
        <ThemeProvider theme={darkTheme}>
            <TableContainer component={Paper}>
            <Table size="small">
                <TableHead style={{fontSize: 16}}>
                <TableRow>
                    <TableCell align="center">#</TableCell>
                    <TableCell align="center">Temperatura</TableCell>
                    <TableCell align="center">Velocidade do vento Km/h</TableCell>
                    <TableCell align="center">Umidade</TableCell>
                    <TableCell align="center">Data</TableCell>
                    <TableCell align="center">Estação</TableCell>
                    <TableCell align="center" colSpan={2}><Button variant="contained" size="small" color="primary" href={`/dados/create/${station.id}`}>Inserir data</Button></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {data.map((data) => (
                    <TableRow key={data.id}>
                    <TableCell align="center">{data.id}</TableCell>    
                    <TableCell align="center">{data.temperatura}</TableCell>
                    <TableCell align="center">{data.velocidade_vento}</TableCell>
                    <TableCell align="center">{data.umidade}</TableCell>
                    <TableCell align="center">{data.data}</TableCell>
                    <TableCell align="center">{data.estacaoId}</TableCell>
                    <TableCell align="right"><Button variant="contained" size="small" color="primary" href={`/dados/update/${data.id}`}>Atualizar</Button></TableCell>
                    <TableCell align="right"><Button variant="contained" size="small" color="secondary" onClick={() => {this.DeleteData(data.id)}}>Excluir</Button></TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </ThemeProvider>
        </div>
        </div>
        )
    }
}