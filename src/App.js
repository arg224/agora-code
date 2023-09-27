import React, { useState } from 'react';
import './App.css';
import CustomTable from './Table';
import SearchInput from './searchInput';

function App() {
  const [searchText, setSearchText] = useState('');
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>Ant Design Table Example</h1>
          <SearchInput
            searchText={searchText}
            setSearchText={setSearchText}
          />
          <CustomTable
            searchText={searchText} />
        </div>
      </header>
    </div>
  );
}

export default App;
