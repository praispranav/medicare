import React, { useState } from "react";
import { Footer } from '../Footer/Footer';
import { Navbar } from '../Navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './AppStart';
import { Form } from "../Form/Form";
import { FormEnd } from "../FormEnd/FormEnd";
import ZipCodeForm from "../Form/ZipCodeForm";
import { ROUTES } from "../../constants/routes";

export const AppStart = () => {
    const [formEnd, setFormEnd] = useState({});
    const [form , setForm] = useState({});
    return (
    <div className="app-start">
        <BrowserRouter>

            <Navbar />

            <Routes>
                <Route path={ROUTES.homePage} element={<Form setForm={setForm} setFormEnd={setFormEnd} />} />
                <Route path={ROUTES.zipCodeForm} element={<ZipCodeForm setForm={setForm} setFormEnd={setFormEnd} />} />
                <Route path={ROUTES.nameForm} element={<Form setForm={setForm} setFormEnd={setFormEnd} />} />
                <Route path=":cid" element={<Form setForm={setForm} setFormEnd={setFormEnd} />} />
                <Route path='form' element={<Form setForm={setForm} setFormEnd={setFormEnd} />} />
                <Route path='congrats' element={<FormEnd form={form} fname={formEnd['fname']} lname={formEnd['lname']} />}/>
            </Routes>

            <Footer />

        </BrowserRouter>
    </div>
)}