import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FaFilter } from 'react-icons/fa';
import SelectFilter from './SelectFilter';
import axios from 'axios';

// Vars
const apiUrl = 'https://bolsa-testing.puntochg.com/api/';

const workingDayOptions = [{
    id: 'Tiempo completo',
    nombre: 'Tiempo completo',
}, {
    id: 'Medio tiempo',
    nombre: 'Medio tiempo',
}, {
    id: 'Por Horas',
    nombre: 'Por Horas',
}, {
    id: 'Becas/prácticas',
    nombre: 'Becas/prácticas',
}];

const salaryOptions = [{
    id: '> 5000',
    nombre: 'Mayor a $5,000 M.N. /mes ',
}, {
    id: '> 10000',
    nombre: 'Mayor a $10,000 M.N. /mes ',
}, {
    id: '> 15000',
    nombre: 'Mayor a $15,000 M.N. /mes ',
}];

const Filters = ({ filterJobs, selectValues, setSelectValues }) => {
    // Filters options state & methods
    const [filtersOptions, setFiltersOptions] = useState({
        companies: [],
        departments: [],
        workDays: workingDayOptions,
        salaries: salaryOptions,
    });

    useEffect(() => {
        const getFilters = async () => {
            try {
                let res = await axios.post(`${apiUrl}empresas/consultar/`, {});
                const { empresas: companies } = res.data;

                res = await axios.post(`${apiUrl}departamentos/consultar/`, {});
                const { departamentos: departments } = res.data;

                setFiltersOptions({
                    ...filtersOptions,
                    companies: companies,
                    departments: departments,
                });
            } catch (error) {
                console.warn(console.error());
            }
        }

        getFilters();
    }, []);

    const handleOptionClick = ({ target }) => {
        const optionSelect = target.getAttribute('type');
        const value = target.innerText,
            id = target.getAttribute('value');

        setSelectValues({
            ...selectValues,
            [optionSelect]: {
                id: id,
                value: value,
            },
        });
    }

    return (
        <section className='filters max-w-screen-md mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between px-8 lg:px-0 gap-8 mb-12'>
            <div className='wrapper flex justify-center md:justify-between gap-4 md:gap-0 flex-wrap'>
                <SelectFilter handleOptionClick={handleOptionClick} type='company' selectValue={selectValues.company} options={filtersOptions.companies} />

                <SelectFilter handleOptionClick={handleOptionClick} type='department' selectValue={selectValues.department} options={filtersOptions.departments} />

                <SelectFilter handleOptionClick={handleOptionClick} type='workDay' selectValue={selectValues.workDay} options={filtersOptions.workDays} />

                <SelectFilter handleOptionClick={handleOptionClick} type='salary' selectValue={selectValues.salary} options={filtersOptions.salaries} />
            </div>

            <button id='filterBtn' onClick={filterJobs} className='btn text-white text-sm lg:text-base ease-in-out duration-100 bg-teal-400 focus:bg-teal-500 hover:bg-teal-500'>
                Filtrar
                <FaFilter />
            </button>
        </section>
    );
}

export default Filters;

Filters.propTypes = {
    filterJobs: PropTypes.func,
    selectValues: PropTypes.object.isRequired,
    setSelectValues: PropTypes.func,
}