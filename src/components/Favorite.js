import React, {useState,useEffect} from 'react'
import axios from 'axios';
import { BsFillHeartFill } from "react-icons/bs";
import "./Video.css"



export default function Favorite({token}) {
    const [favor, setFavor] = useState([""]);


    useEffect(async()=>{
        try {
            if(token){
                const result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/favoritee`,{
                    headers:{authorization:"Bearer " + token},
                });
                setFavor(result.data);
                console.log(result.data);
            };
        } catch (error) {
            console.log(error.response.data);
        }
    },[token]); 



    const deletFav=async (id, index)=>{
                // console.log("its deleted fav");
      try{
        const result = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/unfavor/${id}`,{
          headers:{authorization:"Bearer " + token},
        });
          const copied= [...favor];
          copied.splice(index,1);
          setFavor(copied);
      }catch (err){
        console.log("err");
      }
    };     
  


    return (
        <>
<div className="Video">
        
        <img src="https://i.ibb.co/q13hxKH/Whats-App-Image-2022-01-09-at-11-37-22-PM.jpg "/>
        <div className="Videoo">
        
        {favor.map((element, i) => {
            
          return (

            <div  key={element._id}>
              
            <div className="Vidd">
              <p id="pp">  {element.description}</p>
              <hr></hr>
              <p><iframe id="n"  src={`https://www.youtube.com/embed/${element.video}`} ></iframe></p>
              
    
                    {/* <GrBasket className="button" onClick={()=>{deleteVideo(element._id, i)}}/> */}
                    
                    <BsFillHeartFill className="HEART2" onClick={() => {deletFav(element._id,i) }}/>
                    


            </div>
      
              

            </div>
          );
        })}

      </div> </div>
        


          

        </>
    )
}
