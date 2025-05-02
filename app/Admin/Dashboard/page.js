import ChatBox from "../AdminChatBox";
import Header from "../Common/Header";
import Sidebar from "../Common/Sidebar";
import StatCard from "../Common/StatCard";

export default function Home() {
  return (
    <>
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />

      <div className="ml-64 flex-1">
        <Header />

        <main className="p-6 space-y-6">
          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Projects" value="12+" icon="💼" />
            <StatCard title="Tech Stack" value="10+" icon="🛠" />
            <StatCard title="Experience" value="1 Year" icon="⏳" />
            <StatCard title="Clients" value="3+" icon="🌍" />
          </div>

          {/* Placeholder sections */}
          <section id="projects" className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-bold mb-2">🚀 Projects</h2>
            <p className="text-gray-600">Showcase of your React / Next.js projects here...</p>
          </section>

          <section id="skills" className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-bold mb-2">🛠 Skills</h2>
            <p className="text-gray-600">JavaScript, React, Node, Tailwind, etc.</p>
          </section>

          <section id="contact" className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-bold mb-2">📬 Contact</h2>
            <p className="text-gray-600">Add a contact form or email here...</p>
          </section>
        </main>
      </div>
    </div>
    <ChatBox/>
    </>
  );
}
