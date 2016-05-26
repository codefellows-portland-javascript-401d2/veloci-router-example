var routescout = require('route-scout');
const http = require('http');
const pets = require( './pets' );

function respond( res, promise ) {
	res.statusCode = 200;
	res.setHeader( 'Content-Type', 'application/json' );
		
	promise.then( result => res.write( JSON.stringify( result ) ) )
		.catch( err => {
			res.statusCode = 400;
			res.write( `{ "error": "${err}" } ` ) 
		})
		.then( () => res.end() );
}

routescout
	// unintuitive ordering of routes, will match "starts with"
	.get( '/pets/:id', ( req, res ) => {
		respond( res, pets.get( req.params.id ) );
	})
	.get( '/pets', ( req, res ) => {
		respond( res, pets.getAll() );
	})	
	.get( '/', ( req, res ) => {
		res.write( 'hello route-scout!' );
		res.end();
	})
	.post( '/pets', ( req, res ) => {
		let body = '';
		req.on( 'data', d => body += d );
		req.on( 'end', () => {
			const pet = JSON.parse( body );
			respond( res, pets.add( pet ) );
		});
	});
	
http.createServer(routescout.routes()).listen(8080);

