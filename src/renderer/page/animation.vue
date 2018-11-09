<template>
<div class="animation">
	<div class="search">
		<input type="text" @input="searchChange" v-model="searchText">
		<button type="button">搜索</button>
		<ul>
			<li v-for="x in searchList">{{x}}</li>
		</ul>
	</div>
	<addData></addData>
	<div>
		<div>name: <input type="text" v-model="query.name"></div>
		<div>type: <input type="text" v-model="query.type"></div>
		<div>type: <input type="date" v-model="query.time"></div>
		<button type="button" @click="search">查询</button>
	</div>
	<div class="list">
		<table border="0" cellspacing="0" cellpadding="0">
			<tr>
				<th>name</th>
				<th>ll</th>
				<th>date</th>
				<th>status</th>
			</tr>
			<tr v-for="i in list">
				<td>{{i.name}}</td>
				<td>{{i.type}}</td>
				<td>{{$api.getTime(i.time)}}</td>
				<td>{{i.status}}</td>
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
			searchText: '',
			query: {
				name: '',
				type: '',
				msg: '',
				img: '',
				time: ''
			},
			list: [],
			readList: [],
			searchList: []
		}
	},
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
		},
		guess () {
			this.$axios.post('')
			.then(d => {
				console.log(d.data)
			})
		},
		searchChange () {
			this.$axios.get('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb=show&wd=' + this.searchText)
			.then(d => {
				this.searchList = d.data.split('s:[')[1].replace(']});', '').split(',').map(a => {
					return a.replace(/"/g, '')
				})
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