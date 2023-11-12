import React from 'react'
import "./css/header.css"
import SearchIcon from '@mui/icons-material/Search';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import HelpIcon from '@mui/icons-material/Help';
import SettingsIcon from '@mui/icons-material/Settings';
import AppsIcon from '@mui/icons-material/Apps';
import { Avatar } from '@mui/material';

function Header(photoURL) {
    return (
        <div class="header">
            <div className="header_logo">
                <img src="https://tse1.mm.bing.net/th?id=OIP.JsM4JQenSv5KTf-OStOCdgHaEK&pid=Api&rs=1&c=1&qlt=95&w=203&h=114" />
                <span>Drive</span>
            </div>
            <div className="header_search">
                <SearchIcon />
                <input type="text" placeholder="Search in Drive" />
                <FormatAlignCenterIcon />
            </div>
            <div className="header_icons">
                <span>
                    <HelpIcon/>
                    <SettingsIcon/>
                </span>
                <span>
                    <AppsIcon/>
                    <Avatar src={photoURL}/>
                </span>
            </div>
        </div>
    )
}

export default Header