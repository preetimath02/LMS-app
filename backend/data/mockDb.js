// In-memory mock database
const mockDb = {
  users: [
    {
      id: '1',
      email: 'student@example.com',
      password: '$2a$10$YourHashedPasswordHere', // "password123"
      role: 'student',
      name: 'John Student'
    },
    {
      id: '2',
      email: 'instructor@example.com',
      password: '$2a$10$YourHashedPasswordHere', // "password123"
      role: 'instructor',
      name: 'Jane Instructor'
    },
    {
      id: '3',
      email: 'admin@example.com',
      password: '$2a$10$YourHashedPasswordHere', // "password123"
      role: 'admin',
      name: 'Admin User'
    }
  ],
  
  courses: [
    {
      id: '1',
      title: 'Java Programming Fundamentals',
      description: 'Learn Java from scratch. This comprehensive course covers all the basics you need to become a Java developer.',
      thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400',
      category: 'Programming',
      instructorId: '2',
      instructorName: 'Jane Instructor'
    },
    {
      id: '2',
      title: 'Python for Beginners',
      description: 'Master Python programming with hands-on projects and real-world examples.',
      thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400',
      category: 'Programming',
      instructorId: '2',
      instructorName: 'Jane Instructor'
    },
    {
      id: '3',
      title: 'Web Development Bootcamp',
      description: 'Full-stack web development with HTML, CSS, JavaScript, React, and Node.js.',
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
      category: 'Web Development',
      instructorId: '2',
      instructorName: 'Jane Instructor'
    }
  ],
  
  lessons: [
    // Java Course Lessons
    {
      id: '1',
      courseId: '1',
      title: 'Introduction to Java',
      order: 1,
      youtubeUrl: 'https://www.youtube.com/embed/grEKMHGYyns'
    },
    {
      id: '2',
      courseId: '1',
      title: 'Setting Up Your Development Environment',
      order: 2,
      youtubeUrl: 'https://www.youtube.com/embed/RRubcjpTkks'
    },
    {
      id: '3',
      courseId: '1',
      title: 'Variables and Data Types',
      order: 3,
      youtubeUrl: 'https://www.youtube.com/embed/3jMaLsLx2VQ'
    },
    {
      id: '4',
      courseId: '1',
      title: 'Control Flow Statements',
      order: 4,
      youtubeUrl: 'https://www.youtube.com/embed/eIrMbAQSU34'
    },
    {
      id: '5',
      courseId: '1',
      title: 'Object-Oriented Programming Basics',
      order: 5,
      youtubeUrl: 'https://www.youtube.com/embed/pTB0EiLXUC8'
    },
    // Python Course Lessons
    {
      id: '6',
      courseId: '2',
      title: 'Getting Started with Python',
      order: 1,
      youtubeUrl: 'https://www.youtube.com/embed/_uQrJ0TkZlc'
    },
    {
      id: '7',
      courseId: '2',
      title: 'Python Basics - Variables and Data Types',
      order: 2,
      youtubeUrl: 'https://www.youtube.com/embed/kqtD5dpn9C8'
    },
    {
      id: '8',
      courseId: '2',
      title: 'Control Flow in Python',
      order: 3,
      youtubeUrl: 'https://www.youtube.com/embed/Zp5MuPOtsSY'
    },
    // Web Development Lessons
    {
      id: '9',
      courseId: '3',
      title: 'HTML Fundamentals',
      order: 1,
      youtubeUrl: 'https://www.youtube.com/embed/qz0aGYrrlhU'
    },
    {
      id: '10',
      courseId: '3',
      title: 'CSS Styling Basics',
      order: 2,
      youtubeUrl: 'https://www.youtube.com/embed/1Rs2ND1ryYc'
    },
    {
      id: '11',
      courseId: '3',
      title: 'JavaScript Introduction',
      order: 3,
      youtubeUrl: 'https://www.youtube.com/embed/PkZNo7MFNFg'
    }
  ],
  
  progress: [
    // Sample progress for student user
    {
      userId: '1',
      courseId: '1',
      lessonId: '1',
      status: 'completed',
      completedAt: new Date('2024-01-15').toISOString()
    },
    {
      userId: '1',
      courseId: '1',
      lessonId: '2',
      status: 'completed',
      completedAt: new Date('2024-01-16').toISOString()
    }
  ]
};

module.exports = mockDb;
