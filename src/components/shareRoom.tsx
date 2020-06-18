import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button } from '@material-ui/core';

const ShareRoom: React.FC = () => {
    const roomUrl = window.location.href;
    return(
        <CopyToClipboard text={roomUrl}>
            <Button>Copy</Button>
        </CopyToClipboard>
    )
}

export default ShareRoom;