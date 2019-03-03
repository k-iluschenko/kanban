<template>
  <div class="new__block">
    <textarea :class="{error: error}"
      maxlength='80'
      placeholder='Введите заголовок для этой карточки'
      v-model="title"
      @keyup.esc="show"
      ref="contentTextArea"
      @keyup.exact="changeTitle"
      @keypress="addCard">
    </textarea>
  </div>
</template>
<script>
export default {
  name: 'colum',
  props: {
    type: String,
    isError: Boolean,
    show: Function,
    addCard: Function,
  },
  data() {
    return {
      title: null,
      error: this.isError,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.contentTextArea.focus();
    });
  },
  destroyed() {
    this.clearCard();
  },
  watch: {
    isError() {
      this.error = this.isError;
    },
    title() {
      const deleteEnter = this.title.replace(/\r?\n/g, '');
      if (!deleteEnter.length) {
        this.title = '';
      }
      this.title = deleteEnter;
    },
  },
  methods: {
    changeTitle() {
      if (this.title !== '') {
        this.$store.commit('setNewCard', { title: this.title });
      } else {
        this.clearCard();
      }
    },
    clearCard() {
      this.$store.commit('clearNewCard');
    },
  },
};
</script>
<style lang="scss">
$color-bg-new-block: #515051;
$color-new-block-text: #FFF;

.new__block {
  text-align-last: left;
  margin: 0 0 8px;
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
  border: 1px transparent solid;
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
