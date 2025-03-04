import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  AlertTriangle, 
  PlusCircle, 
  Activity, 
  Database, 
  Box
} from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <div className="flex items-center space-x-2 px-4 mb-6">
        <AlertTriangle className="h-8 w-8 text-yellow-400" />
        <span className="text-2xl font-bold">IncidentHub</span>
      </div>
      
      <nav>
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 ${
              isActive ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
            }`
          }
        >
          <Home className="h-5 w-5" />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink 
          to="/incidents" 
          className={({ isActive }) => 
            `flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 ${
              isActive ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
            }`
          }
        >
          <AlertTriangle className="h-5 w-5" />
          <span>Incidents</span>
        </NavLink>
        
        <NavLink 
          to="/create-incident" 
          className={({ isActive }) => 
            `flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 ${
              isActive ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
            }`
          }
        >
          <PlusCircle className="h-5 w-5" />
          <span>Create Incident</span>
        </NavLink>
        
        <NavLink 
          to="/system-health" 
          className={({ isActive }) => 
            `flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 ${
              isActive ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
            }`
          }
        >
          <Activity className="h-5 w-5" />
          <span>System Health</span>
        </NavLink>
        
        <NavLink 
          to="/database-console" 
          className={({ isActive }) => 
            `flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 ${
              isActive ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
            }`
          }
        >
          <Database className="h-5 w-5" />
          <span>Database Console</span>
        </NavLink>
        
        <NavLink 
          to="/container-status" 
          className={({ isActive }) => 
            `flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 ${
              isActive ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
            }`
          }
        >
          <Box className="h-5 w-5" />
          <span>Container Status</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;