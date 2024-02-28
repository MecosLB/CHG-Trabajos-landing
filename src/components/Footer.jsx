import React from 'react';
import { FaFacebookF, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaRegEnvelope } from 'react-icons/fa'
import logoPng from '../assets/img/logo-white.png';
import logoWebp from '../assets/img/logo-white.webp';

const currentYear = new Date().getFullYear();

const Footer = () => {
    return (
        <>
            <footer className='footer flex flex-col lg:flex-row justify-between gap-8 px-12 py-8 bg-blue-950 text-gray-200 text-sm font-medium'>
                <div className='flex flex-col items-center lg:items-start mx-auto lg:mx-0 gap-2 w-fit'>
                    <picture className='w-60 max-w-60'>
                        <source srcSet={logoWebp} type='image/webp' />
                        <img src={logoPng} alt='Punto CHG' />
                    </picture>

                    <h6>
                        El punto es estar cerca de ti.
                    </h6>
                </div>

                <div className='w-fit mx-auto lg:mx-0'>
                    <p className='text-center lg:text-start text-lg font-semibold mb-2'>
                        Contacto
                    </p>

                    <ul className='info flex flex-col items-center lg:items-start gap-2'>
                        <li>
                            <FaPhoneAlt className='text-teal-400' />
                            <span>
                                <a href="tel:3338803131">(33) 3880 3131</a>
                                &nbsp;y&nbsp;
                                <a href="tel:3338803130">(33) 3880 3130</a>
                            </span>
                        </li>

                        <li>
                            <FaMapMarkerAlt className='text-teal-400' />
                            <span>
                                Guadalupe 1555, Int. 9, Chapalita Oriente CP 45040, Zapopan, Jal.
                            </span>
                        </li>

                        <li>
                            <FaRegEnvelope className='text-teal-400' />
                            contacto@puntochg.com
                        </li>
                    </ul>
                </div>
            </footer>

            <div className='flex flex-col-reverse md:flex-row items-center justify-between gap-4 px-12 py-2 bg-black text-gray-300'>
                <span className='text-xs font-medium'>
                    Todos los derechos reservados © {currentYear} Punto CHG.
                </span>

                <span className='social-links flex gap-4'>
                    <a className='ease-in-out duration-100 text-black bg-white rounded-full hover:bg-black focus:bg-black hover:text-white focus:text-white' href="https://www.facebook.com/CHGConsultorios" target='_blank'>
                        <FaFacebookF />
                    </a>

                    <a className='ease-in-out duration-100 text-black bg-white rounded-full hover:bg-black focus:bg-black hover:text-white focus:text-white' href="https://www.instagram.com/puntochg/" target='_blank'>
                        <FaInstagram />
                    </a>
                </span>
            </div>
        </>
    );
}

export default Footer;
