import { useState, useEffect } from 'react';
import axios from 'axios';
// icon
import { IoIosClose } from 'react-icons/io'


export default function AddNewContact({setShowAddContact}) {

  const [contact, setContact] = useState({});

  function handleAddContact(event) {
    setContact(prevContact => ({
      ...prevContact,
      [event.target.name]: event.target.value
    }));
  };

  function postContacts() {
    axios.post('http://localhost:3001/register', {
      name: contact.name,
      email: contact.email,
      tel: contact.tel,
    }).then((response) => {
      console.log(response)
    });

    setContact({});
    document.location.reload()
  };

  const inputs = [
    {name: 'name', placeholder: 'Nome'},
    {name: 'email', placeholder: 'Email'},
    {name: 'tel', placeholder: 'Telefone'},
  ];

  return (
    <div className='absolute right-7 bottom-[120px] flex flex-col w-full mx-auto px-6 py-12 rounded-lg bg-gray-200 drop-shadow-lg md:w-[400px] max-sm:fixed max-sm:bottom-0 max-sm:right-0 max-sm:w-full max-sm:h-screen max-sm:pt-32'>
      <h1 className='text-4xl font-bold text-gray-900'>Adicionar contato</h1>
      <div className='flex flex-col gap-3 mt-10'>
        {inputs.map((item, index) => 
          <input
            key={index}
            onChange={handleAddContact}
            type='text'
            name={item.name}
            placeholder={item.placeholder}
            className='px-4 py-3 outline-gray-500 font-["Inter Tight"] rounded-sm placeholder:italic placeholder:text-sm'
          />
        )}
      </div>
      <button
        onClick={() => postContacts()}
        className='mt-7 py-3 bg-green-400 font-bold text-gray-800'
      >
        Adicionar
      </button>
    </div>
  )
};