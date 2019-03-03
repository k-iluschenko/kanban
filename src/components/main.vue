<template>
  <section class=" bg-dark">
    <div class="wrapper">
      <colum-board
        header="on hold"
        color="orange"
        :lists='listOnHold'
        type="onHold"
      />
      <colum-board
        header="in progress"
        color="blue"
        :lists='listInProgress'
        type="inProgress"
      />
      <colum-board
        header="needs Review"
        color="yellow"
        :lists='listNeedsReview'
        type="needsReview"/>
      <colum-board
        header="approved"
        color="green"
        :lists='listApproved'
        type="approved"
      />
    </div>
  </section>
</template>
<script>
import columBoard from './colum.vue';

export default {
  name: 'MainPage',
  computed: {
    listOnHold() {
      return this.$store.getters.getListOnHold;
    },
    listInProgress() {
      return this.$store.getters.getListInProgress;
    },
    listNeedsReview() {
      return this.$store.getters.getListNeedsReview;
    },
    listApproved() {
      return this.$store.getters.getListApproved;
    },
  },
  components: { columBoard },
};
</script>
<style lang="scss">
$color-bg: #383A42;
$color-header-orange: #F88B4A;
$color-header-green: #4BA468;
$color-header-blue: #3C8BBE;
$color-header-yellow: #F5C852;
$color-header-text: #ECE6E6;

.bg-dark {
  background: $color-bg;
  min-height: 100%;
}
.wrapper {
  padding-top: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}
.orange {
  background: $color-header-orange
}
.green {
  background: $color-header-green
}
.blue {
  background: $color-header-blue
}
.yellow {
  background: $color-header-yellow
}
.colum__header {
  text-transform: uppercase;
  text-align: left;
  padding: 10px 10px;
  color: $color-header-text;
}

@media (max-width: 1080px) {
  .wrapper{
    justify-content: center;
    &::after{
      content: '';
      width: 100%;
      order: 0;
    }
  }
}
</style>
