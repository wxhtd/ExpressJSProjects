import logo from './logo.svg';
import './App.css';
import { ConfigForm } from './components/ConfigForm'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hello from sample-react-app
        </p>
        <ConfigForm />
      </header>
    </div>
  );
}

export default App;
