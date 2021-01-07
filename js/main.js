const vm = new Vue({
    el: '#app',
    components: {
        'main-menu': window.httpVueLoader('./js/components/main-menu.vue'),
        'cctv-box': window.httpVueLoader('./js/components/cctv-box.vue')
    },

    data: function() {
        return {
            map: null,
            locations: [],
            searchedLocation: [],
            activeCam: false,
            showingLocation: {},
            streamUrl: "",
            streamInterval: null,
            streamCctvImageUrl: ""
        }
    },

    methods: {
        initiateMap() {
            this.map = L.map('mapid').setView([-7.9797, 112.6304], 13.5);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
            }).addTo(this.map);

            L.control.scale().addTo(this.map);
        },

        async initateDataAndDraw() {
            const url = 'http://api.cctv.malangkota.go.id/records/cameras?filter=address%2Cnis&filter=latitude%2Cnis&filter=longitude%2Cnis&filter=stream_id%2Cnis&filter=status%2Ceq%2C1';
            
            let request = await fetch(url);
            if (!request.ok) {
                throw new Error(`HTTP error! status: ${request.status}`);
            } else {
                let response = await request.json();
                this.locations = response.records;
        
                this.locations.forEach(point => {
                    point.search_term = point.name + " " + point.address;

                    L.marker(
                    {
                        lon: point.longitude, 
                        lat: point.latitude
                    })
                    .bindPopup(point.name).addTo(this.map).on('click', this.showCctv);
                });

                this.searchedLocation = this.locations.slice(0,10);
            }    
        },

        filterLocation(searchTerm) {
            this.searchedLocation = this.locations.filter(
                item => item.search_term.toLowerCase().includes(searchTerm.toLowerCase())
            ).slice(0,10);
        },

        zoomLocation(location)
        {
            this.backToMenu();
            this.map.setView([location.latitude, location.longitude], 18);
        },

        backToMenu()
        {
            this.stopStream();
            this.activeCam = false;
        },

        showCctv(event)
        {        
            this.stopStream();

            let location = this.locations.filter(
                item => item.longitude == event.latlng.lng && item.latitude == event.latlng.lat
            )
            this.showingLocation = location[0];
            
            this.streamUrl = 'http://proxy.cctv.malangkota.go.id/image?host=' + this.showingLocation.host + '&t=';
            
            this.activeCam = true;

            this.startStream();
        },

        startStream()
        {
            this.streamInterval = setInterval(() => {
                let unixTimestamp = Math.round(Date.now()/1000)
                this.streamCctvImageUrl = this.streamUrl + unixTimestamp
                unixTimestamp = Math.round(Date.now()/1000)
            }, 1000);
        },

        stopStream()
        {
            clearInterval(this.streamInterval);
        }
    },

    mounted() {
        this.initiateMap();
        this.initateDataAndDraw();
    }
})