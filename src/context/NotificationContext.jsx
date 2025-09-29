import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState({
    reports: {
      count: 0,
      hasNew: false,
      lastChecked: null
    }
  });

  // Simulate checking for new reports (replace with actual API call)
  const checkForNewReports = useCallback(async () => {
    try {
      // This would be an API call in real implementation
      const mockReports = [
        { id: 1, title: 'Power Outlet Not Working', status: 'open', createdAt: new Date() },
        { id: 2, title: 'Leaky Faucet', status: 'in-progress', createdAt: new Date() }
      ];
      
      const openReports = mockReports.filter(report => report.status === 'open');
      const newReportsCount = openReports.length;
      
      setNotifications(prev => ({
        ...prev,
        reports: {
          count: newReportsCount,
          hasNew: newReportsCount > (prev.reports.count || 0),
          lastChecked: new Date()
        }
      }));
    } catch (error) {
      console.error('Error checking for new reports:', error);
    }
  }, []);

  // Mark reports as viewed
  const markReportsAsViewed = useCallback(() => {
    setNotifications(prev => ({
      ...prev,
      reports: {
        ...prev.reports,
        hasNew: false,
        lastChecked: new Date()
      }
    }));
  }, []);

  // Simulate periodic checking (in real app, use WebSocket or polling)
  useEffect(() => {
    checkForNewReports();
    const interval = setInterval(checkForNewReports, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [checkForNewReports]);

  return (
    <NotificationContext.Provider value={{
      notifications,
      checkForNewReports,
      markReportsAsViewed
    }}>
      {children}
    </NotificationContext.Provider>
  );
};
export default NotificationProvider;