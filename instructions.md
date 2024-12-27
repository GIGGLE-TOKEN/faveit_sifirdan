# Notes from V0 (frontend) Team:

Here are detailed notes for the Cursor Team to build backend files that align with the current frontend:

## Dependencies to be installed:

### MongoDB:

- npm install --save mongoose

### Redis:

- npm install --save redis

### MeiliSearch:

- npm install --save meilisearch

### Docker:

- npm install --save docker

### Node.js Dependencies (add to package.json):

- npm install --save \
  express \
  mongoose \
  redis \
  meilisearch \
  socket.io \
  jsonwebtoken \
  bcryptjs \
  cors \
  helmet \
  winston \
  dotenv \
  express-rate-limit \
  express-validator \
  multer \
  aws-sdk \
  node-fetch \
  @sentry/node

### Development Dependencies:

- npm install --save-dev \
  @types/express \
  @types/mongoose \
  @types/redis \
  @types/socket.io \
  @types/jsonwebtoken \
  @types/bcryptjs \
  @types/cors \
  typescript \
  ts-node \
  nodemon \
  jest \
  @types/jest \
  supertest \
  @types/supertest


## Authentication System:

1. The frontend uses NextAuth for authentication (see `app/api/auth/[...nextauth]/route.ts`).
2. Implement JWT (JSON Web Tokens) for stateless authentication.
3. Create these endpoints:
  - POST /api/auth/signin: For user login
  - POST /api/auth/signup: For user registration
  - POST /api/auth/signout: For user logout
  - GET /api/auth/session: To retrieve current session info
4. Ensure the JWT contains user ID, username, and roles/permissions.
5. Set up middleware to verify JWT on protected routes.



## User Management:

1. User model should include: id, username, fullName, email, profilePicture, about, links, followingCount, followersCount, isActivated (see `types/index.ts`).
2. Implement these endpoints:
- GET /api/users/:username: Fetch user profile
- PUT /api/users/:username: Update user profile
- GET /api/users/:username/followers: Fetch user's followers
- GET /api/users/:username/following: Fetch users being followed
- POST /api/users/:username/follow: Follow a user
- DELETE /api/users/:username/follow: Unfollow a user



## Post Management:

1. Post model should include: id, userId, content, favoriteItem (type, title, link), createdAt, likes, bookmarks, comments (see `types/index.ts`).
2. Implement these endpoints:
  - GET /api/posts: Fetch feed (with pagination)
  - POST /api/posts: Create a new post
  - GET /api/posts/:id: Fetch a specific post
  - PUT /api/posts/:id: Update a post
  - DELETE /api/posts/:id: Delete a post
  - POST /api/posts/:id/like: Like a post
  - DELETE /api/posts/:id/like: Unlike a post
  - POST /api/posts/:id/bookmark: Bookmark a post
  - DELETE /api/posts/:id/bookmark: Remove bookmark



## Comments:

1. Comment model should include: id, userId, postId, content, createdAt (see `types/index.ts`). Implement these endpoints:
  - GET /api/posts/:id/comments: Fetch comments for a post
  - POST /api/posts/:id/comments: Add a comment to a post
  - PUT /api/comments/:id: Update a comment
  - DELETE /api/comments/:id: Delete a comment



## Messaging System:

1. Message model should include: id, senderId, receiverId, content, createdAt, read, readAt (see `types/index.ts`).
2. Implement these endpoints:
  - GET /api/messages: Fetch user's conversations
  - GET /api/messages/:userId: Fetch messages with a specific user
  - POST /api/messages: Send a new message
  - PUT /api/messages/:id/read: Mark a message as read



## Notifications:

1. Notification model should include: id, type, userId, targetId, read, createdAt, content (see `types/index.ts`).
2. Implement these endpoints:
  - GET /api/notifications: Fetch user's notifications
  - PUT /api/notifications/:id/read: Mark a notification as read
  - POST /api/notifications/read-all: Mark all notifications as read



## Search Functionality:

1. Implement a search endpoint: GET /api/search?q=:query
2. This should search across users, posts, and favorite items.
3. Consider implementing filters and pagination for search results.



## Favorite Items:

1. FavoriteItem model should include: id, type, title, link, userId (see `types/index.ts`).
2. Implement these endpoints:
  - GET /api/favorites: Fetch user's favorite items
  - POST /api/favorites: Add a new favorite item
  - DELETE /api/favorites/:id: Remove a favorite item



## Real-time Features:

1. Implement WebSocket support for real-time updates (see `lib/websocket/server.ts`).
2. Use socket.io or a similar library for WebSocket connections.
3. Implement real-time events for new messages, notifications, and post updates.



## Data Caching:

1. Implement Redis caching for frequently accessed data (see `lib/cache.ts`).
2. Cache user profiles, post data, and search results to improve performance.



## Rate Limiting:

1. Implement rate limiting on API endpoints to prevent abuse (see `lib/rate-limit.ts`).
2. Use a distributed rate limiting solution that works with your backend architecture.



## Error Handling:

1. Implement consistent error responses across all endpoints.
2. Use appropriate HTTP status codes and include detailed error messages.



## Logging and Monitoring:

1. Implement comprehensive logging for all API requests and errors.
2. Set up monitoring for API performance and error rates.



## API Documentation:

1. Create detailed API documentation using a tool like Swagger/OpenAPI.
2. Include request/response examples, authentication requirements, and rate limit info.



## Testing:

1. Implement unit tests and integration tests for all backend functionality.
2. Set up CI/CD pipelines to run tests automatically before deployment.



## Security Considerations:

1. Implement CORS policies to restrict API access to known frontend origins.
2. Use HTTPS for all communications.
3. Sanitize all user inputs to prevent XSS and SQL injection attacks.
4. Implement proper password hashing (e.g., bcrypt) for user authentication.



## Performance Optimization:

1. Implement database indexing for frequently queried fields.
2. Use query optimization techniques for complex database queries.
3. Consider implementing a CDN for serving static assets.



## Scalability:

1. Design the backend to be stateless to allow for horizontal scaling.
2. Use a load balancer to distribute traffic across multiple backend instances.
3. Consider using microservices architecture for specific features if needed.

# Project Overview (including tech stacks):

Our social media platform is a modern, feature-rich application that allows users to share their favorite movies, books, music, and TV series. The platform emphasizes user interaction, content discovery, and real-time communication.

## Tech Stack:

### Frontend:

- Next.js 13+ with App Router
- React 18+
- TypeScript
- Tailwind CSS for styling
- Shadcn UI for component library
- Lucide React for icons



### Backend:

- Node.js
- Express.js for API server
- PostgreSQL for primary database
- Redis for caching and real-time features
- Prisma as ORM



### Authentication:

- NextAuth.js for authentication



### Real-time Communication:

1. Socket.IO for WebSocket connections



### Search:

1. MeiliSearch for fast, typo-tolerant search functionality



