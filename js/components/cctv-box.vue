<template>
    <div class="main-menu">
        <div class="cctv-header" v-on:click="backToMenu">
            <div class="btn-back">
                <img src="img/left-arrow.svg" alt="">
            </div>
            <h1 class="cctv-place">{{ this.showingLocation.name }}</h1>
        </div>
        <div class="cctv">
            <img :src="streamImage" alt="">
        </div>
    </div>
</template>

<script>
module.exports = {
    props: ['showingLocation', 'streamImage'],

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