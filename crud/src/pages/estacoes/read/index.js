import React, { Component} from 'react';
import api from '../../../services/api';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, createMuiTheme, ThemeProvider, Button }  from '@material-ui/core';

import '../../style.css';

const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

export default class Estacoes extends Component {
    state = {
        estacoes: []
    }

    componentDidMount(){
        this.loadList();
    }

    loadList = async () => {
        const response = await api.get('/estacoes/index');
        this.setState({ estacoes: response.data });
    }

    render(){
        const { estacoes } = this.state;

        return (
        <div className="MainContainer">{
            <ThemeProvider theme={darkTheme}>
            <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                <TableRow>
                    <TableCell align="center">#</TableCell>
                    <TableCell align="center">Número Serial</TableCell>
                    <TableCell align="center">Latitude</TableCell>
                    <TableCell align="center">Longitude</TableCell>
                    <TableCell align="center">Nome</TableCell>
                    <TableCell align="center"><Button variant="contained" size="small" color="primary" href={'/estacoes/create'}>Cadastrar estação</Button></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {estacoes.map((estacoes) => (
                    <TableRow key={estacoes.id}>
                    <TableCell align="center">{estacoes.id}</TableCell>    
                    <TableCell align="center">{estacoes.serial}</TableCell>
                    <TableCell align="center">{estacoes.lat}</TableCell>
                    <TableCell align="center">{estacoes.lon}</TableCell>
                    <TableCell align="center">{estacoes.nome}</TableCell>
                    <TableCell align="center"><Button variant="contained" size="small" color="primary" href={`/estacoes/find/${estacoes.id}`}>Acessar</Button></TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
            </ThemeProvider>
        }</div>
        )
    }
}