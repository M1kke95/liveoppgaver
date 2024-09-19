import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

const initialStudents = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
  { id: "3", name: "Charlie" },
];

const app = new Hono()
app.use("*", cors());

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/api/students', (c) =>{
  return c.json(initialStudents);
})

app.post('/api/students', async (c)=> {
  const newStudent = await c.req.json();
  initialStudents.push(newStudent)
  return c.json({message: 'Student added!: ', student: newStudent}, 201)
})

app.delete('/api/students/:id', async (c) => {
  const studentId = c.req.param('id')

  const studentIndex = initialStudents.findIndex((student => student.id === studentId))
  if(studentIndex === -1){
    return c.json({message: "student not found"}, 404)
  }

  initialStudents.splice(studentIndex, 1)

  return c.json({message: "Student Deleted", studentId}, 201)

})

app.patch('/api/students/:id', async (c) => {
  const studentId = c.req.param('id')
  const {name} = await c.req.json();

  const studentIndex = initialStudents.findIndex((student => student.id === studentId))
  if(studentIndex !== -1){
    initialStudents[studentIndex].name = name;
    return c.json({message: 'name has been changed successfully', student: initialStudents[studentIndex]}, 201)
  }else{
    return c.json({message: "student not found"}, 404)
  }

})

const port = 3999
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
