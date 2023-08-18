import logo from './logo.svg';
import './App.css';
import Counter from './components/Counter';
import  Home  from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Create } from './components/Create';
import { Update } from './components/Update';
import { SignUp } from './components/authentication/SignUp';
import { SignIn } from './components/authentication/SignIn';
import SearchAppBar from './components/SearchBar';

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
