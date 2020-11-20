const NATS = require("ts-nats");
const prompt = require("prompt");

const promptmessage = () => {
    return new Promise((res, rej) => {
        prompt.start();
        prompt.get(['message'], (err, result) => {
            if (err) {
                rej(err);
            } else {
                res(result.message);
            }
        });
    });
}

module.exports = async () => {
    console.log("connecting to nat server");
    try {
        let nc = await NATS.connect({
            servers: [
                "nats://localhost:4222"
            ]
        });

        console.log("connected successfully");

        console.log("-------------------------------");

        while(true) {
            try {
                let message = await promptmessage();
                nc.publish("greetings", message);
                console.log("message published successfully");
            } catch (e) {
                console.error(e);
                break;
            }
        }

        nc.close();
    } catch (e) {
        console.log(e);
    }
};