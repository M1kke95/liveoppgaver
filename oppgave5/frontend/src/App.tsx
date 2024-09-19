import { useEffect, useState } from "react";
import Grid from "./components/grid";
import Student, { studentType } from "./components/student";
import TotalStudents from "./components/total"

const initialStudents: studentType[] = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
  { id: "3", name: "Charlie" },
];




function App() {
  const [students, setStudents] = useState(initialStudents);


  useEffect(() => {
    const fetchStudents = async () => {
        const response = await fetch("http//:localhost:3999/api/students");
        const data = await response.json(); 
        setStudents(data);
      
    }
    fetchStudents();
  }, [])


  const addStudent = (newStudent: studentType) => {
    setStudents((prevStudents) => [...prevStudents, newStudent]);
  };

  const removeStudent = (id: string) => {
    setStudents((prevStudents) => prevStudents.filter(student => student.id !== id));
  };

  const updateStudent = (id: string, newName: string) => {
    setStudents((prevStudents) =>
      prevStudents.map(student =>
        student.id === id ? { ...student, name: newName } : student
      )
    );
  };

  return (
    <>
    <main>
        <h1>Start</h1>
        <Grid students={students} addStudent={addStudent} removeStudent={removeStudent} updateStudent={updateStudent}/>
        <TotalStudents total={students.length}/>
      </main>
    </>
  );
}

export default App;
