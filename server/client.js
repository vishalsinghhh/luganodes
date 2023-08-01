const DHT = require('hyperdht');
const b4a = require('b4a');

console.log('Connecting to:', '4e2a0c95d766212b813fb4783bba54c40400fc486f2545f697d9d3a24fedd58e')
const publicKey = b4a.from('4e2a0c95d766212b813fb4783bba54c40400fc486f2545f697d9d3a24fedd58e', 'hex')

const dht = new DHT()
const conn = dht.connect(publicKey)
conn.once('open', () => console.log('got connection!'))

process.stdin.pipe(conn).pipe(process.stdout)