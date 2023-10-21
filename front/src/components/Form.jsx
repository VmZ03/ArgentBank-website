import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/user.actions";
import { useNavigate } from "react-router-dom";

function Form() {
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    fetch("http://localhost:3001/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
      // Si la réponse est réussie, extraire les données JSON de la réponse.
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        // Si les données JSON sont valides, connecter l'utilisateur.
      })
      .then((data) => {
        dispatch(login(data.body));
        navigate("/User");
      });
  };

  return (
    <form>
      <div className="input-wrapper">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          value={formdata.email}
          onChange={handleChange}
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formdata.password}
          onChange={handleChange}
        />
      </div>
      <div className="input-remember">
        <input type="checkbox" id="remember-me" />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      <button type="submit" className="sign-in-button" onClick={handleLogin}>
        Sign In
      </button>
    </form>
  );
}

export default Form;
