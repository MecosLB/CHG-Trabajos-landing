import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';

const JobDetails = ({ uid, title, company, location, salary, workDay, description, publishDate }) => {
    // Prop format fixes
    workDay = workDay.includes('horas') ? 'hora' : 'mes';

    return (
        <div className='details hidden md:block shadow-lg pb-4'>
            <article className="header flex items-center justify-between gap-4 shadow-md">
                <div className='wrapper flex flex-col justify-around'>
                    <h5 className='title leading-tight mb-2 text-gray-800 text-base lg:text-xl font-semibold'>
                        {title}
                    </h5>

                    <p className='info text-gray-500 text-xs lg:text-sm font-medium mb-auto'>
                        {`${company} - ${location}`}<br />

                        <span className='salary font-normal'>
                            {`$${salary} M.N / ${workDay}`}
                        </span>
                    </p>

                    <button id='applyBtn' className='btn text-sm lg:text-base text-white ease-in-out duration-100 bg-teal-400 focus:bg-teal-500 hover:bg-teal-500 mb-auto'>
                        Postularse
                    </button>

                    <span className='publication text-blue-950 text-xs lg:text-sm font-medium block -auto'>
                        Publicado el {publishDate}
                    </span>
                </div>

                <picture className='logo'>
                    <img src={`/src/assets/img/${uid}`} alt='Logo de la empresa reclutadora' />
                </picture>
            </article>

            <div className="body text-sm lg:text-base">
                {parse(description)}
            </div>
        </div>
    );
}

export default JobDetails;

JobDetails.propTypes = {
    uid: PropTypes.string,
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    location: PropTypes.string,
    salary: PropTypes.number.isRequired,
    workDay: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    publishDate: PropTypes.string.isRequired,
}

JobDetails.defaultProps = {
    uid: 'logo-color.png',
    title: 'Asistente administrativo - medio tiempo',
    company: 'Punto CHG',
    location: 'Guadalajara, Jalisco',
    salary: 5000,
    workDay: 'Tiempo completo',
    description: `<p>
    We are looking for a motivated Asistente administrativo/ Medio tiempo to join our diverse team at Administración De Cuentas Centro Operativo Bosques S C in Mexico City Mexico City Growing your career as a Full Time Asistente administrativo/ Medio tiempo is a terrific opportunity to develop relevant skills.
    </p>

    <ul>
        <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At enim et nobis, tempore maiores aliquid ipsa molestias nam voluptas dolorem minima autem, ea animi debitis. Minima ipsam sapiente dolorem suscipit.
        </li>
        <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At enim et nobis, tempore maiores aliquid ipsa molestias nam voluptas dolorem minima autem, ea animi debitis. Minima ipsam sapiente dolorem suscipit.
        </li>
        <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At enim et nobis, tempore maiores aliquid ipsa molestias nam voluptas dolorem minima autem, ea animi debitis. Minima ipsam sapiente dolorem suscipit.
        </li>
    </ul>

    <p>
        We are looking for a motivated Asistente administrativo/ Medio tiempo to join our diverse team at Administración De Cuentas Centro Operativo Bosques S C in Mexico City Mexico City Growing your career as a Full Time Asistente administrativo/ Medio tiempo is a terrific opportunity to develop relevant skills.
    </p>

    <p>
        We are looking for a motivated Asistente administrativo/ Medio tiempo to join our diverse team at Administración De Cuentas Centro Operativo Bosques S C in Mexico City Mexico City Growing your career as a Full Time Asistente administrativo/ Medio tiempo is a terrific opportunity to develop relevant skills.
    </p>`,
    publishDate: '27-02-2024',
}