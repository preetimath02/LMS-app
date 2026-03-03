import React from 'react';
import './Lesson.css';

const LessonList = ({ lessons, currentLesson, completedLessonIds, onSelectLesson }) => {
  return (
    <div className="lesson-list">
      <h3>Course Lessons</h3>
      <div className="lessons">
        {lessons.map((lesson, index) => {
          const isActive = currentLesson?.id === lesson.id;
          const isCompleted = completedLessonIds.includes(lesson.id);
          
          return (
            <button
              key={lesson.id}
              className={`lesson-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
              onClick={() => onSelectLesson(lesson)}
            >
              <div className="lesson-number">
                {isCompleted ? (
                  <span className="check-icon">&#10003;</span>
                ) : (
                  index + 1
                )}
              </div>
              <div className="lesson-info">
                <span className="lesson-title">{lesson.title}</span>
                <span className="lesson-duration">Lesson {index + 1}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LessonList;
