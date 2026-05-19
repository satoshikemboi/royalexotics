import React from 'react';
import Hero from '../components/Hero';
import Why from '../components/Why';
import Brands from '../components/Brands';
import How from '../components/How';
function Home() {
    return (
        <div className="Home">
        <Hero />
        <Why />
        <Brands />
        <How />
        </div>
    );
    }

export default Home;
