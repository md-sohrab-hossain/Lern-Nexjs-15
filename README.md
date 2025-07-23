# Next.js Advanced Routing Demo: Photo Gallery

This project demonstrates Next.js 15 advanced routing concepts, specifically focusing on parallel routes and intercepting routes using a photo gallery application.

## Key Concepts Demonstrated

### 1. Parallel Routes (@parallel)

- Located in `app/gallery/@modal` folder
- Allows multiple pages to be shown simultaneously
- Uses the `@modal` convention to create a parallel route segment
- Both the gallery and modal can exist independently

### 2. Intercepting Routes

- Located in `app/gallery/@modal/(..)gallery/[id]/page.js`
- Uses `(..)` convention to intercept the default route
- When clicking an image in the gallery:
  - The URL changes to `/gallery/[id]`
  - But the route is intercepted to show a modal instead
  - The original gallery remains visible in the background

## Project Structure Explanation

```
app/
├── gallery/
│   ├── page.js              # Main gallery page
│   ├── images.js            # Image data and imports
│   ├── layout.js            # Gallery layout
│   ├── [id]/
│   │   └── page.js         # Individual photo page
│   ├── @modal/             # Parallel route for modal
│   │   ├── default.js      # Default modal state
│   │   └── (..)gallery/    # Intercepting route
│   │       └── [id]/
│   │           └── page.js # Modal view of photo
│   └── photos/             # Photo assets
└── components/
    ├── Modal.js            # Reusable modal component
    ├── Header.js           # Site header
    └── Footer.js           # Site footer
```

## How It Works

1. **Main Gallery View (`/gallery`)**

   - Displays a grid of photos
   - Each photo is clickable
   - Uses the images data from `images.js`

2. **Modal Implementation**

   - When you click a photo:
     - URL changes to `/gallery/[id]`
     - The `(..)gallery/[id]` route intercepts
     - Modal opens with photo while keeping gallery visible
   - Closing the modal returns to `/gallery`
   - Modal state persists during navigation

3. **Routing Pattern**
   ```
   /gallery              → Shows gallery grid
   /gallery/[id]         → Shows full photo page
   /gallery/[id]         → (When intercepted) Shows modal
   ```

## Technical Implementation

### Parallel Routes (@modal)

```javascript
// app/gallery/layout.js
export default function Layout({ children, modal }) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
```

### Intercepting Routes

```javascript
// app/gallery/@modal/(..)gallery/[id]/page.js
// This intercepts /gallery/[id] and shows modal instead
```

### Modal Component

- Uses `useRouter` for navigation
- Handles modal open/close states
- Maintains background scroll position

## Key Benefits

1. **Enhanced UX**

   - Smooth transitions between views
   - Maintains context while viewing photos
   - No page refreshes needed

2. **SEO Friendly**

   - Each photo has its own URL
   - Content is server-rendered
   - Accessible to search engines

3. **Performance**
   - Parallel routes load independently
   - Modal content is pre-rendered
   - Efficient image loading with Next.js Image component

## Learning Points

1. **Route Groups**

   - `@modal` creates a route group
   - Parallel routes can share layouts
   - Multiple views can coexist

2. **Intercepting Routes**

   - `(..)` syntax for going up in route hierarchy
   - Can intercept and modify default behavior
   - Maintains clean URLs while changing presentation

3. **Layout Patterns**
   - Nested layouts for consistent UI
   - Modal as a parallel route
   - Shared components across routes

This project serves as a practical example of how Next.js 15 routing features can be used to create sophisticated user interfaces with clean URLs and optimal performance.
