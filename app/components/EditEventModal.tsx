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
    minHeight: "200px",
    minWidth: "200px",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
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

  const deleteButton = (
    <button
      onClick={confirmDeleteEvent}
      className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded m-2"
    >
      Delete
    </button>
  );

  const closeButton = (
    <button
      onClick={release}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
    >
      Close
    </button>
  );

  const eventTitleInput = (
    <div className="mb-6">
      <label
        htmlFor="large-input"
        className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
      >
        Event Title
      </label>
      <input
        type="text"
        id="large-input"
        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        onBlur={() => setTitle(newTitle || "Untitled")}
      />
    </div>
  );

  return (
    <div>
      <Modal
        isOpen
        onRequestClose={release}
        contentLabel="Example Modal"
        style={customStyles}
        shouldCloseOnOverlayClick
      >
        {deleteButton}
        {closeButton}
        {eventTitleInput}
      </Modal>
    </div>
  );
}

export default EditEventModal;
