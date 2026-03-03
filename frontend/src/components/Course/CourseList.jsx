import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { coursesAPI, progressAPI } from '../../services/api';
import './Course.css';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const [coursesRes, progressRes] = await Promise.all([
        coursesAPI.getAll(),
        progressAPI.getAllProgress()
      ]);
      
      setCourses(coursesRes.data.courses);
      setProgress(progressRes.data.progress);
    } catch (err) {
      setError('Failed to load courses');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="course-list-container">
        <div className="loading">Loading courses...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="course-list-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="course-list-container">
      <div className="course-list-header">
        <h1>Available Courses</h1>
        <p>Choose a course to start learning</p>
      </div>

      <div className="courses-grid">
        {courses.map((course) => {
          const courseProgress = progress[course.id];
          const progressPercentage = courseProgress?.progressPercentage || 0;

          return (
            <Link 
              to={`/courses/${course.id}`} 
              key={course.id} 
              className="course-card"
            >
              <div className="course-thumbnail">
                <img src={course.thumbnail} alt={course.title} />
                <span className="course-category">{course.category}</span>
              </div>
              
              <div className="course-info">
                <h3>{course.title}</h3>
                <p className="course-description">{course.description}</p>
                <p className="course-instructor">By {course.instructorName}</p>
                
                {courseProgress && (
                  <div className="course-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                    <span className="progress-text">{progressPercentage}% complete</span>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CourseList;
