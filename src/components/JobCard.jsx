import React from 'react';
import PropTypes from 'prop-types';


const JobCard = ({ uid, title, company, location, salary, workDay, description, publishDate }) => {
    // Prop format fixes
    workDay = workDay.includes('horas') ? 'hora' : 'mes';
    description = description.substring(0, 147);

    return (
        <article className='job shadow-md flex flex-col gap-4'>
            <div className='header flex items-center justify-between gap-4'>
                <picture className='logo'>
                    <img src={`/src/assets/img/${uid}`} alt='Logo de la empresa reclutadora' />
                </picture>

                <div className='wrapper'>
                    <h5 className='title leading-tight mb-2 text-gray-800 text-base lg:text-xl font-semibold'>
                        {title}
                    </h5>

                    <p className='info text-gray-500 text-xs lg:text-sm font-medium'>
                        {`${company} - ${location}`}<br />

                        <span className='salary font-normal'>
                            {`$${salary} M.N / ${workDay}`}
                        </span>
                    </p>
                </div>
            </div>

            <p className='description text-sm sm:text-xs lg:text-base'>
                {
                    `${description}...`
                }
            </p>

            <span className='publication text-blue-950 text-xs lg:text-sm font-medium ml-auto mt-auto'>
                Publicado el {publishDate}
            </span>
        </article>
    );
}

export default JobCard;

JobCard.propTypes = {
    uid: PropTypes.string,
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    location: PropTypes.string,
    salary: PropTypes.number.isRequired,
    workDay: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    publishDate: PropTypes.string.isRequired,
}

JobCard.defaultProps = {
    uid: 'logo-color.png',
    title: 'Asistente administrativo - medio tiempo',
    company: 'Punto CHG',
    location: 'Guadalajara, Jalisco',
    salary: 5000,
    workDay: 'Tiempo completo',
    description: 'We are looking for a motivated Asistente administrativo/ Medio tiempo to join our diverse team at Administración De Cuentas Centro Operativo Bosques S C in Mexico City Mexico City Growing your career as a Full Time Asistente administrativo/ Medio tiempo is a terrific opportunity to develop relevant skills.',
    publishDate: '27-02-2024',
}