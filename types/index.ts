export type UserRole = "admin" | "project_manager" | "developer" | "tester" | "client";
export type ProjectStatus = "planning" | "active" | "completed" | "on_hold";
export type SprintStatus = "planned" | "active" | "completed";
export type TaskStatus = "todo" | "in_progress" | "review" | "testing" | "done";
export type BacklogStatus = "open" | "in_sprint" | "done";
export type Priority = "low" | "medium" | "high" | "critical";
export type OrderStatus = "pending" | "in_progress" | "revision" | "completed" | "rejected";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  created_at: string;
}
export interface Project {
  id: number;
  name: string;
  description: string;
  status: ProjectStatus;
  created_by: number;
  created_at: string;
  updated_at: string;
}
export interface Sprint {
  id: number;
  project_id: number;
  name: string;
  goal: string;
  start_date: string;
  end_date: string;
  status: SprintStatus;
}
export interface BacklogItem {
  id: number;
  project_id: number;
  title: string;
  description: string;
  priority: Priority;
  status: BacklogStatus;
  created_by: number;
}
export interface Task {
  id: number;
  sprint_id: number;
  backlog_item_id: number;
  title: string;
  description: string;
  assigned_to: number;
  priority: Priority;
  status: TaskStatus;
  created_at: string;
  updated_at: string;
}
export interface Comment {
  id: number;
  task_id: number;
  user_id: number;
  content: string;
  created_at: string;
  updated_at: string;
}
export interface ProjectMember {
  id: number;
  project_id: number;
  user_id: number;
  role: string;
  joined_at: string;
}
export interface Order {
  id: number;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  customer_company: string;
  description: string;
  ai_category: string;
  ai_features: string[];
  ai_price_min: number;
  ai_price_max: number;
  ai_duration_weeks: number;
  ai_complexity: string;
  agreed_price: number;
  agreed_duration: number;
  status: OrderStatus;
  project_id: number;
  admin_notes: string;
  rejected_reason: string;
  created_at: string;
  updated_at: string;
}
export interface OrderTrackingLog {
  id: number;
  order_id: number;
  status: OrderStatus;
  note: string;
  created_at: string;
}
