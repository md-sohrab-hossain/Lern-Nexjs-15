import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "docs");

export function getDocuments() {
    console.log(postsDirectory);
    const fileNames = fs.readdirSync(postsDirectory);

    const allDocumnets = fileNames.map((fileName) => {
        const id = fileName.replace(".md", "");

        const fullPath = path.join(postsDirectory, fileName);

        const fileContents = fs.readFileSync(fullPath, "utf8");

        const matterResult = matter(fileContents);

        const { date, ...data } = matterResult.data;
        const dateString = date instanceof Date ? date.toISOString() : date;
        return {
            id,
            ...data,
            date: dateString,
        };
    });

    return allDocumnets.sort((a, b) => {
        if (a.order < b.order) {
            return -1;
        }
        if (a.order > b.order) {
            return 1;
        }
        return 0;
    });
}

export async function getDocumentContent(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    const processedContent = await remark().use(html).process(matterResult.content);

    const contentHtml = processedContent.toString();

    const { date, ...data } = matterResult.data;
    const dateString = date instanceof Date ? date.toISOString() : date;
    return {
        id,
        contentHtml,
        ...data,
        date: dateString,
    }
}
