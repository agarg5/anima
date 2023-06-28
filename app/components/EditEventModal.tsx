"use client";

import { release } from "os";
import React, { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import Modal from "react-modal";
import reactNodeToString from "react-node-to-string";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

type EditEventModalProps = {
  title: React.ReactNode | undefined;
  setTitle: (newTitle: string) => void;
  release: () => void;
  deleteEvent: () => void;
};

function EditEventModal(props: EditEventModalProps) {
  const { title, setTitle, release, deleteEvent } = props;
  const [newTitle, setNewTitle] = useState(reactNodeToString(title));
  const confirmDeleteEvent = () => {
    confirmAlert({
      title: "Delete Event",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: deleteEvent,
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };
  const newTitleInput = (
    <input
      type="text"
      value={newTitle}
      onChange={(e) => setNewTitle(e.target.value)}
      onBlur={() => setTitle(newTitle || "Untitled")}
    />
  );

  return (
    <div>
      <Modal
        isOpen
        onRequestClose={release}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <button onClick={confirmDeleteEvent}>delete</button>
        <button onClick={release}>close</button>
        <form>{newTitleInput}</form>
      </Modal>
    </div>
  );
}

export default EditEventModal;
