# Practical 8: Update Operation (Product Modification)

## BCA (Hons.) React.js Practical 8

### 🎯 Objective
To implement the **Update (U)** operation of CRUD in React by enabling users to edit an existing record, validating updated fields, and updating state immutably using `Array.prototype.map()`.

### 💡 Core Concepts Demonstrated
1. **Editing Mode State**: Managing `editingId` to conditionally switch between display mode and edit mode.
2. **Pre-filled Form Data**: Populating the edit form with current product attributes upon clicking Edit.
3. **Immutable Update Pattern**: Updating the matching product record via `prev.map(item => item.id === id ? { ...item, ...updates } : item)`.
4. **Validation and Cancellation**: Validating input fields before applying changes, with a safe Cancel action that discards edits.

### 🚀 Running Locally
```bash
npm install
npm run dev
```

### 📦 Tech Stack
- React 19 / 18
- Vite
- Vanilla Modern CSS
