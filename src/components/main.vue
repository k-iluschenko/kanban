<template>
<section class=" bg-dark">
  <div class="wrapper">
     <colum-board header="on hold" color="orange" />
    <colum-board header="in progress" color="blue" />
    <colum-board header="needs review" color="yellow" />
    <colum-board header="approved" color="green" />
  </div>
</section>
</template>

<script>
import columBoard from './colum.vue';

export default {
  name: 'MainPage',
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
  height: 100%;
}
.wrapper {
 padding-top: 20px;
 display: flex;
 flex-direction: row;
 flex-wrap: wrap;
 justify-content: space-around;
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
