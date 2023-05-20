import { shallowMount } from "@vue/test-utils";
import store from '~/store/index.js';
import router from '~/routes/index.js';
import loadImage from '~/plugins/loadImage.js'
import Movie from '~/routes/Movie.vue'
import { experiments } from "webpack";

describe("routes/Movie.vue", () => {
  let wrapper 
  beforeEach(async ()=> {
    window.scrollTo = jest.fn()
    router.push('/movie/tt123456')
    await router.isReady()
    wrapper = shallowMount(Movie, {
      global: {
        plugins: [
          store,
          router,
          loadImage
        ]
      }
    })
  })
  
  test("Checking the first URL's param.", () => {
    expect(wrapper.vm.$route.params.id).toBe("tt123456")
  })

  test("Modify URL with the selected Img size.", ()=> {
    const url = 'https://google.com/sample_image_SX300.jpg'
    expect(wrapper.vm.requestDiffSizeImage(url)).toContain('SX700')
    expect(wrapper.vm.requestDiffSizeImage(url, 900)).toContain('SX900')
  })

  test("Return empty string '' if Img url is not normal.", () => {
    expect(wrapper.vm.requestDiffSizeImage()).toBe('')
    expect(wrapper.vm.requestDiffSizeImage('N/A')).toBe('')
  })
})