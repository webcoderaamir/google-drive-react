import React, { useState } from "react";
import "./css/sidebar.css";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import MobileScreenShareOutlinedIcon from "@mui/icons-material/MobileScreenShareOutlined";
import DevicesIcon from "@mui/icons-material/Devices";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";
import CloudQueueOutlinedIcon from "@mui/icons-material/CloudQueueOutlined";
import { db, storage } from "./firebase";
import firebase from "./firebase";

function Sidebar() {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (e) => {
    if(e.target.files[0]){
      setFile(e.target.files[0])
      // console.log(file)
    }
  };

  const handleUpload = (event) => {
    event.preventDefault(); 
    setUploading(true); 
      
    storage.ref(`files/${file.name}`).put(file).then(snapshot=>{
      storage.ref("files").child(file.name).getDownloadURL().then(url => {
        db.collection("myfiles").add({
          timestamp : firebase.firestore.FieldValue.serverTimestamp(),
          filename : file.name,
          fileURL : url,
          size : snapshot._delegate.bytesTransferred
        })

        setUploading(false);
        setFile(null);
        setOpen(false);
      })
    })
  };

  return (
    <>
      <Modal open = {open} onClose = {handleClose}>
        <div className="modal_layer">

          <form onSubmit={handleUpload} >
            <div className="modal_heading">
              <h3>Select file you want to upload</h3>
            </div>

            <div className="modal_body">
              { uploading ? ( <p className="uploading">uploading</p>) : (
                <>
                  <input type="file" onChange={handleChange} className="file" />
                  <input type="submit" className="submit_post" />
                </>
              )}
            </div>
          </form>

        </div>
      </Modal>

      <div className="sidebar">
        <div className="sidebar_btn">
          <button onClick = {handleOpen}>
            <AddIcon />
            <span>New</span>
          </button>
        </div>

        <div className="sidebar_options">
          <div className="sidebar_option sidebar_option-Active">
            <MobileScreenShareOutlinedIcon />
            <span>
              <b>My Drive</b>
            </span>
          </div>

          <div className="sidebar_option">
            <DevicesIcon />
            <span>Computers</span>
          </div>

          <div className="sidebar_option">
            <PeopleOutlineOutlinedIcon />
            <span>Shared with me</span>
          </div>

          <div className="sidebar_option">
            <QueryBuilderOutlinedIcon />
            <span>Recent</span>
          </div>

          <div className="sidebar_option">
            <StarBorderOutlinedIcon />
            <span>Starred</span>
          </div>

          <div className="sidebar_option">
            <ErrorOutlineOutlinedIcon />
            <span>Spam</span>
          </div>

          <div className="sidebar_option">
            <DeleteSweepOutlinedIcon />
            <span>Bin</span>
          </div>

          <hr />

          <div className="sidebar_option">
            <CloudQueueOutlinedIcon />
            <span>Storage</span>
          </div>

          <div className="progress_bar">
            <progress size="tiny" value="60" max="100" />
            <span>8.62 GB of 15 GB used</span>
          </div>

          <button className="button2">
            <h1>Get more storage</h1>
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
