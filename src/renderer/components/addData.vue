<template>
	<div class="add">
		<div class="add-query">
			<input type="text" v-model="searchText">
			<button class="button2" @click="doubanQuery">豆瓣</button>
			<guess :text="searchText" @select="callback"></guess>
		</div>
		<div class="searchShowList" v-show="idList[0]">
			<ul>
				<li v-for="x in idList" @click="doubanDetails(x.id)">{{x.title}}-{{x.year}}</li>
			</ul>
		</div>
		<ul v-show="d.name">
			<li>
				<label>名称：</label>
				<input type="text" v-model="d.name">
			</li>
			<li>
				<label>描述：</label>
				<input type="text" v-model="d.msg">
			</li>
			<li>
				<label>主演：</label>
				<input type="text" v-model="d.toStar">
			</li>
			<li>
				<label>LOGO：</label>
				<input type="text" v-model="d.img">
			</li>
			<li>
				<label>观状态：</label>
				<select v-model="d.status">
					<option value="0" selected>未看</option>
					<option value="1">已看</option>
				</select>
			</li>
			<li>
				<label>类型：</label>
				<select v-model="d.type">
					<option value="0" selected>动画</option>
					<option value="1">电影</option>
					<option value="2">电视剧</option>
					<option value="3">other</option>
				</select>
			</li>
			<li>
				<label>详情：</label>
				<input type="text" v-model="d.details">
			</li>
			<li>
				<label>集数：</label>
				<input type="text" v-model="d.size">
			</li>
			<li>
				<label>季数：</label>
				<input type="text" v-model="d.season">
			</li>
			<li>
				<label>语言：</label>
				<input type="text" v-model="d.language">
			</li>
			<li>
				<label>地区：</label>
				<input type="text" v-model="d.region">
			</li>
			<li>
				<label>作者：</label>
				<input type="text" v-model="d.author">
			</li>
			<li>
				<label>评分：</label>
				<input type="text" v-model="d.score">
			</li>
			<li>
				<label>更新时间：</label>
				<input type="text" v-model="d.update">
			</li>
			<li>
				<label>发布日期：</label>
				<input type="text" v-model="d.birthday">
			</li>
			<li>
				<label>出版社：</label>
				<input type="text" v-model="d.press">
			</li>
			<li><button class="button" @click="add">保存</button></li>
		</ul>
	</div>
</template>

<script>
import guess from '../components/guess'
export default {
	components: {
		guess
	},
	data () {
		return {
			idList: [],
			searchText: '',
			d: {
				name: '', // 名字
				msg: '', // 描述
				img: '', // logo
				like: 0,
				label: '', // 标签
				status: 0, // 观看状态
				time: '', // 入库时间
				type: 0, // 类型 0 动 1 电 2 剧
				details: '', // 详情
				region: '', // 产地
				author: '', // 作者
				score: '', // 评分
				update: '', // 更新状态
				press: '', // 出版社
				size: '', // 集数
				toStar: '', // 主演
				role: '', // 角色
				language: '', // 语言
				season: '', // 季数
				birthday: '' // 发行日期
			},
			list: []
		}
	},
	created () {
	},
	methods: {
		callback (v) {
			this.searchText = v
		},
		doubanQuery () {
			if (!this.searchText) return
			this.d.name = this.searchText
			this.$api.loading(1)
			this.$api.doubanQuery(this.searchText, d => {
				this.$api.loading(0)
				this.idList = d
			})
		},
		doubanDetails (id) {
			this.$api.loading(1)
			this.idList = []
			this.$api.doubanDetails(id, data => {
				console.log(data)
				for (let i in data) {
					this.d[i] = data[i]
				}
				this.$api.loading(0)
			})
		},
		add () {
			if (this.d.name) {
				let time = Date.now()
				this.d.time = this.$api.getTime(time, 1)
				this.$fs.writeFile(this.$path + 'list/' + time + '.json', JSON.stringify(this.d), e => {
					if (e) {
						this.$api.msg('添加失败！')
					} else {
						this.$api.msg('添加成功！')
						this.copy()
					}
				})
			} else {
				this.$api.msg('请输入数据！')
			}
		},
		copy () {
			let list = []
			this.$fs.readdir(this.$path + 'list', (e, d) => {
				if (!e) {
					d.forEach(j => {
						this.$fs.readFile(this.$path + 'list/' + j, 'utf-8', (e, d) => {
							if (d) {
								list.push(JSON.parse(d))
							}
						})
					})
					setTimeout(e => {
						this.$fs.writeFile(this.$path + 'copy/' + Date.now() + '.json', JSON.stringify(list), e => {})
					}, 1000)
				}
			})
		}
	}
}
</script>

<style lang="scss">
.add{
	margin-top: 20px;
	.add-query{
		width: 400px;
		margin: 0 auto;
		padding-left: 70px;
		position: relative;
		input{
			width: 262px;
			height: 30px;
			color: #fff;
		}
		button{
			height: 30px;
		}
	}
	.searchShowList{
		position: fixed;
    	background: #fefefe;
    	width: 160px;
    	height: 200px;
    	left: 50%;
    	top: 50%;
    	margin-top: -100px;
    	margin-left: -80px;
    	box-shadow: 0 0 50px #000;
    	font-size: 14px;
		ul{
			width: 100%;
		}
		li{
			width: 100%;
			text-align: center;
			padding: 5px 0;
			font-size: 12px;
    		cursor: pointer;
		}
		li:hover{
			background: #afc0ff;
			color: #fff
		}
	}
	>ul{
		width: 400px;
		margin: 0 auto;
		li{
			margin-top: 8px;
			font-size: 16px;
			label{
				display: inline-block;
				width: 130px;
				text-align: right;
				color: #fff;
			}
			input{
				width: 260px;
				height: 28px;
				padding-left: 5px;
				color: #fff;
				font-size: 15px;
			}
			select{
				width: 130px;
				height: 28px;
				color: #fff;
				font-size: 15px;
				option{
					background: #ccc;
				}
			}
		}
	}
}
</style>