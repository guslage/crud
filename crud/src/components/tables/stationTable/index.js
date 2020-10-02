import React from 'react'
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, createMuiTheme, ThemeProvider, Button }  from '@material-ui/core';

const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    }
});

const Head = ({ keys, data, op }) => {
    return(
        <TableHead>
        <TableRow>
        {keys.map(keys =>{
            return(
            <TableCell key={keys} align="center">{keys}</TableCell>
            )})
        }{
            op === 'OP_LIST_STATION' ? <TableCell align="center"><Button variant="contained" size="small" color="primary" href={'/estacoes/create'}>Cadastrar estação</Button></TableCell>
            :<TableCell></TableCell>
        }
        </TableRow>
        </TableHead>
    )
};

const Rows = ({ data, op }) => {
    return (
        data.map(data => {
            return(
            <TableRow key={data.id}>
            <TableCell align="center">{data.id}</TableCell>    
            <TableCell align="center">{data.serial}</TableCell>
            <TableCell align="center">{data.lat}</TableCell>
            <TableCell align="center">{data.lon}</TableCell>
            <TableCell align="center">{data.nome}</TableCell>
            {
            op === 'OP_LIST_STATION' ? <TableCell align="center"><Button variant="contained" size="small" color="primary" href={`/estacoes/find/${data.id}`}>Acessar</Button></TableCell>
            :<div>
                <TableCell align="right"><Button href={`/estacoes/update/${data.id}`} variant="contained" size="small" color="primary">Atualizar</Button></TableCell>
                <TableCell align="right"><Button variant="contained" size="small" color="secondary" onClick={() => {this.DeleteStation(data.id)}}>Excluir</Button></TableCell>
            </div>
            }
            </TableRow>)
        })
    )    
};

const TableList = ({data, head, op}) => {
    return(
        <ThemeProvider theme={darkTheme}>
            <TableContainer component={Paper}>
            <Table size="small">
                <Head keys={head} data={data} op={op}/>
                <TableBody>
                    <Rows data={data} op={op} />
                </TableBody>
            </Table>
            </TableContainer>
        </ThemeProvider> 
    )
}

export default TableList;