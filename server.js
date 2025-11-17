const express = require("express");
const path = require("path");
const cors = require("cors");
const os = require("os");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());

// 404 handler for actual missing files (images, css, js, etc.)
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

// -------------------- START SERVER --------------------
app.listen(PORT, "0.0.0.0", () => {
    const nets = os.networkInterfaces();
    let localIPs = [];
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            if (net.family === "IPv4" && !net.internal) {
                localIPs.push(net.address);
            }
        }
    }
    console.log("\n=== Server Online ===");
    localIPs.forEach(ip => {
        console.log(`Network: http://${ip}:${PORT}`);
    });
    console.log();
});