### File Storage:

1. AWS S3 for storing user-uploaded files


### Database:

- MongoDB for database
- Mongoose for ODM



### Deployment:

- Vercel for frontend deployment
- Heroku or DigitalOcean for backend deployment



### API:

- Next.js API routes (easier to develop and test your backend alongside your frontend.)
- MongoDB for database
- OPENAI for AI services
- Spotify API for music data
- IMDB API for movie and series data
- Amazon API for book data
- Google Books API for book data
- Upstash for caching and real-time features
- MeiliSearch for search functionality




# Core functionalities (detailed):

## 1. User Authentication and Profile Management:

### 1.1 Sign up with email and password (related frontend file is located at: `app/signup/page.tsx`)
### 1.2 Social login (Google, Apple) (Not implemented in current frontend)
### 1.3 Email verification (related frontend file is located at: `app/activate/page.tsx`)
### 1.4 Password reset functionality (related frontend file is located at: `app/reset-password/page.tsx` and `app/forgot-password/page.tsx`)
### 1.5 Profile creation and editing (username, full name, bio, profile picture) (related frontend file is located at: `app/[username]/page.tsx` and `app/complete-profile/page.tsx`)
### 1.6 Account settings (privacy, notifications, language preferences) (related frontend file is located at: `app/settings/page.tsx` and `app/settings/components/account-settings.tsx` and `app/settings/components/privacy-settings.tsx`and `app/settings/components/notifications-settings.tsx` and `app/settings/components/accessibility-settings.tsx`)
### 1.7 User search (related frontend file is located at: `app/search/page.tsx` and `components/search_dialog.tsx`and `hooks/use-search.ts`)  
### 1.8 User profile page (related frontend file is located at: `app/[username]/page.tsx`)
### 1.9 User followers and following (related frontend file is located at: `app/[username]/page.tsx`)
### 1.10 User activity (related frontend file is located at: `app/[username]/page.tsx`)
### 1.11 User favorites (related frontend file is located at: `app/[username]/page.tsx`)


## 2.Content Creation and Sharing:

### 2.1 Create posts with text content (related frontend file is located at: `components/edit_post_dialog.tsx`)
### 2.2 Add favorite items (movies, books, music, TV series) to posts (related frontend file is located at: `components/add_favorite_dialog.tsx`)
### 2.3 Support for rich text formatting in posts (Not implemented in current frontend)
### 2.4 Ability to edit and delete posts (related frontend file is located at: `components/feed_list.tsx`)
### 2.5 Share posts within the platform and to external social media (related frontend file is located at: `components/feed_list.tsx`)
### 2.6 Post images (related frontend file is located at: `components/edit_post_dialog.tsx`)
### 2.7 Post videos (related frontend file is located at: `components/edit_post_dialog.tsx`)
### 2.8 Post audio (related frontend file is located at: `components/edit_post_dialog.tsx`)
### 2.9 Post links (related frontend file is located at: `components/edit_post_dialog.tsx`)
### 2.10 Post polls (related frontend file is located at: `components/edit_post_dialog.tsx`)
### 2.11 Post quotes (related frontend file is located at: `components/edit_post_dialog.tsx`)


## 3.Feed and Content Discovery:

### 3.1 Personalized feed based on user interests and follows (related frontend file is located at: `app/page.tsx` and `components/feed_list.tsx`)
### 3.2 Trending content section (related frontend file is located at: `app/discover/page.tsx`)
### 3.3 Discover page with categorized content (movies, books, music, TV series) (related frontend file is located at: `app/discover/page.tsx`)
### 3.4 Infinite scroll for seamless content loading (related frontend file is located at: `hooks/use-infinite-scroll.ts`)
### 3.5 Pagination for feed and search results (related frontend file is located at: `components/feed_list.tsx`)
### 3.6 Content filtering and sorting (by type, date, popularity) (related frontend file is located at: `app/discover/page.tsx`)
### 3.7 Content recommendations based on user's favorite items (related frontend file is located at: `app/discover/page.tsx`)
### 3.8 Content recommendations based on user's activity (related frontend file is located at: `app/discover/page.tsx`)
### 3.9 Content recommendations based on user's friends (related frontend file is located at: `app/discover/page.tsx`)
### 3.10 Content recommendations based on user's followers (related frontend file is located at: `app/discover/page.tsx`)
### 3.11 Content recommendations based on user's activity (related frontend file is located at: `app/discover/page.tsx`)
### 3.12 Content recommendations based on user's followers (related frontend file is located at: `app/discover/page.tsx`)
### 3.13 Content recommendations based on user's friends (related frontend file is located at: `app/discover/page.tsx`)
### 3.14 Content recommendations based on user's followers (related frontend file is located at: `app/discover/page.tsx`)



## 4.Social Interactions:

### 4.1 Follow/unfollow users (related frontend file is located at: `app/[username]/page.tsx` and `contexts/SocialContext.tsx`)
### 4.2 Like and bookmark posts (related frontend file is located at: `components/feed_list.tsx` and `contexts/SocialContext.tsx`)
### 4.3 Comment on posts with nested replies (related frontend file is located at: `components/comment_dialog.tsx`)
### 4.4 Share posts with other users (related frontend file is located at:`components/forward_dialog.tsx`)
### 4.5 Post reactions (related frontend file is located at: `components/feed_list.tsx`)
### 4.6 Post comments (related frontend file is located at: `components/comment_dialog.tsx`)
### 4.7 Post replies (related frontend file is located at: `components/comment_dialog.tsx`)
### 4.8 Post bookmarks (related frontend file is located at: `components/feed_list.tsx`)
### 4.9 Post shares (related frontend file is located at: `components/feed_list.tsx`)
### 4.10 Post reactions (related frontend file is located at: `components/feed_list.tsx`)
### 4.11 Post comments (related frontend file is located at: `components/comment_dialog.tsx`)
### 4.12 Post replies (related frontend file is located at: `components/comment_dialog.tsx`)


## 5.Real-time Messaging:

### 5.1 Direct messaging between users (related frontend file is located at: `app/inbox/[userId]/page.tsx` and `app/inbox/new/page.tsx`)
### 5.2 Group chat functionality (Not implemented in current frontend)
### 5.3 Real-time message notifications (related frontend file is located at: `contexts/WebSocketContext.tsx` and `hooks/use-websocket.ts`)
### 5.4 Typing indicators (related frontend file is located at: `app/inbox/[userId]/page.tsx`)
### 5.5 Read receipts (related frontend file is located at: `app/inbox/[userId]/page.tsx`)


## 6.Notifications:

### 6.1 Real-time notifications for likes, comments, follows, and messages (related frontend file is located at: `contexts/NotificationContext.tsx` and `app/notifications/page.tsx`)
### 6.2 Email notifications for important activities (Not implemented in current frontend)
### 6.3 Customizable notification preferences (related frontend file is located at: `app/settings/page.tsx` and `app/settings/components/notifications-settings.tsx`)


