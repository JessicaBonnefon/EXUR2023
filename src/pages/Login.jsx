import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { login, getUserData } from "../redux/reducers/user";

 const Login = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const error = useSelector((state) => state.user.error);
    const [displayMessage, setDisplayMessage] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target[0].value;
        const password = event.target[1].value;
        dispatch(login(email, password));
    }

    useEffect(() => {
        if(user.token) {
            localStorage.setItem("token", user.token);

            dispatch(getUserData(user.token));
            navigate("/");
        }
        if(error) {
            setDisplayMessage(error)
        }
    }, [error, user.token, navigate, dispatch])

    useEffect(() => {
        if(localStorage.getItem('token')) {
            
            navigate('/')
        }
    })

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center space-y-10 map-background">
        <form className="bg-[#00000099] backdrop-blur-sm shadow-xl rounded px-8 pt-6 pb-8 h-fit mx-auto max-w-xs" onSubmit={handleSubmit}>
            <div className="flex w-full p-10 justify-center">
                <a href="/">
                    <img className="w-24 select-none" src={logo} alt="" />
                </a>
            </div>
            <div className="mb-4">
                <label className="block text-orange-600 text-sm font-bold mb-2" htmlFor="email">Email
                    <input className="shadow appearance-none bg-black border border-orange-500 rounded w-full py-2 px-3 text-orange-700 mb-3 leading-tight focus:outline-none focus:placeholder:text-gray-500" placeholder="example@exur.com" type="email" required />
                </label>
            </div>
            <div className="mb-2">
                <label className="block text-orange-600 text-sm font-bold mb-2" htmlFor="password">Password
                    <input className="shadow appearance-none bg-black border border-orange-500 rounded w-full py-2 px-3 text-orange-700 leading-tight focus:outline-none focus:placeholder:text-gray-500" placeholder="******" type="password" required minLength={6} />
                </label>
            </div>
                <Link className="flex mb-8 text-center align-baseline font-bold text-sm text-orange-600 hover:text-custom-green-500" to="/forgot-password">Forgot Password?</Link>
            <div className="flex items-center justify-center">
                <button className="bg-orange-700 text-white transition border border-black hover:bg-orange-500 hover:text-white font-bold py-2 px-4 rounded focus:outline-none" type="submit">Log In</button>
            </div>
            {displayMessage && <p className="mt-5 text-center text-red-500">{displayMessage}</p>}
            <Link className="flex justify-center mt-8 text-center align-baseline font-bold text-sm text-orange-600 hover:text-custom-green-500" to="/signup">Do not have an account?
                <br />
                Register Now!
            </Link>
        </form>
    </div>
  )
}

export default Login;
