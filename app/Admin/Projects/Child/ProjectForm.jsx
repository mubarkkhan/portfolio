'use client';

export default function ProjectForm({ onSubmit, formData, setFormData, isEditing }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const hasEmptyField = Object.values(formData).some((v) => v === '' || v === null);
    if (hasEmptyField) return alert("Please fill all fields.");
    onSubmit(formData);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, imgurl: file });
    }
  };

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4">
      <h2 className="text-lg font-bold">
        {isEditing ? "✏️ Edit Project" : "➕ Add Project"}
      </h2>

      <div>
        <label className="block font-medium">Project Title</label>
        <input
          type="text"
          placeholder="Enter title"
          className="w-full p-2 border rounded"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-medium">Project Image</label>
        <input
          type="file"
          accept="image/*"
          className="w-full p-2 border rounded"
          onChange={handleImage}
          required={!isEditing}
        />
      </div>

      <div>
        <label className="block font-medium">GitHub URL</label>
        <input
          type="text"
          placeholder="e.g. https://github.com/..."
          className="w-full p-2 border rounded"
          value={formData.giturl}
          onChange={(e) => handleChange("giturl", e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-medium">Live Project URL</label>
        <input
          type="text"
          placeholder="e.g. https://yourproject.com"
          className="w-full p-2 border rounded"
          value={formData.url}
          onChange={(e) => handleChange("url", e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-medium">Technologies Used</label>
        <input
          type="text"
          placeholder="e.g. React, Node.js"
          className="w-full p-2 border rounded"
          value={formData.technologies}
          onChange={(e) => handleChange("technologies", e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-medium">Project Description</label>
        <textarea
          placeholder="Briefly describe your project"
          className="w-full p-2 border rounded"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-medium">Is Project Complete?</label>
        <select
          className="w-full p-2 border rounded"
          value={formData.isComplete}
          onChange={(e) => handleChange("isComplete", parseInt(e.target.value))}
          required
        >
          <option value="">Select</option>
          <option value="1">True</option>
          <option value="0">False</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {isEditing ? "Update Project" : "Add Project"}
      </button>
    </form>
  );
}