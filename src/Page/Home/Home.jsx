import React, { useEffect, useState } from 'react';
import Banner from '../../Components/Banner/Banner';
import { Helmet } from 'react-helmet-async';
import { Fade } from 'react-awesome-reveal';
import SectionTitle from '../../Components/SectionTitle/SectionTitle';
import { motion } from 'framer-motion';
import FunFactsSection from '../../Components/FunFactsSection/FunFactsSection';
import useAuth from '../../hook/useAuth';

const Home = () => {
    const [popularClasses, setPopularClasses] = useState([])
    const [popularInstructor, setPopularInstructor] = useState([])
    const {theme} = useAuth()
    useEffect(() => {
        fetch('http://localhost:5000/popular-classes')
            .then(res => res.json())
            .then(data => setPopularClasses(data))
    }, [])

    useEffect(() => {
        fetch('http://localhost:5000/popular-instructor')
            .then(res => res.json())
            .then(data => setPopularInstructor(data))
    }, [])

    return (
        <div>
            <Helmet>
                <title>PlayTime Sports | Home</title>
            </Helmet>
            <Banner />
            {/* popular classes */}
            <section>
                <SectionTitle heading='Popular Classes' />
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                    {
                        popularClasses.map(popular => <motion.div
                            key={popular._id}
                            className={`card w-full lg:w-96 shadow-xl overflow-hidden ${theme === 'dark' ? 'bg-slate-700' : 'bg-base-100'}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -100 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div>
                                <Fade cascade>
                                    <figure className='relative h-52'>
                                        <img src={popular.image} alt="Class" />
                                    </figure>
                                </Fade>
                                <div className="card-body">
                                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">Taken By:- {popular.instructor_name}</h2>
                                    <h2 className="card-title">{popular.name}</h2>
                                    <p>Total Enrolled : {popular.enrolled}</p>
                                </div>
                            </div>
                        </motion.div>)
                    }
                </div>
            </section>
            
            {/* popular Instructor */}
            <section>
                <SectionTitle heading='Popular Instructor' />
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                    {
                        popularInstructor.map(popular => <motion.div
                            key={popular._id}
                            className={`card w-full lg:w-96 shadow-xl overflow-hidden ${theme === 'dark' ? 'bg-slate-700' : 'bg-base-100'}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -100 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div>
                                <Fade cascade>
                                    <figure className='relative h-52'>
                                        <img src={popular.image} alt="Class" />
                                    </figure>
                                </Fade>
                                <div className="card-body">
                                    <h2 className="card-title">{popular.name}</h2>
                                    <p>Total Enrolled : {popular.enrolled}</p>
                                </div>
                            </div>
                        </motion.div>)
                    }
                </div>
            </section>
            {/* fun facts section */}
            <FunFactsSection/>
        </div>
    );
};

export default Home;