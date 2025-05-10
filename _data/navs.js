import project from "./project.js";

export default function () {
    return [
        {
            type: "github",
            src: "/static/svg/github.svg",
            href: project().github,
            show: "(Github)",
            position: "footer",
        },
        {
            type: "email",
            src: "/static/svg/mail.svg",
            href: "mailto:" + project().mail,
            show: "(Email)",
            position: "footer",
        },
        {
            type: "en-language",
            src: "/static/svg/languages.svg",
            href: "/",
            lang: "zh",
            show: "(英文)",
            position: "header",
        },
        {
            type: "zh-language",
            src: "/static/svg/languages.svg",
            href: "/zh",
            lang: "en",
            show: "(Chinese)",
            position: "header",
        },
        {
            type: "en-rss",
            src: "/static/svg/rss.svg",
            href: "/feed.xml",
            lang: "en",
            show: "(RSS)",
            position: "header",
        },
        {
            type: "zh-rss",
            src: "/static/svg/rss.svg",
            href: "/zh/feed.xml",
            lang: "zh",
            show: "(RSS)",
            position: "header",
        },
        {
            type: "en-thoughts",
            src: "/static/svg/thoughts.svg",
            href: "/thoughts/0",
            lang: "en",
            show: "(Thoughts)",
            position: "header",
        },
        {
            type: "zh-thoughts",
            src: "/static/svg/thoughts.svg",
            href: "/zh/thoughts/0",
            lang: "zh",
            show: "(想法)",
            position: "header",
        },
    ];
}
