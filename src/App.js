import logo from './logo.svg';
import './App.css';
import Counter from './components/Counter';
import  Home  from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Create } from './components/Create';
import { Update } from './components/Update';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/edit/:id' element={<Update/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
