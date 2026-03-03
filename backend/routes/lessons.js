const express = require('express');
const mockDb = require('../data/mockDb');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// GET /api/lessons/:id - Get specific lesson
router.get('/:id', authMiddleware, (req, res) => {
  try {
    const lessonId = req.params.id;
    const lesson = mockDb.lessons.find(l => l.id === lessonId);
    
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    
    // Get course info
    const course = mockDb.courses.find(c => c.id === lesson.courseId);
    
    res.json({
      lesson: {
        id: lesson.id,
        title: lesson.title,
        order: lesson.order,
        youtubeUrl: lesson.youtubeUrl,
        courseId: lesson.courseId
      },
      course: course ? {
        id: course.id,
        title: course.title
      } : null
    });
  } catch (error) {
    console.error('Get lesson error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/lessons - Create new lesson (instructors only)
router.post('/', authMiddleware, (req, res) => {
  try {
    // Check if user is instructor or admin
    if (req.user.role !== 'instructor' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only instructors can create lessons' });
    }
    
    const { courseId, title, youtubeUrl, order } = req.body;
    
    if (!courseId || !title || !youtubeUrl) {
      return res.status(400).json({ message: 'Course ID, title, and YouTube URL are required' });
    }
    
    // Check if course exists
    const course = mockDb.courses.find(c => c.id === courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Check if user owns the course
    if (course.instructorId !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'You can only add lessons to your own courses' });
    }
    
    const newLesson = {
      id: String(mockDb.lessons.length + 1),
      courseId,
      title,
      youtubeUrl,
      order: order || mockDb.lessons.filter(l => l.courseId === courseId).length + 1
    };
    
    mockDb.lessons.push(newLesson);
    
    res.status(201).json({
      message: 'Lesson created successfully',
      lesson: newLesson
    });
  } catch (error) {
    console.error('Create lesson error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
