import React from 'react';
import PropTypes from 'prop-types';
import { FaCaretDown } from 'react-icons/fa';

// select wrapper on click handle
const handleClick = ({ currentTarget }) => {
    const filterType = currentTarget.getAttribute('options'),
        filterOptions = document.querySelector(filterType);

    if (!filterOptions) return;

    filterOptions.classList.toggle('show');
}

// select wrapper on blur handle
const handleBlur = ({ currentTarget }) => {
    const filterType = currentTarget.getAttribute('options'),
        filterOptions = document.querySelector(filterType);

    if (!filterOptions) return;
    if (![...filterOptions.classList].includes('show')) return;

    filterOptions.classList.toggle('show');
}

const SelectFilter = ({ text, type, options }) => {
    return (
        <div className='select'>
            <button options={`#options${type}`} onClick={handleClick} onBlur={handleBlur}>
                <span>
                    {text}
                </span>
                <FaCaretDown className='logo' />
            </button>

            <ul id={`options${type}`} className='options shadow-lg'>
                {
                    options.map(({ text, value }) => {
                        return (
                            <li title={text} key={value} tabIndex={value}>{text}</li>
                        );
                    })
                }
            </ul>
        </div>
    );
}

export default SelectFilter;

SelectFilter.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
}

SelectFilter.defaultProps = {
    text: 'Categoría',
    type: 'Category',
    options: [{
        text: 'Contabilidad',
        value: 'Contabilidad'
    }, {
        text: 'Limpieza',
        value: 'Limpieza'
    }, {
        text: 'Administración',
        value: 'Administración'
    }, {
        text: 'Ingeniería',
        value: 'Ingeniería'
    }],
}
