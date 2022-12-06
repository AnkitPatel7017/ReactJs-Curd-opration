import axios from 'axios';
import React, { Component } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import { BsFillPersonPlusFill, BsPencilSquare, BsTrashFill } from "react-icons/bs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            idcode: '',
            fullname: '',
            email: '',
            mobilenumber: '',
            gender: '',
            birthdate: '',
            city: '',
            notes: '',
            StudentData: [],
            modalShow: false,
            updateButton: false,

        }
    }
    onChnageHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
        console.log(e.target.value);
    }

    componentDidMount = () => {
        this.getuser()
    }

    getuser = async () => {
        try {
            await axios.get('http://localhost:4005/studentall').then(response => {
                // console.log(response.data.data);
                this.setState({
                    StudentData: response.data.data
                })
            })

        } catch (error) {
            console.log(error);
        }
    }

    addUser = () => {
        this.setState({
            modalShow: true,
            updateButton: false,
        })
    }

    onSubmit = async () => {
        try {
            if (this.state.fullname === '') {
                alert("Enter fullname")
                return false
            }
            if (this.state.email === '') {
                alert("Enter email")
                return false
            }
            if (this.state.mobilenumber === '') {
                alert("Enter mobilenumber")
                return false
            }
            if (this.state.gender === '') {
                alert("Select gender")
                return false
            }
            if (this.state.birthdate === '') {
                alert("Select birthdate")
                return false
            }
            if (this.state.city === '') {
                alert("Select city")
                return false
            }
            if (this.state.notes === '') {
                alert("notes notes")
                return false
            }
            else {
                const dataobj = {
                    idcode: Date.now(),
                    fullname: this.state.fullname,
                    email: this.state.email,
                    mobilenumber: this.state.mobilenumber,
                    gender: this.state.gender,
                    birthdate: this.state.birthdate,
                    city: this.state.city,
                    notes: this.state.notes,
                }
                console.log(dataobj);
                await axios.post('http://localhost:4005/studentcreate', dataobj).then(response => {
                    // console.log(response);
                    if (response.data) {
                        this.closeModel()
                        this.getuser()
                        this.showToast("Create")
                    }
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    closeModel = () => {
        this.setState({
            modalShow: false,
            fullname: '',
            email: '',
            mobilenumber: '',
            gender: '',
            birthdate: '',
            city: '',
            notes: '',
        })
    }

    onUpdateButton = (data) => {
        this.setState({
            modalShow: true,
            updateButton: true,
            idcode: data.idcode,
            fullname: data.fullname,
            email: data.email,
            mobilenumber: data.mobilenumber,
            gender: data.gender,
            birthdate: data.birthdate,
            city: data.city,
            notes: data.notes,
        })
    }

    onUpdateUser = async () => {
        try {
            const dataobj = {
                idcode: this.state.idcode,
                fullname: this.state.fullname,
                email: this.state.email,
                mobilenumber: this.state.mobilenumber,
                gender: this.state.gender,
                birthdate: this.state.birthdate,
                city: this.state.city,
                notes: this.state.notes,
            }
            await axios.post('http://localhost:4005/studentupdate', dataobj).then(response => {
                console.log(response.data);
                if (response.data) {
                    this.getuser()
                    this.closeModel()
                    this.showToast("update")
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    onDelete = async (data) => {
        let text = window.confirm("Are you Sure??");
        if (text === true) {
            try {
                console.log(data.idcode);
                const dataobj = {
                    idcode: data.idcode
                }
                await axios.post('http://localhost:4005/studentdelete', dataobj).then(response => {
                    console.log(response);
                    if (response.data) {
                        this.getuser()
                        this.showToast("delete")
                    }
                })
            } catch (error) {
                console.log(error);
            }
        }
    }
    showToast = (data) => {
        if (data === "Create") {
            toast.success('Added Successfull.!', {
                position: "bottom-center",
                theme: 'colored',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
        if (data === "update") {
            toast.info('Update Successfull !', {
                position: "bottom-center",
                theme: 'colored',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
        if (data === "delete") {
            toast.error('Delete Successfull !', {
                position: "bottom-center",
                theme: 'colored',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });  
        }
    }
    render() {

        return (
            <div className='container mt-3'>
                <div className='border border-2 rounded  p-2 m-1 shadow'>
                    <div className='text-center'>
                        Student Mangment
                    </div>
                </div>
                <hr />

                <div className='text-end'>

                    <button className='btn  btn-success btn-sm' onClick={() => this.addUser()} title={'Add Student'}>
                        {/* BOOTSTRAP ICON  */}
                        <BsFillPersonPlusFill />
                    </button>
                </div>
                <Modal show={this.state.modalShow} onHide={() => this.closeModel()}>
                    <ModalHeader>
                        {this.state.updateButton ?
                            <div className='text-center'>
                                Update Student
                            </div>
                            :
                            <div>
                                Add New Student
                            </div>
                        }
                    </ModalHeader>
                    <ModalBody>
                        <div className="mb-1">
                            <label htmlFor="fullname" className="form-label">Full Name</label>
                            <input type="text" className="form-control form-control-sm" name="fullname" value={this.state.fullname} onChange={this.onChnageHandler} id="fullname" aria-describedby="helpId" placeholder="Enter full name" />
                        </div>
                        <div className="mb-1">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control form-control-sm" name="email" id="email" value={this.state.email} onChange={this.onChnageHandler} aria-describedby="emailHelpId" placeholder="Enter Email" />
                        </div>
                        <div className="mb-1">
                            <label htmlFor="number" className="form-label">Mobile Number</label>
                            <input type="text" maxLength={10} className="form-control form-control-sm" name="mobilenumber" value={this.state.mobilenumber} id="number" onChange={this.onChnageHandler} aria-describedby="numberHelpId" placeholder="Enter Mobile number" />
                        </div>
                        <div className='text-center mb-1'>
                            Gender:
                            <div className="form-check form-check-inline mx-2">
                                <input className="form-check-input" type="radio" name="gender" id="Male" value="male" onChange={this.onChnageHandler} checked={this.state.gender === 'male'} />
                                <label className="form-check-label" htmlFor="Male">Male</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gender" id="Female" value="female" onChange={this.onChnageHandler} checked={this.state.gender === 'female'} />
                                <label className="form-check-label" htmlFor="Female">Female</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gender" id="Other" value="other" onChange={this.onChnageHandler} checked={this.state.gender === 'other'} />
                                <label className="form-check-label" htmlFor="Other">Other</label>
                            </div>
                        </div>
                        <div className="mb-1">
                            <label htmlFor="date" className="form-label">Date of Birth</label>
                            <input type="date" className="form-control form-control-sm" name="birthdate" value={this.state.birthdate} id="date" onChange={this.onChnageHandler} aria-describedby="helpId" placeholder="Select date" />
                        </div>
                        <div className="mb-1">
                            <label htmlFor="city" className="form-label">City</label>
                            <select className="form-select form-select-sm" name="city" id="city" value={this.state.city} onChange={this.onChnageHandler}>
                                <option >Select one</option>
                                <option value="New Delhi">New Delhi</option>
                                <option value="Mumbai">Mumbai</option>
                                <option value="Banglore">Banglore</option>
                            </select>
                        </div>
                        <div className="mb-1">
                            <label htmlFor="notes" className="form-label">notes</label>
                            <textarea className="form-control form-control-sm" name="notes" value={this.state.notes} id="notes" rows="3" onChange={this.onChnageHandler}></textarea>
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

                <div >
                    {this.state.StudentData.length > 0 ?
                        <div className='border rounded p-1 m-1 overflow-auto shadow-lg'>
                            <table className="table table-hover table-md ">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Fullname</th>
                                        <th>Email</th>
                                        <th>Mo-Number</th>
                                        <th>Gender</th>
                                        <th>Date of Birth</th>
                                        <th>City</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.StudentData.map((data, index) =>
                                        <tr key={index}>
                                            <td>{data.id}</td>
                                            <td>{data.fullname}</td>
                                            <td>{data.email}</td>
                                            <td>{data.mobilenumber}</td>
                                            <td>{data.gender}</td>
                                            <td>{data.birthdate}</td>
                                            <td>{data.city}</td>
                                            <td>
                                                <button className='btn btn-sm btn-warning mx-2' onClick={() => this.onUpdateButton(data)} title='Edit'>
                                                    <BsPencilSquare />
                                                </button>
                                                <button className='btn btn-sm btn-danger' onClick={() => this.onDelete(data)} title='Delete'>
                                                    <BsTrashFill />
                                                </button>

                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        :
                        <div className='text-center'>
                            data not available
                        </div>
                    }
                </div>
                <ToastContainer />
            </div>
        );
    }
}

export default Dashboard;