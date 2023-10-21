import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editName } from "../redux/actions/user.actions";

function EditNameForm({ handleShowEditForm }) {
    const user = useSelector(store => store.user)
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        userName: user.userName,
    });

    const handleChangeForm = (e) => {

        setForm({ ...form, [e.target.name]: e.target.value });
      };

    const handleEditForm = (e) => {
        e.preventDefault();

        try {
            fetch('http://localhost:3001/api/v1/user/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify(form)
            }).then(response => {
                if (response.ok) {
                    return response.json()
                }
            }).then(data => {
                dispatch(editName(data.body))
                handleShowEditForm()
            })
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <div className="edit-form-content">
            <h2>Edit user info</h2>
            <form className="edit-form">
                <div className="edit-input-wrapper">
                    <label htmlFor="username">User name:</label>
                    <input 
                        type="text"
                        name="userName"
                        id="username"
                        value={form.userName}
                        onChange={handleChangeForm}
                    />
                </div>
                <div className="edit-input-wrapper">
                    <label htmlFor="firstname">First name:</label>
                    <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        value={user.firstName}
                        disabled
                    />
                </div>
                <div className="edit-input-wrapper">
                    <label htmlFor="lastname">Last name:</label>
                    <input 
                        type="text"
                        name="lastname"
                        id="lastname"
                        value={user.lastName}
                        disabled
                    />
                </div>
                <div className="edit-form-buttons">
                    <button type="submit" className="edit-form-button" onClick={handleEditForm}>Save</button>
                    <button className="edit-form-button" onClick={handleShowEditForm}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default EditNameForm;
