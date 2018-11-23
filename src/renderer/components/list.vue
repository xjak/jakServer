<template>
	<div class="list">
		<div class="query">
			<ul>
				<li>
					<label>name: </label>
					<input type="text" v-model="query.name">
				</li>
				<li>
					<label>type: </label>
					<select v-model="query.type">
						<option value="0">0</option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
					</select>
				</li>
				<li>
					<label>time: </label>
					<input type="date" v-model="query.time">
				</li>
				<li>
					<label>status: </label>
					<input type="text">
				</li>
			</ul>
			<button class="button" type="button" @click="search">查询</button>
		</div>
		<table border="0" cellspacing="0" cellpadding="0" v-show="list[0]">
			<tr>
				<th>name</th>
				<th>msg</th>
				<th>date</th>
				<th>status</th>
				<th>操作</th>
			</tr>
			<tr v-for="i in list">
				<td>{{i.name}}</td>
				<td>{{i.type}}</td>
				<td>{{$api.getTime(i.time)}}</td>
				<td>{{i.status}}</td>
				<td>
					<button class="button2">编辑</button>
					<button class="button">详情</button>
					<button class="button2">删除</button>
				</td>
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
				type: '0',
				msg: '',
				img: '',
				time: ''
			},
			readList: [],
			list: []
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
	.query{
		padding: 20px 0;
		border-top: 1px solid #fefefe;
		ul{
			li{
				width: 300px;
				margin-bottom: 6px;
				label{
					display: inline-block;
					width: 30%;
					text-align: right;
					margin-right: 6px;
				}
				input{
					height: 28px;
					width: 60%;
				}
				select{
					height: 28px;
					width: 80px;
				}
			}
		}
	}
	table{
		text-align: center;
		width: 100%;
		tr{
			th{
				
				font-weight: normal;
				padding: 8px 0;
			}
			th:last-of-type{
				width: 180px
			}
			td{
				padding: 7px 5px;
				button{
					padding: 2px 3px;
					margin: 0 3px;
				}
			}
			&:nth-child(2n) {
				background: rgba(201,241,205,.8);
			}
			&:nth-child(2n-1) {
				background: rgba(233,233,233,.8);
			}
		}
	}
}
</style>