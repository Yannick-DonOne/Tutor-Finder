import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import regist from '../img/register.svg';
import './Reg.css';
function RegLog(props) {
  const authContext = useContext(AuthContext);
  const { register, isAuthenticated, store } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/mainapp');
    }
  }, [isAuthenticated, props.history]);

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    speciality: '',
    bio: '',
    status: 'learner',
    location: '',
    tel: '',
  });
  const [gender, setGender] = useState('male', 'female');
  function handleChange(e) {
    setGender(e.target.value);
  }

  const {
    username,
    email,
    password,
    password2,
    speciality,
    bio,
    status,
    location,
    tel,
  } = user;
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    register({
      username,
      email,
      password,
      speciality,
      gender,
      bio,
      status,
      location,
      tel,
    });
  };
const [disabled, setDisabled] =useState(false);
const inputRef1 = useRef(null)
const tagRef = useRef(null)
const toggleEnable = (x) => {
  if (x == 0){
    setDisabled(true)
    
    inputRef1.current.style.display = 'none'
  }
  else{
    setDisabled(false)
    inputRef1.current.style.display = 'block'
    
  } 
}

  useEffect(() => {}, []);
  return (
    <div className="main-tablet">
      <div className="tablet">
        <div className="left-tablet">
          <div className="hold">
            <div className="tablet-txt">
              <h1>Create an Account</h1>
              <div className="txt-1">
                <p className=" text-muted mb-0 ">
                  Sign up and discover great tutors and fascinating lessons!
                </p>
              </div>
              <div className="img-fluid">
                <img src={regist} alt="" className="img1" />
              </div>
            </div>
          </div>
        </div>
        <div className="right-tablet">
          <div className="pad-form">
            <div className="role1">
              <h3>Choose Role</h3>
            </div>
            <div className="holdform">
              <form onSubmit={onSubmit}>
                <div className="row">
                  <div className="radio-role">
                    <div>
                      Tutor
                      <input
                        type="radio"
                        name="status"
                        value="tutor"
                        className="m-3"
                        onChange={onChange}
                        onClick={() => toggleEnable(1)}
                      />
                    </div>
                    <div>
                      Learner
                      <input
                        type="radio"
                        name="status"
                        value="learner"
                        onChange={onChange}
                        className="m-3"
                        onClick={() => toggleEnable(0)}
                      />
                    </div>
                  </div>
                  <div className="input-group col-lg-6 mb-4">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-white px-4 border-md border-right-0">
                        <i className="fa fa-user text-muted"></i>
                      </span>
                    </div>
                    <input
                      id="userName"
                      type="text"
                      name="username"
                      value={username}
                      placeholder="User Name"
                      onChange={onChange}
                      className="form-control bg-white border-left-0 border-md"
                    />
                  </div>

                  <div class="input-group col-lg-12 mb-4">
                    <div class="input-group-prepend">
                      <span class="input-group-text bg-white px-4 border-md border-right-0">
                        <i class="fa fa-envelope text-muted"></i>
                      </span>
                    </div>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={email}
                      placeholder="Email Address"
                      onChange={onChange}
                      class="form-control bg-white border-left-0 border-md"
                    />
                  </div>
                  <div class="input-group col-lg-12 mb-4">
                    <div class="input-group-prepend">
                      <span class="input-group-text bg-white px-4 border-md border-right-0">
                        <i class="fa fa-phone-square text-muted"></i>
                      </span>
                    </div>
                    <input
                      id="tel"
                      type="tel"
                      name="tel"
                      value={tel}
                      placeholder="Phone Number"
                      onChange={onChange}
                      class="form-control bg-white border-md border-left-0 pl-3"
                    />
                  </div>
                  <div class="input-group col-lg-6 mb-4">
                    <div class="input-group-prepend">
                      <span class="input-group-text bg-white px-4 border-md border-right-0">
                        <i class="fab fa-black-tie" ref={tagRef}></i>
                      </span>
                    </div>
                    {/* <input id="speciality" ref={inputRef1} type="text" name="speciality" value={speciality}  
                     onChange={onChange} disabled={disabled} 
                     placeholder="Speciality" onChange={(e)=>toggleEnable(e)} 
                     class="form-control bg-white border-left-0 border-md"/> */}
                    <input
                      id="name"
                      type="text"
                      name="speciality"
                      placeholder="Speciality"
                      value={speciality}
                      ref={inputRef1}
                      onChange={onChange}
                      className="form-control bg-white border-left-0 border-md"
                    />
                  </div>
                  <div className="disposal">
                    <div class="input-group col-lg-4 mb-4 ">
                      <div class="input-group-prepend">
                        <span class="input-group-text bg-white px-4 border-md border-right-0">
                          <i class="fas fa-mars"></i>
                        </span>
                      </div>
                      <select
                        id="gender"
                        name="gender"
                        value={gender}
                        onChange={handleChange}
                        class="form-control custom-select bg-white border-left-0 border-md"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div class="input-group col-lg-6 mb-4">
                      <div class="input-group-prepend">
                        <span class="input-group-text bg-white px-4 border-md border-right-0">
                          <i className="fa fa-map-marker text-muted"></i>
                        </span>
                      </div>
                      <input
                        id="location"
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={location}
                        onChange={onChange}
                        class="form-control bg-white border-left-0 border-md"
                      />
                    </div>
                  </div>
                  <div class="input-group col-lg-6 mb-4">
                    <div class="input-group-prepend">
                      <span class="input-group-text bg-white px-4 border-md border-right-0">
                        <i class="fa fa-lock text-muted"></i>
                      </span>
                    </div>
                    <input
                      id="password"
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={onChange}
                      class="form-control bg-white border-left-0 border-md"
                    />
                  </div>
                  <div class="input-group col-lg-6 mb-4">
                    <div class="input-group-prepend">
                      <span class="input-group-text bg-white px-4 border-md border-right-0">
                        <i class="fa fa-lock text-muted"></i>
                      </span>
                    </div>
                    <input
                      id="password2"
                      type="password"
                      name="password2"
                      value={password2}
                      onChange={onChange}
                      placeholder="Confirm Password"
                      class="form-control bg-white border-left-0 border-md"
                    />
                  </div>
                  <div class="input-group col-lg-3 mb-4">
                    <div class="input-group-prepend"></div>
                    <textarea
                      id="bio"
                      type="text"
                      name="bio"
                      value={bio}
                      onChange={onChange}
                      placeholder="Bio"
                      class="form-control bg-white border-left-0 border-md"
                    ></textarea>
                  </div>
                  <div class="form-group col-lg-12 mx-auto mb-0">
                    <input
                      class="btn btn-danger btn-block py-2 font-weight-bold"
                      type="submit"
                      value="Create your account"
                    />
                  </div>
                  <p className="social-text1">
                    Or Sign up with social platforms
                  </p>
                  <div className="social-media">
                    <a href="#!" className="social-icon">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#!" className="social-icon">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#!" className="social-icon">
                      <i className="fab fa-google"></i>
                    </a>
                    <a href="#!" className="social-icon">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                  <p className="parag">
                    If you already have an account, just sign in!
                    <Link to="/login">Login</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegLog;
