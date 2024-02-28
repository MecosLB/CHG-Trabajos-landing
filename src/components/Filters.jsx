import React from 'react';
import { FaCaretDown, FaFilter } from 'react-icons/fa';
import SelectFilter from './SelectFilter';

const categoryOptions = [{
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
}];

const companyOptions = [{
    text: 'Punto CHG',
    value: 'Punto CHG',
}, {
    text: 'CHG Films',
    value: 'CHG Films',
}, {
    text: 'Construcción CHG',
    value: 'Construcción CHG',
}];

const workingDayOptions = [{
    text: 'Tiempo completo',
    value: 'Tiempo completo',
}, {
    text: 'Medio tiempo',
    value: 'Medio tiempo',
}, {
    text: 'Por horas',
    value: 'Por horas',
}, {
    text: 'Becas/prácticas',
    value: 'Becas/prácticas',
}];

const salaryOptions = [{
    text: 'Mayor a $5,000 M.N. /mes ',
    value: '> 5000',
}, {
    text: 'Mayor a $10,000 M.N. /mes ',
    value: '> 10000',
}, {
    text: 'Mayor a $15,000 M.N. /mes ',
    value: '> 15000',
}];

const Filters = () => {
    return (
        <section className='filters max-w-screen-md mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between px-8 lg:px-0 gap-8 mb-12'>
            <div className='wrapper flex justify-center md:justify-between gap-4 md:gap-0 flex-wrap'>
                <SelectFilter text='Empresa' type='Company' options={companyOptions} />

                <SelectFilter text='Departamentos' type='Category' options={categoryOptions} />

                <SelectFilter text='Tipo de empleo' type='WorkingDay' options={workingDayOptions} />

                <SelectFilter text='Salario' type='Salary' options={salaryOptions} />
            </div>

            <button id='filterBtn' className='btn text-white text-sm lg:text-base ease-in-out duration-100 bg-teal-400 focus:bg-teal-500 hover:bg-teal-500'>
                Filtrar

                <FaFilter />
            </button>
        </section>
    );
}

export default Filters;
