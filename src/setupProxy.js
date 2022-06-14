const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
	app.use(
		createProxyMiddleware('/api', {
			target: 'http://localhost:8080', 
			changeOrigin: true,
		})
	);
};

// const createProxyMiddleware = require('http-proxy-middleware')
// module.exports = app => {
//   app.use(
//     createProxyMiddleware(
//       ['/api', '/socket.io'],
//       {
//         target: 'http://localhost:8080',
//         changeOrigin: true,
//         ws: true,
//         router: {
//           '/api': 'http://localhost:8080'
//         }
//       }
//     )
//   )
// }