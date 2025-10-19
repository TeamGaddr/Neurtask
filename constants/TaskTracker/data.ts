export interface Pending {
	id: number
	title: string
	date: string
	status: string
	progress: number
  }
  
  export const pendingTasks: Pending[] = [
	{
	  id: 1,
	  title: "Summarize Meeting",
	  date: "12.12.2024, 19:49",
	  status: "Scheduled",
	  progress: 0,
	},
	{
	  id: 2,
	  title: "Design Review",
	  date: "15.12.2024, 10:00",
	  status: "In Progress",
	  progress: 0,
	},
	{
	  id: 3,
	  title: "Code Refactoring",
	  date: "20.12.2024, 14:30",
	  status: "Pending",
	  progress: 0,
	},
  ]


  export interface Running {
	id: number
	title: string
	date: string
	status: string
	progress: number
  }
  
  export const RunningTasks: Running[] = [
	{
	  id: 1,
	  title: "Summarize Meeting",
	  date: "12.12.2024, 19:49",
	  status: "Scheduled",
	  progress: 67,
	},
	{
	  id: 2,
	  title: "Design Review",
	  date: "15.12.2024, 10:00",
	  status: "In Progress",
	  progress: 80,
	},
	{
	  id: 3,
	  title: "Code Refactoring",
	  date: "20.12.2024, 14:30",
	  status: "Pending",
	  progress: 50,
	},
  ]
  

  export interface Finished {
	id: number
	title: string
	date: string
	status: string
	progress: number
  }
  
  export const FinishedTasks: Finished[] = [
	{
	  id: 1,
	  title: "Summarize Meeting",
	  date: "12.12.2024, 19:49",
	  status: "Scheduled",
	  progress: 100,
	},
	{
	  id: 2,
	  title: "Design Review",
	  date: "15.12.2024, 10:00",
	  status: "In Progress",
	  progress: 100,
	},
	{
	  id: 3,
	  title: "Code Refactoring",
	  date: "20.12.2024, 14:30",
	  status: "Pending",
	  progress: 100,
	},
  ]