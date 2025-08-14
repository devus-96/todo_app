export const messageValue = {
    message: null, status: null
} as {message: string | null , status: number | null}

export const viewAvailable =  [
    {
        name: 'All Tasks',
        value: 'tasks'
    },
    {
        name: 'Board',
        value: 'board'
    },
    {
        name: 'Week',
        value: 'week'
    },
    {
        name: 'Calendar',
        value: 'calendar'
    }
]

export const viewAvailableInProjectView =  [
  {
      name: 'All Tasks',
      value: 'tasks'
  },
  {
      name: 'Board',
      value: 'board'
  }
]

export const sortTask = {assign: '', author: '', priority: '',  state: '', "at start date": '', 'at deadline': ''}

export const dropType = [
    {
        title: "All",
        value: 'all'
    },
    {
        title: "Tasks",
        value: 'task'
    },
    {
        title: "Habits",
        value: 'habit'
    },
]

export const dropMenuTab = [
  {
    title: 'Priority',
    values: ['High', 'Medium', 'Low']
  },
  {
    title: 'State',
    values: ["not started",'in progress',"waitting", "paused"]
  },
]

export const dropMenuTabHistory = [
  {
    title: 'Priority',
    values: ['High', 'Medium', 'Low']
  },
  {
    title: 'State',
    values: ["Done", "Canceled"]
  },
]


export const weeks = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  export const weeksMin = [
    "sun",
    "mon",
    "tue",
    "wed",
    "thu",
    "fri",
    "sat",
  ];

export const hoursOfDays = {
    '12:00 AM': 0,
    '01:00 AM': 60,
    '02:00 AM': 120,
    '03:00 AM': 180,
    '04:00 AM': 240,
    '05:00 AM': 300,
    '06:00 AM': 360,
    '07:00 AM': 420,
    '08:00 AM': 480,
    '09:00 AM': 540,
    '10:00 AM': 600,
    '11:00 AM': 660, 
    '12:00 PM': 720,
    '01:00 PM': 780,
    '02:00 PM': 840,
    '03:00 PM': 900,
    '04:00 PM': 960,
    '05:00 PM': 1020,
    '06:00 PM': 1080,
    '07:00 PM': 1140,
    '08:00 PM': 1200,
    '09:00 PM': 1260,
    '10:00 PM': 1320,
    '11:00 PM': 1380, 
    '': null, 
}

export const hoursOfDays2 = [
  '12:00:00',
  '01:00:00',
  '02:00:00',
  '03:00:00',
  '04:00:00',
  '05:00:00',
  '06:00:00',
  '07:00:00',
  '08:00:00',
  '09:00:00',
  '10:00:00',
  '11:00:00',
  '12:00:00',
  '13:00:00',
  '14:00:00',
  '15:00:00',
  '16:00:00',
  '17:00:00',
  '18:00:00',
  '19:00:00',
  '20:00:00',
  '21:00:00',
  '22:00:00',
  '23:00:00',
  '24:00:00',
]

export const hours = [
    '00AM',
    '01AM',
    '02AM',
    '03AM',
    '04AM',
    '05AM',
    '06AM',
    '07AM',
    '08AM',
    '09AM',
    '10AM',
    '11AM', 
    '12PM',
    '01PM',
    '02PM',
    '03PM',
    '04PM',
    '05PM',
    '06PM',
    '07PM',
    '08PM',
    '09PM',
    '10PM',
    '11PM', 
    '12AM', 
]

