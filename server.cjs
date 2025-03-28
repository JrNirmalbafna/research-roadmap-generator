const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mock research resources data (replace with real API integration later)
const generateMockResources = (topic) => {
  return [
    {
      id: 1,
      title: `${topic} Fundamentals`,
      type: 'course',
      provider: 'MIT OpenCourseWare',
      url: `https://ocw.mit.edu/courses/${topic.toLowerCase()}/introduction`,
      description: 'A comprehensive introduction to core concepts and principles.',
      rating: 4.8,
      reviewCount: 1250,
      difficulty: 'beginner',
      duration: '12 weeks',
      tags: ['fundamentals', 'theory', 'basics']
    },
    {
      id: 2,
      title: `Advanced ${topic} Concepts`,
      type: 'research-paper',
      provider: 'Science Direct',
      url: `https://sciencedirect.com/topics/${topic.toLowerCase()}`,
      description: 'Latest research findings and advanced theoretical frameworks.',
      rating: 4.9,
      reviewCount: 320,
      difficulty: 'advanced',
      publicationDate: '2024',
      citations: 156,
      tags: ['research', 'advanced', 'theory']
    },
    {
      id: 3,
      title: `${topic} in Practice`,
      type: 'video-series',
      provider: 'Stanford Online',
      url: `https://online.stanford.edu/${topic.toLowerCase()}`,
      description: 'Practical applications and real-world case studies.',
      rating: 4.7,
      reviewCount: 890,
      difficulty: 'intermediate',
      duration: '8 weeks',
      tags: ['practical', 'case-studies', 'applications']
    },
    {
      id: 4,
      title: `${topic} Research Methods`,
      type: 'textbook',
      provider: 'Cambridge University Press',
      url: `https://cambridge.org/books/${topic.toLowerCase()}`,
      description: 'Comprehensive guide to research methodologies.',
      rating: 4.6,
      reviewCount: 450,
      difficulty: 'intermediate',
      publicationDate: '2023',
      tags: ['research-methods', 'methodology', 'academic']
    },
    {
      id: 5,
      title: `Emerging Trends in ${topic}`,
      type: 'journal',
      provider: 'Nature',
      url: `https://nature.com/articles/${topic.toLowerCase()}`,
      description: 'Latest developments and future directions in the field.',
      rating: 4.9,
      reviewCount: 280,
      difficulty: 'advanced',
      publicationDate: '2024',
      tags: ['trends', 'innovation', 'future']
    }
  ];
};

// Generate roadmap based on curated resources
const generateRoadmap = (resources) => {
  const phases = ['beginner', 'intermediate', 'advanced'];
  const roadmap = [];

  phases.forEach(phase => {
    const phaseResources = resources.filter(r => r.difficulty === phase);
    if (phaseResources.length > 0) {
      roadmap.push({
        phase,
        title: phaseResources[0].title,
        description: phaseResources[0].description,
        resources: phaseResources.map(r => ({
          title: r.title,
          type: r.type,
          provider: r.provider,
          url: r.url,
          duration: r.duration,
          difficulty: r.difficulty
        }))
      });
    }
  });

  return roadmap;
};

// API endpoint for curating resources
app.post('/api/curate-resources', async (req, res) => {
  try {
    const { topic } = req.body;
    
    if (!topic) {
      return res.status(400).json({ 
        error: 'Topic is required',
        success: false 
      });
    }

    const resources = generateMockResources(topic);
    res.json({ 
      success: true,
      data: resources,
      metadata: {
        topic,
        timestamp: new Date().toISOString(),
        resultCount: resources.length
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Failed to curate resources',
      success: false,
      details: error.message 
    });
  }
});

// API endpoint for generating roadmap from resources
app.post('/api/generate-roadmap', async (req, res) => {
  try {
    const { resources } = req.body;
    
    if (!resources || !Array.isArray(resources)) {
      return res.status(400).json({ 
        error: 'Resources array is required',
        success: false 
      });
    }

    const roadmap = generateRoadmap(resources);
    res.json({ 
      success: true,
      data: roadmap,
      metadata: {
        timestamp: new Date().toISOString(),
        resultCount: roadmap.length
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate roadmap',
      success: false,
      details: error.message 
    });
  }
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
