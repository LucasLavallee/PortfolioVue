<template>
  <div id="contact" class="componentContainer">
    <div id="formErrorList" ref="errorList">

    </div>
    <div id="contactForm">
      <div class="inputForm" :class="inputFilled.name.length > 0 ? 'active' : ''">
        <input type="text" class="inputValue" @keyup="updateInputValue('name')" ref="inputName">
        <p class="inputName">Your name</p>
        <div class="bgInput"></div>
      </div>
      <div class="inputForm" :class="inputFilled.mail.length > 0 ? 'active' : ''">
        <input type="mail" class="inputValue" @keyup="updateInputValue('mail')" ref="inputMail">
        <p class="inputName">Your mail</p>
        <div class="bgInput"></div>
      </div>
      <div class="inputForm" :class="inputFilled.subject.length > 0 ? 'active' : ''">
        <input type="text" class="inputValue" @keyup="updateInputValue('subject')" ref="inputSubject">
        <p class="inputName">Message subject</p>
        <div class="bgInput"></div>
      </div>
      <textarea placeholder="Add some words ..." ref="inputMessage" @keyup="updateInputValue('message')" ></textarea>
      <div id="sendMessage" class="pointer" @click="checkBeforeSend">
        <p>Send message</p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import { TimelineMax } from 'gsap'

export default {
  name: 'contact',
  components: {
  },
  data: () => {
    return {
      inputFilled: {
        name: "",
        mail: "",
        subject: "",
        message: ""
      },
      tl: null
    }
  },
  methods: {
    updateInputValue(input) {
      const newVal = this.$refs['input'+input.charAt(0).toUpperCase() + input.substring(1)].value
      this.inputFilled[input] = newVal
    },
    checkBeforeSend() {
      let errorFound = false
      let div = this.$refs.errorList
      div.innerHTML = ""

      //Verification on fields before sending message
      for(let field of Object.keys(this.inputFilled)) {
        let fieldName = field.charAt(0).toUpperCase() + field.substring(1)
        this.$refs['input'+fieldName].style.borderColor = '#000'
        if(this.inputFilled[field] === "") {
          errorFound = true

          div.innerHTML += "<p class='errorTile'>Field "+fieldName+" is empty ! :(</p>"
        }
      }

      if(!errorFound) {
        this.sendMessage()
        return
      }

      this.tl = new TimelineMax({
      })

      this.tl.to(".errorTile", {
          x: 0,
          opacity: 1,
          duration: 0.2,
          stagger: 0.1
      }, 0)
    },
    sendMessage() {
      
    },
    ...mapActions([
      'changeComponentLoaded'
    ])
  },
  mounted(){
    this.changeComponentLoaded(true)
  }
}
</script>

<style lang="stylus">
  #contact  
    width 100%
    height 100%

  #contactForm
    display flex
    flex-direction column
    width 40%
    position absolute
    top 50%
    left 50%
    transform translate3d(-50%,-50%,0)
    box-shadow 0px 0px 38px -3px rgba(209,209,209,0.57)
    padding 30px

    input, textarea
      padding 15px
      box-sizing border-box

    input
      line-height 0px
      background-color transparent
      width 100%
      border none

      &:focus
        + .inputName
          bottom 70%
    
    textarea
      border 3px solid #000
      height 150px
      margin-top 25px
      font-family inherit

    @media screen and (max-width: 900px)
      width 70%

  .inputForm
    width 100%
    position relative
    margin 10px 0
    padding-top 25px

    &.active
      .inputName
        bottom 70%

  .bgInput
    border 3px solid #000
    border-top none
    height 15px
    position absolute
    width 100%
    bottom 0
    box-sizing border-box

  .inputName
    text-align left 
    padding-left 15px
    position absolute
    bottom 10px
    margin 0px
    transition all ease .2s
    z-index -1

  #sendMessage
    background #000
    color #fff

  #formErrorList
    position fixed
    right 0%
    top 50%
    transform translate3d(0,-50%,0)
    text-align right
    z-index 1

    .errorTile 
      border-left 4px solid red
      padding 10px
      background-color #edf2fa
      transform translateX(100%)

</style>
