import Home from './components/Home';
import Cliente from './components/Cliente';
import { BrowserRouter, Routes, Route, Link  } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import img from './img/react.png'

function App() {

  return (

    <>
      <div className='header'>
        <img src={img} alt="imagem-logo" />
        <h1 className='titulo'>Aplicação React - Cadastro de Usuário</h1>
      </div>
  
      <BrowserRouter>
      <Nav variant="tabs">
        <Nav.Link as={Link} to ="/">Home</Nav.Link>
        <Nav.Link as={Link} to ="cliente">Cadastro de Usuários</Nav.Link>
      </Nav>

      <Routes>
        <Route exact path="/" element={<Home/>} ></Route>
        <Route exact path="/cliente" element={<Cliente/>}></Route>
      </Routes>
      </BrowserRouter>
    </>

  );
}
export default App;
