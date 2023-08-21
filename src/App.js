import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { Create } from './pages/Create';
import { SignIn } from './pages/authentication/SignIn';
import { SignUp } from './pages/authentication/SignUp';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/create/:id?' element={<Create/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/' element={<SignIn/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
