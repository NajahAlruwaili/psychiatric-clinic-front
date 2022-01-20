import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import "./SignUp.css"


export default function Login({setAdmin, setToken, setUserId }) {
  const [Email ,setEmail] = useState ("");
  const [Pass ,setPass] = useState ("");
  // const [admin, setAdmin] = useState(null)
  const history = useHistory();



  const changePass= (e)=> {
    setPass(e.target.value);
  };


  const changEmail= (e)=> {
    setEmail(e.target.value);
  };
  


  const checkLogin= async ()=> {
    try {
      const response= await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
        Email: Email,
        Pass: Pass,
      });
      console.log(response.data);
      setToken(response.data.token);
      setAdmin(response.data.payload.admin);
      setUserId(response.data.payload.userId)
      console.log(response.data.payload.userId, "it is useeer");

      // console.log(admin,"it adddddddmin");
      
      history.push("/video") ;
    } catch (error) {
    console.log(error);
    }
  };


  return (


    <div className="signUp">
      <div className="signBox">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0BaxevbHsera-I9b57I40phEGm3caprMeLA&usqp=CAU"></img>
       <div>
         <input className="input2" onChange={(e)=> {changEmail(e)}} placeholder="enter your Email"/>
       </div>

        <div>
          <input className="input2" onChange={(e)=> {changePass(e)}} type="Password" placeholder="enter your Password"/>
        </div>

        <div>
          <button id="button2" onClick={()=> {checkLogin()}}><h2>Login</h2> </button>
        </div>

        <h3 className="su">لا امتلك حساب ؟</h3>
        <a className="suu" href='/signUp'>  أنشاء حساب جديد</a>

      </div>
      
    </div>

  );
}
