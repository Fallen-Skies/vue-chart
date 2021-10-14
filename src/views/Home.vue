<template>
	<div class="Home" id="details" ref="print">
		<h1>这里是home页面</h1>
		<!-- <div id="myChart" style="width: 800px;height: 400px;"></div> -->
		<el-radio-group v-model="radio1" @change="chanrge()">
		      <el-radio-button label="shanghai">上海</el-radio-button>
		      <el-radio-button label="beijing">北京</el-radio-button>
		      <el-radio-button label="guangzhou">广州</el-radio-button>
		      <el-radio-button label="shenzhen">深圳</el-radio-button>
		</el-radio-group>
		<el-tabs v-model="activeName" @tab-click="handleClick" ref="prints">
		    <el-tab-pane label="用户管理" name="first">
				<ChartBar :id="'mychart'" style="height: 400px;" :seriesArr="seriesArr" :xAxisData="xAxisData" v-if="activeName === 'first'"/>
			</el-tab-pane>
		    <el-tab-pane label="配置管理" name="second">
				<ChartLine :id="'HomeLine'" style="height: 400px;" :seriesArr="lineArr" :xAxisData="lineData" v-if="activeName === 'second'" ref="line"/>
			</el-tab-pane>
		</el-tabs>
		<button @click="printTest()">打印</button><button @click="handleDownload()">导出</button>
		<!-- <ChartBar :id="'mychart'" style="height: 400px;" :seriesArr="seriesArr" :xAxisData="xAxisData" v-if="activeName === 'first'"/>
		<ChartLine :id="'HomeLine'" style="height: 400px;" :seriesArr="lineArr" :xAxisData="lineData" v-if="activeName === 'second'"/> -->
	</div>
</template>

<script>
	// import bus from '@/components/common/bus';
	import ChartBar from '@/components/charts/ChartBar.vue'
	import ChartLine from '@/components/charts/Chartline.vue'
	export default {
		components: {
			ChartBar,
			ChartLine
		},
		data() {
			return {
				radio1:'shanghai',
				activeName: 'first',
				xAxisData:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
				seriesArr:[150, 230, 224, 218, 135, 147, 260],
				lineData:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
				lineArr:[5, 20, 36, 10, 10, 20],
				tableData: [
					{ id: 1, name: "start", age: 18 },
					{ id: 2, name: "Rory", age: 18 },
					{ id: 3, name: "Rosa", age: 18 },
					{ id: 4, name: "Rosalia", age: 18 },
					{ id: 5, name: "Rosalind", age: 18 },
					{ id: 6, name: "Karin", age: 18 },
					{ id: 7, name: "Kate", age: 18 },
					{ id: 8, name: "Roseanne", age: 18 },
					{ id: 9, name: "Rosemarie", age: 18 },
					{ id: 10, name: "Rosemary", age: 18 },
					{ id: 11, name: "Rosetta", age: 18 },
					{ id: 12, name: "Arden", age: 18 },
					{ id: 13, name: "Arendt", age: 18 },
					{ id: 14, name: "Ares", age: 18 },
					{ id: 15, name: "Penn", age: 18 },
					{ id: 16, name: "Penney", age: 18 },
					{ id: 17, name: "Pennie", age: 18 },
					{ id: 18, name: "Pennington", age: 18 },
					{ id: 19, name: "Bobette", age: 18 },
					{ id: 20, name: "end", age: 18 }
				],
				struct:{
				    name: "米其林餐厅",
				    value: "三星级",
				    list: [{
				        name: "Soupe",
				        value: "20种"
				    },{
				        name: "entree",
				        value: "100种"
				    },{
				        name: "Dessert",
				        value: "30种"
				    }]
				}
			}
		},
		created() {
			console.log(typeof this.struct)
		},
		methods:{
			printTest(){
				this.$store.dispatch('SET_ID','#details');
				this.$nextTick(()=>{
					// this.$store.commit('setadapt',true);
					this.$print(this.$refs.print);
				})
			},
			formatJson(filterVal, jsonData) {
				return jsonData.map(v => filterVal.map(j => {
				   return v[j]
				}))
			},
			handleDownload(){
				import('../vendor/Export2Excel').then(excel => {
					var tHeader = ['id', 'name', 'age']//头
					var filterVal = ['id', 'name', 'age']//值
					var data = this.formatJson(filterVal, this.tableData);
					var filename ='table';
					excel.export_json_to_excel(tHeader,data,filename)
			   })
			},
			handleClick(tab, event) {
				console.log(tab, event);
			},
			getData(){
				if (this.radio1 === 'shanghai') {
					this.seriesArr=[150, 230, 224, 218, 135, 147, 260];
					this.lineArr=[5, 20, 36, 10, 10, 20];
					console.log("上海");
					// this.$set(this.seriesArr);
				} else if(this.radio1 === 'beijing'){
					this.seriesArr=[820, 932, 901, 934, 1290, 1330, 1320];
					this.lineArr=[320, 332, 301, 334, 390, 330];
					console.log("北京");
					// this.$set(this.seriesArr);
				} else if(this.radio1 === 'shenzhen'){
					this.seriesArr=[120, 132, 101, 134, 90, 230, 210];
					this.lineArr=[150, 232, 201, 154, 190, 330];
					console.log("深圳");
					// this.$set(this.seriesArr);
				} else if(this.radio1 === 'guangzhou'){
					this.seriesArr=[150, 232, 201, 154, 190, 330, 410];
					this.lineArr=[120, 132, 101, 134, 90, 230];
					console.log("广州");
					// this.$set(this.seriesArr);
				}
			},
			chanrge(){
				this.getData();
			},
		},
		mounted() {
			
		}
	};
</script>
<style lang="scss">
	img{
		width: 100%;
		object-fit: cover;
	}
	.Home{
		width: 100%;
		margin: auto;
		height: 500px;
		.echarts{
			width: 100%;
			height: 100%;
		}
		// .el-radio-group{
		//     height: 30px;
		// 	position: relative;
		// 	top: 0px;
		//     white-space: nowrap;
		//     .el-radio-button{
		//         height: 30px;
		//     }
		//     .el-radio-button__inner{
		//         height: 30px;
		//         padding: 8px 15px;
		//     }
		// }
		.el-radio-button__orig-radio:checked+.el-radio-button__inner {
			color: red;
			background-color: #dde2ec;
			border-color: #dde2ec;
			box-shadow: -1px 0 0 0 #dde2ec;
		}
	}
</style>