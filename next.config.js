/** @type {import('next').NextConfig} */
const nextConfig = {
 /*  modularizeImports: {
    "react-icons": {
      transform: "react-icons/{{member}}"
    }
  }, */
	images: {
		domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com', 'res.cloudinary.com']
	}
};

module.exports = nextConfig;
