<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
	import bus from '@/components/common/bus';
	export default{
		mounted(){
			//开始动画调整页面
			window.onresize = function() {
				let time = setTimeout(() => {
					bus.$emit('echarts','resize');
					clearTimeout(time);
				}, 200)
			};
			
		},
	}
</script>
<style lang="scss">
#app {
	
}
.echarts{
	width: 100%;
	height: 100%;
}
</style>
