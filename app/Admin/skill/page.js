"use client";
import { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import Header from "../Common/Header";
import { handleGetAPI, handlePostAPI } from "@/app/Utilities/Utils";
import socket from "@/lib/socket";

export default function SkillManager() {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ skill: "", knowledge: "" });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editSkill, setEditSkill] = useState({ skill: "", knowledge: "" });

  const fetchData = async () => {
    try {
      const result = await handleGetAPI("admin/getSkill");
      if (result.data.status === true) {
        setSkills(result.data.result);
      }
    } catch (e) {
      console.log(e, "error");
    }
  };
  useEffect(() => {
    socket.on("sendSkill", (data) => {
      setSkills((prev) => [...prev, data]);
    });
      socket.on("editSkill", (data) => {
      setSkills((prev) =>
        prev?.map((pr) =>
          String(pr?.id) === String(data?.id) ? { ...pr, ...data } : pr
        )
      );
    });
    fetchData();
    return () => {
      socket.off("sendSkill");
      socket.off("editSkill");
    };
  }, []);

  const addSkill = async () => {
    if (!newSkill?.skill || !newSkill?.knowledge) {
      return;
    }
    const data = {
      skill: newSkill?.skill,
      knowledge: newSkill?.knowledge,
    };
    try {
      const result = await handlePostAPI("admin/addSkill", data);
      if (result.data.status === true) {
        alert(result.data.message);
        setNewSkill({ skill: "", knowledge: "" });
      }
    } catch (e) {
      console.log(e, "error");
    }
  };

  const deleteSkill = async (index) => {
    try {
      const result = await handlePostAPI("admin/deleteSkill", { id: index });
      if (result.data.status === true) {
        alert(result.data.message);
      }
    } catch (e) {
      console.log(e, "error");
    }
    setSkills(skills.filter((k) => k?.id !== index));
  };

  const startEdit = (index) => {
    setEditingIndex(index);
    setEditSkill(skills[index]);
  };
  const saveEdit = async (key) => {
    try {
      const result = skills?.find((k) => k?.id === key);
      const data = {
        id: result?.id,
        skill: editSkill?.skill,
        knowledge: editSkill?.knowledge,
      };
      if (editingIndex !== null) {
        const result = await handlePostAPI("admin/updateSkill", data);
        if (result.data.status === true) {
          alert(result.data.message);
          setEditingIndex(null);
          setEditSkill({ skill: "", knowledge: "" });
        }
      }
    } catch (e) {
      console.log(e, "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="ml-64 flex-1">
        <Header />
        <div className="mt-6 max-w-[978px] mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow-md space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Manage Skills
          </h2>

          {/* Add Skill */}
          <div className="flex flex-col md:flex-row gap-2">
            <input
              required
              type="text"
              placeholder="Skill name"
              className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              value={newSkill.skill}
              onChange={(e) =>
                setNewSkill({ ...newSkill, skill: e.target.value })
              }
            />
            <select
              required
              className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              value={newSkill.knowledge}
              onChange={(e) =>
                setNewSkill({ ...newSkill, knowledge: e.target.value })
              }
            >
              <option value="">Select Knowledge</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>

            <button
              onClick={addSkill}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              ➕ Add
            </button>
          </div>

          {/* Skill List */}
          <ul className="space-y-3">
            {skills.map((skill, index) => (
              <li
                key={index}
                className="flex flex-col md:flex-row justify-between items-start md:items-center border rounded-lg p-3 bg-gray-50 dark:bg-gray-700"
              >
                {editingIndex === index ? (
                  <div className="flex flex-col md:flex-row flex-1 gap-2 w-full">
                    <input
                      value={editSkill.skill}
                      onChange={(e) =>
                        setEditSkill({ ...editSkill, skill: e.target.value })
                      }
                      className="flex-1 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                    />
                    <select
              required
              className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              value={editSkill.knowledge}
              onChange={(e) =>
                setEditSkill({ ...editSkill, knowledge: e.target.value })
              }
            >
              <option value="">Select Knowledge</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
                  </div>
                ) : (
                  <div className="flex-1">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {skill.skill}
                    </span>
                    <span className="ml-4 text-sm text-gray-600 dark:text-gray-300">
                      ({skill.knowledge})
                    </span>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                  {editingIndex === index ? (
                    <>
                      <button
                        onClick={() => {
                          saveEdit(skill?.id);
                        }}
                        className="bg-green-600 text-white px-4 py-1.5 rounded-md text-sm hover:bg-green-700 transition"
                      >
                        💾 Save
                      </button>
                      <button
                        onClick={() => setEditingIndex(null)}
                        className="bg-gray-400 text-white px-4 py-1.5 rounded-md text-sm hover:bg-gray-500 transition"
                      >
                        ✖ Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => startEdit(index)}
                      className="bg-yellow-400 text-black px-4 py-1.5 rounded-md text-sm hover:bg-yellow-500 transition"
                    >
                      ✏️ Edit
                    </button>
                  )}
                  <button
                    onClick={() => deleteSkill(skill?.id)}
                    className="bg-red-500 text-white px-4 py-1.5 rounded-md text-sm hover:bg-red-600 transition"
                  >
                    🗑 Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
