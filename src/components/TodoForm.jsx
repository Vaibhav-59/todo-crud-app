// import React, { useState } from "react";

// export default function Form({ onSubmit }) {
//   const [form, setForm] = useState({
//     title: "",
//     features: [],
//     status: "active",
//     image: null,
//     imagePreview: null,
//   });

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
//         alert("Please select a valid image.");
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
//     onSubmit(form);
//     setForm({
//       title: "",
//       features: [],
//       status: "active",
//       image: null,
//       imagePreview: null,
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="form">
//       <input
//         type="text"
//         name="title"
//         placeholder="Enter task title"
//         value={form.title}
//         onChange={handleChange}
//         required
//       />
//       <br /><br />
//       <label>Features:</label>
//       <label><input type="checkbox" value="Urgent" onChange={handleChange} /> Urgent </label>
//       <label><input type="checkbox" value="Important" onChange={handleChange} /> Important</label>
//       <br /><br />
//       <label>Status:</label>
//       <label><input type="radio" name="status" value="active" checked={form.status === "active"} onChange={handleChange} /> Active</label>
//       <label><input type="radio" name="status" value="done" checked={form.status === "done"} onChange={handleChange} /> Done</label>
//       <br /><br />
//       <input type="file" name="image" accept="image/*" onChange={handleChange} />

//       {form.imagePreview && <img src={form.imagePreview} alt="preview" className="preview" />}

//       <button type="submit">Add Todo</button>
//     </form>
//   );
// }
import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Typography,
  Stack,
} from "@mui/material";

function TodoForm({ onSubmit }) {
  const [text, setText] = useState("");
  const [features, setFeatures] = useState({ urgent: false, important: false });
  const [status, setStatus] = useState("pending");
  const [image, setImage] = useState(null);

  const handleCheckboxChange = (e) => {
    setFeatures({ ...features, [e.target.name]: e.target.checked });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") return alert("Text field is required");
    onSubmit({ text, features, status, image });
    setText("");
    setFeatures({ urgent: false, important: false });
    setStatus("pending");
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Todo Title"
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />

        <div>
          <Typography variant="subtitle1">Preferences</Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={features.urgent}
                onChange={handleCheckboxChange}
                name="urgent"
              />
            }
            label="Urgent"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={features.important}
                onChange={handleCheckboxChange}
                name="important"
              />
            }
            label="Important"
          />
        </div>

        <div>
          <Typography variant="subtitle1">Status</Typography>
          <RadioGroup
            row
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <FormControlLabel
              value="pending"
              control={<Radio />}
              label="Pending"
            />
            <FormControlLabel
              value="done"
              control={<Radio />}
              label="Done"
            />
          </RadioGroup>
        </div>

        <Button variant="contained" component="label">
          Upload Image
          <input type="file" hidden onChange={handleImageChange} />
        </Button>
        {image && <img src={image} alt="preview" width={100} />}

        <Button variant="contained" type="submit">
          Add Todo
        </Button>
      </Stack>
    </form>
  );
}

export default TodoForm;