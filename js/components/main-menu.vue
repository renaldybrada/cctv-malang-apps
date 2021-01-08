<template>
    <div class="main-menu">
        <h1 class="title">CCTV Kota Malang</h1>
        <div class="menu__search">
            <p class="search__text">Cari berdasarkan lokasi/nama jalan</p>
            <div class="search-container">
                <input type="text" class="search__box" v-model="searchLocation" @change="filterLocation">
                <img class="search__icon" src="img/magnifying-glass.svg" alt="" v-on:click="filterLocation">
            </div>
        </div>
        <div class="locations">
            <ul class="locations__list">
                <li class="locations__point" 
                    v-for="location in locations" 
                    v-bind:key="location.id"
                    v-on:click="clickLocation(location)">
                    {{ location.name }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
module.exports = {
    props: ['locations'],

    data: function(){
        return {
            searchLocation: ""
        }  
    },

    methods: {
        filterLocation()
        {
            this.$emit('filter-location', this.searchLocation)
        },

        clickLocation(location)
        {
            this.$emit('select-location', location)
        }
    },

    mounted() {

    }
}
</script>