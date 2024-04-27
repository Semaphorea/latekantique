 

module.exports = {

    node:{global:true}, 
    target:"web",
    resolve: {
      fallback: {
        "stream":require.resolve("stream-browserify"), 
        "crypto": require.resolve("crypto-browserify"),  
        "util" : require.resolve("util"),  
      
      }
    }, 
    performance: {
      maxAssetSize: 2000000, // 2 MB
      maxEntrypointSize: 2000000, // 2 MB
    },  
      devServer:{liveReload:false,}  //webpack is deconnected each time i fetch articles data  
  };
  