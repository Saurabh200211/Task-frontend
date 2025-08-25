import React, { useState, useEffect } from 'react';
import Cards from '../components/Home/Cards';
import axios from "axios";
import { IoAddCircleSharp } from "react-icons/io5";
import InputData from '../components/Home/InputData';


const AllTasks =() =>{
  
  const [InputDiv, setInputDiv] = useState("hidden");
   const [Data, setData] = useState();
   const [UpdatedData, setUpdatedData] = useState({
      id:"",
      title:"",
      desc:"",
   });
   const headers = {id:localStorage.getItem("id"), 
    authorization: `Bearer ${localStorage.getItem("token")}`,
};
  useEffect(() =>{
          const fetch = async()  =>{
       const response =   await axios.get("http://localhost:1000/api/v2/get-all-tasks",
             { headers }
          ); 
          setData(response.data.data);
          };
         if (localStorage.getItem("id") && localStorage.getItem("token")){
            fetch();
          } 
           
          });
        
    return (
       <>
         <div> 
        <div className='w-full flex justify-end p-4 py-2'>
   <button onClick={() =>setInputDiv("fixed")}> <IoAddCircleSharp className="text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300" />
   </button>
        </div>
       { Data &&(
       <Cards home={"true"} setInputDiv={setInputDiv} data={Data.tasks} setUpdatedData={setUpdatedData}/> 
       )}
        </div>
        <InputData InputDiv={InputDiv} setInputDiv={setInputDiv} UpdatedData={UpdatedData} setUpdatedData={setUpdatedData} />
       </>
    );
};
export default AllTasks;