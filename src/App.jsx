import { useState } from 'react';
import './App.css';
import ShowsTable from './components/ShowsTable';
import PlatformTable from './components/PlatformTable';

const App = () => {
  const [activeTab, setActiveTab] = useState("shows");
  return (
    <div className="App">
      <div className='container'>
        <div className='navigation'>
          <h3 className={activeTab === 'shows' ? 'active' : ''} onClick={() => setActiveTab("shows")}>Shows</h3>
          <h3 className={activeTab === 'platforms' ? 'active' : ''} onClick={() => setActiveTab("platforms")}>Platforms</h3>
        </div>
        {activeTab === 'shows' ? (
          <ShowsTable />
        ) : activeTab === 'platforms' ? (
          <PlatformTable />
        ) : null}
      </div>
    </div>
  );
}

export default App;
