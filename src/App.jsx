import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './screens/Home'
import Cmsoon from './screens/Cmsoon'
import Signup from './screens/Signup'
import Login from './screens/Login'

const App = () => {
    return (
        <div className=' bg-[#0B101B] min-h-screen '>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Signup/>}></Route>
                    <Route path='/login' element={<Login/>}></Route>
                    <Route path='/home' element={<Home/>}></Route>
                    <Route path='/about' element={<Cmsoon/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App