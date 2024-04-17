import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Swal from 'sweetalert2';
import ReCAPTCHA from 'react-google-recaptcha';
import { FaAddressCard, FaAngleRight, FaBirthdayCake, FaBuilding, FaCity, FaEnvelope, FaGraduationCap, FaHashtag, FaMapMarkedAlt, FaPaperPlane, FaPhoneAlt, FaQuestion, FaRegEnvelope, FaTimes, FaUpload, FaUser, FaWarehouse } from 'react-icons/fa';

// Vars
const apiUrl = 'https://bolsa-testing.puntochg.com/api/';

const translation = {
    profTitle: 'Título profesional',
    name: 'Nombre',
    lastName: 'Apellidos',
    birthDate: 'Fecha de nacimiento',
    mail: 'Correo electrónico',
    phone: 'Teléfono',
    street: 'Calle',
    numInt: 'Número interior',
    numExt: 'Número exterior',
    neighbor: 'Colonia',
    postCode: 'Código postal',
    city: 'Municipio',
    state: 'Estado',
    cvFile: 'CV en PDF',
};

// input on focus handle
const handleFocus = ({ target }) => {
    const inputWrapperNew = target.parentNode,
        inputWrapperOld = document.querySelector('.input-icon.active');

    if (![...inputWrapperNew.classList].includes('input-icon')) return;

    if (inputWrapperOld)
        inputWrapperOld.classList.remove('active');

    inputWrapperNew.classList.add('active');
}

// input on blur handle
const handleBlur = ({ target }) => {
    const inputWrapper = target.parentNode;

    if (![...inputWrapper.classList].includes('active')) return;

    inputWrapper.classList.remove('active');
}

// General validations
const isValidPhone = ({ value }) => {
    const regEx = /^\d{10}$/;
    return regEx.test(value);
}

const isValidMail = ({ value }) => {
    const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regEx.test(value);
}

const isValidPCode = ({ value }) => {
    const regEx = /^\d{5}$/;
    return regEx.test(value);
}

// Empty input and remove empty class
const emptyInputs = (candidate = {}) => {
    for (const key in candidate) {
        const fieldDOM = document.querySelector(`input[name=${key}]`);
        fieldDOM.parentNode.classList.remove('empty');

        candidate[key] = '';
    }
}

const addEmptyClass = (fields = []) => {
    for (const field of fields) {
        const fieldDOM = document.querySelector(`input[name=${field}]`);

        if (field === 'numInt') continue;

        if (!fieldDOM.value)
            fieldDOM.parentNode.classList.add('empty');
    }
}

// Validate each field
const validateFields = (fields = []) => {
    const specialValidation = {
        mail: isValidMail,
        phone: isValidPhone,
        postCode: isValidPCode,
    }

    addEmptyClass(fields);

    for (const field of fields) {
        const fieldDOM = document.querySelector(`input[name=${field}]`);

        if (field === 'numInt') continue;

        if (!fieldDOM.value)
            return Swal.fire({
                html: `<h3 class='text-xl'>
                    Favor de llenar el campo:<br><b class='font-medium'>${translation[field]}</b>
                </h3>`,
                icon: 'warning',
                confirmButtonText: 'Cerrar',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'btn px-6 py-2 rounded-lg text-white font-medium bg-blue-950 hover:bg-blue-900 focus:bg-blue-900',
                },
                width: '300px',
            });

        if (!Object.keys(specialValidation).includes(field)) continue;

        if (!specialValidation[field](fieldDOM))
            return Swal.fire({
                html: `<h3 class='text-xl'>
                        Favor de ingresar un:<br><b class='font-medium'>${translation[field]}</b> válido
                        </h3>`,
                icon: 'error',
                confirmButtonText: 'Cerrar',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'btn px-6 py-2 rounded-lg text-white font-medium bg-blue-950 hover:bg-blue-900 focus:bg-blue-900',
                },
                width: '300px',
            });
    }

    return false;
}

