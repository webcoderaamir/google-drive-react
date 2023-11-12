import React, { useEffect, useState } from "react";
import "./css/data.css";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
// import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { db } from "./firebase";

function Data() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    db.collection("myfiles").onSnapshot(snapshot => {
      setFiles(snapshot.docs.map(doc => ({
        id : doc.id,
        data : doc.data()
      })))
    })
  }, [])

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  return (
    <div className="data">
      <div className="data_header">
        <div className="data_headerLeft">
          <h4>My Drive</h4>
          <ArrowDropDownOutlinedIcon />
        </div>

        <div className="data_headerRight">
          <ListAltOutlinedIcon />
          <InfoOutlinedIcon />
        </div>
      </div>

      <div className="data_content">
        <div className="data_filebox">

          {
            files.map((file) => {
              return <div className="data_file">
              <InsertPhotoIcon style={{ color: "red" }} />
              <h4>{file.data.filename}</h4>
            </div>
            })
          }

          

        </div>

        <div className="data_list">

          <div className="details">
            <p><b>Name <ArrowUpwardIcon /></b></p>
            <p><b>Owner</b></p>
            <p><b>Last modified <ArrowDropDownOutlinedIcon /></b></p>
            <p><b>File size</b></p>
            <MoreVertIcon />
          </div>

          {
            files.map((file) => {
              return <div className="details">
              <p>
                <a href={file.data.fileURL} target="_blank">
                {file.data.filename} <InsertPhotoIcon style={{ color: "red" }} />
                </a>
              </p>
              <p>Me</p>
              <p>{new Date(file.data.timestamp?.seconds*1000).toUTCString()} <ArrowDropDownOutlinedIcon /></p>
              <p>{ formatBytes(file.data.size) }</p>
              <MoreVertIcon />
            </div>
            })
          }

          

        </div>
      </div>
    </div>
  );
}

export default Data;
