# KK45103 Software Evolution Management Study Hub

A personal revision tool for **KK45103 Software Evolution Management** at Universiti Malaysia Sabah (UMS). This is an independent student project and is not an official UMS website.

## Features

- Eight topic pages with notes, exam focus, quizzes, flashcards and mind maps.
- 120 scored questions (15 per topic), with practice and test modes, explanations and mixed exams of 10, 20, 40 or 120 questions.
- 60 flashcards, case studies, process diagrams and comparison tables.
- An automotive plant case study in Topic 8 with five separate, unscored practice questions.
- Search, bookmarks, reviewed sections, completion tracking and quiz history.

## Topics

1. Introduction to Software Maintenance & Evolution
2. The Maintenance Framework
3. Fundamentals of Software Change
4. The Maintenance Process
5. Program Understanding — Part 1
6. Program Understanding — Part 2
7. Reuse and Reusability
8. Management and Organisational Issues

## Run locally

From the repository root, run:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open [http://localhost:8000](http://localhost:8000). The site uses plain HTML, CSS and JavaScript. It requires no dependency installation, build step, API keys or backend.

## Project structure

| Path | Purpose |
| --- | --- |
| `index.html` | Main page and navigation shell |
| `style.css` | Dark theme and responsive layout |
| `content.js` | Topic notes, source references, question bank and case-study data |
| `app.js` | Navigation, search, practice tools and progress tracking |
| `screenshots/` | Desktop and mobile screenshots |

## Progress storage

The app uses browser `localStorage` under the key `kk45103-study-v1`. Completion, quiz history, flashcard ratings, bookmarks and recently visited tabs stay in the same browser profile and site origin. Progress does not sync between devices, and progress on localhost is separate from progress on GitHub Pages. Use **Progress & History → Reset progress** to clear the saved data for the current site.

## Source materials

The study content follows the supplied KK45103 lecture PDFs and slides. Use **View source** in the notes to see file names and page or slide references. Examples and exam-focus prompts are revision aids. The factory case uses TBM Consulting Group’s *Preventative Maintenance Program Cuts Downtime* (pp. 1–3), with the software-maintenance analogy presented separately. The source PDFs and slides are not distributed in this repository.

## Screenshots

| Desktop | Mobile |
| --- | --- |
| [Dashboard](screenshots/01-dashboard.png) | [Mobile dashboard](screenshots/08-mobile.png) |
| [Notes](screenshots/02-notes.png) · [Exam Focus](screenshots/03-exam-focus.png) | |
| [Quiz](screenshots/04-quiz.png) · [Flashcards](screenshots/05-flashcards.png) | |
| [Mind Map](screenshots/06-mind-map.png) · [Progress](screenshots/07-progress.png) | |

## Deploy to GitHub Pages

1. Push the repository to GitHub with `index.html` at the root of `main`.
2. Open the repository’s **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**. Select `main` and `/ (root)`, then click **Save**.
4. Open the published URL from the Pages settings. For this repository, the default URL follows the pattern `https://<your-github-username>.github.io/kk45103-software-evolution-study-hub/`.
