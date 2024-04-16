import React from 'react';
import PropTypes from 'prop-types';
import { FaCaretDown } from 'react-icons/fa';

// Vars
const textSelects = {
    company: 'Empresa',
    department: 'Departamentos',
    workDay: 'Jornada',
    salary: 'Salario',
}

// select wrapper on click handle
const handleClick = ({ currentTarget }) => {
    const filterType = currentTarget.getAttribute('options'),
        filterOptions = document.querySelector(filterType);
    const elementShowing = document.querySelector('.show');

    if (!filterOptions) return;
    if (elementShowing && elementShowing !== filterOptions) elementShowing.classList.toggle('show');

    filterOptions.classList.toggle('show');
}

const SelectFilter = ({ type, selectValue, handleOptionClick, options }) => {
    // option selected on click handle
    const handleSelectOption = (e) => {
        const { currentTarget } = e;
        const filterType = currentTarget.parentNode.getAttribute('id'),
            filterOptions = document.querySelector(`#${filterType}`);

        handleOptionClick(e);

        if (!filterOptions) return;
        if (![...filterOptions.classList].includes('show')) return;

        filterOptions.classList.toggle('show');
    }

    return (
        <div className='select'>
            <button options={`#options${textSelects[type]}`} onClick={handleClick}>
                <span>
                    {selectValue.value || textSelects[type]}
                </span>
                <FaCaretDown className='logo' />
            </button>

            <ul id={`options${textSelects[type]}`} className='options shadow-lg'>
                <li onClick={handleSelectOption} type={type} value=''>{textSelects[type]}</li>
                {
                    options.map(({ id, nombre }) => {
                        return (
                            // <li title={text} key={value} tabIndex={value}>{text}</li>
                            <li onClick={handleSelectOption} type={type} title={nombre} key={id} value={id}>{nombre}</li>
                        );
                    })
                }
            </ul>
        </div>
    );
}

export default SelectFilter;

SelectFilter.propTypes = {
    type: PropTypes.string.isRequired,
    selectValue: PropTypes.object.isRequired,
    handleOptionClick: PropTypes.func,
    options: PropTypes.array.isRequired,
}