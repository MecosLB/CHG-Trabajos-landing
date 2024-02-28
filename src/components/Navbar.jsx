import React from 'react';
import logoPng from '../assets/img/logo-color.png';
import logoWebp from '../assets/img/logo-color.webp';

const Navbar = ({ openController }) => {
    return (
        <div className='flex items-center justify-center md:justify-between py-4 px-12 bg-white'>
            <picture className='logo'>
                <source srcSet={logoPng} type='image/webp' />
                <img src={logoWebp} alt='Punto CHG' />
            </picture>

            <article className='hidden md:flex flex-col items-center gap-2'>
                <h5 className='text-gray-500 text-sm font-medium'>
                    ¿No encuentras tu vacante ideal?
                </h5>

                <button onClick={openController} className='ease-in-out duration-100 bg-teal-400 hover:bg-teal-500 focus:bg-teal-500 text-white font-medium uppercase rounded-full px-6 py-2'>
                    Envíanos tu CV
                </button>
            </article>
        </div>
    );
}

export default Navbar;
