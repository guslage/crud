import React, { Component} from 'react';
import api from '../../../services/api';
import TableList from '../../../components/tables/stationTable/index';

import '../../style.css';

export default class StationIndex extends Component {
    state = {
        station: []
    }

    componentDidMount(){
        this.loadList();
    }

    loadList = async () => {
        const response = await api.get('/station/index');
        this.setState({ station: response.data });
    }

    render(){
        const { station } = this.state;

        const header = ['#', 'Número serial', 'Latitude', 'Longitude', 'Nome'];

        return (
        <div className="MainContainer">
            <TableList data={station} head={header} op={'OP_LIST_STATION'}/>
        </div>
        )
    }
}