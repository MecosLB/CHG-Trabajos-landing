import React from 'react';
import { FaFacebookF, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaRegEnvelope } from 'react-icons/fa'
// import logoPng from '../assets/img/logo-white.png';
// import logoWebp from '../assets/img/logo-white.webp';

const currentYear = new Date().getFullYear();

const Footer = () => {
    return (
        <>
            <footer className='footer px-12 py-12 bg-blue-950 text-gray-200 text-sm font-medium'>
                <article className='max-w-screen-lg mx-auto flex flex-col lg:flex-row justify-between gap-8'>
                    <div className='left-col flex flex-col items-center lg:items-start mx-auto lg:mx-0 gap-2 w-fit'>
                        {/* <picture className='w-60 max-w-60'>
                            <source srcSet={logoWebp} type='image/webp' />
                            <img src={logoPng} alt='Punto CHG' />
                        </picture> */}
                        <h5 className='uppercase font-bold'>
                            Punto CHG
                        </h5>

                        <h6>
                            El punto es estar cerca de ti.
                        </h6>

                        <hr />

                        <ul className='info flex flex-col items-center lg:items-start gap-2'>
                            <li>
                                <FaPhoneAlt className='text-white' />
                                <span>
                                    <a href="tel:3338803131">01 (33) 3880 3130</a>
                                </span>
                            </li>

                            <li>
                                <FaMapMarkerAlt className='text-white' />
                                <span>
                                    Av. Guadalupe #1555 int. 9 Col. Chapalita C.P. 45040 Zapopan, Jalisco, México.
                                </span>
                            </li>

                            <li>
                                <FaRegEnvelope className='text-white' />
                                contacto@puntochg.com
                            </li>
                        </ul>
                    </div>

                    <div className='contact w-fit text-center lg:text-start mx-auto lg:mx-0'>
                        <h5 className='font-bold mb-2'>
                            Contáctanos
                        </h5>

                        <p>
                            Queremos estar cerca de ti, si necesitas
                            información, por favor, no dudes en
                            contactarnos.
                        </p>

                    </div>
                </article>
            </footer>

            <div className='px-12 py-2 bg-black text-gray-500'>
                <article className='max-w-screen-lg mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-4 text-xs'>
                    <span className='text-center lg:text-start'>
                        © {currentYear} Punto CHG. Todos los derechos reservados. <span className='text-white font-bold'>puntochg.com</span>
                    </span>

                    <span className='flex flex-col md:flex-row gap-2 md:gap-5 lg:gap-10 text-center'>
                        <a className='ease-in-out duration-100 hover:text-white focus:text-white' href="#" target='_blank'>
                            Política de Privacidad
                        </a>

                        <a className='ease-in-out duration-100 hover:text-white focus:text-white' href="#" target='_blank'>
                            Términos y Condiciones
                        </a>
                    </span>

                    <span className='social-links text-base flex gap-4'>
                        <a className='ease-in-out duration-100 text-white hover:text-gray-500 focus:text-gray-500' href="https://www.facebook.com/CHGConsultorios" target='_blank'>
                            <FaFacebookF />
                        </a>

                        <a className='ease-in-out duration-100 text-white hover:text-gray-500 focus:text-gray-500' href="https://www.instagram.com/puntochg/" target='_blank'>
                            <FaInstagram />
                        </a>
                    </span>
                </article>
            </div>
        </>
    );
}

export default Footer;
