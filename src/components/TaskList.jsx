import React from 'react';
import DatePicker from './DatePicker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TaskList = ({ tasks, categories, onToggleComplete, onDelete, onUpdateDueDate, onUpdateCategory }) => {
  // 获取类别名称的辅助函数
  const getCategoryById = (categoryId) => {
    return categories.find(cat => cat.id === categoryId) || { name: '', color: '' };
  };

  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p className="empty-message">No tasks yet. Add one above!</p>
      ) : (
        tasks.map(task => {
          const category = getCategoryById(task.categoryId);
          
          return (
            <div key={task.id} className={`task p-3 mb-2 border rounded-md ${category.color}`}>
              <div className="task-content flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggleComplete(task.id)}
                  className="w-4 h-4"
                />
                <span className={task.completed ? 'completed line-through' : ''}>
                  {task.text}
                </span>
              </div>
              
              <div className="task-actions flex items-center gap-2 mt-2">
                <div className="flex-1">
                  <Select value={task.categoryId} onValueChange={(value) => onUpdateCategory(task.id, value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <DatePicker 
                  date={task.dueDate} 
                  onDateChange={(date) => onUpdateDueDate(task.id, date)} 
                />
                
                <button onClick={() => onDelete(task.id)} className="delete-btn p-1">
                  Delete
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default TaskList;