<h3 align="center">
  <a href="https://todo.soulstices.dev">
    <img align="center" height="32" src="./src/lib/favicon.png"></a>
  Checked
</h1>

<div align="center"><a href="https://todo.soulstices.dev" align="center">Live Demo</a></div>
<hr>
<h3 align="center">Technologies:</h3>

<p align="center">
  <a href="https://todo.soulstices.dev">
    <img src="https://skillicons.dev/icons?i=ts,svelte,vite,electron,tailwind" />
  </a>
</p>

## What is Checked?

**Checked** is a simple open-source To-Do app built with Svelte. It operates without the need for a backend server, utilizing local storage to store tasks and encoding data into URLs for easy sharing. This means you can share your task list with others by simply sharing the generated link. Additionally, **Checked** can be packaged as a desktop app using Electron.

## Installation

1. **Node.js**: Make sure you have Node.js installed on your computer. You can download it from the [official website](https://nodejs.org/).

2. **Install Dependencies**: Run the `npm install` command in your project's root directory to install all dependencies.

3. After installing the dependencies, you are ready to start the development.

## Development

### Starting the Development Server

To begin development, start the development server by running the `npm run dev` command.

### Detecting TypeScript Issues
You can use the `npm run check:watch` command in your IDE's terminal to detect TypeScript issues in your code. This command automatically checks all files for issues after you make changes.

### Running Electron (Optional)
While it's recommended to develop on the default development server, you may also want to test how your project runs in Electron. Follow these steps:
1. Build the Svelte app by running `npm run build`.
2. Start Electron with `npm run start`.

Please note that after making changes, you'll need to rerun both commands. This workflow may be improved in the future.

## Packaging for Deployment/Distribution
If you've made changes to the project and want to host it on the internet or create a desktop app, follow these steps:

1. Build the static website by running `npm run build`.

   This command generates a static website in the `/dist` folder, which you can then easily host on any hosting service.
3. To create a desktop app, run the `npm run make` command.

   This command generates a desktop app in the `/out` folder. Please note that the desktop app has only been tested on Windows.

## License

**Checked** is open-source and available under the [MIT License](LICENSE.md).

