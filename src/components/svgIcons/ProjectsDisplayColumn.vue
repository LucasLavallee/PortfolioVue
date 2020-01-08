<template>
    <svg id="svgProjectsColumn" :class="getActiveProjectDisplay === 0 ? 'active' : ''" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 214">
        <title>Column</title>
        <rect class="squareSvg" x="2" y="2" width="60" height="60" rx="12" ry="12"/>
        <rect class="squareSvg" x="2" y="77" width="60" height="60" rx="12" ry="12"/>
        <rect class="squareSvg" x="2" y="152" width="60" height="60" rx="12" ry="12"/>
    </svg>
</template>

<script>
    import { TimelineMax } from 'gsap'
    import {mapActions, mapGetters} from 'vuex'
    import store from '@/store/index.js'

    export default {
        name: 'projectDisplayColumn',
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
    #svgProjectsColumn 
        height 40px
        width auto

        .squareSvg
            transition all ease .2s
            fill #a7a8ba

        &.active, &:hover
            .squareSvg
                fill #383d49

</style>