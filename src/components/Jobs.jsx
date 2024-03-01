import React, { useEffect, useState } from 'react';
import Searchbar from './Searchbar';
import Filters from './Filters';
import JobsList from './JobsList';
import JobDetails from './JobDetails';
import axios from 'axios';
import Swal from 'sweetalert2';

// Vars
const apiUrl = 'https://bolsa-testing.puntochg.com/api/';

// General functions
const noResultJobs = () => {
    return Swal.fire({
        html: `<h3 class='text-xl font-medium'>
                    Lo sentimos.
                </h3>
                <p class='text-base'>
                    No hay resultados para su búsqueda.
                </p>`,
        icon: 'info',
        confirmButtonText: 'Cerrar',
        buttonsStyling: false,
        customClass: {
            confirmButton: 'btn px-6 py-2 rounded-full text-white font-medium bg-blue-900 hover:bg-blue-950 focus:bg-blue-950',
        },
        width: '300px',
    });
}

const emptySearch = () => {
    return Swal.fire({
        html: `<h3 class='text-lg font-medium'>
                    Favor de escribir una palabra clave para su búsqueda.
                </h3>`,
        icon: 'error',
        confirmButtonText: 'Cerrar',
        buttonsStyling: false,
        customClass: {
            confirmButton: 'btn px-6 py-2 rounded-full text-white font-medium bg-blue-900 hover:bg-blue-950 focus:bg-blue-950',
        },
        width: '300px',
    });
}

const Jobs = ({ openController }) => {
    // Jobs list state & methods
    const [jobsList, setJobsList] = useState({
        jobs: [],
        jobsPerPage: 5,
        pageNum: 1,
    });

    const searchJobs = async () => {
        const { company, department, salary, workDay, description } = selectValues;
        const data = new FormData();
        const filtersObj = {
            idEmpresa: company.id,
            idDepartamento: department.id,
            salario: salary.id,
            jornada: workDay.id,
            descripcion: description,
        }

        if (!description) return emptySearch();

        data.append('filtros', JSON.stringify(filtersObj));
        data.append('registrosPorPagina', jobsList.jobsPerPage);
        data.append('pagina', 1);

        try {
            let res = await axios.post(`${apiUrl}vacantes/consultar/`, data);
            const { vacantes: searchedJobs } = res.data;

            if (!searchedJobs) return noResultJobs();

            setJobsList({
                ...jobsList,
                jobs: searchedJobs,
            });
        } catch (error) {
            console.warn(error);
        }
    }

    const filterJobs = async () => {
        const { company, department, salary, workDay, description } = selectValues;
        const data = new FormData();
        const filtersObj = {
            idEmpresa: company.id,
            idDepartamento: department.id,
            salario: salary.id,
            jornada: workDay.id,
            descripcion: description,
        }

        data.append('filtros', JSON.stringify(filtersObj));
        data.append('registrosPorPagina', jobsList.jobsPerPage);
        data.append('pagina', 1);

        try {
            let res = await axios.post(`${apiUrl}vacantes/consultar/`, data);
            const { vacantes: filteredJobs } = res.data;

            if (!filteredJobs) return noResultJobs();

            setJobsList({
                ...jobsList,
                jobs: filteredJobs,
            });
        } catch (error) {
            console.warn(error);
        }
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

    // Selects state & methods
    const [selectValues, setSelectValues] = useState({
        company: {
            id: '',
            value: '',
        },
        department: {
            id: '',
            value: '',
        },
        workDay: {
            id: '',
            value: '',
        },
        salary: {
            id: '',
            value: '',
        },
        description: '',
    });

    useEffect(() => {
        const getAllJobs = async () => {
            const data = new FormData();
            data.append('registrosPorPagina', jobsList.jobsPerPage);

            try {
                // Get jobs list
                let res = await axios.post(`${apiUrl}vacantes/consultar/`, data);
                const { vacantes: jobs } = res.data;
                const firstJob = jobs.length ? jobs[0] : null;

                setJobsList({
                    ...jobsList,
                    jobs: jobs,
                });

                if (!firstJob) return;

                // Set first job details
                const fullLocation = firstJob.direccion.split(',');

                setJobDetails({
                    id: firstJob.id,
                    titulo: firstJob.titulo,
                    empresa: firstJob.empresa,
                    direccion: fullLocation[fullLocation.length - 2],
                    salario: firstJob.salario,
                    jornada: firstJob.jornada,
                    descripcion: firstJob.descripcion,
                    fechaPublicacion: firstJob.fechaPublicacion,
                });
            } catch (error) {
                console.warn(error);
            }
        }

        getAllJobs();
    }, []);

    return (
        <>
            <Searchbar searchJobs={searchJobs} selectValues={selectValues} setSelectValues={setSelectValues} />
            <Filters filterJobs={filterJobs} selectValues={selectValues} setSelectValues={setSelectValues} />

            <section className='jobs max-w-screen-lg mx-auto flex justify-center md:justify-between gap-4 px-8 xl:px-0 mb-12'>
                <JobsList jobs={jobsList.jobs} detailsOnClick={detailsOnClick} />

                <JobDetails openController={openController} job={jobDetails} />
            </section>
        </>
    );
}

export default Jobs;
