import React, { FC, CSSProperties } from "react";
import { find } from "node-emoji";

import "./userCard.scss";
import "./bigEmoji.scss";

interface BigEmojiProps {
  emoji: string;
  style?: CSSProperties;
}

const BigEmoji: FC<BigEmojiProps> = ({ emoji, style }) => {
  return (
    <div className="bigemoji" style={style}>
      {find(emoji)?.emoji}
    </div>
  );
};

export default BigEmoji;
