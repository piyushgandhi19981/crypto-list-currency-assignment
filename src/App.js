import BaseRoute from './pages/base';
import { ToastContainer } from 'react-toastify';
import './App.css';
import './styles/variables.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <BaseRoute />
      <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    </div>
  );
}

export default App;
