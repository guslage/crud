import React, { Component} from 'react';
import api from '../../../services/api';
import TableList from '../../../components/tables/index';
import Empty from '../../../components/empty';

import '../../style.css';

export default class StationIndex extends Component {
    state = {
        station: [],
        stationCount: ''
    }

    componentDidMount(){
        this.loadList();
    }

    loadList = async () => {
        const response = await api.get('/station/index');
        this.setState({ station: response.data.rows, stationCount: response.data.count });
    }

    render(){
        const { station, stationCount } = this.state;

        return (
            <div className="MainContainer">{
                stationCount > 0 ? <TableList data={station} op={'OP_CREATE_STATION'}/>
                :<Empty type={'station'}/>
            }</div>
        )
    }
}