import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TaskForm = ({ onAddTask, categories }) => {
  const [text, setText] = useState('');
  const [categoryId, setCategoryId] = useState('personal');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTask(text, categoryId);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form flex items-center gap-2 mb-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 p-2 border rounded"
        required
      />
      
      <Select value={categoryId} onValueChange={setCategoryId}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map(category => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Button type="submit">Add Task</Button>
    </form>
  );
};

export default TaskForm;