import React, { useState } from 'react';
import { Box, RefreshCw, Play, Square, RotateCw, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const ContainerStatus = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Mock container data
  const containers = [
    { 
      id: 'order-service-7f8d9e', 
      name: 'order-service', 
      image: 'company/order-service:1.5.2', 
      status: 'Running', 
      uptime: '5d 12h 30m', 
      cpu: '2.5%', 
      memory: '256MB / 512MB',
      restarts: 0,
      node: 'worker-node-1'
    },
    { 
      id: 'auth-service-3e4f5g', 
      name: 'auth-service', 
      image: 'company/auth-service:2.1.0', 
      status: 'Running', 
      uptime: '5d 12h 30m', 
      cpu: '1.8%', 
      memory: '192MB / 384MB',
      restarts: 0,
      node: 'worker-node-2'
    },
    { 
      id: 'payment-service-1a2b3c', 
      name: 'payment-service', 
      image: 'company/payment-service:1.2.1', 
      status: 'Running', 
      uptime: '3d 8h 15m', 
      cpu: '3.2%', 
      memory: '320MB / 512MB',
      restarts: 1,
      node: 'worker-node-1'
    },
    { 
      id: 'notification-service-9h8g7f', 
      name: 'notification-service', 
      image: 'company/notification-service:1.0.5', 
      status: 'Running', 
      uptime: '5d 12h 30m', 
      cpu: '0.9%', 
      memory: '128MB / 256MB',
      restarts: 0,
      node: 'worker-node-3'
    },
    { 
      id: 'inventory-service-5d6e7f', 
      name: 'inventory-service', 
      image: 'company/inventory-service:1.3.4', 
      status: 'Degraded', 
      uptime: '1d 4h 10m', 
      cpu: '75.2%', 
      memory: '480MB / 512MB',
      restarts: 3,
      node: 'worker-node-2'
    },
    { 
      id: 'reporting-service-2c3d4e', 
      name: 'reporting-service', 
      image: 'company/reporting-service:1.1.0', 
      status: 'Stopped', 
      uptime: '0m', 
      cpu: '0%', 
      memory: '0MB / 384MB',
      restarts: 5,
      node: 'worker-node-3'
    }
  ];

  // Mock pod events
  const events = [
    { 
      time: '2023-11-10T16:45:00', 
      type: 'Warning', 
      reason: 'FailedMount', 
      object: 'Pod/inventory-service-5d6e7f', 
      message: 'Unable to mount volumes: timed out waiting for the condition' 
    },
    { 
      time: '2023-11-10T16:30:00', 
      type: 'Normal', 
      reason: 'Pulled', 
      object: 'Pod/auth-service-3e4f5g', 
      message: 'Container image pulled successfully' 
    },
    { 
      time: '2023-11-10T16:15:00', 
      type: 'Warning', 
      reason: 'Unhealthy', 
      object: 'Pod/reporting-service-2c3d4e', 
      message: 'Liveness probe failed: HTTP probe failed with statuscode: 500' 
    },
    { 
      time: '2023-11-10T15:50:00', 
      type: 'Normal', 
      reason: 'Created', 
      object: 'Pod/notification-service-9h8g7f', 
      message: 'Created container notification-service' 
    },
    { 
      time: '2023-11-10T15:45:00', 
      type: 'Normal', 
      reason: 'Started', 
      object: 'Pod/notification-service-9h8g7f', 
      message: 'Started container notification-service' 
    }
  ];

  const refreshData = () => {
    setIsRefreshing(true);
    // Simulate API call delay
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Running':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'Degraded':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'Stopped':
        return <Square className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Running':
        return 'bg-green-100 text-green-800';
      case 'Degraded':
        return 'bg-yellow-100 text-yellow-800';
      case 'Stopped':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventTypeClass = (type: string) => {
    switch (type) {
      case 'Warning':
        return 'text-yellow-600';
      case 'Error':
        return 'text-red-600';
      case 'Normal':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Box className="h-6 w-6 text-blue-500" />
          <h2 className="text-2xl font-bold text-gray-800">Container Status</h2>
        </div>
        
        <button
          onClick={refreshData}
          disabled={isRefreshing}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>
      
      {/* Container Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-500">
              <CheckCircle className="h-8 w-8" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Running Containers</p>
              <p className="text-2xl font-semibold text-gray-900">4</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-500">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Degraded Containers</p>
              <p className="text-2xl font-semibold text-gray-900">1</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 text-red-500">
              <Square className="h-8 w-8" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Stopped Containers</p>
              <p className="text-2xl font-semibold text-gray-900">1</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Container List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900">Containers</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uptime</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPU / Memory</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restarts</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Node</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {containers.map((container) => (
                <tr key={container.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        {getStatusIcon(container.status)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{container.name}</div>
                        <div className="text-sm text-gray-500">{container.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(container.status)}`}>
                      {container.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {container.image}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {container.uptime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {container.cpu} / {container.memory}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {container.restarts}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {container.node}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {container.status !== 'Running' && (
                        <button className="text-blue-600 hover:text-blue-900" title="Start">
                          <Play className="h-4 w-4" />
                        </button>
                      )}
                      {container.status === 'Running' && (
                        <button className="text-red-600 hover:text-red-900" title="Stop">
                          <Square className="h-4 w-4" />
                        </button>
                      )}
                      <button className="text-green-600 hover:text-green-900" title="Restart">
                        <RotateCw className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Events */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900">Recent Events</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Object</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {events.map((event, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(event.time).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`font-medium ${getEventTypeClass(event.type)}`}>
                      {event.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {event.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {event.object}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {event.message}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContainerStatus;