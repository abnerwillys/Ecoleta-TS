import express from 'express'

const app = express()

app.get('/users', (request, response) => {
    console.log('hello')
    response.json([
        'Abner',
        'Mariana',
        'Rayka',
        'Astolfo',
        'Lunna',
        'Hadassa'
    ])
})

app.listen(3333)
