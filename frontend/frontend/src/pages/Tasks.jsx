import { useEffect, useState } from "react";

import API from "../api/axios";

function Tasks() {

  const [tasks, setTasks] = useState([]);

  const [projects, setProjects] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    project: "",
    priority: "medium",
  });


  const fetchTasks = async () => {

    try {

      const { data } = await API.get("/tasks");

      setTasks(data);

    } catch (error) {
      console.log(error);
    }
  };


  const fetchProjects = async () => {

    try {

      const { data } = await API.get("/projects");

      setProjects(data);

    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {

    fetchTasks();

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

      await API.post("/tasks", formData);

      fetchTasks();

      setFormData({
        title: "",
        description: "",
        project: "",
        priority: "medium",
      });

    } catch (error) {
      console.log(error);
    }
  };


  const updateStatus = async (id, status) => {

    try {

      await API.put(`/tasks/${id}`, {
        status,
      });

      fetchTasks();

    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-6">
        Tasks
      </h1>


      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow mb-6"
      >

        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded"
        />


        <textarea
          name="description"
          placeholder="Task Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded"
        />


        <select
          name="project"
          value={formData.project}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded"
        >

          <option value="">
            Select Project
          </option>

          {projects.map((project) => (

            <option
              key={project._id}
              value={project._id}
            >
              {project.title}
            </option>

          ))}

        </select>


        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded"
        >

          <option value="low">
            Low
          </option>

          <option value="medium">
            Medium
          </option>

          <option value="high">
            High
          </option>

        </select>


        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded"
        >
          Create Task
        </button>

      </form>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {tasks.map((task) => (

          <div
            key={task._id}
            className="bg-white p-6 rounded shadow"
          >

            <h2 className="text-2xl font-bold mb-2">
              {task.title}
            </h2>

            <p className="text-gray-600 mb-2">
              {task.description}
            </p>

            <p className="mb-2">
              <strong>Project:</strong>{" "}
              {task.project?.title}
            </p>

            <p className="mb-2">
              <strong>Status:</strong>{" "}
              {task.status}
            </p>

            <p className="mb-4">
              <strong>Priority:</strong>{" "}
              {task.priority}
            </p>


            <select
              value={task.status}
              onChange={(e) =>
                updateStatus(task._id, e.target.value)
              }
              className="border p-2 rounded"
            >

              <option value="todo">
                Todo
              </option>

              <option value="in-progress">
                In Progress
              </option>

              <option value="completed">
                Completed
              </option>

            </select>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Tasks;