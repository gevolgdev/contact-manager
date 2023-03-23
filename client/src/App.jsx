import { useState, useEffect } from 'react';
import axios from 'axios';
// components
import { Header, AddNewContact } from './components';
// style
import './style/global.css';
import { BsPlus } from 'react-icons/bs';

function App() {

  const [showAddContact, setShowAddContact] = useState(false);
  const [listContacts, setListContacts] = useState();

  useEffect(() => {
    axios.get('http://localhost:3001/getContacts').then(
      (response) => setListContacts(response.data)
    )
  }, []);

        
  return (
    <>
      <Header/>
      <div className="flex flex-col p-8 w-full">  
        { showAddContact && <AddNewContact setShowAddContact={setShowAddContact}/>}

        { typeof listContacts !== 'undefined' && 
            listContacts.map((item, index) => {
              return <h1>{item.name}</h1>
            })
        } 

        <button 
          className='absolute bottom-7 right-7 flex items-center justify-center w-[70px] h-[70px] bg-orange-500 rounded-full text-4xl text-white'
          onClick={() => setShowAddContact(true)}
        >
          <BsPlus/>
        </button>   
      </div>
    </>
  );
};

export default App;