export const faketasks = [
  {
    "id": 1,
    "name": "Planifier la réunion d'équipe",
    "taskable_id": 101,
    "taskable_type": "Project",
    "state": "in progress",
    "priority": "high",
    "description": "Préparer l'ordre du jour et inviter les participants.",
    "start_time": "09:00:00",
    "end_time": "10:00:00",
    "start_date": "2025-07-22",
    "deadline": "2025-07-25",
    "type": 'habit',
    "start_at": null,
    "finish_at": null,
    "author": "Alice",
    "created_at": "2025-07-20T10:00:00Z",
    "updated_at": "2025-07-22T09:30:00Z"
  },
  {
    "id": 1,
    "name": "Planifier la réunion d'équipe",
    "taskable_id": 101,
    "taskable_type": "Project",
    "state": "in progress",
    "priority": "high",
    "description": "Préparer l'ordre du jour et inviter les participants.",
    "start_time": "09:00:00",
    "end_time": "10:00:00",
    "start_date": "2025-08-05",
    "deadline": "2025-07-25",
    "type": 'habit',
    "start_at": null,
    "finish_at": null,
    "author": "Alice",
    "created_at": "2025-07-20T10:00:00Z",
    "updated_at": "2025-07-22T09:30:00Z"
  },
  {
    "id": 1,
    "name": "je vais en balade",
    "taskable_id": 101,
    "taskable_type": "Project",
    "state": "in progress",
    "priority": "high",
    "description": "Préparer l'ordre du jour et inviter les participants.",
    "start_time": "05:00:00",
    "end_time": "09:00:00",
    "start_date": "2025-07-24",
    "deadline": "2025-07-24",
    "type": 'task',
    "start_at": null,
    "finish_at": null,
    "author": "Alice",
    "created_at": "2025-07-20T10:00:00Z",
    "updated_at": "2025-07-22T09:30:00Z"
  },
  {
    "id": 1,
    "name": "faire la priere",
    "taskable_id": 101,
    "taskable_type": "Project",
    "state": "in progress",
    "priority": "high",
    "description": "Préparer l'ordre du jour et inviter les participants.",
    "start_time": "03:00:00",
    "end_time": "05:00:00",
    "start_date": "2025-07-20",
    "deadline": "2025-07-28",
    "type": 'habit',
    "start_at": null,
    "finish_at": null,
    "author": "Alice",
    "created_at": "2025-07-20T10:00:00Z",
    "updated_at": "2025-07-22T09:30:00Z"
  },
  {
    "id": 2,
    "name": "Rédiger le rapport mensuel",
    "taskable_id": 201,
    "taskable_type": "Report",
    "state": "not started",
    "priority": "high",
    "description": "Collecter les données et analyser les performances du mois.",
    "start_time": '01:00:00',
    "end_time": "03:00:00",
    "start_date": "2025-07-24",
    "deadline": "2025-07-31",
    "type": 'habit',
    "start_at": null,
    "finish_at": null,
    "author": "Bob",
    "created_at": "2025-07-21T14:00:00Z",
    "updated_at": "2025-07-21T14:00:00Z"
  },
  {
    "id": 3,
    "name": "Mettre à jour le site web",
    "taskable_id": "product-page-update",
    "taskable_type": "WebsiteSection",
    "state": "paused",
    "priority": "medium",
    "description": "Ajouter de nouvelles fonctionnalités et corriger les bugs mineurs.",
    "start_time": "11:00:00",
    "end_time": "13:00:00",
    "start_date": "2025-07-15",
    "deadline": "2025-08-01",
    "type": 'habit',
    'havedoit': ['2025-07-23', '2025-07-23', '2025-07-21', '2025-07-2024'],
    "start_at": "2025-07-15T11:00:00Z",
    "finish_at": null,
    "author": "Charlie",
    "created_at": "2025-07-10T10:00:00Z",
    "updated_at": "2025-07-18T16:00:00Z"
  },
  {
    "id": 4,
    "name": "Répondre aux e-mails clients",
    "taskable_id": 305,
    "taskable_type": "SupportTicket",
    "state": "in progress",
    "priority": "low",
    "description": null,
    "start_time": "08:30:00",
    "end_time": '10:00:00',
    "start_date": "2025-07-23",
    "deadline": "2025-07-23",
    "type": 'task',
    "start_at": "2025-07-23T08:30:00Z",
    "finish_at": null,
    "author": "Diana",
    "created_at": "2025-07-23T08:00:00Z",
    "updated_at": "2025-07-23T09:00:00Z"
  },
  {
    "id": 5,
    "name": "Préparer la présentation",
    "taskable_id": 401,
    "taskable_type": "Meeting",
    "state": "done",
    "priority": "high",
    "description": "Finaliser les diapositives pour la présentation du Q3.",
    "start_time": "14:00:00",
    "end_time": "16:00:00",
    "start_date": "2025-07-19",
    "deadline": "2025-07-19",
    "type": 'task',
    "start_at": "2025-07-19T14:00:00Z",
    "finish_at": "2025-07-22T16:30:00Z",
    "author": "Eve",
    "created_at": "2025-07-18T09:00:00Z",
    "updated_at": "2025-07-22T16:30:00Z"
  },
  {
    "id": 6,
    "name": "Former les nouveaux employés",
    "taskable_id": "onboarding-batch-5",
    "taskable_type": "HRTraining",
    "state": "in progress",
    "priority": "medium",
    "description": "Sessions de formation sur les outils internes.",
    "start_time": "10:00:00",
    "end_time": "12:00:00",
    "start_date": "2025-07-22",
    "deadline": "2025-07-22",
    "type": 'task',
    "start_at": "2025-07-22T10:00:00Z",
    "finish_at": null,
    "author": "Frank",
    "created_at": "2025-07-20T11:00:00Z",
    "updated_at": "2025-07-22T11:30:00Z"
  },
  {
    "id": 7,
    "name": "Analyser les données de vente",
    "taskable_id": 502,
    "taskable_type": "DataAnalysis",
    "state": "not started",
    "priority": "high",
    "description": "Évaluer les tendances de vente du dernier trimestre.",
    "start_time": '04:00:00',
    "end_time": '10:00:00',
    "start_date": "2025-07-25",
    "deadline": "2025-07-25",
    "type": 'task',
    "start_at": null,
    "finish_at": null,
    "author": "Grace",
    "created_at": "2025-07-22T15:00:00Z",
    "updated_at": "2025-07-22T15:00:00Z"
  },
  {
    "id": 8,
    "name": "Organiser l'événement d'entreprise",
    "taskable_id": "annual-gala-2025",
    "taskable_type": "Event",
    "state": "cancel",
    "priority": "medium",
    "description": "Réservation du lieu, traiteur, divertissements.",
    "start_time": '03:00:00',
    "end_time": '07:00:00',
    "start_date": "2025-07-26",
    "deadline": "2025-07-26",
    "type": 'task',
    "start_at": "2025-06-01T09:00:00Z",
    "finish_at": null,
    "author": "Heidi",
    "created_at": "2025-05-28T10:00:00Z",
    "updated_at": "2025-07-10T11:00:00Z"
  },
  {
    "id": 9,
    "name": "Revoir les politiques de sécurité",
    "taskable_id": 601,
    "taskable_type": "PolicyReview",
    "state": "in progress",
    "priority": "high",
    "description": "Assurer la conformité avec les nouvelles réglementations.",
    "start_time": "13:00:00",
    "end_time": "15:00:00",
    "start_date": "2025-07-23",
    "deadline": "2025-07-23",
    "type": 'task',
    "start_at": "2025-07-23T13:00:00Z",
    "finish_at": null,
    "author": "Ivy",
    "created_at": "2025-07-21T09:00:00Z",
    "updated_at": "2025-07-23T13:00:00Z"
  },
  {
    "id": 10,
    "name": "Tester la nouvelle version du logiciel",
    "taskable_id": "v2.1-release",
    "taskable_type": "SoftwareRelease",
    "state": "done",
    "priority": "medium",
    "description": "Effectuer des tests de régression et des tests fonctionnels.",
    "start_time": "09:00:00",
    "end_time": "17:00:00",
    "start_date": "2025-07-15",
    "deadline": "2025-07-15",
    "type": 'task',
    "start_at": "2025-07-15T09:00:00Z",
    "finish_at": "2025-07-22T17:00:00Z",
    "author": "Jack",
    "created_at": "2025-07-14T10:00:00Z",
    "updated_at": "2025-07-22T17:00:00Z"
  }
];

export const fakeProjects = [
  {
    "id": 1,
    "name": "Planifier la réunion d'équipe",
    "state": "in progress",
    "priority": "high",
    "description": "Préparer l'ordre du jour et inviter les participants.",
    "start_date": "2025-07-22",
    "deadline": "2025-07-25",
    "start_at": null,
    "finish_at": null,
    "author": "Alice",
    "created_at": "2025-07-20T10:00:00Z",
    "updated_at": "2025-07-22T09:30:00Z"
  },
  {
    "id": 2,
    "name": "Planifier la réunion d'équipe",
    "state": "in progress",
    "priority": "high",
    "description": "Préparer l'ordre du jour et inviter les participants.",
    "start_date": "2025-07-25",
    "deadline": "2025-07-29",
    "start_at": null,
    "finish_at": null,
    "author": "Alice",
    "created_at": "2025-07-20T10:00:00Z",
    "updated_at": "2025-07-22T09:30:00Z"
  },
]