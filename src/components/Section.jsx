import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import toast from 'react-hot-toast';

const TodoBox = styled.div`
  background-color: #f0f0f0;
  width: 400px;
  height: 750px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;

  @media (max-width: 768px) {
    width: max-width; 
    margin: 20px;
    height: 400px;
  }
`;

const Styledhr = styled.hr`
  border: 1px solid #000;
`;

const TodoHeader = styled.h2.attrs((props) => ({
  className: `text-gray-800 font-extrabold mb-2 p-2 rounded 
    }`
}))`
    color: #333;
  `;

const Section = ({ section, tasks, onDeleteTask }) => {
  const sectionTasks = section.taskIds.map((taskId) =>
    tasks.find((task) => task.id === taskId)
  );

  const handleDelete = (taskId) => {
    onDeleteTask(taskId);
    toast.success('Task deleted', { icon: '🗑️' });
  };

  return (
    <TodoBox>
      <TodoHeader sectionType={section.type}>
        {section.title} - {sectionTasks.length} Tasks
      </TodoHeader>
      <Styledhr />
      {sectionTasks.map((task, index) => (
        <Draggable key={task.id} draggableId={task.id} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className={`
                bg-white border my-2 p-2 rounded flex justify-between items-center
                ${snapshot.isDragging ? 'bg-blue-200' : ''}
                h-16
                w-full
              `}
            >
              <p>{task.content}</p>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
            </div>
          )}
        </Draggable>
      ))}
    </TodoBox>
  );
};

export default Section;
