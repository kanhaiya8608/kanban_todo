import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TaskForm from './TaskForm'; 
import Section from './Section';
import styled from 'styled-components';

const KanbanContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;
const Kanban = () => {
  const [sections, setSections] = useState(() => {
    const storedSections = localStorage.getItem('sections');
    return storedSections
      ? JSON.parse(storedSections)
      : {
          todo: {
            id: 'todo',
            title: 'To Do',
            taskIds: [],
          },
          inProgress: {
            id: 'inProgress',
            title: 'In Progress',
            taskIds: [],
          },
          complete: {
            id: 'complete',
            title: 'Complete',
            taskIds: [],
          },
        };
  });

  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('sections', JSON.stringify(sections));
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [sections, tasks]);

  const addTask = ({ content }) => {
    const newTask = { id: `task${tasks.length + 1}`, content };
    setTasks([...tasks, newTask]);

    const updatedSections = { ...sections };
    updatedSections.todo.taskIds.push(newTask.id);
    setSections(updatedSections);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);

    const updatedSections = { ...sections };
    Object.values(updatedSections).forEach((section) => {
      section.taskIds = section.taskIds.filter((id) => id !== taskId);
    });

    setSections(updatedSections);
  };
  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceSection = sections[source.droppableId];
    const destinationSection = sections[destination.droppableId];

    const updatedSections = { ...sections };

    if (sourceSection === destinationSection) {
      const newTaskIds = Array.from(sourceSection.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      updatedSections[source.droppableId] = {
        ...sourceSection,
        taskIds: newTaskIds,
      };
    } else {
      const sourceTaskIds = Array.from(sourceSection.taskIds);
      sourceTaskIds.splice(source.index, 1);
      updatedSections[source.droppableId] = {
        ...sourceSection,
        taskIds: sourceTaskIds,
      };

      const destinationTaskIds = Array.from(destinationSection.taskIds);
      destinationTaskIds.splice(destination.index, 0, draggableId);
      updatedSections[destination.droppableId] = {
        ...destinationSection,
        taskIds: destinationTaskIds,
      };
    }

    setSections(updatedSections);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <TaskForm onTaskSubmit={addTask} />
      <KanbanContainer>
        <DragDropContext onDragEnd={handleDragEnd}>
          {Object.values(sections).map((section) => (
            <Droppable key={section.id} droppableId={section.id} type="task">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <Section section={section} tasks={tasks} onDeleteTask={deleteTask} />
                  {provided.placeholder} 
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </KanbanContainer>
    </div>
  );
};

export default Kanban;