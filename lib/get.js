import "whatwg-fetch";

const url = id => `https://damonzucconi-mesa-production.herokuapp.com/consecutives/${id}/source`;

export default id => fetch(url(id)).then(res => res.text());
