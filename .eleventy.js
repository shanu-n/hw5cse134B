module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("js");
    eleventyConfig.addPassthroughCopy("media");
    eleventyConfig.addPassthroughCopy("style.css");
    eleventyConfig.ignores.add("README.md");

    return {
        dir: {
            input: ".",
            includes: "_includes",
            data: "_data",
            output: "_site"
        }
    };
};