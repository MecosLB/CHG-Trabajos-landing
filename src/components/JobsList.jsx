import React from 'react';
import JobCard from './JobCard';
import PropTypes from 'prop-types';

const JobsList = ({ jobs }) => {
    return (
        <div className='list flex flex-col gap-2'>
            {
                jobs.map(({ id, titulo, empresa, direccion, salario, jornada, descripcion, fechaPublicacion }) => {
                    return (
                        <JobCard key={id} title={titulo} company={empresa} location={direccion} salary={salario} workDay={jornada} description={descripcion} publishDate={fechaPublicacion} />
                    );
                })
            }

            {/* Testing cards */}
            {/* <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard /> */}
            <JobCard />
        </div>
    );
}

export default JobsList;

JobsList.propTypes = {
    jobs: PropTypes.array.isRequired,
}

JobsList.defaultProps = {
    jobs: [],
}