'use strict';

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let categories = ['funnyJoke', 'lameJoke'];

let funnyJoke = [
  {
    'joke': 'Dlaczego komputer poszedł do lekarza?',
    'response': 'Bo złapał wirusa!'
  },
  {
    'joke': 'Dlaczego komputer nie może być głodny?',
    'response': 'Bo ma pełen dysk!'
  },
  {
    'joke': 'Co mówi jeden bit do drugiego?',
    'response': '„Trzymaj się, zaraz się przestawiamy!”'
  }

];

let lameJoke = [
  {
    'joke': 'Dlaczego programiści preferują noc?',
    'response': 'Bo w nocy jest mniej bugów do łapania!'
  },
  {
    'joke': 'Jak nazywa się bardzo szybki programista?',
    'response': 'Błyskawiczny kompilator!'
  }
];

app.get('/jokebook/categories', (req, res) => {
  res.json({ categories: categories });
});

app.get('/jokebook/joke/:category', (req, res) => {
    const category = req.params.category;
    if (!categories.includes(category)) {
        return res.status(404).json({'error': `no jokes for category [${category}]`});
    }

    const joke = category === 'funnyJoke' ? funnyJoke : lameJoke;
    res.json(joke[Math.floor(Math.random() * joke.length)]);
})

app.get('/jokebook/count/:category', (req, res) => {
    const category = req.params.category;
    if (!categories.includes(category)) {
        return res.status(404).json({'error': `no jokes for category [${category}]`});
    }
    const joke = category === 'funnyJoke' ? funnyJoke : lameJoke;
    res.json({ 'count': joke.length });
})

app.post('/jokebook/joke/:category', (req, res) => {
    const category = req.params.category;
    if (!categories.includes(category)) {
        return res.status(404).json({'error': `no jokes for category [${category}]`});
    }

    console.log(req.body);
    if (!req.body || !req.body.joke || !req.body.response) {
        return res.status(400).json({'error': 'joke and response are required'});
    }

    const joke = category === 'funnyJoke' ? funnyJoke : lameJoke;
    joke.push({
        'joke': req.body.joke,
        'response': req.body.response
    });
    res.json({'success': true, 'joke': req.body.joke});
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});