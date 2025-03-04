import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import IncidentList from './components/IncidentList';
import IncidentDetail from './components/IncidentDetail';
import CreateIncident from './components/CreateIncident';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SystemHealth from './components/SystemHealth';
import DatabaseConsole from './components/DatabaseConsole';
import ContainerStatus from './components/ContainerStatus';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/incidents" element={<IncidentList />} />
              <Route path="/incidents/:id" element={<IncidentDetail />} />
              <Route path="/create-incident" element={<CreateIncident />} />
              <Route path="/system-health" element={<SystemHealth />} />
              <Route path="/database-console" element={<DatabaseConsole />} />
              <Route path="/container-status" element={<ContainerStatus />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;