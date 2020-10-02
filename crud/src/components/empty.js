import React from 'react'
import { Typography , createMuiTheme, Button, ThemeProvider }  from '@material-ui/core';


const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    }
});

const Empty = ({type, id}) => {
    console.log(id)
    return(
        <ThemeProvider theme={darkTheme}>
            {
            type === 'station' ? <div style={{margin: 'auto', textAlign: 'center'}}>
                <Typography variant="subtitle1" gutterBottom style={{color: 'white'}}>Oops! Parece que nenhuma estão foi encontrada!</Typography>
                <Button variant="contained" color="primary" href={'/estacoes/create'}>Cadastrar estação</Button>
            </div>
            :<div style={{margin: 'auto', textAlign: 'center'}}>
                <Typography variant="subtitle1" gutterBottom style={{color: 'white'}}>Oops! Parece que nenhum dado foi encontrado!</Typography>
                <Button variant="contained" color="primary" href={`/dados/create/${id}`}>Cadastrar dados</Button>
            </div>    
            }
        </ThemeProvider>
    )
}

export default Empty;