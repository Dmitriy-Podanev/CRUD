import React, {Component} from 'react';
import './App.css';
import Loader from "./Components/Loader/Loader";
import Table from "./Components/Table/Table";
import Form from "./Components/FormAdd/FormAdd";

import axios from "axios";


class App extends Component {

    state = {
        isLoading: true,
        dataM: [],
        editIdx: -1,
        res: []

    }

    handleRemove = i => {

        fetch('http://178.128.196.163:3000/api/records/' + i.toLocaleString(), {method: 'DELETE'})
            .then(r => console.log(r.data))
            .then(this.setState({dataM: this.state.dataM.filter(UserId => UserId._id !== i)}))
        console.log(this.state.dataM)
    };
    startEditing = async i => {
        this.setState({editIdx: i});


    };

    stopEditing = async i => {
        await this.setState({editIdx: -1});


        await axios.post("http://178.128.196.163:3000/api/records/" + i.toLocaleString(), this.state.dataM.find(el => el._id == i))
            .then(this.setState({dataM: this.state.res, res: []}))


    };

    handleChange = async (e, i) => {

        const original = this.state.dataM
        const obj = original.find(el => el._id == i)

        obj.data = {...obj.data, [e.target.name]: e.target.value}
        await this.setState({res: original})
        console.log(this.state.res)      // this.setState({dataM:original})
    };
    onSubmit = async (e, data) => {
        e.preventDefault();
        await axios.put("http://178.128.196.163:3000/api/records", data)
            .catch(error => {
                console.log(error)
            });

        await axios.get("http://178.128.196.163:3000/api/records")
            .then(response => {
                const data = response.data;
                this.setState({
                    isLoading: false,
                    dataM: data
                })
            });

    }

    async componentDidMount() {


        await axios.get("http://178.128.196.163:3000/api/records")
            .then(response => {
                const data = response.data;
                this.setState({
                    isLoading: false,
                    dataM: data
                })

            })
        console.log(this.state.dataM)
    }

    render() {
        return (
            <div className="container">
                {
                    this.state.isLoading
                        ? <Loader/>
                        : <div className="main">
                            <Table data={this.state.dataM} handleRemove={this.handleRemove} startEditing={this.startEditing}
                                   stopEditing={this.stopEditing} editIdx={this.state.editIdx}
                                   handleChange={this.handleChange}/>
                            <Form onSubmit={this.onSubmit}></Form>

                        </div>
                }
            </div>
        );
    }
}

export default App;

