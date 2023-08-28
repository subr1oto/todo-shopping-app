// TodoList.tsx
import React, { useState } from 'react';
import { useAppContext } from '../helpers/context';
import { Task } from '../interfaces';

const TodoList: React.FC = () => {
    const { state, dispatch } = useAppContext();
    const [newTask, setNewTask] = useState<string>(''); // Provide a type for newTask

    const handleAddTask = () => {
        // Add new task to the list using dispatch
        const newTaskData = {
            id: Date.now(),
            text: newTask,
            completed: false,
        };
        dispatch({ type: 'ADD_TASK', payload: newTaskData });
        setNewTask('');
    };

    const handleToggleTask = (taskId: number) => {
        // Toggle task completion status
        dispatch({ type: 'TOGGLE_TASK', payload: taskId });
    };

    const handleRemoveTask = (taskId: number) => {
        // Remove task from the list
        dispatch({ type: 'REMOVE_TASK', payload: taskId });
    };

    const totalTasks = state.tasks.length;
    const completedTasks = state.tasks.filter(task => task.completed).length;

    return (
        <div>
            <h2>To-Do List</h2>
            {/* Display total tasks and completed tasks count */}
            <p>Total Tasks: {totalTasks}</p>
            <p>Completed Tasks: {completedTasks}</p>
            <ul>
                {state.tasks.map((task: Task) => (
                    <li key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleToggleTask(task.id)}
                        />
                        {task.text}
                        <button onClick={() => handleRemoveTask(task.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            {/* Render the input and button for adding tasks */}
            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
            />
            <button onClick={handleAddTask}>Add Task</button>
        </div>
    );
};

export default TodoList;
