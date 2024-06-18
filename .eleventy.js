const fs = require('fs');
const path = require('path');

module.exports = function(eleventyConfig) {
    
    // copy static files to output directory.
    eleventyConfig.addPassthroughCopy("static/*");
    eleventyConfig.addPassthroughCopy("static/fonts/*");
    eleventyConfig.addPassthroughCopy("static/svg/*");
    
    // add some language collections.
    listPostLangs().forEach((lang) => {
	eleventyConfig.addCollection(lang, (collectionApi) => {
	    return collectionApi.getFilteredByGlob(`posts/${lang}/*`)
	});
	eleventyConfig.addCollection(`${lang}TagsList`, (collectionApi) => {
	    const tagsSet = new Set()
	    collectionApi.getFilteredByGlob(`posts/${lang}/*`).forEach((item) => {
		if (!item.data.tags) return
		item.data.tags.forEach((tag) => tagsSet.add(tag))
	    })
	    return Array.from(tagsSet)
	})
    });
    
    // minify css
    const CleanCSS = require("clean-css");
    const fs = require('fs');
    const sourceCssDir = 'static/css/'
    const targetCssDir = '_site/static/css/'
    if (!fs.existsSync(targetCssDir)) {
	fs.mkdirSync(targetCssDir, {recursive : true});
    }
    const files = fs.readdirSync(sourceCssDir);
    files.forEach(file => {
	var inputFile = sourceCssDir + file
	var input = fs.readFileSync(inputFile, 'utf8');
	var output = new CleanCSS().minify(input);
	fs.writeFile(targetCssDir + file, output.styles, function (err) {
            if (err) return console.log('Error minifying main.css' + err);
	});
    });



};


function listPostLangs() {
    return getAllDirectories("posts")
}


function getAllDirectories(directoryPath) {
    let directories = [];

    const files = fs.readdirSync(directoryPath);

    files.forEach(file => {
        const filePath = path.join(directoryPath, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            directories.push(file);
        }
    });

    return directories;
}



