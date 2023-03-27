import { useState, useEffect } from 'react';
import axios from 'axios';
// icon
import { IoIosClose } from 'react-icons/io'


export default function EditContact(props) {

  const [editContact, setEditContact] = useState({
    id: props.id,
    name: props.name,
    email: props.email,
    tel: props.tel,
  });

  function handleEditContact(e) {
    setEditContact( prevContact => ({
      ...prevContact,
      [e.target.name]: e.target.value
    }))
  };

  function edit() {
    axios.put('http://localhost:3001/edit', {
      id: editContact.id,
      name: editContact.name,
      email: editContact.email,
      tel: editContact.tel,
    }).then((response) => {
      console.log(response)
    })
    props.setOpenEdit(false)
    document.location.reload()
  };

  const inputs = [
    {name: 'name', placeholder: 'Nome', value: props.name},
    {name: 'email', placeholder: 'Email', value: props.email},
    {name: 'tel', placeholder: 'Telefone', value: props.tel},
  ];

  return (
    <div className='absolute right-7 bottom-[120px] flex flex-col w-full mx-auto px-6 py-12 rounded-lg bg-gray-200 drop-shadow-lg md:w-[400px] max-sm:fixed max-sm:bottom-0 max-sm:right-0 max-sm:w-full max-sm:h-screen max-sm:pt-32'>
      <h1 className='text-4xl font-bold text-gray-900'>Editar contato</h1>
      <div className='flex flex-col gap-3 mt-10'>
        {inputs.map((item, index) => 
          <input
            key={index}
            defaultValue={item.value}
            onChange={handleEditContact}
            type='text'
            name={item.name}
            placeholder={item.placeholder}
            className='px-4 py-3 outline-gray-500 font-["Inter Tight"] rounded-sm placeholder:italic placeholder:text-sm'
          />
        )}
      </div>
      <button
        onClick={() => edit()}
        className='mt-7 py-3 bg-green-400 font-bold text-gray-800'
      >
        Editar
      </button>
    </div>
  )
};