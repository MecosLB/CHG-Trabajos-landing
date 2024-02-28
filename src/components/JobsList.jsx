import React from 'react';
import JobCard from './JobCard';

const JobsList = () => {
    return (
        <div className='list flex flex-col gap-2'>
            {/* Testing cards */}
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
        </div>
    );
}

export default JobsList;
