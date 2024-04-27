



(window as any).global = window;
global=window;


(window as any).process = { env: { NODE_DEBUG:"http,net,tls"}, };          
console.log("polyfills L6 : ",process.env );   

