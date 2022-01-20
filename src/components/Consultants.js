import React, { useState, useEffect } from 'react';
import axios from 'axios' ;
import { GrBasket } from "react-icons/gr";
import { MdAddCircle } from "react-icons/md";


import "./Consultant.css"



export default function Consultants({token , admin}) {

    const [consultant, setConsultant] = useState([]);
    const [Name, setName] = useState("")
    const [aboutYou, setAboutYou] = useState("")
    const [specialty, setSpecialty] = useState("")
    const [img, setImg] = useState("")
  const [togleee, setTogleee] = useState(false);



    useEffect( async() => {
        const response= await axios.get (`${process.env.REACT_APP_BACKEND_URL}/consultant`,{
          headers:{authorization:"Bearer " + token},
        });
        setConsultant(response.data);
    }, [])



    const addDoctore = async () => {
      try {
        const result = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/Consultant`,
          {
            Name:Name,specialty:specialty,aboutYou:aboutYou,img:img
          },
          {
            headers: { authorization: "Bearer " + token },
          }
        );
        const copied = [...consultant];
        copied.push(result.data);
        setConsultant(copied);
      } catch (err) {
        console.log("err");
      }
    };

    const deletdoctore = async (id, index) => {
      try {
        const deletdoctore = await axios.delete(
          `${process.env.REACT_APP_BACKEND_URL}/Consultant/${id}`,
          {
            headers: { authorization: "Bearer " + token },
          }
        );
        const copied = [...consultant];
        copied.splice(index, 1);
        setConsultant(copied);
      } catch (err) {
        console.log("err");
      }
    };


    const changeName =(e)=>{
      setName(e.target.value)
    }
    const changespecialty =(e)=>{
      setAboutYou(e.target.value)
    }
    const changeaboutYou =(e)=>{
      setSpecialty(e.target.value)
    }
    const changeimg =(e)=>{
      setImg(e.target.value)
    }
    
const showAdd = ()=>{
    setTogleee(true)
  }


    return (
        <div className='containerbig'>

           {admin==1? (
           <div className='coco'>
        <img className='imggg' src="https://i.ibb.co/1zyJ9F3/Whats-App-Image-2022-01-09-at-10-12-08-PM.jpg"></img>
           
        <div className='container'>
        {consultant.map((element, i) => {
          
          return (

            <div className="elemDiv" key={element._id}>
              <div className='imgg'><img className='img1' src={element.img} alt='اضف صورة'/></div>
              <hr></hr>
                
                <p className="chaildC chaildC1"> {element.Name} </p>
                <p className="chaildC chaildC1"> {element.specialty} </p>
                <p className="chaildC chaildC3" > {element.aboutYou} </p>
                <GrBasket
                  className="delbtn"
                  onClick={() => {
                    deletdoctore(element._id, i);
                  }}
                />
            </div>
          );
        })}
        </div>
        
          {togleee? (<div className='addDoctor'>
          <input onChange={(e)=>{changeName(e)}} placeholder='الاسم' ></input>
          <input onChange={(e)=>{changespecialty(e)}}placeholder='التخصص'></input>
          <input placeholder='سنوات الخبرة' onChange={(e)=>{changeaboutYou(e)}}></input>
          <input placeholder='الصورة' onChange={(e)=>{changeimg(e)}}></input>
          <button onClick={()=>{addDoctore()}}>add</button>
      </div>
        ):(<div className="adding">
          <MdAddCircle className="MdAddCircle" onClick={()=>{showAdd()}}/></div>)}
        </div>
        
        ):(
        
        <div className='coco' >
          <img className='imggg'  src="https://i.ibb.co/1zyJ9F3/Whats-App-Image-2022-01-09-at-10-12-08-PM.jpg"></img>

          <div className='container'>
            {consultant.map((element, i) => {
              
              return (
    
                <div className="elemDiv" key={element._id}>
                  <div className='imgg'><img className='img1' src={element.img} alt='اضف صورة'/></div>
                  <hr></hr>
                    
                    <p id='pColor' className="chaildC chaildC1"><b>{element.Name}</b></p>
                    <p className="chaildC chaildC3">{element.aboutYou}</p>
                    <p className="chaildC chaildC1">{element.specialty}</p>

  
                </div>
              );
            })}
            </div></div>)}

            
            
            
            
        </div>
    )
}
