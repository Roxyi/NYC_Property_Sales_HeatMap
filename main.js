mapboxgl.accessToken = 'pk.eyJ1Ijoicm94eWkiLCJhIjoiY2lrcThzbDZuMDA2eHVhbTdtd242OGMwaiJ9.59dG5F-n8Sp3_YjZfgeQRw';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/roxyi/cjkk16lu40umy2smv5ebr3ojn',
    center: screen.width <= 414 ? [-73.9622, 40.75] : [-73.92, 40.75],
    zoom: 11
});

let showContourValue = false;

const popup = new mapboxgl.Popup({
	closeButton: false,
	closeOnClick: false
});

const lineColor =  {
	property: 'CONTOUR',
  	type: 'interval',
  	stops: [
    	[100, '#080F1B'],
        [200, '#0B142B'],
        [300, '#0F193B'],
        [400, '#121F4B'],
        [500, '#16245B'],
        [600, '#1A2A6C'],
        [700, '#272965'],
        [800, '#35285E'],
        [900, '#432757'],
        [1000, '#512650'],
        [1100, '#5F2549'],
        [1200, '#6D2442'],
        [1300, '#7B233B'],
        [1400, '#892234'],
        [1500, '#97212D'],
        [1600, '#A52026'],
        [1700, '#B31F1F'],
        [1800, '#B92D20'],
        [1900, '#C03B21'],
        [2000, '#C64922'],
        [2100, '#CD5724'],
        [2200, '#D46525'],
        [2300, '#DA7426'],
        [2400, '#E18227'],
        [2500, '#E89029'],
        [2600, '#EE9E2A'],
        [2700, '#F5AC2B'],
        [2800, '#FCBB2D'],
        [2900, '#FCC857'],
        [3000, '#FDD681'],
        [3100, '#FDE3AB'],
        [3200, '#FEF1D5'],
        [3300, '#FFFFFF']
  	]
};

const lineWidth = [
	'interpolate',
	['exponential', 1.75],
	['zoom'],
	12, 1,
	16, 5
];

map.on('load', () => {
	map.addLayer({
		id: 'psfHeatMap16',
		type: 'line',
		source: {
			type: 'vector',
			url: 'mapbox://roxyi.dp7xaph1'
		},
		'source-layer': 'pc16',
		paint: {
			'line-color': lineColor,
            'line-width': lineWidth,
            'line-opacity': 0.3
		}
	});

	map.on('mousemove', (e) => {
		const features = map.queryRenderedFeatures(e.point, {
			layers: ['psfHeatMap16']
		});
		if (features && features.length) {
			popup.setLngLat(e.lngLat)
			.setHTML(`<p>$ ${features[0].properties.CONTOUR.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} per Sq Ft</p>`)
	    	.addTo(map);
		} else {
			popup.remove();
		}
	});
});