# Todo App - TypeScript

A simple command-line todo application built with TypeScript.

## Features

- ✅ Add new todos
- ✅ Mark todos as completed
- ✅ Delete todos
- ✅ View all todos
- ✅ View pending todos
- ✅ View completed todos
- ✅ Clean and intuitive CLI interface

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

1. **Add a new todo** - Enter a description for your new todo item
2. **Mark todo as completed** - Enter the ID of a todo to mark it as done
3. **Delete a todo** - Enter the ID of a todo to remove it
4. **View all todos** - Display all todo items with their status
5. **View pending todos** - Show only incomplete todos
6. **View completed todos** - Show only completed todos
7. **Exit** - Close the application

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
──────────────────────────────
1. Add a new todo
2. Mark todo as completed
3. Delete a todo
4. View all todos
5. View pending todos
6. View completed todos
7. Exit
──────────────────────────────
Enter your choice (1-7): 1
Enter todo text: Learn TypeScript

✅ Todo added: "Learn TypeScript" (ID: 1)
```

## License

ISC
