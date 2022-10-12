import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from '../components/elements/Footer/Footer';
import BrowsePage from '../components/pages/Browse/Browse';
import PropertiesPage from '../components/pages/Properties/Properties'


const AppRouter = (): JSX.Element => (
  <BrowserRouter>
    <main>
      <Routes>
        <Route path="/" element={<BrowsePage/>}  />
        <Route path="/properties" element={<PropertiesPage/>}  />
      </Routes>
    </main>
    <Footer />
  </BrowserRouter>
);

export default AppRouter;
