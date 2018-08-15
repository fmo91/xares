import { readdirSync } from 'fs';

export const findContents = (path?: string): string[] => {
    const currentPath = path || "assets";
    const partialContents = readdirSync(currentPath);
    const contents = partialContents.map(contentName => {
        const contentPath = `${currentPath}/${contentName}`;
        try {
            return findContents(contentPath);
        } catch (err) {
            return [contentPath];
        }
    });
    return [].concat.apply([], contents);
};