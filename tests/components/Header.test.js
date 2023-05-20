import {shallowMount} from "@vue/test-utils";
import router from '~/routes/index.js'
import store from '~/store/index.js';
import Header from '~/components/Header.vue'
import { stubFalse, wrap } from "lodash";


describe('components/Header.vue', () => {
  let wrapper 
  beforeEach(async ()=>{
    window.scrollTo = jest.fn() // Mock function for scrollTo
    router.push('/movie/tt1234567')
    await router.isReady()
    wrapper = shallowMount(Header, {
      global: {
        plugins: [
          router,
          store
        ]
      }
    })
  })

  test("Doesn't match with path RegExp if there's no Path RegExp.", ()=>{
    const regExp = undefined
    expect(wrapper.vm.isMatch(regExp)).toBe(false)
  })

  test("Match with path RegExp.", () => {
    const regExp = /^\/movie/
    expect(wrapper.vm.isMatch(regExp)).toBe(true)
  })
  test("Doesn't match with path RegExp.", () => {
    const regExp = /^\/hero/
    expect(wrapper.vm.isMatch(regExp)).toBe(false)
  })
})