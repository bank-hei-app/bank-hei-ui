import React from "react";
import { Icon } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios'; // Importez axios ici



export function ActionButtons(props) {
  const {editingUser, setEditingUser, index, setEditModal, setDeleteUser} = props;

  return (
    <div id="actions">
      <ActionButton 
        icon={<EditIcon/>}
        text="Edit" 
        index={index} 
        actionType="edit"
        editingUser={editingUser}  
        setEditingUser={setEditingUser} setEditModal={setEditModal} />

    </div>
  );
}


export function ActionButton(props) {
  const {icon, text, editingUser, actionType, setEditingUser, index, setEditModal, setDeleteUser} = props;

    const click = (e, index) => {
      e.preventDefault();
      
      if(actionType === 'edit') {
        setEditingUser(index);
        setEditModal(true);
      }

      if(actionType === 'delete') {
        setDeleteUser(index);
      }
    }

  return (
    <button onClick={(e) => click(e, index)}>
      <Icon>{icon}</Icon> {text}
    </button>
  )
}
