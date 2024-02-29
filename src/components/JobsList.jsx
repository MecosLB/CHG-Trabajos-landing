import React from 'react';
import JobCard from './JobCard';
import PropTypes from 'prop-types';

const JobsList = ({ jobs, detailsOnClick }) => {
    return (
        <div className='list flex flex-col gap-2'>
            {
                jobs.map(({ id, titulo, empresa, direccion, salario, jornada, descripcion, fechaPublicacion }) => {
                    return (
                        <JobCard key={id} uid={id} title={titulo} company={empresa} location={direccion} salary={salario} workDay={jornada} description={descripcion} publishDate={fechaPublicacion} detailsOnClick={detailsOnClick} />
                    );
                })
            }
        </div>
    );
}

export default JobsList;

JobsList.propTypes = {
    jobs: PropTypes.array.isRequired,
    handleClick: PropTypes.func,
}

JobsList.defaultProps = {
    jobs: [],
}