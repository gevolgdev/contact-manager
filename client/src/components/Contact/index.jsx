import { HiOutlineMail } from 'react-icons/hi'
import { MdWhatsapp } from 'react-icons/md'
import { AiOutlineUser } from 'react-icons/ai'

export default function Contact(props) {

  return (
    <div className="flex flex-col p-8 w-[350px] bg-orange-400 rounded-lg max-sm:w-full">
      <h2 className="text-3xl text-slate-900 font-bold">
        <AiOutlineUser className='text-xl'/> {props.name}
      </h2>
      <div className="w-full h-[2px] bg-orange-200 my-5"/>
      <span className="flex flex-row items-center gap-2 text-lg text-gray-900 mb-5">
        <HiOutlineMail/> {props.email}
      </span>
      <span className="flex flex-row items-center gap-2 text-lg text-gray-900">
        <MdWhatsapp/> {props.tel}
      </span>
    </div>
  )
}