## 7.Search Functionality:

### 7.1 Global search for users, posts, and favorite items (related frontend file is located at: `app/search/page.tsx` and `components/search_dialog.tsx`and `hooks/use-search.ts`,)
### 7.2 Advanced filtering options (by type, date, popularity) (related frontend file is located at: `app/search/page.tsx` and `app/discover/page.tsx`)
### 7.3 Autocomplete and search suggestions (related frontend file is located at: `app/search/page.tsx` and `hooks/use-search.ts`)
### 7.4 Search analytics (related frontend file is located at: `app/search/page.tsx`)


## 8.User Activity and Analytics:

### 8.1 View user's own activity (likes, comments, bookmarks) (related frontend file is located at: `app/[username]/page.tsx`)
### 8.2 Basic analytics for content creators (post views, engagement rates) (Not implemented in current frontend)
### 8.3 User activity analytics (related frontend file is located at: `app/[username]/page.tsx`)


## 9.Content Moderation:

### 9.1 Report inappropriate content (Not implemented in current frontend)
### 9.2 Admin panel for content moderation (Not implemented in current frontend)
### 9.3 Automated content filtering for explicit content (Not implemented in current frontend)
### 9.4 Content moderation (Not implemented in current frontend)


## 10.API Integration:

### 10.1 Integration with external APIs for movies (TMDB), books (Google Books), music (Spotify), and TV series (TVDB) (related frontend file is located at: `lib/services/imdb.ts`, and `lib/services/spotify.ts`, and `lib/services/amazon.ts` and `lib/services/tvdb.ts` and `lib/services/openai.ts` and `lib/services/google-books.ts` and `lib/services/tmdb.ts`)
### 10.2 Fetch and display detailed information about favorite items (related frontend file is located at:`components/add_favorite_dialog.tsx`)


## 11.Performance and Optimization:

### 11.1 Implement caching strategies for frequently accessed data (related frontend file is located at: `backend/lib/cache.ts`)
### 11.2 Optimize images and assets for fast loading (Image optimization is handled by Next.js Image component)
### 11.3 Implement lazy loading for images and components (Next.js handles component lazy loading)
### 11.4 Implement code splitting for faster initial page load (Next.js handles code splitting)
### 11.5 Optimize database queries for efficient data retrieval (related frontend file is located at: `server/lib/database.ts`)


## 12.Accessibility:

### 12.1 Ensure WCAG 2.1 AA compliance (related frontend file is located at: `components/accessibility_improvements.tsx`)
### 12.2 Implement keyboard navigation (related frontend file is located at: `components/navigation_bar.tsx`, and `components/feed_list.tsx`)
### 12.3 Provide alternative text for images (Implemented throughout the application)
  

## 13.Internationalization:

### 13.1 Support for multiple languages (related frontend file is located at:`app/settings/components/accessibility-settings.tsx`)
### 13.2 Right-to-left (RTL) layout support (Not implemented in current frontend)


## 14.Mobile Responsiveness:

### 14.1 Ensure the application is fully responsive on all device sizes (Implemented throughout the application using Tailwind CSS)
### 14.2 Implement touch-friendly interactions for mobile users (Implemented throughout the application)


## 15. Theme Toggling:

### 15.1 Implement theme toggling between light and dark mode (related frontend file is located at: `app/settings/components/theme-settings.tsx` and `contexts/ThemeContext.tsx` and `components/theme_toggle.tsx`)
### 15.2 Light and Dark mode support (related frontend file is located at: `contexts/ThemeContext.tsx`)


## 16. Error Handling:

### 16.1 Global error boundary (related frontend file is located at: `components/error_boundary.tsx`)
### 16.2 Error handling for API requests (related frontend file is located at: `lib/services/api.ts`)
### 16.3 Error handling for database operations (related frontend file is located at: `server/lib/database.ts`)
### 16.4 Error handling for authentication (related frontend file is located at: `server/lib/auth.ts`)
### 16.5 Error handling for real-time features (related frontend file is located at: `lib/websocket/server.ts`)
### 16.6 Error handling for caching (related frontend file is located at: `lib/cache.ts`)
### 16.7 Error handling for rate limiting (related frontend file is located at: `server/lib/rate-limit.ts`)
### 16.8 Error handling for search (related frontend file is located at: `hooks/use-search.ts`)
### 16.9 Error handling for notifications (related frontend file is located at: `contexts/NotificationContext.tsx`)
### 16.10 Error handling for WebSocket (related frontend file is located at: `lib/websocket/server.ts`) 

## 17. Rate Limiting:

### 17.1 Implement rate limiting on API endpoints (related frontend file is located at: `server/lib/rate-limit.ts`)
### 17.2 Implement rate limiting for WebSocket connections (related frontend file is located at: `lib/websocket/server.ts`)


## 18. Search Analytics:

### 18.1 Track and store search analytics (related frontend file is located at: `server/lib/analytics.ts`)
### 18.2 Implement search analytics for user activity (related frontend file is located at: `app/[username]/page.tsx`)


## 19. WebSocket Integration:

### 19.1 Implement WebSocket support for real-time updates (related frontend file is located at: `lib/websocket/client.ts` and `lib/websocket/server.ts`)


## 20. Security:

### 20.1 Implement proper security measures, including input validation and sanitization (related frontend file is located at: `server/lib/security.ts`)
### 20.2 Two Factor Authentication (related frontend file is located at: `app/settings/components/security-settings.tsx`)
### 20.3 Password hashing and salting (related frontend file is located at: `server/lib/security.ts`)
### 20.4 Secure password storage (related frontend file is located at: `server/lib/security.ts`)
### 20.5 Implement CORS policies to restrict API access to known frontend origins (related frontend file is located at: `server/lib/security.ts`)
### 20.6 Use HTTPS for all communications (related frontend file is located at: `server/lib/security.ts`)

## 21. Settings Page Requirements:

### 21.1 Here is how the settings page should look like:

- Account Settings
- Your Account
  - Account Information
    - Username
    - Phone
    - Email
    - Verified status (yes/no)
    - Account creation date
  - Country
  - Language settings
  - Gender
  - Birth date
  - Age
- Change Password
  - Old password
  - New password
  - Retype new password input fields
- Download an archive of your data (lets users download their favorite items data)
- Deactivate your account

- Security and Account Access
  - Two Factor Authentication
  - ID verification
- Sessions
  - Logged-in Devices
  - Account Access History
  - Sessions
- Connected Accounts

- Privacy and Safety
  - Mute and Block
  - Privacy (to manage who will see your posts)
  - Direct Messages (to allow/block message requests)
  - Ads Preferences
  - Data Sharing with Business Partners
  - Location Information

- Notifications
  - Filters
  - Preferences

- Accessibility, Display and Languages
  - Accessibility
    - Increase color contrast
    - Reduce Motion
  - Display (to manage font size, color and background)
  - Languages
  - Data Usage

