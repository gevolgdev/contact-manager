// Axios
import axios from 'axios'
// icons
import { useState } from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import { MdWhatsapp, MdEditSquare } from 'react-icons/md';
import { BiTrashAlt } from 'react-icons/bi';
import { BsFillPinAngleFill } from 'react-icons/bs'

import EditContact from '../EditContact';

export default function Contact(props) {

  const [openEdit, setOpenEdit] = useState(false);

  function deleteContact() {
    axios.delete(`http://localhost:3001/delete/${props.id}`)
    document.location.reload()
  };

  return (
    <>
      {openEdit && 
        <EditContact
          id={props.id}
          name={props.name}
          email={props.email}
          tel={props.tel}
          setOpenEdit={setOpenEdit}
        />
      }
      <div className="flex flex-col p-4 w-[350px] border-2 border-gray-400 rounded-lg max-sm:w-full">
        <div className='flex flex-col'>
          <h2 className="flex flex-row items-center gap-3 text-3xl text-white font-bold mb-5">
            <BsFillPinAngleFill className='text-blue-500 text-2xl'/> {props.name}
          </h2>
          
          <span className="flex flex-row items-center gap-2 text-lg text-gray-300 mb-2">
            <HiOutlineMail/> {props.email}
          </span>
          <span className="flex flex-row items-center gap-2 text-lg text-gray-300">
            <MdWhatsapp/> {props.tel}
          </span>
        </div>
        <div className='flex flex-row mt-4 gap-2'>
          <button 
            className='flex flex-1 flex-row items-center justify-center gap-2 bg-gray-100 text-gray-800 py-2'
            onClick={() => setOpenEdit(true)}
          >
            <MdEditSquare/> Editar
          </button>

          <button
            onClick={deleteContact}
            className='flex flex-1 flex-row items-center justify-center gap-2 bg-red-500 text-gray-100 py-2'>
            <BiTrashAlt/> Apagar
          </button>
        </div>
      </div>
    </>
  )
}