import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import puntoLogo from '../assets/img/logos/punto-logo.png';
import hospitalesLogo from '../assets/img/logos/hospitales-logo.png';
import consultoresLogo from '../assets/img/logos/consultores-logo.png';
import musicLogo from '../assets/img/logos/music-logo.png';
import filmsLogo from '../assets/img/logos/films-logo.png';
import recordingLogo from '../assets/img/logos/recording-logo.png';

const splideOptions = {
    type: 'loop',
    perPage: 4,
    perMove: 1,
    gap: 1,
    arrows: false,
    pagination: false,
    autoplay: true,
    interval: 2500,
    breakpoints: {
        767: {
            perPage: 1,
        },
        1023: {
            perPage: 2,
        },
        1279: {
            perPage: 3,
        }
    }
}

const Header = () => {
    return (
        <section className='header flex flex-col gap-20 pb-32'>
            <div className='banner'>
                <h1 className='text-blue-950 text-center text-3xl md:text-5xl font-bold'>
                    Únete a la<br /> Familia CHG
                </h1>
            </div>

            <div className='text-center max-w-screen-lg mx-auto px-8 lg:px-0'>
                <p className='mb-4 uppercase font-bold text-gray-700 tracking-widest'>
                    Nuestras empresas
                </p>

                <Splide options={splideOptions}>
                    <SplideSlide>
                        <picture>
                            <img src={puntoLogo} alt='Logo Punto CHG' />
                        </picture>
                    </SplideSlide>

                    <SplideSlide>
                        <picture>
                            <img src={filmsLogo} alt='Logo CHG Films' />
                        </picture>
                    </SplideSlide>

                    <SplideSlide>
                        <picture>
                            <img src={recordingLogo} alt='Logo CHG Recording' />
                        </picture>
                    </SplideSlide>

                    <SplideSlide>
                        <picture>
                            <img src={hospitalesLogo} alt='Logo Hospitales CHG' />
                        </picture>
                    </SplideSlide>

                    <SplideSlide>
                        <picture>
                            <img src={consultoresLogo} alt='Logo Consultores CHG' />
                        </picture>
                    </SplideSlide>

                    <SplideSlide>
                        <picture>
                            <img src={musicLogo} alt='Logo Music Group CHG' />
                        </picture>
                    </SplideSlide>
                </Splide>
            </div>
        </section>
    );
}

export default Header;
