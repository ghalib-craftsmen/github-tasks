import * as readline from 'readline';

// Priority type for todos
type Priority = 'high' | 'medium' | 'low';

// Interface for Todo item
interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
  priority: Priority;
  createdAt: Date;
}

// Todo class to manage todo items
class TodoApp {
  private todos: TodoItem[] = [];
  private nextId: number = 1;

  // Add a new todo item
  addTodo(text: string, priority: Priority = 'medium'): TodoItem {
    const todo: TodoItem = {
      id: this.nextId++,
      text: text,
      completed: false,
      priority: priority,
      createdAt: new Date()
    };
    this.todos.push(todo);
    return todo;
  }

  // Update todo priority
  updateTodoPriority(id: number, priority: Priority): boolean {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.priority = priority;
      return true;
    }
    return false;
  }

  // Get todos by priority
  getTodosByPriority(priority: Priority): TodoItem[] {
    return this.todos.filter(t => t.priority === priority);
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

  // Get priority icon
  getPriorityIcon(priority: Priority): string {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
    }
  }

  // Display all todos
  displayTodos(): void {
    if (this.todos.length === 0) {
      console.log('\n📋 No todos yet. Add your first todo!\n');
      return;
    }

    console.log('\n📋 Your Todos:');
    console.log('─'.repeat(60));
    
    this.todos.forEach(todo => {
      const status = todo.completed ? '✅' : '⬜';
      const priorityIcon = this.getPriorityIcon(todo.priority);
      const date = todo.createdAt.toLocaleDateString();
      console.log(`${status} ${priorityIcon} [${todo.id}] ${todo.text} (${date}) [${todo.priority}]`);
    });
    
    const completedCount = this.todos.filter(t => t.completed).length;
    const pendingCount = this.todos.length - completedCount;
    console.log('─'.repeat(60));
    console.log(`Total: ${this.todos.length} | Completed: ${completedCount} | Pending: ${pendingCount}\n`);
  }

  // Display todos by priority
  displayTodosByPriority(priority: Priority): void {
    const todos = this.getTodosByPriority(priority);
    if (todos.length === 0) {
      console.log(`\n📋 No ${priority} priority todos.\n`);
      return;
    }

    const priorityIcon = this.getPriorityIcon(priority);
    console.log(`\n${priorityIcon} ${priority.toUpperCase()} Priority Todos:`);
    console.log('─'.repeat(60));
    
    todos.forEach(todo => {
      const status = todo.completed ? '✅' : '⬜';
      const date = todo.createdAt.toLocaleDateString();
      console.log(`${status} [${todo.id}] ${todo.text} (${date})`);
    });
    
    console.log(`Total ${priority} priority: ${todos.length}\n`);
  }

  // Display menu
  displayMenu(): void {
    console.log('\n📝 Todo App Menu:');
    console.log('─'.repeat(35));
    console.log('1. Add a new todo');
    console.log('2. Mark todo as completed');
    console.log('3. Delete a todo');
    console.log('4. Update todo priority');
    console.log('5. View all todos');
    console.log('6. View pending todos');
    console.log('7. View completed todos');
    console.log('8. View todos by priority');
    console.log('9. Exit');
    console.log('─'.repeat(35));
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
    const choice = await prompt('Enter your choice (1-9): ');

    switch (choice.trim()) {
      case '1':
        // Add a new todo
        const text = await prompt('Enter todo text: ');
        if (text.trim()) {
          const priorityInput = await prompt('Enter priority (high/medium/low) [default: medium]: ');
          const priority = priorityInput.trim().toLowerCase() as Priority;
          if (priority === 'high' || priority === 'medium' || priority === 'low' || priorityInput.trim() === '') {
            const todo = todoApp.addTodo(text.trim(), priority || 'medium');
            console.log(`\n✅ Todo added: "${todo.text}" (ID: ${todo.id}, Priority: ${todo.priority})`);
          } else {
            console.log('\n❌ Invalid priority! Must be high, medium, or low.');
          }
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
        // Update todo priority
        todoApp.displayTodos();
        const updatePriorityId = await prompt('Enter todo ID to update priority: ');
        const idToUpdate = parseInt(updatePriorityId);
        if (!isNaN(idToUpdate)) {
          const newPriorityInput = await prompt('Enter new priority (high/medium/low): ');
          const newPriority = newPriorityInput.trim().toLowerCase() as Priority;
          if (newPriority === 'high' || newPriority === 'medium' || newPriority === 'low') {
            if (todoApp.updateTodoPriority(idToUpdate, newPriority)) {
              console.log(`\n✅ Todo ${idToUpdate} priority updated to ${newPriority}!`);
            } else {
              console.log(`\n❌ Todo with ID ${idToUpdate} not found!`);
            }
          } else {
            console.log('\n❌ Invalid priority! Must be high, medium, or low.');
          }
        } else {
          console.log('\n❌ Invalid ID! Please enter a number.');
        }
        break;

      case '5':
        // View all todos
        todoApp.displayTodos();
        break;

      case '6':
        // View pending todos
        const pendingTodos = todoApp.getPendingTodos();
        if (pendingTodos.length === 0) {
          console.log('\n🎉 No pending todos! Great job!\n');
        } else {
          console.log('\n⏳ Pending Todos:');
          console.log('─'.repeat(60));
          pendingTodos.forEach(todo => {
            const priorityIcon = todoApp.getPriorityIcon(todo.priority);
            const date = todo.createdAt.toLocaleDateString();
            console.log(`⬜ ${priorityIcon} [${todo.id}] ${todo.text} (${date}) [${todo.priority}]`);
          });
          console.log(`Total pending: ${pendingTodos.length}\n`);
        }
        break;

      case '7':
        // View completed todos
        const completedTodos = todoApp.getCompletedTodos();
        if (completedTodos.length === 0) {
          console.log('\n📝 No completed todos yet. Keep working!\n');
        } else {
          console.log('\n✅ Completed Todos:');
          console.log('─'.repeat(60));
          completedTodos.forEach(todo => {
            const priorityIcon = todoApp.getPriorityIcon(todo.priority);
            const date = todo.createdAt.toLocaleDateString();
            console.log(`✅ ${priorityIcon} [${todo.id}] ${todo.text} (${date}) [${todo.priority}]`);
          });
          console.log(`Total completed: ${completedTodos.length}\n`);
        }
        break;

      case '8':
        // View todos by priority
        const priorityViewInput = await prompt('Enter priority to view (high/medium/low): ');
        const priorityView = priorityViewInput.trim().toLowerCase() as Priority;
        if (priorityView === 'high' || priorityView === 'medium' || priorityView === 'low') {
          todoApp.displayTodosByPriority(priorityView);
        } else {
          console.log('\n❌ Invalid priority! Must be high, medium, or low.');
        }
        break;

      case '9':
        // Exit
        console.log('\n👋 Thank you for using the Todo App. Goodbye!\n');
        rl.close();
        process.exit(0);

      default:
        console.log('\n❌ Invalid choice! Please enter a number between 1 and 9.\n');
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
