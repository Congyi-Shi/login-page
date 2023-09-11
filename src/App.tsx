import React, { Suspense, useState } from 'react'
import './App.css'

import lessStyles from '@/app.less'
import Header from './components/Header'
import Footer from './components/Footer'
import ContentBody from './components/ContentBody'

function App() {
    return (
        <div className={lessStyles.content}>
            <Header></Header>
            <ContentBody></ContentBody>
            <Footer></Footer>
        </div>
    )
}

export default App
