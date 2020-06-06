<template>
    <div class="experience">
        <div class="leftExp">
            <p>{{this.experience.date}}</p>
            <h3>{{this.experience.poste}}</h3>
        </div>
        <p class="descrExp">{{this.experience.descr}}</p>  
    </div>
</template>

<script>
export default {
    'name': 'experience',
    props: ['experience']
}
</script>

<style lang="stylus">
    .experience
        text-align left 
        display grid
        grid-template-columns 35% 65%
        grid-column-gap 50px
        margin-top 50px
        opacity 0
        transform translateX(-50px)

        @media screen and (max-width: 600px)
            display block
    
    .descrExp
        color #5e5e5e
</style>