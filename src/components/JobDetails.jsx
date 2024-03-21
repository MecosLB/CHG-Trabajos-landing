import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import logoPng from '../assets/img/logo-color.png';

const JobDetails = ({ openController, job }) => {
    // Prop format fixes
    const workDay = job.jornada.includes('Horas') ? 'hora' : 'mes';

    return (
        <div className='details hidden md:block shadow-lg pb-4'>
            <article className="header flex items-center justify-between gap-4 shadow-md">
                <div className='wrapper flex flex-col justify-around'>
                    <h5 className='title leading-tight mb-2 text-gray-800 text-base lg:text-xl font-semibold'>
                        {job.titulo}
                    </h5>

                    <p className='info text-gray-500 text-xs lg:text-sm font-medium mb-auto'>
                        {`${job.empresa} - ${job.direccion}`}<br />

                        <span className='salary font-normal'>
                            {`$${job.salario} M.N / ${workDay}`}
                        </span>
                    </p>

                    <button onClick={() => { openController(job) }} job={job.id} className='btn text-sm lg:text-base text-white ease-in-out duration-100 bg-teal-400 focus:bg-teal-500 hover:bg-teal-500 mb-auto'>
                        Postularse
                    </button>

                    <span className='publication text-blue-950 text-xs lg:text-sm font-medium block -auto'>
                        Publicado el {job.fechaPublicacion}
                    </span>
                </div>

                <picture className='logo'>
                    {/* <img src={`/src/assets/img/${job.id}`} alt='Logo de la empresa reclutadora' /> */}
                    <img src={logoPng} alt='Logo de la empresa reclutadora' />
                </picture>
            </article>

            <div className="body text-sm lg:text-base">
                {parse(decodeURI(job.descripcion))}
            </div>
        </div>
    );
}

export default JobDetails;

JobDetails.propTypes = {
    job: PropTypes.object.isRequired,
    openController: PropTypes.func,
}