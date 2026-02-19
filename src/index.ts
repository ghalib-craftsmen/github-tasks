import * as readline from 'readline';

// Interface for Todo item
interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

// Todo class to manage todo items
class TodoApp {
  private todos: TodoItem[] = [];
  private nextId: number = 1;

  // Add a new todo item
  addTodo(text: string): TodoItem {
    const todo: TodoItem = {
      id: this.nextId++,
      text: text,
      completed: false,
      createdAt: new Date()
    };
    this.todos.push(todo);
    return todo;
  }

  // Mark a todo as completed
  completeTodo(id: number): boolean {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = true;
      return true;
    }
    return false;
  }

  // Delete a todo item
  deleteTodo(id: number): boolean {
    const index = this.todos.findIndex(t => t.id === id);
    if (index !== -1) {
      this.todos.splice(index, 1);
      return true;
    }
    return false;
  }

  // Get all todos
  getAllTodos(): TodoItem[] {
    return [...this.todos];
  }

  // Get pending todos
  getPendingTodos(): TodoItem[] {
    return this.todos.filter(t => !t.completed);
  }

  // Get completed todos
  getCompletedTodos(): TodoItem[] {
    return this.todos.filter(t => t.completed);
  }

  // Display all todos
  displayTodos(): void {
    if (this.todos.length === 0) {
      console.log('\n📋 No todos yet. Add your first todo!\n');
      return;
    }

    console.log('\n📋 Your Todos:');
    console.log('─'.repeat(50));
    
    this.todos.forEach(todo => {
      const status = todo.completed ? '✅' : '⬜';
      const date = todo.createdAt.toLocaleDateString();
      console.log(`${status} [${todo.id}] ${todo.text} (${date})`);
    });
    
    const completedCount = this.todos.filter(t => t.completed).length;
    const pendingCount = this.todos.length - completedCount;
    console.log('─'.repeat(50));
    console.log(`Total: ${this.todos.length} | Completed: ${completedCount} | Pending: ${pendingCount}\n`);
  }

  // Display menu
  displayMenu(): void {
    console.log('\n📝 Todo App Menu:');
    console.log('─'.repeat(30));
    console.log('1. Add a new todo');
    console.log('2. Mark todo as completed');
    console.log('3. Delete a todo');
    console.log('4. View all todos');
    console.log('5. View pending todos');
    console.log('6. View completed todos');
    console.log('7. Exit');
    console.log('─'.repeat(30));
  }
}

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper function to prompt user
function prompt(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer: string) => {
      resolve(answer);
    });
  });
}

// Main application loop
async function main() {
  const todoApp = new TodoApp();
  
  console.log('\n🎉 Welcome to the Todo App!');
  console.log('A simple command-line todo application built with TypeScript\n');

  while (true) {
    todoApp.displayMenu();
    const choice = await prompt('Enter your choice (1-7): ');

    switch (choice.trim()) {
      case '1':
        // Add a new todo
        const text = await prompt('Enter todo text: ');
        if (text.trim()) {
          const todo = todoApp.addTodo(text.trim());
          console.log(`\n✅ Todo added: "${todo.text}" (ID: ${todo.id})`);
        } else {
          console.log('\n❌ Todo text cannot be empty!');
        }
        break;

      case '2':
        // Mark todo as completed
        todoApp.displayTodos();
        const completeId = await prompt('Enter todo ID to mark as completed: ');
        const idToComplete = parseInt(completeId);
        if (!isNaN(idToComplete)) {
          if (todoApp.completeTodo(idToComplete)) {
            console.log(`\n✅ Todo ${idToComplete} marked as completed!`);
          } else {
            console.log(`\n❌ Todo with ID ${idToComplete} not found!`);
          }
        } else {
          console.log('\n❌ Invalid ID! Please enter a number.');
        }
        break;

      case '3':
        // Delete a todo
        todoApp.displayTodos();
        const deleteId = await prompt('Enter todo ID to delete: ');
        const idToDelete = parseInt(deleteId);
        if (!isNaN(idToDelete)) {
          if (todoApp.deleteTodo(idToDelete)) {
            console.log(`\n🗑️ Todo ${idToDelete} deleted!`);
          } else {
            console.log(`\n❌ Todo with ID ${idToDelete} not found!`);
          }
        } else {
          console.log('\n❌ Invalid ID! Please enter a number.');
        }
        break;

      case '4':
        // View all todos
        todoApp.displayTodos();
        break;

      case '5':
        // View pending todos
        const pendingTodos = todoApp.getPendingTodos();
        if (pendingTodos.length === 0) {
          console.log('\n🎉 No pending todos! Great job!\n');
        } else {
          console.log('\n⏳ Pending Todos:');
          console.log('─'.repeat(50));
          pendingTodos.forEach(todo => {
            const date = todo.createdAt.toLocaleDateString();
            console.log(`⬜ [${todo.id}] ${todo.text} (${date})`);
          });
          console.log(`Total pending: ${pendingTodos.length}\n`);
        }
        break;

      case '6':
        // View completed todos
        const completedTodos = todoApp.getCompletedTodos();
        if (completedTodos.length === 0) {
          console.log('\n📝 No completed todos yet. Keep working!\n');
        } else {
          console.log('\n✅ Completed Todos:');
          console.log('─'.repeat(50));
          completedTodos.forEach(todo => {
            const date = todo.createdAt.toLocaleDateString();
            console.log(`✅ [${todo.id}] ${todo.text} (${date})`);
          });
          console.log(`Total completed: ${completedTodos.length}\n`);
        }
        break;

      case '7':
        // Exit
        console.log('\n👋 Thank you for using the Todo App. Goodbye!\n');
        rl.close();
        process.exit(0);

      default:
        console.log('\n❌ Invalid choice! Please enter a number between 1 and 7.\n');
    }

    // Pause before showing menu again
    await prompt('\nPress Enter to continue...');
  }
}

// Start the application
main().catch((error) => {
  console.error('An error occurred:', error);
  rl.close();
  process.exit(1);
});
