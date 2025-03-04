import React from 'react';
import { Activity, Server, Database, Cpu, MemoryStick as Memory, Clock, AlertTriangle } from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SystemHealth = () => {
  // CPU Usage Chart
  const cpuData = {
    labels: ['12:00', '12:05', '12:10', '12:15', '12:20', '12:25', '12:30', '12:35', '12:40', '12:45', '12:50', '12:55'],
    datasets: [
      {
        label: 'CPU Usage (%)',
        data: [45, 59, 80, 81, 56, 55, 40, 35, 30, 45, 60, 70],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  // Memory Usage Chart
  const memoryData = {
    labels: ['12:00', '12:05', '12:10', '12:15', '12:20', '12:25', '12:30', '12:35', '12:40', '12:45', '12:50', '12:55'],
    datasets: [
      {
        label: 'Memory Usage (GB)',
        data: [6.2, 6.5, 7.1, 7.8, 8.2, 8.0, 7.5, 7.2, 6.8, 7.0, 7.3, 7.5],
        fill: false,
        borderColor: 'rgb(153, 102, 255)',
        tension: 0.1
      }
    ]
  };

  // Response Time Chart
  const responseTimeData = {
    labels: ['12:00', '12:05', '12:10', '12:15', '12:20', '12:25', '12:30', '12:35', '12:40', '12:45', '12:50', '12:55'],
    datasets: [
      {
        label: 'API Response Time (ms)',
        data: [120, 135, 190, 210, 250, 230, 180, 160, 140, 150, 170, 190],
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      }
    ]
  };

  // Error Rate Chart
  const errorRateData = {
    labels: ['12:00', '12:05', '12:10', '12:15', '12:20', '12:25', '12:30', '12:35', '12:40', '12:45', '12:50', '12:55'],
    datasets: [
      {
        label: 'Error Rate (%)',
        data: [0.5, 0.8, 1.2, 2.5, 3.8, 2.2, 1.5, 1.0, 0.7, 0.5, 0.3, 0.2],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  // Service Health Status
  const services = [
    { name: 'Authentication Service', status: 'Healthy', uptime: '99.98%', responseTime: '120ms' },
    { name: 'Order Processing', status: 'Degraded', uptime: '98.5%', responseTime: '350ms' },
    { name: 'Payment Gateway', status: 'Healthy', uptime: '99.95%', responseTime: '180ms' },
    { name: 'Customer Portal', status: 'Healthy', uptime: '99.9%', responseTime: '210ms' },
    { name: 'Inventory Management', status: 'Unhealthy', uptime: '95.2%', responseTime: '580ms' },
    { name: 'Notification Service', status: 'Healthy', uptime: '99.99%', responseTime: '90ms' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Healthy':
        return <div className="p-1 rounded-full bg-green-100 text-green-500"><Activity className="h-5 w-5" /></div>;
      case 'Degraded':
        return <div className="p-1 rounded-full bg-yellow-100 text-yellow-500"><AlertTriangle className="h-5 w-5" /></div>;
      case 'Unhealthy':
        return <div className="p-1 rounded-full bg-red-100 text-red-500"><AlertTriangle className="h-5 w-5" /></div>;
      default:
        return <div className="p-1 rounded-full bg-gray-100 text-gray-500"><Activity className="h-5 w-5" /></div>;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Healthy':
        return 'bg-green-100 text-green-800';
      case 'Degraded':
        return 'bg-yellow-100 text-yellow-800';
      case 'Unhealthy':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Activity className="h-6 w-6 text-blue-500" />
        <h2 className="text-2xl font-bold text-gray-800">System Health</h2>
      </div>
      
      {/* System Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-500">
              <Cpu className="h-8 w-8" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">CPU Usage</p>
              <p className="text-2xl font-semibold text-gray-900">70%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-500">
              <Memory className="h-8 w-8" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Memory Usage</p>
              <p className="text-2xl font-semibold text-gray-900">7.5 GB / 16 GB</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-500">
              <Clock className="h-8 w-8" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Avg. Response Time</p>
              <p className="text-2xl font-semibold text-gray-900">190 ms</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 text-red-500">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Error Rate</p>
              <p className="text-2xl font-semibold text-gray-900">0.2%</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">CPU Usage</h3>
          <Line data={cpuData} options={chartOptions} />
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Memory Usage</h3>
          <Line data={memoryData} options={chartOptions} />
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">API Response Time</h3>
          <Line data={responseTimeData} options={chartOptions} />
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Error Rate</h3>
          <Bar data={errorRateData} options={chartOptions} />
        </div>
      </div>
      
      {/* Service Health */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Service Health</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uptime</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {services.map((service, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(service.status)}
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{service.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(service.status)}`}>
                      {service.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {service.uptime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {service.responseTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="#" className="text-blue-600 hover:text-blue-900 mr-3">Details</a>
                    <a href="#" className="text-blue-600 hover:text-blue-900">Restart</a>
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

export default SystemHealth;