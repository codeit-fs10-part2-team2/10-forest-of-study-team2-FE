import React from 'react';
import icStickerGreen from '/assets/images/icons/ic_sticker_green.svg';
import icIncomplete from '/assets/images/icons/ic_incomplete.svg';
import styles from './Sticker.module.css';

const Sticker = ({ completed, className }) => {
    return (
        <img src={completed ? icStickerGreen : icIncomplete} alt={completed ? 'completed' : 'incomplete'} className={className || styles.stickerIcon} />

    );

};
export default Sticker;
