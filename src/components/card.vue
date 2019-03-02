<template>
  <div class="block"
  draggable="true"
  @dragstart="dragstart(list.id, $event)"
  @dragend="dragend">
    <div class="wrap__close"><div class="button__close" @click='closeTask'></div></div>
    <div class="block__title"><span class="id">id: </span>{{list.id}}</div>
    <div class="block__content">{{list.title}}</div>
  </div>
</template>
<script>

export default {
  name: 'colum',
  props: {
    list: Object,
    dragstart: Function,
    dragend: Function,
  },
  methods: {
    closeTask(e) {
      this.$store.dispatch('deleteCard', this.list);
    },
  },
};
</script>
<style lang="scss">
$color-id-text: #F5F7F8;
$color-bg-block: #1F1F23;
$color-block-text: #8C8E90;
$color-button-text: #82838A;
.id{
  color: $color-id-text;
  font-weight: 700;
}
.block {
  text-align: left;
  margin: 8px 0;
  height: 100px;
  padding-left: 8px;
  background: $color-bg-block;
  color: $color-block-text
}
.block__title{
  padding: 8px 0 16px;
}
.wrap__close {
  display: flex;
  justify-content: flex-end;
  padding: 8px 8px 0;
}
.button__close {
  cursor: pointer;
  width: 8px;
  height: 8px;
  background-color: $color-button-text;
  -webkit-mask: url('../assets/img/baseline-clear-24px.svg') no-repeat center;
  mask: url('../assets/img/baseline-clear-24px.svg') no-repeat center;
  }
</style>
