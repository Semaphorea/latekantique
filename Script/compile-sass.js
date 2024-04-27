const fs = require('fs');
const path = require('path');
const { argv0 } = require('process');
const sass = require('sass');

// Function to compile Sass files in a directory
function compileSassInDirectory(dir) {
  fs.readdirSync(dir).forEach(file => {

    try {
        
    
    const filePath = path.join(dir, file);
    console.log("file:",file);  
    console.log("filePath",filePath);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      compileSassInDirectory(filePath); // Recursively compile Sass files in subdirectories
    } else if (path.extname(file) === '.scss') {
      const outFile = filePath.replace('.scss', '.css'); // Adjust the output directory as needed
      const result = sass.renderSync({ file: filePath,includePaths: [ `${root}/${file.basePath}` ], outputStyle: 'compressed' });
      fs.writeFileSync(outFile, result.css);
    }

     } catch (error) { 
        
    console.error('compile-sasss L27sa erreur : ', error); 
    }
  });
}
const directoryPath = process.argv[2]; 
// Compile Sass files in the 'src' directory 
compileSassInDirectory(directoryPath );