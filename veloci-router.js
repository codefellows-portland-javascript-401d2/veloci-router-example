const Router = require( 'veloci-router' );
const app = new Router();

const pets = require( './pets' );

 
app
	.get( '/', ( req, res ) => {
		res.send( 'hello veloci!' );
	})
	.get( '/pets', ( req, res ) => {
		pets.get().then( pet => res.send( pet ) );
	})
	.post( '/pets', ( req, res ) => {
		let body = '';
		req.on( 'data', d => body += d );
		req.on( 'end', () => {
			const pet = JSON.parse( body );
			pets.add( pet ).then( pet => res.send( pet ) );
		});
	});

app.listen([8080]); 