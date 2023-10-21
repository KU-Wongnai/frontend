import Pusher from "pusher-js";
import Echo from "laravel-echo";

const options = {
    broadcaster: 'pusher',
    key: process.env.NEXT_PUBLIC_PUSHER_KEY,
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    encrypted: true
  };
const echo = new Echo(options);

export default echo;