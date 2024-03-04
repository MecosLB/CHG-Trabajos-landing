import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
// import Searchbar from '../components/Searchbar';
import Jobs from '../components/Jobs';
import ApplyModal from '../components/ApplyModal';
import Footer from '../components/Footer';
import axios from 'axios';

// Vars
const apiUrl = 'https://bolsa-testing.puntochg.com/api/';
const bodyDOM = document.querySelector('body');

// General functions
const toggleEmptyClass = (field) => {
    if (!field.value)
        field.parentNode.classList.add('empty');
    else
        field.parentNode.classList.remove('empty');
}

const deleteOldFile = async (fileName = '') => {
    const data = new FormData();
    data.append('archivo', fileName);

    // Delete old file in temp_dir
    try {
        const res = await axios.post(`${apiUrl}shared/uploader/eliminar/`, data);
        // console.log(res.data);
    } catch (error) {
        console.warn(error);
    }
}

const Landing = () => {
    // Form state & methods
    const [candidate, setCandidate] = useState({
        profTitle: '',
        name: '',
        lastName: '',
        birthDate: '',
        mail: '',
        phone: '',
        street: '',
        numInt: '',
        numExt: '',
        neighbor: '',
        postCode: '',
        city: '',
        state: '',
        cvFile: '',
    });

    const handleChange = ({ target }) => {
        const fieldUpdated = target.getAttribute('name');
        const value = target.value;

        setCandidate({
            ...candidate,
            [fieldUpdated]: value,
        });

        if (fieldUpdated === 'numInt') return;

        toggleEmptyClass(target);
    }

    // Exclusive handle on change for file input
    const handleChangeFile = async ({ target }) => {
        const oldFileName = candidate.cvFile.split('\\').pop(), // Delete C:\\fakepath\\ part in the string
            newFileName = target.value;
        const data = new FormData();

        setCandidate({
            ...candidate,
            cvFile: newFileName,
        });

        toggleEmptyClass(target);
        deleteOldFile(oldFileName);

        // Upload new file if exists
        if (!newFileName) return;

        data.append('archivo', target.files[0]);
        data.append('extensiones', JSON.stringify(['pdf']));

        try {
            const res = await axios.post(`${apiUrl}shared/uploader/subir/`, data);
            // console.log(res.data);
        } catch (error) {
            console.warn(error);
        }
    }

    // Modal state & methods
    const [modal, setModal] = useState({
        visible: false,
        jobId: '',
        companyId: '',
        questions: '',
    });

    const openApplyModal = ({ id, idEmpresa, preguntas }) => {
        setModal({
            jobId: id,
            companyId: idEmpresa,
            questions: preguntas,
            visible: true,
        });

        bodyDOM.classList.add('h-screen', 'overflow-hidden');
    }

    const closeApplyModal = e => {
        const addQuestionsDOM = document.querySelector('.additional-info'),
            personalInfoDOM = document.querySelector('.personal-info');
        const oldFileName = candidate.cvFile.split('\\').pop();

        setModal({
            jobId: '',
            companyId: '',
            questions: '',
            visible: false,
        });

        deleteOldFile(oldFileName);
        bodyDOM.classList.remove('h-screen', 'overflow-hidden');

        if (!personalInfoDOM.classList.contains('hidden')) return;

        addQuestionsDOM.classList.toggle('hidden');
        personalInfoDOM.classList.toggle('hidden');
    }

    return (
        <>
            <Navbar openController={openApplyModal} />

            <Header />
            {/* <Searchbar /> */}
            <Jobs openController={openApplyModal} />

            <ApplyModal modal={modal} candidate={candidate} handleChange={handleChange} handleChangeFile={handleChangeFile} closeController={closeApplyModal} />

            <Footer />
        </>
    );
}

export default Landing;
