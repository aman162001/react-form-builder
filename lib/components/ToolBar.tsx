import React from "react";
import { defaultFormElements } from "./FormElements";

interface FormELement {
  type: string;
}

interface ToolBarProps {
  handleAdd: (index: number) => void;
}

const ToolBar: React.FC<ToolBarProps> = ({ handleAdd }) => {
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    item: FormELement
  ) => {
    e.dataTransfer.setData("text", JSON.stringify(item));
  };
  return (
    <div className="card h-100">
      <div className="card-header fw-bold">Form Field</div>
      <div className="card-body d-flex flex-column gap-2">
        {defaultFormElements.map((item, index) => (
          <div
            className="card"
            draggable={true}
            onDragStart={(e) => handleDragStart(e, item)} // Handle drag start
            key={index}>
            <div className="card-body p-2 fs-6 d-flex justify-content-between align-items-center">
              <span>{item.type}</span>
              <button
                className="btn btn-sm btn-secondary d-flex align-items-center"
                onClick={() => handleAdd(index)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-plus"
                  viewBox="0 0 16 16">
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolBar;
