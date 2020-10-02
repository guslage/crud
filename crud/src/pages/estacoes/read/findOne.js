import React, { Component} from 'react';
import api from '../../../services/api';
import TableList from '../../../components/tables/index';
import Empty from '../../../components/empty';
import '../../style.css';

export default class StationFind extends Component {
    state = {
        station: [],
        data: [],
        dataCount: ''
    }

    componentDidMount(){
        this.loadList();
    }

    loadList = async () => {
        const { id } = this.props.match.params;
        const response = await api.get(`/station/find/${id}`);
        const responseData = await api.get(`/data/findStation/${id}`)
        this.setState({ station: response.data, data: responseData.data.rows, dataCount: responseData.data.count });  
    }

    async DeleteData(id){
        await api.delete(`/data/delete/${id}`);
        window.location.reload();
    }

    render(){
        const { station, data, dataCount } = this.state;
        
        const {id}  = this.props.match.params;
        console.log(id)
        return (
        <div>    
        <div className="MainContainer">
            <TableList data={station} op={'OP_MANAGE_STATION'}/>
        </div>

        <div className="MainContainer">{
            dataCount > 0 ?<TableList data={data} station={id} op={'OP_LIST_DATA'}/>
            :<Empty type={'data'} id={id}/>
        }</div>
        </div>
        )
    }
}