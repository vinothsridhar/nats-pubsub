let type = process.argv[2];

if (type === 'pub') {
    let publisher = require("./src/pub");
    publisher();
} else if (type === 'sub') {
    let subscriber = require("./src/sub");
    subscriber();
}
