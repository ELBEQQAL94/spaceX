// @express for create server
const express = require('express');

// enable cors problem
const cors = require('cors');

//@express-graphql
const GraphqlExpress = require('express-graphql');

// @path
const path = require('path'); 

// @app with express
const app = express();

//@schema
const schema = require('./schema');

app.use(cors());

// @routes
app.use('/graphql', GraphqlExpress({
    schema,
    graphiql: true
}),
);

app.use(express.static('public'));

app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running at ${PORT}...`));