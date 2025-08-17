import React, { useState } from "react";

export function StarshipForm({
  onSubmit,
  initialValues = {},
  formId = "starshipform",
}) {
  const [form, setForm] = useState({
    name: initialValues.name || "",
    model: initialValues.model || "",
    manufacturer: initialValues.manufacturer || "",
    costInCredits: initialValues.costInCredits || "",
    length: initialValues.length || "",
    maxAtmospheringSpeed: initialValues.maxAtmospheringSpeed || "",
    crew: initialValues.crew || "",
    passengers: initialValues.passengers || "",
    cargoCapacity: initialValues.cargoCapacity || "",
    consumables: initialValues.consumables || "",
    hyperdriveRating: initialValues.hyperdriveRating || "",
    mglt: initialValues.mglt || initialValues.MGLT || "",
    starshipClass: initialValues.starshipClass || "",
    pilots: initialValues.pilots || "",
    films: initialValues.films || "",
    created: initialValues.created || "",
    edited: initialValues.edited || "",
    url: initialValues.url || "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (onSubmit) onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col">
          <label htmlFor={`${formId}-name`} className="mb-1 font-medium">
            Name
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor={`${formId}-model`} className="mb-1 font-medium">
            Model
          </label>
          <input
            id={`${formId}-model`}
            name="model"
            value={form.model}
            onChange={handleChange}
            placeholder="Model"
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor={`${formId}-manufacturer`}
            className="mb-1 font-medium"
          >
            Manufacturer
          </label>
          <input
            id={`${formId}-manufacturer`}
            name="manufacturer"
            value={form.manufacturer}
            onChange={handleChange}
            placeholder="Manufacturer"
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor={`${formId}-costInCredits`}
            className="mb-1 font-medium"
          >
            Cost In Credits
          </label>
          <input
            id={`${formId}-costInCredits`}
            name="costInCredits"
            value={form.costInCredits}
            onChange={handleChange}
            placeholder="Cost In Credits"
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor={`${formId}-length`} className="mb-1 font-medium">
            Length
          </label>
          <input
            id={`${formId}-length`}
            name="length"
            value={form.length}
            onChange={handleChange}
            placeholder="Length"
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor={`${formId}-maxAtmospheringSpeed`}
            className="mb-1 font-medium"
          >
            Max Atmosphering Speed
          </label>
          <input
            id={`${formId}-maxAtmospheringSpeed`}
            name="maxAtmospheringSpeed"
            value={form.maxAtmospheringSpeed}
            onChange={handleChange}
            placeholder="Max Atmosphering Speed"
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor={`${formId}-crew`} className="mb-1 font-medium">
            Crew
          </label>
          <input
            id={`${formId}-crew`}
            name="crew"
            value={form.crew}
            onChange={handleChange}
            placeholder="Crew"
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor={`${formId}-passengers`} className="mb-1 font-medium">
            Passengers
          </label>
          <input
            id={`${formId}-passengers`}
            name="passengers"
            value={form.passengers}
            onChange={handleChange}
            placeholder="Passengers"
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor={`${formId}-cargoCapacity`}
            className="mb-1 font-medium"
          >
            Cargo Capacity
          </label>
          <input
            id={`${formId}-cargoCapacity`}
            name="cargoCapacity"
            value={form.cargoCapacity}
            onChange={handleChange}
            placeholder="Cargo Capacity"
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor={`${formId}-consumables`} className="mb-1 font-medium">
            Consumables
          </label>
          <input
            id={`${formId}-consumables`}
            name="consumables"
            value={form.consumables}
            onChange={handleChange}
            placeholder="Consumables"
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor={`${formId}-hyperdriveRating`}
            className="mb-1 font-medium"
          >
            Hyperdrive Rating
          </label>
          <input
            id={`${formId}-hyperdriveRating`}
            name="hyperdriveRating"
            value={form.hyperdriveRating}
            onChange={handleChange}
            placeholder="Hyperdrive Rating"
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor={`${formId}-mglt`} className="mb-1 font-medium">
            MGLT
          </label>
          <input
            id={`${formId}-mglt`}
            name="mglt"
            value={form.mglt}
            onChange={handleChange}
            placeholder="MGLT"
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor={`${formId}-starshipClass`}
            className="mb-1 font-medium"
          >
            Starship Class
          </label>
          <input
            id={`${formId}-starshipClass`}
            name="starshipClass"
            value={form.starshipClass}
            onChange={handleChange}
            placeholder="Starship Class"
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor={`${formId}-pilots`} className="mb-1 font-medium">
            Pilots
          </label>
          <input
            id={`${formId}-pilots`}
            name="pilots"
            value={form.pilots}
            onChange={handleChange}
            placeholder="Pilots"
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor={`${formId}-films`} className="mb-1 font-medium">
            Films
          </label>
          <input
            id={`${formId}-films`}
            name="films"
            value={form.films}
            onChange={handleChange}
            placeholder="Films"
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor={`${formId}-created`} className="mb-1 font-medium">
            Created
          </label>
          <input
            id={`${formId}-created`}
            name="created"
            value={form.created}
            onChange={handleChange}
            placeholder="Created"
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor={`${formId}-edited`} className="mb-1 font-medium">
            Edited
          </label>
          <input
            id={`${formId}-edited`}
            name="edited"
            value={form.edited}
            onChange={handleChange}
            placeholder="Edited"
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor={`${formId}-url`} className="mb-1 font-medium">
            Url
          </label>
          <input
            id={`${formId}-url`}
            name="url"
            value={form.url}
            onChange={handleChange}
            placeholder="Url"
            className="p-2 border rounded"
          />
        </div>
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Save
      </button>
    </form>
  );
}
