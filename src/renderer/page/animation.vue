<template>
<div class="animation">
	<div class="search">
		<input type="text">
		<button type="button">搜索</button>
	</div>
	<addData></addData>
	<div>
		<div>name: <input type="text"></div>
		<div>type: <input type="text"></div>
		<button type="button" @click="search">查询</button>
	</div>
	<div class="list">
		<table border="0" cellspacing="0" cellpadding="0">
			<tr>
				<th>name</th>
				<th>ll</th>
				<th>45</th>
			</tr>
			<tr v-for="i in list">
				<td>{{i.name}}-4555</td>
				<td>{{i.name}}-4555</td>
				<td>{{i.name}}-4555</td>
			</tr>
		</table>
	</div>
</div>
</template>

<script>
import addData from '../components/addData'
export default{
	components: {
		addData
	},
	data () {
		return {
			d: {
				name: '',
				type: ''
			},
			list: [],
			readList: []
		}
	},
	created () {
		this.$fs.readFile(this.$path + 'list/list.json', (e, d) => {
			if (!e) {
				if (d) {
					this.readList = JSON.parse(d)
				}
			}
		})
	},
	methods: {
		search () {
			this.readList.forEach(d => {
				console.log(d)
			})
			this.list = this.readList
		},
		guess () {
			this.$axios.post('')
			.then(d => {
				console.log(d.data)
			})
		}
	},
	mounted () {}
}
</script>

<style lang="scss">
.animation{
	background: #eee;
	.search{
		padding: 20px 30px;
		input{
			height: 30px;
			padding-left: 5px;
		}
		button{
			height: 30px;
			width: 60px;
			border: none;
			background: #ccc;
			color: #fff;
			outline: none
		}
	}
	.list{
		padding: 30px;
		table{
			border-collapse: collapse;
			text-align: center;
			// border: 1px solid #ccc;
			tr{
				th{
					width: 120px;
				}
				td{
					// border-right: none;
					padding-left: 10px;
				}
				&:nth-child(2n) {
					background: #ccc;
				}
			}
		}
	}
}	
</style>