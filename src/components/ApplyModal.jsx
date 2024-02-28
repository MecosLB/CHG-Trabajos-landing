import React, { useState } from 'react';
import { FaAddressCard, FaAngleRight, FaBirthdayCake, FaBuilding, FaCity, FaEnvelope, FaGraduationCap, FaHashtag, FaMapMarkedAlt, FaPaperPlane, FaPhoneAlt, FaRegEnvelope, FaTimes, FaUpload, FaUser, FaWarehouse } from 'react-icons/fa';

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

// Validate each field
const validateFields = (fields = []) => {
    for (const field of fields) {
        const fieldDOM = document.querySelector(`input[name=${field}]`);

        if (!fieldDOM.value) return field;

        switch (field) {
            case 'mail':
                if (!isValidMail(fieldDOM)) return field;
                break;
            case 'phone':
                if (!isValidPhone(fieldDOM)) return field;
                break;
        }
    }

    return false;
}

const ApplyModal = ({ visible, closeController }) => {
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

    // Update input values in candidate state
    const handleChange = ({ target }) => {
        const fieldUpdated = target.getAttribute('name');
        const value = target.value;

        setCandidate({
            ...candidate,
            [fieldUpdated]: value,
        });
    }

    // Send data with axios after validation
    const sendCandidate = () => {
        const emptyField = validateFields(Object.keys(candidate));

        if (emptyField) alert(`There is an empty field called: ${emptyField}`);
    }

    return (
        <section className={`apply flex items-center justify-center ${visible ? 'show' : ''}`}>
            <div className='modal flex flex-col gap-4 w-full max-w-screen-md mx-auto'>
                <span className='flex items-center justify-between'>
                    <h5 className='text-2xl text-blue-900 font-semibold'>
                        Enviar aplicación
                    </h5>

                    <button onClick={closeController} className='text-xl ease-in-out duration-100 text-blue-900 focus:text-blue-950 hover:text-blue-950'>
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
                        <input onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} value={candidate.cvFile} type="file" name='cvFile' accept='.pdf' />
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
                    <button className='btn-icon ease-in-out duration-100 text-white bg-blue-900 hover:bg-blue-800 focus:bg-blue-800'>
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
