<template>
  <svg
    class="svg-icon"
    :style="{
      width: size + 'px',
      height: size + 'px',
      color: color
    }"
    @mousedown="clickIcon"
  >
    <use :xlink:href="`#icon-${name}`" :fill="color" />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true,
      default: 'email'
    },
    size: {
      type: Number,
      default: 32
    },
    color: {
      type: String,
      default: '#000'
    }
  },
  setup(props) {
    return {
      props
    };
  }
});
</script>
