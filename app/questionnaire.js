// index page json
const categories = [
  {
    id: 1234,
    name: "Computer Science",
  },
  {
    id: 2345,
    name: "Geology",
  },
];

// questions json

const questions = [
  {
    id: 300,
    title: "What color is the sky?",
    options: [
      { id: 10, text: "Blue", isCorrect: true },
      { id: 20, text: "Red", isCorrect: false },
      { id: 30, text: "Green", isCorrect: false },
    ],
    category: 2345,
  },
  {
    id: 301,
    title: "Which is a CPU company?",
    options: [
      { id: 10, text: "Intel", isCorrect: false },
      { id: 20, text: "AMD", isCorrect: false },
      { id: 30, text: "all the above", isCorrect: true },
    ],
    category: 1234,
  },
];

const state = {
  categories: [
    {
      id: 1234,
      name: "Computer Science",
    },
    {
      id: 2345,
      name: "Geology",
    },
  ],
  questions: [
    {
      id: 300,
      title: "What color is the sky?",
      options: [
        { id: 10, text: "Blue", isCorrect: true },
        { id: 20, text: "Red", isCorrect: false },
        { id: 30, text: "Green", isCorrect: false },
      ],
      category: 2345,
    },
    {
      id: 301,
      title: "Which is a CPU company?",
      options: [
        { id: 10, text: "Intel", isCorrect: false },
        { id: 20, text: "AMD", isCorrect: false },
        { id: 30, text: "all the above", isCorrect: true },
      ],
      category: 1234,
    },
  ],
  page: "index", // 'question'
};
