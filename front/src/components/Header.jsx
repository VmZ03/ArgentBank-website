import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/user.actions";

import Logo from "../assets/images/argentBankLogo.webp";

function Header() {
  // Enregistrement du token avec useSelector
  const token = useSelector((state) => state.user.token);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  return (
    <header>
      <nav className="main-nav">
        <NavLink className="main-nav-logo" to={"/"}>
          <img
            className="main-nav-logo-image"
            src={Logo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </NavLink>
        <div>
          {token ? (
            // Si le token est là mettre le lien de déconnexion
            <div className="user-nav">
              <NavLink className="user-nav-item" to={"/User"}>
                <i className="user-nav-icon fa fa-user-circle"></i>
                <p className="user-nav-name">{user.userName}</p>
              </NavLink>

              <NavLink
                className="user-nav-item"
                to={"/SignIn"}
                onClick={() => dispatch(logout())}
              >
                <i className="fa fa-sign-out"></i>
                <p>Sign Out</p>
              </NavLink>
            </div>
          ) : (
            // Sinon laisser le Sign In
            <NavLink className="main-nav-item" to={"/SignIn"}>
              <i className="fa fa-user-circle"></i>
              Sign In
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
