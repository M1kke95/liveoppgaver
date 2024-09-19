import { useState } from "react";
import Avatar from "./avatar"

export type studentType = {
    id: string,
    name: string
}

interface StudentProps extends studentType{
    onRemove: () => void;
    onUpdate: (id: string, newName: string) => void;
}

export default function Student(props: StudentProps){
    const [isHovered, setIsHovered] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(props.name);
    const { id, name, onRemove, onUpdate } = props;


    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedName(event.target.value);
      };

      const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (onUpdate) {
            onUpdate(id, editedName); 
        }
        setIsEditing(false);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    return(
        <div className="student-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
            <h2>{id}</h2>
            {isEditing ? (
                <form onSubmit={handleSubmit} className="name-edit-form">
                    <input
                        type="text"
                        value={editedName}
                        onChange={handleNameChange}
                        placeholder="Enter student name"
                        required
                    />
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                </form>
            ) : (
                <h3 onClick={handleEditClick}>{name}</h3>
            )}
            <Avatar name={name} id={id}/>
            {isHovered && (
                <button className="delete-button" onClick={onRemove}>Delete</button>
      )}
        </div>
    )
}