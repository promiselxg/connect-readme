import { FiBell } from 'react-icons/fi';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user, dispatch } = useContext(AuthContext);
  return (
    <>
      <div className="w-full border-b-[#333] border-b-[0.4px] text-white">
        <div className="container mx-auto flex justify-between items-center p-5">
          <div className="font-Kinn">
            <Link to="/">
              <h1 className="text-transparent  bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                Novu Donate
              </h1>
            </Link>
          </div>
          {!user ? (
            <>
              <Link to="/login">
                <button className="btn">Login</button>
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <div className="logo">
                  <FiBell />
                </div>
                <div className="dropdown dropdown-end  ">
                  <label tabIndex={0} className="btn m-1">
                    {user.username}
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-[rgba(0,0,0,0.75)] rounded-box w-52"
                  >
                    <li>
                      <a className="hover:bg-[#333]">Create Event</a>
                    </li>
                    <li>
                      <a
                        onClick={() => dispatch({ type: 'LOGOUT' })}
                        className="hover:bg-[#333]"
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
