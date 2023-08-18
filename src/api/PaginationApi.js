
export async function fetchPaginationAPi() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const user = await response.json();
      return user;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }
  