- Additional Resources
  - Terms of Service
  - Privacy Policy
  - Cookie Policy
  - Help Center


# Documentation and libraries:

## NextAuth.js

- Purpose: Authentication
- Documentation: [https://next-auth.js.org/](https://next-auth.js.org/)
- Usage example:

```typescript
import NextAuth from "next-auth"
import Providers from "next-auth/providers"

export default NextAuth({
  providers: [
    Providers.Credentials({
      // Implement credential authentication
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
  ],
})
```





## Prisma

- Purpose: ORM for database operations
- Documentation: [https://www.prisma.io/docs/](https://www.prisma.io/docs/)
- Usage example:

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@example.com',
    },
  })
  console.log(user)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```





## Socket.IO

- Purpose: Real-time communication
- Documentation: [https://socket.io/docs/v4/](https://socket.io/docs/v4/)
- Usage example:

```typescript
import { Server } from "socket.io";

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("A user connected");
  
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
```





## MeiliSearch

- Purpose: Fast, typo-tolerant search engine
- Documentation: [https://docs.meilisearch.com/](https://docs.meilisearch.com/)
- Usage example:

```typescript
import { MeiliSearch } from 'meilisearch'

const client = new MeiliSearch({
  host: 'http://127.0.0.1:7700',
  apiKey: 'masterKey',
})

const index = client.index('movies')

const search = async () => {
  const results = await index.search('batman')
  console.log(results)
}

search()
```





## AWS SDK for JavaScript

- Purpose: Interacting with AWS services (S3 for file storage)
- Documentation: [https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/index.html](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/index.html)
- Usage example:

```typescript
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({ region: "us-east-1" });

async function uploadFile(fileBuffer, fileName) {
  const uploadParams = {
    Bucket: "your-bucket-name",
    Key: fileName,
    Body: fileBuffer,
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(uploadParams));
    console.log("Success", data);
    return data;
  } catch (err) {
    console.log("Error", err);
  }
}
```





## Tailwind CSS

- Purpose: Utility-first CSS framework
- Documentation: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
- Usage example:

```javascriptreact
function Button({ children }) {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      {children}
    </button>
  );
}
```





## Shadcn UI

- Purpose: Customizable UI components
- Documentation: [https://ui.shadcn.com/](https://ui.shadcn.com/)
- Usage example:

```javascriptreact
import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return (
    <Button variant="outline">Button</Button>
  )
}
```





## Lucide React

- Purpose: Icon library
- Documentation: [https://lucide.dev/guide/packages/lucide-react](https://lucide.dev/guide/packages/lucide-react)
- Usage example:

```javascriptreact
import { Heart } from 'lucide-react';

function LikeButton() {
  return (
    <button>
      <Heart size={24} />
      Like
    </button>
  );
}
```





## React Hook Form

- Purpose: Flexible form validation
- Documentation: [https://react-hook-form.com/get-started](https://react-hook-form.com/get-started)
- Usage example:

```javascriptreact
import { useForm } from "react-hook-form";

export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName", { required: true })} />
      {errors.firstName && <span>This field is required</span>}
      <input {...register("lastName", { required: true })} />
      {errors.lastName && <span>This field is required</span>}
      <input type="submit" />
    </form>
  );
}
```





## SWR

- Purpose: Data fetching and caching
- Documentation: [https://swr.vercel.app/docs/getting-started](https://swr.vercel.app/docs/getting-started)
- Usage example:

```javascriptreact
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

