const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules');
const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
const images = require('next-images');

const config = {
    publicRuntimeConfig: {
        API_URL: process.env.projectMode === 'Production' ?  'https://api.feedyourimage.co.uk/api/' : 'https://dev.api.feedyourimage.co.uk/api/'
        // API_URL: 'http://dev.api.feedyourimage.co.uk/api/'
    }
};
module.exports = withPlugins([
    [withTM, {
        transpileModules: ['gsap', 'aos'],
    }],
    images,
    [withCSS],
    withSass
], config);
