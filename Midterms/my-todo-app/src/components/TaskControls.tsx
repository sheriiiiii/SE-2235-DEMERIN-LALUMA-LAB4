'use client';
import { useState } from 'react';
import { Task, TaskType } from "@/lib/types/Task";

interface TaskControlsProps {
    onAddTask: (task: Partial<Task>, type: TaskType) => void;
    onSearch: (query: string) => void;
    onSort: (method: 'date' | 'name' | 'id') => void;
}

export const TaskControls = ({ onAddTask, onSearch, onSort }: TaskControlsProps) => {
    const [newTask, setNewTask] = useState<Partial<Task>>({ title: '' });
    const [taskType, setTaskType] = useState<TaskType>('basic');
    const [searchQuery, setSearchQuery] = useState('');

    const handleAddTask = () => {
        if (!newTask.title) return;
        onAddTask(newTask, taskType);
        setNewTask({ title: '' });
    };

    const handleSearch = () => {
        onSearch(searchQuery);
    };

    return (
        <div className="bg-gray-700 p-4 rounded-md flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <input
                    type="text"
                    placeholder="Task title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="bg-gray-800 text-white rounded-md p-2 w-full sm:w-auto"
                />
                <input
                    type="text"
                    placeholder="Description (optional)"
                    value={newTask.description || ''}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    className="bg-gray-800 text-white rounded-md p-2 w-full sm:w-auto"
                />
                <select
                    value={taskType}
                    onChange={(e) => setTaskType(e.target.value as TaskType)}
                    className="bg-gray-800 text-white rounded-md p-2"
                >
                    <option value="basic">Basic Task</option>
                    <option value="timed">Timed Task</option>
                    <option value="checklist">Checklist Task</option>
                </select>
                {taskType === 'timed' && (
                    <input
                        type="datetime-local"
                        onChange={(e) => setNewTask({ ...newTask, dueDate: new Date(e.target.value) })}
                        className="bg-gray-800 text-white rounded-md p-2"
                    />
                )}
                <button onClick={handleAddTask} className="bg-green-500 text-white rounded-md p-2 hover:bg-green-600">
                    Add Task
                </button>
            </div>

            <div className="flex items-center gap-4">
                <input
                    type="text"
                    placeholder="Search tasks"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-gray-800 text-white rounded-md p-2 w-full sm:w-auto"
                />
                <button onClick={handleSearch} className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600">
                    Search
                </button>
                <label className="text-white">Sort by:</label>
                <select
                    onChange={(e) => onSort(e.target.value as 'date' | 'name' | 'id')}
                    className="bg-gray-800 text-white rounded-md p-2"
                >
                    <option value="date">Due Date</option>
                    <option value="name">Name</option>
                    <option value="id">ID</option>
                </select>
            </div>
        </div>
    );
};