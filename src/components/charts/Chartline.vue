<template>
    <div :id="id"></div>
</template>
<script>
	import bus from '../common/bus'
	let echarts = require('echarts/lib/echarts')
	require('echarts/lib/chart/line')			//柱状图
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
						data: this.xAxisData
					},
					yAxis: {},
					series: [{
						name: '销量',
						type: 'line',
						data: this.seriesArr,
					}],
				}
			},
			adapt(){
				return this.$store.state.adapt;
			}
		},
		watch:{
			seriesArr:{
				handler(news,olds){
					this.$nextTick(()=>{
						this.drawLine();
					})
				},
				deep:true,
			},
		},
        methods: {
			drawLine(){
				let myChart = echarts.init(document.getElementById(this.id))
				myChart.clear(); //初始化
				// 绘制图表
				myChart.setOption(this.option);
				bus.$on('echarts', msg => {
					if (msg === 'resize') {
						myChart.resize()
					}
				})
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
