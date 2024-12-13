/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',
          
        }
      ],
      dangerouslyAllowSVG: true,
      contentDispositionType: 'attachment',
      contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
    
    
  }
  
  export default nextConfig

// next.config.js
    
// module.exports = {
//   webpack(config) {
//     config.module.rules.push({
//       test: /\.svg$/,
//       issuer: {
//         test: /\.(js|ts)x?$/,
//        // for webpack 5 use
//        // { and: [/\.(js|ts)x?$/] }
//       },
      
//       use: ['@svgr/webpack'],
//     });

//     return config;
//   },
// };
