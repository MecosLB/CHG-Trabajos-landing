import React, { useEffect, useState } from 'react';
import JobsList from './JobsList';
import JobDetails from './JobDetails';
import axios from 'axios';

// Vars
const apiUrl = 'https://bolsa-testing.puntochg.com/api/';

// General functions


const Jobs = ({ openController }) => {
    // Jobs state & methods
    const [jobsList, setJobsList] = useState({
        jobs: [],
    });

    useEffect(() => {
        getAllJobs();
    });

    const getAllJobs = () => {
        const data = new FormData();
        data.append('registrosPorPagina', 1);

        axios.post(`${apiUrl}vacantes/consultar/`, data)
            .then(({ data }) => {
                const { vacantes } = data;

                setJobsList({
                    jobs: vacantes,
                });
            })
            .catch(console.warn);
    }

    return (
        <section className='jobs max-w-screen-lg mx-auto flex justify-center md:justify-between gap-4 px-8 xl:px-0 mb-12'>
            <JobsList jobs={jobsList.jobs} />

            <JobDetails openController={openController} />
        </section>
    );
}

export default Jobs;
