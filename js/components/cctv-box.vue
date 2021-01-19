<template>
    <div class="main-menu">
        <div class="cctv-header" v-on:click="backToMenu">
            <div class="btn-back">
                <img src="img/left-arrow.svg" alt="">
            </div>
            <h1 class="cctv-place">{{ this.showingLocation.name }}</h1>
        </div>
        <div class="cctv">
            <img v-show="isStream" :src="streamImage" alt="">
            <p class="cctv-wait" v-show="!isStream">fetching image..</p>
        </div>
    </div>
</template>

<script>
module.exports = {
    props: ['showingLocation', 'streamImage', 'isStream'],

    data: function(){
        return {
            
        }  
    },

    methods: {
        backToMenu()
        {
            this.$emit('back-to-menu')
        }
    },

    mounted() {

    }
}
</script>