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

import { Button, Dialog, DialogTitle, DialogActions } from "@material-ui/core";
import { roomsMock } from "../mocks/rooms";

const Room: React.FC = () => {
  const [rooms, setRooms] = useState<RoomEntity[]>(roomsMock);
  const [playingVideo, playVideo] = useState<VideoEntity>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      await getUser();
      const rooms = await getRooms();
      setRooms(rooms);
      checkRooms(rooms);
    })();
  }, []);

  const handleClose = () => {
    setOpen(false);
  }

  const joinRoom = (e:any) => {
    e.preventDefault();
    patchRoom(rooms);
  }

  function checkRooms(rooms: RoomEntity[]) {
    const roomcode = window.location.href.split('/')[4];
    console.log("checkRooms");
    //user의 room 가입여부 확인
    if(rooms.find(room => room.invite_code === roomcode )){
      console.log("already join");
    }
    else{
      console.log("alert dialog");
      //console.log(rooms);
      patchRoom(rooms);
      //setOpen(true);
      //handleClose();
    }
  }
  return (
    <>
      <div
        className="content"
        style={{ height: "calc(100vh - 56px)", overflow: "scroll" }}
      >
        <LogoBar />
        <ShareRoom/>
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

/**
 *         <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{"Do you want to join in this room?"}</DialogTitle>
        <DialogActions>
          <Button onClick={joinRoom}>Yes</Button>
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>
 */