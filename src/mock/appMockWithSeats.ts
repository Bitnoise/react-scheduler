export const mockDataWithSeats = [
  {
    id: "room-1",
    label: {
      icon: "https://picsum.photos/24",
      title: "Classroom One",
      subtitle: "Physics Fundamentals",
      bgColor: "rgb(254,165,177)"
    },
    seats: [
      {
        id: "room-1-seat1",
        label: { icon: "https://picsum.photos/24", title: "Seat one", subtitle: "Near the board" },
        data: [
          {
            id: "project1-room1-seat1",
            startDate: new Date("2024-10-01"),
            endDate: new Date("2024-10-05"),
            occupancy: 2000,
            title: "Project A",
            subtitle: "Mechanics",
            description: "Newtonian mechanics",
            bgColor: "rgb(200,200,250)"
          }
        ]
      },
      {
        id: "room-1-seat2",
        label: { icon: "https://picsum.photos/24", title: "Seat two", subtitle: "Middle row" },
        data: [
          {
            id: "project2-room1-seat2",
            startDate: new Date("2024-10-06"),
            endDate: new Date("2024-10-10"),
            occupancy: 1500,
            title: "Project B",
            subtitle: "Thermodynamics",
            description: "Heat and temperature",
            bgColor: "rgb(250,200,200)"
          }
        ]
      },
      {
        id: "room-1-seat3",
        label: { icon: "https://picsum.photos/24", title: "Seat tree", subtitle: "Near the board" },
        data: []
      }
    ]
  },
  {
    id: "room-2",
    label: {
      icon: "https://picsum.photos/24",
      title: "Classroom Two",
      subtitle: "Chemistry Basics",
      bgColor: "rgb(177,220,240)"
    },
    seats: [
      {
        id: "room-2-seat0",
        label: { icon: "https://picsum.photos/24", title: "Seat 0", subtitle: "Front row" },
        data: []
      },
      {
        id: "room-2-seat1",
        label: { icon: "https://picsum.photos/24", title: "Seat one", subtitle: "Front row" },
        data: [
          {
            id: "project1-room2-seat1",
            startDate: new Date("2024-11-01"),
            endDate: new Date("2024-11-05"),
            occupancy: 1500,
            title: "Project C",
            subtitle: "Organic Chemistry",
            description: "Structure of organic molecules",
            bgColor: "rgb(220,150,255)"
          }
        ]
      },
      {
        id: "room-2-seat2",
        label: { icon: "https://picsum.photos/24", title: "Seat two", subtitle: "Near windows" },
        data: [
          {
            id: "project2-room2-seat2",
            startDate: new Date("2024-11-06"),
            endDate: new Date("2024-11-12"),
            occupancy: 2200,
            title: "Project D",
            subtitle: "Inorganic Chemistry",
            description: "Metallic bonding",
            bgColor: "rgb(230,230,200)"
          }
        ]
      }
    ]
  },
  {
    id: "room-3",
    label: {
      icon: "https://picsum.photos/24",
      title: "Classroom Three",
      subtitle: "Mathematics",
      bgColor: "rgb(190,230,240)"
    },
    seats: [
      {
        id: "room-3-seat1",
        label: {
          icon: "https://picsum.photos/24",
          title: "Seat one",
          subtitle: "Near the teacher"
        },
        data: [
          {
            id: "project1-room3-seat1",
            startDate: new Date("2024-12-01"),
            endDate: new Date("2024-12-10"),
            occupancy: 1700,
            title: "Project E",
            subtitle: "Algebra",
            description: "Introduction to algebra",
            bgColor: "rgb(150,250,190)"
          },
          {
            id: "project2-room3-seat1",
            startDate: new Date("2024-12-11"),
            endDate: new Date("2024-12-20"),
            occupancy: 1800,
            title: "Project F",
            subtitle: "Calculus",
            description: "Basics of calculus",
            bgColor: "rgb(250,210,180)"
          }
        ]
      }
    ]
  },
  {
    id: "room-4",
    label: {
      icon: "https://picsum.photos/24",
      title: "Classroom Four",
      subtitle: "Biology",
      bgColor: "rgb(210,180,255)"
    },
    seats: [
      {
        id: "room-4-seat1",
        label: { icon: "https://picsum.photos/24", title: "Seat one", subtitle: "Corner seat" },
        data: [
          {
            id: "project1-room4-seat1",
            startDate: new Date("2024-10-15"),
            endDate: new Date("2024-10-25"),
            occupancy: 1400,
            title: "Project G",
            subtitle: "Genetics",
            description: "DNA and heredity",
            bgColor: "rgb(200,220,240)"
          }
        ]
      }
    ]
  },
  {
    id: "room-5",
    label: {
      icon: "https://picsum.photos/24",
      title: "Classroom Five",
      subtitle: "History",
      bgColor: "rgb(240,230,180)"
    },
    seats: [
      {
        id: "room-5-seat1",
        label: { icon: "https://picsum.photos/24", title: "Seat one", subtitle: "Front row" },
        data: [
          {
            id: "project1-room5-seat1",
            startDate: new Date("2024-09-01"),
            endDate: new Date("2024-09-10"),
            occupancy: 2000,
            title: "Project H",
            subtitle: "Ancient History",
            description: "Civilizations and cultures",
            bgColor: "rgb(240,210,150)"
          }
        ]
      }
    ]
  },
  {
    id: "room-6",
    label: {
      icon: "https://picsum.photos/24",
      title: "Classroom Six",
      subtitle: "Literature",
      bgColor: "rgb(220,240,200)"
    },
    seats: [
      {
        id: "room-6-seat1",
        label: { icon: "https://picsum.photos/24", title: "Seat one", subtitle: "Back row" },
        data: [
          {
            id: "project1-room6-seat1",
            startDate: new Date("2024-11-20"),
            endDate: new Date("2024-12-01"),
            occupancy: 2100,
            title: "Project I",
            subtitle: "Poetry",
            description: "Romantic era poets",
            bgColor: "rgb(240,200,190)"
          }
        ]
      }
    ]
  },
  {
    id: "room-7",
    label: {
      icon: "https://picsum.photos/24",
      title: "Classroom Seven",
      subtitle: "Computer Science",
      bgColor: "rgb(210,190,250)"
    },
    seats: [
      {
        id: "room-7-seat1",
        label: { icon: "https://picsum.photos/24", title: "Seat one", subtitle: "Near projector" },
        data: [
          {
            id: "project1-room7-seat1",
            startDate: new Date("2024-08-01"),
            endDate: new Date("2024-08-10"),
            occupancy: 1600,
            title: "Project J",
            subtitle: "Programming Basics",
            description: "Intro to programming",
            bgColor: "rgb(150,210,240)"
          }
        ]
      }
    ]
  },
  {
    id: "room-8",
    label: {
      icon: "https://picsum.photos/24",
      title: "Classroom Eight",
      subtitle: "Geography",
      bgColor: "rgb(210,250,190)"
    },
    seats: [
      {
        id: "room-8-seat1",
        label: { icon: "https://picsum.photos/24", title: "Seat one", subtitle: "Middle row" },
        data: [
          {
            id: "project1-room8-seat1",
            startDate: new Date("2024-06-01"),
            endDate: new Date("2024-06-10"),
            occupancy: 2300,
            title: "Project K",
            subtitle: "World Geography",
            description: "Continents and countries",
            bgColor: "rgb(240,210,200)"
          }
        ]
      }
    ]
  },
  {
    id: "room-9",
    label: {
      icon: "https://picsum.photos/24",
      title: "Classroom Nine",
      subtitle: "Physics Lab",
      bgColor: "rgb(200,230,240)"
    },
    seats: [
      {
        id: "room-9-seat1",
        label: { icon: "https://picsum.photos/24", title: "Seat one", subtitle: "Front row" },
        data: [
          {
            id: "project1-room9-seat1",
            startDate: new Date("2024-05-15"),
            endDate: new Date("2024-05-25"),
            occupancy: 2500,
            title: "Project L",
            subtitle: "Fluid Mechanics",
            description: "Properties of fluids",
            bgColor: "rgb(200,180,230)"
          }
        ]
      }
    ]
  },
  {
    id: "room-10",
    label: {
      icon: "https://picsum.photos/24",
      title: "Classroom Ten",
      subtitle: "Philosophy",
      bgColor: "rgb(250,210,210)"
    },
    seats: [
      {
        id: "room-10-seat1",
        label: { icon: "https://picsum.photos/24", title: "Seat one", subtitle: "Side row" },
        data: [
          {
            id: "project1-room10-seat1",
            startDate: new Date("2024-07-01"),
            endDate: new Date("2024-07-10"),
            occupancy: 1800,
            title: "Project M",
            subtitle: "Ethics",
            description: "Principles of moral philosophy",
            bgColor: "rgb(240,250,200)"
          }
        ]
      }
    ]
  }
];