function Profile() {
  const { data, error } = useSWR('/api/user', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <div>hello {data.name}!</div>
}
```


# Implementation Guidelines:

1. Follow Next.js 13+ App Router conventions for routing and file structure
2. Use TypeScript for type safety throughout the project
3. Implement server-side rendering (SSR) where appropriate for improved performance and SEO
4. Utilize React Server Components for static and dynamic server-rendered content
5. Implement proper error handling and loading states for all asynchronous operations
6. Follow accessibility best practices, including proper use of ARIA attributes and semantic HTML
7. Use environment variables for sensitive information and configuration
8. Implement proper security measures, including input validation and sanitization
9. Write unit tests for critical components and functions
10. Use Git for version control, following a branching strategy like GitFlow
11. Document all APIs, components, and important functions
12. Optimize for performance, including code splitting and lazy loading where appropriate
13. Implement proper logging and monitoring for production deployment

# API Guidelines:

## NextAuth Secret: 
- Open terminal and run: `openssl rand -base64 32`
- Copy the output and paste it into the .env.local file as the NEXTAUTH_SECRET value

## Database Connection:
- Login to MongoDB Atlas
- Create a new database
- Create a new user
- Copy the connection string and paste it into the .env.local file as the DATABASE_URL value

## OPENAI API Key:
- Login to OpenAI
- Navigate to the API keys page
- Create a new API key
- Copy the API key and paste it into the .env.local file as the OPENAI_API_KEY value  

## Spotify API Key:
- Go to https://developer.spotify.com/dashboard/ and login
- Click on "Create an app"
- Enter the name of the app and click on "Create"
- On the app dashboard, find client ID and client secret
- Copy the client ID and client secret and paste it into the .env.local file as the SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET values

## IMDB API Key:
- Go to https://www.imdb.com/interfaces/
- Download the IMDb Datasets
- Extract the data and copy it into the data folder
- Run the import.js file to import the data into the database

## Amazon API Key:
- Go to https://developer.amazon.com/ and login with your Amazon account
- Navigate to the "My Apps & Services" page
- Click on "Create a New App"
- Enter the name of the app and click on "Create"
- Copy the API key and paste it into the .env.local file as the AMAZON_API_KEY value

## Google Books API Key:
- Go to https://console.cloud.google.com/ and login with your Google account
- Navigate to the "APIs & Services" page
- Click on "Create a New Project"
- Enter the name of the project and click on "Create"
- Copy the API key and paste it into the .env.local file as the GOOGLE_BOOKS_API_KEY value  

## Upstash Redis:
- Go to https://upstash.com/ and signup
- Create a new Redis database
- In database dashboard, find the URL and token
- Copy the URL and token and paste it into the .env.local file as the UPSTASH_REDIS_URL and UPSTASH_REDIS_TOKEN values  

## MeiliSearch:
- Go to https://www.meilisearch.com/ and signup
- Create a new MeiliSearch database
- In database dashboard, find the URL and key
- Copy the URL and key and paste it into the .env.local file as the MEILISEARCH_URL and MEILISEARCH_KEY values


# Current file structure:

```
newfaveit/
├── faveit
│   ├── README.md
│   ├── __tests__
│   │   ├── e2e
│   │   ├── integration
│   │   ├── search.test.ts
│   │   └── unit
│   │       ├── controllers
│   │       └── services
│   ├── app
│   │   ├── [username]
│   │   │   └── page.tsx
│   │   ├── activate
│   │   │   └── page.tsx
│   │   ├── api
│   │   │   └── auth
│   │   │       ├── [...nextauth]
│   │   │       │   └── route.ts
│   │   │       └── session
│   │   │           └── route.ts
│   │   ├── complete-profile
│   │   │   └── page.tsx
│   │   ├── discover
│   │   │   └── page.tsx
│   │   ├── favicon.ico
│   │   ├── fonts
│   │   │   ├── GeistMonoVF.woff
│   │   │   └── GeistVF.woff
│   │   ├── forgot-password
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── inbox
│   │   │   ├── [userId]
│   │   │   │   └── page.tsx
│   │   │   ├── new
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── login
│   │   │   └── page.tsx
│   │   ├── notifications
│   │   │   └── page.tsx
│   │   ├── page.tsx
│   │   ├── reset-password
│   │   │   └── page.tsx
│   │   ├── settings
│   │   │   ├── accessibility
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── notifications
│   │   │   │   └── page.tsx
│   │   │   ├── page.tsx
│   │   │   ├── privacy
│   │   │   │   └── page.tsx
│   │   │   ├── resources
│   │   │   │   └── page.tsx
│   │   │   └── security
│   │   │       └── page.tsx
│   │   ├── signin
│   │   │   └── page.tsx
│   │   └── signup
│   │       └── page.tsx
│   ├── components
│   │   ├── accessibility-improvements.tsx
│   │   ├── accessibility-settings.tsx
│   │   ├── accessibility_improvements.tsx
│   │   ├── account-settings.tsx
│   │   ├── add_favorite_dialog.tsx
│   │   ├── additional-resources.tsx
│   │   ├── auth.tsx
│   │   ├── comment_dialog.tsx
│   │   ├── debug-feed.tsx
│   │   ├── edit_post_dialog.tsx
│   │   ├── error_boundary.tsx
│   │   ├── feed_list.tsx
│   │   ├── forward_dialog.tsx
│   │   ├── navigation_bar.tsx
│   │   ├── new_message_dialog.tsx
│   │   ├── not-found.tsx
│   │   ├── notifications-settings.tsx
│   │   ├── privacy-settings.tsx
│   │   ├── providers
│   │   │   └── auth-provider.tsx
│   │   ├── search_results.tsx
│   │   ├── security-settings.tsx
│   │   ├── seo.tsx
│   │   ├── settings-nav.tsx
│   │   ├── tabs.css
│   │   ├── tabs.tsx
│   │   ├── theme_toggle.tsx
│   │   ├── ui
│   │   │   ├── avatar.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── popover.tsx
│   │   │   ├── select.tsx
│   │   │   ├── slider.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── tabs.tsx
│   │   │   └── textarea.tsx
│   │   └── user_search_results.tsx
│   ├── components.json
│   ├── contexts
│   │   ├── NotificationContext.tsx
│   │   ├── SocialContext.tsx
│   │   ├── ThemeContext.tsx
│   │   └── WebSocketContext.tsx
│   ├── hooks
│   │   ├── use-debounce.ts
│   │   ├── use-focus-trap.ts
│   │   ├── use-form.ts
│   │   ├── use-infinite-scroll.ts
│   │   ├── use-search.ts
│   │   ├── use-toast.ts
│   │   ├── use-websocket.ts
│   │   └── useCurrentUser.ts
│   ├── instructions.md
│   ├── lib
│   │   ├── amazon.ts
│   │   ├── client.ts
│   │   ├── hooks.ts
│   │   ├── imdb.ts
│   │   ├── index.ts
│   │   ├── search.ts
│   │   ├── services
│   │   │   └── search.ts
│   │   ├── spotify.ts
│   │   ├── theme-config.ts
│   │   ├── theme.ts
│   │   ├── types
│   │   │   └── index.ts
│   │   ├── types.ts
│   │   └── utils.ts
│   ├── middleware.ts
│   ├── next-env.d.ts
│   ├── next.config.mjs
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── postcss.config.mjs
│   ├── public
│   │   ├── fonts
│   │   └── images
│   ├── server
│   │   ├── config
│   │   │   └── auth.config.ts
│   │   ├── controllers
│   │   │   ├── auth.controller.ts
│   │   │   ├── comment.controller.ts
│   │   │   ├── favorite.controller.ts
│   │   │   ├── message.controller.ts
│   │   │   ├── notification.controller.ts
│   │   │   ├── post.controller.ts
│   │   │   └── user.controller.ts
│   │   ├── lib
│   │   │   ├── analytics.ts
│   │   │   ├── auth.ts
│   │   │   ├── cache.ts
│   │   │   ├── config
│   │   │   │   ├── constants.ts
│   │   │   │   ├── database.ts
│   │   │   │   ├── meilisearch.ts
│   │   │   │   ├── redis.ts
│   │   │   │   └── websocket.ts
│   │   │   ├── messages.ts
│   │   │   ├── rate-limit.ts
│   │   │   ├── search-index.ts
│   │   │   ├── search.ts
│   │   │   ├── services
│   │   │   │   ├── index.ts
│   │   │   │   └── search.ts
│   │   │   ├── social.ts
│   │   │   ├── users.ts
│   │   │   └── websocket
│   │   │       └── server.ts
│   │   ├── middleware
│   │   │   ├── auth.middleware.ts
│   │   │   ├── error.middleware.ts
│   │   │   ├── logger.middleware.ts
│   │   │   ├── rate-limit.middleware.ts
│   │   │   └── validation.middleware.ts
│   │   ├── models
│   │   │   ├── comment.model.ts
│   │   │   ├── favorite.model.ts
│   │   │   ├── message.model.ts
│   │   │   ├── notification.model.ts
│   │   │   ├── post.model.ts
│   │   │   └── user.model.ts
│   │   ├── routes
│   │   │   ├── auth.routes.ts
│   │   │   ├── comment.routes.ts
│   │   │   ├── favorite.routes.ts
│   │   │   ├── message.routes.ts
│   │   │   ├── notification.routes.ts
│   │   │   ├── post.routes.ts
│   │   │   └── user.routes.ts
│   │   ├── services
│   │   │   ├── auth.service.ts
│   │   │   ├── cache.service.ts
│   │   │   ├── external
│   │   │   │   ├── amazon.service.ts
│   │   │   │   ├── google-books.service.ts
│   │   │   │   ├── imdb.service.ts
│   │   │   │   └── spotify.service.ts
│   │   │   ├── post.service.ts
│   │   │   ├── search.service.ts
│   │   │   └── user.service.ts
│   │   ├── utils
│   │   │   ├── errors.ts
│   │   │   ├── helpers.ts
│   │   │   ├── logger.ts
│   │   │   └── validators.ts
│   │   └── websocket
│   │       ├── events
│   │       │   └── types.ts
│   │       ├── handlers
│   │       │   ├── message.handler.ts
│   │       │   └── notification.handler.ts
│   │       └── server.ts
│   ├── styles
│   │   ├── auth.ts
│   │   └── globals.css
│   ├── tailwind.config.js
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── types
│       ├── api.types.ts
│       ├── auth.types.ts
│       ├── index.ts
│       ├── models.types.ts
│       └── search.ts
├── prisma
│   ├── schema.prisma
  ```

# Version Control Guidelines

## Git Workflow (GitFlow)

### Main Branches
- `main`: Production-ready code
- `develop`: Main development branch
- `staging`: Pre-production testing branch

### Supporting Branches
1. **Feature Branches**
   - Branch from: `develop`
   - Merge back into: `develop`
   - Naming: `feature/[issue-id]-brief-description`
   - Example: `feature/FAV-123-add-social-login`

2. **Bugfix Branches**
   - Branch from: `develop`
   - Merge back into: `develop`
   - Naming: `bugfix/[issue-id]-brief-description`
   - Example: `bugfix/FAV-456-fix-auth-token`

3. **Hotfix Branches**
   - Branch from: `main`
   - Merge back into: `main` and `develop`
   - Naming: `hotfix/[issue-id]-brief-description`
   - Example: `hotfix/FAV-789-fix-critical-security`

4. **Release Branches**
   - Branch from: `develop`
   - Merge back into: `main` and `develop`
   - Naming: `release/v[version-number]`
   - Example: `release/v1.2.0`

## Branch Naming Conventions

### Pattern
`[type]/[issue-id]-[brief-description]`

### Types
- `feature`: New feature development
- `bugfix`: Bug fixes in development
- `hotfix`: Urgent fixes for production
- `release`: Release preparation
- `staging`: Staging environment changes
- `refactor`: Code refactoring
- `test`: Test addition or modification
- `docs`: Documentation updates
- `chore`: Routine tasks, maintenance

### Rules
1. Use lowercase letters
2. Use hyphens for spaces
3. Keep descriptions brief but meaningful
4. Always include issue ID when applicable
5. Maximum 50 characters total

## Commit Message Guidelines

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or modifying tests
- `chore`: Routine tasks, maintenance
- `perf`: Performance improvements
- `ci`: CI/CD changes
- `revert`: Reverting changes

### Scope
- auth
- ui
- api
- db
- test
- docs
- deps
- feed
- profile
- messaging
- notifications
- search
- favorites
- analytics

### Rules
1. **Subject Line**
   - Maximum 50 characters
   - Start with lowercase
   - No period at the end
   - Use imperative mood ("add" not "added")

2. **Body**
   - Optional
   - Wrap at 72 characters
   - Explain what and why vs. how

3. **Footer**
   - Optional
   - Reference issues
   - Note breaking changes

### Examples

```git
feat(auth): add Google OAuth integration

- Implement Google sign-in flow
- Add user profile sync
- Update auth middleware

Closes #123
```

```git
fix(api): resolve rate limiting issue in search endpoint

- Adjust rate limit threshold
- Add retry mechanism
- Improve error handling

Fixes #456
```

```git
refactor(db): optimize user queries

- Implement database indexing
- Update query patterns
- Add caching layer

Performance improvement of ~40%
Related to #789
```

## Git Best Practices

1. **Regular Commits**
   - Commit early and often
   - Keep commits atomic and focused
   - Avoid mixing unrelated changes
   - Use git hooks for pre-commit checks:
     ```json
     // .git/hooks/pre-commit
     #!/bin/sh
     npm run lint
     npm run format
     npm run type-check
     ```

2. **Pull Request Process**
   - Create PR from feature branch to develop
   - Require at least one review
   - Pass all automated tests
   - Follow PR template
   - Squash commits when merging

3. **Code Review Guidelines**
   - Review within 24 hours
   - Check code style and standards
   - Verify test coverage
   - Ensure documentation is updated

4. **Branch Management**
   - Delete branches after merging
   - Keep local branches updated
   - Regularly clean up stale branches

5. **Conflict Resolution**
   - Always pull before pushing
   - Resolve conflicts locally
   - Consult team on complex merges

## PR Template
```markdown
## Description
[Describe the changes made and why they were necessary]

## Related Issues
- Fixes #[issue-number]
- Related to #[issue-number]
- Depends on #[issue-number]

## Type of Change
- [ ] Bug fix (non-breaking change fixing an issue)
- [ ] New feature (non-breaking change adding functionality)
- [ ] Breaking change (fix or feature causing existing functionality to break)
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] E2E tests added/updated
- [ ] Manually tested
- [ ] Test coverage maintained/improved

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] All tests pass locally
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
```

# Deployment Pipeline

## CI/CD Setup (GitHub Actions)

### Workflow Structure
```yaml
# .github/workflows/main.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop, staging ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
      - run: npm run lint
      
  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      
  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to production
        run: # deployment commands
