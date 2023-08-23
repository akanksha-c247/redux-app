export interface InputProps {
  type: string;
  name: string;
  value: string;
  onChange: (newValue: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SearchAppBarProps {}

export interface SignInFormData {
  email: string;
  password: string;
}

export interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface Users {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export interface Todo {
  data: Todo[] 
  password: string;
  email: string;
  lastName: string;
  firstName: string;
  customId: number;
  id: number;
  userId: number;
  title: string;
  completed: boolean;
  error:string;
}

export interface User {
  id: number;
  customId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userId: number;
  title: string;
  completed: boolean;
}

export interface UserState {
  userList: Todo[];
  todos: Todo[];
  originalTodos: Todo[];
  todosPerPage: number;
  currentPage: number;
  loading: boolean;
  loggedInUser: User[];
  isAuthenticated: boolean;
}

export type InputType = "email" | "password";

export type ValidationMessage =
  | ""
  | "Invalid email address"
  | "Password is too short";

export interface RootState {
  USERS: UserState;
}

export interface FetchPaginationResponse {
  data: Todo[],
}
