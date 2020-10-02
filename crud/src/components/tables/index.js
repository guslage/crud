import React from 'react'
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, createMuiTheme, ThemeProvider, Button }  from '@material-ui/core';
import api from '../../services/api';

const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    }
});

const Head = ({ keys, op, stationId }) => {
    return(
        <TableHead>
            <TableRow>
            {keys.map(keys =>{
                return(
                    <TableCell key={keys} align="center">{keys}</TableCell>
                )})
            }{
                 op === 'OP_CREATE_STATION' ? <TableCell align="center"><Button variant="contained" size="small" color="primary" href={'/estacoes/create'}>Cadastrar estação</Button></TableCell>
                :op === 'OP_LIST_DATA' ? <TableCell align="center" colSpan={2}><Button variant="contained" size="small" color="primary" href={`/dados/create/${stationId}`}>Inserir data</Button></TableCell>
                :<TableCell></TableCell>
            }
        </TableRow>
        </TableHead>
    )
};

const StationOperationButtons = ({ data }) => {
    return(
        <TableCell align="center">
            <Button href={`/estacoes/update/${data.id}`} variant="contained" size="small" color="primary" style={{marginRight: 10}}>Atualizar</Button>
            <Button variant="contained" size="small" color="secondary" onClick={() => {DeleteStation(data.id)}}>Excluir</Button>
        </TableCell>
    )
}

const DataOperationButtons = ({ data }) => {
    return(
        <TableCell align="center">
            <Button href={`/dados/update/${data.id}`} variant="contained" size="small" color="primary" style={{marginRight: 10}}>Atualizar</Button>
            <Button variant="contained" size="small" color="secondary" onClick={() => {DeleteData(data.id)}}>Excluir</Button>
        </TableCell>
    )
}

const Rows = ({ data, op }) => {
    const keys = Object.keys(data)
    return(
        <TableRow key={data.id}>
            { keys.map(column => <TableCell key={column} align="center">{data[column]}</TableCell>) }
            { op === 'OP_CREATE_STATION' ? <TableCell align="center"><Button variant="contained" size="small" color="primary" href={`/estacoes/find/${data.id}`}>Acessar</Button></TableCell>
            : op === 'OP_LIST_DATA'? <DataOperationButtons data={data}/>
            :<StationOperationButtons data={data}/>
            }        
        </TableRow>
    )    
};

const TableList = ({data, op, station}) => {
    const keys = Object.keys(data[0] || data)
    console.log('keys:' + keys)
    return(
        <ThemeProvider theme={darkTheme}>
            <TableContainer component={Paper}>
            <Table size="small">
            <Head keys={keys} op={op} stationId={station}/>
                <TableBody>
                    { data.map(data => <Rows key={data.id} data={data} op={op}/>) }
                </TableBody>
            </Table>
            </TableContainer>
        </ThemeProvider> 
    )
};

async function DeleteStation(id){
    await api.delete(`/station/delete/${id}`);
    window.location.href = "/"
}

async function DeleteData(id){
    await api.delete(`/data/delete/${id}`);
    window.location.reload()
}

export default TableList;