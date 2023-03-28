import { useState, useEffect } from 'react';
import axios from 'axios';
// components
import { Header, AddNewContact, Contact } from './components';
// style
import './style/global.css';
import { BsPlus } from 'react-icons/bs';
import IMAGE from './assets/logo-gevolg.png'

function App() {

  const [showAddContact, setShowAddContact] = useState(false);
  const [listContacts, setListContacts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/getContacts').then(
      (response) => setListContacts(response.data.reverse())
    )
  }, []);
        
  return (
    <div className='flex flex-col items-center pt-48 px-4 bg-[url("../assets/image.png")] bg-top bg-no-repeat bg-contain max-sm:pb-[150px]'>
      <h1 className='absolute flex flex-row gap-3 top-6 font-bold text-white text-2xl'>
        GEVOLG
      </h1>
      <Header/>
      <div className="flex flex-col w-full">  
        { showAddContact && <AddNewContact setShowAddContact={setShowAddContact}/>}

        <div className='flex flex-auto flex-wrap gap-6'>
          { typeof listContacts !== 'undefined' && 
            listContacts.map((item, index) => 
            <Contact
              key={item.id}
              id={item.id}
              name={item.name}
              email={item.email}
              tel={item.tel}
              number={index}
            />
            )
          } 
        </div>
        <span className='flex justify-center mt-10 text-gray-400'>
          { listContacts.length === 0 ? 
            'Sua lista de contato está vazia.' : 
            `Você possui ${listContacts.length} ${listContacts.length > 1 ? 'contatos' : 'contato'}.`
          }
        </span>
      </div>
      <div className='fixed bottom-7 px-8 w-full flex justify-center items-center'>
        <button
          className='flex items-center w-[60px] h-[60px] p-3 bg-green-600 rounded-full text-5xl text-white hover:rotate-180 transition'
          onClick={() => setShowAddContact(true)}
        >
          <BsPlus/>
        </button>   
      </div>
    </div>
  );
};

export default App;
