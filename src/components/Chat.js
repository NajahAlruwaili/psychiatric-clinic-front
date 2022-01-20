import React, { useState, useEffect }  from 'react'
import axios from 'axios';
import { GrBasket } from "react-icons/gr";
import "./Chat.css"

export default function Chat({ token, admin }) {
    const [chats, setChats] = useState([])
    const [Names, setNames] = useState("")
    const [EmailMsgs, setEmailMsgs] = useState("")
    const [PhoneMsgs, setPhoneMsgs] = useState("")
    const [DoctorNames, setDoctorNames] = useState("")
    const [Titles, setTitles] = useState("")
    const [MasgeIss, setMasgeIss] = useState("")



    useEffect(async()=> {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Amasege`,{
        headers:{authorization:"Bearer " + token},
      });
      setChats(res.data);
      // console.log(res.data);
    }, []);


    


    const name = (e) => {
        setNames(e.target.value);
      };
      const emailMsg = (e) => {
        setEmailMsgs(e.target.value);
      };
      const phoneMsg = (e) => {
        setPhoneMsgs(e.target.value);
      };
      const doctorName = (e) => {
        setDoctorNames(e.target.value);
      };
      const title = (e) => {
        setTitles(e.target.value);
      };
      const masgeIs = (e) => {
        setMasgeIss(e.target.value);
      };

      const sendMasgesss = async () => {
        // console.log("its working");
        try {
          console.log("inter try");
          const result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Amasege`,{
              Names: Names,EmailMsgs: EmailMsgs,
              PhoneMsgs: PhoneMsgs,DoctorNames: DoctorNames,
              Titles: Titles,MasgeIss: MasgeIss,
            },{
              headers:{authorization:"Bearer " + token},
            });
          // console.log(result.data);
          const copied = [...chats];
          copied.push(result.data);
          setChats(copied);
        } catch (err) {
          console.log("err");
        }
      };

      const deletemsg = async (id, index) => {
        try {
          const deletepost = await axios.delete( `${process.env.REACT_APP_BACKEND_URL}/Amasege/${id}`,{
              headers:{authorization:"Bearer " + token},
            });
          const copied = [...chats];
          copied.splice(index, 1);
          setChats(copied);
        } catch (err) {
          console.log("err");
        }
      };




    
    return (
        <div className='bigMsg'>
          <img src="https://i.ibb.co/KVBmJR5/Whats-App-Image-2022-01-10-at-12-10-17-AM.jpg"/>
            {/* <input placeholder='chating' onChange={(e)=> {sendCaht(e);}}/>{" "} */}
            
           
            
          {admin==2?(<div className="bigDiv">
            {chats.map((element, i) => {
    
              return (
    
                 <div className="msgggBox" key={element._id}> {" "}
                 <div className='pharagraph'>
                  <p className="pst">الاسم:{element.Names}</p>
                  <p className="pst">{element.EmailMsgs}:الايميل</p>
                  <p className="pst">رقم الجوال:{element.PhoneMsgs}</p>
                  <p className="pst">اسم الاستشاري:{element.DoctorNames}</p>
                  <p className="pst">الموضوع:{element.Titles}</p>
                  <p className="pst">الاستشارات:{element.MasgeIss}</p> 
                 </div>
                  

                  {/* <button> حذف </button> */}
                  <div className="delbtn">
                  <GrBasket  onClick={() => {deletemsg(element._id, i);}} />
                  </div>

                  
                
                </div>

                 
              );
            })}
            
    
           </div>
           ):(
           <div className='masegs'>

                <div className='top'>
                  <input onChange={(e)=>{doctorName (e)}} placeholder='اسم الاستشاري'></input>
                  <input onChange={(e)=>{title (e)}} placeholder='الموضوع'></input>
               </div>
                <div className='medel'>

                <input onChange={(e)=>{phoneMsg (e)}} placeholder='رقم الجوال'></input>
                <input onChange={(e)=>{emailMsg (e)}} placeholder='الايميل'></input>
                <input onChange={(e)=>{name (e)}} placeholder='الاسم'></input>

                </div>

                <div className='doun'>
                  <input onChange={(e)=>{masgeIs(e)}} placeholder='استشارتك'></input>
               </div>
               <div className='nn'>
               <button onClick={()=>{sendMasgesss()}}> ارسال </button>
               </div>
               <h1>ملاحظة: الرجاء التأكد من صحة البيانات المدخله حتى يتم التواصل معكم بشكل صحيح وسريع  </h1>
 
          </div>)}

          
   
        </div>
    )
}

