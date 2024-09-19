import React, { useState } from "react";

interface AddStudentFormProps {
  onStudentAdd: (newStudent: { id: string; name: string }) => void;
}

export default function AddStudentForm({onStudentAdd}: AddStudentFormProps){

    const [name, setName] = useState('')

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
    

    if(name.trim()){
        const newStudent = { id: Date.now().toString(), name}
        console.log("Adding new student", newStudent)
        onStudentAdd(newStudent)
        setName('');
    }

    }
    return (
        <form onSubmit={handleSubmit} className="add-student-form">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter student name"
            required
          />
          <button type="submit">Add Student</button>
        </form>
      );

}
