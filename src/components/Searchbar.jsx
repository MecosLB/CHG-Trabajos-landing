import React from 'react';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa';

// input on focus handle
const handleFocus = ({ target }) => {
    const inputWrapperNew = target.parentNode,
        inputWrapperOld = document.querySelector('.input.active');

    if (![...inputWrapperNew.classList].includes('input')) return;

    if (inputWrapperOld)
        inputWrapperOld.classList.remove('active');

    inputWrapperNew.classList.add('active');
}

// input on blur handle
const handleBlur = ({ target }) => {
    const inputWrapper = target.parentNode;

    if (![...inputWrapper.classList].includes('active')) return;

    inputWrapper.classList.remove('active');
}

const Searchbar = () => {
    return (
        <section className='search-bar max-w-screen-md mx-auto px-8 lg:px-0 flex flex-col md:flex-row gap-4 md:gap-0 mb-12'>
            <div className="input shadow-lg">
                <FaSearch className='icon text-teal-400' />
                <input onFocus={handleFocus} onBlur={handleBlur} type="text" name='word' placeholder='Puesto o palabra clave' />
            </div>

            <button className='btn shadow-lg text-white text-sm lg:text-base ease-in-out duration-100 bg-teal-400 focus:bg-teal-500 hover:bg-teal-500'>
                Buscar
            </button>
        </section>
    );
}

export default Searchbar;
