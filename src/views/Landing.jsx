import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Searchbar from '../components/Searchbar';
import Filters from '../components/Filters';
import Jobs from '../components/Jobs';
import ApplyModal from '../components/ApplyModal';
import Footer from '../components/Footer';

const clearFields = (fields = []) => {

}

const Landing = () => {
    //Modal state & methods
    const [applyVisible, setApplyVisible] = useState({
        visible: false,
    });

    const openApplyModal = e => {
        setApplyVisible({
            visible: true,
        });
    }

    const closeApplyModal = e => {
        setApplyVisible({
            visible: false,
        });
    }

    return (
        <>
            <Navbar openController={openApplyModal} />

            <Header />
            <Searchbar />
            <Filters />
            <Jobs openController={openApplyModal} />

            <ApplyModal visible={applyVisible.visible} closeController={closeApplyModal} />

            <Footer />
        </>
    );
}

export default Landing;
