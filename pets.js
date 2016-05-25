const pets = [
	{ name: 'tweety', type: 'bird' },
	{ name: 'felix', type: 'cat' },
	{ name: 'angeline', type: 'cat' },
	{ name: 'fido', type: 'dog' },
	{ name: 'polly', type: 'bird' },
	{ name: 'timmy', type: 'mouse' },
	{ name: 'garfield', type: 'cat' },
]

pets.forEach( ( p, i ) => p.id = i );
let i = pets.length;

const find = id => pets.find( p => p.id === id );

module.exports = {
	get() {
		return Promise.resolve( pets );
	},
	add( pet ) {
		pet.id = i++;
		pets.push( pet );
		return Promise.resolve( pet );
	}
}