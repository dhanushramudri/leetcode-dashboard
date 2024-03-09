import React, { useState, useEffect } from "react";
import { FaExternalLinkAlt, FaCheck, FaUndo } from "react-icons/fa";
import "./problems.css";

function Problems({ token, userId }) {
  console.log("user in prob page", userId);
  const [problems, setProblems] = useState([]);
  const [solvedCount, setSolvedCount] = useState(0);
  const [newProblem, setNewProblem] = useState({
    title: "",
    status: "Pending",
    links: {
      csLink: "",
      youtubeLink: "",
      leetcodeLink: "",
    },
    notes: "",
    companyTags: "",
  });

  const handleAddProblem = () => {
    fetch("http://localhost:5000/problems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newProblem),
    })
      .then((response) => response.json())
      .then((data) => {
        setProblems([...problems, data]);
        setNewProblem({
          title: "",
          status: "Pending",
          links: {
            csLink: "",
            youtubeLink: "",
            leetcodeLink: "",
          },
          notes: "",
          companyTags: "",
        });
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (token) {
      fetch("http://localhost:5000/problems", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Set default status based on isSolved property
          const problemsWithDefaultStatus = data.map((problem) => ({
            ...problem,
            status: problem.isSolved ? "Done" : "Pending",
          }));

          setProblems(problemsWithDefaultStatus);
        })
        .catch((error) => console.error(error));

      fetch(`http://localhost:5000/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setSolvedCount(data.solvedCount);
        })
        .catch((error) => console.error(error));
    }
  }, [token, userId]);

  const handleStatusChange = (problemId, status) => {
    console.log("UserId:", userId);

    setProblems((prevProblems) =>
      prevProblems.map((problem) =>
        problem._id === problemId ? { ...problem, status } : problem
      )
    );

    // Update solvedCount when a problem is marked as "Done"
    if (status === "Done") {
      // Make a request to the server to update the solvedCount
      fetch(`http://localhost:5000/user/${userId}/updateSolvedCount`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Update the solvedCount in the state after the request is successful
          setSolvedCount(data.solvedCount);
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="problems-container">
      <h2>Problems</h2>

      {/* Display solvedCount */}
      <div className="solved-count">
        <p>Solved Problems: {solvedCount}</p>
      </div>

      <table>
        <thead>
          <tr>
            <th>Action</th>
            <th>Problem [Articles, Codes]</th>
            <th>PL-1</th>
            <th>Solution</th>
            <th>PL-2</th>
            <th>Notes</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem) => (
            <tr
              key={problem._id}
              className={problem.status === "Done" ? "done-problem" : ""}
            >
              <td>
                <select
                  value={problem.status}
                  onChange={(e) =>
                    handleStatusChange(problem._id, e.target.value)
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Done">Done</option>
                  <option value="Revisit">Revisit</option>
                </select>
              </td>
              <td>
                {problem.title}{" "}
                {problem.status === "Done" && <FaCheck color="green" />}
              </td>
              <td>
                {problem.links.csLink && (
                  <a
                    href={problem.links.csLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaExternalLinkAlt />
                  </a>
                )}
              </td>
              <td></td>
              <td>
                {problem.links.leetcodeLink && (
                  <a
                    href={problem.links.leetcodeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaExternalLinkAlt />
                  </a>
                )}
              </td>
              <td>
                <button>
                  <FaUndo />
                </button>
              </td>
              <td>{problem.companyTags}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <input
          type="text"
          placeholder="Title"
          value={newProblem.title}
          onChange={(e) =>
            setNewProblem({ ...newProblem, title: e.target.value })
          }
        />
        <button onClick={handleAddProblem}>Add Problem</button>
      </div>
    </div>
  );
}

export default Problems;
