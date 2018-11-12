<template>
	<div class="list">
		<div>
			<div>
			<div>name: <input type="text" v-model="query.name"></div>
			<div>type: <input type="text" v-model="query.type"></div>
			<div>type: <input type="date" v-model="query.time"></div>
			<button type="button" @click="search">查询</button>
		</div>
		</div>
		<table border="0" cellspacing="0" cellpadding="0">
			<tr>
				<th>name</th>
				<th>msg</th>
				<th>date</th>
				<th>status</th>
				<th>operation</th>
			</tr>
			<tr v-for="i in list">
				<td>{{i.name}}</td>
				<td>{{i.type}}</td>
				<td>{{$api.getTime(i.time)}}</td>
				<td>{{i.status}}</td>
				<td><button>btn</button></td>
			</tr>
		</table>
	</div>
</template>

<script>
export default {
	data () {
		return {
			query: {
				name: '',
				type: '',
				msg: '',
				img: '',
				time: ''
			},
			readList: []
		}
	},
	props: {},
	created () {
		this.$fs.readdir(this.$path + 'list', (e, d) => {
			if (d) {
				let list = []
				d.forEach(s => {
					this.$fs.readFile(this.$path + 'list/' + s, 'utf-8', (e, d) => {
						list.push(JSON.parse(d))
					})
				})
				this.readList = list
			}
		})
	},
	methods: {
		search () {
			let arr = []
			if (this.query.name) {
				this.readList.forEach(d => {
					if (d.name.indexOf(this.query.name) !== -1) {
						arr.push(d)
					}
				})
			} else {
				arr = this.readList
			}
			if (this.query.time) {
				arr = arr.filter((d) => {
					return this.$api.getTime(d.time) === this.query.time
				})
			}
			this.list = arr
		}
	}
}
</script>

<style lang="scss">
.list{
	padding: 30px;
	.search{
		padding: 20px 30px;
		position: relative;
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
</style>