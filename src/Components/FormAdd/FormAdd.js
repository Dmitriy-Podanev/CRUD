import React, {Component} from "react"
import axios from "axios"


class Form extends Component {
    state = {

        data: {
            name: "",
            email: "",
            age: ""
        },


    };

    onChange = async e => {
        await this.setState({
            data: {
                ...this.state.data,
                [e.target.name]: e.target.value
            }
        })

    }

    onSubmit = async e => {
        e.preventDefault();
        await axios.put("http://178.128.196.163:3000/api/records", this.state)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            });



        await this.setState({

            data: {
                name: "",
                email: "",
                age: ""
            }


        });

    };

    render() {
        return (
            <form onSubmit={e => this.onSubmit(e)}>
                <input name="name" type="text" value={this.state.data.name}
                       onChange={e => this.onChange(e)}/>
                <input name="email" type="text" value={this.state.data.email}
                       onChange={e => this.onChange(e)}/>
                <input name="age" type="text" value={this.state.data.age} onChange={e => this.onChange(e)}/>
                <button label="Submit">Add</button>
            </form>
        );
    }
}

export default Form