export const mockPosts = [
  {
    _id: '1',
    content: 'Just launched my new project! Check it out 🚀',
    userId: {
      username: 'sarah_dev',
      profilePicture: 'https://i.pravatar.cc/150?img=1'
    },
    likes: ['user1', 'user2', 'user3'],
    comments: [
      {
        userId: 'user1',
        content: 'This looks amazing!',
        createdAt: '2024-03-10T10:00:00Z'
      }
    ],
    createdAt: '2024-03-10T09:00:00Z'
  },
  {
    _id: '2',
    content: 'Learning TypeScript and Next.js has been a game changer for my development workflow 💻',
    userId: {
      username: 'tech_enthusiast',
      profilePicture: 'https://i.pravatar.cc/150?img=2'
    },
    likes: ['user1', 'user4'],
    comments: [],
    createdAt: '2024-03-09T15:30:00Z'
  },
  // Add more mock posts as needed
]; 