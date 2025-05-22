import { useEffect, useState } from "react";

const UpdateItem = ({ id, apiUri }) => {
  const [item, setItem] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [message, setMessage] = useState("");

  const itemUrl = `${apiUri}/${id}`;

  // Fetch the item when component mounts
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(itemUrl);
        const data = await res.json();
        setItem(data);
        setUpdatedName(data.name);
      } catch (err) {
        console.error("Error fetching item:", err);
        setMessage("Failed to load item.");
      }
    };

    fetchItem();
  }, [itemUrl]);

  // Handle form input change
  const handleChange = (e) => {
    setUpdatedName(e.target.value);
  };

  // Handle update on button click
  const handleUpdate = async () => {
    try {
      const res = await fetch(itemUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: updatedName }),
      });

      if (!res.ok) {
        throw new Error("Failed to update item");
      }

      const updated = await res.json();
      setItem(updated);
      setMessage("Item updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
      setMessage("Update failed.");
    }
  };

  return (
    <div>
      <h2>Update Door</h2>
      {item ? (
        <>
          <p>Current Name: {item.name}</p>
          <input
            type="text"
            value={updatedName}
            onChange={handleChange}
            placeholder="Update door name"
          />
          <button onClick={handleUpdate}>Update</button>
          {message && <p>{message}</p>}
        </>
      ) : (
        <p>Loading item...</p>
      )}
    </div>
  );
};

export default UpdateItem;