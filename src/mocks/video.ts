import { VideoEntity } from "../types/entities";

export const vids: VideoEntity[] = [
  {
    id: 1,
    created_at: "2020-3-14",
    modified_at: "2020-3-14",
    clicks: 1,
    length: 300,
    user: {
      id: 1,
      created_at: "2020-3-14",
      modified_at: "2020-3-14",
      nickname: "주승",
      username: "test",
      profile_pic: "dog",
    },
    clip: {
      url: process.env.PUBLIC_URL + "/video-3.mp4",
      thumb: { url: process.env.PUBLIC_URL + "/thumbnail.jpg" },
    },
  },
  {
    id: 2,
    created_at: "2020-3-14",
    modified_at: "2020-3-14",
    clicks: 2,
    length: 300,
    user: {
      id: 2,
      created_at: "2020-3-14",
      modified_at: "2020-3-14",
      nickname: "회문",
      username: "test",
      profile_pic: "dog",
    },
    clip: {
      url: process.env.PUBLIC_URL + "/video-3.mp4",
      thumb: { url: process.env.PUBLIC_URL + "/thumbnail.jpg" },
    },
  },
  {
    id: 3,
    created_at: "2020-3-14",
    modified_at: "2020-3-14",
    clicks: 3,
    length: 300,
    user: {
      id: 6,
      created_at: "2020-3-14",
      modified_at: "2020-3-14",
      nickname: "사은",
      username: "test",
      profile_pic: "dog",
    },

    clip: {
      url: process.env.PUBLIC_URL + "/video-3.mp4",
      thumb: { url: process.env.PUBLIC_URL + "/thumbnail.jpg" },
    },
  },
];

export const vids2: VideoEntity[] = [
  {
    id: 4,
    created_at: "2020-3-14",
    modified_at: "2020-3-14",
    clicks: 1,
    length: 300,
    user: {
      id: 1,
      created_at: "2020-3-14",
      modified_at: "2020-3-14",
      nickname: "사은",
      username: "test",
      profile_pic: "dog",
    },

    clip: {
      url: process.env.PUBLIC_URL + "/video-3.mp4",
      thumb: { url: process.env.PUBLIC_URL + "/thumbnail.jpg" },
    },
  },
  {
    id: 5,
    created_at: "2020-3-14",
    modified_at: "2020-3-14",
    clicks: 2,
    length: 300,
    user: {
      id: 2,
      created_at: "2020-3-14",
      modified_at: "2020-3-14",
      nickname: "펭수",
      username: "test",
      profile_pic: "dog",
    },

    clip: {
      url: process.env.PUBLIC_URL + "/video-3.mp4",
      thumb: { url: process.env.PUBLIC_URL + "/thumbnail.jpg" },
    },
  },
  {
    id: 6,
    created_at: "2020-3-14",
    modified_at: "2020-3-14",
    clicks: 3,
    length: 300,
    user: {
      id: 6,
      created_at: "2020-3-14",
      modified_at: "2020-3-14",
      nickname: "유리",
      username: "test",
      profile_pic: "dog",
    },

    clip: {
      url: process.env.PUBLIC_URL + "/video-3.mp4",
      thumb: { url: process.env.PUBLIC_URL + "/thumbnail.jpg" },
    },
  },
  {
    id: 7,
    created_at: "2020-3-14",
    modified_at: "2020-3-14",
    clicks: 10,
    length: 300,
    user: {
      id: 1,
      created_at: "2020-3-14",
      modified_at: "2020-3-14",
      nickname: "샐리",
      username: "test",
      profile_pic: "dog",
    },

    clip: {
      url: process.env.PUBLIC_URL + "/video-3.mp4",
      thumb: { url: process.env.PUBLIC_URL + "/thumbnail.jpg" },
    },
  },
  {
    id: 8,
    created_at: "2020-3-14",
    modified_at: "2020-3-14",
    clicks: 20,
    length: 300,
    user: {
      id: 2,
      created_at: "2020-3-14",
      modified_at: "2020-3-14",
      nickname: "회문",
      username: "test",
      profile_pic: "dog",
    },

    clip: {
      url: process.env.PUBLIC_URL + "/video-3.mp4",
      thumb: { url: process.env.PUBLIC_URL + "/thumbnail.jpg" },
    },
  },
  {
    id: 9,
    created_at: "2020-3-14",
    modified_at: "2020-3-14",
    clicks: 30,
    length: 300,
    user: {
      id: 6,
      created_at: "2020-3-14",
      modified_at: "2020-3-14",
      nickname: "브라운",
      username: "test",
      profile_pic: "dog",
    },

    clip: {
      url: process.env.PUBLIC_URL + "/video-3.mp4",
      thumb: { url: process.env.PUBLIC_URL + "/thumbnail.jpg" },
    },
  },
  {
    id: 10,
    created_at: "2020-3-14",
    modified_at: "2020-3-14",
    clicks: 1,
    length: 300,
    user: {
      id: 1,
      created_at: "2020-3-14",
      modified_at: "2020-3-14",
      nickname: "주승",
      username: "test",
      profile_pic: "dog",
    },

    clip: {
      url: process.env.PUBLIC_URL + "/video-3.mp4",
      thumb: { url: process.env.PUBLIC_URL + "/thumbnail.jpg" },
    },
  },
  {
    id: 11,
    created_at: "2020-3-14",
    modified_at: "2020-3-14",
    clicks: 2,
    length: 300,
    user: {
      id: 2,
      created_at: "2020-3-14",
      modified_at: "2020-3-14",
      nickname: "어피치",
      username: "test",
      profile_pic: "dog",
    },
    clip: {
      url: process.env.PUBLIC_URL + "/video-3.mp4",
      thumb: { url: process.env.PUBLIC_URL + "/thumbnail.jpg" },
    },
  },
  {
    id: 12,
    created_at: "2020-3-14",
    modified_at: "2020-3-14",
    clicks: 3,
    length: 300,
    user: {
      id: 6,
      created_at: "2020-3-14",
      modified_at: "2020-3-14",
      nickname: "라이언",
      username: "test",
      profile_pic: "dog",
    },

    clip: {
      url: process.env.PUBLIC_URL + "/video-3.mp4",
      thumb: { url: process.env.PUBLIC_URL + "/thumbnail.jpg" },
    },
  },
];
