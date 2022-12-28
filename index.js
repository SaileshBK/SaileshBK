const fetch = require('node-fetch');
const Mustache = require('mustache');
const fs = require('fs');
const Mustache_Main_Dir = './main.mustache';

/**
 * It fetches data from the API, then returns the advice.
 * @returns The advice from the API.
 */
const fetchData = async () => {
    const response = await fetch('https://api.adviceslip.com/advice')
        .then(result => result.json())

    return response.slip.advice;
}

/**
 * It fetches the data from the API, then it reads the template file, then it renders the template with
 * the data, then it writes the rendered template to the README.md file.
 */
const generateReadMe = async () => {
    const adviceData = {
        advice: await fetchData()
    };

    fs.readFile(Mustache_Main_Dir, (err, data) => {
        if (err) throw err;
        const output = Mustache.render(data.toString(), adviceData);
        fs.writeFileSync('README.md', output);
    });
}
generateReadMe();