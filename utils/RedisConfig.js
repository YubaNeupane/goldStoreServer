import { createClient } from 'redis';

const client = createClient({
  url: 'redis://default:Yubaneupane123@redis-10925.c278.us-east-1-4.ec2.cloud.redislabs.com:10925',
});
client.on('connect', function() {
  console.log('REDIS-Connected!');
});

client.on('disconnect', async function() {
  await client.connect()
});

await client.connect()


export default client;