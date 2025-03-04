import React from 'react';
import { useParams } from 'react-router-dom';
import { Clock, User, AlertTriangle, MessageSquare, Activity, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

const IncidentDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // Mock incident data - in a real app, this would be fetched from an API
  const incident = {
    id: id || 'INC-1001',
    title: 'Database connection timeout',
    description: 'Production database connections are timing out intermittently, causing service disruptions for users. The issue appears to be related to connection pool exhaustion.',
    status: 'In Progress',
    priority: 'High',
    assignee: 'Jane Smith',
    created: '2023-11-10T14:30:00',
    updated: '2023-11-10T16:45:00',
    affectedServices: ['Order Processing', 'Customer Portal'],
    logs: [
      {
        timestamp: '2023-11-10T14:35:00',
        message: 'ERROR: Connection to database timed out after 30 seconds',
        level: 'ERROR',
        source: 'OrderService'
      },
      {
        timestamp: '2023-11-10T14:36:12',
        message: 'Retrying database connection (attempt 1)',
        level: 'INFO',
        source: 'OrderService'
      },
      {
        timestamp: '2023-11-10T14:36:42',
        message: 'ERROR: Connection to database timed out after 30 seconds',
        level: 'ERROR',
        source: 'OrderService'
      }
    ],
    timeline: [
      {
        timestamp: '2023-11-10T14:30:00',
        action: 'Incident created',
        user: 'System Monitor'
      },
      {
        timestamp: '2023-11-10T14:45:00',
        action: 'Assigned to Jane Smith',
        user: 'John Doe'
      },
      {
        timestamp: '2023-11-10T15:15:00',
        action: 'Status changed from Open to In Progress',
        user: 'Jane Smith'
      },
      {
        timestamp: '2023-11-10T16:30:00',
        action: 'Added comment: Investigating connection pool settings',
        user: 'Jane Smith'
      }
    ],
    comments: [
      {
        id: 1,
        user: 'Jane Smith',
        timestamp: '2023-11-10T16:30:00',
        content: 'Investigating connection pool settings. Current max connections is set to 100, which might be insufficient for peak load.'
      },
      {
        id: 2,
        user: 'John Doe',
        timestamp: '2023-11-10T16:40:00',
        content: 'I noticed similar issues last week. Check if there are any long-running transactions that might be holding connections.'
      }
    ]
  };

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

  const getLogLevelClass = (level: string) => {
    switch (level) {
      case 'ERROR':
        return 'text-red-600';
      case 'WARN':
        return 'text-yellow-600';
      case 'INFO':
        return 'text-blue-600';
      case 'DEBUG':
        return 'text-gray-600';
      default:
        return 'text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{incident.id}: {incident.title}</h2>
          <div className="mt-1 flex items-center space-x-4">
            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(incident.status)}`}>
              {incident.status}
            </span>
            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityClass(incident.priority)}`}>
              {incident.priority}
            </span>
            <span className="text-sm text-gray-500 flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {format(new Date(incident.created), 'MMM d, yyyy h:mm a')}
            </span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Update Status
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Assign
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content - 2/3 width on large screens */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Description</h3>
            <p className="text-gray-700">{incident.description}</p>
            
            <h4 className="text-md font-medium text-gray-900 mt-4 mb-2">Affected Services</h4>
            <div className="flex flex-wrap gap-2">
              {incident.affectedServices.map((service, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                  {service}
                </span>
              ))}
            </div>
          </div>
          
          {/* Logs */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Logs</h3>
            <div className="bg-gray-50 p-4 rounded-md font-mono text-sm overflow-x-auto">
              {incident.logs.map((log, index) => (
                <div key={index} className="mb-2">
                  <span className="text-gray-500">[{format(new Date(log.timestamp), 'HH:mm:ss')}]</span>{' '}
                  <span className="text-gray-700">[{log.source}]</span>{' '}
                  <span className={getLogLevelClass(log.level)}>{log.level}:</span>{' '}
                  <span>{log.message}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Comments */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Comments</h3>
            
            <div className="space-y-4 mb-6">
              {incident.comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium text-gray-900">{comment.user}</div>
                    <div className="text-sm text-gray-500">
                      {format(new Date(comment.timestamp), 'MMM d, yyyy h:mm a')}
                    </div>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              ))}
            </div>
            
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                Add a comment
              </label>
              <textarea
                id="comment"
                rows={3}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Type your comment here..."
              ></textarea>
              <div className="mt-2 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Post Comment
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sidebar - 1/3 width on large screens */}
        <div className="space-y-6">
          {/* Details */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Details</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Assignee</span>
                <span className="text-sm font-medium text-gray-900 flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {incident.assignee}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Created</span>
                <span className="text-sm text-gray-900">
                  {format(new Date(incident.created), 'MMM d, yyyy h:mm a')}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Last Updated</span>
                <span className="text-sm text-gray-900">
                  {format(new Date(incident.updated), 'MMM d, yyyy h:mm a')}
                </span>
              </div>
            </div>
          </div>
          
          {/* Timeline */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Timeline</h3>
            
            <div className="relative">
              <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-gray-200"></div>
              
              <div className="space-y-6">
                {incident.timeline.map((event, index) => (
                  <div key={index} className="relative pl-10">
                    <div className="absolute left-0 top-1 rounded-full bg-blue-500 p-1">
                      <Activity className="h-4 w-4 text-white" />
                    </div>
                    
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">{event.action}</div>
                      <div className="mt-1 flex justify-between text-gray-500">
                        <span>{event.user}</span>
                        <span>{format(new Date(event.timestamp), 'h:mm a')}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Related Incidents */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Related Incidents</h3>
            
            <div className="space-y-3">
              <div className="p-3 border border-gray-200 rounded-md hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                    <span className="text-sm font-medium text-gray-900">INC-998</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
                <p className="mt-1 text-sm text-gray-500">Previous database timeout issue (3 days ago)</p>
              </div>
              
              <div className="p-3 border border-gray-200 rounded-md hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                    <span className="text-sm font-medium text-gray-900">INC-982</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
                <p className="mt-1 text-sm text-gray-500">Connection pool configuration issue (1 week ago)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetail;