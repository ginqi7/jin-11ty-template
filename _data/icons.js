import project from "./project.js";

export default function () {
    return [
        {
            type: "github",
            src: "/static/svg/github.svg",
            href: project.github,
            show: "(Github)",
        },
        {
            type: "email",
            src: "/static/svg/mail.svg",
            href: "mailto:" + project.mail,
            show: "(Email)",
        },
        {
            type: "en-language",
            src: "/static/svg/languages.svg",
            href: "/",
            lang: "zh",
            show: "(English)",
        },
        {
            type: "zh-language",
            src: "/static/svg/languages.svg",
            href: "/zh",
            lang: "en",
            show: "(Chinese)",
        },
        {
            type: "en-rss",
            src: "/static/svg/rss.svg",
            href: "/feed.xml",
            lang: "en",
            show: "(RSS)",
        },
        {
            type: "zh-rss",
            src: "/static/svg/rss.svg",
            href: "/zh/feed.xml",
            lang: "zh",
            show: "(RSS)",
        },
        {
            type: "en-thoughts",
            src: "/static/svg/thoughts.svg",
            href: "/thoughts/0",
            lang: "en",
            show: "(Thoughts)",
        },
        {
            type: "zh-thoughts",
            src: "/static/svg/thoughts.svg",
            href: "/zh/thoughts/0",
            lang: "zh",
            show: "(thoughts)",
        },
    ];
}
