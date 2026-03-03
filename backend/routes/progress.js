const express = require('express');
const mockDb = require('../data/mockDb');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// POST /api/progress/complete - Mark lesson as completed
router.post('/complete', authMiddleware, (req, res) => {
  try {
    const userId = req.user.userId;
    const { courseId, lessonId } = req.body;
    
    if (!courseId || !lessonId) {
      return res.status(400).json({ message: 'Course ID and lesson ID are required' });
    }
    
    // Check if lesson exists
    const lesson = mockDb.lessons.find(l => l.id === lessonId && l.courseId === courseId);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    
    // Check if progress already exists
    const existingProgress = mockDb.progress.find(
      p => p.userId === userId && p.lessonId === lessonId
    );
    
    if (existingProgress) {
      // Update existing progress
      existingProgress.status = 'completed';
      existingProgress.completedAt = new Date().toISOString();
    } else {
      // Create new progress entry
      mockDb.progress.push({
        userId,
        courseId,
        lessonId,
        status: 'completed',
        completedAt: new Date().toISOString()
      });
    }
    
    res.json({
      message: 'Lesson marked as completed',
      progress: {
        courseId,
        lessonId,
        status: 'completed'
      }
    });
  } catch (error) {
    console.error('Complete lesson error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/progress/:courseId - Get progress for a course
router.get('/:courseId', authMiddleware, (req, res) => {
  try {
    const userId = req.user.userId;
    const courseId = req.params.courseId;
    
    // Get all lessons for this course
    const courseLessons = mockDb.lessons.filter(l => l.courseId === courseId);
    const totalLessons = courseLessons.length;
    
    // Get completed lessons for this user and course
    const completedLessons = mockDb.progress.filter(
      p => p.userId === userId && p.courseId === courseId && p.status === 'completed'
    );
    
    const completedCount = completedLessons.length;
    const progressPercentage = totalLessons > 0 
      ? Math.round((completedCount / totalLessons) * 100) 
      : 0;
    
    // Get list of completed lesson IDs
    const completedLessonIds = completedLessons.map(p => p.lessonId);
    
    res.json({
      courseId,
      totalLessons,
      completedLessons: completedCount,
      progressPercentage,
      completedLessonIds
    });
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/progress - Get all progress for current user
router.get('/', authMiddleware, (req, res) => {
  try {
    const userId = req.user.userId;
    
    // Get all progress for this user
    const userProgress = mockDb.progress.filter(p => p.userId === userId);
    
    // Group by course
    const courseProgress = {};
    
    mockDb.courses.forEach(course => {
      const courseLessons = mockDb.lessons.filter(l => l.courseId === course.id);
      const completedForCourse = userProgress.filter(
        p => p.courseId === course.id && p.status === 'completed'
      );
      
      courseProgress[course.id] = {
        courseId: course.id,
        courseTitle: course.title,
        totalLessons: courseLessons.length,
        completedLessons: completedForCourse.length,
        progressPercentage: courseLessons.length > 0 
          ? Math.round((completedForCourse.length / courseLessons.length) * 100)
          : 0
      };
    });
    
    res.json({
      progress: courseProgress
    });
  } catch (error) {
    console.error('Get all progress error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
