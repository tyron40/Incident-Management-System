import React, { useState } from 'react';
import { Database, Play, Save, RefreshCw, AlertTriangle } from 'lucide-react';

const DatabaseConsole = () => {
  const [query, setQuery] = useState('SELECT * FROM incidents LIMIT 10;');
  const [queryResults, setQueryResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Mock database tables
  const tables = [
    { name: 'incidents', rows: 1245, size: '2.3 MB', lastUpdated: '2023-11-10 14:30:00' },
    { name: 'users', rows: 587, size: '1.1 MB', lastUpdated: '2023-11-09 09:15:00' },
    { name: 'services', rows: 42, size: '0.3 MB', lastUpdated: '2023-11-08 16:45:00' },
    { name: 'comments', rows: 3156, size: '4.2 MB', lastUpdated: '2023-11-10 15:20:00' },
    { name: 'logs', rows: 25789, size: '18.5 MB', lastUpdated: '2023-11-10 16:00:00' },
    { name: 'metrics', rows: 45678, size: '32.1 MB', lastUpdated: '2023-11-10 16:05:00' }
  ];
  
  // Mock saved queries
  const savedQueries = [
    { name: 'Recent Incidents', query: 'SELECT * FROM incidents ORDER BY created_at DESC LIMIT 20;' },
    { name: 'Critical Issues', query: 'SELECT * FROM incidents WHERE priority = \'Critical\' AND status != \'Resolved\';' },
    { name: 'Slow API Endpoints', query: 'SELECT endpoint, AVG(response_time) as avg_time FROM metrics GROUP BY endpoint ORDER BY avg_time DESC LIMIT 10;' },
    { name: 'Error Count by Service', query: 'SELECT service_name, COUNT(*) as error_count FROM logs WHERE level = \'ERROR\' GROUP BY service_name ORDER BY error_count DESC;' }
  ];

  // Mock query execution
  const executeQuery = () => {
    setIsLoading(true);
    setError(null);
    
    // Simulate API call delay
    setTimeout(() => {
      try {
        // Mock different query results based on the query content
        if (query.toLowerCase().includes('select * from incidents')) {
          setQueryResults([
            { id: 'INC-1001', title: 'Database connection timeout', status: 'In Progress', priority: 'High', created_at: '2023-11-10 14:30:00' },
            { id: 'INC-1002', title: 'Memory leak in production', status: 'Open', priority: 'Critical', created_at: '2023-11-10 10:15:00' },
            { id: 'INC-1003', title: 'API response latency', status: 'Resolved', priority: 'Medium', created_at: '2023-11-09 09:20:00' },
            { id: 'INC-1004', title: 'Authentication service failure', status: 'Open', priority: 'Critical', created_at: '2023-11-10 08:45:00' },
            { id: 'INC-1005', title: 'Scheduled job failure', status: 'In Progress', priority: 'Medium', created_at: '2023-11-09 06:30:00' }
          ]);
        } else if (query.toLowerCase().includes('select * from users')) {
          setQueryResults([
            { id: 1, username: 'jsmith', email: 'jsmith@example.com', role: 'Admin', last_login: '2023-11-10 15:45:00' },
            { id: 2, username: 'jdoe', email: 'jdoe@example.com', role: 'Support', last_login: '2023-11-10 14:30:00' },
            { id: 3, username: 'ajohnson', email: 'ajohnson@example.com', role: 'Developer', last_login: '2023-11-10 13:15:00' }
          ]);
        } else if (query.toLowerCase().includes('error')) {
          setQueryResults([
            { service_name: 'OrderService', error_count: 156 },
            { service_name: 'AuthService', error_count: 89 },
            { service_name: 'PaymentService', error_count: 45 },
            { service_name: 'NotificationService', error_count: 23 }
          ]);
        } else if (query.toLowerCase().includes('avg')) {
          setQueryResults([
            { endpoint: '/api/orders', avg_time: 320 },
            { endpoint: '/api/products/search', avg_time: 280 },
            { endpoint: '/api/users/authenticate', avg_time: 150 },
            { endpoint: '/api/payments/process', avg_time: 420 }
          ]);
        } else if (query.toLowerCase().includes('update') || query.toLowerCase().includes('delete') || query.toLowerCase().includes('insert')) {
          // Simulate error for write operations
          throw new Error('Write operations are not permitted in the console. Please use the appropriate API endpoints.');
        } else {
          // Default empty result
          setQueryResults([]);
        }
      } catch (err: any) {
        setError(err.message);
        setQueryResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 800);
  };

  const loadSavedQuery = (queryText: string) => {
    setQuery(queryText);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Database className="h-6 w-6 text-blue-500" />
        <h2 className="text-2xl font-bold text-gray-800">Database Console</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Tables and Saved Queries */}
        <div className="lg:col-span-1 space-y-6">
          {/* Database Tables */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Tables</h3>
            <div className="space-y-2">
              {tables.map((table, index) => (
                <div key={index} className="p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">{table.name}</span>
                    <span className="text-xs text-gray-500">{table.rows} rows</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">{table.size}</span>
                    <span className="text-xs text-gray-500">Updated: {table.lastUpdated}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Saved Queries */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Saved Queries</h3>
            <div className="space-y-2">
              {savedQueries.map((savedQuery, index) => (
                <div 
                  key={index} 
                  className="p-2 hover:bg-gray-50 rounded cursor-pointer"
                  onClick={() => loadSavedQuery(savedQuery.query)}
                >
                  <div className="font-medium text-gray-700">{savedQuery.name}</div>
                  <div className="text-xs text-gray-500 truncate">{savedQuery.query}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Main Content - Query Editor and Results */}
        <div className="lg:col-span-3 space-y-6">
          {/* Query Editor */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium text-gray-900">SQL Query</h3>
              <div className="flex space-x-2">
                <button 
                  className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  title="Save Query"
                >
                  <Save className="h-5 w-5" />
                </button>
                <button 
                  className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  title="Clear Query"
                  onClick={() => setQuery('')}
                >
                  <RefreshCw className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="mb-3">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-40 p-3 border border-gray-300 rounded-md font-mono text-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter SQL query here..."
              ></textarea>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={executeQuery}
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="animate-spin h-4 w-4 mr-2" />
                    Executing...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Execute Query
                  </>
                )}
              </button>
            </div>
          </div>
          
          {/* Query Results */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Results</h3>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                  <span className="text-red-700">{error}</span>
                </div>
              </div>
            )}
            
            {queryResults.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {Object.keys(queryResults[0]).map((key, index) => (
                        <th 
                          key={index} 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {queryResults.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {Object.values(row).map((value: any, valueIndex) => (
                          <td key={valueIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                {isLoading ? 'Executing query...' : 'No results to display. Execute a query to see results.'}
              </div>
            )}
            
            {queryResults.length > 0 && (
              <div className="mt-4 text-sm text-gray-500">
                {queryResults.length} rows returned
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseConsole;