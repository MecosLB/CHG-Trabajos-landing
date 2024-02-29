import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FaAddressCard, FaAngleRight, FaBirthdayCake, FaBuilding, FaCity, FaEnvelope, FaGraduationCap, FaHashtag, FaMapMarkedAlt, FaPaperPlane, FaPhoneAlt, FaRegEnvelope, FaTimes, FaUpload, FaUser, FaWarehouse } from 'react-icons/fa';
import Swal from 'sweetalert2';

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

        if (!fieldDOM.value)
            return Swal.fire({
                html: `<h3 class='text-xl'>
                    Favor de llenar el campo:<br><b class='font-medium'>${translation[field]}</b>
                </h3>`,
                icon: 'warning',
                confirmButtonText: 'Cerrar',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'btn px-6 py-2 rounded-full text-white font-medium bg-blue-900 hover:bg-blue-950 focus:bg-blue-950',
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
                    confirmButton: 'btn px-6 py-2 rounded-full text-white font-medium bg-blue-900 hover:bg-blue-950 focus:bg-blue-950',
                },
                width: '300px',
            });
    }

    return false;
}

const ApplyModal = ({ visible, closeController, candidate, handleChange, handleChangeFile }) => {
    // Clear inputs on close
    const closeModal = () => {
        closeController();
        emptyInputs(candidate);
    }

    // Send data with axios after validation
    const sendCandidate = () => {
        const emptyField = validateFields(Object.keys(candidate));
        const cvFileName = candidate.cvFile.split('\\').pop();
        const data = new FormData(),
            candidateObj = {};

        if (emptyField) return;

        candidateObj.nombre = candidate.name;
        candidateObj.apellidos = candidate.lastName;
        candidateObj.fechaNacimiento = candidate.birthDate;
        candidateObj.correo = candidate.mail;
        candidateObj.telefono = candidate.phone;
        candidateObj.direccion = [candidate.street, `${candidate.numInt}-${candidate.numExt}`, candidate.neighbor, candidate.postCode, candidate.city, candidate.state].join(',');
        candidateObj.tituloProfesional = candidate.profTitle;

        data.append('datos', JSON.stringify(candidateObj));
        data.append('archivoCv', cvFileName);

        console.log(cvFileName);

        axios.post(`${apiUrl}candidatos/crear/`, data)
            .then(({ data }) => {
                console.log(data);
            })
            .catch(console.warn)
    }

    return (
        <section className={`apply flex items-center justify-center ${visible ? 'show' : ''}`}>
            <div className='modal flex flex-col gap-4 w-full max-w-screen-md mx-auto'>
                <span className='flex items-center justify-between'>
                    <h5 className='text-2xl text-blue-900 font-semibold'>
                        Enviar aplicación
                    </h5>

                    <button onClick={closeModal} className='text-xl ease-in-out duration-100 text-blue-900 focus:text-blue-950 hover:text-blue-950'>
                        <FaTimes />
                    </button>
                </span>

                <article className='personal-info flex flex-col gap-2'>
                    {/* Personal info */}
                    <h6 className='text-blue-950 text-lg font-medium'>
                        Información personal
                    </h6>

                    <div className="input-icon">
                        <FaGraduationCap className='icon text-blue-900' />
                        <input onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} value={candidate.profTitle} type="text" name='profTitle' placeholder='Título profesional' />
                    </div>

                    <span className='flex gap-2'>
                        <div className="input-icon">
                            <FaUser className='icon text-blue-900' />
                            <input onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} value={candidate.name} type="text" name='name' placeholder='Nombre' />
                        </div>

                        <div className="input-icon">
                            <FaAddressCard className='icon text-blue-900' />
                            <input onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} value={candidate.lastName} type="text" name='lastName' placeholder='Apellidos' />
                        </div>
                    </span>

                    <span className='flex gap-2'>
                        <div className="input-icon">
                            <FaBirthdayCake className='icon text-blue-900' />
                            <input onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} value={candidate.birthDate} type="date" name='birthDate' placeholder='Fecha de nacimiento' />
                        </div>

                        <div className="input-icon">
                            <FaEnvelope className='icon text-blue-900' />
                            <input onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} value={candidate.mail} type="email" name='mail' placeholder='Correo electrónico' />
                        </div>

                        <div className="input-icon">
                            <FaPhoneAlt className='icon text-blue-900' />
                            <input onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} value={candidate.phone} type="tel" name='phone' placeholder='Teléfono' />
                        </div>
                    </span>

                    {/* Address info */}
                    <h6 className='text-blue-950 text-lg font-medium mt-2'>
                        Domicilio
                    </h6>

                    <div className="input-icon">
                        <FaWarehouse className='icon text-blue-900' />
                        <input onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} value={candidate.street} type="text" name='street' placeholder='Calle' />
                    </div>

                    <span className='flex gap-2'>
                        <div className="input-icon">
                            <FaHashtag className='icon text-blue-900' />
                            <input onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} value={candidate.numInt} type="text" name='numInt' placeholder='Num. int.' />
                            <span>
                                -
                            </span>
                            <input onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} value={candidate.numExt} type="text" name='numExt' placeholder='Num. ext.' />
                        </div>

                        <div className="input-icon">
                            <FaBuilding className='icon text-blue-900' />
                            <input onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} value={candidate.neighbor} type="text" name='neighbor' placeholder='Colonia' />
                        </div>
                    </span>

                    <span className='flex gap-2'>
                        <div className="input-icon">
                            <FaRegEnvelope className='icon text-blue-900' />
                            <input onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} value={candidate.postCode} type="text" name='postCode' placeholder='Código postal' />
                        </div>

                        <div className="input-icon">
                            <FaCity className='icon text-blue-900' />
                            <input onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} value={candidate.city} type="text" name='city' placeholder='Municipio' />
                        </div>

                        <div className="input-icon">
                            <FaMapMarkedAlt className='icon text-blue-900' />
                            <input onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} value={candidate.state} type="text" name='state' placeholder='Estado' />
                        </div>
                    </span>

                    {/* Upload CV */}
                    <h6 className='text-blue-950 text-lg font-medium mt-2'>
                        Subir CV (PDF)
                    </h6>

                    <div className="input-icon">
                        <FaUpload className='icon text-blue-900' />
                        <input onChange={handleChangeFile} onFocus={handleFocus} onBlur={handleBlur} value={candidate.cvFile} type="file" name='cvFile' accept='.pdf' />
                    </div>
                </article>

                <article className='additional-info hidden flex flex-col gap-2'>
                    {/* Additional info */}
                    <h6 className='text-blue-950 text-lg font-medium'>
                        Preguntas adicionales
                    </h6>

                    <span className='flex-col gap-2'>
                        <label className='font-medium'>
                            ¿Cuántos años de experiencia tienes en contaduría?
                        </label>

                        <div className="input-icon">
                            <FaUser className='icon text-blue-900' />
                            <input onFocus={handleFocus} onBlur={handleBlur} type="text" name='name' placeholder='Respuesta' />
                        </div>
                    </span>

                    <span className='flex-col gap-2'>
                        <label className='font-medium'>
                            Describa su forma de ser en 5 palabres:
                        </label>

                        <div className="input-icon">
                            <FaUser className='icon text-blue-900' />
                            <input onFocus={handleFocus} onBlur={handleBlur} type="text" name='name' placeholder='Respuesta' />
                        </div>
                    </span>
                </article>

                <span className='flex gap-2 justify-end'>
                    <button className='hidden ease-in-out duration-100 text-white bg-blue-900 hover:bg-blue-800 focus:bg-blue-800'>
                        Siguiente
                        <FaAngleRight />
                    </button>

                    <button onClick={sendCandidate} className='btn-icon ease-in-out duration-100 text-white bg-blue-950 hover:bg-blue-900 focus:bg-blue-900'>
                        Enviar
                        <FaPaperPlane />
                    </button>
                </span>
            </div>
        </section>
    );
}

export default ApplyModal;

// visible, closeController, candidate, handleChange
ApplyModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    closeController: PropTypes.func,
    candidate: PropTypes.object.isRequired,
    handleChange: PropTypes.func,
    handleChangeFile: PropTypes.func,
}

ApplyModal.defaultProps = {
    visible: false,
    candidate: {},
}