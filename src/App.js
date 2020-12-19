import logo from './logo.svg';
import './App.css';
import GlobalNav from './components/GlobalNav';
import SearchArea from './components/SearchArea';
import {useState} from 'react'

function App() {
  let payload = {}
 
  return (
    <div className="App">
      <GlobalNav></GlobalNav>
      <SearchArea load = {payload}></SearchArea>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
