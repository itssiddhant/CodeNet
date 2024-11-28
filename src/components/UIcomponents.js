const Card = ({ children, className = "" }) => (
    <div className={`bg-white rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  );
  
  const CardContent = ({ children, className = "" }) => (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
  
  const Alert = ({ children, className = "" }) => (
    <div className={`bg-blue-50 border-l-4 border-blue-500 p-4 rounded ${className}`}>
      {children}
    </div>
  );
  
  const AlertDescription = ({ children }) => (
    <p className="text-blue-700">
      {children}
    </p>
  );