<template>
  <h1 @click="changeMsg">{{msg}}</h1>
  <h1>{{reversedMsg}}</h1>
</template>

<script>
export default {
  data() {
    return {
      // Getter, Setter
      msg: 'hello!'
    }
  },
  computed: {
    // 메소드로 사용하면 갱신을 못 함.
    // Getter, Readonly
    // reversedMsg() {
    //   return this.msg.split('').reverse().join('')
    // }

    // Attribute(속성)처럼 쓰면, 갱신 가능하다.
    // Gettet, Setter
    reversedMsg: {
      get() {
        return this.msg.split('').reverse().join('')
      },
      // 어떤 행위를 하면 행위가 이루어져 변화가 생긴 값을
      // this.msg에 넣음.
      // (Button을 누르면, newMsg에 '!'가 추가된 'msg!'가 들어가고,)
      // (그 값이 msg에 할당됨.)
      set(newMsg) {
        this.msg = newMsg
      }
    },
  },
  watch: {
    msg() {
      console.log('msg:', this.msg)
    },
    reversedMsg() {
      console.log('reversedMsg:', this.reversedMsg)
    }
  },
  methods: {
    changeMsg() {
      this.msg = 'ChangedMsg!'
    },
  }
}
</script>