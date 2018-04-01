const koa = require('koa');
const app = new koa();

app.use(async (ctx, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use((ctx, next) => {
	// console.log(1) in
	next();
	// console.log(2) out
	ctx.body = 'Hello World';
});

app.listen(3000, () => {
	console.log('server is running at http://localhost:3000')
})