import React from 'react';

import './App.css';

function App() {
  return (
    <div className="App">
      <div className="from-wrapper">
        <h1>Create Account</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className= "firstName">
              <label htmlFor="firstName">First Name</label>
              <input type= "text" className="" placeholder="First Name" type="text" name ="firstName" noValidate
              onChange = {this.handleChange}/>
            </div>
          </form>
      </div>
    </div>
  );
}

export default App;
