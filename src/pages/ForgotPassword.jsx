import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

import { forgotPassword } from '../redux/reducers/user';
import { useEffect } from 'react';

function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const message = useSelector((state) => state.user.message);
  const error = useSelector((state) => state.user.error);

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if(localStorage.getItem('token')) {
        navigate('/')
    }
});

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center space-y-10 map-background">
      <form className="bg-[#00000099] backdrop-blur-sm rounded px-8 pt-6 pb-8 h-fit mx-auto max-w-xs" onSubmit={handleSubmit}>
        <div className="flex w-full p-10 pb-6 justify-center">
          <a href="/">
            <img className="w-24 select-none" src={logo} alt="logo" />
          </a>
        </div>
          <div className="flex justify-center mb-8 text-center align-baseline font-bold text-lg text-orange-600 hover:text-custom-green-500">
            Recover Password
          </div>
        <div className="mb-4">
          <label className="block text-orange-600 text-sm font-bold mb-4" htmlFor="email">
            Email
            <input className="shadow appearance-none bg-black border border-orange-500 rounded w-full py-2 px-3 text-orange-700 mb-3 leading-tight focus:outline-none focus:placeholder:text-gray-500" placeholder="example@exur.com" type="email" required />
          </label>
        </div>
        <div className="flex items-center justify-center">
          <button className="bg-orange-700 text-white transition border border-black hover:bg-orange-500 hover:text-white font-bold py-2 px-4 rounded focus:outline-none" type="submit">
            Submit
          </button>
        </div>
        {message && <p className="mt-5 text-center text-custom-green-500">{`${message} Please Check your email to continue.`}</p>}
        {error && <p className="mt-5 text-center text-red-500">{error.response.data.error[0]}</p>}
        <Link to="/login" exact="true" className="flex justify-center mt-8 text-center align-baseline font-bold text-sm text-orange-600 hover:text-custom-green-500">
          Log In here
        </Link>
      </form>
    </div>
  );
}

export default ForgotPassword;