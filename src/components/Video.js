import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useParams } from 'react-router-dom';
import { MdAddCircle } from "react-icons/md";
import { BsFillHeartFill } from "react-icons/bs";
import "./Video.css"


export default function Video({ token , admin}) {

    const [video, setVideo] = useState([]);
    const [description, setDescription] = useState("")
    const [vid, setVid] = useState("")
    const [togleee, setTogleee] = useState(false);


    // console.log(token, "token");


    useEffect(async () => {
      
        // console.log(token);
         const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Video`,{
           headers:{authorization:"Bearer " + token},
         });
         setVideo(res.data);
      
      }, []);
    

         const changeDescVal = (e) => {
          setDescription(e.target.value);
      };

        const changeVideo = (e) => {
            setVid(e.target.value);
      };

    
      const addVideo=async ()=>{
        console.log("okkkkk");
        try{
          const result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Video`, {
            description:description,
            video:vid,
          },
          {
            headers:{authorization:"Bearer " + token},
          });
          console.log(result.data);
          const copied = [...video];
          copied.push(result.data)
          setVideo(copied)
        }catch (err){
          console.log("err");
        }
          // console.log(result.data);
      }

      
    
      // const deleteVideo=async (id, index)=>{
      //   try{
      //   const deletedVideo = await axios.delete(`http://localhost:5000/Video/${id}`,{
      //     headers:{authorization:"Bearer " + token},
      //   });
      //   const copied= [...video];
      //   copied.splice(index,1);
      //   setVideo(copied);

      // }catch (err){
      //   console.log("err");
      // }
      // };

      const fav = async (id) => {
        try {
          const result = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/favor/${id}`,
            {},
            {
              headers: { authorization: "Bearer " + token },
            }
          );
          console.log(result.data);
        } catch (error) {
          console.log(error.response.data);
        }
      };

      const showAdd = ()=>{
        setTogleee(true)
      }

      

    return (
        <>
{/* <div className="biggBox">
       
        </div> */}
        {/* {admin==true?():()} */}
{admin==1?( <div className="Video">
        
        <img src="https://i.ibb.co/qFNdN9m/Whats-App-Image-2022-01-10-at-12-15-08-AM.jpg "/>

        {togleee? (<div className="addingV" >
        <input className="inp1" onChange={(e)=> {changeDescVal(e)}}placeholder="الوصف" />{" "}
        <input className="inp1" onChange={(e)=> {changeVideo(e)}} placeholder="رابط الفيديو"/>

        <button className="but1" onClick={()=> {addVideo()}}> اضافة فيديو</button>
        </div>
        
      
        ):(<div className="addingV">
          <MdAddCircle className="MdAddCircle" onClick={()=>{showAdd()}}/></div>)}

         
        <div className="Videoo">

        
        
        {video.map((element, i) => {
            
          return (

            <div  key={element._id}>
              
            <div className="Vidd">
              <p id="pp">  {element.description}</p>
              <hr></hr>
              <p><iframe id="n"  src={`https://www.youtube.com/embed/${element.video}`} ></iframe></p>
              
    
                    {/* <GrBasket className="button" onClick={()=>{deleteVideo(element._id, i)}}/> */}
                    
                    <BsFillHeartFill className="HEART" onClick={() => {fav(element._id) }}/>
                    


            </div>
      
              

            </div>
          );
        })}

      </div> </div>
  
  
  
          ):( <div className="Video">
        
        <img src="https://i.ibb.co/qFNdN9m/Whats-App-Image-2022-01-10-at-12-15-08-AM.jpg "/>
        <div className="Videoo">
        
        {video.map((element, i) => {
            
          return (

            <div  key={element._id}>
              
            <div className="Vidd">
              <p id="pp">  {element.description}</p>
              <hr></hr>
              <p><iframe id="n"  src={`https://www.youtube.com/embed/${element.video}`} ></iframe></p>
              
    
                    {/* <GrBasket className="button" onClick={()=>{deleteVideo(element._id, i)}}/> */}
                    
                    <BsFillHeartFill className="HEART" onClick={() => {fav(element._id) }}/>
                    


            </div>
      
              

            </div>
          );
        })}

      </div> </div>)}
        


      </>
    );
  }
