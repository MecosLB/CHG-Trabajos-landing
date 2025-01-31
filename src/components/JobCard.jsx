import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import logoPng from '../assets/img/logo-color.png';


const JobCard = ({ uid, companyId, title, company, location, salary, workDay, description, publishDate, questions, detailsOnClick, index }) => {
    // Prop format fixes
    const fullLocation = location.split(',');
    const shortDescription = window.innerWidth > 639 ? description.substring(0, 147) : description.substring(0, 97);
    const payType = workDay.includes('Horas') ? 'hora' : 'mes';
    location = fullLocation[fullLocation.length - 2];

    const updateState = ({ currentTarget }) => {
        const oldJobSelected = document.querySelector('.job.selected');

        if (oldJobSelected) oldJobSelected.classList.toggle('selected');
        currentTarget.classList.toggle('selected');

        detailsOnClick(uid, companyId, title, company, location, salary, workDay, description, publishDate, questions);
    }

    return (
        <article onClick={updateState} className={`job shadow-md flex flex-col gap-4 ${!index ? 'selected' : null}`}>
            <div className='header flex items-center justify-between gap-4'>
                <picture className='logo'>
                    {/* <img src={`/src/assets/img/${uid}`} alt='Logo de la empresa reclutadora' /> */}
                    <img src={logoPng} alt='Logo de la empresa reclutadora' />
                </picture>

                <div className='wrapper'>
                    <h5 className='title leading-tight mb-2 text-gray-800 text-base lg:text-xl font-semibold'>
                        {title}
                    </h5>

                    <p className='info text-gray-500 text-xs lg:text-sm font-medium'>
                        {`${company} - ${location}`}<br />

                        <span className='salary font-normal'>
                            {`$${salary} M.N / ${payType}`}
                        </span>
                    </p>
                </div>
            </div>

            <span className='description text-sm sm:text-xs lg:text-base'>
                {
                    parse(`${shortDescription}...`)
                }
            </span>

            <button onClick={detailsOnClick} className='btn inline-block md:hidden py-1 rounded-lg text-sm lg:text-base text-white ease-in-out duration-100 bg-blue-950 focus:bg-blue-900 hover:bg-blue-900 mb-auto'>
                Ver detalles
            </button>

            <span className='publication text-blue-950 text-xs lg:text-sm font-medium ml-auto mt-auto'>
                Publicado el {publishDate}
            </span>
        </article>
    );
}

export default JobCard;

JobCard.propTypes = {
    uid: PropTypes.string.isRequired,
    companyId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    salary: PropTypes.string.isRequired,
    workDay: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    publishDate: PropTypes.string.isRequired,
    questions: PropTypes.string.isRequired,
    handleClick: PropTypes.func,
    index: PropTypes.number,
}