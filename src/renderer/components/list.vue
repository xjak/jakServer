<template>
	<div class="list">
		<div class="query">
			<ul>
				<li>
					<label>名字: </label>
					<input type="text" v-model="query.name">
				</li>
				<li>
					<label>描述: </label>
					<input type="text" v-model="query.msg">
				</li>
				<li>
					<label>入库日期: </label>
					<input type="date" v-model="query.time">
				</li>
				<li>
					<label>发布日期: </label>
					<input type="date" v-model="query.time">
				</li>
				<li>
					<label>Like: </label>
					<input type="checkbox" v-model="query.like">
				</li>
				<li>
					<label>产地: </label>
					<select v-model="query.region">
						<option value="">全部</option>
						<option value="国产">国产</option>
						<option value="日本">日本</option>
						<option value="美国">美国</option>
						<option value="韩国">韩国</option>
					</select>
				</li>
				<li>
					<label>类型: </label>
					<select v-model="query.type">
						<option value="">全部</option>
						<option value="0">动画</option>
						<option value="1">电影</option>
						<option value="2">电视剧</option>
					</select>
				</li>
				<li>
					<label>观状态: </label>
					<select v-model="query.status">
						<option value="">全部</option>
						<option value="0">未看</option>
						<option value="1">已看</option>
					</select>
				</li>
			</ul>
			<button class="button" type="button" @click="search">查询</button>
		</div>
		<table border="0" cellspacing="0" cellpadding="0" v-show="!list[0]">
			<tr>
				<th>img</th>
				<th>name</th>
				<th>msg</th>
				<th>type</th>
				<th>label</th>
				<th>date</th>
				<th>status</th>
				<th>操作</th>
			</tr>
			<tr v-for="(i,index) in list">
				<td><img :src="i.img"></td>
				<td>{{i.name}}</td>
				<td>{{i.msg}}</td>
				<td>{{i.type}}</td>
				<td>{{i.label}}</td>
				<td>{{$api.getTime(i.time)}}</td>
				<td>{{i.status}}</td>
				<td>
					<button class="button2">编辑</button>
					<button class="button" @click="showDetails(index)">详情</button>
					<button class="button2">删除</button>
				</td>
			</tr>
		</table>
		<ul class="lists" v-show="list.length">
			<li class="clearfix">
				<div class="left">IMG</div>
				<div class="left">Like</div>
				<div class="left">名称</div>
				<div class="left">描述</div>
				<div class="left">类型</div>
				<div class="left">标签</div>
				<div class="left sort" @click="scoreSort" :class="{'sort-top':sort.score,'sort-bottom':!sort.score}" title="排序">评分</div>
				<div class="left sort" @click="timeSort" :class="{'sort-top':sort.birthday,'sort-bottom':!sort.birthday}" title="排序">日期</div>
				<div class="left">状态</div>
				<div class="left">操作</div>
			</li>
			<li class="clearfix" v-for="(i,index) in list">
				<div class="left" @click="showDetails(index)"><img :src="i.img"></div>
				<div class="left">{{i.like}}</div>
				<div class="left" :title="i.name">{{i.name}}</div>
				<div class="left" :title="i.msg">{{i.msg}}</div>
				<div class="left">{{toType(i.type)}}</div>
				<div class="left" :title="i.label">{{i.label}}</div>
				<div class="left" :title="i.score">{{i.score}}</div>
				<div class="left" :title="i.birthday">{{i.birthday}}</div>
				<div class="left">{{i.status?'已':'未'}}</div>
				<div class="left">
					<button class="button2">编辑</button>
					<button class="button" @click="showDetails(index)">详情</button>
					<button class="button2">删除</button>
				</div>
			</li>
			
		</ul>
		<p v-show="!list.length" class="list-error">暂无信息！</p>
		<div class="details" v-if="details.img">
			<div class="clearfix">
				<span @click="details={}">X</span>
				<img class="left" :src="details.img">
				<ul class="left">
					<li v-for="x in details">
						<span>{{x}}</span>
						<p>{{details[x]}}</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			query: {
				name: '',
				type: '',
				like: '',
				msg: '',
				img: '',
				time: '',
				status: '',
				region: ''
			},
			sort: {
				birthday: '',
				score: ''
			},
			readList: [],
			list: [],
			details: {}
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
			let arr = this.readList
			if (this.query.name) {
				arr = arr.filter((d) => {
					return d.name.toLowerCase().indexOf(this.query.name.toLowerCase()) !== -1
				})
			}
			if (this.query.msg) {
				arr = arr.filter((d) => {
					return d.msg.toLowerCase().indexOf(this.query.msg.toLowerCase()) !== -1
				})
			}
			if (this.query.time) {
				arr = arr.filter((d) => {
					return this.$api.getTime(d.time) === this.query.time
				})
			}
			if (this.query.region !== '') {
				arr = arr.filter((d) => {
					return this.query.region === d.region
				})
			}
			if (this.query.type !== '') {
				arr = arr.filter((d) => {
					return this.query.type === d.type + ''
				})
			}
			if (this.query.status !== '') {
				arr = arr.filter((d) => {
					return this.query.status === d.status + ''
				})
			}
			if (this.query.like) {
				arr = arr.filter((d) => {
					return d.like === 1
				})
			}
			console.log(this.query.like)
			this.list = arr
		},
		timeSort () {
			this.list.sort((a, b) => {
				a = a.birthday.replace(/[^0-9]/g, '')
				b = b.birthday.replace(/[^0-9]/g, '')
				if (this.sort.birthday) {
					return a - b
				} else {
					return b - a
				}
			})
			this.sort.birthday = !this.sort.birthday
		},
		scoreSort () {
			this.list.sort((a, b) => {
				if (this.sort.score) {
					return a.score - b.score
				} else {
					return b.score - a.score
				}
			})
			this.sort.score = !this.sort.score
		},
		showDetails (i) {
			this.details = this.list[i]
		},
		toType (v) {
			switch (v) {
				case 0: return '动画'
				case 1: return '电影'
				case 2: return '电视剧'
				case 3: return '其他'
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.list{
	padding: 30px;
	.query{
		padding: 20px 0;
		border-top: 1px solid #eee;
		ul{
			li{
				width: 300px;
				margin-bottom: 6px;
				color: #fff;
				label{
					display: inline-block;
					width: 30%;
					text-align: right;
					margin-right: 6px;
				}
				input{
					height: 28px;
					width: 60%;
					color: #fff;
				}
				input[type="checkbox"]{
					height: 19px;
    				width: 19px;
    				position: relative;
    				top: 3px;
    				left: 5px;
				}
				select{
					height: 28px;
					color: #fff;
					width: 80px;
					option{
						background: #ccc;
					}
				}
			}
		}
	}
	table{
		text-align: center;
		width: 100%;
		tr{
			// display: block;
			// margin-bottom: 10px;
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
				img{
					height: 50px;
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
	.lists{
		li{
			padding: 5px;
			width: 100%;
			display: flex;
			margin-bottom: 5px;
			text-align: center;
			.sort{
				color: red;
				position: relative;
				cursor: pointer;
			}
			.sort:after,.sort:before{
				content: "";
				width: 0;
				height: 0;
				position: absolute;
				right: 0px;
				top: 35px;
				display: block;
				border: 5px solid transparent;
				border-top-color: #bbb;
			}
			.sort:before{
				top: 23px;
				border-top-color: transparent;
				border-bottom-color: #bbb;
			}
			.sort-top:before{
				border-bottom-color: #888;
			}
			.sort-bottom:after{
				border-top-color: #888;
			}
			p{
				flex: 1;
			}
			div{
				flex: 1;
				white-space: nowrap;
				line-height: 65px;
				overflow: hidden;
				text-overflow: ellipsis;
				button{
					padding: 2px 3px;
					margin: 23px 2px;
				}
				padding: 0 5px;
				max-height: 65px;
			}
			img{
				height: 65px;
			}
			div:nth-child(3){
			}
			div:nth-child(3),div:nth-child(4),div:nth-child(5),div:nth-child(6) {
				flex: 2;
			}
			div:last-of-type{
				flex: 3;
			}
		}
		li:nth-child(2n) {
			background: rgba(201,241,205,.5);
		}
		li:nth-child(2n-1) {
			background: rgba(233,233,233,.5);
		}
	}
	.list-error{
		width: 100%;
		color: #fff;
		font-size: 16px;
		text-align: center;
		line-height: 35px;
	}
	.details{
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		background: rgba(0,0,0,.5);
		>div{
			width: 300px;
			background: #fff;
			margin: 30% auto;
			>span{
				cursor: pointer;
				color: #fff;
				font-size: 18px;
				padding: 5px;
			}
		}
	}
}
</style>