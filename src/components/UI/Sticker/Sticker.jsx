import React from 'react';
import './Sticker.css';
import icStickerGreen from '../../../pages/ViewStudyDetails/images/ic_sticker_green.svg';
import icIncomplete from '../../../pages/ViewStudyDetails/images/ic_incomplete.svg';

const stickerClassName = 'sticker';
const Sticker = ({ completed, className }) => {
    return (
        <img src={completed ? icStickerGreen : icIncomplete} alt={completed ? 'completed' : 'incomplete'} className={`${stickerClassName} ${className}`} />

    );

};
export default Sticker;