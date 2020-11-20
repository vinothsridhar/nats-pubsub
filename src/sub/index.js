const NATS = require("ts-nats");

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
    
        let sub = await nc.subscribe("greetings", (err, msg) => {
            if (err) {
                console.error(err);
            } else {
                console.log("[" + (new Date()).toISOString() + "]: " + msg.data);
            }
        });

        sub.unsubscribe(10);
    } catch (e) {
        console.error(e);
    }
};