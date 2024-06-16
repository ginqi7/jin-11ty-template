const fs = require('fs');
const path = require('path');

module.exports = function(eleventyConfig) {
    
    // copy static files to output directory.
    eleventyConfig.addPassthroughCopy("static/*");
    eleventyConfig.addPassthroughCopy("static/*/*");
    
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
    })
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



