import { useState } from 'react';
// components
import { Header, AddNewContact } from './components';
// style
import './style/global.css';
import { BsPlus } from 'react-icons/bs';

function App() {

  const [showAddContact, setShowAddContact] = useState(false);
        
  return (
    <>
      <Header/>
      <div className="flex flex-col p-8 w-full">  
        { showAddContact && <AddNewContact setShowAddContact={setShowAddContact}/>}

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
