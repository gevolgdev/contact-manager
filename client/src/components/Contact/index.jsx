import { HiOutlineMail } from 'react-icons/hi'
import { MdWhatsapp, MdEditSquare } from 'react-icons/md'
import { BiTrashAlt } from 'react-icons/bi'

export default function Contact(props) {

  return (
    <div className="flex flex-col p-8 w-[350px] bg-gray-800 rounded-lg max-sm:w-full">
      <div className='flex flex-col'>
        <h2 className="text-3xl text-white font-bold">
          {props.name}
        </h2>
        <div className="w-full h-[1px] bg-gray-400 my-5"/>
        <span className="flex flex-row items-center gap-2 text-lg text-white mb-2">
          <HiOutlineMail/> {props.email}
        </span>
        <span className="flex flex-row items-center gap-2 text-lg text-white">
          <MdWhatsapp/> {props.tel}
        </span>
      </div>
      <div className='flex flex-row mt-10 gap-4'>
        <button className='flex flex-1 flex-row items-center justify-center gap-2 bg-gray-100 text-gray-800 py-2'>
          <MdEditSquare/> Editar
        </button>

        <button className='flex flex-1 flex-row items-center justify-center gap-2 bg-red-500 text-gray-100 py-2'>
          <BiTrashAlt/> Apagar
        </button>
      </div>
    </div>
  )
}