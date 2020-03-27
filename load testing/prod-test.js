import { group, sleep, check, fail } from 'k6';
import http from 'k6/http';

// Version: 1.2
// Creator: WebInspector

export let options = {
	maxRedirects: 2,
	stages: [
		{target: 25, duration: '1m'},
		{target: 25, duration: '30s'},
		{target: 75, duration: '1m'},
		{target: 75, duration: '30s'},
		{target: 0, duration: '2m'}
	]
};

export default function() {

	group("page_1 - https://www.pancreatlas.org/", function() {
		let req, res;
		req = [{
			"method": "get",
			"url": "https://www.pancreatlas.org/",
			"params": {
				"headers": {
					"Host": "www.pancreatlas.org",
					"Connection": "keep-alive",
					"Upgrade-Insecure-Requests": "1",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Sec-Fetch-Dest": "document",
					"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
					"Sec-Fetch-Site": "none",
					"Sec-Fetch-Mode": "navigate",
					"Sec-Fetch-User": "?1",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://www.pancreatlas.org/static/css/2.67a75d8b.chunk.css",
			"params": {
				"cookies": {
					"BIGipServer~department~pancreatlas": "!boksShk/8y+W0RJ/sXEaJDJ+FST3WScWzk5ptdelixHKmLPqiE+SmIa9O6AuFBwl1wpDhnA6q7f8"
				},
				"headers": {
					"Host": "www.pancreatlas.org",
					"Connection": "keep-alive",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Sec-Fetch-Dest": "style",
					"Accept": "text/css,*/*;q=0.1",
					"Sec-Fetch-Site": "same-origin",
					"Sec-Fetch-Mode": "no-cors",
					"Referer": "https://www.pancreatlas.org/",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://www.pancreatlas.org/static/css/main.f5749474.chunk.css",
			"params": {
				"cookies": {
					"BIGipServer~department~pancreatlas": "!boksShk/8y+W0RJ/sXEaJDJ+FST3WScWzk5ptdelixHKmLPqiE+SmIa9O6AuFBwl1wpDhnA6q7f8"
				},
				"headers": {
					"Host": "www.pancreatlas.org",
					"Connection": "keep-alive",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Sec-Fetch-Dest": "style",
					"Accept": "text/css,*/*;q=0.1",
					"Sec-Fetch-Site": "same-origin",
					"Sec-Fetch-Mode": "no-cors",
					"Referer": "https://www.pancreatlas.org/",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://www.pancreatlas.org/static/js/main.f7a1fdb6.chunk.js",
			"params": {
				"cookies": {
					"BIGipServer~department~pancreatlas": "!boksShk/8y+W0RJ/sXEaJDJ+FST3WScWzk5ptdelixHKmLPqiE+SmIa9O6AuFBwl1wpDhnA6q7f8"
				},
				"headers": {
					"Host": "www.pancreatlas.org",
					"Connection": "keep-alive",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Sec-Fetch-Dest": "script",
					"Accept": "*/*",
					"Sec-Fetch-Site": "same-origin",
					"Sec-Fetch-Mode": "no-cors",
					"Referer": "https://www.pancreatlas.org/",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://www.pancreatlas.org/static/js/2.32ca6113.chunk.js",
			"params": {
				"cookies": {
					"BIGipServer~department~pancreatlas": "!boksShk/8y+W0RJ/sXEaJDJ+FST3WScWzk5ptdelixHKmLPqiE+SmIa9O6AuFBwl1wpDhnA6q7f8"
				},
				"headers": {
					"Host": "www.pancreatlas.org",
					"Connection": "keep-alive",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Sec-Fetch-Dest": "script",
					"Accept": "*/*",
					"Sec-Fetch-Site": "same-origin",
					"Sec-Fetch-Mode": "no-cors",
					"Referer": "https://www.pancreatlas.org/",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		}];
		res = http.batch(req);
		res.forEach(r => {
			if (!check(r, {
				'status of 200': r => r.status === 200
			})) {
				fail(`Request to ${r.request.url} failed with a status ${r.status}.`)
			}

		})
		sleep(1.37);
		req = [{
			"method": "get",
			"url": "https://www.pancreatlas.org/static/media/banner-bg3-fade.17d2088d.png",
			"params": {
				"cookies": {
					"BIGipServer~department~pancreatlas": "!boksShk/8y+W0RJ/sXEaJDJ+FST3WScWzk5ptdelixHKmLPqiE+SmIa9O6AuFBwl1wpDhnA6q7f8"
				},
				"headers": {
					"Host": "www.pancreatlas.org",
					"Connection": "keep-alive",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Sec-Fetch-Dest": "image",
					"Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
					"Sec-Fetch-Site": "same-origin",
					"Sec-Fetch-Mode": "no-cors",
					"Referer": "https://www.pancreatlas.org/",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://www.pancreatlas.org/static/media/pancreatlas-logo.9ff11b5a.png",
			"params": {
				"cookies": {
					"BIGipServer~department~pancreatlas": "!boksShk/8y+W0RJ/sXEaJDJ+FST3WScWzk5ptdelixHKmLPqiE+SmIa9O6AuFBwl1wpDhnA6q7f8"
				},
				"headers": {
					"Host": "www.pancreatlas.org",
					"Connection": "keep-alive",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Sec-Fetch-Dest": "image",
					"Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
					"Sec-Fetch-Site": "same-origin",
					"Sec-Fetch-Mode": "no-cors",
					"Referer": "https://www.pancreatlas.org/",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://www.pancreatlas.org/static/media/pancreas-islet-cells.af22e0b4.png",
			"params": {
				"cookies": {
					"BIGipServer~department~pancreatlas": "!boksShk/8y+W0RJ/sXEaJDJ+FST3WScWzk5ptdelixHKmLPqiE+SmIa9O6AuFBwl1wpDhnA6q7f8"
				},
				"headers": {
					"Host": "www.pancreatlas.org",
					"Connection": "keep-alive",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Sec-Fetch-Dest": "image",
					"Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
					"Sec-Fetch-Site": "same-origin",
					"Sec-Fetch-Mode": "no-cors",
					"Referer": "https://www.pancreatlas.org/",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://www.pancreatlas.org/static/media/helmsley.47f429c3.jpg",
			"params": {
				"cookies": {
					"BIGipServer~department~pancreatlas": "!boksShk/8y+W0RJ/sXEaJDJ+FST3WScWzk5ptdelixHKmLPqiE+SmIa9O6AuFBwl1wpDhnA6q7f8"
				},
				"headers": {
					"Host": "www.pancreatlas.org",
					"Connection": "keep-alive",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Sec-Fetch-Dest": "image",
					"Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
					"Sec-Fetch-Site": "same-origin",
					"Sec-Fetch-Mode": "no-cors",
					"Referer": "https://www.pancreatlas.org/",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://www.pancreatlas.org/static/media/IIDP.89098513.png",
			"params": {
				"cookies": {
					"BIGipServer~department~pancreatlas": "!boksShk/8y+W0RJ/sXEaJDJ+FST3WScWzk5ptdelixHKmLPqiE+SmIa9O6AuFBwl1wpDhnA6q7f8",
					"_ga": "GA1.2.1102503636.1585278380"
				},
				"headers": {
					"Host": "www.pancreatlas.org",
					"Connection": "keep-alive",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Sec-Fetch-Dest": "image",
					"Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
					"Sec-Fetch-Site": "same-origin",
					"Sec-Fetch-Mode": "no-cors",
					"Referer": "https://www.pancreatlas.org/",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://www.pancreatlas.org/static/media/NDRI.132319cb.jpg",
			"params": {
				"cookies": {
					"BIGipServer~department~pancreatlas": "!boksShk/8y+W0RJ/sXEaJDJ+FST3WScWzk5ptdelixHKmLPqiE+SmIa9O6AuFBwl1wpDhnA6q7f8"
				},
				"headers": {
					"Host": "www.pancreatlas.org",
					"Connection": "keep-alive",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Sec-Fetch-Dest": "image",
					"Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
					"Sec-Fetch-Site": "same-origin",
					"Sec-Fetch-Mode": "no-cors",
					"Referer": "https://www.pancreatlas.org/",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://www.pancreatlas.org/static/media/IIAM.bc467525.png",
			"params": {
				"cookies": {
					"BIGipServer~department~pancreatlas": "!boksShk/8y+W0RJ/sXEaJDJ+FST3WScWzk5ptdelixHKmLPqiE+SmIa9O6AuFBwl1wpDhnA6q7f8"
				},
				"headers": {
					"Host": "www.pancreatlas.org",
					"Connection": "keep-alive",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Sec-Fetch-Dest": "image",
					"Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
					"Sec-Fetch-Site": "same-origin",
					"Sec-Fetch-Mode": "no-cors",
					"Referer": "https://www.pancreatlas.org/",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://www.pancreatlas.org/static/media/hirn.697ab8a1.jpg",
			"params": {
				"cookies": {
					"BIGipServer~department~pancreatlas": "!boksShk/8y+W0RJ/sXEaJDJ+FST3WScWzk5ptdelixHKmLPqiE+SmIa9O6AuFBwl1wpDhnA6q7f8",
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "www.pancreatlas.org",
					"Connection": "keep-alive",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Sec-Fetch-Dest": "image",
					"Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
					"Sec-Fetch-Site": "same-origin",
					"Sec-Fetch-Mode": "no-cors",
					"Referer": "https://www.pancreatlas.org/",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://www.pancreatlas.org/static/media/VUMC.6720dd8a.png",
			"params": {
				"cookies": {
					"BIGipServer~department~pancreatlas": "!boksShk/8y+W0RJ/sXEaJDJ+FST3WScWzk5ptdelixHKmLPqiE+SmIa9O6AuFBwl1wpDhnA6q7f8",
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "www.pancreatlas.org",
					"Connection": "keep-alive",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Sec-Fetch-Dest": "image",
					"Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
					"Sec-Fetch-Site": "same-origin",
					"Sec-Fetch-Mode": "no-cors",
					"Referer": "https://www.pancreatlas.org/",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://api.pancreatlas.org/api/datasets/",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "api.pancreatlas.org",
					"Connection": "keep-alive",
					"Accept": "application/json, text/plain, */*",
					"Sec-Fetch-Dest": "empty",
					"Authorization": "undefined",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Origin": "https://www.pancreatlas.org",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "cors",
					"Referer": "https://www.pancreatlas.org/",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		}];
		res = http.batch(req);
		res.forEach(r => {
			if (!check(r, {
				'status of 200': r => r.status === 200
			})) {
				fail(`Request to ${r.request.url} failed with a status ${r.status}.`)
			}

		})
		sleep(0.89);
		req = [{
			"method": "get",
			"url": "https://www.pancreatlas.org/static/media/human-pancreas-analysis-program-hpap.dee7e03a.png",
			"params": {
				"cookies": {
					"BIGipServer~department~pancreatlas": "!boksShk/8y+W0RJ/sXEaJDJ+FST3WScWzk5ptdelixHKmLPqiE+SmIa9O6AuFBwl1wpDhnA6q7f8",
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "www.pancreatlas.org",
					"Connection": "keep-alive",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Sec-Fetch-Dest": "image",
					"Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
					"Sec-Fetch-Site": "same-origin",
					"Sec-Fetch-Mode": "no-cors",
					"Referer": "https://www.pancreatlas.org/",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://www.pancreatlas.org/static/media/neonatal-development--early-life-pancreas-handel-p.d56fa687.png",
			"params": {
				"cookies": {
					"BIGipServer~department~pancreatlas": "!boksShk/8y+W0RJ/sXEaJDJ+FST3WScWzk5ptdelixHKmLPqiE+SmIa9O6AuFBwl1wpDhnA6q7f8",
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "www.pancreatlas.org",
					"Connection": "keep-alive",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Sec-Fetch-Dest": "image",
					"Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
					"Sec-Fetch-Site": "same-origin",
					"Sec-Fetch-Mode": "no-cors",
					"Referer": "https://www.pancreatlas.org/",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://www.pancreatlas.org/static/media/cystic-fibrosis-related-diabetes-cfrd-banner.d295fb2a.png",
			"params": {
				"cookies": {
					"BIGipServer~department~pancreatlas": "!boksShk/8y+W0RJ/sXEaJDJ+FST3WScWzk5ptdelixHKmLPqiE+SmIa9O6AuFBwl1wpDhnA6q7f8",
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "www.pancreatlas.org",
					"Connection": "keep-alive",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Sec-Fetch-Dest": "image",
					"Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
					"Sec-Fetch-Site": "same-origin",
					"Sec-Fetch-Mode": "no-cors",
					"Referer": "https://www.pancreatlas.org/",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://www.pancreatlas.org/static/media/human-pancreas-analysis-program-hpap-banner.16d6312d.png",
			"params": {
				"cookies": {
					"BIGipServer~department~pancreatlas": "!boksShk/8y+W0RJ/sXEaJDJ+FST3WScWzk5ptdelixHKmLPqiE+SmIa9O6AuFBwl1wpDhnA6q7f8",
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "www.pancreatlas.org",
					"Connection": "keep-alive",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Sec-Fetch-Dest": "image",
					"Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
					"Sec-Fetch-Site": "same-origin",
					"Sec-Fetch-Mode": "no-cors",
					"Referer": "https://www.pancreatlas.org/",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://www.pancreatlas.org/static/media/npod-case-6362-banner.1f9468ad.png",
			"params": {
				"cookies": {
					"BIGipServer~department~pancreatlas": "!boksShk/8y+W0RJ/sXEaJDJ+FST3WScWzk5ptdelixHKmLPqiE+SmIa9O6AuFBwl1wpDhnA6q7f8",
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "www.pancreatlas.org",
					"Connection": "keep-alive",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Sec-Fetch-Dest": "image",
					"Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
					"Sec-Fetch-Site": "same-origin",
					"Sec-Fetch-Mode": "no-cors",
					"Referer": "https://www.pancreatlas.org/",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://www.pancreatlas.org/static/media/neonatal-development--early-life-pancreas-handel-p-banner.f1072978.png",
			"params": {
				"cookies": {
					"BIGipServer~department~pancreatlas": "!boksShk/8y+W0RJ/sXEaJDJ+FST3WScWzk5ptdelixHKmLPqiE+SmIa9O6AuFBwl1wpDhnA6q7f8",
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "www.pancreatlas.org",
					"Connection": "keep-alive",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Sec-Fetch-Dest": "image",
					"Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
					"Sec-Fetch-Site": "same-origin",
					"Sec-Fetch-Mode": "no-cors",
					"Referer": "https://www.pancreatlas.org/",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		}];
		res = http.batch(req);
		res.forEach(r => {
			if (!check(r, {
				'status of 200': r => r.status === 200
			})) {
				fail(`Request to ${r.request.url} failed with a status ${r.status}.`)
			}

		})
		sleep(7.18);
		req = [{
			"method": "get",
			"url": "https://api.pancreatlas.org/api/datasets/531",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "api.pancreatlas.org",
					"Connection": "keep-alive",
					"Accept": "application/json, text/plain, */*",
					"Sec-Fetch-Dest": "empty",
					"Authorization": "undefined",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Origin": "https://www.pancreatlas.org",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://api.pancreatlas.org/api/datasets/531/get-tags",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "api.pancreatlas.org",
					"Connection": "keep-alive",
					"Accept": "application/json, text/plain, */*",
					"Sec-Fetch-Dest": "empty",
					"Authorization": "undefined",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Origin": "https://www.pancreatlas.org",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://api.pancreatlas.org/api/datasets/531",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "api.pancreatlas.org",
					"Connection": "keep-alive",
					"Accept": "application/json, text/plain, */*",
					"Sec-Fetch-Dest": "empty",
					"Authorization": "undefined",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Origin": "https://www.pancreatlas.org",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://api.pancreatlas.org/api/datasets/531/",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "api.pancreatlas.org",
					"Connection": "keep-alive",
					"Accept": "application/json, text/plain, */*",
					"Sec-Fetch-Dest": "empty",
					"Authorization": "undefined",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Origin": "https://www.pancreatlas.org",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://api.pancreatlas.org/api/datasets/531/",
			"params": {
				"headers": {
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://api.pancreatlas.org/api/datasets/531/get-tags/",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "api.pancreatlas.org",
					"Connection": "keep-alive",
					"Accept": "application/json, text/plain, */*",
					"Sec-Fetch-Dest": "empty",
					"Authorization": "undefined",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Origin": "https://www.pancreatlas.org",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://api.pancreatlas.org/api/datasets/531/get-images",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "api.pancreatlas.org",
					"Connection": "keep-alive",
					"Accept": "application/json, text/plain, */*",
					"Sec-Fetch-Dest": "empty",
					"Authorization": "undefined",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Origin": "https://www.pancreatlas.org",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://api.pancreatlas.org/api/datasets/531/get-images/",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "api.pancreatlas.org",
					"Connection": "keep-alive",
					"Accept": "application/json, text/plain, */*",
					"Sec-Fetch-Dest": "empty",
					"Authorization": "undefined",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Origin": "https://www.pancreatlas.org",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://api.pancreatlas.org/api/images/20516",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "api.pancreatlas.org",
					"Connection": "keep-alive",
					"Accept": "application/json, text/plain, */*",
					"Sec-Fetch-Dest": "empty",
					"Authorization": "undefined",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Origin": "https://www.pancreatlas.org",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://api.pancreatlas.org/api/images/20519",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "api.pancreatlas.org",
					"Connection": "keep-alive",
					"Accept": "application/json, text/plain, */*",
					"Sec-Fetch-Dest": "empty",
					"Authorization": "undefined",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Origin": "https://www.pancreatlas.org",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://api.pancreatlas.org/api/images/20522",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "api.pancreatlas.org",
					"Connection": "keep-alive",
					"Accept": "application/json, text/plain, */*",
					"Sec-Fetch-Dest": "empty",
					"Authorization": "undefined",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Origin": "https://www.pancreatlas.org",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://api.pancreatlas.org/api/images/20525",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "api.pancreatlas.org",
					"Connection": "keep-alive",
					"Accept": "application/json, text/plain, */*",
					"Sec-Fetch-Dest": "empty",
					"Authorization": "undefined",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Origin": "https://www.pancreatlas.org",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://api.pancreatlas.org/api/images/20528",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "api.pancreatlas.org",
					"Connection": "keep-alive",
					"Accept": "application/json, text/plain, */*",
					"Sec-Fetch-Dest": "empty",
					"Authorization": "undefined",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Origin": "https://www.pancreatlas.org",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://api.pancreatlas.org/api/images/20531",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "api.pancreatlas.org",
					"Connection": "keep-alive",
					"Accept": "application/json, text/plain, */*",
					"Sec-Fetch-Dest": "empty",
					"Authorization": "undefined",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Origin": "https://www.pancreatlas.org",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://api.pancreatlas.org/api/images/20534",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "api.pancreatlas.org",
					"Connection": "keep-alive",
					"Accept": "application/json, text/plain, */*",
					"Sec-Fetch-Dest": "empty",
					"Authorization": "undefined",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Origin": "https://www.pancreatlas.org",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://api.pancreatlas.org/api/images/20537",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "api.pancreatlas.org",
					"Connection": "keep-alive",
					"Accept": "application/json, text/plain, */*",
					"Sec-Fetch-Dest": "empty",
					"Authorization": "undefined",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Origin": "https://www.pancreatlas.org",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://api.pancreatlas.org/api/images/20540",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "api.pancreatlas.org",
					"Connection": "keep-alive",
					"Accept": "application/json, text/plain, */*",
					"Sec-Fetch-Dest": "empty",
					"Authorization": "undefined",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Origin": "https://www.pancreatlas.org",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://api.pancreatlas.org/api/images/20543",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "api.pancreatlas.org",
					"Connection": "keep-alive",
					"Accept": "application/json, text/plain, */*",
					"Sec-Fetch-Dest": "empty",
					"Authorization": "undefined",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Origin": "https://www.pancreatlas.org",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://api.pancreatlas.org/api/images/20546",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "api.pancreatlas.org",
					"Connection": "keep-alive",
					"Accept": "application/json, text/plain, */*",
					"Sec-Fetch-Dest": "empty",
					"Authorization": "undefined",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Origin": "https://www.pancreatlas.org",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://api.pancreatlas.org/api/images/20549",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "api.pancreatlas.org",
					"Connection": "keep-alive",
					"Accept": "application/json, text/plain, */*",
					"Sec-Fetch-Dest": "empty",
					"Authorization": "undefined",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Origin": "https://www.pancreatlas.org",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://api.pancreatlas.org/api/images/20552",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "api.pancreatlas.org",
					"Connection": "keep-alive",
					"Accept": "application/json, text/plain, */*",
					"Sec-Fetch-Dest": "empty",
					"Authorization": "undefined",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Origin": "https://www.pancreatlas.org",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://api.pancreatlas.org/api/images/20555",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "api.pancreatlas.org",
					"Connection": "keep-alive",
					"Accept": "application/json, text/plain, */*",
					"Sec-Fetch-Dest": "empty",
					"Authorization": "undefined",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Origin": "https://www.pancreatlas.org",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://api.pancreatlas.org/api/images/20558",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "api.pancreatlas.org",
					"Connection": "keep-alive",
					"Accept": "application/json, text/plain, */*",
					"Sec-Fetch-Dest": "empty",
					"Authorization": "undefined",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Origin": "https://www.pancreatlas.org",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://api.pancreatlas.org/api/images/20516/",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "api.pancreatlas.org",
					"Connection": "keep-alive",
					"Accept": "application/json, text/plain, */*",
					"Sec-Fetch-Dest": "empty",
					"Authorization": "undefined",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Origin": "https://www.pancreatlas.org",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://api.pancreatlas.org/api/images/20519/",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "api.pancreatlas.org",
					"Connection": "keep-alive",
					"Accept": "application/json, text/plain, */*",
					"Sec-Fetch-Dest": "empty",
					"Authorization": "undefined",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Origin": "https://www.pancreatlas.org",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://api.pancreatlas.org/api/images/20522/",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "api.pancreatlas.org",
					"Connection": "keep-alive",
					"Accept": "application/json, text/plain, */*",
					"Sec-Fetch-Dest": "empty",
					"Authorization": "undefined",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Origin": "https://www.pancreatlas.org",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://api.pancreatlas.org/api/images/20525/",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "api.pancreatlas.org",
					"Connection": "keep-alive",
					"Accept": "application/json, text/plain, */*",
					"Sec-Fetch-Dest": "empty",
					"Authorization": "undefined",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Origin": "https://www.pancreatlas.org",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://api.pancreatlas.org/api/images/20528/",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "api.pancreatlas.org",
					"Connection": "keep-alive",
					"Accept": "application/json, text/plain, */*",
					"Sec-Fetch-Dest": "empty",
					"Authorization": "undefined",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Origin": "https://www.pancreatlas.org",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://api.pancreatlas.org/api/images/20531/",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "api.pancreatlas.org",
					"Connection": "keep-alive",
					"Accept": "application/json, text/plain, */*",
					"Sec-Fetch-Dest": "empty",
					"Authorization": "undefined",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Origin": "https://www.pancreatlas.org",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://api.pancreatlas.org/api/images/20534/",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "api.pancreatlas.org",
					"Connection": "keep-alive",
					"Accept": "application/json, text/plain, */*",
					"Sec-Fetch-Dest": "empty",
					"Authorization": "undefined",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Origin": "https://www.pancreatlas.org",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://api.pancreatlas.org/api/images/20537/",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "api.pancreatlas.org",
					"Connection": "keep-alive",
					"Accept": "application/json, text/plain, */*",
					"Sec-Fetch-Dest": "empty",
					"Authorization": "undefined",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Origin": "https://www.pancreatlas.org",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://api.pancreatlas.org/api/images/20540/",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "api.pancreatlas.org",
					"Connection": "keep-alive",
					"Accept": "application/json, text/plain, */*",
					"Sec-Fetch-Dest": "empty",
					"Authorization": "undefined",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Origin": "https://www.pancreatlas.org",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://api.pancreatlas.org/api/images/20549/",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "api.pancreatlas.org",
					"Connection": "keep-alive",
					"Accept": "application/json, text/plain, */*",
					"Sec-Fetch-Dest": "empty",
					"Authorization": "undefined",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Origin": "https://www.pancreatlas.org",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://api.pancreatlas.org/api/images/20543/",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "api.pancreatlas.org",
					"Connection": "keep-alive",
					"Accept": "application/json, text/plain, */*",
					"Sec-Fetch-Dest": "empty",
					"Authorization": "undefined",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Origin": "https://www.pancreatlas.org",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://api.pancreatlas.org/api/images/20546/",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "api.pancreatlas.org",
					"Connection": "keep-alive",
					"Accept": "application/json, text/plain, */*",
					"Sec-Fetch-Dest": "empty",
					"Authorization": "undefined",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Origin": "https://www.pancreatlas.org",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://api.pancreatlas.org/api/images/20552/",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "api.pancreatlas.org",
					"Connection": "keep-alive",
					"Accept": "application/json, text/plain, */*",
					"Sec-Fetch-Dest": "empty",
					"Authorization": "undefined",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Origin": "https://www.pancreatlas.org",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://api.pancreatlas.org/api/images/20555/",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "api.pancreatlas.org",
					"Connection": "keep-alive",
					"Accept": "application/json, text/plain, */*",
					"Sec-Fetch-Dest": "empty",
					"Authorization": "undefined",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Origin": "https://www.pancreatlas.org",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://api.pancreatlas.org/api/images/20558/",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "api.pancreatlas.org",
					"Connection": "keep-alive",
					"Accept": "application/json, text/plain, */*",
					"Sec-Fetch-Dest": "empty",
					"Authorization": "undefined",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Origin": "https://www.pancreatlas.org",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://pancreatlas.org/images/20519.jpg",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "pancreatlas.org",
					"Connection": "keep-alive",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Sec-Fetch-Dest": "image",
					"Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "no-cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://pancreatlas.org/images/20516.jpg",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "pancreatlas.org",
					"Connection": "keep-alive",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Sec-Fetch-Dest": "image",
					"Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "no-cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://pancreatlas.org/images/20525.jpg",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "pancreatlas.org",
					"Connection": "keep-alive",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Sec-Fetch-Dest": "image",
					"Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "no-cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://pancreatlas.org/images/20522.jpg",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1"
				},
				"headers": {
					"Host": "pancreatlas.org",
					"Connection": "keep-alive",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Sec-Fetch-Dest": "image",
					"Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "no-cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://pancreatlas.org/images/20528.jpg",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1",
					"BIGipServer~department~pancreatlas": "!7UD3E4fZTkO5xRvMh6FnSm5cVs6lmUyYGdtKXZm/bxMeJEKZQbcjh8bQNimtKarg4rsMxe4jPxpU"
				},
				"headers": {
					"Host": "pancreatlas.org",
					"Connection": "keep-alive",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Sec-Fetch-Dest": "image",
					"Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "no-cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://pancreatlas.org/images/20531.jpg",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1",
					"BIGipServer~department~pancreatlas": "!Obwg6e+BeNvivBF/sXEaJDJ+FST3WVE2HdXAsoxA3rkzqH9in5ANiJr8lsCvdEhjqBfF1xB9urqH"
				},
				"headers": {
					"Host": "pancreatlas.org",
					"Connection": "keep-alive",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Sec-Fetch-Dest": "image",
					"Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "no-cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://pancreatlas.org/images/20537.jpg",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1",
					"BIGipServer~department~pancreatlas": "!Obwg6e+BeNvivBF/sXEaJDJ+FST3WVE2HdXAsoxA3rkzqH9in5ANiJr8lsCvdEhjqBfF1xB9urqH"
				},
				"headers": {
					"Host": "pancreatlas.org",
					"Connection": "keep-alive",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Sec-Fetch-Dest": "image",
					"Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "no-cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://pancreatlas.org/images/20534.jpg",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1",
					"BIGipServer~department~pancreatlas": "!Obwg6e+BeNvivBF/sXEaJDJ+FST3WVE2HdXAsoxA3rkzqH9in5ANiJr8lsCvdEhjqBfF1xB9urqH"
				},
				"headers": {
					"Host": "pancreatlas.org",
					"Connection": "keep-alive",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Sec-Fetch-Dest": "image",
					"Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "no-cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://pancreatlas.org/images/20540.jpg",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1",
					"BIGipServer~department~pancreatlas": "!Obwg6e+BeNvivBF/sXEaJDJ+FST3WVE2HdXAsoxA3rkzqH9in5ANiJr8lsCvdEhjqBfF1xB9urqH"
				},
				"headers": {
					"Host": "pancreatlas.org",
					"Connection": "keep-alive",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Sec-Fetch-Dest": "image",
					"Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "no-cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://pancreatlas.org/images/20549.jpg",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1",
					"BIGipServer~department~pancreatlas": "!Obwg6e+BeNvivBF/sXEaJDJ+FST3WVE2HdXAsoxA3rkzqH9in5ANiJr8lsCvdEhjqBfF1xB9urqH"
				},
				"headers": {
					"Host": "pancreatlas.org",
					"Connection": "keep-alive",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Sec-Fetch-Dest": "image",
					"Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "no-cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://pancreatlas.org/images/20543.jpg",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1",
					"BIGipServer~department~pancreatlas": "!Obwg6e+BeNvivBF/sXEaJDJ+FST3WVE2HdXAsoxA3rkzqH9in5ANiJr8lsCvdEhjqBfF1xB9urqH"
				},
				"headers": {
					"Host": "pancreatlas.org",
					"Connection": "keep-alive",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Sec-Fetch-Dest": "image",
					"Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "no-cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://pancreatlas.org/images/20552.jpg",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1",
					"BIGipServer~department~pancreatlas": "!Obwg6e+BeNvivBF/sXEaJDJ+FST3WVE2HdXAsoxA3rkzqH9in5ANiJr8lsCvdEhjqBfF1xB9urqH"
				},
				"headers": {
					"Host": "pancreatlas.org",
					"Connection": "keep-alive",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Sec-Fetch-Dest": "image",
					"Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "no-cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://pancreatlas.org/images/20546.jpg",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1",
					"BIGipServer~department~pancreatlas": "!Obwg6e+BeNvivBF/sXEaJDJ+FST3WVE2HdXAsoxA3rkzqH9in5ANiJr8lsCvdEhjqBfF1xB9urqH"
				},
				"headers": {
					"Host": "pancreatlas.org",
					"Connection": "keep-alive",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Sec-Fetch-Dest": "image",
					"Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "no-cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://pancreatlas.org/images/20555.jpg",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1",
					"BIGipServer~department~pancreatlas": "!Obwg6e+BeNvivBF/sXEaJDJ+FST3WVE2HdXAsoxA3rkzqH9in5ANiJr8lsCvdEhjqBfF1xB9urqH"
				},
				"headers": {
					"Host": "pancreatlas.org",
					"Connection": "keep-alive",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Sec-Fetch-Dest": "image",
					"Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "no-cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://pancreatlas.org/images/20558.jpg",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1102503636.1585278380",
					"_gid": "GA1.2.2067616224.1585278380",
					"_gat": "1",
					"BIGipServer~department~pancreatlas": "!Obwg6e+BeNvivBF/sXEaJDJ+FST3WVE2HdXAsoxA3rkzqH9in5ANiJr8lsCvdEhjqBfF1xB9urqH"
				},
				"headers": {
					"Host": "pancreatlas.org",
					"Connection": "keep-alive",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
					"Sec-Fetch-Dest": "image",
					"Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
					"Sec-Fetch-Site": "same-site",
					"Sec-Fetch-Mode": "no-cors",
					"Referer": "https://www.pancreatlas.org/datasets/531?browse=false",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "en-US,en;q=0.9"
				}
			}
		}];
		res = http.batch(req);
		res.forEach(r => {
			if (!check(r, {
				'status of 200': r => r.status === 200
			})) {
				fail(`Request to ${r.request.url} failed with a status ${r.status}.`)
			}

		})
		// Random sleep between 20s and 40s
		sleep(Math.floor(Math.random()*20+20));
	});

}
