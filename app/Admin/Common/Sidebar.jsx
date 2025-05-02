'use client'

import Link from "next/link";
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'


export default function Sidebar() {
  const router = useRouter();
  const handleBack = () => {
    Cookies.remove('admMKey');
    router.push('/Admin/Auth');
  };
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white fixed top-0 left-0 flex flex-col">
      <div className="text-2xl font-bold p-6 border-b border-gray-800">
        Admin
      </div>
      <nav className="flex-1 p-4 space-y-3">
        <Link href="/Admin/Dashboard" className="block px-4 py-2 rounded hover:bg-gray-700">🏠 Dashboard</Link>
        <Link href="/Admin/Projects" className="block px-4 py-2 rounded hover:bg-gray-700">💼 Projects</Link>
        <a href="/Admin/skill" className="block px-4 py-2 rounded hover:bg-gray-700">🛠 Skills</a>
        <a href="#contact" className="block px-4 py-2 rounded hover:bg-gray-700">📬 Contact</a>
        <a onClick={handleBack} className="cursor-pointer block px-4 py-2 rounded hover:bg-gray-700">🚪 Logout</a>
      </nav>
    </aside>
  );
}
