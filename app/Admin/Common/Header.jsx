export default function Header() {
    return (
      <header className="w-full bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Mubark</span>
          <img src="/Images/mlight.png" alt="avatar" className="w-8 h-8 rounded-full" />
        </div>
      </header>
    );
  }
  