import React from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Home from '../Components/Home/Home'
import View from '../Components/View/View'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Error from '../Error/Error'

const Routing = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='*' element={<Error />} />
                <Route path='/view/:id' element={<View />} />
            </Routes>
            <Footer />
        </Router>
    )
}

export default Routing