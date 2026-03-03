import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { coursesAPI, progressAPI } from '../../services/api';
import LessonList from '../Lesson/LessonList';
import VideoPlayer from '../Lesson/VideoPlayer';
import './Course.css';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourseData();
  }, [id]);

  const fetchCourseData = async () => {
    try {
      setLoading(true);
      const [courseRes, progressRes] = await Promise.all([
        coursesAPI.getById(id),
        progressAPI.getCourseProgress(id)
      ]);
      
      setCourse(courseRes.data.course);
      setLessons(courseRes.data.lessons);
      setProgress(progressRes.data);
      
      // Set first lesson as current if none selected
      if (courseRes.data.lessons.length > 0 && !currentLesson) {
        setCurrentLesson(courseRes.data.lessons[0]);
      }
    } catch (err) {
      setError('Failed to load course');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLessonSelect = (lesson) => {
    setCurrentLesson(lesson);
  };

  const handleLessonComplete = async () => {
    if (!currentLesson) return;
    
    try {
      await progressAPI.completeLesson(id, currentLesson.id);
      // Refresh progress
      const progressRes = await progressAPI.getCourseProgress(id);
      setProgress(progressRes.data);
    } catch (err) {
      console.error('Failed to mark lesson as complete:', err);
    }
  };

  if (loading) {
    return (
      <div className="course-detail-container">
        <div className="loading">Loading course...</div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="course-detail-container">
        <div className="error">{error || 'Course not found'}</div>
      </div>
    );
  }

  return (
    <div className="course-detail-container">
      <div className="course-header">
        <h1>{course.title}</h1>
        <p className="course-instructor">Instructor: {course.instructorName}</p>
        <p className="course-description">{course.description}</p>
        
        {progress && (
          <div className="course-progress-overview">
            <div className="progress-bar large">
              <div 
                className="progress-fill" 
                style={{ width: `${progress.progressPercentage}%` }}
              />
            </div>
            <span className="progress-text">
              {progress.completedLessons} of {progress.totalLessons} lessons completed ({progress.progressPercentage}%)
            </span>
          </div>
        )}
      </div>

      <div className="course-content">
        <div className="video-section">
          {currentLesson && (
            <VideoPlayer 
              lesson={currentLesson}
              onComplete={handleLessonComplete}
              isCompleted={progress?.completedLessonIds?.includes(currentLesson.id)}
            />
          )}
        </div>

        <div className="lessons-section">
          <LessonList 
            lessons={lessons}
            currentLesson={currentLesson}
            completedLessonIds={progress?.completedLessonIds || []}
            onSelectLesson={handleLessonSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
