import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/logo.png';
import { URL } from '../../config';
import { useEffect } from 'react';
import { getUserData } from '../../redux/reducers/user';
import { Link } from 'react-router-dom';

const NavBar = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user)

  const handleLogOut = () => {
    localStorage.removeItem('token');
    window.location.href = `${URL}/login`
  }

  useEffect(() => {
    if(localStorage.getItem('token')) {
      const token = localStorage.getItem('token')
      dispatch(getUserData(token))
    }
  }, [dispatch])

  return (
    <>
    {(user.username) && (
    <div className='flex fixed justify-between items-center z-10 w-[100vw] bg-[#00000050] backdrop-blur-sm shadow-xl rounded h-fit mx-auto'>
      <div>
      <a href="/">
        <img className="w-20 select-none" src={logo} alt="" />
      </a>
      </div>
      <div className='flex'>
        <Link to='/profile' className='block text-orange-600 text-sm font-bold mb-2 mr-6'>{user.username}</Link>
        <button className='block text-orange-600 text-sm font-bold mb-2 mr-6' onClick={handleLogOut}>Log Out</button>
      </div>
    </div>
    )}
    </>
  )
};

export default NavBar;