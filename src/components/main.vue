<template>
<section class=" bg-dark">
  <div class="wrapper">
    <colum-board header="on hold" color="orange" :lists='listOnHold'/>
    <colum-board header="in progress" color="blue" :lists='listInProgress'/>
    <colum-board header="needs review" color="yellow" :lists='listNeedsReview'/>
    <colum-board header="approved" color="green" :lists='listApproved'/>
  </div>
</section>
</template>

<script>
import columBoard from './colum.vue';

export default {
  name: 'MainPage',
  computed: {
    getList() {
      return this.$store.getters.getList;
    },
    listOnHold() { 
      return this.getList.filter(item => item.type === 'on_hold');
    },
    listInProgress() {
      return this.getList.filter(item => item.type === 'in_progress');
    },
    listNeedsReview() {
       return this.getList.filter(item => item.type === 'needs_review');
    },
    listApproved() {
       return this.getList.filter(item => item.type === 'approved');
    },
  },
  components: {
    columBoard,
  },
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
 flex-direction: row;
 flex-wrap: wrap;
 //justify-content: space-around;
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

</style>
