// routes/pageRoutes.js

const express = require('express');
const router = express.Router();
const contactSubmissions = []; // Temporary in-memory storage
const Event = require('../models/event')
const constact = require('../models/contact');

// Global event details array (accessible by all routes)
const eventDetails = [
  {
    id: "Lesson 1",
    title: "Lesson 1",
    description: "Chapter 1: Defining Innovation Leadership & the CREATE Model.", 
    Image: "/images/coding-bootcamp.jpg",
    date: "2023-10-15",
    time: "10:00 AM - 2:00 PM",
    location: "Community Center, Room 101"
  },
  {
    id: "Lesson 2",
    title: "Lesson 2",
    description: "Join us for an insightful tech talk on the latest trends in technology and innovation.",
    Image: "/images/tech-talk.jpg",
    date: "2023-10-20",
    time: "2:00 PM - 4:00 PM",
    location: "Community Center, Room 202"
  },
  {
    id: "Lesson 3",
    title: "Lesson 3",
    description: "Learn to cook delicious meals with our expert chef in this interactive cooking class.",
    Image: "/images/coding-bootcamp.jpg",
    date: "2023-10-25",
    time: "5:00 PM - 7:00 PM",
    location: "Community Center, Kitchen"
  },
  {
    id: "Lesson 4",
    title: "Lesson 4",
    description: "Relax and rejuvenate with our yoga session led by a certified instructor.",
    Image: "/images/coding-bootcamp.jpg",
    date: "2023-10-30",
    time: "6:00 PM - 7:00 PM",
    location: "Community Center, Room 303"
  },
  {
    id: "Lesson 5",
    title: "Lesson 5",
    description: "Join our book club to discuss this month's book selection and share your thoughts with fellow readers.",
    Image: "/images/tech-talk.jpg",
    date: "2023-11-05",
    time: "3:00 PM - 5:00 PM",
    location: "Community Center, Room 404"
  },
  {
    id: "Lesson 6",
    title: "Lesson 6",
    description: "Join our book club to discuss this month's book selection and share your thoughts with fellow readers.",
    Image: "/images/tech-talk.jpg",
    date: "2023-11-05",
    time: "3:00 PM - 5:00 PM",
    location: "Community Center, Room 404"
  },
  {
    id: "Lesson 7",
    title: "Lesson 7",
    description: "Join our book club to discuss this month's book selection and share your thoughts with fellow readers.",
    Image: "/images/tech-talk.jpg",
    date: "2023-11-05",
    time: "3:00 PM - 5:00 PM",
    location: "Community Center, Room 404"
  },
  {
    id: "Lesson 8",
    title: "Lesson 8",
    description: "Join our book club to discuss this month's book selection and share your thoughts with fellow readers.",
    Image: "/images/tech-talk.jpg",
    date: "2023-11-05",
    time: "3:00 PM - 5:00 PM",
    location: "Community Center, Room 404"
  },
  {
    id: "Lesson 9",
    title: "Lesson 9",
    description: "Join our book club to discuss this month's book selection and share your thoughts with fellow readers.",
    Image: "/images/tech-talk.jpg",
    date: "2023-11-05",
    time: "3:00 PM - 5:00 PM",
    location: "Community Center, Room 404"
  }
];

// Routes
router.get('/', (req, res) => {
  const featuredEvents = eventDetails.slice(0, 3); // show only the first 3 events on home page
res.render('pages/home', { eventDetails: featuredEvents, page: 'home' });

});

router.get('/about', (req, res) => {
  const teamMembers = [
    {
      name: "Daniel Lumb",
      role: "Frontend Developer",
      bio: "Passionate about clean UI and responsive design.",
      image: "/images/daniel.jpg"
    },
    {
      name: "Lesedi",
      role: "Backend Developer",
      bio: "Builds scalable backend systems and database logic.",
      image: "/images/"
    },
    {
      name: "Reinhard",
      role: "Data Manager",
      bio: "Ensures data flows smoothly between components.",
      image: "/images/"
    },
    {
      name: "Nokwanda",
      role: "Team Lead & Documentation",
      bio: "Manages workflow, GitHub, and documentation.",
      image: "/images/"
    }
  ];

  res.render('pages/about', { teamMembers, page: 'about' });
});

//Adding temporary search functionality
router.get('/events', (req, res) => {
  const search = req.query.search?.toLowerCase() || '';
  
  // Filter events if a search term is provided
  const filteredEvents = eventDetails.filter(event =>
    event.title.toLowerCase().includes(search) ||
    event.description.toLowerCase().includes(search)
  );

  res.render('pages/events', {
    eventDetails: filteredEvents,
    search, // pass current search value back to view
    page: 'events'
  });
});

router.get('/events/:id', (req, res) => {
  const { id } = req.params;
  const event = eventDetails.find(e => e.id === id);

  if (!event) {
    return res.status(404).send("Event not found");
  }

  res.render('pages/event-detail', { event, page: 'events' });
});

router.get('/contact', (req, res) => {
  const message = req.query.message || ''; // Extract message from query
  res.render('pages/contact', { page: 'contact', message }); // Pass it to the view
});


router.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send("All fields are required.");
  }

  const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!emailPattern.test(email)) {
    return res.status(400).send("Invalid email format.");
  }

  contactSubmissions.push({ name, email, message });

  res.redirect('/thankyou');
});

// Route to view submissions — for testing only
router.get('/submissions', (req, res) => {
  res.json(contactSubmissions);
});

router.get('/thankyou', (req, res) => {
  res.render('pages/thankyou', { page: 'thankyou' });
});


module.exports = router;
