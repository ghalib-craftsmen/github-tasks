# Todo App - TypeScript

A simple command-line todo application built with TypeScript.

## Features

- ✅ Add new todos with priority levels
- ✅ Mark todos as completed
- ✅ Delete todos
- ✅ Update todo priority
- ✅ View all todos
- ✅ View pending todos
- ✅ View completed todos
- ✅ View todos by priority (high/medium/low)
- ✅ Clean and intuitive CLI interface
- 🔴 High priority todos (🔴)
- 🟡 Medium priority todos (🟡)
- 🟢 Low priority todos (🟢)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Build the TypeScript project:
```bash
npm run build
```

## Usage

### Development Mode
Run the app directly from TypeScript source:
```bash
npm run dev
```

### Production Mode
Run the compiled JavaScript:
```bash
npm start
```

## How to Use

Once you run the application, you'll see a menu with the following options:

1. **Add a new todo** - Enter a description and priority (high/medium/low) for your new todo item
2. **Mark todo as completed** - Enter the ID of a todo to mark it as done
3. **Delete a todo** - Enter the ID of a todo to remove it
4. **Update todo priority** - Change the priority level of an existing todo
5. **View all todos** - Display all todo items with their status and priority
6. **View pending todos** - Show only incomplete todos with priority indicators
7. **View completed todos** - Show only completed todos with priority indicators
8. **View todos by priority** - Filter and display todos by their priority level
9. **Exit** - Close the application

### Priority Levels

- 🔴 **High** - Urgent tasks that need immediate attention
- 🟡 **Medium** - Important tasks that should be done soon
- 🟢 **Low** - Tasks that can be done later

## Project Structure

```
.
├── dist/              # Compiled JavaScript output
│   ├── index.js
│   ├── index.d.ts
│   └── ...
├── src/
│   └── index.ts       # Main application source code
├── package.json       # Project configuration and dependencies
├── tsconfig.json      # TypeScript compiler configuration
└── README.md          # This file
```

## Technologies Used

- **TypeScript** - Type-safe JavaScript
- **Node.js** - Runtime environment
- **readline** - Built-in Node.js module for CLI interaction

## Example Session

```
🎉 Welcome to the Todo App!
A simple command-line todo application built with TypeScript

📝 Todo App Menu:
───────────────────────────────────
1. Add a new todo
2. Mark todo as completed
3. Delete a todo
4. Update todo priority
5. View all todos
6. View pending todos
7. View completed todos
8. View todos by priority
9. Exit
───────────────────────────────────
Enter your choice (1-9): 1
Enter todo text: Complete project report
Enter priority (high/medium/low) [default: medium]: high

✅ Todo added: "Complete project report" (ID: 1, Priority: high)

Enter your choice (1-9): 1
Enter todo text: Review code
Enter priority (high/medium/low) [default: medium]: medium

✅ Todo added: "Review code" (ID: 2, Priority: medium)

Enter your choice (1-9): 5

📋 Your Todos:
────────────────────────────────────────────────────────────────────────────
⬜ 🔴 [1] Complete project report (2/19/2026) [high]
⬜ 🟡 [2] Review code (2/19/2026) [medium]
────────────────────────────────────────────────────────────────────────────
Total: 2 | Completed: 0 | Pending: 2
```

## License

ISC
