import { useDispatch } from 'react-redux';

import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// import { useNavigate } from 'react-router-dom';

import { passwordReset } from '../redux/reducers/user';
import logo from '../assets/logo.png';

function ResetPassword() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const searchQuery = location.search;
  const resetToken = searchQuery.split('&reset_password_token=')[1];
  // const navigate = useNavigate();

  const [displayMessage, setDisplayMessage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPassword = event.target[0].value;
    const confirmPassword = event.target[1].value;
    if (newPassword === confirmPassword) {
      dispatch(passwordReset(newPassword, resetToken))
        .then(() => {
          setDisplayMessage('Pasword changed succesfully. You will be redirected to sign in page shortly');
          const timer = setTimeout(() => {
            navigate('/', { replace: true });
            window.location.reload();
          }, 5000);
          return () => clearTimeout(timer);
        });
    } else {
      setDisplayMessage('Password do not match, please re-enter');
    }
  };

  useEffect(() => {
    if(localStorage.getItem('token')) {
        navigate('/')
    }
});

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center space-y-10 map-background">
      <form className="bg-[#00000099] backdrop-blur-sm shadow-xl rounded px-8 pt-6 pb-8 h-fit mx-auto max-w-xs" onSubmit={handleSubmit}>
        <div className="flex w-full p-10 justify-center">
          <a href="/">
            <img className="w-24 select-none" src={logo} alt="logo" />
          </a>
        </div>
        <div className="mb-4">
          <label className="block text-orange-600 text-sm font-bold mb-2" htmlFor="password">
            New password
            <input className="shadow appearance-none bg-black border border-orange-500 rounded w-full py-2 px-3 text-orange-700 leading-tight focus:outline-none focus:placeholder:text-gray-500" id="password" type="password" placeholder="******" minLength={6} required />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-orange-600 text-sm font-bold mb-2" htmlFor="confirm-password">
            Confirm password
            <input className="shadow appearance-none bg-black border border-orange-500 rounded w-full py-2 px-3 text-orange-700 leading-tight focus:outline-none focus:placeholder:text-gray-500" id="confirm-password" type="password" placeholder="******" minLength={6} required />
          </label>
        </div>
        <div className="flex items-center justify-center">
          <button className="bg-orange-700 text-white transition border border-black hover:bg-orange-500 hover:text-white font-bold py-2 px-4 rounded focus:outline-none" type="submit">
            Submit
          </button>
        </div>
        {displayMessage && <p className="mt-5 text-center text-red-500">{displayMessage}</p>}
      </form>
    </div>
  );
}

export default ResetPassword;