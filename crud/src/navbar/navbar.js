import React from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';

const NavBar = () => {
    return(
        <AppBar>
        <Toolbar>
            <Button href="/" variant="contained" color="primary">Listar estações</Button>
        </Toolbar>
        </AppBar>
    )
}

export default NavBar;