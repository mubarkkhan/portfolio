"use client";
import { useEffect, useState } from "react";
import ProjectForm from "./Child/ProjectForm";
import ProjectList from "./Child/ProjectList";
import Sidebar from "../Common/Sidebar";
import Header from "../Common/Header";
import Cookies from "js-cookie";
import socket from "../../../Lib/socket";
import { handleGetAPI, handlePostAPI } from "@/app/Utilities/Utils";

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    technologies: "",
    giturl: "",
    imgurl: "",
    isComplete: false
  });
  const token = Cookies.get("admMKey");
  const fetchData = async () => {
    try {
      const result = await handleGetAPI("admin/getProject");
      if (result.data.status === true) {
        setProjects(result.data.result);
      }
    } catch (e) {
      console.log(e, "error");
    }
  };
  useEffect(() => {
    socket.on("sendProject", (data) => {
      setProjects((prev) => [...prev, data]);
    });
    socket.on("sendEditProject", (data) => {
      setProjects((prev) =>
        prev?.map((pr) =>
          String(pr?.id) === String(data?.id) ? { ...pr, ...data } : pr
        )
      );
    });
    fetchData();
    return () => {
      socket.off("sendProject");
      socket.off("sendEditProject");
    };
  }, []);
  const handleAddOrUpdate = async (newProject) => {
    if (!token) {
      return;
    }
    const data = new FormData();
    data.append("title", newProject?.title);
    data.append("description", newProject?.description);
    data.append("url", newProject?.url);
    data.append("giturl", newProject?.giturl);
    data.append("technologies", newProject?.technologies);
    data.append("isComplete", newProject?.isComplete);
    data.append("file", newProject?.imgurl);
    if (editingIndex !== null) {
      data.append("id", newProject?.id);
      const result = await handlePostAPI("admin/updateProject", data);
      if (result.data.status === true) {
        alert(result.data.message);
      }
      setEditingIndex(null);
    } else {
      try {
        const result = await handlePostAPI("admin/addProject", data);
        if (result.data.status === true) {
          alert(result.data.message);
        }
      } catch (e) {
        console.log(e, "error");
      }
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    const result = projects?.find((k) => k?.id === index);
    setFormData({
      id: result?.id,
      title: result?.title,
      technologies: result?.technologies,
      url: result?.url,
      description: result?.description,
      imgurl: result?.imgurl,
      giturl: result?.giturl,
      isComplete: result?.isComplete,
    });
  };

  const handleDelete = async (index) => {
    try {
      const result = await handlePostAPI("admin/deleteProject", { id: index });
      if (result.data.status === true) {
        alert(result.data.message);
      }
    } catch (e) {
      console.log(e, "error");
    }
    const filtered = projects.filter((k) => k?.id !== index);
    setProjects(filtered);
    setEditingIndex(null);
  };
console.log(formData,'form')
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex">
        <Sidebar />

        <div className="ml-64 flex-1">
          <Header />
          <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-5xl mx-auto space-y-6">
              <ProjectForm
                onSubmit={handleAddOrUpdate}
                formData={formData}
                setFormData={setFormData}
                isEditing={editingIndex !== null}
              />
              <ProjectList
                projects={projects}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
