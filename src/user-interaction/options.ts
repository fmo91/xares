import { readFileSync } from 'fs';

export interface Options {
    navigationBarIconPrefix?: string;
}

export const getOptions = (): Options => {
    const buffer: Buffer = readFileSync('resize-assets.json')
    const contents = buffer.toString();
    return JSON.parse(contents);
}