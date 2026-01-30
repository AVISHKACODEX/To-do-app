# TaskFlow - Modern To-Do List Application

A clean, modern, and responsive to-do list web application built with vanilla HTML, CSS, and JavaScript. Features persistent storage using browser LocalStorage.

![TaskFlow Preview](https://img.shields.io/badge/Status-Production_Ready-success)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

- ✅ **Add, Edit, Delete Tasks** - Full CRUD operations
- ✅ **Mark as Complete** - Track your progress
- ✅ **Filter Tasks** - View All, Completed, or Pending tasks
- ✅ **Persistent Storage** - Tasks saved in LocalStorage
- ✅ **Statistics Dashboard** - Track total, completed, and pending tasks
- ✅ **Responsive Design** - Works on mobile, tablet, and desktop
- ✅ **Smooth Animations** - Modern UI with elegant transitions
- ✅ **Dark Theme** - Easy on the eyes
- ✅ **No Dependencies** - Pure vanilla JavaScript

## 🚀 Quick Start

1. **Clone or Download** this repository
2. **Open** `index.html` in your web browser
3. **Start** adding tasks!

No build process, no installation required.

## 📁 Project Structure

```
taskflow/
│
├── index.html          # Main HTML file
├── style.css           # All styles and animations
├── script.js           # Application logic
└── README.md           # Documentation
```

## 🎯 How to Use

### Adding a Task
1. Type your task in the input field
2. Click "Add Task" or press Enter
3. Task appears in the list

### Completing a Task
- Click the checkbox next to any task to mark it as complete
- Click again to mark as incomplete

### Editing a Task
1. Click the edit (pencil) icon
2. Modify the text
3. Click the checkmark to save or X to cancel

### Deleting a Task
- Click the trash icon next to any task

### Filtering Tasks
- Use the filter buttons to view:
  - **All Tasks** - Shows everything
  - **Pending** - Shows incomplete tasks
  - **Completed** - Shows finished tasks

### Clearing All Tasks
- Click "Clear All Tasks" button at the bottom
- Confirm the action in the popup

## 💾 Data Persistence

All tasks are automatically saved to your browser's LocalStorage:
- Tasks persist after closing the browser
- No server or database required
- Data stays on your device

**Note:** Clearing browser data will delete all tasks.

## 🎨 Customization

### Colors
Edit CSS variables in `style.css`:

```css
:root {
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --bg-primary: #0f0f1e;
    --text-primary: #ffffff;
    /* ... more variables ... */
}
```

### Fonts
Current fonts (from Google Fonts):
- **Display:** Syne
- **Body:** Poppins

Change in `index.html` `<head>` section.

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Opera (latest)

**Requires:** LocalStorage support (all modern browsers)

## 🔐 Security Features

- **XSS Protection** - All user input is escaped
- **No External Dependencies** - Reduced attack surface
- **Client-Side Only** - No data transmission

## 📱 Responsive Breakpoints

- **Desktop:** 769px and above
- **Tablet:** 481px - 768px
- **Mobile:** 480px and below

## ⌨️ Keyboard Shortcuts

- **Enter** - Add task (when input is focused)
- **Ctrl/Cmd + K** - Focus input field

## 🛠️ Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Grid, Flexbox, and animations
- **Vanilla JavaScript** - No frameworks or libraries
- **LocalStorage API** - Data persistence

## 📝 Code Highlights

### Clean Architecture
- Separated concerns (HTML, CSS, JS)
- Well-commented code
- Modular functions

### Best Practices
- Semantic HTML
- CSS custom properties
- Event delegation
- Error handling
- Accessibility considerations

## 🤝 Contributing

This is a beginner-friendly project. Feel free to:
- Fork the repository
- Make improvements
- Submit pull requests

## 📄 License

Free to use for personal and commercial projects.

## 🐛 Known Issues

None currently. Report bugs by creating an issue.

## 🔮 Future Enhancements

Potential features to add:
- [ ] Task priorities
- [ ] Due dates
- [ ] Categories/tags
- [ ] Search functionality
- [ ] Export/Import tasks
- [ ] Themes (light/dark toggle)
- [ ] Drag and drop reordering

## 💡 Tips

1. **Backup Your Tasks** - Export LocalStorage data periodically
2. **Use Filters** - Keep your list organized
3. **Regular Cleanup** - Delete completed tasks you no longer need

## 📞 Support

For questions or suggestions:
- Create an issue on GitHub
- Fork and improve!

---

**Built with ❤️ using vanilla web technologies**

*No frameworks harmed in the making of this application*
