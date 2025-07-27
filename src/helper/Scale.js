import { Dimensions } from "react-native";
const {height, width} = Dimensions.get('screen');

export const HEIGHT = height;
export const WIDTH = width ;

const SCREEN_WIDTH = 736;
const SCREEN_HEIGHT = 414;

export default function (units = 1) {
    return (width / SCREEN_WIDTH) * units ;
};

const Scale = size => (height / SCREEN_HEIGHT) * size;

export {Scale} ;

