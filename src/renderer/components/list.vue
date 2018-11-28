<template>
	<div class="list">
		<div class="query">
			<ul>
				<li>
					<label>名字: </label>
					<input type="text" v-model="query.name">
				</li>
				<li>
					<label>时间: </label>
					<input type="date" v-model="query.time">
				</li>
				<li>
					<label>类型: </label>
					<select v-model="query.type">
						<option value="">全部</option>
						<option value="0">动</option>
						<option value="1">电</option>
						<option value="2">剧</option>
						<option value="3">other</option>
					</select>
				</li>
				<li>
					<label>观状态: </label>
					<select v-model="query.type">
						<option value="">全部</option>
						<option value="0">未看</option>
						<option value="1">已看</option>
					</select>
				</li>
			</ul>
			<button class="button" type="button" @click="search">查询</button>
		</div>
		<table border="0" cellspacing="0" cellpadding="0" v-show="list[0]">
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
		<ul class="lists">
			<li class="clearfix">
				<div class="left">IMG</div>
				<div class="left">名称</div>
				<div class="left">描述</div>
				<div class="left">类型</div>
				<div class="left">标签</div>
				<div class="left">日期</div>
				<div class="left">状态</div>
				<div class="left">操作</div>
			</li>
			<li class="clearfix" v-for="(i,index) in list">
				<div class="left" @click="showDetails(index)"><img :src="i.img"></div>
				<div class="left" :title="i.name">{{i.name}}</div>
				<div class="left" :title="i.msg">{{i.msg}}</div>
				<div class="left">{{toType(i.type)}}</div>
				<div class="left" :title="i.label">{{i.label}}</div>
				<div class="left">{{i.time}}</div>
				<div class="left">{{i.status?'未':'已'}}</div>
				<div class="left">
					<button class="button2">编辑</button>
					<button class="button" @click="showDetails(index)">详情</button>
					<button class="button2">删除</button>
				</div>
			</li>
		</ul>
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
				type: '0',
				msg: '',
				img: '',
				time: ''
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
			div:nth-child(3),div:nth-child(2),div:nth-child(5),div:nth-child(6) {
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