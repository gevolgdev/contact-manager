
export default function Header() {

  const date = new Date();

  return (
    <div className="flex flex-col w-full py-4 mb-10">
      <h1 className="text-5xl text-gray-100 font-semibold leading-tight	">
        Organize seus contatos!
      </h1>
    </div>
  )
};