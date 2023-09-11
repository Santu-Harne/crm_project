import './App.css';
import { Toaster } from 'react-hot-toast';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import routes from './routes/routes';


function App() {

  return (
    <div>
      <h1>Hai Welcome</h1>
      <Router>
        <Toaster />
        <NavBar />
        <Routes>
          {routes}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
