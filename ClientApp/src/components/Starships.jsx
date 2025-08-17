import React, { useState, useEffect, useRef } from "react";
import { CreateStarshipModal, EditStarshipModal } from "./StarshipModals";
import API_BASE_URL from "../config";
export function Starships() {
  const [starships, setStarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("loading"); // 'loading', 'error', 'success'
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [filter, setFilter] = useState("");
  const [editIdx, setEditIdx] = useState(null);
  const [editRow, setEditRow] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [deleteIdx, setDeleteIdx] = useState(null);
  const editingRowRef = useRef(null);

  // State for showing the create form
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Sorting handler
  function handleSort(key) {
    setSortConfig((prev) => {
      if (prev.key === key) {
        // Toggle direction
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  }

  // Add filteredStarships definition
  const sortedStarships = React.useMemo(() => {
    let sortable = [...starships];
    if (sortConfig.key) {
      sortable.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key])
          return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key])
          return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortable;
  }, [starships, sortConfig]);

  const filteredStarships = sortedStarships.filter(
    (ship) =>
      ship.name.toLowerCase().includes(filter.toLowerCase()) ||
      ship.model.toLowerCase().includes(filter.toLowerCase()) ||
      ship.manufacturer.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    async function fetchAndSeedIfEmpty() {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/starships`);
        if (!response.ok) throw new Error("Failed to fetch starships");
        const data = await response.json();
        if (Array.isArray(data) && data.length === 0) {
          console.log("No starship data, seeding database");
          const seedResponse = await fetch(
            `${API_BASE_URL}/api/starships/seed`,
            { method: "POST" }
          );
          if (!seedResponse.ok) throw new Error("Failed to seed starships");
          // Try fetching again
          const retryResponse = await fetch(`${API_BASE_URL}/api/starships`);
          if (!retryResponse.ok)
            throw new Error("Failed to fetch starships after seeding");
          const retryData = await retryResponse.json();
          setStarships(retryData);
        } else {
          setStarships(data);
        }
        setStatus("success");
      } catch (err) {
        setStatus("error");
      } finally {
        setLoading(false);
      }
    }
    fetchAndSeedIfEmpty();
  }, []);

  return (
    <div className="max-w-4xl mt-8">
      <h1 className="text-3xl font-bold mb-4">Starships</h1>
      <input
        id="starship-filter"
        name="starship-filter"
        type="text"
        placeholder="Filter by name, model, or manufacturer"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-md"
      />

      <button
        className="px-4 py-2 text-med bg-blue-500 text-white rounded ml-8"
        onClick={() => setShowCreateForm(true)}
      >
        Create Starship
      </button>

      {showCreateForm && (
        <CreateStarshipModal
          onClose={() => setShowCreateForm(false)}
          onCreate={(created) => setStarships((prev) => [...prev, created])}
        />
      )}

      <div className="px-0 py-8">
        <div className="rounded-lg shadow-lg bg-white">
          <table className="min-w-[1100px] w-full table-auto divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  className="px-4 py-2 text-left cursor-pointer select-none"
                  onClick={() => handleSort("name")}
                >
                  Name{" "}
                  {sortConfig.key === "name" &&
                    (sortConfig.direction === "asc" ? "▲" : "▼")}
                </th>
                <th
                  className="px-4 py-2 text-left cursor-pointer select-none"
                  onClick={() => handleSort("model")}
                >
                  Model{" "}
                  {sortConfig.key === "model" &&
                    (sortConfig.direction === "asc" ? "▲" : "▼")}
                </th>
                <th
                  className="px-4 py-2 text-left cursor-pointer select-none"
                  onClick={() => handleSort("manufacturer")}
                >
                  Manufacturer{" "}
                  {sortConfig.key === "manufacturer" &&
                    (sortConfig.direction === "asc" ? "▲" : "▼")}
                </th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredStarships.map((ship, idx) => {
                const isEditing = editIdx === idx;
                const isDeleting = deleteIdx === idx;
                return (
                  <tr
                    key={idx}
                    ref={isEditing ? editingRowRef : null}
                    className={
                      "even:bg-gray-50 odd:bg-white hover:bg-gray-100" +
                      (isEditing
                        ? " ring-2 ring-blue-400 ring-inset z-10"
                        : isDeleting
                        ? " ring-2 ring-red-500 ring-inset z-10"
                        : "")
                    }
                    onClick={() => {
                      if (editIdx !== null && editIdx !== idx) {
                        setEditIdx(null);
                      }
                      if (deleteIdx !== null && deleteIdx !== idx) {
                        setDeleteIdx(null);
                      }
                    }}
                  >
                    <td className="px-4 py-2">{ship.name}</td>
                    <td className="px-4 py-2">{ship.model}</td>
                    <td className="px-4 py-2">{ship.manufacturer}</td>
                    <td className="px-4 py-2">
                      <div className="flex flex-row gap-2">
                        <button
                          className="px-4 py-0.5 bg-blue-500 text-white rounded"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditIdx(idx);
                            setEditRow(ship);
                            setShowEditForm(true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="px-4 py-0.5 bg-red-500 text-white rounded"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteIdx(idx);
                            setTimeout(async () => {
                              if (
                                !window.confirm(
                                  "Are you sure you want to delete this starship?"
                                )
                              ) {
                                setDeleteIdx(null);
                                return;
                              }
                              try {
                                const response = await fetch(
                                  `${API_BASE_URL}/api/starships/${encodeURIComponent(
                                    ship.id ?? ship.name
                                  )}`,
                                  {
                                    method: "DELETE",
                                  }
                                );
                                if (!response.ok)
                                  throw new Error("Failed to delete");
                                let realIdx = -1;
                                if (ship.id !== undefined && ship.id !== null) {
                                  realIdx = starships.findIndex(
                                    (s) => s.id === ship.id
                                  );
                                } else {
                                  realIdx = starships.findIndex(
                                    (s) =>
                                      s.name === ship.name &&
                                      s.model === ship.model &&
                                      s.manufacturer === ship.manufacturer
                                  );
                                }
                                if (realIdx !== -1) {
                                  setStarships(
                                    starships.filter((_, i) => i !== realIdx)
                                  );
                                }
                                setEditIdx(null);
                                setDeleteIdx(null);
                              } catch (err) {
                                alert("Failed to delete starship.");
                                setDeleteIdx(null);
                              }
                            }, 0);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {showEditForm && editRow && (
            <EditStarshipModal
              editRow={editRow}
              editIdx={editIdx}
              starships={starships}
              setStarships={setStarships}
              onClose={() => {
                setShowEditForm(false);
                setEditIdx(null);
                setEditRow(null);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
