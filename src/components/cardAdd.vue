<template>
  <div class="new__block">
    <textarea :class="{error: isError}"
      maxlength='80'
      placeholder='Введите заголовок для этой карточки'
      v-model="title"
      @input="changeTitle">
    </textarea>
  </div>
</template>
<script>
export default {
  name: 'colum',
  props: {
    type: String,
    isError: Boolean,
  },
  data() {
    return {
      title: '',
    };
  },
  destroyed() {
    this.clearCard();
  },
  computed: {
  },
  methods: {
    changeTitle(e) {
      this.$store.commit('setNewCard', { title: this.title, type: this.type });
    },
    clearCard() {
      this.$store.commit('clearNewCard');
    }
  },
};
</script>
<style lang="scss">
$color-bg-new-block: #515051;
$color-new-block-text: #7A7A7C;

.new__block {
  text-align-last: left;
  margin: 8px 0;
  height: 100px;
  background: $color-bg-new-block;
  color: $color-new-block-text
}
textarea {
  width: 234px;
  height: 82px;
  width: -webkit-fill-available;
  height: -webkit-fill-available;
  outline: none;
  -moz-appearance: none;
  background: transparent;
  border: 0;
  padding: 8px;
  resize: none;
  color: $color-new-block-text;
  font-size: 14px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
.error {
  border: 1px red solid;
  animation: animBlinkBorder 1s linear infinite;
}
@keyframes animBlinkBorder {
  0% {
    border-color: red;
  }
  50% {
    border-color: transparent;
  }
  100% {
    border-color: red;
  }
}
</style>
