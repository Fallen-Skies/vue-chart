<template>
    <div :id="id"></div>
</template>
<script>
	import bus from '../common/bus'
	// let echarts = require('echarts/lib/echarts')
	// require('echarts/lib/chart/bar')			//柱状图
	// //引入提示框和title组件
	// require('echarts/lib/component/tooltip')
	// require('echarts/lib/component/title')
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
					series: [
					{
						z: 1,
						name: '销量',
						type: 'bar',
						data: this.seriesArr,
						barWidth:30,
						barGap: "0%",
						itemStyle: {
							normal: {
								color: "#50bfda",
							},
						},
						// 数据更新设置动画时长
						// animationDelayUpdate: idx => idx*100,
						// 初始动画的时长
						// animationDuration: idx => idx*600,
						// 缓慢动画
						// animationEasing: "bounceOut",
					},	
					{
						z: 2,
						name: '销量',
						type: 'pictorialBar',
						symbol: "diamond",
						symbolOffset: ["0%", "50%"],
						symbolSize: [30, 10],
						data: this.seriesArr,
						itemStyle: {
							normal: {
								color: "#50bfda",
							},
						},
						tooltip: {
							show: false,
						},
					},
					{
						z: 3,
						name: '数据',
						type: "pictorialBar",
						symbolPosition: "end",
						data: this.seriesArr,
						symbol: "diamond",
						symbolOffset: ["0%", "-50%"],
						symbolSize: [30 - 4, (10 * (30 - 4)) / 30],
						itemStyle: {
							normal: {
							borderColor: "#89e3ec",
							borderWidth: 2,
							color: "#89e3ec",
							},
						},
						tooltip: {
							show: false,
						},
					},
					],
				}
			}
		},
        methods: {
			drawLine(){
				let myChart = this.$echarts.init(document.getElementById(this.id));
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
