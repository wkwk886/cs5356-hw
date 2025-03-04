import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CategoryFilter = ({ categories, selectedCategory, onChange }) => {
  return (
    <div className="category-filter my-4">
      <Tabs 
        defaultValue={selectedCategory || "all"} 
        onValueChange={(value) => onChange(value === "all" ? null : value)}
        className="w-full"
      >
        <TabsList className="w-full justify-start">
          <TabsTrigger value="all" className="px-4">
            All
          </TabsTrigger>
          
          {categories.map(category => (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className={`px-4 ${selectedCategory === category.id ? category.color : ''}`}
            >
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default CategoryFilter;