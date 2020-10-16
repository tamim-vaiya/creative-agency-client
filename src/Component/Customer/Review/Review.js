import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../../images/logos/logo.png';
import { useForm } from "react-hook-form";
import { UserContext } from '../../../App';

const Review = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { review, setReview } = useState([]);

    const { register, handleSubmit, err } = useForm();
    const onSubmit = data => {
        data.email = `${loggedInUser.email}`;
        fetch('http://localhost:5000/addReview', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(success => {
                if (success) {
                    alert('Your review done successfully')
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <div style={{ background: '#FFFFFF' }}>
            <div className='container'>
                <div style={{ padding: '20px 0' }} className="Topbar d-flex">
                    <div style={{ width: '20%' }} className="top">
                        <Link to='/home'><img style={{ width: '150px' }} src={logo} alt="" /></Link>
                    </div>
                    <div style={{ width: '80%' }} className="userData d-flex justify-content-between">
                        <h5 style={{ marginTop: '15px' }}>Review</h5>
                        <h5 style={{ marginTop: '15px' }}>{loggedInUser.name}</h5>
                    </div>

                </div>
            </div>

            <div className="row">
                <div className="col-md-3">
                    <div className="orderList">
                        <NavLink className="navList" activeClassName='text-success' to="/order">
                            Order
                        </NavLink>
                        <NavLink className="navList" activeClassName='text-success' to="/serviceList">
                            Service list
                        </NavLink>
                        <NavLink className="navList" activeClassName='text-success' to="/review">
                            Review
                        </NavLink>
                    </div>
                </div>

                <div className="col-md-9">
                    <div className="orderSubmit">
                        <form onSubmit={handleSubmit(onSubmit)} >
                            <input name="name" style={{ width: '570px', padding: '20px 10px' }} placeholder='Your name ' className='form-control' value={loggedInUser.name} ref={register({ required: true })} /> <br />
                            <input name="company" style={{ width: '570px', padding: '20px 10px' }} placeholder='Company’s name, Designation' className='form-control' ref={register({ required: true })} /> <br />
                            <textarea name="description" style={{ width: '570px', padding: '20px 10px' }} placeholder='Description' className='form-control' ref={register({ required: true })} /> <br />
                            <input type="submit" value='SUBMIT' style={{ width: '150px', height: '40px', fontSize: '16px', background: '#111430', color: '#FFFFFF', borderRadius: '10px', marginTop: '20px' }} />
                        </form>
                    </div>
                </div>
            </div >
        </div>
    );
};

export default Review;