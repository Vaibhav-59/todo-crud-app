// import React, { useState } from "react";

// export default function Modal({ data, onSave, onClose }) {
//   const [form, setForm] = useState(data);

//   const handleChange = (e) => {
//     const { name, value, type, checked, files } = e.target;
//     if (type === "checkbox") {
//       setForm((prev) => ({
//         ...prev,
//         features: checked
//           ? [...prev.features, value]
//           : prev.features.filter((f) => f !== value),
//       }));
//     } else if (type === "file") {
//       const file = files[0];
//       if (file && file.type.startsWith("image/")) {
//         const reader = new FileReader();
//         reader.onload = () => {
//           setForm((prev) => ({ ...prev, image: file, imagePreview: reader.result }));
//         };
//         reader.readAsDataURL(file);
//       } else {
//         alert("Invalid image");
//       }
//     } else {
//       setForm((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!form.title.trim()) {
//       alert("Title is required");
//       return;
//     }
//     onSave(form);
//   };

//   return (
//     <div className="modal">
//       <form onSubmit={handleSubmit}>
//         <h2>Edit Todo</h2>
//         <input name="title" value={form.title} onChange={handleChange} required />

//         <label><input type="checkbox" value="Urgent" checked={form.features.includes("Urgent")} onChange={handleChange} /> Urgent</label>
//         <label><input type="checkbox" value="Important" checked={form.features.includes("Important")} onChange={handleChange} /> Important</label>

//         <label><input type="radio" name="status" value="active" checked={form.status === "active"} onChange={handleChange} /> Active</label>
//         <label><input type="radio" name="status" value="done" checked={form.status === "done"} onChange={handleChange} /> Done</label>

//         <input type="file" accept="image/*" onChange={handleChange} />
//         {form.imagePreview && <img src={form.imagePreview} alt="preview" className="preview" />}

//         <button type="submit">Save</button>
//         <button type="button" onClick={onClose}>Cancel</button>
//       </form>
//     </div>
//   );
// }
import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Stack,
  Typography,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function EditModal({ data, onSave, onClose }) {
  const [text, setText] = useState(data.text);

  const handleSave = () => {
    if (text.trim() === "") return alert("Text is required");
    onSave({ ...data, text });
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" gutterBottom>
          Edit Todo
        </Typography>
        <Stack spacing={2}>
          <TextField
            fullWidth
            label="Todo Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}

export default EditModal;