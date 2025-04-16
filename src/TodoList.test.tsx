import { fireEvent, render , screen } from "@testing-library/react";
import TodoList from "./todolist";
import React from "react";

test ('render todolist and allows adding todo' , ()=>{
    render(<TodoList/>)

    const input = screen.getByPlaceholderText(/add a task/i);
    const addButton = screen.getByText('+');

    fireEvent.change(input, {target: {value : 'new task'}});
    fireEvent.click(addButton);

    expect(screen.getByText(/new task/i)).toBeInTheDocument();
})

test('allows completing and deleting todos' , ()=>{
    render(<TodoList/>)
    const input = screen.getByPlaceholderText(/Add a new task/i);  
    const addButton = screen.getByText('+');  
  
    fireEvent.change(input, { target: { value: 'Task to complete' } });  
    fireEvent.click(addButton);  
  
    const completeButton = screen.getByText(/complete/i);  
    fireEvent.click(completeButton);  
    expect(completeButton).toHaveTextContent(/uncomplete/i);  
  
    const deleteButton = screen.getByRole('button', { name: /🗑️/ });  
    fireEvent.click(deleteButton);  
    expect(screen.queryByText(/Task to complete/i)).not.toBeInTheDocument(); 
})