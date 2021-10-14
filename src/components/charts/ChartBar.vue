<template>
    <div :id="id"></div>
</template>
<script>
	import bus from '../common/bus'
	let echarts = require('echarts/lib/echarts')
	require('echarts/lib/chart/bar')			//柱状图
	//引入提示框和title组件
	require('echarts/lib/component/tooltip')
	require('echarts/lib/component/title')
    export default {
        props:{
			id:{
				type:String,
				default:'',
			},
			xAxisData: {
			    type: Array,
			    default: () => []
			},
			seriesArr: {
			    type: Array,
			    default: () => []
			}
		},
		data(){
			return{
				
			}
		},
		watch:{
			seriesArr:{
				handler(newvalue,oldvalue){
					this.$nextTick(()=>{
						this.drawLine();
					})
				},
				deep:true,
			}
		},
		computed:{
			option(){
				return{
					tooltip: {
						show: true,
						trigger: 'axis',
						axisPointer : {
							type : 'shadow'
						}
					},
					xAxis: {
						data: this.xAxisData,
					},
					yAxis: {},
					series: [{
						name: '销量',
						type: 'bar',
						data: this.seriesArr,
						// 数据更新设置动画时长
						// animationDelayUpdate: idx => idx*100,
						// 初始动画的时长
						// animationDuration: idx => idx*600,
						// 缓慢动画
						// animationEasing: "bounceOut",
					}],
				}
			}
		},
        methods: {
			drawLine(){
				let myChart = echarts.init(document.getElementById(this.id));
				myChart.clear(); //初始化
				myChart.setOption(this.option);
				
				bus.$on('echarts', msg => {
					if (msg === 'resize') {
						myChart.resize()
					}
				})
				// window.onresize = function(){
				// 	let time=setTimeout(()=>{
				// 		myChart.resize();
				// 		clearTimeout(time);
				// 	},200)
				// } 
			}
		},
        mounted() {
			this.$nextTick(()=>{
				this.drawLine();
			})
		}
    }
</script>
<style lang="scss" scoped>
</style>
