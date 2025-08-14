import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export type route_type = {
    title: string;
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    href: string;
}[]

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Todo {
    id?: number;
    name: string;
    taskable_id?: string | null;
    taskable_type?: string | null; 
    state: "not started" | "paused" | "in progress" | "done" | "canceled";
    priority: "high" | "medium" | "low";
    description: string;
    type?: "task" | "habit";
    assignee?: string[];
    start_time?: string;
    end_time?: string;
    start_date: string;
    deadline: string;
    havedoit?: string[] | null;
    start_at?: string | null;
    finish_at?: string | null;
    author?: string;
    created_at?: string;
    updated_at?: string;
  }

 export type tasks = {
    name: string;
    state: "not started" | "paused" | "in progress" | "done" | "canceled";
    priority: "high" | "medium" | "low";
    start_time: string;
    end_time: string;
    start_date: string;
    deadline: string;
    description: string;
    type: string
  }

  export interface ProjectType {
    id: number;
    name: string;
    state: "not started" | "paused" | "in progress" | "done" | "canceled";
    priority: "high" | "medium" | "low";
    description: string | null;
    objectif: string | null;
    start_date: string;
    deadline: string;
    start_at: string | null; 
    finish_at: string | null; 
    assignee?: string | null; 
    author: string;
    created_at: string;
    updated_at: string;
  }

export interface Company {
    id: number;
    name: string;
    description: string | null;
    mission: string;
    author: string;
    created_at: string;
    updated_at: string;
}

export interface teamType {
    id: number;
    name: string;
    description: string | null;
    mission: string;
    author: {id: number, email: string};
    created_at: string;
    updated_at: string;
}

export interface MeetingType {
    id?: number;
    name: string;
    topics: string;
    description: string;
    schedule_at: string;
    start_time: string;
    author?: string
}

export interface Message {
    id: number;
    sender_id: number;
    receiver_id: number;
    subject: string;
    salutation: string;
    closing: string;
    content: string;
    send_at: string,
    is_read: boolean;
}