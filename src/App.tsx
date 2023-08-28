import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { Create } from './pages/Create';
import { SignIn } from './pages/authentication/SignIn';
import SignUp from './pages/authentication/SignUp';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18next';
import Header from './components/header/Header';

function App() {
  return (
    <div className="App">
      <Suspense fallback={null}>
        <I18nextProvider i18n={i18n}>
          <BrowserRouter>
            {/* Define the Header inside each route */}
            <Routes>
              <Route
                path="/Home"
                element={
                  <>
                    <Header />
                    <Home />
                  </>
                }
              />
              <Route
                path="/create/:id?"
                element={
                  <>
                    <Header />
                    <Create />
                  </>
                }
              />
              <Route
                path="/signup"
                element={
                  <>
                    <Header />
                    <SignUp />
                  </>
                }
              />
              <Route
                path="/*"
                element={
                  <>
                    <Header />
                    <SignIn />
                  </>
                }
              />
            </Routes>
          </BrowserRouter>
        </I18nextProvider>
      </Suspense>
    </div>
  );
}

export default App;
