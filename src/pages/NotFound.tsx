const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-4">Not found</p>
        <a href="/" className="text-blue-500 underline">กลับหน้าหลัก</a>
      </div>
    </div>
  );
};

export default NotFound;
