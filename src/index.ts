import { findContents } from "./files-data/file";

const contents = findContents(".");
console.log("Contents =>", contents.length);