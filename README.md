# Google extension Inspect

## Chrome Extension in React with Typescript 🚀

_Google extension Inspect is a Google Chrome extension designed to efficiently inspect elements on a web page. With this tool, you can analyze and mark specific elements within the DOM structure of a web page, making the development and debugging process easier._

## Features

- Element Inspection: Select and highlight HTML elements within the web page.

- Quick Marking: Mark and save elements for future reference.

- Intuitive Interface: Easily navigate through a user-friendly interface.

- Capture Support: Capture parts of the page to document errors or specific features.

## Project Structure

```plaintext
└── 📁Google extension react
    └── .gitignore
    └── package-lock.json
    └── package.json
    └── README.md
    └── 📁src
        └── App.tsx
        └── 📁background
            └── background.ts
        └── 📁capture
            └── capture.html
        └── 📁captureScript
            └── captureScript.ts
        └── 📁contentScript
            └── contentScript.ts
        └── global.ts
        └── 📁options
            └── options.css
            └── options.tsx
        └── 📁static
            └── active-icon.png
            └── icon.png
            └── icon128.png
            └── icon16.png
            └── icon48.png
            └── inactive-icon.png
            └── manifest.json
    └── tsconfig.json
    └── webpack.common.js
    └── webpack.dev.js
    └── webpack.prod.js
```

## Installation

**1. Clone this repository to your local machine:.**

```bash
git clone https://github.com/VarelaCristianFacundo/history-mark.git
```

**2. Navigate to the project directory:**

```bash
cd history-mark
```

**3. Install the necessary dependencies:**

```bash
npm install
```

**4. Build the project:**

```bash
npm run build
```

**5. Load the extension in Google Chrome:**

- Open chrome://extensions/ in your browser.
- Enable "Developer mode" in the top right corner.
- Click "Load unpacked" and select the generated build folder.

## Usage

1- Once the extension is installed, click on the icon in the Chrome toolbar.

2- Select an element on the web page to inspect it.

3- Use the marking tools to highlight and save elements.

4- Access the captures through the extension for future reference.

## Contribution

Contributions are welcome! If you find a bug or have suggestions for improvement, please open an issue or submit a pull request.

## Contact

If you have any questions or suggestions, feel free to reach out at **cvarelagarcia@gmail.com.**

## Author

- [@VarelaCristianFacundo](https://github.com/VarelaCristianFacundo)
