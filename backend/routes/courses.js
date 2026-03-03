const express = require('express');
const mockDb = require('../data/mockDb');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// GET /api/courses - Get all courses
router.get('/', authMiddleware, (req, res) => {
  try {
    const courses = mockDb.courses.map(course => ({
      id: course.id,
      title: course.title,
      description: course.description,
      thumbnail: course.thumbnail,
      category: course.category,
      instructorName: course.instructorName
    }));
    
    res.json({ courses });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/courses/:id - Get course with lessons
router.get('/:id', authMiddleware, (req, res) => {
  try {
    const courseId = req.params.id;
    const course = mockDb.courses.find(c => c.id === courseId);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Get lessons for this course
    const lessons = mockDb.lessons
      .filter(l => l.courseId === courseId)
      .sort((a, b) => a.order - b.order)
      .map(l => ({
        id: l.id,
        title: l.title,
        order: l.order,
        youtubeUrl: l.youtubeUrl
      }));
    
    res.json({
      course: {
        id: course.id,
        title: course.title,
        description: course.description,
        thumbnail: course.thumbnail,
        category: course.category,
        instructorName: course.instructorName
      },
      lessons
    });
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/courses - Create new course (instructors only)
router.post('/', authMiddleware, (req, res) => {
  try {
    // Check if user is instructor or admin
    if (req.user.role !== 'instructor' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only instructors can create courses' });
    }
    
    const { title, description, thumbnail, category } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }
    
    const instructor = mockDb.users.find(u => u.id === req.user.userId);
    
    const newCourse = {
      id: String(mockDb.courses.length + 1),
      title,
      description,
      thumbnail: thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400',
      category: category || 'General',
      instructorId: req.user.userId,
      instructorName: instructor ? instructor.name : 'Unknown Instructor'
    };
    
    mockDb.courses.push(newCourse);
    
    res.status(201).json({
      message: 'Course created successfully',
      course: newCourse
    });
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
