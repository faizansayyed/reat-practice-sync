// CustomCellRenderer.js
import React, { useState } from "react";

const CustomCellRenderer = ({ value, onDelete, onEdit }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleDelete = () => {
    onDelete(value); // Call the API to delete data
    setShowMenu(false);
  };

  const handleEdit = () => {
    onEdit(value); // Redirect to the edit page
    setShowMenu(false);
  };

  return (
    <div className="custom-cell">
      <span onClick={() => setShowMenu(true)}>...</span>
      {showMenu && (
        <div className="popup-menu">
          <div onClick={handleDelete}>Delete</div>
          <div onClick={handleEdit}>Edit</div>
        </div>
      )}
    </div>
  );
};

export default CustomCellRenderer;
