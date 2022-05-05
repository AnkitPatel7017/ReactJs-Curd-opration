import axios from 'axios';
import React, { Component } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';

class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            idcode: '',
            title: '',
            description: '',
            user: [],
            modalShow: false,
            updateButton: false,
            message: ''
        }
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    componentDidMount() {
        axios.get('http://localhost:4005/usersall').then(response => {
            console.log(response.data.data);
            this.setState({
                user: response.data.data
            })
        })
    }
    addUser = () => {
        this.setState({
            modalShow: true,
            updateButton: false,
        })
    }
    onUpdateButton = (data) => {
        this.setState({
            modalShow: true,
            updateButton: true,
            idcode: data.idcode,
            title: data.title,
            description: data.description,
        })
    }
    closeModel = () => {
        this.setState({
            modalShow: false
        })
    }
    onSubmit = () => {
        try {
            if (this.state.title === '') {
                alert("Enter title")
                return false
            }
            if (this.state.description === '') {
                alert("Enter description")
                return false
            }
            else {
                let myid = Date.now()
                console.log(myid);
                const dataobj = {
                    idcode: myid,
                    title: this.state.title,
                    description: this.state.description
                }
                console.log(dataobj);
                axios.post('http://localhost:4005/userscreate', dataobj).then(response => {
                    console.log(response.data);
                    if (response.data) {
                        this.setState({
                            message: <div className='text-center text-success'>User Added Successfully</div>
                        })
                        setInterval(() => {
                            window.location.reload()
                        }, 1500);
                    }
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    onUpdateUser = () => {
        const dataobj = {
            idcode: this.state.idcode,
            title: this.state.title,
            description: this.state.description
        }
        axios.post('http://localhost:4005/usersupdate', dataobj).then(response => {
            console.log(response.data);
            if (response.data) {
                this.setState({
                    message: <div className='text-center text-success'>User Update Successfully</div>
                })
                setInterval(() => {
                    window.location.reload()
                }, 1500);
            }
        })
    }
    onDelete = (data) => {
        let text = "Are you Sure??";
        if (window.confirm(text) === true) {
            try {
                console.log(data.idcode);
                const dataobj = {
                    idcode: data.idcode
                }
                axios.post('http://localhost:4005/usersdelete', dataobj).then(response => {
                    console.log(response.data);
                    if (response.data) {
                        this.setState({
                            modalShow: false
                        })
                        window.location.reload()
                    }
                })
            } catch (error) {
                console.log(error);
            }
        }
    }

    render() {

        return (
            <div className='container mt-3'>
                <div>
                    <div className='text-center'>
                        User Managment
                    </div>
                </div>
                <hr />
                <div className='text-end'>
                    <button className='btn btn-sm btn-success' onClick={() => this.addUser()}>
                        Add User
                    </button>
                </div>
                <Modal show={this.state.modalShow} onHide={() => this.closeModel()}>
                    <ModalHeader>
                        {this.state.updateButton ?
                            <div className='text-center'>
                                Update User
                            </div>
                            :
                            <div>
                                Add New User
                            </div>
                        }
                    </ModalHeader>
                    <ModalBody>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                            <input type="email" className="form-control" name='title' value={this.state.title} onChange={this.onChange} id="exampleFormControlInput1" placeholder="name@example.com" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                            <textarea className="form-control" name='description' value={this.state.description} onChange={this.onChange} id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <div >
                            {this.state.message}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        {this.state.updateButton ?
                            <button className='btn btn-sm btn-warning' onClick={() => this.onUpdateUser()}>Update</button>
                            :
                            <div>

                                <button className='btn btn-sm btn-success' onClick={() => this.onSubmit()}>submit</button>
                            </div>
                        }
                        <button className='btn btn-sm btn-success' onClick={() => this.closeModel()}>
                            Close
                        </button>
                    </ModalFooter>
                </Modal>

                <div>
                    {this.state.user.length > 0 ?
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>title</th>
                                    <th>description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.user.map((data, index) =>
                                    <tr key={index}>
                                        <td >{data.id}</td>
                                        <td>{data.title}</td>
                                        <td>{data.description}</td>
                                        <td>
                                            <button className='btn btn-sm btn-danger' onClick={() => this.onDelete(data)}>Delete</button>
                                            <button className='btn btn-sm btn-warning mx-2' onClick={() => this.onUpdateButton(data)}>Update</button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        :
                        <div className='text-center'>
                            data not available
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default Dashboard;