
/**TaskCard → individual task UI inside ProjectDetails */

function TaskCard({ task, onEdit, onDelete, onToggle }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "12px",
        borderRadius: "8px",
        marginBottom: "10px",
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* Title */}
      <h4>{task.title}</h4>

      {/* Description */}
      <p>{task.description || "No description provided"}</p>

      {/* Status */}
      <p>
        Status:{" "}
        <strong style={{ color: task.status === "completed" ? "green" : "orange" }}>
          {task.status || "pending"}
        </strong>
      </p>

      {/* Created Date */}
      <small>
        Created: {new Date(task.createdAt).toLocaleDateString()}
      </small>

      {/* Actions */}
      <div style={{ marginTop: "10px", display: "flex", gap: "8px" }}>
        <button onClick={onToggle}>
          {task.status === "completed" ? "Mark Pending" : "Mark Done"}
        </button>

        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}

export default TaskCard;