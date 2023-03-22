import { useState } from 'react';
import Axios from 'axios';
// icon
import { IoIosClose } from 'react-icons/io'


export default function AddNewContact() {

  const [contact, setContact] = useState({});

  function handleAddContact(event) {
    setContact(prevContact => ({
      ...prevContact,
      [event.target.name]: event.target.value
    }));
  };
  console.log()

  function postContacts() {
    Axios.post('http://localhost:3001/register', {
      name: contact.name,
      email: contact.email,
      tel: contact.tel,
    }).then((response) => {
      console.log(response)
    });
  };

  const inputs = [
    {name: 'name', placeholder: 'Nome'},
    {name: 'email', placeholder: 'Email'},
    {name: 'tel', placeholder: 'Telefone'},
  ];

  return (
    <div className='flex flex-col w-full mx-auto p-6 rounded-lg bg-gray-200 drop-shadow-lg md:w-[400px]'>
      <h1 className='text-2xl font-bold text-gray-900'>Adicionar contato</h1>
      <div className='flex flex-col gap-3 mt-5'>
        {inputs.map((item, index) => 
          <input
            key={index}
            onChange={handleAddContact}
            type='text'
            name={item.name}
            placeholder={item.placeholder}
            className='px-4 py-2 outline-gray-500 font-["Inter Tight"] rounded-sm'
          />
        )}
      </div>
      <button
        onClick={() => postContacts()}
        className='mt-7 py-2 bg-green-400 font-bold text-gray-800'
      >
        Adicionar
      </button>
    </div>
  )
};