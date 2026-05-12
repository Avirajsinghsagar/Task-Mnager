import { useEffect, useState } from "react";

import API from "../api/axios";

function Projects() {

  const [projects, setProjects] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });


  const fetchProjects = async () => {

    try {

      const { data } = await API.get("/projects");

      setProjects(data);

    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {

    fetchProjects();

  }, []);


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post("/projects", formData);

      fetchProjects();

      setFormData({
        title: "",
        description: "",
      });

      window.location.reload();

    } catch (error) {

      console.log(error);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-6">
        Projects
      </h1>


      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow mb-6"
      >

        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Project Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded"
          required
        />

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded"
        >
          Create Project
        </button>

      </form>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {projects.map((project) => (

          <div
            key={project._id}
            className="bg-white p-6 rounded shadow"
          >

            <h2 className="text-2xl font-bold mb-2">
              {project.title}
            </h2>

            <p className="text-gray-600">
              {project.description}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Projects;