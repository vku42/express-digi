import express from "express";

const app = express();
const port = 3000;
app.use(express.json())

let teaData = [];
let nextId = 1;

// Add a New Tea
app.post('/teas', (req, res) => {
    const {name, price} = req.body;
    const newTea = {
        id: nextId++,
        name,
        price,
    }
    teaData.push(newTea)
    res.status(201).send(newTea)
})

// Get all tea
app.get('/teas', (req, res) => {
    res.status(200).send(teaData)
})

// get tea with ID
app.get('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if (!tea) {
        return res.status(404).send('Tea not found')
    }
    res.status(200).send(tea)
})

// updation of tea
app.put('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if (!tea) {
        return res.status(404).send('Tea not found')
    } 
    const {name, price} = req.body
    tea.name = name;
    tea.price = price;
    res.send(200).send(tea)

})


// Delete Tea
app.delete('/teas/:id', (req, res) => {
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
    if(index === -1){
        return res.send(404).send("Tea Not found")
    }
    teaData.splice(index, 1)
    return res.send(204).send('deleted')

})



app.listen(port, () => {
  console.log(`Server is running at port: ${port}.....`);
});
