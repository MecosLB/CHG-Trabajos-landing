import React from 'react';
import JobCard from './JobCard';
import PropTypes from 'prop-types';
import { FaPlus } from 'react-icons/fa';

const JobsList = ({ jobs, detailsOnClick, paginationController }) => {
    return (
        <div className='list flex flex-col gap-2'>
            {
                jobs.map(({ id, idEmpresa, titulo, empresa, direccion, salario, jornada, descripcion, fechaPublicacion, preguntas }, index) => {
                    return (
                        <JobCard key={id} uid={id} companyId={idEmpresa} title={titulo} company={empresa} location={direccion} salary={salario} workDay={jornada} description={decodeURI(descripcion)} publishDate={fechaPublicacion} questions={preguntas} detailsOnClick={detailsOnClick} index={index} />
                    );
                })
            }

            <div className='job-loader hidden mx-auto'></div>

            <button id='loadMore' onClick={paginationController} className='btn flex items-center justify-center gap-2 p-4 rounded-lg text-white ease-in-out duration-100 bg-blue-950 focus:bg-blue-900 hover:bg-blue-900'>
                Cargar más vacantes <FaPlus />
            </button>
        </div>
    );
}

export default JobsList;

JobsList.propTypes = {
    jobs: PropTypes.array.isRequired,
    detailsOnClick: PropTypes.func,
    paginationController: PropTypes.func,
}

JobsList.defaultProps = {
    jobs: [],
}