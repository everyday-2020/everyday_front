import React, { FC } from "react";
import { find } from "node-emoji";

import "./userCard.scss";
import './bigEmoji.scss'

interface BigEmojiProps {
  emoji: string;
  fontSize?: string;
  width?: string;
  backgroundColor?: string;
}

const BigEmoji: FC<BigEmojiProps> = ({
  emoji,
  fontSize,
  width,
  backgroundColor,
}) => {
  return (
    <div
      className="bigemoji"
      style={{
        fontSize,
        width,
        height: width,
        backgroundColor,
      }}
    >
      {find(emoji)?.emoji}
    </div>
  );
};

export default BigEmoji;
