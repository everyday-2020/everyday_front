import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button } from '@material-ui/core';
import { ReactComponent as ShareIcon } from "../shareIcon.svg";

const ShareRoom: React.FC = () => {
    const roomUrl = window.location.href;
    return(
        <CopyToClipboard text={roomUrl}>
            <Button><ShareIcon/></Button>
        </CopyToClipboard>
    )
}

export default ShareRoom;