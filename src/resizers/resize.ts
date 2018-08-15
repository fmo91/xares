import * as sharp from 'sharp';

type ResizerOptions = ResizerSquareOptions | ResizerRectangleOptions;

interface ResizerSquareOptions {
    kind    : "square";
    size    : number;
}

interface ResizerRectangleOptions {
    kind    : "rectangle";
    width   : number;
    height  : number;
}

const buildSquareOptions = (size: number): ResizerOptions => ({ kind: "square", size });
const buildRectangleOptions = (width: number, height: number): ResizerOptions => ({ kind: "rectangle", width, height });

const buildResizer = (options: ResizerOptions) => (stream: sharp.SharpInstance) => {
    switch (options.kind) {
    case "square"       : return stream.resize(options.size, options.size);
    case "rectangle"    : return stream.resize(options.width, options.height);
    }
};

const buildNavResizer1x = () => buildResizer(buildSquareOptions(22));
const buildNavResizer2x = () => buildResizer(buildSquareOptions(33));
const buildNavResizer3x = () => buildResizer(buildSquareOptions(44));

export const buildNavResizers = () => (stream: sharp.SharpInstance) => ([
    buildNavResizer1x(),
    buildNavResizer2x(),
    buildNavResizer3x(),
]);

const buildRegularResizer1x = (width: number, height: number) => buildResizer(buildRectangleOptions(width * 1/3, height * 1/3));
const buildRegularResizer2x = (width: number, height: number) => buildResizer(buildRectangleOptions(width * 2/3, height * 2/3));
const buildRegularResizer3x = (width: number, height: number) => buildResizer(buildRectangleOptions(width * 3/3, height * 3/3));

export const buildRegularResizers = (width: number, height: number) => ([
    buildRegularResizer1x(width, height),
    buildRegularResizer2x(width, height),
    buildRegularResizer3x(width, height),
]);