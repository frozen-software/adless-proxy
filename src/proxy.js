const hoxy = require("hoxy");
const fs = require("fs");
const Blocker = require("ad-block");

const proxy = hoxy.createServer({
	certAuthority: {
		key: fs.readFileSync('ssl/my-private-root-ca.key.pem'),
		cert: fs.readFileSync('ssl/my-private-root-ca.crt.pem')
	}
	/*certAuthority: {
		key: v.private,
		cert: v.cert
	}*/
}).listen(4545);

console.log("Loading");
initialize().then(() => {
	console.log("Loaded");
	proxy.intercept({
		"phase": "request"
	}, (req, resp, cycle) => {
		// Block ads here..
	});
});