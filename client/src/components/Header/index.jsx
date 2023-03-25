import IMAGE from '../../assets/imageHeader.png';

export default function Header() {

  const date = new Date();

  return (
    <div className="flex flex-col w-full py-8 px-5">
      <img src={IMAGE} className='w-[250px] mx-auto'/>
      <span className='text-sm mb-3 text-gray-600'>Facilidade e agilidade</span>
      <h1 className="text-5xl text-gray-900 font-bold">Gerenciador de contatos</h1>
      <div>
      </div>
    </div>
  )
};