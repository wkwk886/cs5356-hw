import React from 'react';
import useLocalStorageState from 'use-local-storage-state';
import { Button } from "@/components/ui/button";

import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskStats from './components/TaskStats';
import CategoryFilter from './components/CategoryFilter';
import './styles.css';

// 定义类别
const CATEGORIES = [
  { id: 'work', name: 'Work', color: 'bg-blue-100' },
  { id: 'personal', name: 'Personal', color: 'bg-green-100' },
  { id: 'health', name: 'Health', color: 'bg-red-100' },
  { id: 'finance', name: 'Finance', color: 'bg-yellow-100' }
];

const initialTasks = [
  { id: 1, text: 'Refill food bowl before yowling begins', completed: false, dueDate: null, categoryId: 'personal' },
  { id: 2, text: 'Schedule vet visit, prepare for betrayal', completed: false, dueDate: null, categoryId: 'health' },
  { id: 3, text: 'Remove cat from keyboard (again)', completed: true, dueDate: null, categoryId: 'work' },
];

const App = () => {
  const [tasks, setTasks] = useLocalStorageState('tasks', { defaultValue: initialTasks });
  const [selectedCategory, setSelectedCategory] = useLocalStorageState('selectedCategory', { defaultValue: null }); 

  const addTask = (text, categoryId = 'personal') => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
      dueDate: null,
      categoryId
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const updateTaskDueDate = (taskId, dueDate) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, dueDate } : task
    ));
  };

  const updateTaskCategory = (taskId, categoryId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, categoryId } : task
    ));
  };

  // 过滤任务列表
  const filteredTasks = selectedCategory 
    ? tasks.filter(task => task.categoryId === selectedCategory)
    : tasks;

  return (
    <main>
      <h1>Task Manager</h1>
      <div className="text-amber-800 font-bold">Hello Tailwind 3.4</div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
        <Button>Click me</Button>
      </div>
      
      <TaskForm onAddTask={addTask} categories={CATEGORIES} />
      
      <CategoryFilter 
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onChange={setSelectedCategory}
      />
      
      <TaskList
        tasks={filteredTasks}
        categories={CATEGORIES}
        onToggleComplete={toggleComplete}
        onDelete={deleteTask}
        onUpdateDueDate={updateTaskDueDate}
        onUpdateCategory={updateTaskCategory}
      />
      
      <TaskStats tasks={filteredTasks} />
    </main>
  );
};

export default App;