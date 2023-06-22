const { test, expect } = require('@playwright/test');

test('basic test', async ({ page }) => {
    await page.goto('https://arithmetic.zetamac.com/game?key=02765feb');
    // look for the div with id='game'
    await page.waitForSelector('#game');
    // for 120s, play the game
    const duration = 120000;
    let endTime = Date.now() + duration;

    async function calculate() {
        await page.waitForSelector('.problem');
        const problem = await page.textContent('.problem');
        let answer;
        if (problem.includes('x')) {
            const [a, b] = problem.split('x');
            answer = (parseInt(a) * parseInt(b)).toString();
        } else if (problem.includes('+')) {
            const [a, b] = problem.split('+');
            answer = (parseInt(a) + parseInt(b)).toString();
        } else if (problem.includes('-')) {
            const [a, b] = problem.split('-');
            answer = (parseInt(a) - parseInt(b)).toString();
        } else if (problem.includes('÷')) {
            const [a, b] = problem.split('÷');
            answer = (parseInt(a) / parseInt(b)).toString();
        } else if (problem.includes('×')) {
            const [a, b] = problem.split('×');
            answer = (parseInt(a) * parseInt(b)).toString();
        }

        console.log(answer);
        await page.getByRole('textbox').type(answer);
    }

    while (Date.now() < endTime) {
        await calculate();
    }
});
