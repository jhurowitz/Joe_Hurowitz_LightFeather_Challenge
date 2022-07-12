import './App.css';

function App() {
  // const supervisors = [
  //   { supervisor: "Smith, John" },
  //   { supervisor: "Doe, John" },
  //   { supervisor: "Jane, John" }
  // ]

  // const supervisors = []
  // fetch('http://localhost:8080/api/supervisors')
  // .then((response) => response.json())
  // .then((supervisor) => {
  //   supervisors.push(supervisor)
  // })

  fetch('http://localhost:8080/api/supervisors')
    .then((response) => response.json())
    .then((supervisor) => {
      console.log('Fetched: ' + supervisor)  
      return (
        <div></div>
      )
    })

  return (
    <div className="App">
      <form>
        <label>First Name</label>
        <input placeholder='First Name'/>
        <br/>
        <label>Last Name</label>
        <input placeholder='Last Name'/>
        <br/>
        <label>Email</label>
        <input placeholder='Email'/>
        <br/>
        <label>Phone Number</label>
        <input placeholder='Phone Number'/>
        <br/>
        <label>Supervisors</label>
        <select>
          {/* {
            supervisors.map((option) => {
              <option value={option.supervisor}></option>
            })
          } */}
        </select>
        <br/>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
