// import React, { useState, useEffect } from "react";
// import Form from "./components/Form";
// import Card from "./components/Card";
// import Modal from "./components/Modal";
// import "./styles.css";

// export default function App() {
//   const [todos, setTodos] = useState(() => {
//     const data = localStorage.getItem("todos");
//     return data ? JSON.parse(data) : [];
//   });

//   const [editIndex, setEditIndex] = useState(null);
//   const [editingData, setEditingData] = useState(null);

//   useEffect(() => {
//     localStorage.setItem("todos", JSON.stringify(todos));
//   }, [todos]);

//   const addTodo = (data) => {
//     setTodos([...todos, data]);
//   };

//   const updateTodo = (index, updatedData) => {
//     const updated = [...todos];
//     updated[index] = updatedData;
//     setTodos(updated);
//     setEditIndex(null);
//     setEditingData(null);
//   };

//   const deleteTodo = (index) => {
//     if (confirm("Are you sure you want to delete this item?")) {
//       setTodos(todos.filter((_, i) => i !== index));
//     }
//   };

//   const startEdit = (index) => {
//     setEditIndex(index);
//     setEditingData(todos[index]);
//   };

//   return (
//     <div className="container">
//       <h1>📝 To-Do CRUD with React</h1>
//       <Form onSubmit={addTodo} />
//       <div className="cards">
//         {todos.map((todo, index) => (
//           <Card
//             key={index}
//             data={todo}
//             onEdit={() => startEdit(index)}
//             onDelete={() => deleteTodo(index)}
//           />
//         ))}
//       </div>
//       {editingData && (
//         <Modal
//           data={editingData}
//           onSave={(data) => updateTodo(editIndex, data)}
//           onClose={() => setEditingData(null)}
//         />
//       )}
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import TodoForm from "./components/TodoForm";
import TodoCard from "./components/TodoCard";
import EditModal from "./components/EditModal";

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
    showSnackbar("Todo added successfully!");
  };

  const deleteTodo = (index) => {
    const filtered = todos.filter((_, i) => i !== index);
    setTodos(filtered);
    showSnackbar("Todo deleted.");
  };

  const startEdit = (index) => {
    setEditingIndex(index);
    setEditingTodo(todos[index]);
  };

  const saveEdit = (updatedTodo) => {
    const updated = [...todos];
    updated[editingIndex] = updatedTodo;
    setTodos(updated);
    setEditingTodo(null);
    setEditingIndex(null);
    showSnackbar("Todo updated!");
  };

  const showSnackbar = (message) => {
    setSnackbar({ open: true, message });
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        React MUI To-Do App (CRUD)
      </Typography>
      <TodoForm onSubmit={addTodo} />
      <Grid container spacing={3} mt={3}>
        {todos.map((todo, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <TodoCard
              data={todo}
              onEdit={() => startEdit(index)}
              onDelete={() => deleteTodo(index)}
            />
          </Grid>
        ))}
      </Grid>
      {editingTodo && (
        <EditModal
          data={editingTodo}
          onSave={saveEdit}
          onClose={() => setEditingTodo(null)}
        />
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ open: false, message: "" })}
      >
        <Alert severity="success">{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
}

export default App;
