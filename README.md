# Lumina Memory Architect

Advanced memory editor and debugger interface for Linux (Fedora optimized).

## 🚀 How to Test on Your Computer

To run this application locally, ensure you have [Node.js](https://nodejs.org/) installed on your Fedora/Linux system.

### 1. Setup the Project
Copy all the files from this project into a folder named `lumina-app`, then open your terminal in that folder:

```bash
# Install dependencies
npm install
```

### 2. Run in Development Mode
You can run the app as a desktop window immediately using Electron:

```bash
# Start the Electron desktop app
npm start
```

### 3. Build for Fedora (RPM / AppImage)
To create the actual installer files that you can share or install on your system:

```bash
# Generate the dist folder with AppImage and RPM
npm run dist
```
The files will appear in the `./dist` folder.

## 🛠 Project Structure

- `main.js`: Electron entry point (handles the desktop window).
- `App.tsx`: Main React logic and UI layout.
- `components/`: UI modules (Scanner, AI Assistant, Distribution Portal).
- `package.json`: Configuration for building Linux binaries.

## 🤖 AI Assistant
The app includes a built-in Gemini AI consultant. To use it locally, ensure your `process.env.API_KEY` is set in your environment or a `.env` file.

## 📦 Distribution
Use the **Distribution Tab** inside the app to generate Fedora `.spec` files and Flatpak manifests for official repository submission.

---
*Created for the Fedora community. Free and Open Source.*
