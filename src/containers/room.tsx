import React, { useState, useEffect } from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";

import DateBoard from "../components/dateboard";
import { vids2, vids } from "../mocks/video";
import LogoBar from "../components/logobar";
import VideoSelect from "./videoSelect";
import { VideoEntity } from "../types/entities";
import VideoPlayer from "../components/videoPlayer";
import ShareRoom from "../components/shareRoom";
import { RoomEntity } from "../types/entities";
import { getUser, patchRoom, getRooms } from "../api";
import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core"
import { roomsMock } from "../mocks/rooms";

const Room: React.FC = () => {
  const [rooms, setRooms] = useState<RoomEntity[]>(roomsMock);
  const [playingVideo, playVideo] = useState<VideoEntity>();

  useEffect(() => {
    (async () => {
      await getUser();
      const rooms = await getRooms();
      setRooms(rooms);
      checkRooms(rooms);
    })();
  }, []);

  const checkRooms = (rooms: RoomEntity[]) => {
    const roomcode = window.location.href.split('/')[4];
    console.log("checkRooms");
    //user의 room 가입여부 확인
    if(rooms.find(room => room.invite_code === roomcode )){
      console.log("already join");
    }
    else{
      setOpen(true);
    }
  }

  const [open, setOpen] = useState(false);
  
  const handleClickYes = () => {
    patchRoom(rooms)
    handleClose();
  }
  const handleClose = () => {
    setOpen(false);
  }
  return (
    <>
      <div
        className="content"
        style={{ height: "calc(100vh - 56px)", overflow: "scroll" }}
      >
        <LogoBar />
        <ShareRoom/>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            {"join in this room?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClickYes}>Yes</Button>
            <Button onClick={handleClose}>No</Button>
          </DialogActions>
        </Dialog>
        <DateBoard
          date={new Date(2020, 4, 22)}
          videos={vids}
          playVideo={playVideo}
        />
        <DateBoard
          date={new Date(2020, 4, 21)}
          videos={vids2}
          playVideo={playVideo}
        />
      </div>
      <BottomNavigation
        style={{ position: "sticky", bottom: 0, backgroundColor: "#f0f0f0" }}
        showLabels
      >
        <VideoSelect />
      </BottomNavigation>
      {playingVideo && (
        <VideoPlayer video={playingVideo} playVideo={playVideo} />
      )}
    </>
  );
};

export default Room;