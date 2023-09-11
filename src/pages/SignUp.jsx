import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { signUp } from "../redux/reducers/user";
import logo from "../assets/logo.png";
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
    const dispatch = useDispatch();
    const [displayMessage, setDisplayMessage] = useState(false);
    const navigate = useNavigate();
    const error = useSelector((state) => state.user.error);
    const newUser = useSelector((state) => state.user);

    const handleSubmit = (event) => {
        event.preventDefault();
        const username = event.target[0].value;
        const email = event.target[1].value;
        const password = event.target[2].value;
        const confirmPassword = event.target[3].value;
        if (password === confirmPassword) {
          dispatch(signUp(username, email, password));
        } else {
          setDisplayMessage('Password do not match, please re-enter password correctly');
        }
      };

      useEffect(() => {
        if (Object.keys(newUser).length !== 0 && !newUser.error) {
          localStorage.setItem('user', JSON.stringify(newUser));
          navigate('/');
        }
    
        if (error) {
          setDisplayMessage(error);
        }
      }, [newUser]);

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
            <label className="block text-orange-600 text-sm font-bold mb-2" htmlFor="username">
              Username
              <input className="shadow appearance-none bg-black border border-orange-500 rounded w-full py-2 px-3 text-orange-700 mb-3 leading-tight focus:outline-none focus:placeholder:text-gray-500" id="username" type="text" placeholder="Username" required />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-orange-600 text-sm font-bold mb-2" htmlFor="email">
              E-mail
              <input type="email" className="shadow appearance-none bg-black border border-orange-500 rounded w-full py-2 px-3 text-orange-700 mb-3 leading-tight focus:outline-none focus:placeholder:text-gray-500" id="email" placeholder="example@exur.com" required />
            </label>
          </div>
          <div className="mb-6">
            <label className="block text-orange-600 text-sm font-bold mb-2" htmlFor="password">
              Password
              <input className="shadow appearance-none bg-black border border-orange-500 rounded w-full py-2 px-3 text-orange-700 mb-3 leading-tight focus:outline-none focus:placeholder:text-gray-500" id="password" type="password" placeholder="******" minLength={6} required />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-orange-600 text-sm font-bold mb-2" htmlFor="confirm-password">
              Confirm password
              <input className="shadow appearance-none bg-black border border-orange-500 rounded w-full py-2 px-3 text-orange-700 mb-3 leading-tight focus:outline-none focus:placeholder:text-gray-500" id="confirm-password" type="password" placeholder="******" required />
            </label>
          </div>
          <div className="flex items-center justify-center">
            <button className="bg-orange-700 text-white transition border border-black hover:bg-orange-500 hover:text-white font-bold py-2 px-4 rounded focus:outline-none" type="submit">
              Sign Up
            </button>
          </div>
          {displayMessage && <p className="mt-5 text-center text-red-500">{displayMessage}</p>}
          <Link to="/Login" exact="true" className="flex justify-center mt-10 text-center align-baseline font-bold text-sm text-orange-600 hover:text-custom-green-500">
            Already have an account?
            <br />
            Log In Now!
          </Link>
        </form>
      </div>
    )
}

export default SignUp;