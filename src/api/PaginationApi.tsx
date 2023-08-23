import { Todo } from "../utils/types";

export async function fetchPaginationAPI(): Promise<Todo[]> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}