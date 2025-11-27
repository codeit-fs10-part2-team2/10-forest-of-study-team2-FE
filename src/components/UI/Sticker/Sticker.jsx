import React from 'react';
import styles from './Sticker.module.css';

const icStickerGreen = '/images/icon/ic_sticker_green.svg';
const icIncomplete = '/images/icon/ic_incomplete.svg';

const Sticker = ({ completed, className }) => {
    return (
        <img src={completed ? icStickerGreen : icIncomplete} alt={completed ? 'completed' : 'incomplete'} className={className || styles.stickerIcon} />

    );

};
export default Sticker;