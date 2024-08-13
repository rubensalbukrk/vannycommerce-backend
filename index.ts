import { app } from "./src/routes";

const port = process.env.PORT || 5500;

app.listen(port, () => {
    console.log(`SERVIDOR ONLINE na porta: ${port}`)
})

export default app;