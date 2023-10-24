import Pusher from "pusher-js";
import Echo from "laravel-echo";

const options = {
  broadcaster: "pusher",
  key: process.env.NEXT_PUBLIC_PUSHER_KEY as string,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
  encrypted: true,
};

const echo = new Echo({ ...options, client: new Pusher(options.key, options) });

export default echo;
