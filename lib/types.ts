// TypeScript interfaces based on MongoDB schemas

export interface UserInterface {
  _id: string;
  username: string;
  email: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CaseInterface {
  _id: string;
  title: string;
  description?: string;
  clientName: string;
  clientEmail?: string;
  caseType: "civil" | "criminal" | "contract" | "corporate" | "other";
  status: "draft" | "active" | "closed";
  filedAt: string;
  owner: string; // ObjectId as string
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

// API Response types
export interface LoginResponse {
  token: string;
  user: UserInterface;
}

export interface RegisterResponse {
  token: string;
  user: UserInterface;
}

// Form types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  bio?: string;
}

export interface CaseFormData {
  title: string;
  description?: string;
  clientName: string;
  clientEmail?: string;
  caseType: "civil" | "criminal" | "contract" | "corporate" | "other";
  status: "draft" | "active" | "closed";
  filedAt: string;
}