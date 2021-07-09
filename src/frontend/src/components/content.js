import ImageUploader from './imageUploader';

// const dotenv = require('dotenv');
// dotenv.config();
// const API_LINK = process.env.API_LINK
const API_LINK = 'http://127.0.0.1:8000/api/upload-selfie';

function Content() {
  return <ImageUploader uploadLink={API_LINK} />;
}

export default Content;