```

### Pipeline Stages

1. **Build Stage**
   - Install dependencies
   - Type checking
   - Lint code
   - Build application
   - Run unit tests

2. **Test Stage**
   - Run integration tests
   - Run E2E tests
   - Generate test coverage reports
   - Security scanning
   - Performance testing

3. **Deploy Stage**
   - Environment configuration
   - Database migrations
   - Asset deployment
   - Application deployment
   - Health checks

## Environment Configurations

### Development Environment
```env
# .env.development
NODE_ENV=development
API_URL=http://localhost:3000
DATABASE_URL=mongodb://localhost:27017/faveit_dev
REDIS_URL=redis://localhost:6379
```

### Staging Environment
```env
# .env.staging
NODE_ENV=staging
API_URL=https://staging-api.faveit.com
DATABASE_URL=mongodb+srv://[username]:[password]@staging-cluster
REDIS_URL=redis://[staging-redis-url]
```

### Production Environment
```env
# .env.production
NODE_ENV=production
API_URL=https://api.faveit.com
DATABASE_URL=mongodb+srv://[username]:[password]@production-cluster
REDIS_URL=redis://[production-redis-url]
```

### Environment Variables Management
1. Use `.env` files for local development
2. Use CI/CD secrets for staging/production
3. Never commit sensitive data to version control
4. Rotate secrets regularly
5. Use separate credentials for each environment

## Infrastructure Setup

### Development
- Local MongoDB instance
- Local Redis server
- Local MeiliSearch
- Development API keys

### Staging
- Staging database cluster
- Staging cache server
- Staging search instance
- Test API credentials

### Production
- Production database cluster with replication
- Distributed cache system
- Production search cluster
- Production API credentials
- CDN configuration

## Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] Code review completed
- [ ] Documentation updated
- [ ] API documentation current
- [ ] Database migrations ready
- [ ] Environment variables configured
- [ ] Security scan completed
- [ ] Performance benchmarks met
- [ ] Backup strategy confirmed
- [ ] Rollback plan documented

### Deployment Steps
1. **Database**
   - [ ] Backup current database
   - [ ] Run migrations
   - [ ] Verify data integrity

2. **Application**
   - [ ] Build production assets
   - [ ] Update environment variables
   - [ ] Deploy new version
   - [ ] Verify deployment status

3. **Configuration**
   - [ ] Update CDN settings
   - [ ] Configure load balancers
   - [ ] Update cache rules
   - [ ] Configure monitoring

### Post-Deployment
- [ ] Run health checks
- [ ] Verify API endpoints
- [ ] Check error rates
- [ ] Monitor performance metrics
- [ ] Verify user authentication
- [ ] Test critical user flows
- [ ] Check third-party integrations
- [ ] Verify backup systems
- [ ] Monitor resource usage
- [ ] Check security headers

## Monitoring and Alerts

### Metrics to Monitor
1. **Application Health**
   - Response times
   - Error rates
   - CPU usage
   - Memory usage
   - Request queue length

2. **Database Health**
   - Query performance
   - Connection pool
   - Replication lag
   - Disk usage
   - Cache hit rates

3. **User Experience**
   - Page load times
   - API response times
   - Client errors
   - User engagement
   - Feature usage

### Alert Thresholds
```javascript
const alertThresholds = {
  responseTime: 500, // ms
  errorRate: 1, // percentage
  cpuUsage: 80, // percentage
  memoryUsage: 85, // percentage
  diskSpace: 90, // percentage
}
```

## Rollback Procedures

### Quick Rollback Steps
1. Identify failure point
2. Switch to previous version
3. Revert database changes
4. Clear caches
5. Verify system health
6. Notify stakeholders

### Recovery Time Objectives
- Production: < 5 minutes
- Staging: < 15 minutes
- Development: < 30 minutes

## Security Measures

### Production Safeguards
1. SSL/TLS configuration
2. Rate limiting
3. DDoS protection
4. WAF rules
5. Security headers
6. Access controls
7. Audit logging

### Compliance Checks
- [ ] GDPR compliance
- [ ] Data encryption
- [ ] Access logging
- [ ] Security headers
- [ ] Input validation
- [ ] Output sanitization

# Error Handling Standards

## Error Handling Patterns

### 1. API Error Structure
```typescript
interface ApiError {
  code: string;          // Machine-readable error code
  message: string;       // User-friendly message
  details?: unknown;     // Additional error details
  stack?: string;        // Stack trace (development only)
  timestamp: string;     // Error occurrence time
  requestId: string;     // Unique request identifier
}

