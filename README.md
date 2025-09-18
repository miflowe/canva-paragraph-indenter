A tiny open-source app that adds **paragraph indentation** to text in Canva designs. If you have ever spent too long nudging spaces by hand, this tool is for you.

> Status: Development preview. I’m working toward publishing on the Canva Marketplace. Until then, you can run it locally and use it in your own Canva designs.

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Why I Built This](#why-i-built-this)
- [Quick Start](#quick-start)
- [Using It Inside Canva (Local Dev)](#using-it-inside-canva-local-dev)
- [How It Works](#how-it-works)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)

---

## Overview

**Paragraph Indenter for Canva** automatically formats the selected textbox with consistent first-line indentation for each paragraph. It saves time on repetitive formatting and helps keep multi-paragraph text readable and professional.

This repository contains the source code for the Canva App (React + TypeScript) and supporting utilities to run it locally during development.

---

## Features

- Custom indentation size (number of spaces)
- One-click apply to the currently selected textbox
- Friendly validation and error messages (e.g., when nothing is selected)
- Lightweight UI with sensible defaults
- Safe to test locally alongside your Canva designs

Planned:
- Optional live preview before applying
- Rich-text preservation (keep bold/italic/links while indenting)
- More formatting options (paragraph spacing, line spacing, etc.)

---

## Why I Built This

Manually indenting text in Canva is tedious. This little tool has already saved me hours and removed a common source of frustration. I’m sharing it openly so others can benefit, learn from the code, and help shape the roadmap.

---

## Quick Start

Requirements:
- Node.js (LTS recommended)
- npm (comes with Node.js)
- A Canva account (to use the app in Dev Mode)

Clone and install:
```bash
git clone https://github.com/YOUR_USERNAME/paragraph-indenter.git
cd paragraph-indenter
npm install
```

Start the dev server:
```
npm run
This usually serves the app at something like http://localhost:8080 (check your terminal output).
```

---

## Using It Inside Canva (Local Dev)

1. With npm run running, open Canva in your browser.
2. If prompted to enter a development URL, paste the dev server URL printed by your terminal (often http://localhost:8080).
3. Open any design, open the app through the sidebar, select a textbox, choose an indentation size, and click Apply.

---

## How It Works

- Built with React + TypeScript using the Canva App SDK and UI Kit.
- Reads the currently selected design element (plain text textbox) and applies a first-line indentation to each paragraph based on your chosen size.
- Handles basic validation (e.g., shows a message if no single plaintext textbox is selected).
Note: Rich text preservation (bold/italic/links) is on the roadmap. Today’s version focuses on plaintext textboxes for predictable results.

---

## Roadmap

- Live preview panel while editing indentation
- Preserve original rich text formatting
- Per-paragraph options (e.g., skip indentation after headings)
- Better error messages and edge-case handling
- Unit tests
If any of these are important to you, please open an issue and share your use case! Feedback helps prioritize the work.

---

## Contributing

Contributions are always welcomed with open arms!

- Issues: open a clear bug report or feature request with steps and screenshots where possible.
- Pull Requests: create a fork, branch from main, and submit a PR describing the change and rationale.
- Code Style: keep changes focused and small; add comments where behavior might not be obvious.

---

## Acknowledgements

- Canva’s developer docs & SDK for making this possible
- The open-source community — which is why I’m giving back by sharing this project!
