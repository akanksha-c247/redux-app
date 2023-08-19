import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { Create } from './pages/Create';
import { Update } from './pages/Update';
import { SignIn } from './pages/authentication/SignIn';
import { SignUp } from './pages/authentication/SignUp';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/edit/:id' element={<Update/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/' element={<SignIn/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