// Example implementation
class ApiError extends Error {
  constructor(
    public code: string,
    message: string,
    public details?: unknown,
    public status: number = 500
  ) {
    super(message);
    this.name = 'ApiError';
    this.timestamp = new Date().toISOString();
    this.requestId = generateRequestId();
  }
}
```

### 2. Error Categories
```typescript
enum ErrorType {
  VALIDATION = 'VALIDATION_ERROR',
  AUTHENTICATION = 'AUTH_ERROR',
  AUTHORIZATION = 'FORBIDDEN_ERROR',
  NOT_FOUND = 'NOT_FOUND_ERROR',
  RATE_LIMIT = 'RATE_LIMIT_ERROR',
  INTERNAL = 'INTERNAL_ERROR',
  EXTERNAL_SERVICE = 'EXTERNAL_SERVICE_ERROR',
  DATABASE = 'DATABASE_ERROR'
}

// Example usage
throw new ApiError(
  ErrorType.VALIDATION,
  'Invalid email format',
  { field: 'email', value: 'invalid-email' },
  400
);
```

### 3. Error Handling Middleware
```typescript
// API Route Error Handler
export async function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof ApiError) {
    // Log structured error
    logger.error({
      code: error.code,
      message: error.message,
      details: error.details,
      requestId: error.requestId
    });

    // Send error response
    return res.status(error.status).json({
      code: error.code,
      message: error.message,
      requestId: error.requestId
    });
  }

  // Handle unknown errors
  const internalError = new ApiError(
    ErrorType.INTERNAL,
    'An unexpected error occurred'
  );
  
  logger.error({
    code: internalError.code,
    message: error instanceof Error ? error.message : 'Unknown error',
    stack: error instanceof Error ? error.stack : undefined,
    requestId: internalError.requestId
  });

  return res.status(500).json({
    code: internalError.code,
    message: internalError.message,
    requestId: internalError.requestId
  });
}
```

## Error Logging Standards

### 1. Log Levels
```typescript
enum LogLevel {
  ERROR = 'error',     // System errors, crashes
  WARN = 'warn',      // Warnings, deprecations
  INFO = 'info',      // Important operations
  DEBUG = 'debug',    // Debugging information
  TRACE = 'trace'     // Detailed debugging
}
```

### 2. Log Structure
```typescript
interface LogEntry {
  timestamp: string;        // ISO timestamp
  level: LogLevel;         // Log level
  message: string;         // Log message
  context: {              // Contextual information
    requestId: string;    // Request identifier
    userId?: string;      // User identifier
    action?: string;      // Action being performed
    resource?: string;    // Resource being accessed
  };
  metadata?: {            // Additional metadata
    duration?: number;    // Operation duration
    statusCode?: number;  // HTTP status code
    path?: string;       // Request path
    method?: string;     // HTTP method
  };
  error?: {               // Error information
    code: string;        // Error code
    message: string;     // Error message
    stack?: string;      // Stack trace
    details?: unknown;   // Additional details
  };
}
```

### 3. Logging Implementation
```typescript
// Logger configuration
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Example usage
logger.error({
  message: 'Failed to process payment',
  context: {
    requestId: 'req-123',
    userId: 'user-456',
    action: 'PAYMENT_PROCESS'
  },
  metadata: {
    duration: 1500,
    statusCode: 500,
    path: '/api/payments',
    method: 'POST'
  },
  error: {
    code: 'PAYMENT_FAILED',
    message: 'Payment provider rejected transaction',
    details: { transactionId: 'tx-789' }
  }
});
```

## Error Reporting Guidelines

### 1. Error Monitoring Setup
```typescript
// Sentry configuration
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
  beforeSend(event) {
    // Sanitize sensitive data
    if (event.request?.data) {
      event.request.data = sanitizeData(event.request.data);
    }
    return event;
  }
});
```

### 2. Error Reporting Levels
1. **Critical Errors** (P0)
   - System crashes
   - Data corruption
   - Security breaches
   - Response time: Immediate (< 15 minutes)

2. **High Priority** (P1)
   - Service degradation
   - Payment failures
   - Authentication issues
   - Response time: < 1 hour

3. **Medium Priority** (P2)
   - Non-critical feature failures
   - Performance issues
   - Third-party service warnings
   - Response time: < 4 hours

4. **Low Priority** (P3)
   - UI/UX issues
   - Minor bugs
   - Deprecation warnings
   - Response time: < 24 hours

### 3. Error Response Standards
```typescript
// Client error responses
interface ErrorResponse {
  code: string;          // Error code
  message: string;       // User-friendly message
  requestId: string;     // Request identifier
  help?: string;         // Help text or link
  actions?: {           // Suggested actions
    primary?: {
      label: string;
      action: string;
    };
    secondary?: {
      label: string;
      action: string;
    }[];
  };
}

