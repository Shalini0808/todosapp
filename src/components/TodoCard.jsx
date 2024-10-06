import React, { useState } from 'react'
import { CiTrash } from "react-icons/ci";
import Loader from './Loader';
function TodoCard({title,handleDelete,id}) {
    let[deleteStatus,setDeleteStatus]=useState(false);
    function handleDeleteClick(){
        setDeleteStatus(true);
        handleDelete(id)
    }
  return (
    <div>
       <div className="w-[400px] mx-auto mt-2">
       <div className="border rounded-lg box-border p-2 flex  items-center justify-between">
        <h2 className=''>{title}</h2>
        <button onClick={()=>handleDeleteClick()} className='hover:text-red-600'>{deleteStatus?<Loader/>:<CiTrash />}</button>
       </div>

       </div>
    </div>
  )
}

export default TodoCard;
