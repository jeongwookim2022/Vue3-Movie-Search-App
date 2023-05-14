<template>
<!-- 속성상속 구현함. -->
<!-- v-bind="$attrs": 컴포넌트가 실행되고 있는 곳의 모든 속성이 상속됨. -->
  <div
    v-bind="$attrs"
    class="btn"
    @click="hello">
    <slot></slot>
  </div>
</template>


<script>
// 주석: 설명 및 Composition API로 대체한 부분
import {onMounted} from 'vue'

export default {
  inheritAttrs: false,
  // 부모(App.vue)의 데이터를 자식(MyBtn.vue)로 갖고 올 수 있음.
  props: {
    color: {
      type: String,
      default: 'gray'
    }
  },
  emits: ['hello'], // event 연결(App.vue의 hello (@hello="log"),
        //             (후에 methods에서 hello를 구현 하여 사용 )
        //          즉! 자식인 MyBtn의 데이터(메소드 등)를 부모인 App.vue에 전송.     
  
  
  // mounted() {
  //   console.log(this.color)
  //   console.log(this.$attrs) // 부모로부터 상속받은 모든 속성을 출력해봄.
  // },


  // methods: {
  //   hello() {
  //     this.$emit('hello')
  //   },


  // MyBtn이란 component를 Composition API로 바꿔봄.
  // - setup() 메소드 에선 this 사용 불가하므로. props를 사용한 것.
  // - context는 '$' 표시 못 쓰는 것들의 데이터($attrs객체 데이터 등)를 사용가능하게 함.
  setup(props, context) {
    function hello () {
      context.emit('hello')
    }
    onMounted(() => {
      console.log(props.color)
      console.log(context.attrs)
    })

    return {
      hello
    }
  }
}
</script>