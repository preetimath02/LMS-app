import React from 'react';
import './Lesson.css';

const VideoPlayer = ({ lesson, onComplete, isCompleted }) => {
  if (!lesson) {
    return (
      <div className="video-player empty">
        <p>Select a lesson to start learning</p>
      </div>
    );
  }

  return (
    <div className="video-player">
      <div className="video-container">
        <iframe
          src={lesson.youtubeUrl}
          title={lesson.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      
      <div className="video-info">
        <h2>{lesson.title}</h2>
        <p>Lesson {lesson.order}</p>
        
        <div className="video-actions">
          {isCompleted ? (
            <button className="complete-button completed" disabled>
              <span className="check-icon">&#10003;</span> Completed
            </button>
          ) : (
            <button className="complete-button" onClick={onComplete}>
              Mark as Complete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
