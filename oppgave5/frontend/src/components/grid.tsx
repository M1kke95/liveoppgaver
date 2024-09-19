import { useState } from "react";
import Student, { studentType } from "./student";
import AddStudentForm from "./addStudentForm";

interface GridProps {
    students: studentType[];
    addStudent: (newStudent: studentType) => void; 
    removeStudent: (id: string) => void;
    updateStudent: (id: string, newName: string) => void;
  }

export default function Grid({ students, addStudent, removeStudent, updateStudent }: GridProps) {
    console.log(students)
    const studentList = students.map((student) => (
      <Student 
        key={student.id} 
        id={student.id} 
        name={student.name} 
        onRemove={() => removeStudent(student.id)}
        onUpdate={updateStudent}
      />
    ));

    return(
        <div>
        <h1 className="heading">Student Grid</h1>
        <AddStudentForm onStudentAdd={addStudent}/>
        <div className="grid">{studentList}</div>
      </div>
    )
}