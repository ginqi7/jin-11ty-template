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
            type: "en-thoughts",
            src: "/static/svg/thoughts.svg",
            href: "/en/thoughts",
            lang: "en",
            show: "(thoughts)",
        },
        {
            type: "zh-thoughts",
            src: "/static/svg/thoughts.svg",
            href: "/zh/thoughts",
            lang: "zh",
            show: "(thoughts)",
        },

    ];
}
