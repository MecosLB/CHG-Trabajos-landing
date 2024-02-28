import React from 'react';
import JobsList from './JobsList';
import JobDetails from './JobDetails';

const Jobs = ({openController}) => {
    return (
        <section className='jobs max-w-screen-lg mx-auto flex justify-center md:justify-between gap-4 px-8 xl:px-0 mb-12'>
            <JobsList />

            <JobDetails openController={openController} />
        </section>
    );
}

export default Jobs;
