// import React from "react";

// export default function Card({ data, onEdit, onDelete }) {
//   return (
//     <div className="card">
//       {data.imagePreview && <img src={data.imagePreview} alt="todo" />}
//       <h3>{data.title}</h3>
//       <p><strong>Status:</strong> {data.status}</p>
//       <p><strong>Features:</strong> {data.features.join(", ")}</p>
//       <div className="card-buttons">
//         <button onClick={onEdit}>Edit</button>
//         <button onClick={onDelete} className="delete">Delete</button>
//       </div>
//     </div>
//   );
// }
import React from "react";
import { Card, CardContent, Typography, Button, Stack } from "@mui/material";

function TodoCard({ data, onEdit, onDelete }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{data.text}</Typography>
        <Typography>Urgent: {data.features?.urgent ? "Yes" : "No"}</Typography>
        <Typography>
          Important: {data.features?.important ? "Yes" : "No"}
        </Typography>
        <Typography>Status: {data.status}</Typography>
        {data.image && <img src={data.image} alt="todo" width={150} />}
        <Stack direction="row" spacing={2} mt={2}>
          <Button variant="outlined" onClick={onEdit}>
            Edit
          </Button>
          <Button variant="outlined" color="error" onClick={onDelete}>
            Delete
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default TodoCard;