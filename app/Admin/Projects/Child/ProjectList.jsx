export default function ProjectList({ projects, onEdit, onDelete }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col justify-between"
        >
          <div>
            {project?.imgurl && (
              <img
                src={project.imgurl}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-semibold text-gray-800">{project.title}</h3>

              <div className="flex flex-col gap-1">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm hover:underline break-all"
                  >
                    🌐 {project.url}
                  </a>
                )}
                {project.giturl && (
                  <a
                    href={project.giturl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm hover:underline break-all"
                  >
                    💻 {project.giturl}
                  </a>
                )}
              </div>

              {project.technologies && (
                <p className="text-sm text-gray-700">
                  <strong>Tech:</strong> {project.technologies}
                </p>
              )}

              {project.description && (
                <p className="text-sm text-gray-600">{project.description}</p>
              )}
                <p className="text-sm text-gray-600">{project.isComplete === 1 ? 'Complete' : 'Not Complete'}</p>
            </div>
          </div>

          <div className="flex justify-end gap-2 p-4 border-t">
            <button
              onClick={() => onEdit(project?.id)}
              className="bg-yellow-400 hover:bg-yellow-500 text-sm px-4 py-1 rounded font-medium"
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => onDelete(project?.id)}
              className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1 rounded font-medium"
            >
              🗑 Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
