import React, { useEffect, useState } from 'react';
import JobsList from './JobsList';
import JobDetails from './JobDetails';
import axios from 'axios';

// Vars
const apiUrl = 'https://bolsa-testing.puntochg.com/api/';

// General functions


const Jobs = ({ openController }) => {
    // Jobs list state & methods
    const [jobsList, setJobsList] = useState({
        jobs: [],
    });

    useEffect(() => {
        getAllJobs();
    });

    const getAllJobs = () => {
        const data = new FormData();
        data.append('registrosPorPagina', 5);

        axios.post(`${apiUrl}vacantes/consultar/`, data)
            .then(({ data }) => {
                const { vacantes } = data;

                setJobsList({
                    jobs: vacantes,
                });
            })
            .catch(console.warn);

        // const [firstJob] = jobsList.jobs;
        
        // setJobDetails({
        //     id: firstJob.id,
        //     titulo: firstJob.titulo,
        //     empresa: firstJob.empresa,
        //     direccion: firstJob.direccion,
        //     salario: firstJob.salario,
        //     jornada: firstJob.jornada,
        //     descripcion: firstJob.descripcion,
        //     fechaPublicacion: firstJob.fechaPublicacion,
        // });
    }

    // Job detail state & methods
    const [jobDetails, setJobDetails] = useState({
        id: '',
        titulo: '',
        empresa: '',
        direccion: '',
        salario: '',
        jornada: '',
        descripcion: '',
        fechaPublicacion: '',
    });

    const detailsOnClick = (uid, title, company, location, salary, workDay, description, publishDate) => {
        setJobDetails({
            id: uid,
            titulo: title,
            empresa: company,
            direccion: location,
            salario: salary,
            jornada: workDay,
            descripcion: description,
            fechaPublicacion: publishDate,
        });
    }

    return (
        <section className='jobs max-w-screen-lg mx-auto flex justify-center md:justify-between gap-4 px-8 xl:px-0 mb-12'>
            <JobsList jobs={jobsList.jobs} detailsOnClick={detailsOnClick} />

            <JobDetails openController={openController} job={jobDetails} />
        </section>
    );
}

export default Jobs;
