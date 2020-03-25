import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    stages:  [
        {duration: '30s', target: 10},
        {duration: '2m', target: 25},
        {duration: '2m30s', target: 0}
    ]
}

export default function() {
  http.get('https://dev7-pancreatlas.app.vumc.org');
  sleep(1);
}