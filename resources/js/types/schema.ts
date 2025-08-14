import z from "zod";

export const taskFormSchema  = z.object({
  name: z.string().min(1, "Task name is required"),
  state: z.enum(["not started", "paused", "in progress", "done", "canceled"]),
  priority: z.enum(["high", "medium", "low"]),
  description: z.string().optional(),
  start_time: z.string().min(1, "Start time is required"),
  end_time: z.string().min(1, "End time is required"),
  start_date: z.string(),
  deadline: z.string(),
  taskable_id: z.union([z.number(), z.string()]).optional(),
  taskable_type: z.string().optional(),
});

export const meetingFormSchema = z.object({
  name: z.string().min(1, "Task name is required"),
  description: z.string().optional(),
  start_time: z.string().min(1, "Start time is required"),
  schedule_at: z.string(),
  topics: z.string().min(4, 'topics are required')
})

export const taskFormTeamSchema  = z.object({
  name: z.string().min(1, "Task name is required"),
  state: z.enum(["not started", "paused", "in progress", "done", "canceled"]),
  priority: z.enum(["high", "medium", "low"]),
  description: z.string().optional(),
  assigned: z.array(z.string()).nullable(),
  start_time: z.string().min(1, "Start time is required"),
  end_time: z.string().min(1, "End time is required"),
  start_date: z.string(),
  deadline: z.string(),
  taskable_id: z.union([z.number(), z.string()]).optional(),
  taskable_type: z.string().optional(),
});

export const ProjectTypeSchema = z.object({
    name: z.string(),
    state: z.enum(["not started", "paused", "canceled", "in progress", "done"]),
    priority: z.enum(["high", "medium", "low"]),
    description: z.string(),
    objectif: z.array(z.string()).nullable(), 
    start_date: z.string(),
    deadline: z.string(),
    start_at: z.string().optional(),
    finish_at: z.string().optional(), 
    assigned: z.array(z.string()).nullable().optional(), 
    author: z.string().optional(),
    created_at: z.string().optional(), 
    updated_at: z.string().optional(),
  });

export type ProjectType = z.infer<typeof ProjectTypeSchema>;

export type TaskFormValues = z.infer<typeof taskFormSchema>;

export type TaskFormTeamValues = z.infer<typeof taskFormTeamSchema>;

export type meetingFormValues = z.infer<typeof meetingFormSchema>