import fs from "fs";
import path from "path";
import Fontmin from "fontmin";
import CleanCSS from "clean-css";
import linkifyHtml from "linkify-html";
import replaceDoubanUrls from "html-douban-card";

export default function (eleventyConfig) {
    // copy static files to output directory.
    eleventyConfig.addPassthroughCopy("static/*");
    eleventyConfig.addPassthroughCopy("static/fonts/en/*");
    eleventyConfig.addPassthroughCopy("static/svg/*");

    // add some language collections.
    listPostLangs().forEach((lang) => {
        eleventyConfig.addCollection(lang, (collectionApi) => {
            return collectionApi.getFilteredByGlob(`posts/${lang}/*`);
        });
        eleventyConfig.addCollection(`${lang}TagsList`, (collectionApi) => {
            const tagsSet = new Set();
            collectionApi
                .getFilteredByGlob(`posts/${lang}/*`)
                .forEach((item) => {
                    if (!item.data.tags) return;
                    item.data.tags.forEach((tag) => tagsSet.add(tag));
                });
            return Array.from(tagsSet);
        });
        eleventyConfig.addCollection(`${lang}Thoughts`, (collectionApi) => {
            return collectionApi
                .getFilteredByGlob(`thoughts/${lang}/*`)
                .sort(
                    (a, b) =>
                        new Date(b.data.create_date) -
                        new Date(a.data.create_date),
                );
        });
    });

    eleventyConfig.addFilter("linkify", function (content) {
        return linkifyHtml(content, {
            target: "_blank", // Open link in a new tab
            rel: "noopener noreferrer", // Security Settings
        });
    });

    eleventyConfig.addFilter("douban_card", async function (content) {
        return await replaceDoubanUrls(content);
    });

    // minify css
    minifyCss();
    // minify chinese fonts.
    minifyChineseFonts();
}

function minifyChineseFonts() {
    const zhPostsDirectory = "posts/zh/";
    const zhThoughtsDirectory = "thoughts/zh/";
    const dataDirectory = "_data/";
    const content = removeDuplicateCharacters(
        extractChineseChars(
            readFilesInDirectory(zhPostsDirectory) +
                readFilesInDirectory(zhThoughtsDirectory) +
                readFilesInDirectory(dataDirectory),
        ),
    );
    const fontmin = new Fontmin()
        .src("static/fonts/zh/*")
        .use(
            Fontmin.glyph({
                text: content,
                hinting: false,
            }),
        )
        .dest("_site/static/fonts/zh/");

    fontmin.run(function (err, files) {
        if (err) {
            throw err;
        }
    });
}

function minifyCss() {
    const sourceCssDir = "static/css/";
    const targetCssDir = "_site/static/css/";
    if (!fs.existsSync(targetCssDir)) {
        fs.mkdirSync(targetCssDir, { recursive: true });
    }
    const files = fs.readdirSync(sourceCssDir);
    files.forEach((file) => {
        var inputFile = sourceCssDir + file;
        var input = fs.readFileSync(inputFile, "utf8");
        var output = new CleanCSS().minify(input);
        fs.writeFile(targetCssDir + file, output.styles, function (err) {
            if (err) return console.log("Error minifying main.css" + err);
        });
    });
}

function listPostLangs() {
    return getAllDirectories("posts");
}

function getAllDirectories(directoryPath) {
    let directories = [];

    const files = fs.readdirSync(directoryPath);

    files.forEach((file) => {
        const filePath = path.join(directoryPath, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            directories.push(file);
        }
    });

    return directories;
}

function readFilesInDirectory(directoryPath) {
    try {
        const files = fs.readdirSync(directoryPath);
        var content = "";
        for (let file of files) {
            const filePath = directoryPath + file;
            const data = fs.readFileSync(filePath, "utf8");
            content += data;
        }
        return content;
    } catch (err) {
        console.error("Error reading directory:", err);
    }
}

function extractChineseChars(str) {
    const regex = /[\u4E00-\u9FFF]/g;
    const chineseChars = str.match(regex);
    return chineseChars ? chineseChars.join("") : "";
}

function removeDuplicateCharacters(str) {
    return [...new Set(str)].join("");
}
