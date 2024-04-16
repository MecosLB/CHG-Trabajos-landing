import React, { useEffect, useState } from 'react';
import Searchbar from './Searchbar';
import Filters from './Filters';
import JobsList from './JobsList';
import JobDetails from './JobDetails';
import axios from 'axios';
import Swal from 'sweetalert2';
import JobDetailsResponsive from './jobDetailsResponsive';

// Vars
const apiUrl = 'https://bolsa-testing.puntochg.com/api/';
const bodyDOM = document.querySelector('body');

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

const Jobs = ({ openController }) => {
    // Jobs list state & methods
    const [jobsList, setJobsList] = useState({
        jobs: [],
        jobsPerPage: 3,
        pageNum: 1,
    });

    const displayJobs = async (numPage = 1) => {
        const btnLoad = document.querySelector('#loadMore'),
            loader = document.querySelector('.job-loader');

        const formData = new FormData();
        formData.append('estatus', 'Activo');
        formData.append('filtros', JSON.stringify({ ...jobsFilter }));
        formData.append('registrosPorPagina', jobsList.jobsPerPage);
        formData.append('pagina', numPage);

        // Hide button and show loader
        btnLoad.classList.remove('flex');
        btnLoad.classList.add('hidden');
        loader.classList.remove('hidden');

        try {
            const { data } = await axios.post(`${apiUrl}vacantes/consultar/`, formData);
            let { vacantes: jobsRequested } = data;

            if (!jobsRequested) {
                loader.classList.add('hidden');
                return noResultJobs();
            }

            if (numPage > 1) {
                let { jobs } = jobsList;

                for (const job of jobsRequested)
                    jobs = [...jobs, job];

                jobsRequested = [...jobs];
            }

            if (numPage === 1)
                setFirstJob(jobsRequested[0]);

            setJobsList({
                ...jobsList,
                jobs: jobsRequested,
                pageNum: numPage,
            });
        } catch (error) {
            console.warn(error);
        }

        btnLoad.classList.remove('hidden');
        btnLoad.classList.add('flex');
        loader.classList.add('hidden');
    }

    const setFirstJob = (firstJob = null) => {
        if (!firstJob) return;

        // Set first job details
        const fullLocation = firstJob.direccion.split(',');

        setJobDetails({
            id: firstJob.id,
            titulo: firstJob.titulo,
            idEmpresa: firstJob.idEmpresa,
            empresa: firstJob.empresa,
            direccion: fullLocation[fullLocation.length - 2],
            salario: firstJob.salario,
            jornada: firstJob.jornada,
            descripcion: firstJob.descripcion,
            fechaPublicacion: firstJob.fechaPublicacion,
            preguntas: firstJob.preguntas,
        });
    }

    const searchJobs = async () => {
        const { description } = selectValues;
        setJobsFilter({
            descripcion: description,
        });

        // if (!jobsFilter.descripcion) return emptySearch();
        setIsFiltering(true);
    }

    const filterJobs = async () => {
        const { company, department, salary, workDay, description } = selectValues;
        setJobsFilter({
            idEmpresa: company.id,
            idDepartamento: department.id,
            jornada: workDay.id,
            salario: salary.id,
            descripcion: description,
        });
    }

    const emptyFilters = async () => {
        const btnFilter = document.querySelector('#filterBtn'),
            btnEmptyFilter = document.querySelector('#emptyFilterBtn');
        const emptyObj = {
            id: '',
            value: '',
        };

        setSelectValues({
            company: emptyObj,
            department: emptyObj,
            workDay: emptyObj,
            salary: emptyObj,
            description: '',
        });

        setJobsFilter({
            idEmpresa: '',
            idDepartamento: '',
            jornada: '',
            salario: '',
            descripcion: '',
        });

        setIsFiltering(false);

        btnFilter.classList.remove('filtered');
        btnEmptyFilter.classList.add('hidden');
    }

    const nextPage = async () => {
        let { pageNum: newPage } = jobsList;
        await displayJobs(++newPage);
    }

    // Job modal state & methods
    const [jobModal, setJobModal] = useState({
        visible: false,
    });

    const closeJobModal = () => {
        setJobModal({
            visible: false,
        });

        bodyDOM.classList.remove('h-screen', 'overflow-hidden');
    }

    // Job detail state & methods
    const [jobDetails, setJobDetails] = useState({
        id: '',
        idEmpresa: '',
        titulo: '',
        empresa: '',
        direccion: '',
        salario: '',
        jornada: '',
        descripcion: '',
        fechaPublicacion: '',
        preguntas: '',
    });

    const detailsOnClick = (uid, companyId, title, company, location, salary, workDay, description, publishDate, questions) => {
        setJobDetails({
            id: uid,
            idEmpresa: companyId,
            titulo: title,
            empresa: company,
            direccion: location,
            salario: salary,
            jornada: workDay,
            descripcion: description,
            fechaPublicacion: publishDate,
            preguntas: questions,
        });

        if (window.innerWidth < 768) {
            setJobModal({
                visible: true,
            });

            bodyDOM.classList.add('h-screen', 'overflow-hidden');
        }
    }

    // Filtering state
    const [isFiltering, setIsFiltering] = useState(false);
    const [jobsFilter, setJobsFilter] = useState({
        idEmpresa: '',
        idDepartamento: '',
        salario: '',
        jornada: '',
        descripcion: '',
    });

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
        displayJobs();
    }, [jobsFilter]);

    return (
        <>
            <Searchbar selectValues={selectValues} setSelectValues={setSelectValues} setIsFiltering={setIsFiltering} />
            <Filters filterJobs={filterJobs} emptyFilters={emptyFilters} isFiltering={isFiltering} setIsFiltering={setIsFiltering} selectValues={selectValues} setSelectValues={setSelectValues} />

            <section className='jobs max-w-screen-lg mx-auto flex justify-center md:justify-between gap-4 px-8 xl:px-0 mb-12'>
                <JobsList jobs={jobsList.jobs} detailsOnClick={detailsOnClick} paginationController={nextPage} />

                <JobDetails openController={openController} job={jobDetails} />
            </section>

            <JobDetailsResponsive openController={openController} closeController={closeJobModal} isVisible={jobModal.visible} job={jobDetails} />
        </>
    );
}

export default Jobs;
