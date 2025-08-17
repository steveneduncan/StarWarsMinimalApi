import React from "react";
import { StarshipForm } from "./StarshipForm";
import API_BASE_URL from "../config";

export function CreateStarshipModal({ onClose, onCreate }) {
  const [formId] = React.useState(
    () =>
      `starshipform-create-${Math.random().toString(36).slice(2)}-${Date.now()}`
  );
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Create Starship</h2>
        <StarshipForm
          formId={formId}
          onSubmit={async (data) => {
            // Map camelCase to snake_case for backend compatibility
            const mapped = {
              Name: data.name,
              Model: data.model,
              Manufacturer: data.manufacturer,
              cost_in_credits: data.costInCredits || "",
              Length: data.length || "",
              max_atmosphering_speed: data.maxAtmospheringSpeed || "",
              Crew: data.crew || "",
              Passengers: data.passengers || "",
              cargo_capacity: data.cargoCapacity || "",
              Consumables: data.consumables || "",
              hyperdrive_rating: data.hyperdriveRating || "",
              mglt: data.mglt || "",
              starship_class: data.starshipClass || "",
              Pilots: Array.isArray(data.pilots)
                ? data.pilots
                : typeof data.pilots === "string" && data.pilots.trim()
                ? data.pilots
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean)
                : [],
              Films: Array.isArray(data.films)
                ? data.films
                : typeof data.films === "string" && data.films.trim()
                ? data.films
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean)
                : [],
              Url: data.url || "",
            };
            // Only add Created/Edited if valid ISO date, otherwise use now
            if (!data.created || isNaN(Date.parse(data.created))) {
              mapped.Created = new Date().toISOString();
            } else {
              mapped.Created = new Date(data.created).toISOString();
            }
            if (!data.edited || isNaN(Date.parse(data.edited))) {
              mapped.Edited = new Date().toISOString();
            } else {
              mapped.Edited = new Date(data.edited).toISOString();
            }
            try {
              console.log("Creating starship:", JSON.stringify(mapped));
              const response = await fetch(`${API_BASE_URL}/api/starship`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(mapped),
              });
              if (response.status !== 201)
                throw new Error("Failed to create starship");
              const created = await response.json();
              onCreate(created);
              onClose();
            } catch (err) {
              alert("Failed to create starship.");
            }
          }}
        />
      </div>
    </div>
  );
}

export function EditStarshipModal({
  editRow,
  editIdx,
  starships,
  setStarships,
  onClose,
}) {
  const [formId] = React.useState(
    () =>
      `starshipform-edit-${
        editRow && editRow.id ? editRow.id : editIdx
      }-${Math.random().toString(36).slice(2)}-${Date.now()}`
  );
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Edit Starship</h2>
        <StarshipForm
          formId={formId}
          initialValues={{
            ...editRow,
            costInCredits:
              editRow.costInCredits !== undefined
                ? String(editRow.costInCredits)
                : "",
            length: editRow.length !== undefined ? String(editRow.length) : "",
            maxAtmospheringSpeed:
              editRow.maxAtmospheringSpeed !== undefined
                ? String(editRow.maxAtmospheringSpeed)
                : "",
            passengers:
              editRow.passengers !== undefined
                ? String(editRow.passengers)
                : "",
            cargoCapacity:
              editRow.cargoCapacity !== undefined
                ? String(editRow.cargoCapacity)
                : "",
            hyperdriveRating:
              editRow.hyperdriveRating !== undefined
                ? String(editRow.hyperdriveRating)
                : "",
            mglt:
              editRow.mglt !== undefined
                ? String(editRow.mglt)
                : editRow.mglt !== undefined
                ? String(editRow.mglt)
                : "",
          }}
          onSubmit={async (data) => {
            try {
              // Patch all editable fields, mapping to backend format
              const patch = {
                Name: data.name,
                Model: data.model,
                Manufacturer: data.manufacturer,
                CostInCredits: data.costInCredits || "",
                Length: data.length || "",
                MaxAtmospheringSpeed: data.maxAtmospheringSpeed || "",
                Crew: data.crew || "",
                Passengers: data.passengers || "",
                CargoCapacity: data.cargoCapacity || "",
                Consumables: data.consumables || "",
                HyperdriveRating: data.hyperdriveRating || "",
                Mglt: data.mglt || "",
                StarshipClass: data.starshipClass || "",
                Pilots: Array.isArray(data.pilots)
                  ? data.pilots
                  : typeof data.pilots === "string" && data.pilots.trim()
                  ? data.pilots
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean)
                  : [],
                Films: Array.isArray(data.films)
                  ? data.films
                  : typeof data.films === "string" && data.films.trim()
                  ? data.films
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean)
                  : [],
                Url: data.url || "",
              };
              // Only add Created/Edited if valid ISO date, otherwise use now
              if (!data.created || isNaN(Date.parse(data.created))) {
                patch.Created = new Date().toISOString();
              } else {
                patch.Created = new Date(data.created).toISOString();
              }
              if (!data.edited || isNaN(Date.parse(data.edited))) {
                patch.Edited = new Date().toISOString();
              } else {
                patch.Edited = new Date(data.edited).toISOString();
              }
              console.log("Patching starship:", JSON.stringify(patch));
              const response = await fetch(
                `${API_BASE_URL}/api/starships/${encodeURIComponent(
                  editRow.id
                )}`,
                {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(patch),
                }
              );
              if (!response.ok) throw new Error("Failed to update");
              const updatedStarship = await response.json();
              const updated = [...starships];
              updated[editIdx] = { ...updated[editIdx], ...updatedStarship };
              setStarships(updated);
              onClose();
            } catch (err) {
              alert("Failed to update starship.");
            }
          }}
        />
      </div>
    </div>
  );
}
