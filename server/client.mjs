import DHT from 'hyperdht'
import b4a from 'b4a'

console.log('Connecting to:', '211dcfc08b23d118b8acabfe9ff167eff068b25f853cf7516472994dd50b4b66')
const publicKey = b4a.from('211dcfc08b23d118b8acabfe9ff167eff068b25f853cf7516472994dd50b4b66', 'hex')

const dht = new DHT()
const conn = dht.connect(publicKey)
conn.once('open', () => console.log('got connection!'))

process.stdin.pipe(conn).pipe(process.stdout)