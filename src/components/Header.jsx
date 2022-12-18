import React from 'react';


const Header = ({ category, title }) => {
  return (
    <div className=" mb-10">
    <p className="text-lg text-gray-400">{category}</p>
    <div className='flex justify-between'>
      <p className="text-3xl font-extrabold tracking-tight text-slate-900">
        {title}
      </p>
      <button  className='text-xl font-semibold m-2 rounded-lg border-2 text-[#5c96de] border-[#2d78d4] ease-in py-2 px-3 hover:bg-sky-700'>Withdraw</button>
    </div>
  </div>
  )
 
};

export default Header;
