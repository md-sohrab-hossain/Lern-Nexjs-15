// Import all images using Next.js's static image imports
// This enables image optimization and proper handling of different formats
import photo1 from "./photos/1.jpg";
import photo2 from "./photos/2.jpg";
import photo3 from "./photos/3.jpg";
import photo4 from "./photos/4.jpg";
import photo5 from "./photos/5.jpg";
import photo6 from "./photos/6.jpg";
import photo7 from "./photos/7.jpg";

// Define our gallery data structure
// Each image has:
// - id: unique identifier used in URLs
// - name: display name
// - src: the imported image object
const images = [
  {
    id: "1",
    name: "Sohrab - 1",
    src: photo1,
  },
  {
    id: "2",
    name: "Sohrab - 2",
    src: photo2,
  },
  {
    id: "3",
    name: "Sohrab - 3",
    src: photo3,
  },
  {
    id: "4",
    name: "Sohrab - 4",
    src: photo4,
  },
  {
    id: "5",
    name: "Sohrab - 5",
    src: photo5,
  },
  {
    id: "6",
    name: "Sohrab - 6",
    src: photo6,
  },
  {
    id: "7",
    name: "Sohrab - 7",
    src: photo7,
  },
];

export default images;
