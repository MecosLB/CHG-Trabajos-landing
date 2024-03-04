import React from 'react';
import parse from 'html-react-parser';
import logoPng from '../assets/img/logo-color.png';
import { FaTimes } from 'react-icons/fa';

const JobDetailsResponsive = ({ closeController, openController, isVisible, job }) => {
    // Prop format fixes
    const workDay = job.jornada.includes('Horas') ? 'hora' : 'mes';

    return (
        <section className={`job-detail flex items-center justify-center ${isVisible ? 'show' : ''}`}>
            <div className='modal flex flex-col gap-4 w-full max-w-screen-md mx-auto'>
                <article className="header flex items-center justify-between gap-4 sticky top-0 bg-white">
                    <div className='wrapper flex flex-col gap-2 justify-around'>
                        <h5 className='title leading-tight mb-2 text-gray-800 text-base lg:text-xl font-semibold'>
                            {job.titulo}
                        </h5>

                        <p className='info text-gray-500 text-xs lg:text-sm font-medium mb-auto'>
                            {`${job.empresa} - ${job.direccion}`}<br />

                            <span className='salary font-normal'>
                                {`$${job.salario} M.N / ${workDay}`}
                            </span>
                        </p>

                        <button onClick={() => { openController(job) }} job={job.id} className='btn rounded-lg
                        py-1 text-sm lg:text-base text-white ease-in-out duration-100 bg-teal-400 focus:bg-teal-500 hover:bg-teal-500 mb-auto'>
                            Postularse
                        </button>

                        <span className='publication text-blue-950 text-xs lg:text-sm font-medium block -auto'>
                            Publicado el {job.fechaPublicacion}
                        </span>
                    </div>

                    <picture className='logo w-40'>
                        {/* <img src={`/src/assets/img/${job.id}`} alt='Logo de la empresa reclutadora' /> */}
                        <img src={logoPng} alt='Logo de la empresa reclutadora' />
                    </picture>

                    <button onClick={closeController} className='text-xl mb-auto ease-in-out duration-100 text-blue-900 focus:text-blue-950 hover:text-blue-950'>
                        <FaTimes />
                    </button>
                </article>

                <div className="body text-sm lg:text-base">
                    {parse(job.descripcion)}
                </div>
            </div>
        </section>
    );
}

export default JobDetailsResponsive;
