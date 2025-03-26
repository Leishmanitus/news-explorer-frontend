# News Explorer

News Explorer is a web application that allows users to search for news articles, save their favorite articles, and manage their saved articles. The app is built with React and integrates with a news API to fetch articles. Users can register, log in, and securely manage their saved articles.

## Features

### 1. **Search for News**
   - Users can search for news articles by entering a keyword in the search bar.
   - The app fetches articles from the [News API](https://newsapi.org/) and displays the results.
   - Articles are displayed with the following details:
     - Title
     - Description
     - Source
     - Author
     - Published Date
     - Link to the full article

### 2. **Save Articles**
   - Logged-in users can save articles to their personal account.
   - Saved articles are stored in the backend and associated with the user's account.

### 3. **Manage Saved Articles**
   - Users can view their saved articles on the "Saved News" page.
   - Users can delete articles from their saved list.

### 4. **User Authentication**
   - Users can register for an account by providing their name, email, and password.
   - Registered users can log in to access their saved articles.
   - User sessions are maintained using JSON Web Tokens (JWT), which are stored in the browser's local storage.

### 5. **Responsive Design**
   - The app is fully responsive and works seamlessly on desktop, tablet, and mobile devices.

### 6. **Error Handling**
   - The app displays appropriate error messages for failed API requests or invalid user actions.

---

## Technologies Used

- **Frontend:**
  - React
  - React Router
  - CSS Modules
  - Context API
  - Custom Hooks

- **Backend (Mocked for Development):**
  - JSON Server (for simulating a backend API)

- **External API:**
  - [News API](https://newsapi.org/) for fetching news articles.

---

## Installation and Setup

### Prerequisites
- Node.js and npm installed on your machine.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/news-explorer.git
   cd news-explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the mock backend (JSON Server):
   ```bash
   json-server --watch db.json --port 3001
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open the app in your browser:
   ```
   http://localhost:3000
   ```

---

## API Endpoints

### Placeholder Links
- **Frontend:** [News Explorer Website](https://news-explorer-frontend.example.com)
- **Backend API:** [News Explorer API](https://news-explorer-api.example.com)

### Backend API Endpoints
- **User Authentication:**
  - `POST /users` - Register a new user.
  - `GET /users` - Retrieve all users.
  - `GET /users?token=<jwt>` - Retrieve a user by token.

- **Articles:**
  - `GET /articles` - Retrieve all articles.
  - `POST /articles` - Add a new article.
  - `PATCH /articles/:id` - Update an article.
  - `DELETE /articles/:id` - Delete an article.

---

## How to Use

### 1. **Register**
   - Click on the "Sign Up" button in the header.
   - Fill in your name, email, and password to create an account.

### 2. **Log In**
   - Click on the "Sign In" button in the header.
   - Enter your email and password to log in.

### 3. **Search for News**
   - Enter a keyword in the search bar and click "Search."
   - View the list of articles matching your search term.

### 4. **Save Articles**
   - Click the bookmark icon on an article to save it to your account.
   - Saved articles are accessible on the "Saved News" page.

### 5. **Manage Saved Articles**
   - Navigate to the "Saved News" page to view your saved articles.
   - Click the delete icon on an article to remove it from your saved list.

---

## Folder Structure

```
news-explorer/
├── public/
├── src/
│   ├── assets/               # Images and static assets
│   ├── components/           # React components
│   ├── contexts/             # Context API files
│   ├── hooks/                # Custom React hooks
│   ├── utils/                # Utility functions and API files
│   ├── App.css               # Global styles
│   ├── App.js                # Main app component
│   ├── index.js              # Entry point
│   └── db.json               # Mock database for JSON Server
└── README.md
```

---

## Future Improvements

- Implement a real backend API for production.
- Add user profile management features.
- Improve search functionality with advanced filters.
- Add pagination for search results.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- [News API](https://newsapi.org/) for providing the news data.
- [JSON Server](https://github.com/typicode/json-server) for simulating the backend API during development.
