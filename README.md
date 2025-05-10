# PostCSS Watcher Plugin

**PostCSS Watcher Plugin** is a PostCSS plugin that monitors source file changes and triggers custom actions during development.

This plugin detects modifications to CSS file and can integrate with your development workflow to provide live reloading, automatic rebuilding, or any other custom response when changes are made. It’s perfect for improving productivity in dynamic development environments.

## ✨ Features

- 🔄 Watches specified file for changes
- 🧩 Easy integration with live reload servers or build tools
- 🛠️ Lightweight and simple configuration
- 💻 Computes a SHA-256 hash to compare content integrity.

## 🚀 Use Cases

- Live CSS injection in development
- Automatic rebuilds on file save
- Triggering custom scripts, tests, or notifications on file changes

## 🔧 Installation

```bash
npm i @hacerx/postcss-watcher-plugin
```

## Usage

### Basic
```js
/* postcss.config.mjs */
import { watcher } from '@hacerx/postcss-watcher-plugin';

/** @type {import('postcss-load-config').Config} */
export default {
    plugins: [watcher()]
}
```

### With Options
```js
/* postcss.config.mjs */
import { watcher } from '@hacerx/postcss-watcher-plugin';

/** @type {import('postcss-load-config').Config} */
export default {
    plugins: [
        watcher({ 
            file: 'output.css', 
            onChange: (diff) => { 
                console.log('CSS changed:', diff) 
            }
        })
    ]
}
```

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `file` | `string` | `output.css` | The file to watch for changes. |
| `onChange` | `function` | `() => {}` | Callback invoked when CSS has changed. Receives old and new hash. |