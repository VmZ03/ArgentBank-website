import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isLogged } from "../redux/actions/user.actions";
import { editName } from "../redux/actions/user.actions";

import Account from "../components/Account";
import EditNameForm from "../components/EditNameForm";

function User() {
  const user = useSelector((store) => store.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formdata] = useState({
    id: "",
    email: "",
  });

  useEffect(() => {
    // S'il n'y a pas de user.token retourne vers la page SignIn
    if (user.token === null) {
      return navigate("/SignIn");
    } else {
      const handleProfile = async () => {
        try {
          await fetch("http://localhost:3001/api/v1/user/profile", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(formdata),
          })
            .then((response) => {
              if (response.ok) {
                return response.json();
              }
            })
            .then((data) => {
              dispatch(isLogged(data.body));
            });
        } catch (error) {
          console.log(error);
        }
      };

      handleProfile();
    }
  }, [dispatch, navigate, user.token, user.isLogged, formdata]);

  const [showEditForm, setShowEditForm] = useState(false);

  const handleShowEditForm = () => {
    setShowEditForm(!showEditForm);
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    dispatch(editName(formdata));
    setShowEditForm(false);
  };

  return (
    <main className="main user-bg-dark">
      <div className="header">
        {!showEditForm && (
          <h1>
            Welcome back
            <br />
            {user.firstName} {user.lastName}!
          </h1>
        )}
        {!showEditForm && (
          <button className="edit-button" onClick={handleShowEditForm}>
            Edit Name
          </button>
        )}
        {showEditForm && (
          <EditNameForm
            onSubmit={handleEditFormSubmit}
            handleShowEditForm={handleShowEditForm}
          />
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>

      <Account
        title="Argent Bank Checking (x8349)"
        amount="$2,082.79"
        text="Available Balance"
        showEditForm={showEditForm}
      />

      <Account
        title="Argent Bank Savings (x6712)"
        amount="$10,928.42"
        text="Available Balance"
        showEditForm={showEditForm}
      />

      <Account
        title="Argent Bank Credit Card (x8349)"
        amount="$184.30"
        text="Current Balance"
        showEditForm={showEditForm}
      />
    </main>
  );
}

export default User;
