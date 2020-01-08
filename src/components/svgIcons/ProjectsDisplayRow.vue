<template>
    <svg id="svgProjectsRow" :class="getActiveProjectDisplay === 1 ? 'active' : ''" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 214 64">
        <title>Row</title>
                
        <rect class="squareSvg" x="22" y="97" width="60" height="60" rx="12" ry="12" transform="translate(-95 84) rotate(-90)"/>
        <rect class="squareSvg" x="97" y="97" width="60" height="60" rx="12" ry="12" transform="translate(-20 159) rotate(-90)"/>
        <rect class="squareSvg" x="172" y="97" width="60" height="60" rx="12" ry="12" transform="translate(55 234) rotate(-90)"/>
    </svg>
</template>

<script>
    import { TimelineMax } from 'gsap'
    import {mapActions, mapGetters} from 'vuex'
    import store from '@/store/index.js'

    export default {
        name: 'projectDisplayRow',
        data() {
            return {
                tl: null,
                activeProjectDisplay: null
            }
        },
        computed: {
            ...mapGetters([
            'getActiveProjectDisplay'
            ])
        },
        mounted: function () {
            this.activeProjectDisplay = this.getActiveProjectDisplay
        },
        methods: {
        }
    }
</script>

<style lang="stylus">
    #svgProjectsRow 
        width 40px
        height auto

        .squareSvg
            transition all ease .2s
            fill #a7a8ba

        &.active, &:hover
            .squareSvg
                fill #383d49
    
</style>