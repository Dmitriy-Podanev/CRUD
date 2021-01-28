import React, {Component} from 'react';
import axios from "axios";

export default props => {
    console.log(props.data)
    axios.delete("http://178.128.196.163:3000/api/records/:id", props.data)

}
