export default function StatCard({ title, value, icon }) {
    return (
      <div className="bg-white p-4 rounded shadow flex items-center gap-4">
        <div className="text-3xl">{icon}</div>
        <div>
          <h3 className="text-gray-500 text-sm">{title}</h3>
          <p className="text-xl font-bold text-gray-800">{value}</p>
        </div>
      </div>
    );
  }
  