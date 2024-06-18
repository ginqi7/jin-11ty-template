const project = require("./project.json")

module.exports = function () {
    return [
	{
	    "type" : "github",
	    "src" : "/static/svg/github.svg",
	    "href" : project.github,
	    "show" : "(Github)"
	},
	{
	    "type" : "email",
	    "src" : "/static/svg/mail.svg",
	    "href" : "mailto:" + project.mail,
	    "show" : "(Email)"
	},
	
	{
	    "type" : "en",
	    "src" : "/static/svg/languages.svg",
	    "href" : "/",
	    "show" : "(English)"
	},
	{
	    "type" : "zh",
	    "src" : "/static/svg/languages.svg",
	    "href" : "/zh",
	    "show" : "(Chinese)"
	}
	
    ]
};
