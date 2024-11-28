import fetch from 'node-fetch';
import Mustache from 'mustache';
import fs from 'fs';
import * as Constants from './data/endpoints.mjs';
const Mustache_Main_Dir = './main.mustache';

/**
 * Picks a random item from an array.
 * @param {Array<Object>} array - The array from which to pick a random item.
 * @returns {Object} - A randomly selected item from the array.
 */
const getRandomItem = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

/**
 * Fetches data from the API.
 * @returns json.
 */
const fetchData = async () => {
    const response = await fetch(Constants.advice_api)
        .then(result => result.json())
    return getRandomItem(response);
}

/**
 * It fetches the data from the API, then it reads the template file, then it renders the template with
 * the data, then it writes the rendered template to the README.md file.
 */
const generateReadMe = async () => {
    const fetchDataResponse = await fetchData();
    const quoteData = {
        quote: fetchDataResponse.en,
        author: fetchDataResponse.author
    };

    fs.readFile(Mustache_Main_Dir, (err, data) => {
        if (err) throw err;
        const output = Mustache.render(data.toString(), quoteData);
        fs.writeFileSync('README.md', output);
    });
}
generateReadMe();