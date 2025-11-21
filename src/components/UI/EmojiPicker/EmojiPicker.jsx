import React, { useState, useRef, useEffect } from 'react'
import EmojiPicker from 'emoji-picker-react'
import './EmojiPicker.css'

const EmojiPickerButton = ({ onEmojiSelect }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [emojiPickerPosition, setEmojiPickerPosition] = useState({ top: 0, right: 0, left: 'auto' })
  const emojiPickerRef = useRef(null)
  const addButtonRef = useRef(null)

  const handleAddEmoji = () => {
    if (!showEmojiPicker && addButtonRef.current) {
      const rect = addButtonRef.current.getBoundingClientRect()
      const isMobile = window.innerWidth <= 499
      setEmojiPickerPosition({
        top: rect.bottom + window.scrollY + 8,
        right: isMobile ? 'auto' : window.innerWidth - rect.right,
        left: isMobile ? rect.left + window.scrollX : 'auto'
      })
    }
    setShowEmojiPicker(!showEmojiPicker)
  }

  const handleEmojiClick = (emojiData) => {
    const emoji = emojiData.emoji
    onEmojiSelect(emoji)
    setShowEmojiPicker(false)
  }

  // 외부 클릭 시 emoji picker 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target) &&
        addButtonRef.current &&
        !addButtonRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false)
      }
    }

    if (showEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [showEmojiPicker])

  return (
    <div className="emoji-picker-container">
      <button 
        ref={addButtonRef}
        className="add-btn"
        onClick={handleAddEmoji}
      >
        <span className="icon">+</span>
        <span>추가</span>
      </button>
      {showEmojiPicker && (
        <div 
          ref={emojiPickerRef} 
          className="emoji-picker-wrapper"
          style={{
            top: `${emojiPickerPosition.top}px`,
            right: emojiPickerPosition.right === 'auto' ? 'auto' : `${emojiPickerPosition.right}px`,
            left: emojiPickerPosition.left === 'auto' ? 'auto' : `${emojiPickerPosition.left}px`
          }}
        >
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            searchPlaceHolder="Search"
            width="100%"
            height="400px"
          />
        </div>
      )}
    </div>
  )
}

export default EmojiPickerButton

