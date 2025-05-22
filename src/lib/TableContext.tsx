"use client";
import React, { createContext, useContext, useState } from "react";
import { initialData, type Article } from "./articleData";

interface TableContextType {
  data: Article[];
  updateData: (id: string, updatedFields: Partial<Article>) => void;
  deleteData: (id: string) => void;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

export const TableProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<Article[]>(initialData);

  const updateData = (id: string, updatedFields: Partial<Article>) => {
    setData(prev =>
      prev.map(row => (row.id === id ? { ...row, ...updatedFields } : row))
    );
    // console.log(data)
  };

  const deleteData = (id: string) => {
    setData(prev => prev.filter(row => row.id !== id));
  };

  return (
    <TableContext.Provider
      value={{
        data,
        updateData,
        deleteData,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export const useTableContext = () => {
  const context = useContext(TableContext);
  if (!context) throw new Error("useTableContext must be used within a TableProvider");
  return context;
};
