import { shallowMount } from "@vue/test-utils";
import Search from '~/components/Search.vue';

describe("components/Search.vue", () => {
  let wrapper

  beforeEach(()=>{
    wrapper = shallowMount(Search)
  })

  test("The number of years selectable is matched.", () => {
    const year = wrapper.vm.filters.find((filter)=> { // find(): In Array, finds specific Object data.
      return filter.name === 'year'
    })
    const yearLength = new Date().getFullYear() - 1985 + 1
    expect(year.items.length).toBe(yearLength)
  })
})