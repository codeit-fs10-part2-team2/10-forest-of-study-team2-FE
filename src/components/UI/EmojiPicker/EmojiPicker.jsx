import React, { useState, useRef, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import Button from '../Button/Button';
import styles from './EmojiPicker.module.css';

const EmojiPickerButton = ({ onEmojiSelect }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [emojiPickerPosition, setEmojiPickerPosition] = useState({ top: 0, right: 0, left: 'auto' });
  const emojiPickerRef = useRef(null);
  const addButtonRef = useRef(null);

  const handleAddEmoji = () => {
    if (!showEmojiPicker && addButtonRef.current) {
      const rect = addButtonRef.current.getBoundingClientRect();                      // get the bounding client rect of the add button
      
      const mainContent = document.querySelector('[data-main-content]');                    // get the main-content element
      const mainContentRect = mainContent ? mainContent.getBoundingClientRect() : null;            // get the bounding client rect of the main-content
      const leftPosition = mainContentRect ? mainContentRect.left + window.scrollX + 16 : rect.left + window.scrollX;       // get the left position of the main-content
      const topPosition = rect.bottom + window.scrollY + 8;                             // get the top position of the add button
      setEmojiPickerPosition({ top: topPosition, left: leftPosition, right: 'auto' }); // set the position of the emoji picker
    }
    setShowEmojiPicker(!showEmojiPicker);                 // toggle the showEmojiPicker state
  }

  const handleEmojiClick = (emojiData) => {
    const emoji = emojiData.emoji;                  // get the emoji from the emoji data
    onEmojiSelect(emoji);                           // call the onEmojiSelect function with the emoji
    setShowEmojiPicker(false);                      // close the emoji picker
  }

  // closing the emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target) &&
        addButtonRef.current &&
        !addButtonRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);                  // set the showEmojiPicker state to false
      }
    }

    if (showEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside); // add the event listener to the document
      return () => {
        document.removeEventListener('mousedown', handleClickOutside); // remove the event listener from the document
      }
    }
  }, [showEmojiPicker]); // re-run the effect when the showEmojiPicker changes

  return (
    <div className={styles.emojiPickerContainer}>
      <Button 
        ref={addButtonRef}
        className={styles.addBtn}
        onClick={handleAddEmoji}
      >
        <span className={styles.icon}>+</span>
        <span>추가</span>
      </Button>
      {showEmojiPicker && (
        <div 
          ref={emojiPickerRef} 
          className={styles.emojiPickerWrapper}
          style={{
            top: `${emojiPickerPosition.top}px`,
            right: emojiPickerPosition.right === 'auto' ? 'auto' : `${emojiPickerPosition.right}px`,
            left: emojiPickerPosition.left === 'auto' ? 'auto' : `${emojiPickerPosition.left}px`
          }}
        >
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            searchPlaceHolder={styles.searchPlaceHolder}
            width="100%"
            height="400px"
            style={{ maxHeight: 'calc(100vh - 32px)' }}
          />
        </div>
      )}
    </div>
  )
}

export default EmojiPickerButton

