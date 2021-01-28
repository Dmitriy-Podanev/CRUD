import React from 'react';
import DeleteUser from "../DeleteUsers/DeleteUser";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import TextField from '@material-ui/core/TextField';


export default props => (

    <table className="table">
        <thead>
        <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>E-mail</th>
            <th>Age</th>

        </tr>
        </thead>
        <tbody>
        {props.data.map(item => (
            <tr key={item.id} selectable={false}>
                <td>{item._id}</td>
                <td>{props.editIdx === item._id ? (<TextField

                        name="name"
                        onChange={e => props.handleChange(e, item._id)}
                        defaultValue={item.data.name}
                    />)
                    : (item.data.name)
                }</td>

                <td>{props.editIdx === item._id
                    ? (<TextField
                        name="email"
                        onChange={e => props.handleChange(e, item._id)}
                        defaultValue={item.data.email}/>)
                    : (item.data.email)
                }</td>

                <td>{props.editIdx === item._id
                    ? (<TextField
                        name="age"
                        onChange={e => props.handleChange(e, item._id)}
                        defaultValue={item.data.age}/>)
                    : (item.data.age)
                }</td>
                <td>{props.editIdx === item._id
                    ? (<CheckIcon onClick={() => props.stopEditing(item._id)}> </CheckIcon>)
                    : (<EditIcon onClick={() => props.startEditing(item._id)}> </EditIcon>)}</td>
                <td><DeleteIcon onClick={() => props.handleRemove(item._id)}></DeleteIcon></td>
            </tr>
        ))}
        </tbody>
    </table>
)