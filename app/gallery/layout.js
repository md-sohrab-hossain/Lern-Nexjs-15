// This is the main layout for the gallery section
// It handles both the main content (children) and the modal (parallel route)
export default function GalleryLayout({
  children, // The main gallery content
  modal, // The modal content from @modal parallel route
}) {
  return (
    <>
      {/* Modal is rendered above the main content */}
      {modal}
      {/* Main gallery content */}
      {children}
    </>
  );
}
