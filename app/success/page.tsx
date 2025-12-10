export default function Success() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-12 rounded-2xl shadow-xl text-center max-w-md">
        <h1 className="text-4xl font-bold text-mint-600 mb-6">Welcome to Pro! 🎉</h1>
        <p className="text-xl mb-8">Your account is now upgraded. Enjoy unlimited conversions!</p>
        <a href="/" className="bg-mint-500 hover:bg-mint-600 text-white font-bold py-4 px-8 rounded-lg">
          Back to DocNeat
        </a>
      </div>
    </div>
  );
}
