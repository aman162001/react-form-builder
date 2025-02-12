import React from 'react'
import { FormElements } from './FormElements'

interface FormELement {
  type: string
}

function ToolBar() {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: FormELement) => {
    e.dataTransfer.setData('text', JSON.stringify(item));
  };
  return (
    <div className='card h-100'>
      <div className="card-header fw-bold">
        Form Field
      </div>
      <div className="card-body d-flex flex-column gap-2">

        {FormElements.map((item, index) => (
          <div className="card" draggable={true}
            onDragStart={(e) => handleDragStart(e, item)} // Handle drag start
            key={index}>
            <div className="card-body p-2 fs-6 d-flex justify-content-between align-items-center">
              <span>
                {item.type}
              </span>
              <button className='btn btn-sm btn-secondary'>
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>


  )
}

export default ToolBar