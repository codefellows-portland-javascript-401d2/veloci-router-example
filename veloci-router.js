const Router = require( 'veloci-router' );
const app = new Router();
const pets = require( './pets' );

function respond( res, promise ) {
	res.statusCode = 200;
	res.setHeader( 'Content-Type', 'application/json' );
		
	promise.then( result => res.send( result ) )
		.catch( error => {
			res.statusCode = 400;
			res.send( { error } ) 
		});
}

app
	.get( '/', ( req, res ) => {
		res.send( 'hello veloci!' );
	})
	.get( '/pets', ( req, res ) => {
		respond( res, pets.getAll() );
	})
	.post( '/pets', ( req, res ) => {
		let body = '';
		req.on( 'data', d => body += d );
		req.on( 'end', () => {
			const pet = JSON.parse( body );
			respond( res, pets.add( pet ) );
		});
	});

app.listen( [ 8080 ] ); 