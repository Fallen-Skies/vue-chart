<template>
	<div class="Test">
		<div style="padding: 10px;">
			<el-button type="primary" @click="handleDown">PDF下载-表格</el-button>
			<el-button type="primary" @click="handleWindowPrint( '#box', '表格' )">浏览器方式下载</el-button>
		</div>
		<div class="box" id="box">
			<div v-for="(item,index) in 6" :key='index'>
				<span>第一行</span>
				<span>第二行</span>
				<span>第三行</span>
				<span>第四行</span>
				<span>第五行</span>
			</div>
		</div>
	</div>
</template>

<script>
	import htmlToPdf from '@/components/js/htmlToPdf'
	export default {
		name: 'PdfDemo',
		data() {
			return {
				
			}
		},
		methods: {
			handleWindowPrint(ele, fileName) {
				// 去除页面不必要的 head 标签内  内容， 避免影响打印页 ， title 为保存为 pdf 的文件时的 文件名
				document.head.innerHTML = '<meta charset="utf-8">\n' +
					' <title> ' + fileName + '</title>\n' +
					' <meta name="format-detection" content="telephone=no">\n' +
					' <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">\n' +
					' <meta name="viewport" content="width=device-width,initial-scale=1.0">\n' +
					' <link rel="stylesheet" href="./static/css/contract.css"/>' // 生成pdf的外部css样式
				document.body.innerHTML = document.querySelector(ele).outerHTML

				// 转异步 等待dom元素渲染（样式）完毕在打印
				setTimeout(() => {
					// 打印
					window.print()
					// 刷新页面
					window.location.reload()
				}, 20)
			},
			handleDown() {
				htmlToPdf.downloadPDF(document.querySelector('#box'), '表格')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.Test {
		height: 100%;
		width: 100%;
		.box {
			width: 50%;
			padding: 50px 0;
			min-width: 600px;
			// background: lightblue;
			margin: auto;
			position: relative;
			>div{
				width: 100%;
				>span{
					display: inline-block;
					text-align: center;
					padding: 10px 0;
					width: 20%;
					color: #111111;
				}
			}
		}
	}
</style>
