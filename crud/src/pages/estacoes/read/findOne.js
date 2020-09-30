import React, { Component} from 'react';
import api from '../../../services/api';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, createMuiTheme, ThemeProvider, Button }  from '@material-ui/core';

import '../../style.css';

const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

export default class FindEstacao extends Component {
    state = {
        estacoes: [] ,
        dados: []
    }

    componentDidMount(){
        this.loadList();
    }

    loadList = async () => {
        const { id } = this.props.match.params;
        
        const response = await api.get(`/estacoes/find/${id}`);
        //console.log(response.data)
        this.setState({ estacoes: response.data, dados: response.data.dados});  
    }

    async deleteEstacao(id){
        await api.delete(`/estacoes/delete/${id}`);
        window.location.href = "/"
    }

    async deleteDados(id){
        await api.delete(`/dados/delete/${id}`);
        window.location.reload();
    }

    render(){
        const { estacoes, dados } = this.state;
        
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
                    <TableRow key={estacoes.id}>
                    <TableCell align="center">{estacoes.id}</TableCell>    
                    <TableCell align="center">{estacoes.serial}</TableCell>
                    <TableCell align="center">{estacoes.lat}</TableCell>
                    <TableCell align="center">{estacoes.lon}</TableCell>
                    <TableCell align="center">{estacoes.nome}</TableCell>
                    <TableCell align="right"><Button href={`/estacoes/update/${estacoes.id}`} variant="contained" size="small" color="primary">Atualizar</Button></TableCell>
                    <TableCell align="right"><Button variant="contained" size="small" color="secondary" onClick={() => {this.deleteEstacao(estacoes.id)}}>Excluir</Button></TableCell>
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
                    <TableCell align="center" colSpan={2}><Button variant="contained" size="small" color="primary" href={`/dados/create/${estacoes.id}`}>Inserir dados</Button></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {dados.map((dados) => (
                    <TableRow key={dados.id}>
                    <TableCell align="center">{dados.id}</TableCell>    
                    <TableCell align="center">{dados.temperatura}</TableCell>
                    <TableCell align="center">{dados.velocidade_vento}</TableCell>
                    <TableCell align="center">{dados.umidade}</TableCell>
                    <TableCell align="center">{dados.data}</TableCell>
                    <TableCell align="center">{dados.estacaoId}</TableCell>
                    <TableCell align="right"><Button variant="contained" size="small" color="primary" href={`/dados/update/${dados.id}`}>Atualizar</Button></TableCell>
                    <TableCell align="right"><Button variant="contained" size="small" color="secondary" onClick={() => {this.deleteDados(dados.id)}}>Excluir</Button></TableCell>
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