// Example error response
{
  code: "RATE_LIMIT_EXCEEDED",
  message: "Too many requests. Please try again later.",
  requestId: "req-123-abc",
  help: "Learn more about rate limits",
  actions: {
    primary: {
      label: "Upgrade Plan",
      action: "/upgrade"
    },
    secondary: [{
      label: "View Documentation",
      action: "/docs/rate-limits"
    }]
  }
}
```

### 4. Error Recovery Procedures
1. **Automatic Recovery**
   - Retry failed operations with exponential backoff
   - Circuit breaker for external services
   - Fallback to cached data
   - Auto-scaling triggers

2. **Manual Recovery**
   - Incident response playbooks
   - Communication templates
   - Stakeholder notification procedures
   - Post-mortem documentation

### 5. Error Prevention
1. **Code Quality**
   - Type checking
   - Linting rules
   - Unit tests
   - Integration tests

2. **Monitoring**
   - Performance metrics
   - Error rates
   - Resource usage
   - User behavior

3. **Proactive Measures**
   - Load testing
   - Chaos engineering
   - Security scanning
   - Dependency updates

# Directory Structure Documentation

## Root Level Structure

### `/faveit`
- Purpose: Main application directory
- Contains: All application code and configuration

### `/__tests__`
- Purpose: Test files directory
- `/e2e`: End-to-end tests
- `/integration`: Integration tests
- `/unit`: Unit tests for controllers and services
- `search.test.ts`: Tests for search functionality

### `/app`
- Purpose: Next.js 13+ pages and routing
- Key directories:
  - `/[username]`: Dynamic user profile pages
  - `/activate`: Account activation page
  - `/api/auth`: Authentication API routes
  - `/complete-profile`: Profile completion flow
  - `/discover`: Content discovery page
  - `/inbox`: Messaging system pages
  - `/settings`: User settings pages
  - `/signin`, `/signup`: Authentication pages

### `/components`
- Purpose: Reusable React components
- Key files:
  - `accessibility-*.tsx`: Accessibility-related components
  - `account-settings.tsx`: Account settings UI
  - `add_favorite_dialog.tsx`: Dialog for adding favorites
  - `comment_dialog.tsx`: Comment functionality
  - `edit_post_dialog.tsx`: Post editing interface
  - `feed_list.tsx`: Main feed component
  - `/ui`: Shared UI components (buttons, inputs, etc.)

### `/contexts`
- Purpose: React Context providers
- Files:
  - `NotificationContext.tsx`: Notification state management
  - `SocialContext.tsx`: Social features state
  - `ThemeContext.tsx`: Theme management
  - `WebSocketContext.tsx`: Real-time communication state

### `/hooks`
- Purpose: Custom React hooks
- Key files:
  - `use-debounce.ts`: Input debouncing
  - `use-search.ts`: Search functionality
  - `use-websocket.ts`: WebSocket connection
  - `useCurrentUser.ts`: Current user state management

### `/lib`
- Purpose: Frontend utilities and services
- Key files:
  - `amazon.ts`: Amazon API integration
  - `imdb.ts`: IMDB API integration
  - `spotify.ts`: Spotify API integration
  - `search.ts`: Search functionality
  - `theme.ts`: Theme utilities

### `/server`
- Purpose: Backend implementation
- Subdirectories:
  
  #### `/controllers`
  - Purpose: Request handlers
  - Files:
    - `auth.controller.ts`: Authentication logic
    - `user.controller.ts`: User management
    - `post.controller.ts`: Post handling
    - `comment.controller.ts`: Comment handling
    - `favorite.controller.ts`: Favorites management
    - `message.controller.ts`: Messaging system
    - `notification.controller.ts`: Notifications handling

  #### `/lib`
  - Purpose: Core backend utilities
  - Files:
    - `analytics.ts`: Usage tracking
    - `auth.ts`: Authentication utilities
    - `cache.ts`: Caching system
    - `/config`: Configuration files
    - `messages.ts`: Message handling
    - `rate-limit.ts`: Rate limiting
    - `search.ts`: Search functionality
    - `social.ts`: Social features

  #### `/middleware`
  - Purpose: Request processing
  - Files:
    - `auth.middleware.ts`: Authentication checks
    - `error.middleware.ts`: Error handling
    - `logger.middleware.ts`: Request logging
    - `rate-limit.middleware.ts`: Rate limiting
    - `validation.middleware.ts`: Input validation

  #### `/models`
  - Purpose: Database schemas
  - Files:
    - `user.model.ts`: User data structure
    - `post.model.ts`: Post data structure
    - `comment.model.ts`: Comment data structure
    - `favorite.model.ts`: Favorites data structure
    - `message.model.ts`: Message data structure
    - `notification.model.ts`: Notification data structure

  #### `/routes`
  - Purpose: API route definitions
  - Files:
    - `auth.routes.ts`: Authentication routes
    - `user.routes.ts`: User-related routes
    - `post.routes.ts`: Post management routes
    - `comment.routes.ts`: Comment routes
    - `favorite.routes.ts`: Favorites routes
    - `message.routes.ts`: Messaging routes
    - `notification.routes.ts`: Notification routes

  #### `/services`
  - Purpose: Business logic
  - Files:
    - `auth.service.ts`: Authentication logic
    - `cache.service.ts`: Caching logic
    - `/external`: Third-party service integrations
    - `post.service.ts`: Post management logic
    - `search.service.ts`: Search functionality
    - `user.service.ts`: User management logic

  #### `/utils`
  - Purpose: Utility functions
  - Files:
    - `errors.ts`: Error handling utilities
    - `helpers.ts`: Helper functions
    - `logger.ts`: Logging utilities
    - `validators.ts`: Input validation

  #### `/websocket`
  - Purpose: Real-time communication
  - Files:
    - `/events/types.ts`: WebSocket event types
    - `/handlers`: Event handlers
    - `server.ts`: WebSocket server setup

### `/styles`
- Purpose: CSS and styling
- Files:
  - `auth.ts`: Authentication styles
  - `globals.css`: Global styles

### `/types`
- Purpose: TypeScript type definitions
- Files:
  - `api.types.ts`: API interfaces
  - `auth.types.ts`: Authentication types
  - `models.types.ts`: Data model types
  - `search.ts`: Search-related types
  - `index.ts`: Common types

### Configuration Files
- `next.config.mjs`: Next.js configuration
- `package.json`: Project dependencies
- `tailwind.config.ts`: Tailwind CSS configuration
- `tsconfig.json`: TypeScript configuration
- `postcss.config.js`: PostCSS configuration
