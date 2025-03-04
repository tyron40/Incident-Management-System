import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Filter, ChevronDown } from 'lucide-react';

const IncidentList = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  
  const incidents = [
    {
      id: 'INC-1001',
      title: 'Database connection timeout',
      description: 'Production database connections are timing out intermittently',
      status: 'In Progress',
      priority: 'High',
      assignee: 'Jane Smith',
      created: '2023-11-10T14:30:00',
      updated: '2023-11-10T16:45:00'
    },
    {
      id: 'INC-1002',
      title: 'Memory leak in production',
      description: 'Memory usage is gradually increasing in the order processing service',
      status: 'Open',
      priority: 'Critical',
      assignee: 'John Doe',
      created: '2023-11-10T10:15:00',
      updated: '2023-11-10T10:15:00'
    },
    {
      id: 'INC-1003',
      title: 'API response latency',
      description: 'Customer-facing API endpoints are experiencing increased latency',
      status: 'Resolved',
      priority: 'Medium',
      assignee: 'Alice Johnson',
      created: '2023-11-09T09:20:00',
      updated: '2023-11-09T14:10:00'
    },
    {
      id: 'INC-1004',
      title: 'Authentication service failure',
      description: 'Users unable to log in due to authentication service errors',
      status: 'Open',
      priority: 'Critical',
      assignee: 'Unassigned',
      created: '2023-11-10T08:45:00',
      updated: '2023-11-10T08:45:00'
    },
    {
      id: 'INC-1005',
      title: 'Scheduled job failure',
      description: 'Nightly data processing job failed to complete',
      status: 'In Progress',
      priority: 'Medium',
      assignee: 'Bob Williams',
      created: '2023-11-09T06:30:00',
      updated: '2023-11-09T10:15:00'
    }
  ];

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-red-100 text-red-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'bg-red-100 text-red-800';
      case 'High':
        return 'bg-orange-100 text-orange-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Incident List</h2>
        <Link 
          to="/create-incident" 
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create Incident
        </Link>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center">
          <button 
            className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <Filter className="h-5 w-5" />
            <span>Filters</span>
            <ChevronDown className={`h-4 w-4 transform ${filterOpen ? 'rotate-180' : ''}`} />
          </button>
          
          <div className="text-sm text-gray-500">
            Showing {incidents.length} incidents
          </div>
        </div>
        
        {filterOpen && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
              <select
                id="status"
                name="status"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">All</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
              <select
                id="priority"
                name="priority"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">All</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="assignee" className="block text-sm font-medium text-gray-700">Assignee</label>
              <select
                id="assignee"
                name="assignee"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">All</option>
                <option value="unassigned">Unassigned</option>
                <option value="me">Assigned to me</option>
              </select>
            </div>
          </div>
        )}
      </div>
      
      {/* Incident Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {incidents.map((incident) => (
              <tr key={incident.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                  <Link to={`/incidents/${incident.id}`}>{incident.id}</Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <Link to={`/incidents/${incident.id}`} className="hover:underline">
                    {incident.title}
                  </Link>
                  <p className="text-xs text-gray-500 truncate max-w-xs">{incident.description}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(incident.status)}`}>
                    {incident.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityClass(incident.priority)}`}>
                    {incident.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {incident.assignee}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(incident.created).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IncidentList;