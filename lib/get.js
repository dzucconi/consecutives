import "whatwg-fetch";

const url = id => `https://mesa.damonzucconi.com/consecutives/${id}/source`;

export default id => fetch(url(id)).then(res => res.text());