const validateAdditionalQuestions = () => {
    const questionsDOM = [...document.querySelectorAll('.question')],
        answersArray = [];

    for (const question of questionsDOM) {
        const label = question.firstChild,
            answerWrapper = question.lastChild,
            answerInput = answerWrapper.lastChild;

        if (!answerInput.value) {
            Swal.fire({
                html: `<h3 class='text-xl font-medium'>
                        Favor de contestar todas las preguntas
                        </h3>`,
                icon: 'error',
                confirmButtonText: 'Cerrar',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'btn px-6 py-2 rounded-lg text-white font-medium bg-blue-950 hover:bg-blue-900 focus:bg-blue-900',
                },
                width: '300px',
            });

            return false;
        }

        answersArray.push({ label: label.innerText, respuesta: answerInput.value });
    }

    return answersArray;
}

const ApplyModal = ({ modal, closeController, candidate, handleChange, handleChangeFile }) => {
    const addQuestions = modal.questions ? JSON.parse(modal.questions) : [];
    const SITE_KEY = '6LcywIspAAAAAIsY19yPijW8wFwsQ3LpAvqGs14d';

    // recaptcha ref
    const captchaRef = useRef(null);

    const validateCaptcha = async () => {
        const token = captchaRef.current.getValue();
        const data = new FormData();

        data.append('token', token);
        captchaRef.current.reset();

        try {
            let res = await axios.post(`${apiUrl}shared/recaptcha/site_key/`);
            const { site_key } = res.data;

            res = await axios.post(`${apiUrl}shared/recaptcha/`, data);
            const { message, error } = res.data;

            if (error) return false;

            const { success } = JSON.parse(message);
            return success;
        } catch (error) {
            console.warn(error);
        }

        return false;
    }

    // Clear inputs on close
    const closeModal = () => {
        captchaRef.current.reset();
        closeController();
        emptyInputs(candidate);
    }

    // Change page to additional questions after validation
    const nextPageModal = ({ currentTarget }) => {
        const addQuestionsDOM = document.querySelector('.additional-info'),
            personalInfoDOM = document.querySelector('.personal-info'),
            nextBtn = document.querySelector('button.next'),
            sendBtn = document.querySelector('button.send');
        const emptyField = validateFields(Object.keys(candidate));

        if (emptyField) return;

        addQuestionsDOM.classList.toggle('hidden');
        personalInfoDOM.classList.toggle('hidden');
        nextBtn.classList.toggle('hidden');
        sendBtn.classList.toggle('hidden');
    }

    // Send data with axios after validation
    const sendCandidate = async () => {
        const endpoint = modal.companyId ? 'vacantes-candidatos/' : 'candidatos/';
        const emptyField = validateFields(Object.keys(candidate));
        const captchaFullfilled = await validateCaptcha();
        const cvFileName = candidate.cvFile.split('\\').pop();
        const data = new FormData(),
            candidateObj = {};

        if (emptyField) return;
        if (!captchaFullfilled)
            return Swal.fire({
                html: `<h3 class='text-xl font-medium'>
                Favor de validar que no eres un robot.
                </h3>`,
                icon: 'error',
                confirmButtonText: 'Cerrar',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'btn px-6 py-2 rounded-lg text-white font-medium bg-blue-950 hover:bg-blue-900 focus:bg-blue-900',
                },
                width: '300px',
            });

        candidateObj.nombre = candidate.name;
        candidateObj.apellidos = candidate.lastName;
        candidateObj.fechaNacimiento = candidate.birthDate;
        candidateObj.correo = candidate.mail;
        candidateObj.telefono = candidate.phone;
        candidateObj.direccion = [candidate.street, `${candidate.numInt}-${candidate.numExt}`, candidate.neighbor, candidate.postCode, candidate.city, candidate.state].join(',');
        candidateObj.tituloProfesional = candidate.profTitle;

        // Validate if there are additional questions
        if (modal.companyId) {
            let emptyAnswers = validateAdditionalQuestions();

            data.append('idEmpresa', modal.companyId);
            data.append('idVacante', modal.jobId);

            if (emptyAnswers === false) return;

            candidateObj.respuestas = JSON.stringify(emptyAnswers);
        }

        data.append('datos', JSON.stringify(candidateObj));
        data.append('archivoCv', cvFileName);

        try {
            const { data: res } = await axios.post(`${apiUrl}${endpoint}crear/`, data);
            Swal.fire({
                html: `<h3 class='text-xl font-medium'>
                        ${res.mensaje}
                        </h3>`,
                icon: `${res.error ? 'error' : 'success'}`,
                confirmButtonText: 'Cerrar',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'btn px-6 py-2 rounded-lg text-white font-medium bg-blue-950 hover:bg-blue-900 focus:bg-blue-900',
                },
                width: '300px',
            });

            if (!res.error) closeModal();
        } catch (error) {
            console.warn(error);
        }
    }

    return (
        <section className={`apply flex items-center justify-center ${modal.visible ? 'show' : ''}`}>
            <div className='modal flex flex-col gap-4 w-full max-w-screen-md mx-auto'>
                <span className='flex items-center justify-between'>
                    <h5 className='text-2xl text-blue-950 font-bold'>
                        Enviar aplicación
                    </h5>

                    <button onClick={closeModal} className='text-xl ease-in-out duration-100 text-blue-950 focus:text-blue-900 hover:text-blue-900'>
                        <FaTimes />
                    </button>
                </span>

                <article className='personal-info flex flex-col gap-2'>
                    {/* Personal info */}
                    <h6 className='text-blue-950 text-lg font-medium'>
                        Información personal
                    </h6>

                    <div className="input-icon">
                        <FaGraduationCap className='icon text-blue-950' />
                        <input onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} value={candidate.profTitle} type="text" name='profTitle' placeholder='Título profesional' />
                    </div>

                    <span className='flex flex-col md:flex-row gap-2'>
                        <div className="input-icon">
                            <FaUser className='icon text-blue-950' />
                            <input onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} value={candidate.name} type="text" name='name' placeholder='Nombre' />
                        </div>

                        <div className="input-icon">
                            <FaAddressCard className='icon text-blue-950' />
                            <input onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} value={candidate.lastName} type="text" name='lastName' placeholder='Apellidos' />
                        </div>
                    </span>

                    <span className='flex flex-col md:flex-row gap-2'>
                        <div className="input-icon">
                            <FaBirthdayCake className='icon text-blue-950' />
                            <input onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} value={candidate.birthDate} type="date" name='birthDate' placeholder='Fecha de nacimiento' />
                        </div>

                        <div className="input-icon">
                            <FaEnvelope className='icon text-blue-950' />
                            <input onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} value={candidate.mail} type="email" name='mail' placeholder='Correo electrónico' />
                        </div>

                        <div className="input-icon">
                            <FaPhoneAlt className='icon text-blue-950' />
                            <input onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} value={candidate.phone} type="tel" name='phone' placeholder='Teléfono' />
                        </div>
                    </span>

                    {/* Address info */}
                    <h6 className='text-blue-950 text-lg font-medium mt-2'>
                        Domicilio
                    </h6>

                    <div className="input-icon">
                        <FaWarehouse className='icon text-blue-950' />
                        <input onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} value={candidate.street} type="text" name='street' placeholder='Calle' />
                    </div>

                    <span className='flex flex-col md:flex-row gap-2'>
                        <div className="input-icon">
                            <FaHashtag className='icon text-blue-950' />
                            <input onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} value={candidate.numInt} type="text" name='numInt' placeholder='Num. int.' />
                            <span>
                                -
                            </span>
                            <input onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} value={candidate.numExt} type="text" name='numExt' placeholder='Num. ext.' />
                        </div>

                        <div className="input-icon">
                            <FaBuilding className='icon text-blue-950' />
                            <input onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} value={candidate.neighbor} type="text" name='neighbor' placeholder='Colonia' />
                        </div>
                    </span>

                    <span className='flex flex-col md:flex-row gap-2'>
                        <div className="input-icon">
                            <FaRegEnvelope className='icon text-blue-950' />
                            <input onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} value={candidate.postCode} type="text" name='postCode' placeholder='Código postal' />
                        </div>

                        <div className="input-icon">
                            <FaCity className='icon text-blue-950' />
                            <input onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} value={candidate.city} type="text" name='city' placeholder='Municipio' />
                        </div>

                        <div className="input-icon">
                            <FaMapMarkedAlt className='icon text-blue-950' />
                            <input onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} value={candidate.state} type="text" name='state' placeholder='Estado' />
                        </div>
                    </span>

                    {/* Upload CV */}
                    <h6 className='text-blue-950 text-lg font-medium mt-2'>
                        Subir CV (PDF)
                    </h6>

                    <div className="input-icon">
                        <FaUpload className='icon text-blue-950' />
                        <input onChange={handleChangeFile} onFocus={handleFocus} onBlur={handleBlur} value={candidate.cvFile} type="file" name='cvFile' accept='.pdf' />
                    </div>
                </article>

                <article className='additional-info hidden flex flex-col items-center gap-2'>
                    {/* Additional info */}
                    <h6 className='text-blue-900 text-lg font-medium'>
                        Preguntas adicionales
                    </h6>

                    {
                        addQuestions.map(({ tipo, label, valores }, index) => {
                            return (<span key={index} className='question flex flex-col gap-1 w-full max-w-96'>
                                <label className='text-blue-900 font-medium'>
                                    {label}
                                </label>

                                <div className='input-icon'>
                                    <FaQuestion className='icon text-blue-950' />
                                    {
                                        tipo === 'text' ?
                                            <input className='add-input' onFocus={handleFocus} onBlur={handleBlur} type='text' placeholder='Respuesta' /> :
                                            <select className='w-full add-select' onFocus={handleFocus} onBlur={handleBlur} defaultValue=''>
                                                <option value='' hidden>Seleccionar...</option>
                                                {
                                                    valores.map((val, index) => {
                                                        return <option key={index} value={val}>{val}</option>
                                                    })
                                                }
                                            </select>
                                    }
                                </div>
                            </span>)
                        })
                    }
                </article>

                <ReCAPTCHA className='w-min mx-auto' sitekey={SITE_KEY} ref={captchaRef} />

                <span className='flex gap-2 justify-end buttons'>
                    {/* <Button hasQuestions={modal.questions} /> */}
                    <button onClick={nextPageModal} className={`btn-icon next ease-in-out duration-100 text-white bg-blue-950 hover:bg-blue-800 focus:bg-blue-800 ${modal.questions ? '' : 'hidden'}`}>
                        Siguiente
                        <FaAngleRight />
                    </button>

                    <button onClick={sendCandidate} className={`btn-icon send ease-in-out duration-100 text-white bg-blue-900 hover:bg-blue-950 focus:bg-blue-950 ${!modal.questions ? '' : 'hidden'}`}>
                        Enviar
                        <FaPaperPlane />
                    </button>
                </span>
            </div>
        </section>
    );
}

export default ApplyModal;

ApplyModal.propTypes = {
    modal: PropTypes.object.isRequired,
    closeController: PropTypes.func,
    candidate: PropTypes.object.isRequired,
    handleChange: PropTypes.func,
    handleChangeFile: PropTypes.func,
}

ApplyModal.defaultModal = {
    modal: {
        visible: false,
        jobId: '1234',
        questions: [{ "tipo": "text", "label": "Pregunta 1", "valores": [] }],
    }
}