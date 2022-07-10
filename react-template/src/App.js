import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="NotificationForm">Notification Form</div>

      <div className="firstName">
        <p>First Name</p>
        <input placeHolder="First Name"/>
      </div>
      <div>
        <input placeHolder="Last Name"/>
      </div>
      <div>
        <input type="checkbox" placeHolder="Email"/>
      </div>
      <div>
        <input type="checkbox" placeHolder="Phone Number"/>
      </div>
      <div>
        <input placeHolder="Supervisor"/>
      </div>
      <button>Submit</button>
    </div>
  );
}

export default App;
