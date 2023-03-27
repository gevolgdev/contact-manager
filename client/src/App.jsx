import { useState, useEffect } from 'react';
import axios from 'axios';
// components
import { Header, AddNewContact, Contact } from './components';
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
      <div className="flex flex-col p-8 w-full max-sm:px-4">  
        { showAddContact && <AddNewContact setShowAddContact={setShowAddContact}/>}
        
        <div className='flex flex-auto flex-wrap gap-14'>
          { typeof listContacts !== 'undefined' && 
            listContacts.reverse().map((item) => {
              return (
                <Contact
                  key={item.id}
                  name={item.name}
                  email={item.email}
                  tel={item.tel}
                />
              )
            })
          } 
        </div>

        <button
          className='fixed bottom-7 right-7 flex items-center justify-center w-[70px] h-[70px] bg-green-600 rounded-full text-4xl text-white'
          onClick={() => setShowAddContact(true)}
        >
          <BsPlus/>
        </button>   
      </div>
    </>
  );
};

export default App;
