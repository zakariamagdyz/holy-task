import React from "react";
import Modal from "@mui/material/Modal";
import { useDispatch, useEditMode } from "../store/store-context";
import { setEditModeOff } from "../store/actions";
import EditView from "./EditView";

const EditModel: React.FC<{}> = () => {
  const { mode } = useEditMode();
  const dispatch = useDispatch();

  return (
    <Modal
      open={mode === "ON" ? true : false}
      onClose={() => dispatch(setEditModeOff())}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
      data-testid="modal"
    >
      <>
        <EditView />
      </>
    </Modal>
  );
};

export default EditModel;
